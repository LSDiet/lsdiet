// Activates a new member after Stripe payment.
// Whitelists their chosen email. OTP is sent client-side after this returns.
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { session_id, email } = await request.json();
    if (!session_id || !email) return json({ error: 'Missing fields' }, 400);

    const normalizedEmail = email.trim().toLowerCase();

    // Re-verify Stripe session (guard against replay attacks)
    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(session_id)}`, {
      headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
    });
    const session = await stripeRes.json();
    if (!stripeRes.ok || session.payment_status !== 'paid') {
      return json({ error: 'Payment not verified.' }, 402);
    }

    // Prevent replay — check session not already used
    const checkRes = await fetch(
      `${supabaseUrl(env)}/rest/v1/allowed_members?stripe_session_id=eq.${encodeURIComponent(session_id)}&select=email&limit=1`,
      { headers: supabaseHeaders(env) }
    );
    const existing = await checkRes.json();
    if (Array.isArray(existing) && existing.length > 0) {
      return json({ error: 'This session has already been used.' }, 409);
    }

    // Upsert into allowed_members
    await fetch(`${supabaseUrl(env)}/rest/v1/allowed_members`, {
      method: 'POST',
      headers: {
        ...supabaseHeaders(env),
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({
        email: normalizedEmail,
        plan: 'app-only',
        stripe_customer_id: session.customer || null,
        stripe_session_id: session_id,
        active: true,
      }),
    });

    // Create or update GHL contact with MN-Active tag (non-blocking)
    createGhlContact(env, normalizedEmail, session.customer || null).catch(err =>
      console.error('GHL contact error:', err)
    );

    return json({ success: true }, 200);
  } catch (err) {
    console.error('stripe-activate error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

async function createGhlContact(env, email, stripeCustomerId) {
  const locationId = 'TbGkGzbilMiCgVKspWsY';
  const body = {
    locationId,
    email,
    tags: ['MN-Active'],
    source: 'Motivation Navigator',
    customFields: stripeCustomerId
      ? [{ key: 'stripe_customer_id', field_value: stripeCustomerId }]
      : [],
  };
  const res = await fetch('https://services.leadconnectorhq.com/contacts/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GHL_API_KEY}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error('GHL API error:', res.status, err);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204 });
}

function supabaseHeaders(env) {
  return {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
  };
}

function supabaseUrl(env) {
  return env.SUPABASE_URL || env.VITE_SUPABASE_URL;
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
