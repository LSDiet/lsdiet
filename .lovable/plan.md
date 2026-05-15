# Plan v3: Public semantic blog inventory endpoint

## Locked decisions

- **URL:** `https://joohccchfpcshlihctsm.supabase.co/functions/v1/blog-index`
- **Topics:** manual Contentful field is primary; auto-extraction from title+excerpt is fallback when empty.
- **Schema fields:** `title`, `slug`, `url`, `excerpt`, `publishDate`, `updatedAt`, `primaryTopic`, `topics`, `contentType`, `pillarUrl` (optional/nullable).
- **No `cluster` field** — derivable from `primaryTopic` + `contentType`.
- **`topics` includes `primaryTopic`** as its first element.

## Final JSON schema

```json
[
  {
    "title": "Why Food Noise Comes Back After Dieting",
    "slug": "why-food-noise-comes-back",
    "url": "https://lsdiet.com/blog/why-food-noise-comes-back",
    "excerpt": "...",
    "publishDate": "2026-05-14T12:00:00.000Z",
    "updatedAt": "2026-05-14T12:00:00.000Z",
    "primaryTopic": "weight-regain",
    "topics": ["weight-regain", "motivation", "food-noise", "behavioural-psychology"],
    "contentType": "supporting",
    "pillarUrl": "https://lsdiet.com/blog/the-complete-guide-to-weight-regain"
  }
]
```

`pillarUrl` is `null` when absent. Sorted newest first. UTF-8, `application/json`.

## Taxonomy & contentType

Unchanged from v2:
- Flat hyphenated lowercase tag list, source-of-truth in `supabase/functions/blog-index/taxonomy.ts` (~50 starter tags across 6 clusters: physiology, behaviour & psychology, diet mechanics, outcomes & failure modes, lifestyle context, tools & comparisons).
- `contentType` enum: `pillar` | `supporting` | `comparison` | `evergreen-faq` (default `supporting`).

## Edge function behaviour

1. Fetch published Contentful posts (`publishDate <= now`, newest first, `limit=1000`, `select` only needed fields).
2. For each post:
   - Normalize topics (lowercase, hyphenate, trim, dedupe).
   - If `topics` empty → derive 3–5 tags from title+excerpt via simple keyword extraction.
   - If `primaryTopic` empty → first item of `topics`.
   - Ensure `primaryTopic` appears in `topics` (prepend if missing).
   - If `contentType` empty → `supporting`.
   - `pillarUrl` → resolve from Contentful link/reference if present, otherwise `null`.
   - Log unknown tags for monthly drift audits.
3. Return `application/json; charset=utf-8`, `Cache-Control: public, max-age=300, s-maxage=600`, CORS `*`.

## Files

- **New:** `supabase/functions/blog-index/index.ts`
- **New:** `supabase/functions/blog-index/taxonomy.ts`
- **Edit:** `supabase/config.toml` — add `[functions.blog-index] verify_jwt = false`
- **Edit:** `public/llms.txt` — add inventory URL pointer

## Contentful fields you'll add manually

In the `blogPost` content type:
- `primaryTopic` — Short text
- `topics` — Short text, list (or comma-separated)
- `contentType` — Short text, validation: one of `pillar` / `supporting` / `comparison` / `evergreen-faq`, default `supporting`
- `pillarUrl` — Short text (paste the full pillar URL), or a Reference field to another `blogPost` (function will resolve to URL). Either works — your call when you're in Contentful.

The function tolerates all four being absent (fallbacks + `null`), so we can ship before backfilling old posts.

Ready to build on approval.