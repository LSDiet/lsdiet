## Goal

Identify exactly which gate condition in `PrerenderReady` is blocking `rendered=true` on the 19 failed routes, instead of guessing.

## Changes

### 1. `src/components/PrerenderReady.tsx` — instrument the gate

Replace the single boolean check with per-condition tracking. On every render (or via an effect that runs on each dependency change), log a structured line:

```
[PrerenderReady] path=/oscar-poon titleOk=true mainOk=false fetching=2 mounted=true → blocked
```

Log only when not yet `rendered`, and only when at least one condition flips, to avoid log spam. Emit a final `→ ready` line right before setting `window.__PRERENDER_READY__ = true`.

### 2. `scripts/prerender.mjs` — capture diagnostics + reduce contention

- Attach listeners per page:
  - `page.on('console', msg => { if (msg.text().startsWith('[PrerenderReady]')) routeLogs.push(msg.text()); })`
  - `page.on('pageerror', err => routeLogs.push('[pageerror] ' + err.message))`
  - `page.on('requestfailed', req => routeLogs.push('[requestfailed] ' + req.url() + ' ' + req.failure()?.errorText))`
- On timeout, print the last 5–10 `[PrerenderReady]` lines and any `pageerror` / `requestfailed` entries for that route so we see exactly which gate stayed false.
- Add a 250 ms stagger between worker starts (sequential `await sleep(250)` in the worker bootstrap loop) to reduce the cold-start race that took out the first wave.
- Keep concurrency at 6 and the 20 s timeout unchanged — we want to reproduce the failures, not paper over them.

### 3. No production behavior change

All logging is `console.debug` / `console.log`-only and runs in any environment. We can leave it in for one diagnostic build, then strip it in a follow-up commit once we have the answer.

## Deliverable from the next build log

For each failed route we will see, e.g.:

```
✗ /oscar-poon: timeout after 20000ms
  last gate state: titleOk=true mainOk=true fetching=3 mounted=true
  [requestfailed] https://…supabase.co/rest/v1/posts net::ERR_CONNECTION_REFUSED
```

That tells us unambiguously whether the blocker is `isFetching`, the title check, the mount check, or a hidden JS error — no more inference.

## Out of scope

- No changes to the actual gate semantics yet.
- No changes to route data fetching, Suspense boundaries, or QueryClient config.
- Once the log identifies the real blocker, we'll open a separate, targeted fix.
