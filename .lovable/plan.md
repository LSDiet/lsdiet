## Homepage Narrative Arc v2 (locked)

Order after this revision:

1. Hero — Hook
2. WhatIsLSDiet — Definition
3. WhyDietsFail — Problem (absorbs CorePrinciple)
4. **Method — LS Diet + WPT framework overview** (rewrite, compressed)
5. **AwarenessStages + Action Practice — curriculum** (rewrite, dense)
6. Testimonials — reserved slot
7. AboutAuthor — Trust
8. Book / Skool — the only mid-page Join CTA
9. FAQ — Objections
10. ~~Contact~~ — **removed**

Hierarchy rule: sections 4 and 5 get the strongest typographic weight on the page after the Hero. FAQ and About sit visually quieter.

---

## Changes in this revision

### A. Remove Contact section
- Delete `<ContactSection />` import + render from `src/pages/Index.tsx`.
- Leave `ContactSection.tsx` in the repo (unused).
- Repoint or remove any `#contact` anchors in nav / footer / hero.

### B. Section 4 — Method (LS Diet + WPT overview), compressed
Purpose: introduce the whole framework in one screen. Routes readers out; does not explain in depth.

Content blocks:
1. Eyebrow: "The Framework"
2. H2: "The LS Diet and the Weight Permanence Triangle"
3. Two short paragraphs (max ~45 words each):
   - LS Diet in one line — low-starch, low-sugar lifestyle that lets you eat until full. Natural inline link on **low-starch, low-sugar** → `/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting`.
   - Why food alone isn't enough → introduces WPT as the behavioural layer. Natural inline link on **Weight Permanence Triangle** → `/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight`.
4. Simplified linear diagram: **Awareness + Practice = Permanence** (single SVG row, no triangle).
5. One-line caption beneath.

Removed from current MethodSection:
- The full triangle SVG (lives on `/weight-permanence-triangle`).
- The desktop 3-column vertex layout with bullet lists.
- The "Discover the 5 stages" dialog button (section 5 handles this).
- The inline "Read the full Weight Permanence Triangle™ breakdown →" CTA (the inline-link on "Weight Permanence Triangle" replaces it).

No CTA button in this section.

### C. Section 5 — Awareness Stages + Action Practice, curriculum
Purpose: show the inside of the triangle as a guided sequence, not as cards.

Visual treatment (mirrors `FoundationsCurriculum.tsx` pattern):
- Section background flips to `section-dark` so 4→5 has one contrast swap.
- Vertical numbered list, 6 rows, tight rhythm.
- Each row: big `01–06` numeral, stage title (inline link), single-sentence description, hover-expand for a second line on desktop.
- Desktop only (`md:` and up): a faint left vertical line connecting the numerals to imply progression. Hidden on mobile to avoid visual noise at 634px.
- Row 6 (Action Practice) visually separated by extra top spacing + a thin divider above to signal "practice layer, not awareness".

Rows:

| # | Stage | Link |
|---|---|---|
| 01 | Reality Awareness | `/blog/reality-awareness` |
| 02 | Friction Awareness | `/blog/friction-awareness` |
| 03 | Pattern Awareness | `/blog/pattern-awareness` |
| 04 | Consequence Awareness — PUSH motivation | `/blog/consequence-awareness` |
| 05 | Identity Awareness — PULL motivation | `/blog/identity-awareness` |
| 06 | Action Practice — where it gets implemented | `/blog/action-practice` |

Closing line below row 06 (one sentence, no button): natural inline link on **the full Foundations curriculum** → `/blog`. This is routing, not a marketing CTA.

Removed from current AwarenessStagesSection:
- The 3+2 card grid layout.
- The watermark numerals + per-card hover gradient.
- The separate "Explore the 5 Awareness Stages in depth →" link (replaced by the inline routing link above; Action Practice is now part of the same list).

### D. Interlinking rules
- Inline links only where the noun phrase names the destination.
- Each foundation slug appears at most once on the homepage. After section 5 ships, audit FAQ and drop any duplicate stage links it now contains.
- No "Learn more →" buttons in sections 4 or 5.

### E. Mobile preservation
- Section 5 stays a single vertical column on mobile; never collapses to a grid or a horizontal scroller.
- Numerals stay left-aligned so the 01→06 sequence reads at a glance on a 360–414px screen.

---

## Files touched

- `src/pages/Index.tsx` — remove ContactSection.
- `src/components/MethodSection.tsx` — rewrite to compressed LS Diet + WPT overview with A + P = P linear diagram.
- `src/components/AwarenessStagesSection.tsx` — rewrite to 6-row numbered curriculum incl. Action Practice.
- `src/components/FAQSection.tsx` — dedupe links overlapping with section 5.

No backend, taxonomy, or routing changes. No new components.
