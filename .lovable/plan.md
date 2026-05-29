## Goal

The static woman image (`problem-hook-bg.jpg`) should **never** be visible when the videos can play. Right now it's used as the LCP poster and fades out only after the first video frame paints — so there's always a brief flash, and if reduced-motion is on it stays forever.

## Fix — edit only `src/components/ui/BackgroundVideo.tsx`

1. **Remove the reduced-motion early return.** Always set `enabled = true` after first paint, so the videos load and play in every browser/OS setting.
2. **Stop using the poster image as a visible default.** Render it with `opacity: 0` from the start. The container already has `bg-black`, so during the (very short) gap before video frame #1 paints, the user sees solid black — not the woman.
3. **Only show the poster as an error fallback.** If all video sources error (`onError` → `failed = true`), fade the poster back in with `opacity: 1`. This preserves graceful degradation for offline/codec issues without ever showing the image during normal playback.
4. Keep the `<img>` in the DOM (still used by `<BackgroundVideo poster={...} alt={...}>` for accessibility/SEO alt text and the failure case), but it will be visually hidden by default.

No changes to `ProblemHookSection.tsx`, no changes to video clip files, no changes to the poster JPG asset.

## Result

- On a normal load: black background for a split second → video 1 starts → cycles 1 → 2 → 3 → 4 → loop. Woman image never appears.
- On video failure: woman image fades in as a fallback so the section isn't blank.
- Reduced-motion users get the videos too (muted decorative loop, WCAG-safe).
