# Performance recovery plan — sequenced for de-risking

Site is slow. Image weight is the visible symptom; JS weight and mobile structure may be co-conspirators. Sequence each step so the cheapest diagnostic comes first and each step shrinks the scope of the next.

## Step 0 — Lighthouse baseline (5 min, diagnostic)

Run Lighthouse mobile + desktop on `/` and record:
- LCP, TBT, CLS, INP
- Total transfer size
- JS bytes, image bytes
- Largest contentful element

No code changes. Without this, "re-measure" at the end is meaningless. Save the report.

## Step 1 — Bundle analysis (10 min, diagnostic)

Add `rollup-plugin-visualizer` as a devDependency, wire into `vite.config.ts` (gated to `mode === "analyze"`), run `vite build --mode analyze`, open the treemap.

What we're looking for specifically:
- Is `src/content/articles/index.ts` eagerly importing all 40+ MDX-style article files into the main bundle?
- Is `src/content/foundations/index.ts` doing the same?
- Is every route in `src/App.tsx` statically imported instead of `React.lazy`?
- Are heavy libs (Recharts, embla-carousel, Contentful renderer, lucide-react full import) ending up in the home chunk?

If main chunk is >300 KB gzip → step 2 is mandatory. If <150 KB gzip → skip step 2, go straight to step 3.

## Step 2 — Route splitting and eager-import surgery (conditional)

Only execute if step 1 confirms JS bloat.

- Convert every non-home route in `src/App.tsx` to `React.lazy` + `<Suspense>` with a minimal fallback. Targets: `BlogPage`, `BlogPostPage`, `WeightPermanenceTrianglePage`, `WhatIsLSDietPage`, `AwarenessStagesPage`, `AboutOscarPoonPage`, `OscarPoonPage`, `LSDietGuidePage`, `GLP1GuidePage`, `FreeResources`, `QAPage`, `CoreFAQPage`, `CategoryArchivePage`, `ProductDetail`, `ShareRedirectPage`, `PartnersPage`, legal pages.
- Audit `src/content/articles/index.ts` and `src/content/foundations/index.ts`. If they re-export all articles eagerly, convert to a lazy registry keyed by slug (`() => import('./article-slug')`) consumed only by `BlogPostPage`.
- Replace any `import { X } from "lucide-react"` barrel hot-spots with per-icon imports if the visualizer flags lucide as oversized.

### Critical caveat: prerender compatibility

The SSG script in `scripts/prerender.mjs` waits for `document.documentElement.dataset.rendered === "true"` to snapshot. Lazy chunks resolve asynchronously, so the snapshot can fire with empty `<Suspense>` fallbacks if not handled.

Rule:
- **Home page sections stay eagerly imported.** Do NOT lazy-split `HeroSection`, `WhatIsLSDietSection`, `HeroPitchSection`, `AwarenessStagesSection`, `BookSection`, `FAQSection`, `AboutAuthorSection`, `FooterSimple`. Prerender needs them inline.
- **Only route-level components** (the other pages reached from `App.tsx`) get `React.lazy`.
- For the 6 other prerendered routes, either keep their page components eager OR have the prerender script `await` all pending chunks before checking `data-rendered`. Eager is simpler.

This is the one place SEO and perf collide; the plan must respect it.

## Step 3 — Mobile hero collapse (structural, biggest mobile LCP win)

Current `HeroSection.tsx` renders 6 images at mobile LCP (3 cards × before/after). Even with responsive AVIF in place for hero, that's 6 decodes during the most critical paint window on a 4G phone.

Change:
- **Desktop (≥ md):** unchanged — 3-card grid stays.
- **Mobile (< md):** show only the first card (2019 transformation) at LCP. Years 2022 + 2024 move into an embla-carousel swipeable strip *below* the LCP element, with their `<picture>` elements **not mounted** until first interaction or `requestIdleCallback`.
- The LCP card keeps `eager` + `fetchpriority="high"` for its 2 images. The carousel slides use `loading="lazy"` + lazy mount.
- Preserve all alt text, captions, and the "Before / Year / After" footer styling.

Done before step 4 so we don't optimize images we're about to defer.

## Step 4 — AVIF + responsive widths migration (the byte pass)

Tooling already in place: `vite-imagetools` is registered in `vite.config.ts` and the hero already uses `?w=400;800&format=avif;webp&as=picture`. Standardize and extend.

### Standard pattern

