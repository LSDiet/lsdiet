// Called by Zapier when a Skool member upgrades to Premium.
// Zapier sends: { email, name, secret }
// Whitelists the member in Supabase and sends them a magic link activation email.

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Verify shared secret so only Zapier can call this
    const { email, name, secret } = await request.json();

    if (secret !== env.SKOOL_WEBHOOK_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (!email) return new Response('Missing email', { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();

    // Upsert into allowed_members
    await fetch(`${supabaseUrl(env)}/rest/v1/allowed_members`, {
      method: 'POST',
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({
        email: normalizedEmail,
        skool_name: name || null,
      }),
    });

    // Create Supabase auth user and send magic link
    // First ensure the user exists in auth.users
    const inviteRes = await fetch(`${supabaseUrl(env)}/auth/v1/invite`, {
      method: 'POST',
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: normalizedEmail,
        data: { skool_name: name || '' },
        redirect_to: 'https://lsdiet.com/app/activation',
      }),
    });

    if (!inviteRes.ok) {
      const err = await inviteRes.text();
      // User may already exist — that's fine, just whitelist was the goal
      console.log('Invite response:', err);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('skool-upgrade error:', err);
    return new Response('Internal error', { status: 500 });
  }
}

function supabaseUrl(env) {
  return env.SUPABASE_URL || env.VITE_SUPABASE_URL;
}
