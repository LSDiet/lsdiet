# Plan v2 — /blog clustering + supporting-article framework experience

Incorporates all feedback. Rendering-layer only. No changes to slugs, SEO schema, routing, foundations, taxonomy, sitemap, Contentful, or article body text.

---

## Problem 1 — Cluster the Search-driven section on /blog

Unchanged from v1. Five manually curated behavioural clusters replace the topic-bucketed feed; visuals mirror `FoundationsCurriculum`.

**New file** `src/lib/searchArticleClusters.ts` — static config of `{ id, title, description, slugs[] }` for the 5 clusters, plus a `clusterOfSlug(slug)` helper consumed by Problem 2.

**Modified** `src/components/SearchDrivenIndex.tsx` — renders clusters in fixed order. Unmapped supporting entries fall into a "More" bucket only if any exist (no empty buckets). All `<a>` links remain server-rendered (no accordions/modals).

Cluster visual:
- Cluster H3: `text-sm md:text-base font-bold uppercase tracking-[0.18em]`
- One-line muted description below H3
- Title-only rows, `divide-y divide-zinc-100`, hover → amber + arrow
- Desktop hover-reveal excerpt via grid-rows transition
- Stacked vertically on all breakpoints

---

## Problem 2 — Supporting article pages become framework nodes

Scope: `vm.source === "article"` branch of `BlogPostPage.tsx` only. Foundations/Contentful render unchanged.

### A. Typography & content hierarchy (the biggest visual fix)

Goal: scanability + emphasis rhythm, **not** densification. Preserve whitespace.

CSS additions to `src/index.css` under a new `.prose-article` class (applied only when `vm.source === "article"`):

- **Reading width**: `max-w-[68ch]` on the article wrapper. Container becomes narrower than the current `max-w-3xl`. Mobile keeps full-width.
- **H2 hierarchy**: `text-2xl md:text-[1.75rem] font-extrabold tracking-tight`, `mt-14 mb-4`, with a short amber rule above (`::before` 32px amber bar). Strong visual section break — not just bigger text.
- **H3** (rare in articles): `text-lg font-bold mt-10 mb-3`.
- **Paragraphs**: `leading-[1.75]`, `mb-5`, `text-[17px]`, color `text-zinc-800`. Generous breathing room kept.
- **First paragraph of each section**: bumped to `text-[18px] font-medium text-zinc-900` via `.prose-article h2 + p` to create a "lead sentence" rhythm without rewriting copy.
- **Strong/em**: `<strong>` rendered as `font-semibold text-zinc-900`; existing inline emphasis from article TSX gains visual weight automatically.
- **Lists**: tighter `space-y-2`, custom bullet using amber dot.

No wall-of-text. Just stronger section anchors and a lead-line rhythm.

### B. Article header — calm, oriented, low-friction

Restructure the header on supporting articles only:

1. **Breadcrumb (new)** — text-only line above the H1:
   `LS Diet Foundations → Psychology & Behaviour → Why Do I Restart Weight Loss Every Monday?`
   - Source: first segment static, middle segment from `clusterOfSlug(slug).title`, last segment is current title (truncated/aria-current).
   - Style: `text-xs uppercase tracking-[0.18em] text-zinc-500`, arrow separators in muted accent.
   - Replaces the generic `PageBreadcrumb` for article-source posts (foundations/Contentful keep theirs).

2. **H1**: drop to `text-2xl md:text-4xl`, tighter `mb-3`.

3. **Byline row** (new compact layout): `Oscar Poon · May 20, 2026 · 4 min read`
   - Reading time computed from article body word count via a small helper `src/lib/readingTime.ts` (≈225 wpm, min 2). For TSX article bodies, the helper accepts the article slug and reads from a precomputed map built at module load by rendering bodies to a hidden static string OR — simpler — by walking `React.Children` of `<Body />` at runtime to extract text. Implementation: lightweight `useMemo` that mounts `<Body />` into a detached `DocumentFragment` via `renderToStaticMarkup` (already available through `react-dom/server`) and strips HTML.
   - Style: `text-xs md:text-sm text-zinc-500`, single line, em-dash separators on mobile if needed.

4. **Foundation authority line** (Section D from v1) — directly under byline:
   *Part of the LS Diet Foundations ecosystem · [primary foundation title]*
   `text-xs text-zinc-500`, foundation link in muted accent.

5. **Remove share icons from header.** Sharing now lives in two places only:
   - Desktop sticky rail (already exists, kept).
   - Single inline share row at the bottom of the article (above the progression block), no headline copy, no card.

### C. True mid-flow Related Reading block

New component `src/components/MidArticleRelated.tsx` — minimal text-only `<aside>`, hairline top/bottom rules, small uppercase label, 3–4 bullet links.

**Programmatic injection — no article TSX edits**:

`BlogPostPage` wraps the rendered article body in a `<div ref>`. A `useLayoutEffect` runs after mount:

1. Query all `<h2>` inside the wrapper.
2. Insertion target = `headings[1]` (the 2nd H2). If fewer than 2 H2s, fall back to a paragraph at ~40% scroll height of the wrapper.
3. Insert a `<div data-mid-related-slot>` placeholder before that target node.
4. The placeholder is then hydrated with a React portal rendering `<MidArticleRelated items={...} />`.

This delivers true mid-flow placement without splitting any article. The block visually feels embedded — not appended.

