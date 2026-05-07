## New Hero Section for LSDiet.com

### Page structure changes (`src/pages/Index.tsx`)
- Remove `<CinematicIntro />` entirely (and its import).
- Replace `<HeroSection />` with the rebuilt hero (same component name, new internals).
- Insert a new `<CourseCTASection />` directly below the hero containing the existing course bullets and "Join LS Diet Course" button (preserving conversion path off the fold).

Final order: `Navbar → HeroSection (new) → CourseCTASection (new) → TransformationGallery → CorePrincipleSection → MethodSection → BookSection → ContactSection → AboutAuthorSection → FooterSimple`.

### New Hero (`src/components/HeroSection.tsx`)

**Layout**
- `min-h-[100dvh]`, pure near-black background (`bg-[#0a0a0a]`), `pt-14` to clear fixed nav.
- Desktop (`md+`): two columns, `grid-cols-2`, generous gap, large outer padding.
  - Left: chronological photo grid (3 rows × 2 columns).
  - Right: typography block, positioned slightly above vertical centre using `justify-start pt-[12vh]` (not `items-center`).
- Mobile: single column. Photo grid first (still 2 columns internally), text stacked below. Typography stays large.

**Left photo grid**
- 3 rows, each row = small year label + 2-image row.
- Year labels: tiny uppercase tracking-widest, muted white/40, e.g. `text-[11px] tracking-[0.3em] text-white/40 mb-2`.
- Images: `rounded-2xl object-cover`, aspect `aspect-[4/5]`, no overlays, no captions, no weight tags.
- Subtle visual hierarchy via row scaling:
  - Row 1 (2019): left image (`2019A`) gets `scale-[1.04]` / slightly taller via `aspect-[4/5]` while right is `aspect-square` — produces emphasis without cropping faces.
  - Row 3 (2024): right image (`2024B`) gets the same emphasis treatment.
  - Row 2 (2021): both balanced (`aspect-square`).
- Hover: `transition-[filter] hover:brightness-110` only. No zoom, no parallax.
- Spacing: `gap-3 md:gap-4` between images; `gap-8` between rows.

**Right typography block**
- Font: existing system sans (`font-sans`) with `font-extrabold uppercase tracking-tight leading-[0.95]`.
- Headline (3 lines, large):
  - "I LOST" — white
  - "80+ LBS" — orange (`text-accent`)
  - "THREE TIMES." — white
  - Sizes: `text-5xl md:text-7xl lg:text-8xl`.
- Sub-headline (below, with `mt-8`):
  - "LS Diet stops the **weight regain**." — white, with "weight regain" in `text-accent`. Size `text-xl md:text-2xl`, `font-semibold`, normal case, `tracking-tight`.
- Supporting line (`mt-4`):
  - "A psychological system for weight permanence." — `text-sm md:text-base text-white/50 font-normal`.
- No CTA, no bullets, no badges in this section.

**Background & polish**
- Solid `#0a0a0a`. No gradients, no textures.
- Remove all existing animations from this section (no fade-in-up, no pulse-glow, no X strikethrough). Static premium feel per spec.

### New section: `src/components/CourseCTASection.tsx`
- Dark background, comfortable vertical padding (`py-20 md:py-28`).
- Centred content, max-width `2xl`.
- Small eyebrow: "THE FREE 7-DAY COURSE" (accent, tracked).
- Short heading: "You'll learn:".
- Existing 5 `coursePoints` rendered as the current check-list.
- "Join LS Diet Course" button (accent, lg), linking to `https://www.skool.com/lsdiet` (target _blank).
- Move the `XStrikethrough` component out — no longer used; delete it with the old hero contents.

### Image assets
- After plan approval, you'll upload 6 photos. I'll save them as:
  - `src/assets/hero/2019a.jpg`, `2019b.jpg`, `2021a.jpg`, `2021b.jpg`, `2024a.jpg`, `2024b.jpg`
- Imported via Vite `import` statements (no processing, no filters, original files used as-is).

### Memory updates
- Update `mem://features/hero-section` to reflect the new documentary hero (no countdown, no bullets, no CTA above fold).
- Remove `mem://features/cinematic-intro` reference from index since the section is deleted.
- Update `mem://marketing/landing-page-flow` to reflect new section order.

### What I will NOT touch
- `Navbar`, `TransformationGallery` (still showing the older 2019/2022/2025 before/after pairs), `BookSection`, or any other section.
- No image processing, retouching, cropping logic, or AI filters applied to uploaded photos.

Once you approve, upload the 6 images in your next message and I'll wire everything up.