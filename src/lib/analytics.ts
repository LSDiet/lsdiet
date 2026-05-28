// Thin GA4 wrapper. All calls are no-ops when gtag isn't loaded
// (dev, lovable.app previews, prerender bot). The gating happens in
// index.html so this file just needs to detect window.gtag.

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export function isAnalyticsEnabled(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

export function trackPageView(path: string, title?: string): void {
  if (!isAnalyticsEnabled()) return;
  window.gtag!("event", "page_view", {
    page_path: path,
    page_title: title ?? (typeof document !== "undefined" ? document.title : undefined),
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!isAnalyticsEnabled()) return;
  window.gtag!("event", name, params ?? {});
}
