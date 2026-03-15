#!/usr/bin/env python3
"""Generate Crisvelita avatar + expression sprites via online API."""

import os, sys, time, json, hashlib, hmac, datetime, urllib.parse, urllib.request, subprocess
from PIL import Image

# ── Config ─────────────────────────────────────────────
API_URL = "http://aiservice.wdabuliu.com:8019/genl_image"
USER_ID = 123456
TIMEOUT = 360
COOLDOWN = 80  # seconds between API calls

R2_ACCOUNT_ID = "bdccd2c68ff0d2e622994d24dbb1bae3"
R2_ACCESS_KEY = "b203adb7561b4f8800cbc1fa02424467"
R2_SECRET_KEY = "e7926e4175b7a0914496b9c999afd914cd1e4af7db8f83e0cf2bfad9773fa2b0"
R2_BUCKET     = "aigram"
R2_ENDPOINT   = f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
R2_PUBLIC     = "https://images.aiwaves.tech"

REF_IMAGE = "/Users/yin/Downloads/角色/2ce6523189cf31a4690c51ebc0a69796.jpg"
OUT_DIR_AVATAR = "/Users/yin/claude code/games-template/my-meme/src/MyMeme/img/avatars"
OUT_DIR_CHARS  = "/Users/yin/claude code/games-template/my-meme/src/MyMeme/img/chars"

CHARACTER_DESC = (
    "Crisvelita, cute ghost girl character, light blue translucent ghost cloak hood, "
    "black twin tails hair with red ribbon bows, big round black-frame glasses, "
    "rosy red blush cheeks, large expressive eyes, 3D Pixar render style, "
    "soft lighting, clean detailed"
)

# ── R2 Upload ──────────────────────────────────────────
def _sign(key: bytes, msg: str) -> bytes:
    return hmac.new(key, msg.encode(), hashlib.sha256).digest()

def upload_ref(path: str, suffix: str = "") -> str:
    with open(path, 'rb') as f:
        data = f.read()
    ts = int(time.time())
    base = os.path.splitext(os.path.basename(path))[0]
    obj_key = f"refs/{base}{suffix}_{ts}.png"
    host = f"{R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
    now = datetime.datetime.now(datetime.UTC)
    amz_date = now.strftime("%Y%m%dT%H%M%SZ")
    date_stamp = now.strftime("%Y%m%d")
    content_type = "image/png"
    content_hash = hashlib.sha256(data).hexdigest()
    canon_uri = "/" + R2_BUCKET + "/" + urllib.parse.quote(obj_key, safe="/")
    canon_headers = (
        f"content-type:{content_type}\n"
        f"host:{host}\n"
        f"x-amz-content-sha256:{content_hash}\n"
        f"x-amz-date:{amz_date}\n"
    )
    signed_headers = "content-type;host;x-amz-content-sha256;x-amz-date"
    canon_req = "\n".join(["PUT", canon_uri, "", canon_headers, signed_headers, content_hash])
    region = "auto"; service = "s3"
    cred_scope = f"{date_stamp}/{region}/{service}/aws4_request"
    string_to_sign = "\n".join([
        "AWS4-HMAC-SHA256", amz_date, cred_scope,
        hashlib.sha256(canon_req.encode()).hexdigest(),
    ])
    k = _sign(("AWS4" + R2_SECRET_KEY).encode(), date_stamp)
    k = _sign(k, region); k = _sign(k, service); k = _sign(k, "aws4_request")
    sig = hmac.new(k, string_to_sign.encode(), hashlib.sha256).hexdigest()
    auth = (f"AWS4-HMAC-SHA256 Credential={R2_ACCESS_KEY}/{cred_scope}, "
            f"SignedHeaders={signed_headers}, Signature={sig}")
    url = f"{R2_ENDPOINT}/{R2_BUCKET}/{urllib.parse.quote(obj_key, safe='/')}"
    req = urllib.request.Request(url, data=data, method="PUT", headers={
        "Content-Type": content_type, "x-amz-content-sha256": content_hash,
        "x-amz-date": amz_date, "Authorization": auth, "Content-Length": str(len(data)),
    })
    with urllib.request.urlopen(req, timeout=60) as r:
        r.read()
    public_url = f"{R2_PUBLIC}/{obj_key}"
    print(f"  Uploaded → {public_url}")
    return public_url

