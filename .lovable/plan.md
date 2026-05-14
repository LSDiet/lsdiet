# Homepage SEO Restructure Plan

## Goal
Establish proper semantic hierarchy (one H1, structured H2s, crawlable paragraphs) so Google and AI systems clearly identify LS Diet as a branded methodology by Oscar Poon — without altering the existing visual design.

## H1 + Hero changes (`src/components/HeroSection.tsx`)
- Replace the current `<h1>` "I Lost 80+ Lbs Three Times." with the new H1: **"Stop Restarting Weight Loss with LS Diet"**.
- Demote "I Lost 80+ Lbs Three Times." to a styled `<p>` (or `<h2>`-styled span used purely as visual subhead — but kept non-H1) directly above the transformation grid so the storytelling is preserved.
- Insert a new semantic support paragraph directly under the H1:
  > "LS Diet is a low-starch low-sugar lifestyle system created by Oscar Poon to stop weight regain through awareness training, behavioural practice, and sustainable daily habits."
- Keep the transformation 3-card grid intact.

## Audit existing H1s
- `CinematicIntro.tsx` renders large display text via `<span>`s (no H1) — safe.
- Confirm only the new HeroSection H1 exists on `/`. No other components use `<h1>`.

## H2 section additions / re-labels
The page already has these H2s today: "3 Problems Most Diets Ignore" (CorePrincipleSection), "Weight Permanence Triangle™" (MethodSection), "FREE 7-Day LS Diet Course" (BookSection), "We'd Love to Hear From You" (ContactSection), plus "About the Author" eyebrow in AboutAuthorSection.

We will adjust headings and add new crawlable sections so the required H2s exist with 120–250 words of real copy each:

1. **H2: What Is LS Diet?** — NEW section component `WhatIsLSDietSection.tsx` placed right after `HeroSection`. 120–180 word paragraph explaining LS Diet as a low-starch low-sugar lifestyle system, the Weight Permanence Triangle™, behavioural permanence, and Oscar Poon as creator. Internal links to `/what-is-ls-diet` and `/weight-permanence-triangle`.

2. **H2: Why People Restart Weight Loss** — Re-label `CorePrincipleSection`'s H2 from "3 Problems Most Diets Ignore" to "Why People Restart Weight Loss". Add a 120–180 word intro paragraph above the 3 cards explaining the restart cycle, weight regain, and how LS Diet's behavioural practice breaks it. Internal link to `/faq`.

3. **H2: The Weight Permanence Triangle™** — Already exists in `MethodSection`. Add a 130–200 word descriptive paragraph above the diagram covering Awareness, Practice, Permanence, low-starch low-sugar lifestyle integration, and Oscar Poon's framework. Internal link to `/weight-permanence-triangle`.

4. **H2: The 5 Awareness Stages** — NEW section component `AwarenessStagesSection.tsx` placed after `MethodSection`. 130–200 word paragraph naming all five stages (Reality, Friction, Pattern, Consequence, Identity Awareness) and explaining push vs pull motivation in plain crawlable text (not just inside the existing dialog). Internal link to `/awareness-stages`.

5. **H2: Why Diets Fail Long Term** — NEW section component `WhyDietsFailSection.tsx` placed before `BookSection`. 150–220 word paragraph on willpower depletion, restrictive plans, the missing behavioural-permanence layer, and why a low-starch low-sugar lifestyle plus the Weight Permanence Triangle solves it. Internal link to `/blog`.

6. **H2: About Oscar Poon** — Re-label `AboutAuthorSection` so the visible H2 (currently the "About the Author" eyebrow) becomes a real `<h2>About Oscar Poon</h2>`. Expand the existing bio paragraph to 130–200 words covering his psychology background, three 80-lb weight-loss cycles, founding of LS Diet, and the methodology. Internal link to `/about-oscar-poon`.

## Page composition (`src/pages/Index.tsx`)
New order:

```text
Navbar
HeroSection                  (new H1 + support paragraph)
WhatIsLSDietSection          (new H2 #1)
HeroPitchSection             (existing — no heading change required)
CorePrincipleSection         (H2 re-label + intro paragraph) → "Why People Restart Weight Loss"
MethodSection                (H2 kept + new descriptive paragraph) → "Weight Permanence Triangle™"
AwarenessStagesSection       (new H2 #4)
WhyDietsFailSection          (new H2 #5)
BookSection                  (existing)
ContactSection               (existing)
AboutAuthorSection           (H2 re-label + expanded bio) → "About Oscar Poon"
FooterSimple
```

## Internal links
Use plain `<a href="/route">` (cross-page hash navigation rule from project memory). Routes referenced: `/what-is-ls-diet`, `/weight-permanence-triangle`, `/awareness-stages`, `/about-oscar-poon`, `/faq`, `/blog`. These can resolve to placeholder pages later — for now they will 404, which the user accepts (placeholder routes per requirement #6).

## Visual / styling rules
- New sections inherit existing tokens (`section-dark`, `container`, `text-accent`, etc.) — no new colors, no design tokens added.
- All new copy is real `<p>` text in normal flow (not inside accordions or animations).
- Mobile responsiveness preserved (uses existing container + Tailwind responsive classes).

## Out of scope (preserved as-is)
- All metadata in `index.html` (title, description, canonical, JSON-LD, og:*) — left intact per requirement #10.
- No changes to `sitemap.xml`, `robots.txt`, edge functions, or backend.
- No changes to `CinematicIntro`, `TransformationGallery`, `BookSection` body copy, or `ContactSection`.

## Files touched
- Edited: `src/components/HeroSection.tsx`, `src/components/CorePrincipleSection.tsx`, `src/components/MethodSection.tsx`, `src/components/AboutAuthorSection.tsx`, `src/pages/Index.tsx`
- Created: `src/components/WhatIsLSDietSection.tsx`, `src/components/AwarenessStagesSection.tsx`, `src/components/WhyDietsFailSection.tsx`
