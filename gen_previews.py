#!/usr/bin/env python3
"""
Generate preview images for meme templates.
Generic character, English text only.

Usage:
  python3 gen_previews.py              # generate missing previews
  python3 gen_previews.py --force      # regenerate all
  python3 gen_previews.py --new-only   # generate new TB templates only
  python3 gen_previews.py --check      # check all images for quality issues, list bad ones
  python3 gen_previews.py --fix-bad    # regenerate images flagged as bad quality
"""

import os, json, time, urllib.request, subprocess, sys
from pathlib import Path

API_URL = "http://aiservice.wdabuliu.com:8019/genl_image"
USER_ID = 123456
TIMEOUT = 360
COOLDOWN = 80

OUT_DIR = Path(__file__).parent / "src/MyMeme/img/previews"
OUT_DIR.mkdir(parents=True, exist_ok=True)

CHAR = "a cute cartoon character, simple anime style, gender neutral"
LANG = "all text must be in English only, no Chinese characters, no Japanese characters, no Korean characters"

# ── Left-Right comic base ──────────────────────────────────────────────────────
LR = f"two-panel comic strip, side by side left and right panels, manga style, expressive character, comic panel borders, clean line art, {LANG}, "

# ── Top-Bottom comic base ──────────────────────────────────────────────────────
TB = f"vertical two-panel comic strip, stacked top panel and bottom panel, manga style, expressive character, comic panel borders, clean line art, {LANG}, "

