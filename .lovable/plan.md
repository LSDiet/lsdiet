
# Bulk Search-driven Articles — Implementation Plan (v2)

A new code-managed content layer for high-volume, Reddit-mined supporting articles. Runs in parallel with Contentful (untouched) and the 9 foundation pillars (untouched). Adjustments from your feedback are applied below.

## Architecture

Three independent content layers after this change:

```text
src/content/foundations/   → 9 pillars + hubs (authority — deepest, framework-centric)
Contentful                 → curated editorial / "Real Life Weight Questions"
src/content/articles/      → NEW: Search-driven utility posts (title + body, no images)
```

All three merge into `blogIndex.ts` and route through the existing `/blog/:slug` page.

**Slug collision precedence (locked):**

```text
Foundations > Contentful > Articles
```

Foundations are authoritative. Contentful is editorial. Articles are the scalable utility layer and never override curated content.

## Content discipline (locked rules)

Articles are **search-entry pages**, not mini-foundations. Each article must:

- Solve one immediate search problem
- Answer one intent clearly
- Create recognition ("oh — there's a system behind this")
- Route deeper into LS Diet

Each article must NOT:

- Re-explain the WPT framework end-to-end
- Re-teach the 5 Awareness Stages from scratch
- Repeat the entire behavioural system
- Compete with the foundation it supports

Foundations remain the deepest, most comprehensive, most framework-centric layer. Articles point *up* into them.

## What I will build

### 1. New folder: `src/content/articles/`

- `types.ts` — `ArticleMeta` + `Article`:
  - `slug`, `title`, `excerpt`, `metaDescription`
  - `publishDate`, `updatedAt`
  - `canonicalTopic` (one of the 6 enum values)
  - `topics[]` (≤5)
  - `primaryFoundationSlug` (the pillar this post feeds)
  - `relatedFoundationSlugs[]` (2–4 more)
  - No `featuredImage`, no `order`, no `listTitle`
- `index.ts` — registry exporting `ARTICLES: Article[]` and `getArticleBySlug()`.
- 40 `.tsx` files. Each contains metadata + a `Body` component with semantic HTML (h2/h3/p/ul) and contextual inline links. No "Related posts" footer block — links are woven into prose.

### 2. Interlinking rules (revised per your feedback)

- **3–6 contextual inline links** total per article
- **One early link** when natural — not forced into a fixed word range
- **One deeper reinforcement link** later in the body
- **Anchor variation** throughout — never repeat the same anchor in one post
- Links flow *upward* only: articles → foundations. Foundations do not link down to articles in this pass.

Natural variation > rigid positioning. No detectable templating pattern across the 40.

### 3. Article-craft variation rules

To avoid a same-template footprint across 40 posts published the same day, drafts will vary deliberately:

- **Intros:** mix of question-framed, story-framed, myth-busting, stat-led, and direct-answer openers
- **Subsection counts:** range 2–6 H2s per post; don't standardize
- **FAQ blocks:** present in some posts, absent in others; FAQ count varies when used
- **Emotional framing:** mix validating, challenging, calming, blunt, and curious tones
- **Rhythm:** mix short paragraphs, long paragraphs, lists, blockquotes, single-sentence punches
- **Length:** target 600–1,100 words but allow swing — not every post lands at the same word count
- **CTA:** vary phrasing and placement; sometimes mid-body, sometimes closing line

### 4. Merge into the blog index

- `src/lib/blogIndex.ts` — map `ARTICLES` into `BlogIndexEntry` with `contentType: "supporting"`.
- Precedence on slug collision: **Foundations > Contentful > Articles** (articles are filtered out when a Contentful or Foundation post shares the slug).
- `src/pages/BlogPostPage.tsx` — lookup order: foundation → Contentful → article → 404. Articles render with the existing post layout, byline, and Article JSON-LD.

### 5. Redesigned Search-driven section on `/blog`

Replace the current `BlogSection` card grid (for supporting posts) with `SearchDrivenIndex`:

- Group posts by `canonicalTopic` (≈6 buckets, matching the locked enum in `GOVERNANCE.md`)
- Each bucket = a heading (human-readable topic name) + a vertical list of titles
- Title-only rows, no thumbnails, no dates inline
- Hover or focus reveals the one-line excerpt (same CSS grid-row-template transition as `FoundationsCurriculum`)
- Each row is a native `<a href="/blog/{slug}">`
- Renders below `<FoundationsCurriculum />`, above the footer
- Contentful posts already in the index appear in their bucket alongside articles — same `canonicalTopic` field drives both

Layout sketch:

```text
LS Diet Framework  (existing FoundationsCurriculum)
─────────────────────────────────────────────
Search-driven articles
  ▸ Stop Weight Regain
      Why do I always regain weight after losing it?
      What is the science behind weight regain?
  ▸ Weight Permanence Triangle
      …
  ▸ Awareness Stages
      …
  ▸ Action Practice Examples
      …
  ▸ LS Diet Foundations
      …
  ▸ LS Diet Examples
      …
```

### 6. SEO plumbing

- `public/sitemap-pages.xml` — append all 40 new URLs (priority 0.6, today's date)
- `public/llms.txt` — add "Search-driven articles" section listing titles + slugs
- Each article emits Article + BreadcrumbList JSON-LD via Helmet; FAQPage schema only when the post genuinely has Q&A structure (not forced)
- Canonicals point to `https://lsdiet.com/blog/{slug}`

### 7. Governance update

Append to `supabase/functions/blog-index/GOVERNANCE.md`:

- Slug precedence rule: Foundations > Contentful > Articles
- "Articles are search-entry pages, not mini-foundations" content discipline
- Anti-template variation checklist for future bulk drops
- All-published-today precedent noted for Search Console monitoring

## Execution plan

Delivery in two consecutive turns (no plan changes between):

- **Turn A:** scaffolding (types, index, blogIndex merge with corrected precedence, BlogPostPage routing, SearchDrivenIndex component, sitemap/llms scaffolding, governance update) + first 20 articles.
- **Turn B:** remaining 20 articles + final sitemap/llms sync.

## What I need from you

You chose "Full drafts from you (or ChatGPT)". For each of the 40 posts, paste:

1. Title
2. Slug (or I'll generate)
3. Body (HTML or markdown)
4. `canonicalTopic` (one of the 6 enum values) — or I'll infer
5. `primaryFoundationSlug` — or I'll infer

If you only have titles + angles, say so and I'll switch modes — but the variation discipline above is much easier to enforce when drafts come from you.

## Out of scope

- No changes to Contentful, the publishing pipeline, or the foundations
- No thumbnails, OG images, or featured images for the 40 articles
- No `/topics/*` entity hubs (still deferred)
- No reciprocal foundation → article links in this pass
