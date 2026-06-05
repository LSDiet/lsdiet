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
 * runtime so we never ship a Suspense-fallback snapshot.
 *
 * Diagnostic logging: when window.__PRERENDER__ is true, logs each gate
 * state change with [PrerenderReady] so prerender.mjs can capture exactly
 * which condition is blocking on timeout.
 */
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";

const STATIC_INDEX_TITLE =
  "LS Diet — Stop Regaining Weight | Weight Permanence Training™";

declare global {
  interface Window {
    __PRERENDER__?: boolean;
  }
}

function gateState(pathname: string, isFetching: number) {
  const doc = typeof document !== "undefined" ? document : null;
  const root = doc?.getElementById("root");
  const mountedDom = !!(root && root.childElementCount > 0);
  const hasRouteEl = !!root?.querySelector("main, article, [data-route-root]");
  const titleOk =
    pathname === "/" ? true : (doc?.title ?? "") !== STATIC_INDEX_TITLE;
  const fetchingOk = isFetching === 0;
  const ready = mountedDom && hasRouteEl && titleOk && fetchingOk;
  return { mountedDom, hasRouteEl, titleOk, fetchingOk, isFetching, ready };
}

export function PrerenderReady() {
  const { pathname } = useLocation();
  const isFetching = useIsFetching();
  const lastLogged = useRef<string>("");

  useEffect(() => {
    if (typeof document === "undefined") return;
    delete document.documentElement.dataset.rendered;
    lastLogged.current = "";
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.documentElement.dataset.rendered === "true") return;

    const isPrerender =
      typeof window !== "undefined" && window.__PRERENDER__ === true;

    let cancelled = false;
    let rafId = 0;
    let consecutiveOk = 0;

    const tick = () => {
      if (cancelled) return;

      const s = gateState(pathname, isFetching);

      if (isPrerender) {
        const sig = `${s.mountedDom}|${s.hasRouteEl}|${s.titleOk}|${s.fetchingOk}|${s.isFetching}`;
        if (sig !== lastLogged.current) {
          lastLogged.current = sig;
          // eslint-disable-next-line no-console
          console.log(
            `[PrerenderReady] path=${pathname} mountedDom=${s.mountedDom} hasRouteEl=${s.hasRouteEl} titleOk=${s.titleOk} fetching=${s.isFetching} → ${s.ready ? "ready-candidate" : "blocked"}`,
          );
        }
      }

      if (s.ready) {
        consecutiveOk += 1;
      } else {
        consecutiveOk = 0;
      }

      if (consecutiveOk < 2) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (isPrerender) {
        // eslint-disable-next-line no-console
        console.log(`[PrerenderReady] path=${pathname} → ready`);
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
