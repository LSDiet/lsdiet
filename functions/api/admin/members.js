const ADMIN_EMAIL = 'oscar@lsdiet.com';

// GET  → list all allowed members
// POST → add member + send activation email
// DELETE → remove member by email

export async function onRequest(context) {
  const { request, env } = context;

  // Auth — verify JWT and confirm admin email
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return text('Unauthorized', 401);

  const token = authHeader.slice(7);
  const userRes = await fetch(`${supabaseUrl(env)}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    },
  });
  if (!userRes.ok) return text('Unauthorized', 401);
  const { email } = await userRes.json();
  if (email !== ADMIN_EMAIL) return text('Forbidden', 403);

  const method = request.method.toUpperCase();

  if (method === 'GET') {
    const res = await fetch(
      `${supabaseUrl(env)}/rest/v1/allowed_members?order=created_at.desc&select=id,email,skool_name,activated_at,created_at`,
      { headers: supabaseHeaders(env) }
    );
    const data = await res.json();
    return json(data);
  }

  if (method === 'POST') {
    const { email: memberEmail, name } = await request.json();
    if (!memberEmail) return json({ error: 'Missing email' }, 400);
    const normalizedEmail = memberEmail.trim().toLowerCase();

    // Upsert into whitelist
    const upsertRes = await fetch(`${supabaseUrl(env)}/rest/v1/allowed_members`, {
      method: 'POST',
      headers: {
        ...supabaseHeaders(env),
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify({ email: normalizedEmail, skool_name: name || null }),
    });
    const upsertData = await upsertRes.json();

    // Send Supabase invite (magic link activation email)
    const inviteRes = await fetch(`${supabaseUrl(env)}/auth/v1/invite`, {
      method: 'POST',
      headers: {
        ...supabaseHeaders(env),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: normalizedEmail,
        data: { skool_name: name || '' },
        redirect_to: 'https://lsdiet.com/app',
      }),
    });

    const inviteData = await inviteRes.json();
    const alreadyExists = inviteData?.msg?.includes('already been registered') ||
                          inviteData?.code === 'email_exists';

    return json({
      member: Array.isArray(upsertData) ? upsertData[0] : upsertData,
      invited: inviteRes.ok,
      alreadyExisted: alreadyExists,
    });
  }

  if (method === 'DELETE') {
    const { email: memberEmail } = await request.json();
    if (!memberEmail) return json({ error: 'Missing email' }, 400);
    const normalizedEmail = memberEmail.trim().toLowerCase();

    await fetch(
      `${supabaseUrl(env)}/rest/v1/allowed_members?email=eq.${encodeURIComponent(normalizedEmail)}`,
      {
        method: 'DELETE',
        headers: { ...supabaseHeaders(env), Prefer: 'return=minimal' },
      }
    );
    return json({ removed: normalizedEmail });
  }

  return text('Method not allowed', 405);
}

function supabaseUrl(env) { return env.SUPABASE_URL || env.VITE_SUPABASE_URL; }
function supabaseHeaders(env) {
  return {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
  };
}
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
function text(body, status = 200) {
  return new Response(body, { status });
}
