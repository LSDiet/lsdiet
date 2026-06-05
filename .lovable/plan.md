## Problem

Every prerendered `dist/<route>/index.html` is identical to the homepage shell: empty `<body>`, static `<title>` from `index.html`, no per-route Helmet tags. Cloudflare is serving these files correctly — they are simply broken at write time.

Cause: `PrerenderReady` signals "ready" based only on React Query's in-flight count. It doesn't wait for `React.Suspense` to resolve the lazy-loaded route chunk. Puppeteer snapshots during the Suspense fallback, before the route component mounts and before Helmet writes per-route `<title>` / canonical / JSON-LD.

The prerender script's safety net (`hasBundle` + non-empty `<head>`) passes because the static `index.html` already has a populated `<head>` and bundle script — so it never catches the empty-body case.

## Fix

Two coordinated changes, both small:

### 1. `src/components/PrerenderReady.tsx` — wait for the route to actually mount

Currently fires `data-rendered=true` once `useIsFetching() === 0` plus a double-rAF. Add an additional gate: the `#root` element must contain real content (not just a Suspense fallback), AND `document.title` must have changed from the static `index.html` default (proof that the per-route `<Helmet>` has committed).

Implementation:
- Poll `requestAnimationFrame` in a loop (up to ~10 s) checking:
  - `document.querySelector('#root')?.childElementCount > 0`, AND
  - `document.querySelector('#root main, #root article, #root [data-route-root]')` exists (proves route — not just nav/footer skeleton — mounted), AND
  - For non-`/` routes, `document.title !== "LS Diet — Stop Regaining Weight | Weight Permanence Training™"` (proves Helmet committed).
- Only after all three pass for two consecutive frames, set `data-rendered=true`.

This stays opt-in to prerender: the polling only kicks in when `window.__PRERENDER__` is true; runtime behaviour is unchanged.

### 2. `scripts/prerender.mjs` — stricter safety net

Add post-snapshot validation that would have caught this:
- Parse the serialized HTML.
- Require `<body>` to contain a non-trivial subtree (e.g. `body.innerHTML.length > 500` and contains either `<main` or `<article`).
- For non-`/` routes, require the snapshot's `<title>` to differ from the static `index.html`'s `<title>`.
- On failure, throw — the per-route try/catch already records the failure and the build-level "zero successful routes" guard will fail the build if everything is broken.

Read `dist/index.html` once at startup to capture the baseline title for comparison.

### 3. (Optional, defer) Eager-load prerendered routes

A more aggressive fix would be to convert the prerendered routes in `App.tsx` from `lazy()` to static imports, eliminating the Suspense race entirely. Not doing this in scope — it would balloon the initial JS bundle, and fix #1 makes it unnecessary.

## Verification

After redeploy:

```
curl -s https://lsdiet.pages.dev/oscar-poon/ | grep -iE '<title>|canonical'
```

Expect: `<title>Oscar Poon | Founder of LS Diet</title>` and `<link rel="canonical" href="https://lsdiet.com/oscar-poon">`.

Spot-check 2–3 other routes (`/awareness-stages/`, `/what-is-ls-diet/`, `/weight-permanence-triangle/`) for the same — each should return its own title.

Also confirm the build log: if any routes still fail, the new safety net will list them by name in the `[prerender]` output instead of silently shipping broken shells.

## Files touched

- `src/components/PrerenderReady.tsx` — add prerender-only wait gate
- `scripts/prerender.mjs` — add post-snapshot validation, capture baseline title
