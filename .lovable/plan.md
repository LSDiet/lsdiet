# Speed up the homepage hero images

## Problem

The six "before/after" photos in `HeroSection.tsx` are PNGs totaling ~6.1 MB:

```
2019a 705KB  636×754      2019b 1.3MB  796×1060
2021a 1.1MB  796×878      2021b 1.4MB  796×878
2024a  977KB 488×1020     2024b  339KB 368×572
```

Each picture renders inside a half-card on a 3-column grid — roughly 200–400 CSS px wide. We're shipping 5–10× more pixels than the screen ever shows, in an uncompressed format, with no `srcset`, no modern format, and no preload hint. That is the entire reason the hero takes >500 ms.

## Approach (no perceived quality loss)

1. **Add `vite-imagetools`** so we can request modern formats and sized variants at build time directly from the existing PNG sources. Nothing in `public/` or `src/assets/` gets deleted — the originals stay as masters.

2. **Update `HeroSection.tsx`** to import each photo as a responsive `<picture>` set:

   ```ts
   import img2019a from "@/assets/hero/2019a.png?w=400;800&format=avif;webp;png&as=picture"
   ```

   `vite-imagetools` returns `{ sources: { avif, webp }, img }` which we feed into:

   ```tsx
   <picture>
     <source type="image/avif" srcSet={img.sources.avif} sizes="(min-width:768px) 22vw, 45vw" />
     <source type="image/webp" srcSet={img.sources.webp} sizes="..." />
     <img src={img.img.src} width={img.img.w} height={img.img.h} ... />
   </picture>
   ```

   Expected payload after AVIF at quality 70: ~15–30 KB per photo (≈ 100–180 KB total vs. 6.1 MB today), visually indistinguishable from the PNG at the rendered size.

3. **Preload only the first pair** (2019a + 2019b AVIF @ 400w) from `index.html` so the LCP candidate starts downloading during HTML parse. Drop `fetchPriority="high"` from the other five images so they no longer compete with the LCP.

4. **Keep `loading="eager"` for the first row, `loading="lazy"` for the rest** — currently all six are eager which forces parallel decode of ~6 MB on a 3G phone.

5. **No changes to `JourneySection`, `TransformationGallery`, or `CinematicIntro`** in this change. (Those are below the fold or on other pages; we can apply the same treatment in a follow-up if you want.)

## Files touched

- `package.json` — add `vite-imagetools` devDependency
- `vite.config.ts` — register the plugin
- `src/vite-env.d.ts` — add the imagetools type reference so TS accepts the query strings
- `src/components/HeroSection.tsx` — switch the 6 imports to `?as=picture` and render `<picture>` elements
- `index.html` — add two `<link rel="preload" as="image" imagesrcset=... type="image/avif">` for the first card

## Expected result

- Hero transfer drops from ~6 MB to well under 200 KB
- LCP image starts loading before React boots (preload)
- No CLS — explicit width/height come from imagetools metadata
- Visual quality unchanged at the sizes the hero actually renders