# ── API Call ───────────────────────────────────────────
def generate_image(prompt: str, ref_url: str = None) -> str:
    params = {"prompt": prompt, "user_id": USER_ID}
    if ref_url:
        params["url"] = ref_url
    payload = json.dumps({"query": "", "params": params}).encode()
    req = urllib.request.Request(API_URL, data=payload, method="POST",
                                 headers={"Content-Type": "application/json"})
    print(f"  Calling API... (timeout {TIMEOUT}s)")
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        resp = json.loads(r.read())
    if resp.get("code") != 200:
        raise RuntimeError(f"API error: {resp}")
    result_url = resp["url"]
    print(f"  Result → {result_url}")
    return result_url

# ── Download ───────────────────────────────────────────
def download_image(url: str, out_path: str):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    ext = os.path.splitext(url.split("?")[0])[1].lower()
    if ext and ext != ".png":
        tmp = out_path + ext
        with open(tmp, "wb") as f:
            f.write(data)
        subprocess.run(["sips", "-s", "format", "png", tmp, "--out", out_path],
                       check=True, capture_output=True)
        os.remove(tmp)
    else:
        with open(out_path, "wb") as f:
            f.write(data)
    print(f"  Saved → {out_path}")

# ── Green screen removal ──────────────────────────────
def remove_green(img_path: str, threshold=55, feather=25):
    img = Image.open(img_path).convert("RGBA")
    data = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = data[x, y]
            greenness = g - max(r, b)
            if greenness > threshold:
                alpha = 1.0 - min(1.0, (greenness - threshold) / feather)
                data[x, y] = (r, g, b, int(a * alpha))
    img.save(img_path)
    print(f"  Green removed → {img_path}")

# ── Tasks ──────────────────────────────────────────────
TASKS = [
    {
        "name": "avatar",
        "prompt": f"close-up portrait headshot of {CHARACTER_DESC}, facing forward, centered composition, white clean background, square 1:1 aspect ratio",
        "out": os.path.join(OUT_DIR_AVATAR, "crisvelita.png"),
        "use_ref": True,
        "green_screen": False,
    },
    {
        "name": "normal",
        "prompt": f"full body standing pose of {CHARACTER_DESC}, neutral calm expression, arms at sides, solid flat bright green background #00FF00, green screen background",
        "out": os.path.join(OUT_DIR_CHARS, "crisvelita_normal.png"),
        "use_ref": True,
        "green_screen": True,
    },
    {
        "name": "happy",
        "prompt": f"full body standing pose of {CHARACTER_DESC}, very happy joyful expression, smiling with open mouth, hands up cheerful pose, solid flat bright green background #00FF00, green screen background",
        "out": os.path.join(OUT_DIR_CHARS, "crisvelita_happy.png"),
        "use_ref": True,
        "green_screen": True,
    },
    {
        "name": "sad",
        "prompt": f"full body standing pose of {CHARACTER_DESC}, sad upset expression, looking down slightly, solid flat bright green background #00FF00, green screen background",
        "out": os.path.join(OUT_DIR_CHARS, "crisvelita_sad.png"),
        "use_ref": True,
        "green_screen": True,
    },
]

def main():
    os.makedirs(OUT_DIR_AVATAR, exist_ok=True)
    os.makedirs(OUT_DIR_CHARS, exist_ok=True)

    # Upload ref image once
    print("Uploading reference image...")
    ref_url = upload_ref(REF_IMAGE)

    for i, task in enumerate(TASKS):
        print(f"\n[{i+1}/{len(TASKS)}] Generating {task['name']}...")
        print(f"  Prompt: {task['prompt'][:80]}...")

        if i > 0:
            print(f"  Waiting {COOLDOWN}s cooldown...")
            time.sleep(COOLDOWN)

        try:
            result_url = generate_image(
                task["prompt"],
                ref_url=ref_url if task["use_ref"] else None,
            )
            download_image(result_url, task["out"])

            if task["green_screen"]:
                remove_green(task["out"])

            # Resize avatar to 512x512
            if task["name"] == "avatar":
                img = Image.open(task["out"])
                if img.size != (512, 512):
                    img = img.resize((512, 512), Image.LANCZOS)
                    img.save(task["out"])
                    print(f"  Resized to 512x512")

        except Exception as e:
            print(f"  ERROR: {e}")
            continue

    print("\nDone!")

if __name__ == "__main__":
    main()
