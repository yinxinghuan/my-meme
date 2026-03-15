#!/usr/bin/env python3
"""Generate preview images for meme templates. Generic character, English text only."""

import os, json, time, urllib.request, subprocess

API_URL = "http://aiservice.wdabuliu.com:8019/genl_image"
USER_ID = 123456
TIMEOUT = 360
COOLDOWN = 80

OUT_DIR = "/Users/yin/claude code/games-template/my-meme/src/MyMeme/img/previews"
os.makedirs(OUT_DIR, exist_ok=True)

CHAR = "a cute cartoon character, simple anime style, gender neutral"
LANG = "all text must be in English only, no Chinese characters, no Japanese characters, no Korean characters"

COMIC_BASE = f"two-panel comic strip, manga style, expressive character, comic panel borders, clean line art, {LANG}, "

TEMPLATES = [
    ("overtime", COMIC_BASE +
        f"left panel: {CHAR} happily packing bag to leave office, cheerful expression, clock showing 6pm, "
        f"right panel: {CHAR} frozen in shock as boss appears at door, devastated face, speech bubble says WAIT"),

    ("meeting_mute", COMIC_BASE +
        f"left panel: {CHAR} confidently talking on video call, relaxed cocky expression, "
        f"right panel: {CHAR} horrified realizing microphone was NOT on mute, sweat drops, text says NOT MUTED"),

    ("salary_day", COMIC_BASE +
        f"left panel: {CHAR} extremely excited checking phone, text PAYDAY, jumping with joy, "
        f"right panel: {CHAR} crying after paying rent, empty wallet, text RENT DUE"),

    ("monday_friday", COMIC_BASE +
        f"left panel labeled MONDAY: {CHAR} exhausted dead inside, dark bags under eyes, zombie mode, "
        f"right panel labeled FRIDAY: {CHAR} bursting with energy, dancing happily, sparkling eyes"),

    ("wifi_down", COMIC_BASE +
        f"left panel: {CHAR} calmly browsing phone on couch, wifi signal icon visible, peaceful, "
        f"right panel: {CHAR} absolute panic, wifi icon with X mark, screaming, text NO WIFI"),

    ("alarm_snooze", COMIC_BASE +
        f"left panel: {CHAR} in bed at night determined face, text EARLY TOMORROW, "
        f"right panel: {CHAR} smashing alarm clock, angry sleepy, text SNOOZE"),

    ("diet", COMIC_BASE +
        f"left panel: {CHAR} proudly holding healthy salad, determined face, text DIET DAY 1, "
        f"right panel: {CHAR} at midnight eating pizza and cake, guilty happy face, text DAY 1 NIGHT"),

    ("read_no_reply", COMIC_BASE +
        f"left panel: {CHAR} anxiously staring at phone waiting for reply, sweating, "
        f"right panel: {CHAR} seeing READ receipt but no reply, soul leaving body, text SEEN"),

    ("introvert_party", COMIC_BASE +
        f"left panel: {CHAR} at crowded party extremely uncomfortable, awkward smile, "
        f"right panel: {CHAR} at home alone with snacks, absolute bliss, peaceful, text HOME SWEET HOME"),

    ("group_photo", COMIC_BASE +
        f"left panel: {CHAR} posing confidently for photo, cool pose, thinking LOOKING GOOD, "
        f"right panel: {CHAR} horrified seeing the actual photo result, terrible angle, ugly"),

    ("one_more_bug", COMIC_BASE +
        f"left panel: {CHAR} celebrating fixing bug on computer, fist pump, text BUG FIXED, "
        f"right panel: {CHAR} horror as 99 new bugs appeared on screen, text 99 NEW BUGS"),

    ("stackoverflow", COMIC_BASE +
        f"left panel: {CHAR} as experienced developer typing code confidently, cool hacker aura, "
        f"right panel: {CHAR} secretly copy-pasting from stackoverflow, guilty nervous look, text CTRL+C"),
]

def generate(prompt):
    params = {"prompt": prompt, "user_id": USER_ID}
    payload = json.dumps({"query": "", "params": params}).encode()
    req = urllib.request.Request(API_URL, data=payload, method="POST",
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        resp = json.loads(r.read())
    if resp.get("code") != 200:
        raise RuntimeError(f"API error: {resp}")
    return resp["url"]

def download(url, out_path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    ext = os.path.splitext(url.split("?")[0])[1].lower()
    if ext and ext != ".png":
        tmp = out_path + ext
        with open(tmp, "wb") as f: f.write(data)
        subprocess.run(["sips", "-s", "format", "png", tmp, "--out", out_path],
                       check=True, capture_output=True)
        os.remove(tmp)
    else:
        with open(out_path, "wb") as f: f.write(data)

def main():
    import sys
    # Pass --force to regenerate all, otherwise skip existing
    force = '--force' in sys.argv
    total = len(TEMPLATES)
    for i, (name, prompt) in enumerate(TEMPLATES):
        out = os.path.join(OUT_DIR, f"{name}.png")
        if os.path.exists(out) and not force:
            print(f"[{i+1}/{total}] {name} — SKIP (exists, use --force to regen)")
            continue

        print(f"\n[{i+1}/{total}] {name}")
        if i > 0:
            print(f"  Cooldown {COOLDOWN}s...")
            time.sleep(COOLDOWN)

        try:
            url = generate(prompt)
            download(url, out)
            print(f"  OK → {out}")
        except Exception as e:
            print(f"  ERROR: {e}")

    print(f"\nDone!")

if __name__ == "__main__":
    main()
