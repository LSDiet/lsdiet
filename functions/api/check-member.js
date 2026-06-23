// Called by AppLoginPage before sending magic link.
// Returns { allowed: true } if the email is in allowed_members.
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { email } = await request.json();
    if (!email) return json({ allowed: false });

    const url = `${supabaseUrl(env)}/rest/v1/allowed_members?email=eq.${encodeURIComponent(email.toLowerCase())}&select=email&limit=1`;

    const res = await fetch(url, {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });

    const data = await res.json();
    const allowed = Array.isArray(data) && data.length > 0;

    // Mark first activation timestamp
    if (allowed) {
      await fetch(`${supabaseUrl(env)}/rest/v1/allowed_members?email=eq.${encodeURIComponent(email.toLowerCase())}`, {
        method: 'PATCH',
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ activated_at: new Date().toISOString() }),
      });
    }

    return json({ allowed });
  } catch (err) {
    console.error('check-member error:', err);
    return json({ allowed: false });
  }
}

function supabaseUrl(env) {
  return env.SUPABASE_URL || env.VITE_SUPABASE_URL;
}

function json(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
