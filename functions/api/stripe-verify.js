// Verifies a Stripe Checkout session is paid and hasn't already been used.
// Called by AppRegisterPage on mount before showing the email entry form.
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { session_id } = await request.json();
    if (!session_id) return json({ valid: false, reason: 'Missing session ID' }, 200);

    // Fetch session from Stripe
    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(session_id)}`, {
      headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
    });
    const session = await stripeRes.json();

    if (!stripeRes.ok || session.payment_status !== 'paid') {
      return json({ valid: false, reason: 'Payment not completed.' }, 200);
    }

    // Check if this session was already used to register an account
    const checkRes = await fetch(
      `${supabaseUrl(env)}/rest/v1/allowed_members?stripe_session_id=eq.${encodeURIComponent(session_id)}&select=email&limit=1`,
      { headers: supabaseHeaders(env) }
    );
    const existing = await checkRes.json();
    if (Array.isArray(existing) && existing.length > 0) {
      return json({ valid: false, reason: 'This session has already been used. Sign in with your registered email.' }, 200);
    }

    return json({ valid: true }, 200);
  } catch (err) {
    console.error('stripe-verify error:', err);
    return json({ valid: false, reason: 'Verification failed.' }, 200);
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
