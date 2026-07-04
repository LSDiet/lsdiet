// Generic CORS-bypass proxy for AISO's OpenAI/Perplexity calls: those APIs don't send
// Access-Control-Allow-Origin, so the browser can't call them directly. This runs the
// request on the Cloudflare edge instead, where CORS doesn't apply.
// Host allowlist prevents this from becoming an open SSRF relay to arbitrary URLs.
const ALLOWED_HOSTS = ["api.openai.com", "api.perplexity.ai"];

export async function onRequestPost(context) {
  const { request } = context;

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const { url, headers, body } = payload || {};
  if (!url) return json({ error: "Missing url" }, 400);

  let target;
  try {
    target = new URL(url);
  } catch {
    return json({ error: "Invalid url" }, 400);
  }

  if (!ALLOWED_HOSTS.includes(target.hostname)) {
    return json({ error: `Host not allowed: ${target.hostname}` }, 403);
  }

  try {
    const upstream = await fetch(target.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(headers || {}) },
      body: JSON.stringify(body),
    });

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json", ...corsHeaders() },
    });
  } catch (err) {
    return json({ error: `Upstream fetch failed: ${err.message}` }, 502);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", ...corsHeaders() } });
}
