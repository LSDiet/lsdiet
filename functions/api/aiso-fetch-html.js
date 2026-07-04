// Server-side HTML fetch for the AISO page auditor.
// Runs on Cloudflare so it isn't subject to browser CORS and doesn't depend on a third-party proxy.
export async function onRequestGet(context) {
  const { request } = context;
  const urlParam = new URL(request.url).searchParams.get('url');

  if (!urlParam) return json({ error: 'Missing url parameter' }, 400);

  let target;
  try {
    target = new URL(urlParam);
  } catch {
    return json({ error: 'Invalid URL' }, 400);
  }
  if (target.protocol !== 'https:' && target.protocol !== 'http:') {
    return json({ error: 'Only http(s) URLs are allowed' }, 400);
  }

  try {
    const res = await fetch(target.toString(), {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LSDietAISOBot/1.0)' },
    });
    const html = await res.text();
    return json({ html, status: res.status });
  } catch (err) {
    return json({ error: `Fetch failed: ${err.message}` }, 502);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}
