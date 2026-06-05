import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { trackEvent } from "@/lib/analytics";

// Global click delegation for two GA4 events:
//  - join_lsdiet_click: any link that points to the LS Diet Skool community
//  - blog_click:        any link that opens a blog post (/blog/<slug>)
// Using delegation so we don't have to touch every <a> across ~60 article
// files and CTA components.
if (typeof document !== "undefined") {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";

      if (href.includes("skool.com/lsdiet")) {
        trackEvent("join_lsdiet_click");
        return;
      }

      // Match /blog/<slug> but not the index (/blog or /blog/).
      const blogMatch = href.match(/\/blog\/([^/?#]+)/);
      if (blogMatch) {
        const slug = blogMatch[1];
        trackEvent("blog_click", { article: slug.replace(/-/g, "_") });
      }
    },
    { capture: true },
  );
}



const container = document.getElementById("root");
if (!container) {
  // Defensive: if the SPA shell was served without #root (e.g. a stale
  // fallback during prerender), bail out cleanly instead of throwing.
  console.error("[boot] #root not found; skipping React mount.");
} else {
  const hasElementChild = Array.from(container.childNodes).some(
    (n) => n.nodeType === 1,
  );
  const isPrerendered =
    document.documentElement.dataset.prerendered === "true" && hasElementChild;

  if (isPrerendered) {
    hydrateRoot(container, <App />);
  } else {
    createRoot(container).render(<App />);
  }
}