```ts
import img from "@/assets/path.png?w=400;800;1200&format=avif;webp&as=picture";
```

Render via a shared `<ResponsivePicture>` helper (already prototyped in `HeroSection.tsx` — extract to `src/components/ui/ResponsivePicture.tsx` and reuse).

`sizes` defaults: `(min-width: 768px) 50vw, 100vw` for full-width hero-style, `(min-width: 768px) 33vw, 90vw` for card grids. Per-call override allowed.

### Migration targets (all photographic PNG/JPG)

- `src/components/HeroPitchSection.tsx` — `hero-photo.png` (726 KB → ~60–100 KB AVIF)
- `src/components/TransformationGallery.tsx` — 6 journey JPGs (~7 MB → ~3.5 MB)
- `src/components/AboutAuthorSection.tsx` — `oscar-photo.jpeg` (1.6 MB → ~250 KB)
- `src/content/foundations/*-awareness-hero.png` — 5 files (~10.5 MB → ~1.2 MB)
- `src/assets/foundation-*.png` — 7 files (~7 MB → ~900 KB)
- `src/assets/ebook-*` covers
- `src/assets/skool-*.png`

### Keep as-is (not photographic)

- `src/assets/lsdiet-logo.png`, `lsdiet-wordmark.png`, `book-cover.png`, `placeholder-do-not-use.png` — leave PNG. SVG conversion is a separate task.

### Public folder one-shot

`public/og-image.jpg` and `public/favicon.png` are not imported through Vite. Use a one-time `sharp` CLI invocation to add `og-image.avif` alongside the JPG, update Helmet `<meta property="og:image">` to point at the AVIF with the JPG as fallback. Favicon stays PNG (browser compat).

### Projected savings

Image payload: ~42 MB → ~7–9 MB (~80% reduction). LCP image bytes: ~6–8 MB → ~0.8–1 MB on first paint.

## Step 5 — Below-fold deferral (polish)

- Every `<img>` below the fold: `loading="lazy"` + `decoding="async"`.
- `CinematicIntro` 3×2 grid: gate mount behind `IntersectionObserver` (only mount when within 200 px of viewport). Currently mounts on initial render.
- `JoinFloatingBar` and any animated decorative elements: defer mount via `requestIdleCallback` with `setTimeout` fallback.
- Add `width` / `height` attributes to every `<img>` that's missing them (CLS guard).

## Step 6 — Re-measure and compare

Re-run Lighthouse mobile + desktop. Compare against the step 0 baseline. Targets:

| Metric | Baseline (est.) | Goal |
|---|---|---|
| Mobile LCP | 5–8 s | < 2.5 s |
| Mobile TBT | 400–800 ms | < 200 ms |
| Total transfer | 25–35 MB | < 6 MB |
| JS bytes (gzip) | TBD | < 250 KB main chunk |

If LCP is still > 3 s, the remaining bottleneck is almost certainly font loading, third-party scripts, or render-blocking CSS — addressed in a separate pass.

## What stays unchanged

- All copy, design tokens, Tailwind config, Helmet usage, SEO/JSON-LD
- React Router structure (route paths)
- Supabase client, Zustand, React Query
- Existing `scripts/prerender.mjs` and the 7 Phase 1 SSG routes
- Sitemap, robots.txt

## Files touched (estimate)

- `vite.config.ts` — add visualizer plugin (gated)
- `package.json` — add `rollup-plugin-visualizer`, `sharp` (devDeps)
- `src/App.tsx` — route lazy-loading
- `src/content/articles/index.ts`, `src/content/foundations/index.ts` — lazy registry (if needed)
- `src/components/HeroSection.tsx` — mobile carousel collapse
- New: `src/components/ui/ResponsivePicture.tsx`
- ~10 components touched for AVIF migration
- `public/og-image.avif` added; Helmet og:image updated
- `scripts/prerender.mjs` — only if route-splitting affects prerendered pages (preferred: avoid)

## Out of scope (future passes)

- Logo/wordmark → SVG conversion
- Third-party script audit (analytics, Skool embeds, etc.)
- Font loading optimization (`font-display: swap`, preload, subsetting)
- Service worker / HTTP caching headers
- Contentful blog post payload reduction

## Bottom line

Six steps, sequenced so each one *de-risks the next* and may make the next one unnecessary. Steps 0–1 are diagnostic and take <15 min combined. Steps 2–4 are the heavy lifters. Step 5 is polish. Step 6 proves it worked.
