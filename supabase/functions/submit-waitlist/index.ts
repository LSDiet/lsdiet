const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const fullName = typeof body?.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const goal = typeof body?.goal === 'string' ? body.goal.trim() : '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName || !email) {
      return new Response(
        JSON.stringify({ error: 'Full name and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (fullName.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Full name is too long (max 100 characters)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (email.length > 255 || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (goal.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Goal is too long (max 1000 characters)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const webhookUrl = Deno.env.get('GOOGLE_SHEET_WEBHOOK_URL');
    if (!webhookUrl) {
      throw new Error('GOOGLE_SHEET_WEBHOOK_URL is not configured');
    }

    // Google Apps Script redirects POST requests; follow manually
    let res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, goal }),
      redirect: 'follow',
    });

    // If we get a redirect, follow it with GET (Google's pattern)
    if (res.status === 302 || res.status === 301 || res.status === 307) {
      const redirectUrl = res.headers.get('location');
      if (redirectUrl) {
        res = await fetch(redirectUrl, { method: 'GET', redirect: 'follow' });
      }
    }

    if (!res.ok && res.status !== 302) {
      const text = await res.text();
      console.error('Google Script error:', res.status, text);
      throw new Error('Upstream webhook failed');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('submit-waitlist error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
