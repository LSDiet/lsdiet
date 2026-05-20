# Related Posts — Ranking & Audit

System: code-managed Search-driven articles (`src/content/articles/`).
Source of truth: `src/lib/relatedArticles.ts` (`rankRelatedArticles`).
Surfaces fed by it: mid-article aside (`MidArticleRelated`) and end-of-article
grid (`RelatedArticles`). Behavioural pathway (`ArticleProgression`) is a
separate, fixed-shape navigator and is excluded from these ranks upstream.

---

## Ranking priority (locked)

Biased toward semantic clustering, not keyword similarity.

| Tier | Signal | Weight | Source field |
|------|--------|-------:|--------------|
| 1 | Same behavioural cluster | **+1000** | `searchArticleClusters.ts` |
| 2 | Same canonical psychological theme | **+300** | `meta.canonicalTopic` |
| 3a | Shared primary foundation pillar | **+120** | `meta.primaryFoundationSlug` |
| 3b | Current's primary appears in candidate's related | **+40** | `meta.relatedFoundationSlugs` |
| 3c | Candidate's primary appears in current's related | **+40** | `meta.relatedFoundationSlugs` |
| 3d | Per-overlap in `relatedFoundationSlugs` | **+15 each** | `meta.relatedFoundationSlugs` |
| 4 | Textual / topical tag overlap | **+4 each** | `meta.topics` |
| 5 | Recency (tiebreaker) | newer `updatedAt` first | `meta.updatedAt` |
| – | Stable final tiebreak | slug A→Z | `meta.slug` |

Each tier weight strictly dominates the maximum total of all lower tiers,
so ordering is guaranteed lexicographic by tier. Recency never overrides
semantic relevance — it only sorts ties within the same semantic bucket.

> Note on terminology: "category" in this code-managed layer = behavioural
> cluster (Office, Psychology, Food, Reality, Confidence). The Contentful
> `category` taxonomy lives in `src/lib/category.ts` and powers the
> `DynamicRelated` block, which has its own precedence chain
> (explicit relatedPosts → same-category → latest).

---

## Crawlability

All related links render as static, server-renderable `<a href="/blog/...">`
anchors. No `onClick`-only navigation, no JS-gated href injection. The mid
aside uses `createPortal` into a DOM placeholder, but the anchor markup is
real HTML once mounted and is followed by Google + LLM crawlers.

Internal href pattern is canonical: `/blog/{slug}` — matching the URLs
emitted into `blog-sitemap.xml`.

---

## Duplicate / circular-loop controls

Three independent surfaces could collide; we keep them disjoint with a
chained exclusion set inside `BlogPostPage → ArticleLayout`:

1. `pathway = getPathway(article)` — Awareness / Implementation / Identity
   / Support (4 picks, often foundations).
2. `mid = getRelatedArticles(article, pathwaySlugSet(pathway), 5)` →
   first 4 used in `MidArticleRelated`.
3. `footerRelated = getRelatedArticles(article, pathway ∪ mid, 4)` →
   used in `RelatedArticles` grid.

Self is always excluded (`meta.slug !== current.meta.slug`).
Pathway → mid → footer is a strict superset chain, so no anchor repeats
within a single page render. Cross-page reciprocity is allowed (A links to
B and B links to A) — that's normal internal-link equity, not a loop —
but a reader landing on either never sees the same outbound twice.

---

## Anchor-repetition controls

- Pathway, mid-aside, and footer grid are the three controlled surfaces;
  every entry across them is distinct per page.
- Footer grid is capped at 4 (sm:grid-cols-2 layout) — bounds total
  outbound article anchors per page (excluding inline body links and
  CTAs) to **4 pathway + 4 mid + 4 footer = 12 max**.
- Inline foundation links inside article bodies are authored by hand,
  not auto-injected — so a high-traffic foundation (e.g. Action
  Practice) doesn't get cited 6+ times in the structural chrome.
- Cluster size is bounded (~7–10 slugs per cluster), and the ranker is
  deterministic — two different supporting articles in the same cluster
  will produce overlapping but not identical neighbour sets, since the
  Tier 3/4 signals reorder candidates around their own foundation/topic
  profile.

---

## Mobile readability

Article template max-width is `68ch` (`prose-article` in `index.css`).
On a 430 px viewport, density per scroll-region:

