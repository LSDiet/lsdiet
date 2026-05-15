import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ShareRedirectPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "");
  const target = safeSlug ? `https://lsdiet.com/blog/${safeSlug}` : "https://lsdiet.com/blog";

  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 text-center">
      <Helmet>
        <title>Redirecting | LS Diet</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={target} />
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
      </Helmet>
      <a className="text-accent underline underline-offset-4" href={target}>
        Continue to LS Diet
      </a>
    </main>
  );
}