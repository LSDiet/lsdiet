# Background Video Hero — Problem Hook Section

Swap the static `problem-hook-bg.jpg` for a cinematic, muted, looping, crossfading background video (Felix-style), while keeping the 5 pain-point labels as the hook and protecting page-load speed.

## What stays the same
- The 5 pain-point labels, their colours, icons, links, and asymmetric desktop / 2-2-1 mobile layout
- Headline "How to **lose weight** when…"
- Single `<h1>`, dark scrim so labels/headline stay dominant
- No sound, no parallax, no blur filters

## What changes
- The background image layer becomes a background **video** layer
- 2–3 short clips **crossfade** in a loop
- Mobile gets a **lighter, smaller** clip (your choice); desktop gets the fuller version

## How it works (performance-first)

1. **Poster image is the LCP.** The existing AVIF/WebP still renders instantly behind everything. Video sits on top and fades in only once it can play — so first paint is unchanged and there is no perceived slowdown.

2. **Lazy, polite loading.** Videos use `preload="none"`/`metadata`, `muted`, `loop`, `playsInline`, `autoPlay`. We only kick off playback after first paint so video bytes never block the headline/labels.

3. **Two formats per clip.** `.webm` (VP9/AV1, smallest) + `.mp4` (H.264 fallback) so each browser downloads the smallest file it supports.

4. **Crossfade engine.** A small React component cycles the clips: two stacked `<video>` elements, one fading out while the next fades in, advancing on each clip's `ended` (or a timer). Pure CSS opacity transition — no library.

5. **Mobile = lighter clip.** Phones load a smaller, shorter, lower-bitrate version (or a single clip instead of 2–3) to save data and battery.

6. **Reduced-motion + slow-network safety.** If the user has `prefers-reduced-motion`, or a clip fails to load, we fall back to the static poster image automatically.

## Encoding targets (for the clips you upload)
When you upload the raw stock clips, I'll re-encode them to these targets so they stay light:

```text
Desktop clips
  - Resolution : 1920x1080 (or 1280x720)
  - Length     : 6-12s seamless loop each
  - Frame rate : 24 fps
  - Target size: ~1.5-2.5 MB per clip (.webm) + .mp4 fallback
  - No audio track (stripped)

Mobile clips
  - Resolution : 720x1280 portrait crop (or 854x480)
  - Length     : 6-10s
  - Target size: ~0.6-1.2 MB per clip
  - No audio track
```
Total target weight: roughly 4–7 MB desktop, 2–3 MB mobile — only loaded *after* the page is interactive.

### Footage shopping notes (so the clips work well)
- Mood: relatable frustration / stress-eating / tired-of-trying — not despair, not glossy ad models (matches our earlier image direction)
- Slow, ambient motion (someone at a table, picking at food, hand-on-forehead) loops better than fast camera moves
- Darker / moodier footage hides the loop seam and keeps text readable
- Landscape clips for desktop, a portrait or center-safe crop for mobile

## Technical scope
- New component `BackgroundVideo.tsx` (crossfade cycler, poster, reduced-motion + fallback handling)
- Edit `ProblemHookSection.tsx` to use it in place of the desktop and mobile `ResponsivePicture` background (labels/headline/scrim untouched)
- Video files committed under `src/assets/` (or `public/`), encoded to the targets above
- Keep `problem-hook-bg.jpg` as the poster/fallback
- QA both viewports (desktop + ~595px mobile): confirm video autoplays muted, crossfade is smooth, labels stay legible, poster shows first, and nothing overflows one screen

## Next step
Upload the copyright-free clips (raw is fine — I'll compress them). Tell me which are intended for desktop vs mobile, or just send them and I'll crop/encode both versions.