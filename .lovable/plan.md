
# Semantic Content Architecture — Plan v3

Locks in LS-Diet-native taxonomy, canonical author URL, and the flagship entity hub. Supersedes v2.

---

## The 3 Tiers (unchanged)

```text
Tier 1: Entity Hubs        /topics/stop-weight-regain (flagship), /topics/weight-permanence-triangle, ...
            ▲
Tier 2: Foundations        /blog/{slug}  (contentType: pillar, parents → hub)
            ▲
Tier 3: Supporting         /blog/{slug}  (contentType: supporting | evergreen-faq, parents → foundation)
```

Author entity at `/oscar-poon`, propagated site-wide via bylines, JSON-LD, and recurring author block.

---

## Newly locked decisions

### A. Canonical topics — LS Diet system architecture, not generic SEO

`CANONICAL_TOPICS` enum (first wave, locked):

| Slug | Role |
|---|---|
| `stop-weight-regain` | **Flagship hub.** Core conceptual centre of LS Diet. |
| `weight-permanence-triangle` | The proprietary framework. Owned terminology. |
| `awareness-stages` | The 5 Awareness Stages framework. Designed to expand (see below). |
| `action-practice-examples` | Practical daily-action systems. |
| `ls-diet-foundations` | The foundational principles of the LS Diet lifestyle. |
| `ls-diet-examples` | Real-world LS Diet examples (meals, days, decisions, scenarios). |

These replace earlier generic candidates (`food-noise`, `insulin-resistance`, etc.). Generic terms can still appear as **`topics[]`** tags on individual posts — they're search hooks, not canonical anchors.

### B. Awareness Stages — expansion-ready by design

`awareness-stages` is one entity hub, but the architecture must support per-stage sub-content without refactoring:

- Each of the 5 stages will eventually have its own foundation/supporting articles whose `canonicalTopic = 'awareness-stages'`.
- Add an **optional** `subTopic` field on `blogPost` (free text today; can be enum-locked later — e.g. `stage-1-unaware`, `stage-2-aware`, …).
- Entity hub template renders an optional "By stage" grouping when posts in the feed have `subTopic` values; otherwise renders the flat "Latest from this topic" list.
- No schema change needed when stages get expanded — just publish posts with the right `subTopic`.

### C. Canonical author URL

- New canonical: **`/oscar-poon`**
- Existing `/about-oscar-poon` → permanent **301 redirect** to `/oscar-poon`.
- All schema `@id`, bylines, "About the author" footer blocks, JSON-LD `author` references, and authored-work links resolve to `/oscar-poon`.
- Internal links (footer, navbar, body copy) updated in the same pass.
- Redirect implementation: since this is a SPA on Lovable hosting, the React Router route `/about-oscar-poon` renders a small component that issues a client `<Navigate replace to="/oscar-poon">` AND a `<link rel="canonical" href="https://lsdiet.com/oscar-poon">` + `<meta http-equiv="refresh">` for crawlers. (True server 301 is not available on Lovable hosting for SPA paths.)

### D. First flagship entity hub

`/topics/stop-weight-regain` is the first end-to-end implementation. Every other hub is built against this template afterwards.

Initial pinned/curated "Start Here" links for the hub should point at:
- Weight Permanence Triangle™ page
- Awareness Stages page
- About Oscar Poon (`/oscar-poon`)
- A foundation post explaining why people regain (to be authored)

Auto "Latest from this topic" feed pulls posts where `canonicalTopic === 'stop-weight-regain'`.

---

## Workstreams (revised)

### 1. Taxonomy lock-file

`supabase/functions/blog-index/taxonomy.ts`:

```ts
export const CANONICAL_TOPICS = new Set([
  "stop-weight-regain",
  "weight-permanence-triangle",
  "awareness-stages",
  "action-practice-examples",
  "ls-diet-foundations",
  "ls-diet-examples",
]);
export const MAX_TOPICS_PER_POST = 5;
```

`CONTENT_TYPES` adds `entity-hub`. `validateCanonicalTopic()` with did-you-mean. The broader `TAXONOMY` set (current ~50 tags) stays — those become free `topics[]` tags, not canonical anchors.

### 2. Future-ready data model

`blogPost` Contentful fields:
- `canonicalTopic` (single, enum-locked to `CANONICAL_TOPICS`)
- `subTopic` (optional, free text — for Awareness Stages and similar fan-outs)
- `topics[]` (max 5, free tags from `TAXONOMY` for search hooks)
- `parentUrl` (single today; emitted as `parents[]` in API for multi-parent future)

`blog-index` response always includes `parents[]`, `relatedTopics[]`, `subTopic` — even when empty/null. Consumers code against the future shape from day one.

### 3. `entityHub` Contentful content type

