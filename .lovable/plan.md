# Semantic Content Architecture — Plan v5

## Two-System Architecture (locked)

The blog runs on **two distinct publishing systems**, chosen by content tier:

| Tier                         | System                | Why                                                                 |
| ---                          | ---                   | ---                                                                 |
| **Foundations** (pillars, entity hubs) | Code-managed (`src/content/foundations`) | Long-term semantic authority. Full control over URLs, schema, interlinking, hierarchy, governance. |
| **Real Life Weight Questions** (supporting, comparison, FAQ) | Contentful | High-volume publishing workflow. Editorial speed, no deploy needed. |

Foundations are written by ChatGPT and implemented directly into the codebase by Lovable. Contentful is reserved for the future high-volume supporting-article workflow.

---

## Why this split

An entity hub is an orchestration layer — it summarizes, curates, and maps relationships between existing pillars. The semantic authority layer (foundations + hubs) cannot drift, must have deterministic URLs, and must control its own JSON-LD. Putting that in a CMS introduces:

- editorial risk (slug renames, accidental unpublish)
- schema drift
- a separate place to maintain interlinking logic
- a content type only Oscar can author safely

By keeping foundations in code, every pillar ships with its taxonomy, parents, related topics, FAQ schema, and `RelatedFoundations` wiring already verified by TypeScript and the build pipeline.

---

## Implementation status

### Built
- `src/content/foundations/types.ts` — `Foundation` contract (meta + Body component).
- `src/content/foundations/index.ts` — registry + `getFoundationBySlug`.
- `src/content/foundations/why-people-regain-weight-after-dieting.tsx` — first pillar.
- `src/lib/blogIndex.ts` — merges foundations into the index so `RelatedFoundations` and `/blog` see them.
- `src/pages/BlogPostPage.tsx` — foundation lookup runs first; Contentful is the fallback.
- `src/pages/BlogPage.tsx` — Foundations grid now sources from the code registry.
- `src/components/RelatedFoundations.tsx` — already in place, fed by the merged index.
- `supabase/functions/blog-index/taxonomy.ts` — added `behavioural-permanence`, `consistency`, `emotional-eating`, `dieting-psychology`.
- `public/sitemap-pages.xml` — first foundation URL added at priority 0.9.
- `public/llms.txt` — first foundation referenced for AI discovery.

### Adding a new foundation (recipe)
1. Create `src/content/foundations/<slug>.tsx` exporting a `Foundation` default.
2. Add it to `FOUNDATIONS` in `src/content/foundations/index.ts`.
3. Add the canonical URL to `public/sitemap-pages.xml`.
4. Add a one-line entry under "Pages" in `public/llms.txt`.
5. If the post needs new free tags, add them to `taxonomy.ts` first.

That's it — no Contentful entry, no Management API, no manual schema work. The `RelatedFoundations` block auto-discovers siblings via shared `canonicalTopic`.

---

## Phase B — Entity Hub Construction (deferred)

Triggered when ≥3 foundations share `canonicalTopic: stop-weight-regain` (or on your call).

The `/topics/stop-weight-regain` hub is also code-managed (same `Foundation` contract, `contentType: "entity-hub"`). When built, it will:
- live at `/topics/stop-weight-regain` (new route)
- pin curated foundation links in narrative order
- auto-feed via `RelatedFoundations` for everything sharing the canonical topic
- emit `CollectionPage` JSON-LD with `about` → Oscar Poon `@id`

Pillar `parentUrl` already points at the future hub URL — no backfill needed when it ships.

---

## Phase C — Supporting Fan-out (Contentful)

Once foundations exist, search-intent supporting posts (`contentType: supporting`) are authored in Contentful, with `parentUrl` pointing at their parent pillar (not the hub). This is the high-volume workflow Contentful was kept for.

---

## What's not changing
- 6 locked canonical topics, governance in `GOVERNANCE.md`, slug immutability.
- `/oscar-poon` author entity, site-wide byline + JSON-LD `@id`.
- `/blog` Foundations / Real Life split.
- The `blog-index` JSON contract.
