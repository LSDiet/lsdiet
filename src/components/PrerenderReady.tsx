/**
 * Emits the prerender-ready signal that scripts/prerender.mjs waits on.
 *
 * Sets `document.documentElement.dataset.rendered = "true"` once:
 *   1. React Query has zero in-flight fetches, AND
 *   2. The route has actually mounted (#root contains a <main>, <article>,
 *      or [data-route-root]), AND
 *   3. For non-root routes the <title> differs from the static index.html
 *      default (proof that the route's <Helmet> has committed).
 *
 * The gate is intentionally strict and applied in both prerender and
 * runtime so we never ship a Suspense-fallback snapshot. If the route
 * never mounts, we simply never set the flag — Puppeteer's outer
 * waitForFunction timeout decides the route is broken, the prerender
 * script's safety nets fire, and that route is skipped (no overwrite).
 *
 * Resets the flag on every route change so per-route prerendering works.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";

// Must match the <title> in index.html. Used as a sentinel: if a non-root
// route still shows this title, Helmet has not committed yet.
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
  const hasRouteContent = !!root.querySelector(
    "main, article, [data-route-root]",
  );
  if (!hasRouteContent) return false;
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

  // Wait until nothing is fetching AND the route is truly mounted.
  // Never fall back to "true" on a timer — strictness is the whole point.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isFetching > 0) return;
    if (document.documentElement.dataset.rendered === "true") return;

    let cancelled = false;
    let rafId = 0;
    let consecutiveOk = 0;

    const tick = () => {
      if (cancelled) return;

      if (isRouteMounted(pathname)) {
        consecutiveOk += 1;
      } else {
        consecutiveOk = 0;
      }

      if (consecutiveOk < 2) {
        rafId = requestAnimationFrame(tick);
        return;
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
