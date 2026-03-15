#!/usr/bin/env python3
"""Upload all avatars to R2 and print public URLs."""

import os, time, hashlib, hmac, datetime, urllib.parse, urllib.request

R2_ACCOUNT_ID = "bdccd2c68ff0d2e622994d24dbb1bae3"
R2_ACCESS_KEY = "b203adb7561b4f8800cbc1fa02424467"
R2_SECRET_KEY = "e7926e4175b7a0914496b9c999afd914cd1e4af7db8f83e0cf2bfad9773fa2b0"
R2_BUCKET     = "aigram"
R2_ENDPOINT   = f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
R2_PUBLIC     = "https://images.aiwaves.tech"

AVATAR_DIR = "/Users/yin/claude code/games-template/my-meme/src/MyMeme/img/avatars"

def _sign(key: bytes, msg: str) -> bytes:
    return hmac.new(key, msg.encode(), hashlib.sha256).digest()

def upload(path: str) -> str:
    with open(path, 'rb') as f:
        data = f.read()
    name = os.path.basename(path)
    obj_key = f"mymeme/avatars/{name}"
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
    return f"{R2_PUBLIC}/{obj_key}"

for f in sorted(os.listdir(AVATAR_DIR)):
    if f.endswith('.png'):
        path = os.path.join(AVATAR_DIR, f)
        url = upload(path)
        name = f.replace('.png', '')
        print(f"  {name}: '{url}',")
