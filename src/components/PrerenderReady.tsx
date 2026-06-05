/**
 * Emits the prerender-ready signal that scripts/prerender.mjs waits on.
 *
 * Sets `document.documentElement.dataset.rendered = "true"` once:
 *   1. React Query has zero in-flight fetches (so Contentful blog posts
 *      have resolved before Puppeteer snapshots the DOM), AND
 *   2. The browser has painted (double rAF guarantees React commit + paint).
 *
 * Resets the flag on every route change so per-route prerendering works.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";

export function PrerenderReady() {
  const { pathname } = useLocation();
  const isFetching = useIsFetching();

  // Clear the flag at the start of each new navigation.
  useEffect(() => {
    if (typeof document === "undefined") return;
    delete document.documentElement.dataset.rendered;
  }, [pathname]);

  // Once nothing is fetching, wait for two animation frames (React commit
  // + paint) then mark the document ready.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isFetching > 0) return;
    if (document.documentElement.dataset.rendered === "true") return;

    let cancelled = false;
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => {
        if (cancelled) return;
        document.documentElement.dataset.rendered = "true";
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(outerRaf);
      if (innerRaf) cancelAnimationFrame(innerRaf);
    };
  }, [pathname, isFetching]);

  return null;
}

export default PrerenderReady;
