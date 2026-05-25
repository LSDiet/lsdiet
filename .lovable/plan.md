# Promote "Why People Regain Weight After Dieting" to cornerstone status (v2)

ChatGPT's review confirmed the plan and added two upgrades I'm folding in: a front-loaded `<title>`, and a small **upward-link** pass on a curated set of supporting articles so the page becomes a true category parent — not just a better-linked blog post. Deferring the nav-menu change per ChatGPT's "not immediately" note.

## 1. Inbound internal links (the big lever)

This page currently has **zero** inbound internal links anywhere in the repo. Adding them, varying anchor text on every surface:

| Surface | Anchor text |
|---|---|
| Homepage — `WhatIsLSDietSection.tsx`, one inline sentence in the problem paragraph | *why people regain weight after dieting* |
| `FooterSimple.tsx` — add as the first item in the Learn column | *Why People Regain Weight* |
| `/weight-permanence-triangle` page — "Background reading" line in the opening section | *the weight regain cycle* |
| `/awareness-stages` page — inline in the intro paragraph | *regain weight after dieting* |
| `/what-is-ls-diet` page — in the section that explains the problem LS Diet solves | *stop regaining weight* |
| Sibling foundations (WPT pillar, low-starch-vs-extreme-dieting, 5 awareness articles) — one "See also" line each | *weight regain prevention* / *why weight regain happens* (alternated) |

## 2. Build the topical cluster (ChatGPT's added insight)

Pick **6 supporting articles already on site** that semantically belong under this pillar, and add a single in-context link **from each up to the pillar**. This turns the pillar into a category parent without bulk-editing all 40 articles:

- `why-do-i-keep-losing-and-regaining-the-same-weight`
- `why-do-i-keep-restarting-weight-loss`
- `why-do-i-restart-weight-loss-every-monday`
- `why-do-i-lose-motivation-after-a-few-weeks`
- `why-do-healthy-habits-collapse-during-stress`
- `why-do-people-emotionally-eat-after-work`

One sentence added near each article's intro: "This is part of a broader pattern — see the pillar article on *why people regain weight after dieting*." Varies slightly so anchors aren't identical.

## 3. Outbound cluster links from the pillar (down)

The pillar already links to WPT + awareness-stages once near the bottom. Add 3 more **earlier** so the cluster reads naturally from the first scroll, plus link **down** to the 6 supporting articles in a new "Related reading" block before the FAQ:

- First mention of "behavioural permanence" → `/weight-permanence-triangle`
- First mention of "awareness" → `/awareness-stages`
- LS Diet introduction → `/what-is-ls-diet`
- New "Related reading" block listing the 6 articles above with their existing titles as anchors

## 4. Sharper first 150 words + front-loaded title

**Title (front-loaded per ChatGPT):**
`"Why People Regain Weight After Dieting | Stop Weight Regain | LS Diet"`

**metaDescription:** lead with "Weight regain" instead of "Why do most people…".

**Opening:** keep the dek "Most people do not fail to lose weight. They fail to maintain it." Rewrite the next 2 paragraphs to naturally include: weight regain (2–3×), regain weight, stop regaining weight, weight regain prevention, LS Diet (once each). No keyword stuffing — same tone, denser signal.

## 5. After deploy — you click Request Indexing in GSC

I can't trigger it from here. I'll confirm the deployed page shows the new intro + that DevTools shows the new title, then you submit the single URL in Search Console.

## Files touched

**Pillar:**
- `src/content/foundations/why-people-regain-weight-after-dieting.tsx` — title/meta, intro rewrite, 3 inline outbound links, "Related reading" block

**Inbound link surfaces:**
- `src/components/WhatIsLSDietSection.tsx`
- `src/components/FooterSimple.tsx`
- `src/pages/WeightPermanenceTrianglePage.tsx`
- `src/pages/AwarenessStagesPage.tsx`
- `src/pages/WhatIsLSDietPage.tsx`
- `src/content/foundations/the-weight-permanence-triangle-how-to-stop-regaining-weight.tsx`
- `src/content/foundations/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting.tsx`
- `src/content/foundations/{friction,reality,identity,consequence,pattern}-awareness.tsx`

**Upward cluster (one-line edit each):**
- The 6 supporting articles listed in section 2

## Out of scope

- Bulk update of the other ~35 articles
- Nav-menu change (defer per ChatGPT)
- Schema/JSON-LD changes
- Sitemap priority changes (foundations already 1.0)
