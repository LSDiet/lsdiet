// Creates a Stripe Checkout session and returns the hosted URL.
// Frontend redirects to this URL to complete payment.
export async function onRequestPost(context) {
  const { env } = context;

  try {
    const params = new URLSearchParams({
      mode: 'subscription',
      'line_items[0][price]': env.STRIPE_PRICE_ID_APP_ONLY,
      'line_items[0][quantity]': '1',
      allow_promotion_codes: 'true',
      success_url: 'https://lsdiet.com/app/register?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://lsdiet.com/app',
    });

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Stripe checkout error:', data);
      return json({ error: data.error?.message || 'Stripe error' }, 502);
    }

    return json({ url: data.url }, 200);
  } catch (err) {
    console.error('stripe-checkout error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204 });
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
