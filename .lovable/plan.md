# Problem Hook — Cinematic Composition Fix (v2)

This is a cinematic emotional composition problem, not a UI component problem. The live render proves the original critique: the woman isn't visible (framed hard-left with a black void on the right), the heavy overlay kills her, and the boxes float like SaaS filter chips. We fix composition, image, and hierarchy — no new functionality, no perf regressions.

## What stays the same
- The 5 pain points, their colors, icons, and blog-post links
- Headline copy "How to **lose weight** when…"
- Perf rules: responsive AVIF/WebP, one eager LCP image, lightweight `box-shadow` glow only, no parallax/video/blur/animation libraries (chevron bounce only)
- Single `<h1>` on the headline (SEO)

## Core principle
**The 5 pain-point labels ARE the hook message.** No paragraphs to read — visitors self-identify instantly. The woman is the emotional anchor; the labels are pressure surrounding her.

## 1. New hero image — relatable frustration, NOT despair
Generate a replacement (saved over `src/assets/problem-hook-bg.jpg`, keeping the existing `?w=…&format=avif;webp&as=picture` import + perf pipeline). Direction:
- **Emotion: concerned, mentally fatigued, frustrated-with-repeated-failure.** A "I'm tired of struggling with this" energy — NOT defeat, crying, despair, rock-bottom, or severe-depression energy.
- **A normal, modern, relatable person** — slightly overweight, everyday realism. **Not a fashion-campaign / luxury-skincare-ad model, and no glamorous cinematic beauty lighting.**
- Sitting at a table; hand-on-forehead or thinking pose; subtle stress expression.
- **Tighter, more centered crop** — face + upper torso dominant, brighter on face/shoulders, darkness preserved only at the edges (natural vignette), minimal dead space.
- **Composition connects her to the pain points:** her posture, gaze direction, and body angle should subtly feel surrounded/overwhelmed by the labels around her, so the cards read as her thoughts rather than pasted-on chrome.

A lighter, edge-weighted gradient overlay (vignette + bottom scrim) replaces today's heavy full-frame darkening so her expression is the first thing the eye lands on.

## 2. Bigger pain cards, dialed-back glow
- Larger padding, larger icon, bumped/bolder font so cards compete with the headline.
- Thicker border + layered `box-shadow` glow — but **~20% less intense than the mockup's upper limit.** Glow supports the scene; it must read as premium emotional realism, not gaming/crypto/cyberpunk UI. Still pure layered box-shadow (no blur filter).
- Slightly stronger hover lift/glow.

## 3. Cinematic asymmetric composition (desktop)
Replace evenly-spread positions with deliberate, slightly-uneven inward pressure around the woman:

```text
[ top-left ]                         [ top-right ]
                  (WOMAN)
[ lower-left ]                       [ mid-right ]
              [ bottom-centre ]  <- overlaps table edge
```

Cards pulled closer to center, spacing intentionally not mathematically even.

## 4. Mobile — image dominates, cards overlay
Replace the small-thumbnail + button-grid layout:
- Headline at top
- **Large, near-full-width image** as the emotional anchor (tall crop, far bigger than today's 24svh strip)
- Pain cards **overlaying the lower portion of the image** (scrim behind for legibility) in a tight, slightly-crowded 2-2-1 grouping — bigger than now, readable, not full-width stacked cards
- Subtle chevron at the very bottom to invite scroll

Everything fits within ~100svh so the full "that's me" message lands with no scrolling on phone and desktop.

## 5. Hierarchy
Headline → her expression → pain cards → (small low chevron). Scroll cue stays subtle.

## Technical notes
- Only `src/components/ProblemHookSection.tsx` is edited, plus regenerating `src/assets/problem-hook-bg.jpg`.
- Glow = layered inline `box-shadow` (as today), tuned down ~20%; no Tailwind config change.
- After building, QA both viewports (desktop + 595px mobile) via screenshot to confirm the photo reads, glow is balanced, and nothing overflows one screen.