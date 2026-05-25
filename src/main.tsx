import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;
const isPrerendered =
  document.documentElement.dataset.prerendered === "true" &&
  container.hasChildNodes();

if (isPrerendered) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}

// Signal to the prerender headless browser that the page is fully painted
// and Helmet has flushed its head tags. Triggers snapshot capture.
const markRendered = () => {
  document.documentElement.dataset.rendered = "true";
};
if (typeof requestAnimationFrame === "function") {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => setTimeout(markRendered, 150)),
  );
} else {
  setTimeout(markRendered, 200);
}
