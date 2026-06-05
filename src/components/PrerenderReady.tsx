/**
 * Emits the prerender-ready signal that scripts/prerender.mjs waits on.
 *
 * Sets `document.documentElement.dataset.rendered = "true"` once:
 *   1. React Query has zero in-flight fetches (so Contentful blog posts
 *      have resolved before Puppeteer snapshots the DOM), AND
 *   2. In prerender mode (window.__PRERENDER__): the route has actually
 *      mounted (#root contains a <main> or <article>), AND for non-root
 *      routes the <title> has changed from the static index.html default
 *      (proof that the route's <Helmet> has committed). This guards
 *      against Suspense fallbacks being snapshotted instead of the real
 *      route content.
 *   3. The browser has painted.
 *
 * Resets the flag on every route change so per-route prerendering works.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";

// Must match the <title> in index.html. Used as a sentinel: if a non-root
// prerendered route still shows this title, Helmet has not committed yet.
const STATIC_INDEX_TITLE =
  "LS Diet — Stop Regaining Weight | Weight Permanence Training™";

declare global {
  interface Window {
    __PRERENDER__?: boolean;
  }
}

function isRouteMounted(pathname: string): boolean {
  if (typeof document === "undefined") return false;
  const root = document.getElementById("root");
  if (!root || root.childElementCount === 0) return false;
  // Real route content rendered, not just a Suspense fallback.
  const hasRouteContent = !!root.querySelector(
    "main, article, [data-route-root]",
  );
  if (!hasRouteContent) return false;
  // For non-root routes, require <title> to differ from the static default.
  if (pathname !== "/" && document.title === STATIC_INDEX_TITLE) return false;
  return true;
}

export function PrerenderReady() {
  const { pathname } = useLocation();
  const isFetching = useIsFetching();

  // Clear the flag at the start of each new navigation.
  useEffect(() => {
    if (typeof document === "undefined") return;
    delete document.documentElement.dataset.rendered;
  }, [pathname]);

  // Once nothing is fetching, wait for the route to actually mount, then
  // mark the document ready.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isFetching > 0) return;
    if (document.documentElement.dataset.rendered === "true") return;

    const isPrerender =
      typeof window !== "undefined" && window.__PRERENDER__ === true;

    let cancelled = false;
    let rafId = 0;
    let consecutiveOk = 0;
    const startedAt = Date.now();
    const MAX_WAIT_MS = 10_000;

    const tick = () => {
      if (cancelled) return;

      if (isPrerender) {
        if (isRouteMounted(pathname)) {
          consecutiveOk += 1;
        } else {
          consecutiveOk = 0;
        }
        if (consecutiveOk < 2) {
          if (Date.now() - startedAt < MAX_WAIT_MS) {
            rafId = requestAnimationFrame(tick);
          } else {
            // Bail out after timeout — let prerender script's safety net
            // catch any broken snapshot.
            document.documentElement.dataset.rendered = "true";
          }
          return;
        }
      } else {
        // Runtime (non-prerender): preserve original double-rAF behaviour.
        if (consecutiveOk < 2) {
          consecutiveOk += 1;
          rafId = requestAnimationFrame(tick);
          return;
        }
      }

      document.documentElement.dataset.rendered = "true";
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pathname, isFetching]);

  return null;
}

export default PrerenderReady;