Items shown: ranks 2–5 from Section E logic (rank 1 is reserved for end-of-article).

### D. Behavioural pathway routing (the differentiator)

Replaces v1's purely semantic ranking. New helper `src/lib/behaviouralPathway.ts` exposes:

```text
getPathway(currentArticle) → {
  awareness:      Foundation | Article    // "see the pattern"
  implementation: Foundation | Article    // "do the work"
  identity:       Foundation | Article    // "become the person"
  support:        Article                  // "don't go alone"
}
```

Pathway stages (locked):

```text
Problem  →  Awareness  →  Implementation  →  Identity  →  Support
(article)   (awareness   (action-practice  (identity-   (accountability /
            foundation   foundation /       awareness    community
            or aware-    related impl-      foundation)  article)
            ness article)oriented article)
```

Selection rules per stage:

- **Awareness**: prefer the article's `primaryFoundationSlug` if it's one of `pattern-awareness / friction-awareness / consequence-awareness / reality-awareness`. Otherwise pick the awareness foundation most-shared via `relatedFoundationSlugs` or topic overlap.
- **Implementation**: prefer `action-practice` foundation; if the current article *is* about action-practice, pick the strongest in-cluster sibling that demonstrates a behaviour (meal prep, plateaus, exercise after work, etc.).
- **Identity**: prefer `identity-awareness` foundation; fallback to an identity/confidence-cluster article (e.g. `how-weight-loss-changes-confidence-and-social-behaviour`).
- **Support**: prefer `can-accountability-help-you-lose-weight`; fallback to a same-cluster supporting article not already used in the chain.

Deduplication ensures no slot repeats the current article or another slot's pick.

### E. Related ranking for the mid-flow block

`src/lib/relatedArticles.ts` — ranking chain used by the mid-flow aside (Section C):

1. Same cluster (from `searchArticleClusters`).
2. Same `canonicalTopic`.
3. Shared `primaryFoundationSlug`.
4. Shared `topics` (intersection count).

Returns top 5, deterministic, current slug excluded, pathway picks excluded so the two blocks don't repeat each other.

### F. End-of-article progression

`src/components/ArticleProgression.tsx` renders the pathway as a structured 4-row list (replaces the generic "Continue reading" card for articles only):

```text
Continue the LS Diet Framework
─────────────────────────────────
  Awareness        →  [pathway.awareness.title]
  Implementation   →  [pathway.implementation.title]
  Identity         →  [pathway.identity.title]
  Support          →  [pathway.support.title]

  [Varied CTA copy]  →  https://www.skool.com/lsdiet/about
```

Minimal styling: hairline dividers, amber accent on hover, tiny uppercase stage labels in muted grey. Not a salesy card.

Foundation/Contentful posts keep the current "Continue reading" block.

### G. CTA copy variation (Section H from v1)

`src/lib/articleCta.ts` — deterministic slug → label hash over five variants:

- "Learn the LS Diet system"
- "Explore the free LS Diet framework"
- "Start the free Action Practice lessons"
- "Join the LS Diet behavioural system"
- "Join the free LS Diet Course"

URL stays the Skool URL.

### H. Inline interlinking governance

`GOVERNANCE.md` gains a "Supporting Article Interlinking" section: min 3 / ideal 5–8 internal links per article, ≥1 foundation, ≥1 awareness, ≥1 adjacent supporting, no duplicate anchor spam, varied CTA copy. No code-enforced check this pass; used as the author rule sheet.

Light audit pass: scan each of the 40 article TSX files; only add 1–2 inline `<a>` on existing concept mentions where below threshold. **No prose rewrites.**

---

## Files touched

**New**
- `src/lib/searchArticleClusters.ts`
- `src/lib/relatedArticles.ts`
- `src/lib/behaviouralPathway.ts`
- `src/lib/articleCta.ts`
- `src/lib/readingTime.ts`
- `src/components/MidArticleRelated.tsx`
- `src/components/ArticleProgression.tsx`
- `src/components/ArticleBreadcrumb.tsx`

**Modified**
- `src/components/SearchDrivenIndex.tsx` — cluster rendering.
- `src/pages/BlogPostPage.tsx` — article-only header (breadcrumb, byline + reading time + authority line, no share icons), narrower wrapper, mid-flow related injection, `ArticleProgression` footer, single bottom share row.
- `src/index.css` — `.prose-article` typography block.
- `GOVERNANCE.md` — interlinking + CTA rules.

**Audit pass** on `src/content/articles/*.tsx` — additive inline links only, no body rewrites.

---

## Out of scope (explicitly untouched)

Foundations content/structure/styling/ordering/metadata, FoundationsCurriculum, real slugs, SEO JSON-LD, routing, Contentful, taxonomy, sitemap, edge functions, article URLs, article body prose.

## Technical notes (for reference)

- Mid-flow injection uses `useLayoutEffect` + a React portal into a DOM-inserted placeholder — no body TSX changes, no SSR risk (this app is client-rendered).
- Reading time uses `react-dom/server`'s `renderToStaticMarkup` on `<article.Body />` once per article via `useMemo`. Bundle impact: `react-dom/server` is already in the tree via existing tooling; if not, fallback is a regex word count on the TSX module text via a Vite virtual import.
- Reading width `68ch` keeps long-form copy inside the 65–75ch target without breaking the existing breakpoint system.
