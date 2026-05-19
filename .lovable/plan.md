
# Semantic Content Architecture — Plan v4

## Revised Sequencing Decision

The `/topics/stop-weight-regain` entity hub is **deferred**. An entity hub is an orchestration layer — it summarizes, curates, and maps relationships between existing pillars. Building it before the pillars exist would produce a hub that points at nothing and forces us to invent placeholder relationships we would later rewrite.

New order:

```text
Phase A (NOW)   → Foundational Pillar Development
Phase B (NEXT)  → Entity Hub Construction (/topics/stop-weight-regain)
Phase C (LATER) → Supporting article fan-out + additional hubs
```

---

## Phase A — Foundational Pillar Development

You will supply pillar drafts derived from the LS Diet keynote. My role per pillar:

### 1. Contentful ingestion
- Create each post as a `blogPost` entry.
- Populate the locked semantic fields:
  - `canonicalTopic` — one of the 6 locked values (typically `ls-diet-foundations`, `stop-weight-regain`, or `weight-permanence-triangle`).
  - `subTopic` — optional fan-out key (e.g. an awareness stage).
  - `contentType` = `pillar`.
  - `parentUrl` — left empty for now (hub doesn't exist yet); will be backfilled in Phase B.
  - `topics[]` — ≤5, drawn from the locked free-tag taxonomy in `taxonomy.ts`.
- Author = Oscar Poon (already wired site-wide via `ArticleByline` + JSON-LD `@id`).

### 2. Taxonomy compliance
- Run each pillar through the `blog-index` validator before announcing it as live.
- `X-Taxonomy-Warnings` must be `0` for every pillar.
- Any new tag a pillar legitimately needs is added to `taxonomy.ts` first, then used — never the other way around.
- Governance rules in `GOVERNANCE.md` enforced: one foundation per parent slot, slug immutability, lowercase-hyphenated.

### 3. Interlinking strategy (pillar ↔ pillar, before hub exists)
Since the hub isn't live yet, pillars carry the navigation load themselves:
- Each pillar gets a manually curated **"Related Foundations"** block at the bottom, listing 2–3 sibling pillars by slug.
- Rendered by a new `RelatedFoundations.tsx` component that reads `blog-index`, filters `contentType === "pillar"` with a shared `canonicalTopic`, and excludes the current slug.
- This block is the same component the future hub will reuse — building it now means zero rework in Phase B.

### 4. Frontend rendering
- `/blog` already splits Foundations vs Real Life Weight Questions — pillars appear in the Foundations grid automatically as soon as `contentType: pillar` is set in Contentful.
- `BlogPostPage.tsx` renders the byline, Person `@id` reference, and (new) the `RelatedFoundations` block at the article foot.
- No new routes in Phase A.

### 5. Validation checklist (run per pillar)
- [ ] `blog-index` returns the post with correct `canonicalTopic`, `contentType: "pillar"`, `topics[] ≤ 5`.
- [ ] `X-Taxonomy-Warnings: 0`.
- [ ] Post appears under **LS Diet Foundations** on `/blog`.
- [ ] Byline links to `/oscar-poon`; JSON-LD `author.@id` resolves.
- [ ] `RelatedFoundations` block renders 2–3 siblings (or hides cleanly if fewer than 2 exist).
- [ ] Internal links to other pillars use canonical `/blog/{slug}` URLs.
- [ ] Featured image alt text present; meta description ≤160 chars.

---

## Phase B — Entity Hub Construction (deferred)

Triggered when **≥3 pillars share `canonicalTopic: stop-weight-regain`** (or you give the green light).

When the time comes, the hub will be built as:
- Route: `/topics/stop-weight-regain`.
- Persona: executive semantic overview + curated navigation map — **not** a re-statement of pillar content.
- Composition:
  - **Definition block** — short canonical definition (living, append-friendly).
  - **Pinned curated links** — editor-chosen pillars in narrative order.
  - **Auto-feed** — every post where `canonicalTopic === "stop-weight-regain"` rendered via the same `RelatedFoundations` component, sorted newest-first.
  - **Conceptual map** — visual or list view showing how pillars relate (problem → mechanism → solution → maintenance).
- JSON-LD: `CollectionPage` + `about` referencing the Person `@id`.
- Backfill: each pillar's `parentUrl` set to `https://lsdiet.com/topics/stop-weight-regain`.
- Sitemap: new `sitemap-topics.xml` added to the sitemap index.

Phase B is locked-in design but **not built** until Phase A produces enough material.

---

## Phase C — Supporting Fan-out (later)

Once pillars + hub exist, search-intent supporting posts (`contentType: supporting`) get authored against the pillars (`parentUrl` → pillar URL, not hub). This is the existing Tier-3 design from v3 — unchanged, just sequenced last.

---

## What's not changing

- Locked canonical topic enum (6 values).
- `taxonomy.ts` + `GOVERNANCE.md` rules.
- `/oscar-poon` author entity and site-wide author propagation.
- `/blog` Foundations / Real Life split.
- `blog-index` JSON contract (`parentUrl` + `parents[]` already future-proofed).

## What I need from you to start Phase A

The first pillar draft (title + body + your intended `canonicalTopic` + any pillar-to-pillar links you already have in mind). I'll handle ingestion, validation, and the `RelatedFoundations` wiring.
