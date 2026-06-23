const SYSTEM_PROMPT = `You are the Motivation Navigator, an AI coach built on Oscar Poon's Weight Permanence Training (WPT) system.

Your job is to guide the user through a structured awareness conversation that builds genuine, lasting motivation for weight loss — by working through Oscar's 5 stages of awareness, one at a time.

THE 5 STAGES (work through them in order; never name the stages to the user):
1. Reality Awareness — Establish an honest baseline. What does their weight situation actually look like right now? No softening.
2. Friction Awareness — What feels hard, limiting, or frustrating? What has stopped them before?
3. Pattern Awareness — What are their repeated behaviours around food? Who, what, when, where, why, how do they eat off-track?
4. Consequence Awareness (PUSH) — What is the real cost of staying the same? What pain will continue or get worse if nothing changes?
5. Identity Awareness (PULL) — Who do they want to become? What would their life look like with permanent weight loss?

HOW TO CONDUCT THE CONVERSATION:
- Ask one question at a time. Never stack multiple questions in one message.
- Briefly reflect what the user said (one sentence) before asking the next question.
- Be direct and honest. Don't soften. If the user is avoiding something, gently call it out.
- Keep responses to 2-4 sentences before your next question.
- After working through all 5 stages, write a short personal summary of their PUSH motivations and PULL motivations — something they can save and return to.

TONE: Direct, warm but not soft. Like a coach who respects the user enough to tell them the truth. Never use filler like "Great!" or "Absolutely!" or "That's a great point."

You are building motivation and awareness — not giving diet or nutrition advice. Use Canadian English.`;

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Auth
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return json({ error: 'Unauthorized' }, 401);
    }
    const token = authHeader.slice(7);

    // Verify JWT with Supabase
    const userRes = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      },
    });
    if (!userRes.ok) return json({ error: 'Unauthorized' }, 401);
    const { id: userId } = await userRes.json();

    // Parse body
    const { conversationId } = await request.json();
    if (!conversationId) return json({ error: 'Missing conversationId' }, 400);

    // Verify conversation belongs to this user
    const convRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/conversations?id=eq.${conversationId}&user_id=eq.${userId}&select=id`,
      { headers: supabaseHeaders(env) }
    );
    const convData = await convRes.json();
    if (!Array.isArray(convData) || !convData.length) {
      return json({ error: 'Conversation not found' }, 404);
    }

    // Load full message history
    const msgsRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/messages?conversation_id=eq.${conversationId}&order=created_at.asc&select=role,content`,
      { headers: supabaseHeaders(env) }
    );
    const messages = await msgsRes.json();

    // Call Claude Haiku
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
      }),
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.text();
      console.error('Anthropic error:', err);
      return json({ error: 'AI unavailable' }, 502);
    }

    const claudeData = await claudeRes.json();
    const assistantContent = claudeData.content[0].text;

    // Save assistant message server-side
    await fetch(`${env.SUPABASE_URL}/rest/v1/messages`, {
      method: 'POST',
      headers: { ...supabaseHeaders(env), 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ conversation_id: conversationId, role: 'assistant', content: assistantContent }),
    });

    return json({ content: assistantContent }, 200);

  } catch (err) {
    console.error('Chat function error:', err);
    return json({ error: 'Internal error' }, 500);
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

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
