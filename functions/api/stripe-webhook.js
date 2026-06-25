// Handles Stripe subscription lifecycle events.
// Deactivates access when a subscription is cancelled or payment fails permanently.
// Verify webhook signature with STRIPE_WEBHOOK_SECRET from Cloudflare env vars.
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature || !env.STRIPE_WEBHOOK_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Verify Stripe webhook signature using Web Crypto (HMAC-SHA256)
    const isValid = await verifyStripeSignature(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
    if (!isValid) return new Response('Invalid signature', { status: 401 });

    const event = JSON.parse(rawBody);

    if (event.type === 'customer.subscription.deleted') {
      const customerId = event.data.object.customer;
      if (customerId) {
        await fetch(
          `${supabaseUrl(env)}/rest/v1/allowed_members?stripe_customer_id=eq.${encodeURIComponent(customerId)}`,
          {
            method: 'PATCH',
            headers: {
              ...supabaseHeaders(env),
              'Content-Type': 'application/json',
              Prefer: 'return=minimal',
            },
            body: JSON.stringify({ active: false }),
          }
        );
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('stripe-webhook error:', err);
    return new Response('Internal error', { status: 500 });
  }
}

async function verifyStripeSignature(payload, sigHeader, secret) {
  // Parse t= and v1= from Stripe-Signature header
  const parts = Object.fromEntries(sigHeader.split(',').map(p => p.split('=')));
  const timestamp = parts['t'];
  const expectedSig = parts['v1'];
  if (!timestamp || !expectedSig) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(signedPayload));
  const computed = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
  return computed === expectedSig;
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
