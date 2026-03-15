#!/usr/bin/env python3
"""Test meme generation with different styles to check prompt quality."""

import os, json, time, urllib.request, subprocess

API_URL = "http://aiservice.wdabuliu.com:8019/genl_image"
USER_ID = 123456
TIMEOUT = 360
COOLDOWN = 80

OUT_DIR = "/Users/yin/claude code/games-template/my-meme/test_output"
os.makedirs(OUT_DIR, exist_ok=True)

# Crisvelita as reference
REF_URL = "https://images.aiwaves.tech/refs/2ce6523189cf31a4690c51ebc0a69796_1773555418.png"

CHAR_DESC = (
    "cute ghost girl with light blue translucent ghost cloak, "
    "black twin tails with red bows, big round black-frame glasses, "
    "red blush cheeks, 3D Pixar style"
)

TESTS = [
    {
        "name": "two_panel_comic",
        "prompt": (
            f"two-panel comic strip, manga style, black and white with screentone, "
            f"left panel: {CHAR_DESC} looking at phone calmly, "
            f"right panel: {CHAR_DESC} shocked face screaming, "
            f"speech bubbles with text, clean line art, comic panel borders, expressive character"
        ),
    },
    {
        "name": "reaction_meme",
        "prompt": (
            f"meme image, {CHAR_DESC} with exaggerated surprised confused expression, "
            f'bold text caption at top says "WHEN YOU REALIZE IT\'S MONDAY", '
            f"internet meme style, funny, white impact text with black outline, viral meme format"
        ),
    },
    {
        "name": "before_after",
        "prompt": (
            f'two-panel comparison meme, left panel labeled "BEFORE" shows {CHAR_DESC} looking neat and professional, '
            f'right panel labeled "AFTER" shows {CHAR_DESC} completely disheveled and exhausted, '
            f"clean illustration, comic style, bold labels, funny contrast"
        ),
    },
]

def generate(prompt, ref_url=None):
    params = {"prompt": prompt, "user_id": USER_ID}
    if ref_url:
        params["url"] = ref_url
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
    for i, test in enumerate(TESTS):
        print(f"\n[{i+1}/{len(TESTS)}] {test['name']}")
        print(f"  Prompt: {test['prompt'][:100]}...")

        if i > 0:
            print(f"  Waiting {COOLDOWN}s...")
            time.sleep(COOLDOWN)

        try:
            url = generate(test["prompt"], REF_URL)
            out = os.path.join(OUT_DIR, f"{test['name']}.png")
            download(url, out)
            print(f"  OK → {out}")
        except Exception as e:
            print(f"  ERROR: {e}")

    print("\nDone! Check test_output/")

if __name__ == "__main__":
    main()
