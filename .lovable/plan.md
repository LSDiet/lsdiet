# Background Video Sequence — Play Video 1 → 2 → 3 → 4, looping

Wire the 4 uploaded clips into the hero `ProblemHookSection` as a muted, crossfading background that plays in order (1 → 2 → 3 → 4) then loops back to 1. Keep the 5 pain-point labels and headline on top, protect load speed.

## Source clips (probed)
```text
Video 1.mp4  1920x1080  25fps  12.8s   5.0 MB
Video 2.mov  1920x1080  25fps  15.3s    12 MB
Video 3.mov  1920x1080  30fps   8.7s   3.0 MB
Video 4.mp4  1280x720   24fps   5.2s   451 KB
```
Raw total ~20 MB — too heavy to ship as-is. We re-encode.

## Encoding (ffmpeg, audio stripped)
For each clip produce desktop + mobile, in `.webm` (VP9) and `.mp4` (H.264) — 4 clips × 2 sizes × 2 formats = 16 files.

```text
Desktop  -> 1280x720, 24fps, VP9 ~0.9 Mbps webm + H.264 mp4
Mobile   -> 854x480,  24fps, lower bitrate webm + mp4 (preserves framing, lighter)
```
Target: ~0.6–1.5 MB per desktop clip, ~0.3–0.7 MB per mobile clip. All muted (`-an`). Files saved to `src/assets/` and imported as ES6 modules.

## Component change
The current `BackgroundVideo` ping-pongs 2 layers and swaps `src` for >2 clips, which is fragile for a strict 4-clip ordered sequence. Rework it to robustly cycle N clips in order:
- Two stacked `<video>` layers, A and B, crossfading via CSS opacity.
- Maintain a `currentIndex`; on each clip's `ended`, advance `(index + 1) % clips.length`, load the next clip into the hidden layer, fade it in, and preload the following one.
- Sequence is strictly 1 → 2 → 3 → 4 → 1 …
- Keep all existing safeguards: poster image is the instant LCP, playback starts after first paint, `muted`/`playsInline`/`autoPlay`, honours `prefers-reduced-motion`, and falls back to the poster on load failure.

## Wiring
- `desktopClips` = 4 desktop clips (webm+mp4) in order.
- `mobileClips` = 4 mobile clips (webm+mp4) in order.
- Poster stays `problem-hook-bg.jpg`; labels, headline, scrim untouched.

## QA
- Desktop (~1280px) and mobile (~595px): confirm clips autoplay muted, advance 1→2→3→4 and loop, crossfades are smooth, labels stay legible over footage, poster shows first, nothing overflows one screen.
- Verify encoded file sizes hit targets; report total added weight.

## Technical notes
- ffmpeg/ffprobe already in PATH.
- Encode in the sandbox from the uploaded files; commit outputs under `src/assets/`.
- No new dependencies; crossfade is pure CSS opacity.