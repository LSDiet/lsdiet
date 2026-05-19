## Goal

Make the **LS Diet Foundations** section read as a guided framework / "start here" curriculum — title-dominant horizontal rows in a fixed manual order — while leaving **Real Life Weight Questions** completely unchanged.

## What changes

### 1. Manual ordering for foundations

Add an `order: number` field to `FoundationMeta` (in `src/content/foundations/types.ts`). Lower = earlier in the curriculum. Sort happens once at the consumer; never by date.

Assign:
1. `why-people-regain-weight-after-dieting` → order 1
2. `why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting` → order 2 (display title in the list: **"Low-Starch, Low-Sugar (LS) Foundations"**)
3. `weight-permanence-triangle` → order 3 *(placeholder row — see §4)*
4. `the-5-awareness-stages` → order 4 *(placeholder row)*
5. `action-practice-examples` → order 5 *(placeholder row)*

The two existing foundation files keep their full canonical titles for SEO/JSON-LD; the curriculum list can show a shorter `listTitle` override (new optional field on `FoundationMeta`) when the canonical title is too long for a row.

### 2. New component: `FoundationsCurriculum`

Create `src/components/FoundationsCurriculum.tsx`. Replaces the foundations branch inside `BlogPage`'s `BlogSection` call.

Row anatomy (desktop ≥ md):

```text
┌──────────────────────────────────────────────────────────────────┐
│ 01 │ [thumb] │ TITLE (xl, bold, uppercase)                    →  │
│    │  56x56  │ one-line excerpt (sm, muted, truncate)            │
└──────────────────────────────────────────────────────────────────┘
```

- Big amber number `01`–`05` on the far left (`text-2xl font-extrabold text-accent tabular-nums`, fixed width).
- Square thumbnail `h-14 w-14` (56px) rounded, `object-cover`, never stacks above the title.
- Title is the dominant element: `text-lg md:text-xl font-extrabold uppercase tracking-tight`.
- Excerpt: `text-sm text-zinc-600 line-clamp-1` (desktop) / hidden on mobile to keep rows tight.
- Right arrow `→` (lucide `ArrowRight`) appears on hover.
- Row: `flex items-center gap-4 py-3 border-b border-border last:border-0`, hover → `bg-accent/5`.
- Whole row is one `<a href="/blog/{slug}">`.

Mobile (`< md`):
- Thumbnail shrinks to `h-10 w-10` (40px), still left-aligned, never above title.
- Excerpt hidden.
- Number stays visible but `text-lg`.
- Result: each row ≈ 56px tall → all 5 rows fit in ~300px, well above the fold at 640×571.

### 3. Section framing

Above the list:
- Small eyebrow: **"START HERE"** in amber, `text-xs font-semibold uppercase tracking-[0.18em]`.
- Heading: **"LS Diet Framework"** (replaces "LS Diet Foundations" as the section title).
- Sub: "Read these in order. Each one builds on the last."

No card wrapper around individual rows — rows sit directly on the page background separated by thin borders. This is what kills the "blog feed" feel.

### 4. Placeholder rows for unbuilt pillars

Rows 3–5 don't have content yet. Two options — recommending **(a)** so the curriculum looks complete from day one:

(a) Render placeholder rows with a "Coming soon" badge (`text-[10px] uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded`), no link, muted opacity (`opacity-60 cursor-default`). Define them inline in `FoundationsCurriculum` as a fallback list merged with real foundations by `order`.

(b) Only show the 2 real ones. Loses the curriculum feel.

Going with **(a)** unless you say otherwise.

### 5. BlogPage wiring

In `src/pages/BlogPage.tsx`:
- Replace the first `<BlogSection ... posts={foundations} />` call with `<FoundationsCurriculum posts={foundations} />`.
- Keep the second `<BlogSection ... posts={supporting} />` call **exactly as-is**.
- Keep `collectionSchema` unchanged.

### 6. Sort behaviour

`fetchBlogIndex` / `BlogPage` currently sort by `publishDate desc`. Leave that for `supporting`. For `foundations`, sort by `order asc` inside `FoundationsCurriculum` (don't rely on the page-level sort).

## What does NOT change

- `BlogSection` component and Real Life Weight Questions rendering — untouched.
- Individual blog post pages (`BlogPostPage`) — untouched.
- `RelatedFoundations` component — untouched (it already uses its own card style on post pages, not in the index).
- JSON-LD, sitemap, llms.txt, taxonomy — untouched.
- Foundation post content files themselves — only metadata gets `order` (+ optional `listTitle`).

## Files touched

- `src/content/foundations/types.ts` — add `order: number` and optional `listTitle?: string`.
- `src/content/foundations/why-people-regain-weight-after-dieting.tsx` — add `order: 1`.
- `src/content/foundations/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting.tsx` — add `order: 2`, `listTitle: "Low-Starch, Low-Sugar (LS) Foundations"`.
- `src/components/FoundationsCurriculum.tsx` — new.
- `src/pages/BlogPage.tsx` — swap foundations section, update eyebrow/heading copy.

No backend, no edge function, no schema, no new dependencies.