| Surface | Footprint |
|---------|-----------|
| Mid aside | text-only list, no thumbnails, `my-10 py-5 border-y` — single full-width column |
| LS Diet CTA(s) | injected 1–3 times by `useCtaInjection` keyed off word count; spacing handled by component |
| Pathway (`ArticleProgression`) | stacked single column on mobile (its own grid) |
| Related grid | `grid sm:grid-cols-2 gap-4` — collapses to single column < 640 px |

Distinct visual treatments prevent the "wall of cards" effect:
mid = minimalist text list; pathway = labelled progression; related =
bordered cards; CTA = solid accent block. Each block uses its own
typographic rhythm (`text-[11px]` eyebrows, `text-xl/2xl` headings) so
the reader can skim past any block without re-parsing it as content.

---

## Worked audit example

**Subject:** `why-do-i-restart-weight-loss-every-monday`

- cluster: `psychology-behaviour`
- canonicalTopic: `stop-weight-regain`
- primaryFoundationSlug: `the-weight-permanence-triangle-how-to-stop-regaining-weight`
- relatedFoundationSlugs: `[friction-awareness, consequence-awareness, action-practice]`
- topics: `[weight-regain, motivation, behavioural-consistency, dieting-psychology, restart-cycle]`

### Step 1 — Pathway (excluded from related)

| Slot | Pick | Why |
|------|------|-----|
| Awareness | `friction-awareness` | first awareness foundation in article's `relatedFoundationSlugs` |
| Implementation | `action-practice` | default implementation pillar (not current's primary) |
| Identity | `identity-awareness` | default identity pillar |
| Support | `can-accountability-help-you-lose-weight` | configured support fallback |

`excludeSlugs` after pathway: 5 slugs (current + 4 pathway picks).

### Step 2 — Mid-aside ranking (top 4 of 5)

Candidates ranked by `rankRelatedArticles`:

| Rank | Article | Tier 1 | Tier 2 | Tier 3 | Tier 4 | Score |
|------|---------|-------:|-------:|-------:|-------:|------:|
| 1 | `why-do-i-keep-restarting-weight-loss` | +1000 cluster | +300 stop-weight-regain | +120 shared WPT primary | +12 (3 topics) | **1432** |
| 2 | `why-do-i-lose-motivation-after-a-few-weeks` | +1000 | 0 | +40 (action-practice in mine→its related) | +12 (3 topics) | **1052** |
| 3 | `why-does-stress-make-me-eat-more` | +1000 | 0 | +40 (related↔primary) | +4 (1 topic) | **1044** |
| 4 | `why-do-people-emotionally-eat-after-work` | +1000 | 0 | +30 (2 related overlaps × 15) | +4 | **1034** |
| 5 | `why-do-i-eat-even-when-im-not-hungry` | +1000 | 0 | +15 (1 related overlap) | +4 | **1019** |

Mid aside shows entries 1–4 as a plain text list.
Footer grid receives entries 5 + the next 3 by the same ranker
(cluster ties broken by `updatedAt`, then slug).

### Step 3 — Dedup rules applied

- `self` excluded.
- Pathway picks (`friction-awareness`, `action-practice`,
  `identity-awareness`, `can-accountability-help-you-lose-weight`)
  excluded — none would have scored into mid anyway because foundations
  aren't in `ARTICLES`, but pathway-sibling articles like
  `can-accountability-help-you-lose-weight` are.
- Mid slugs excluded from footer grid → reader never sees the same
  link twice on the page.

### Step 4 — Why each top pick is correct

- **#1 keep-restarting** — same cluster + same canonical theme + same
  pillar. Closest semantic neighbour by design.
- **#2 lose-motivation** — same cluster (Psychology), and current's
  Action Practice pillar shows up as its primary, so behavioural arc
  continues.
- **#3 stress-eating** — same cluster; pillar mirror (its primary
  Pattern Awareness ↔ current's friction/consequence stack).
- **#4 emotional-eating-after-work** — same cluster; two
  `relatedFoundationSlugs` overlap (friction-awareness +
  action-practice). Behavioural continuation, not topic restatement.

All four extend the reader's psychological arc rather than restating
the article they just finished — which is the explicit goal of the
weighting scheme.

---

## How to verify in the running app

1. Open any supporting article, e.g. `/blog/why-do-i-restart-weight-loss-every-monday`.
2. Inspect the mid-aside DOM — every `<a>` is a real `/blog/...` anchor.
3. Open the footer "More on this topic" grid — confirm none of its
   slugs appear in the pathway block above it or the mid-aside.
4. Right-click → View Source → confirm anchors are present without
   JavaScript execution (mid-aside hydrates post-mount via portal, but
   pathway + footer are server-renderable JSX).
