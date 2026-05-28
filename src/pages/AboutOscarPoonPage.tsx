// Permanent redirect from the old author URL to the canonical /oscar-poon.
// SPA-friendly: emits canonical + meta-refresh for crawlers, Navigate for users.
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";

const CANONICAL = "https://lsdiet.com/oscar-poon";

export default function AboutOscarPoonPage() {
  useEffect(() => {
    // Belt-and-suspenders: ensure full-page navigation if Navigate is bypassed.
    if (typeof window !== "undefined" && window.location.pathname === "/about-oscar-poon") {
      window.history.replaceState(null, "", "/oscar-poon");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Redirecting to Oscar Poon profile — LS Diet</title>
        <link rel="canonical" href={CANONICAL} />
        <meta name="robots" content="noindex, follow" />
        <meta httpEquiv="refresh" content={`0; url=${CANONICAL}`} />
      </Helmet>
      <Navigate to="/oscar-poon" replace />
    </>
  );
}
