Do I know what the issue is? Yes.

The direct crash is in `src/main.tsx`:

```ts
const container = document.getElementById("root")!;
const isPrerendered =
  document.documentElement.dataset.prerendered === "true" &&
  container.hasChildNodes();
```

During prerender, `container` is sometimes `null`, so `container.hasChildNodes()` crashes before React mounts. The reason it only happens after some successful routes is a prerender race: `scripts/prerender.mjs` overwrites `dist/index.html` for `/` while the same file is also being used by `sirv(single: true)` as the SPA fallback for every other route. Under concurrency, Chromium can receive a partially-written or stamped fallback HTML document, leaving no `#root` and causing the crash.

Plan:

1. **Make the prerender server use an immutable fallback**
   - Load the original built `dist/index.html` into memory before prerendering.
   - Serve hashed assets from `dist/` normally.
   - For app routes, return the in-memory baseline HTML instead of reading the mutable `dist/index.html` from disk.
   - This prevents `/` prerender output from corrupting or racing with later route loads.

2. **Harden React boot in `src/main.tsx`**
   - Replace the unsafe non-null assertion with an explicit `#root` guard.
   - Replace `hasChildNodes()` with `container.children.length > 0` so comments/text nodes do not trigger hydration.
   - Keep normal hydration for genuinely prerendered pages and normal `createRoot` for the baseline SPA shell.

3. **Keep the existing diagnostics, but make failures faster and clearer**
   - Preserve the route snapshot/pageerror logging.
   - Once the root race is removed, the 30-second-per-route mount timeout should stop cascading, so deploy should no longer sit for several minutes retrying doomed routes.

4. **Validation after implementation**
   - Run the prerender/build path via the project’s normal verification flow.
   - Confirm routes no longer fail with `Cannot read properties of null (reading 'hasChildNodes')` or `#root > *` mount timeouts.

<presentation-actions>
  <presentation-open-history>View History</presentation-open-history>
</presentation-actions>

<presentation-actions>
<presentation-link url="https://docs.lovable.dev/tips-tricks/troubleshooting">Troubleshooting docs</presentation-link>
</presentation-actions>