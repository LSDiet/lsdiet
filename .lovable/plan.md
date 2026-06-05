## Plan

1. **Make route mounting deterministic during prerender**
   - In `src/App.tsx`, detect `window.__PRERENDER__` and use eager route components for all prerendered sitemap routes instead of `React.lazy` chunks.
   - Keep normal browser behaviour lazy-loaded so the production SPA bundle strategy is unchanged for users.

2. **Fix the remaining explicit gate failure**
   - `/what-is-ls-diet` mounted, but `PrerenderReady` reported `hasRouteEl=false` and `titleOk=false`.
   - Add an explicit `[data-route-root]` marker at the page root so the readiness gate can detect it even if nested article detection is delayed.
   - Keep the title gate aligned with the current readiness policy rather than relying on stale diagnostic comments.

3. **Improve diagnostics for `#root > *` failures**
   - In `scripts/prerender.mjs`, wrap the `#root > *` wait the same way as the rendered wait, so failures include page console errors, page errors, request failures, current URL, and a short root/body snapshot.
   - This turns the current opaque failures (`Waiting for selector #root > * failed`) into actionable output if anything remains.

4. **Reduce build flakiness without hiding failures**
   - Keep concurrency conservative.
   - Keep the serial retry pass, but ensure recovered routes are clearly counted and final unrecovered failures remain visible in the summary.

5. **Validate from the next build log**
   - Expected signal: route pages should no longer fail at `#root > *` due to lazy chunk starvation.
   - If anything still fails, the updated log will identify whether the issue is a JS exception, missing route root, network failure, or a true timeout.