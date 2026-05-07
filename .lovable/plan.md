## Diagnosis

The reference screenshot you shared is actually your existing `TransformationGallery` design — it's the right pattern (3 cards, side-by-side before/after, weight badges, year underneath). The reason the current hero looks bad: the `2019a/b`, `2021a/b`, `2024a/b` files imported recently are tight headshot crops, so they can't show your face AND body at any size.

Your `src/assets/journey/` folder already contains the proper full-body photos used in the reference design. We should use those.

## Plan

**1. Rewrite `src/components/HeroSection.tsx`**

Keep the headline ("I Lost 80+ Lbs Three Times." + sub-line) on top, then below it use the 3-card layout from your reference screenshot, populated with the existing journey photos:

- 2019: `202204-regain1` is wrong era — use `201908-after-stress` (300 lbs, before) and `201710-graduation` (180 lbs, after)
- 2022: `202204-regain1` (280 lbs, before) and `202012-after-attempt1` (200 lbs, after)
- 2025: `202405-regain2` (300 lbs, before) and `202311-after-attempt2` (190 lbs, after)

Each card:
- `rounded-2xl` with subtle white border on dark bg
- `aspect-[4/3]` 2-column grid (before | after)
- `object-cover object-[center_20%]` so heads aren't chopped, body stays visible
- Weight badge pill at the bottom of each photo (`300 LBS`, `180 LBS`)
- "BEFORE  2019  AFTER" caption row underneath

Layout: `md:grid-cols-3` — 3 cards across on desktop, stacked on mobile.
Section becomes natural-height (no `100dvh` clamp), so each card is a comfortable size with full body visible. User scrolls slightly to see all 3 on a 591px viewport — that's expected and matches the reference.

**2. Delete unused headshot assets**

Remove the now-unused `src/assets/hero/2019a.png`, `2019b.png`, `2021a.png`, `2021b.png`, `2024a.png`, `2024b.png` files.

**3. No other changes**

`HeroPitchSection` (blue-shirt photo + bullets + animated red X) stays exactly as-is, right below the hero.

## Note

This means `TransformationGallery` (the section currently below) becomes redundant with the new hero. It's already removed from `Index.tsx`, so no further action needed there.
