import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Fires a GA4 page_view on every React Router location change,
 * including the initial render. Mounted once inside <BrowserRouter>.
 */
export function useAnalyticsPageviews(): void {
  const location = useLocation();

  useEffect(() => {
    // Defer one frame so Helmet has a chance to update document.title.
    const id = window.setTimeout(() => {
      trackPageView(location.pathname + location.search, document.title);
    }, 0);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);
}
