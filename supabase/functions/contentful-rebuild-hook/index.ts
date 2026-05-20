// Contentful webhook → GitHub repository_dispatch → Lovable auto-deploy.
//
// Resilience & idempotency rules:
//   1. Shared-secret auth via X-Webhook-Secret (rejects 401 otherwise).
//   2. Only ContentManagement.Entry.publish / .unpublish topics dispatch;
//      drafts (auto_save, save, archive, create, delete) return 200 + no-op.
//   3. Only entries from environment `master` and content type `blogPost`
//      trigger a dispatch.
//   4. Debounce: if the previous successful dispatch happened < 120s ago,
//      we return 200 with reason `debounced`. Bulk publishes collapse to one.
//   5. Event idempotency: each request carries an X-Contentful-Webhook-Name +
//      payload.sys.id + sys.updatedAt — combined into eventId. Repeats of the
//      same eventId are recorded once.
//   6. The rebuild itself never touches Contentful, so no loop is possible.
//
// See docs/SITEMAP_ARCHITECTURE.md for the full flow.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, content-type, x-webhook-secret, x-contentful-topic, x-contentful-webhook-name",
};

const DEBOUNCE_SECONDS = 120;
const DISPATCH_EVENT_TYPE = "contentful-publish";

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  // 1) Shared-secret auth
  const expected = Deno.env.get("CONTENTFUL_WEBHOOK_SECRET");
  if (!expected) return json(500, { error: "webhook_secret_not_configured" });
  const provided = req.headers.get("x-webhook-secret");
  if (provided !== expected) return json(401, { error: "unauthorized" });

  // 2) Event filter
  const topic = req.headers.get("x-contentful-topic") ?? "";
  const isPublishEvent =
    topic === "ContentManagement.Entry.publish" ||
    topic === "ContentManagement.Entry.unpublish";
  if (!isPublishEvent) {
    return json(200, { ok: true, ignored: "not_a_publish_event", topic });
  }

  // Parse payload defensively.
  let payload: any = null;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "invalid_json" });
  }

  // 3) Environment + content type filter
  const envId = payload?.sys?.environment?.sys?.id;
  const ctId = payload?.sys?.contentType?.sys?.id;
  if (envId && envId !== "master") {
    return json(200, { ok: true, ignored: "non_master_environment", envId });
  }
  if (ctId && ctId !== "blogPost") {
    return json(200, { ok: true, ignored: "non_blogpost_content_type", ctId });
  }

  const eventId = [
    payload?.sys?.id ?? "unknown",
    payload?.sys?.updatedAt ?? new Date().toISOString(),
    topic,
  ].join(":");

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return json(500, { error: "supabase_not_configured" });
  }
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });

  // 6) Event idempotency — same eventId already dispatched?
  const { data: existing } = await supabase
    .from("rebuild_dispatches")
    .select("dispatch_id, created_at")
    .eq("event_id", eventId)
    .maybeSingle();
  if (existing) {
    return json(200, {
      ok: true,
      idempotent: true,
      dispatch_id: existing.dispatch_id,
    });
  }

  // 4) Debounce window — collapse bulk publishes into one rebuild.
  const cutoff = new Date(Date.now() - DEBOUNCE_SECONDS * 1000).toISOString();
  const { data: recent } = await supabase
    .from("rebuild_dispatches")
    .select("dispatch_id, created_at")
    .gte("created_at", cutoff)
    .order("created_at", { ascending: false })
    .limit(1);
  if (recent && recent.length > 0) {
    // Record the eventId so retries of THIS event are also short-circuited.
    await supabase.from("rebuild_dispatches").insert({
      event_id: eventId,
      dispatch_id: recent[0].dispatch_id,
      topic,
    });
    return json(200, {
      ok: true,
      debounced: true,
      reason: `another dispatch fired in last ${DEBOUNCE_SECONDS}s`,
      reused_dispatch_id: recent[0].dispatch_id,
    });
  }

  // 5) Dispatch to GitHub
  const GITHUB_TOKEN = Deno.env.get("GITHUB_DISPATCH_TOKEN");
  const GITHUB_REPO = Deno.env.get("GITHUB_REPO"); // "owner/repo"
  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return json(500, { error: "github_dispatch_not_configured" });
  }

  const dispatchId = crypto.randomUUID();
  const ghRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: DISPATCH_EVENT_TYPE,
        client_payload: {
          dispatchId,
          eventId,
          topic,
          entryId: payload?.sys?.id ?? null,
          updatedAt: payload?.sys?.updatedAt ?? null,
        },
      }),
    },
  );

  if (!ghRes.ok) {
    const body = await ghRes.text();
    console.error("GitHub dispatch failed", ghRes.status, body);
    // Return 5xx so Contentful retries.
    return json(502, {
      error: "github_dispatch_failed",
      status: ghRes.status,
      body: body.slice(0, 500),
    });
  }

  await supabase.from("rebuild_dispatches").insert({
    event_id: eventId,
    dispatch_id: dispatchId,
    topic,
  });

  return json(200, { ok: true, dispatched: true, dispatch_id: dispatchId });
});
