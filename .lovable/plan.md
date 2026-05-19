## Two changes to `src/components/FoundationsCurriculum.tsx`

### 1. Smooth hover-expand for the excerpt

Keep one line of excerpt by default; on hover (or keyboard focus) of the row, smoothly expand to show the full text — no click required.

**Technique** (pure CSS, no JS, no layout jank):

- Wrap the excerpt `<p>` in a `<div>` with `grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out`.
- Default state: `grid-rows-[1.4rem]` (one line tall, clipped by `overflow-hidden`).
- On `group-hover` / `group-focus-within`: `grid-rows-[1fr]` — grid animates to the natural content height, so the row pushes down smoothly regardless of excerpt length.
- The inner `<p>` keeps `text-sm text-zinc-600 leading-snug`. Drop `line-clamp-1` — clipping is now handled by the wrapper height.
- Add `transition-colors` on the row's background so the amber `bg-accent/5` hover tint fades in at the same speed.

The `<a>` already carries the `group` class so `group-hover:` works on the wrapper. Add `group-focus-within:` so keyboard tab also expands.

(The simpler `max-height` trick has snap-back issues when the excerpt length varies. The `grid-rows` trick animates cleanly to `auto`.)

### 2. Restructure: WPT becomes a master pillar with nested sub-pillars

New curriculum hierarchy (replaces the current 3 placeholders):

```text
01  Why People Regain Weight After Dieting        [live]
02  Low-Starch, Low-Sugar (LS) Foundations        [live]
03  Weight Permanence Triangle                    [coming soon — master]
     ├─ Reality Awareness                         [coming soon]
     ├─ Friction Awareness                        [coming soon]
     ├─ Pattern Awareness                         [coming soon]
     ├─ Consequence Awareness                     [coming soon]
     ├─ Identity Awareness                        [coming soon]
     └─ Action Practice                           [coming soon]
```

The standalone "The 5 Awareness Stages" and "Action Practice Examples" rows are removed — they're now sub-pillars under WPT.

**Visual treatment for sub-rows:**

- Rendered as a `<ul>` directly under the WPT `<li>`, with `pl-10 md:pl-16` indent so they sit under the title (past the number + thumbnail column).
- No thumbnail. Small connector glyph `└` or thin left border to signal nesting.
- Number style `3.1`–`3.6` in muted accent (`text-accent/70 text-sm`), tabular-nums.
- Title: `text-sm md:text-base font-bold uppercase tracking-tight`.
- Excerpt hidden on sub-rows to keep density tight (each sub-row ~32–36px).
- All sub-rows render as non-links with the "Coming soon" badge for now. Slugs are pre-assigned in code so we flip them on as content lands:
  - `weight-permanence-triangle` (master, order 3)
  - `reality-awareness`, `friction-awareness`, `pattern-awareness`, `consequence-awareness`, `identity-awareness`, `action-practice` (sub-pillars)

**Data shape:**

Extend the local `CurriculumRow` interface in this file only (no changes to `FoundationMeta` yet — sub-pillar metadata will be added when those pillars are actually built in code):

```ts
interface CurriculumRow {
  order: number;
  title: string;
  excerpt: string;
  slug: string | null;
  thumb: string | null;
  children?: SubRow[];
}
interface SubRow {
  label: string;     // "3.1"
  title: string;
  slug: string | null;
}
```

Real foundations (from `FOUNDATIONS`) get no `children`. The WPT placeholder owns the `children` array.

### Vertical footprint check

At 888×591 viewport (current preview), with hover-expand collapsed by default:
- Section header ~110px
- 3 top-level rows × 80px ≈ 240px
- 6 sub-rows × 36px ≈ 216px
- Total ~566px — fits above the fold; expanding any one excerpt on hover pushes the layout down naturally without affecting initial pageload feel.

### Out of scope

- No changes to foundation post files, taxonomy, edge functions, JSON-LD, or the Real Life Weight Questions section.
- No new `FoundationMeta` fields. Sub-pillar metadata will be added when those pillars actually exist as code-managed foundations.
- No entity hub work — as you noted, hub comes after the WPT cluster is built.

### Files touched

- `src/components/FoundationsCurriculum.tsx` only.