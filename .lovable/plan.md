# Hero: Headline-Above-Photos + Cleanup

## 1. Rebuild hero with stacked layout (`src/components/HeroSection.tsx`)

Match the reference: headline on top, 3 transformation rows below, all visible on first paint.

**Why this beats side-by-side:** the eyes read the headline first, get the hook, then drop into all 3 before→after rows in a single vertical scan. On laptops (the 946px viewport this is being designed on) the side-by-side version pushed row 3 off-screen and forced scrolling — that kills the "I see 3 transformations immediately" effect.

**Layout**
- `min-h-[100dvh]`, `bg-[#0a0a0a]`, `pt-14` (clear nav).
- Centered container, `max-w-5xl`, `px-5 md:px-8`, `py-6 md:py-10`.
- Vertical flex, `gap-6 md:gap-8`.

**Headline block (top)**
- Eyebrow-free; just the headline + sub-line, centered.
- Line 1: "I LOST 80+ LBS THREE TIMES."
  - "80+ LBS" in `text-accent` (orange).
  - `font-extrabold uppercase tracking-tight leading-[1.05]`.
  - Sizes: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` (smaller than before, so 3 rows of photos fit on a single 100dvh viewport).
- Line 2 (sub): "And LS Diet is the only way to stop the weight regain."
  - "weight regain" in `text-accent`.
  - `text-sm md:text-base text-white/70 font-medium tracking-wide uppercase`.
  - `mt-2 md:mt-3`.

**Photo timeline (below headline)**
- 3 rows, each row = small year label on the left + 2 images (before → after) horizontally.
- Year label column: `w-12 md:w-16`, `text-xs md:text-sm`, `font-semibold`, `text-accent/80`, `tracking-[0.2em]`, vertically centered.
- Image pair: `flex-1 grid grid-cols-2 gap-3 md:gap-4`.
- Every image: `aspect-[16/10]` (landscape, matches the reference's wide cinematic crops), `rounded-xl object-cover`, `bg-white/[0.03]`.
- Subtle hover only: `transition-[filter] duration-300 hover:brightness-110`. No zoom, no parallax, no labels on the photos.
- Row gap: `gap-4 md:gap-5` between rows.

**Mobile (<md)**
- Headline: `text-3xl`, sub-line `text-xs`.
- Year label collapses to a small badge above each pair (not a left column).
- Image pair stays 2-column (before/after) so the transformation reads even on phones.
- Outer `py-6` so all 3 rows + headline fit in one tall mobile viewport.

**No animations** — static, premium, documentary feel per original spec.

## 2. Remove the duplicate course block

`CourseCTASection` was added on top of the existing `BookSection` (which already has the browser-mockup picture next to the 7-Day bullets). That's why it looked like the picture was missing — it wasn't, the duplicate was sitting above it.

- Delete `src/components/CourseCTASection.tsx`.
- Remove the import + `<CourseCTASection />` line from `src/pages/Index.tsx`.

`BookSection` (browser mockup + bullets + Join button) is the single course CTA again.

## 3. Remove redundant Transformation gallery

The new hero shows the same three transformations, so `<TransformationGallery />` is redundant. Remove its import + usage from `src/pages/Index.tsx`. (File itself is left in place in case it's reused later.)

## Final `Index.tsx` order

```text
Navbar
HeroSection           ← headline on top, 3 transformation rows below
CorePrincipleSection
MethodSection
BookSection           ← course bullets + browser-mockup picture
ContactSection
AboutAuthorSection    ← still uses winter-jacket photo (oscar-photo.jpeg)
FooterSimple
```

## Note on the blue-shirt photo
`src/assets/hero-photo.png` (blue sweater) is **not currently rendered anywhere** in the live site, so this change does not remove or hide it. If you want it placed somewhere (e.g., About the Author), tell me and I'll do it as a separate edit.

## Out of scope
- No edits to `BookSection`, `AboutAuthorSection`, `Navbar`, or any other section.
- No image processing, recropping, or filters on the 6 hero photos.