TEMPLATES = [
    # ── HOT / TRENDING (LR) ────────────────────────────────────────────────────
    ("ai_replace_me", LR +
        f"left panel: {CHAR} smugly laughing at headline AI WILL REPLACE JOBS, arms crossed, "
        f"right panel: {CHAR} jaw dropped watching robot doing their exact job, sweat pouring, speech bubble WAIT"),

    ("ai_art", LR +
        f"left panel: {CHAR} exhausted after hours of drawing, holding artwork proudly, art supplies everywhere, text 6 HOURS, "
        f"right panel: {CHAR} watching someone generate identical art with AI instantly, pencil snaps, text 5 SECONDS"),

    ("chatgpt_homework", LR +
        f"left panel: {CHAR} feet on desk dictating homework to AI chatbot, speech bubble WRITE MY ESSAY, "
        f"right panel: {CHAR} sweating as teacher holds paper saying THIS IS AI WRITTEN, face pale"),

    ("short_video_trap", LR +
        f"left panel: {CHAR} in bed at 10 PM, speech bubble JUST ONE MORE VIDEO, clock visible, "
        f"right panel: {CHAR} still scrolling with bloodshot zombie eyes, clock shows 4 AM"),

    ("rto_mandate", LR +
        f"left panel: {CHAR} in pajamas working from couch with cat, text WFH PARADISE, angels singing, "
        f"right panel: {CHAR} reading email RETURN TO OFFICE, dramatic scream, lightning bolt"),

    ("subscription_trap", LR +
        f"left panel: {CHAR} happily clicking FREE TRIAL, sparkles and confetti, speech bubble NO RISK, "
        f"right panel: {CHAR} opening bank statement showing 47 subscriptions, eyes popping out"),

    ("influencer_vs_real", LR +
        f"left panel labeled INSTAGRAM: {CHAR} perfect pose with latte, gorgeous lighting, filters, "
        f"right panel labeled REALITY: {CHAR} 50 failed selfies on floor, cold coffee, mascara smudged"),

    ("gas_prices", LR +
        f"left panel: {CHAR} confidently driving car to gas station, happy face, wallet out, "
        f"right panel: {CHAR} crying and fainting next to gas pump, holding empty wallet, shocked expression"),

    ("crypto_roller", LR +
        f"left panel: {CHAR} popping champagne, crypto chart going UP, text TO THE MOON, money raining, "
        f"right panel: {CHAR} crying, chart crashed DOWN in red, text TO THE FLOOR, everything on fire"),

    ("dating_app", LR +
        f"left panel labeled PROFILE PIC: {CHAR} looking perfect, studio lighting, model vibes, "
        f"right panel labeled VIDEO CALL: {CHAR} terrible webcam, bed head, different person, awkward wave"),

    # ── WORK (LR) ─────────────────────────────────────────────────────────────
    ("overtime", LR +
        f"left panel: {CHAR} happily packing bag to leave office, clock showing 6pm, freedom, "
        f"right panel: {CHAR} frozen as boss appears at door, devastated face, speech bubble GOT A MINUTE"),

    ("meeting_mute", LR +
        f"left panel: {CHAR} confidently ranting on video call, relaxed cocky expression, "
        f"right panel: {CHAR} horrified, mic icon glowing red, text NOT MUTED, sweat drops"),

    ("salary_day", LR +
        f"left panel: {CHAR} extremely excited checking phone, text PAYDAY, jumping for joy, cash raining, "
        f"right panel: {CHAR} crying after paying bills, empty wallet, bank shows $3.47"),

    ("email_typo", LR +
        f"left panel: {CHAR} triumphantly pressing SEND on important email to CEO, confident smile, "
        f"right panel: {CHAR} spotting horrible typo 0.5 seconds after sending, reaching through screen in horror"),

    ("fake_busy", LR +
        f"left panel: {CHAR} typing furiously with serious face as boss walks past, spreadsheet visible, "
        f"right panel: {CHAR} screen showing online shopping cart with 47 items, sneaky guilty grin"),

    ("reply_all", LR +
        f"left panel: {CHAR} smirking evilly while typing on keyboard, extremely smug expression, no text or speech bubble, "
        f"right panel labeled REPLY ALL: {CHAR} face turned skeleton in horror, screen glow on face"),

    # ── DAILY (LR) ────────────────────────────────────────────────────────────
    ("monday_friday", LR +
        f"left panel labeled MONDAY: {CHAR} zombie with dark bags under eyes, IV coffee drip, grey and depressing, "
        f"right panel labeled FRIDAY: {CHAR} dancing with disco ball, maximum energy, confetti"),

    ("wifi_down", LR +
        f"left panel: {CHAR} peacefully scrolling phone, wifi bars full, serene, birds singing, "
        f"right panel: {CHAR} screaming like world ending, wifi icon X, flipping furniture, text NO WIFI"),

    ("alarm_snooze", LR +
        f"left panel: {CHAR} in bed at night, fist raised, heroic aura, text EARLY TOMORROW, "
        f"right panel: {CHAR} at 6AM violently smashing alarm clock, rage face, text SNOOZE"),

    ("diet", LR +
        f"left panel: {CHAR} proudly holding tiny salad in workout gear, text DIET DAY 1, virtuous glow, "
        f"right panel: {CHAR} surrounded by pizza and ice cream, guilty face, text DAY 1 NIGHT"),

    ("bed_phone", LR +
        f"left panel: {CHAR} tucked in bed yawning, speech bubble GOODNIGHT, clock shows 11 PM, cozy, "
        f"right panel: {CHAR} wide awake with phone glow in dark, zombie eyes, clock 3:47 AM"),

    ("cooking_fail", LR +
        f"left panel: {CHAR} in chef hat watching tutorial, confident thumbs up, text EASY, "
        f"right panel: {CHAR} kitchen destroyed, smoke alarm, pan on fire, covered in flour"),

    ("online_vs_reality", LR +
        f"left panel labeled ONLINE ORDER: beautiful perfect gourmet burger, studio lighting, magazine worthy, "
        f"right panel labeled WHAT ARRIVED: {CHAR} holding sad flat squished burger, completely different, disappointed"),

    ("fridge_stare", LR +
        f"left panel: {CHAR} opening fridge with hope, speech bubble WHAT DO WE HAVE, stomach growling, "
        f"right panel: {CHAR} staring into completely empty fridge, existential void, one old condiment bottle"),

    # ── SOCIAL (LR) ───────────────────────────────────────────────────────────
    ("read_no_reply", LR +
        f"left panel: {CHAR} anxiously staring at phone, biting nails, refreshing conversation, "
        f"right panel: {CHAR} seeing READ 3:42 PM with no reply, soul leaving body, text SEEN"),

    ("introvert_party", LR +
        f"left panel: {CHAR} at crowded party, forced awkward smile, thought bubble HELP ME, sweating, "
        f"right panel: {CHAR} at home in blanket burrito with snacks, pure euphoria, text HOME SWEET HOME"),

    ("group_photo", LR +
        f"left panel: {CHAR} striking confident cool pose, thought bubble I LOOK AMAZING, duck face, "
        f"right panel: {CHAR} the actual photo: terrible angle, eyes half closed, mouth weird"),

    ("typing_delete", LR +
        f"left panel: {CHAR} typing passionate 500-word message, intense focused face, screen full of text, "
        f"right panel: {CHAR} deleting everything and sending just OK, coward face, trash can overflowing drafts"),

    ("plans_cancelled", LR +
        f"left panel: {CHAR} receiving SORRY CANT MAKE IT text, fake sad face, hand on heart, acting, "
        f"right panel: {CHAR} instantly in pajamas doing victory dance, Netflix on, pizza ordered, pure joy"),

    # ── TECH (LR) ─────────────────────────────────────────────────────────────
    ("one_more_bug", LR +
        f"left panel labeled BUG FIXED: {CHAR} fist pump victory pose at computer, confetti falling, happy, "
        f"right panel labeled 99 BUGS: {CHAR} head exploding in shock at computer screen showing errors, fire"),

    ("stackoverflow", LR +
        f"left panel: {CHAR} typing with blazing speed, hacker sunglasses, green code reflected, elite aura, "
        f"right panel: {CHAR} nervously copy-pasting from StackOverflow, looking over shoulder, tab shows stackoverflow.com"),

    ("git_force_push", LR +
        f"left panel: {CHAR} casually pressing enter on git push --force, coffee in hand, speech bubble ITS FINE, "
        f"right panel: {CHAR} entire team in panic, servers exploding, slowly backing toward exit door"),

    ("works_on_my_machine", LR +
        f"left panel: {CHAR} shrugging at laptop with green checkmarks, smug face, speech bubble WORKS ON MY MACHINE, "
        f"right panel: {CHAR} production server room on fire, ERROR 500 everywhere, tiptoeing away whistling"),

    ("dark_mode", LR +
        f"left panel: {CHAR} coding in dark room, dark mode terminal, green text, cool hacker aesthetic, "
        f"right panel: {CHAR} accidentally opening white website, nuclear explosion of light, eyes burning"),

    ("no_comments", LR +
        f"left panel: {CHAR} proudly refusing to write comments, nose in air, speech bubble MY CODE IS SELF-DOCUMENTING, "
        f"right panel: {CHAR} 3 months later staring at own code, zero comprehension, speech bubble WHO WROTE THIS"),

    # ── TOP-BOTTOM LAYOUT ──────────────────────────────────────────────────────
    ("battery_drain", TB +
        f"top panel: {CHAR} phone shows 100% battery, energetic and making big plans, battery icon FULL, text ALL DAY PLANS, "
        f"bottom panel: {CHAR} phone shows 1% blinking red, frantic panic searching for charger, text HELP"),

    ("deadline_panic", TB +
        f"top panel: {CHAR} calendar shows 2 WEEKS TO DEADLINE, leaning back sipping coffee, calm and unbothered, text SO MUCH TIME, "
        f"bottom panel: {CHAR} clock shows 2 HOURS LEFT, wild eyes, keyboard flying, room on fire, text PANIC MODE"),

    ("new_year_day2", TB +
        f"top panel labeled JAN 1: {CHAR} energetically writing on notepad with sparkles around, determined motivated face, "
        f"bottom panel labeled JAN 2: {CHAR} lying on couch eating snacks, crumpled paper on floor, lazy defeated face"),

    ("package_wait", TB +
        f"top panel: {CHAR} excitedly checking tracking app showing ARRIVES TOMORROW, stars in eyes, clapping hands, "
        f"bottom panel: {CHAR} one week later still waiting, obsessively peeking through curtains at empty doorstep, calendar shows 7 DAYS"),

    ("coffee_effect", TB +
        f"top panel: {CHAR} before coffee, zombie face, dark rings under eyes, shuffling, grey dead inside, text BEFORE, "
        f"bottom panel: {CHAR} after first sip of coffee, fully awake and glowing, superhero cape, lightning bolts, text AFTER"),

    ("install_update", TB +
        f"top panel: {CHAR} confidently clicking UPDATE NOW on laptop, relaxed smile, text 5 MIN TO MEETING, "
        f"bottom panel: {CHAR} progress bar frozen at 37%, meeting notification blinking, cold sweat, text STILL UPDATING 45 MIN LATER"),

    ("phone_notif", TB +
        f"top panel: {CHAR} sees message notification, glances with one eyebrow up, speech bubble REPLY LATER, busy, "
        f"bottom panel: {CHAR} one week later, 200 notification badges piled up, hiding face in hands, speech bubble ITS BEEN TOO LONG"),

    ("budget_reality", TB +
        f"top panel: {CHAR} start of month proudly writing budget spreadsheet with calculator, coins stacked, text BUDGET PLAN, "
        f"bottom panel: {CHAR} end of month, bank app shows nearly zero, empty wallet, head in hands, text ACTUAL RESULT"),
]

