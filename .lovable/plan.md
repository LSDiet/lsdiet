## Final architecture (Option B + webhook)

### Source of truth
The edge function `supabase/functions/blog-sitemap` becomes the single live source of truth for `/blog/*` URLs. It merges, on every request:

1. **Foundations** — hard-coded slug array inside the function (mirrored from `src/content/foundations/index.ts`). 9 entries today.
2. **Supporting articles** — hard-coded slug array (mirrored from `src/content/articles/index.ts`). 40 entries today.
3. **Contentful posts** — fetched live from the Contentful Delivery API on every invocation.

De-dupes by slug with locked precedence (Foundations > Contentful > Articles). Returns XML with `<priority>0.9</priority>` for foundations and `0.7` for the rest, `<lastmod>` from each source's updatedAt.

### Static cache for branded URL
`scripts/generate-blog-sitemap.ts` fetches the edge function and writes `public/blog-sitemap.xml` on `predev`/`prebuild`. `https://lsdiet.com/blog-sitemap.xml` stays the canonical URL Google crawls. Foundations/articles are always in sync because they ship with the code; Contentful freshness depends on the rebuild cadence below.

### Contentful webhook → rebuild (resilient + idempotent)
New edge function `contentful-rebuild-hook` handles webhook calls from Contentful and triggers a Lovable rebuild via GitHub `repository_dispatch` (GitHub is already connected to this project; pushes auto-deploy).

Resilience and idempotency rules baked into the function:

- **Shared-secret auth** — Contentful sends an `X-Webhook-Secret` header; function rejects anything else with 401. Secret stored as `CONTENTFUL_WEBHOOK_SECRET`.
- **Event filter** — only acts on `ContentManagement.Entry.publish` and `ContentManagement.Entry.unpublish` topics. Drafts (`auto_save`, `save`, `archive`) are accepted with 200 and ignored. Topic comes from the `X-Contentful-Topic` header.
- **Environment filter** — only entries from the `master` environment trigger a rebuild. Other environments return 200 + no-op.
- **Content type filter** — only `blogPost` entries trigger; other types return 200 + no-op.
- **Debounce** — track `lastDispatchAt` in a tiny `rebuild_dispatches` Supabase table. If the previous dispatch happened <120 s ago, skip and return 200 with reason `debounced`. This collapses publish storms (bulk publishes, republish loops) into a single rebuild.
- **Dispatch idempotency** — each dispatch carries a `dispatchId` (UUID). If GitHub responds non-2xx, we log + return 500 so Contentful retries; if it succeeds we record the row and ignore retries for the same `eventId`.
- **No rebuild loop possible** — the rebuild itself doesn't touch Contentful, so it cannot fire another webhook.

Configuration on the user side (one-time): in Contentful → Settings → Webhooks, create a webhook pointing at `https://<project-ref>.supabase.co/functions/v1/contentful-rebuild-hook`, scoped to "Entry — Publish / Unpublish", filtered by `sys.environment.sys.id == master` and `sys.contentType.sys.id == blogPost`, with the shared secret header. Steps will be in the docs file below.

GitHub side: a `repository_dispatch` event triggers a no-op commit (touches a `.lovable/last-content-sync` timestamp file) so Lovable's auto-deploy picks it up. Workflow file `.github/workflows/contentful-rebuild.yml` added by the build.

### Files added / changed

- `supabase/functions/blog-sitemap/index.ts` — extend to merge foundations + articles + Contentful, with hard-coded slug arrays.
- `supabase/functions/contentful-rebuild-hook/index.ts` — new, with all filters/debounce above.
- `supabase/config.toml` — register new function with `verify_jwt = false`.
- `scripts/generate-blog-sitemap.ts` — already in place; no logic change required (continues to fetch the edge function and write the static file).
- `.github/workflows/contentful-rebuild.yml` — new, listens for `repository_dispatch` type `contentful-publish` and commits a timestamp file.
- `docs/SITEMAP_ARCHITECTURE.md` — new, full diagram + ops runbook (see below).
- Database migration — small `rebuild_dispatches` table with RLS that locks out anon/authenticated.

### Secrets needed
- `CONTENTFUL_WEBHOOK_SECRET` — random string, also pasted into the Contentful webhook header config.
- `GITHUB_DISPATCH_TOKEN` — fine-grained PAT scoped to `Actions: read/write` on this repo only.
- `GITHUB_REPO` — `owner/repo` string for the dispatch URL.

I will request these via the secrets tool after you approve the plan.

### Documentation file (`docs/SITEMAP_ARCHITECTURE.md`)

The committed doc will contain, in plain English:

1. **Where sitemap truth originates** — the `blog-sitemap` edge function is the live source; `public/blog-sitemap.xml` is a cached snapshot served at the branded URL.
2. **Foundations / Articles** — code-managed; appearing in the registry is the only "publish" step; deploy ships them automatically.
3. **Contentful sync** — Contentful publish/unpublish → webhook → `contentful-rebuild-hook` edge function → GitHub `repository_dispatch` → workflow commits timestamp → Lovable auto-deploys → `prebuild` regenerates `blog-sitemap.xml`.
4. **Webhook dependency + filters** — exact event topics, environment filter, content-type filter, debounce window, retry semantics.
5. **Rebuild trigger flow** — ASCII diagram of the path from a Contentful "Publish" click to a fresh sitemap at `https://lsdiet.com/blog-sitemap.xml`.
6. **Failure modes & recovery** — what to do if the webhook stops firing, how to manually trigger a rebuild, how to verify the sitemap is fresh.
7. **Adding new content types** — checklist for the next time we extend the registry or add a new Contentful model.

### Verification after build
1. Deploy and hit `/functions/v1/blog-sitemap` directly — confirm ≥ 50 `<url>` entries.
2. Confirm `public/blog-sitemap.xml` regenerates with the same set during `prebuild`.
3. Simulate a draft save in Contentful → webhook fires → function logs `ignored: not a publish event` → no GitHub dispatch.
4. Simulate a publish → webhook fires → GitHub Action runs → Lovable redeploys → sitemap reflects the change.
5. Fire two publishes within 30 s → second call returns `debounced` and no second rebuild kicks off.

### Out of scope
- Migrating foundations/articles to a CMS — they stay code-managed by design.
- Indexing speed in Google Search Console — once the sitemap is correct, discovery is on Google's schedule.
- Canonical URLs, metadata, routing — unchanged.
