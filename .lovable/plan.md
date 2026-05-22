## Refine `src/pages/PartnersPage.tsx` — messaging & flow only

Goal: restructure the page so it leads with pain, clarifies the partner model, defers commitment, and answers the six coach/dietitian questions Leo flagged (more income? more work? client theft? churn fix? what's the system? why trust you?).

**Preserve as-is:** colour palette, light-mode aesthetic, rounded cards, `ConsistencyVisual`, `ApplyCTA` styling, typography scale, statistics section visuals, framework imagery (`awarenessDiagram`), footer styling.

### 1. Hero — soften commitment

- **Primary CTA** → `See How the Partner Model Works` (anchor to new `#how-it-works`).
- **Secondary CTA** → `Apply to Become a Partner` (smaller, ghost/outline `ApplyCTA variant="outline"` at `!px-5 !py-2.5 !text-sm`).
- Keep the headline ("Are you losing clients because they struggle with consistency?").
- Add a reassurance line directly below the subhead, visually distinct (small pill or bordered strip):

  > "You keep your clients, your services, and your brand. LS Diet only reinforces the behavioural layer in between."

- Sticky header CTA also softens to `See the model`, with `Apply` kept as secondary.

### 2. Reorder sections

New flow (renumbered):

```text
1. Hero (soft CTA)
2. Client inconsistency problem        ← existing "Clients often" card, split out
3. Business pain for coaches           ← existing "As a result" card
   └─ inline soft CTA: "See how the model fixes this →"
4. Statistics (compacted, see §3)
5. NEW — How LS Diet complements your services   ← two-column "continue doing" vs "LS Diet reinforces"
   └─ inline CTA: "See how the partner flow works →"
6. LS Diet framework / authority (existing, condensed — see §5)
7. NEW — How the Partner Model Works (6-step workflow)   ← see §6
   └─ inline CTA: "Apply to Become a Partner"
8. Partner benefits (re-worded copy per Leo, see §7)
9. Final CTA block
10. Footer (disclaimer moved here, muted — see §8)
```

Sections 2 and 3 stay as two cards but get their own `Section` wrapper so the eyebrow reads "The Client Problem" / "The Business Cost" instead of one combined block.

### 3. Statistics — compact & scannable

Keep the three stats (CDC 40%+, Canada 65%, BMJ 50% dropout) and sources. Tighten:

- Reduce card padding (`p-6 md:p-8`), smaller stat font (`text-4xl md:text-5xl`).
- Shorter eyebrow: "The Industry Gap" (drop "By the Numbers").
- Remove the H2 paragraph — one-line subtitle only: "Behavioural inconsistency is the gap conventional programs leave open."
- Single row on desktop, no hover lift (calmer).

### 4. NEW — "How LS Diet complements your services" section

Two-column card layout, eyebrow "Complement, not replace". Headline: *LS Diet reinforces what you already do.*

| LEFT — What partners continue doing | RIGHT — What LS Diet reinforces |
| --- | --- |
| Coaching | Consistency |
| Exercise programming | Awareness |
| Accountability | Relapse interruption |
| Nutrition guidance | Push & pull motivation |
| Body composition support | Sustainable behaviour patterns |
| Client care | Long-term progress |

Use existing `ClientCard` styling; left card neutral, right card with subtle amber tint on the bullet dots to differentiate.

### 5. Framework section — condense

Keep the awareness diagram and the WPT link. Tighten:

- Shorten the subtitle to ~2 sentences max: "LS Diet members are trained inside the Weight Permanence Triangle™ — Awareness + Practice = Permanence. The 5 Stages of Awareness handle the psychological layer most diets ignore."
- Replace the "does not replace / goal is to help members become" dual-list (now redundant with §4) with a single line under the diagram: *"This is the behavioural layer your clients keep using between sessions with you."*
- Remove the dual-list block entirely to cut redundancy.

### 6. NEW — "How the Partner Model Works" section

`id="how-it-works"` (hero primary CTA targets this).

Eyebrow: "The Workflow". Headline: *A clear, simple partner relationship.*

Six numbered step cards in a responsive grid (1 col mobile, 2 col md, 3 col lg), each with a circled step number in amber, short title, one-line description:

1. **Partner applies** — short form, no commitment.
2. **LS Diet reviews fit** — alignment with behavioural-consistency values.
3. **Partner is added to the network** — listed for member discovery.
4. **Members request connections** — only members seeking *additional* support are introduced.
5. **Partner delivers their normal service** — coaching, programming, nutrition — your brand, your pricing.
6. **LS Diet keeps reinforcing behaviour** — consistency support continues alongside, reducing drop-off.

Trailing CTA row: primary `Apply to Become a Partner` + ghost `Have questions? Watch the overview` (anchor to hero / or `mailto:info@whataboutweight.com` — confirm in §10).

### 7. Partner benefits — copy refinement only

Same six-card grid layout. Replace card copy with Leo's wording verbatim (Behaviourally Prepared Members / 100% Commission Free / City Based Visibility / 3 Months Free / No Results, No Payment / Long-Term Focused Community — keep the 6th existing card).

### 8. Disclaimer relocation

- Remove disclaimer block from the benefits section.
- Append it to the existing `<footer>` as a small muted paragraph above the copyright line, `text-xs text-[hsl(0_0%_55%)] max-w-3xl mx-auto leading-relaxed mb-4`.

### 9. CTA density

Soft inline CTA after sections 3, 5, 7. Strong `Apply` CTA in sections 6 (workflow), 8 (benefits trailing), and 9 (final). Hero stays soft.

### 10. Open question (will confirm before building section 6)

The workflow section has a "Have questions?" secondary CTA — should it (a) scroll back to hero, (b) open mail to `info@whataboutweight.com`, or (c) be dropped entirely?

### Out of scope

- No new routes, components, edge functions, or assets.
- No changes to `Navbar`, sitemap, or SEO meta (titles/descriptions stay).
- No palette, font, or border-radius changes.