Fields: `canonicalTopic` (enum, unique), `title`, `slug` (immutable post-publish), `definition` (rich text), `pinnedReading[]` (max 6 references), `faqs[]`, `relatedTopics[]` (references to other hubs, present but unused initially), `metaDescription`, `featuredImage`.

New edge function: `supabase/functions/topics-index/index.ts` — same governance as `blog-index`.

### 4. `/topics/:slug` route + template

`src/pages/EntityHubPage.tsx`:

1. Hero definition (owned)
2. **Start Here / Core Reading** — curated `pinnedReading`
3. **Latest from this topic** — auto from `blog-index`, filtered by `canonicalTopic`, excludes pinned
4. **By stage** (conditional — only renders for `awareness-stages` once `subTopic` posts exist)
5. FAQ accordion + FAQPage JSON-LD
6. Author block linking `/oscar-poon`
7. Reserved "Related topics" slot (renders only if `relatedTopics[]` non-empty)

### 5. `/blog` page split

`src/pages/BlogPage.tsx`:
- Section 1: **LS Diet Foundations** — `contentType === 'pillar'`
- Section 2: **Real Life Weight Questions** — `contentType` in `['supporting', 'evergreen-faq']`

### 6. Site-wide author propagation

- New `src/components/ArticleByline.tsx` (links to `/oscar-poon`)
- Auto "About Oscar" footer block on every blog post and entity hub
- All article JSON-LD uses `author: { @type: 'Person', @id: 'https://lsdiet.com/oscar-poon#person' }`
- `/oscar-poon` page emits the full Person object with that `@id` (single source of truth)

### 7. `/oscar-poon` page + 301 from `/about-oscar-poon`

- Create `src/pages/OscarPoonPage.tsx` (port content from `AboutOscarPoonPage.tsx`, set canonical to `/oscar-poon`, full Person JSON-LD with `sameAs` YouTube/IG/TikTok/LinkedIn, authored-works list from `blog-index`)
- Convert `src/pages/AboutOscarPoonPage.tsx` into a client-side redirect component (`<Navigate replace>` + canonical + meta refresh fallback)
- Update internal links: `FooterSimple.tsx` "About Oscar Poon" link → `/oscar-poon`; same for Navbar and any inline references

### 8. Auto "Related Foundations" on post pages

Reads `parents[]` (future-proof). Fallback: same `canonicalTopic`. Always links the parent hub.

### 9. Taxonomy governance (code-enforced)

| Rule | Mechanism |
|---|---|
| One `canonicalTopic` per page | Single-value field |
| Must be in `CANONICAL_TOPICS` | `validateCanonicalTopic()` |
| Max 5 `topics[]` | Truncate + warn in `blog-index` |
| Slugs immutable post-publish | Slug-change detector logs warning |
| Lowercase-hyphenated naming | `normalizeTag()` |
| No duplicate foundation under same parent | Detected during index build |
| URL permanence for hubs | Hub slug = `canonicalTopic` (enum-locked) |

Plain-English `GOVERNANCE.md` lives next to `taxonomy.ts` for Contentful editors.

### 10. Modular sitemap

- `public/sitemap.xml` → sitemap **index**
- `public/sitemap-pages.xml` (exists) — static routes
- `supabase/functions/blog-sitemap` (exists) — blog posts
- **New:** `supabase/functions/topics-sitemap` — entity hubs
- Reserved (not built now): `image-sitemap`, `video-sitemap`
- Add 301 source `/about-oscar-poon` is removed from sitemap; only `/oscar-poon` is listed

---

## Build order

1. Taxonomy lock-file (`CANONICAL_TOPICS` with LS-Diet-native values) + governance enforcement in `blog-index`
2. Update `blog-index` response to emit `parents[]`, `relatedTopics[]`, `subTopic`
3. `/blog` split into Foundations vs Real Life
4. `ArticleByline` + auto "About Oscar" footer block + author JSON-LD wiring
5. `/oscar-poon` page + 301 from `/about-oscar-poon` + internal link sweep
6. `entityHub` Contentful type + `topics-index` edge function
7. `/topics/:slug` template — first end-to-end build: **`/topics/stop-weight-regain`**
8. Sitemap index + `topics-sitemap`
9. Auto "Related Foundations" block on post pages (uses `parents[]`)

Each step ships and verifies independently.

---

## Explicitly deferred

- Per-stage Awareness articles (architecture ready via `subTopic`; content later)
- Multi-parent editing UI (data shape ready)
- Cross-hub `relatedTopics` rendering (field present, unused)
- Image and video sitemaps (index pattern ready)
- `problemState[]` psychological adjacency
- Vector DB / embeddings — the graph is a side-effect of disciplined metadata

---

Approve to proceed with step 1.
