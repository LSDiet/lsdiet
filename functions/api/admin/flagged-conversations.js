const ADMIN_EMAIL = 'oscar@lsdiet.com';

// GET → list all conversations flagged for review, with their messages

export async function onRequestGet(context) {
  const { request, env } = context;

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

  const convRes = await fetch(
    `${supabaseUrl(env)}/rest/v1/conversations?flagged_for_review=eq.true&order=updated_at.desc&select=id,title,user_id,created_at,updated_at`,
    { headers: supabaseHeaders(env) }
  );
  const conversations = await convRes.json();
  if (!Array.isArray(conversations) || conversations.length === 0) {
    return json([]);
  }

  const userIds = [...new Set(conversations.map(c => c.user_id))];
  const usersById = {};
  await Promise.all(
    userIds.map(async id => {
      const res = await fetch(`${supabaseUrl(env)}/auth/v1/admin/users/${id}`, {
        headers: supabaseHeaders(env),
      });
      if (res.ok) {
        const u = await res.json();
        usersById[id] = u.email;
      }
    })
  );

  const convIds = conversations.map(c => c.id).join(',');
  const msgRes = await fetch(
    `${supabaseUrl(env)}/rest/v1/messages?conversation_id=in.(${convIds})&order=created_at.asc&select=id,conversation_id,role,content,flagged,created_at`,
    { headers: supabaseHeaders(env) }
  );
  const messages = await msgRes.json();

  const result = conversations.map(c => ({
    ...c,
    user_email: usersById[c.user_id] ?? 'unknown',
    messages: Array.isArray(messages) ? messages.filter(m => m.conversation_id === c.id) : [],
  }));

  return json(result);
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