# Which IDs are new TB templates
NEW_TB_IDS = {
    "battery_drain", "deadline_panic", "new_year_day2", "package_wait",
    "coffee_effect", "install_update", "phone_notif", "budget_reality",
}


def generate(prompt: str) -> str:
    params = {"prompt": prompt, "user_id": USER_ID}
    payload = json.dumps({"query": "", "params": params}).encode()
    req = urllib.request.Request(API_URL, data=payload, method="POST",
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        resp = json.loads(r.read())
    if resp.get("code") != 200:
        raise RuntimeError(f"API error: {resp}")
    return resp["url"]


def download(url: str, out_path: Path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    ext = os.path.splitext(url.split("?")[0])[1].lower()
    if ext and ext != ".png":
        tmp = str(out_path) + ext
        with open(tmp, "wb") as f:
            f.write(data)
        subprocess.run(["sips", "-s", "format", "png", tmp, "--out", str(out_path)],
                       check=True, capture_output=True)
        os.remove(tmp)
    else:
        with open(out_path, "wb") as f:
            f.write(data)


def check_image_quality(path: Path) -> tuple[bool, str]:
    """
    Returns (is_ok, reason).
    Checks:
    - File exists and is non-empty
    - Image can be opened by PIL
    - Image is not nearly all one color (solid/corrupted)
    - Image has reasonable dimensions
    """
    if not path.exists() or path.stat().st_size < 5000:
        return False, "missing or too small"
    try:
        from PIL import Image, ImageStat
        img = Image.open(path).convert("RGB")
        w, h = img.size
        if w < 100 or h < 100:
            return False, f"too small: {w}x{h}"
        # Check color variance — a nearly solid-color image is bad
        stat = ImageStat.Stat(img)
        avg_stddev = sum(stat.stddev) / 3
        if avg_stddev < 8:
            return False, f"low variance (stddev={avg_stddev:.1f}) — possible solid/corrupted"
        # Check if it's a reasonable aspect ratio for a 2-panel comic
        ratio = w / h
        if ratio < 0.3 or ratio > 4.0:
            return False, f"unusual aspect ratio: {ratio:.2f}"
        return True, "ok"
    except Exception as e:
        return False, f"PIL error: {e}"


def check_all():
    """Check all existing preview images for quality issues."""
    print("Checking all preview images...\n")
    bad = []
    for name, _ in TEMPLATES:
        path = OUT_DIR / f"{name}.png"
        if not path.exists():
            print(f"  MISSING  {name}.png")
            bad.append(name)
            continue
        ok, reason = check_image_quality(path)
        status = "  OK      " if ok else "  BAD     "
        print(f"{status}{name}.png  — {reason}")
        if not ok:
            bad.append(name)
    print(f"\n{len(bad)} issue(s) found out of {len(TEMPLATES)} templates.")
    if bad:
        print("Run with --fix-bad to regenerate these.")
    return bad


def generate_list(to_gen: list[tuple[str, str]], label: str):
    total = len(to_gen)
    print(f"\n{label}: {total} template(s)\n")
    for i, (name, prompt) in enumerate(to_gen):
        out = OUT_DIR / f"{name}.png"
        print(f"[{i+1}/{total}] {name}")
        if i > 0:
            print(f"  Cooldown {COOLDOWN}s...")
            time.sleep(COOLDOWN)
        try:
            url = generate(prompt)
            download(url, out)
            ok, reason = check_image_quality(out)
            if ok:
                print(f"  OK → {out}")
            else:
                print(f"  GENERATED but quality issue: {reason} — consider rerunning")
        except Exception as e:
            print(f"  ERROR: {e}")
    print("\nDone!")


def main():
    force = "--force" in sys.argv
    new_only = "--new-only" in sys.argv
    do_check = "--check" in sys.argv
    fix_bad = "--fix-bad" in sys.argv

    if do_check:
        check_all()
        return

    if fix_bad:
        bad = check_all()
        if not bad:
            print("No bad images to fix.")
            return
        bad_set = set(bad)
        to_gen = [(name, prompt) for name, prompt in TEMPLATES if name in bad_set]
        generate_list(to_gen, "Fixing bad quality images")
        return

    if new_only:
        to_gen = [(name, prompt) for name, prompt in TEMPLATES if name in NEW_TB_IDS]
        generate_list(to_gen, "New top-bottom templates")
        return

    if force:
        to_gen = list(TEMPLATES)
    else:
        to_gen = []
        for name, prompt in TEMPLATES:
            out = OUT_DIR / f"{name}.png"
            if not out.exists() or out.stat().st_size < 5000:
                to_gen.append((name, prompt))
            else:
                print(f"  SKIP  {name}.png (exists)")

    if not to_gen:
        print("All previews exist. Use --force to regenerate all, --check to verify quality.")
        return

    generate_list(to_gen, "Generating missing previews")


if __name__ == "__main__":
    main()
