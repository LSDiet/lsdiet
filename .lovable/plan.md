## Edits to BookSection.tsx

1. **Remove Early Member Bonus** card; collapse the two-column grid into a single centered features list.
2. **Rename CTA** to `Join LS Diet` here and across all CTA buttons on the homepage (HeroSection, JoinFloatingBar, ContactSection, WaitlistModal trigger, StickyCountdown, CinematicIntro). Navigation links and inline text links are left alone.
3. Replace `12 practice lessons you can start today` with `25+ practice lessons you can start today for free`.
4. Replace the subhead with: `Build your push and pull motivations, replace old habits with daily actions, and see results in two weeks!`

Copy rule applied throughout the rewrites below: no hyphens anywhere except the locked phrase `low-starch low-sugar`. So "long term" stays open, "course correction" stays open, "high intent" stays open, etc.

## Question 5 — yes, redesign both sections, with maximum natural interlinking

The foundations library now defines the same concepts these two sections currently re-explain. Leaving them as is creates duplicate definitions Google has to choose between, and gives readers no path into the deeper content. Below is a denser interlink plan than the first draft, only using links where the anchor text genuinely matches the destination's topic.

### A. WhyDietsFailSection rewrite

Tighten to two short paragraphs plus a three card row. Every bolded phrase below becomes an inline link.

Paragraph 1 anchors:
- "restart cycle" → `/blog/why-people-regain-weight-after-dieting`
- "low-starch low-sugar" → `/what-is-ls-diet`
- "behavioural infrastructure" → `/weight-permanence-triangle`

Paragraph 2 anchors:
- "five stages of awareness" → `/awareness-stages`
- "daily action practice" → `/blog/action-practice`
- "Oscar Poon" → `/oscar-poon`

Three card row titled "Where diets actually break":
1. The food layer alone is not enough → `/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting`
2. Awareness is the missing motivation engine → `/blog/reality-awareness`
3. Permanence is what stops the next regain → `/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight`

That is nine contextual outbound links from one section, all naturally placed, each pointing to a different canonical destination so no link cannibalises another.

### B. FAQSection rewrite

Keep `FAQPage` JSON-LD. Trim to four questions whose answers each end with a "Read more" sentence that links to a different foundation or hub, so every answer carries its own deep link:

1. **What is LS Diet?**
   Answer ends with: Read the full definition on `What Is LS Diet` → `/what-is-ls-diet`.
   Inline anchor inside the answer: "low-starch low-sugar lifestyle" → `/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting`.

2. **Why do people keep regaining the weight?**
   Inline anchors: "pattern that repeats" → `/blog/pattern-awareness`, "consequence catches up later" → `/blog/consequence-awareness`.
   Closing link: Read the foundation → `/blog/why-people-regain-weight-after-dieting`.

3. **What is the Weight Permanence Triangle?**
   Inline anchors: "awareness" → `/awareness-stages`, "practice" → `/blog/action-practice`, "permanence" → `/blog/identity-awareness`.
   Closing link: Read the foundation → `/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight`.

4. **Who created LS Diet?**
   Inline anchor: "lost 80 lbs three times" → `/oscar-poon`.
   Closing link: Read his story → `/oscar-poon`.

Below the four questions, add a "Keep exploring" inline link row (semantic `<nav>`):
- LS Foundations → `/blog`
- 5 Stages of Awareness → `/awareness-stages`
- Friction Awareness → `/blog/friction-awareness`
- Action Practice → `/blog/action-practice`
- About Oscar Poon → `/oscar-poon`

Keep the existing `See the full LS Diet FAQ` link to `/faq`.

### Total new contextual backlinks added to `/`

Roughly 18 to 20 unique outbound contextual links, covering every foundation slug (`why-people-regain-weight-after-dieting`, `why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting`, `the-weight-permanence-triangle-how-to-stop-regaining-weight`, `reality-awareness`, `friction-awareness`, `pattern-awareness`, `consequence-awareness`, `identity-awareness`, `action-practice`) plus all three hub pages (`/what-is-ls-diet`, `/weight-permanence-triangle`, `/awareness-stages`) and the `/oscar-poon` author entity. No slug is left orphaned from the homepage, and every link sits inside a sentence where it makes sense to a reader.

### Files touched
- `src/components/BookSection.tsx` (edits 1 to 4)
- `src/components/WhyDietsFailSection.tsx` (rewrite)
- `src/components/FAQSection.tsx` (rewrite)
- `src/components/HeroSection.tsx`, `JoinFloatingBar.tsx`, `ContactSection.tsx`, `WaitlistModal.tsx`, `StickyCountdown.tsx`, `CinematicIntro.tsx` (CTA label sweep only)

No new components, no schema changes, no route changes.
