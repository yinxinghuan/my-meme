#!/usr/bin/env python3
"""
Deploy a Cloudflare Worker as HTTPS proxy for the meme API.
Uses Cloudflare API directly — no wrangler needed.
Requires a Cloudflare API token with Workers permissions.
"""

# We have R2 keys but those are S3-compatible, not Cloudflare API tokens.
# We need to create the worker through the Cloudflare dashboard instead.
#
# Steps:
# 1. Go to https://dash.cloudflare.com/ → Workers & Pages → Create
# 2. Name: "meme-api-proxy"
# 3. Paste the worker code below
# 4. Deploy
# 5. The URL will be: https://meme-api-proxy.<your-subdomain>.workers.dev
#
# Worker code:

WORKER_CODE = """
export default {
  async fetch(request) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'POST only' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const body = await request.text();
      const resp = await fetch('http://aiservice.wdabuliu.com:8019/genl_image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await resp.text();
      return new Response(data, {
        status: resp.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
"""

print("=" * 60)
print("Cloudflare Worker 部署步骤")
print("=" * 60)
print()
print("1. 打开 https://dash.cloudflare.com/")
print("2. 左侧菜单 → Workers & Pages → Create")
print("3. 选择 'Create Worker'")
print("4. Worker 名称: meme-api-proxy")
print("5. 粘贴以下代码并部署:")
print()
print(WORKER_CODE)
print()
print("6. 部署后的 URL 类似:")
print("   https://meme-api-proxy.<your-sub>.workers.dev")
print()
print("7. 更新 useMyMeme.ts 中的 API_URL 为该 URL")
