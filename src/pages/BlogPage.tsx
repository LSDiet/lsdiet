import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { listBlogPosts, formatPublishDate, type BlogPost } from "@/lib/blog";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listBlogPosts()
      .then((p) => !cancelled && setPosts(p))
      .catch((e) => !cancelled && setError(e.message ?? "Failed to load"));
    return () => {
      cancelled = true;
    };
  }, []);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://lsdiet.com/blog#collection",
    name: "LS Diet Blog",
    url: "https://lsdiet.com/blog",
    description:
      "Weight loss articles about insulin resistance, low starch diets, food psychology, habit change, and preventing weight regain.",
    author: { "@type": "Person", name: "Oscar Poon", url: "https://lsdiet.com/about-oscar-poon" },
    publisher: { "@type": "Organization", name: "LS Diet", url: "https://lsdiet.com" },
    hasPart: (posts ?? []).map((p) => ({
      "@type": "Article",
      headline: p.title,
      url: `https://lsdiet.com/blog/${p.slug}`,
      datePublished: p.publishDate,
      dateModified: p.updatedAt,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>LS Diet Blog | Long-Form Notes on Permanent Weight Loss</title>
        <meta
          name="description"
          content="Weight loss articles about insulin resistance, low starch diets, food psychology, habit change, and preventing weight regain."
        />
        <link rel="canonical" href="https://lsdiet.com/blog" />
        <meta property="og:title" content="LS Diet Blog" />
        <meta property="og:description" content="Weight loss articles about insulin resistance, low starch diets, food psychology, habit change, and preventing weight regain." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lsdiet.com/blog" />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <Navbar />
      <PageBreadcrumb items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]} />

      <section className="container max-w-6xl mx-auto px-4 pb-20">
        <header className="mb-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-3">
            LS Diet <span className="text-accent">Blog</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-700">
            Long-form notes on the low-starch, low-sugar lifestyle, awareness work, and behavioural
            permanence — written by Oscar Poon.
          </p>
        </header>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-zinc-800">
            Couldn't load posts. Please refresh in a moment.
          </div>
        )}

        {!error && posts === null && (
          <div className="text-zinc-600">Loading posts…</div>
        )}

        {!error && posts && posts.length === 0 && (
          <div className="rounded-xl border border-border p-8 text-center">
            <p className="text-zinc-700 mb-4">No posts published yet. Check back soon.</p>
            <Button variant="accent" asChild>
              <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
                JOIN LS DIET (FREE)
              </a>
            </Button>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <a
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-accent/60 transition-colors"
              >
                {p.featuredImage?.url ? (
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={p.featuredImage.url}
                      alt={p.featuredImage.title || p.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-gradient-to-br from-accent/10 to-muted" />
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-xs text-zinc-600 uppercase tracking-wider mb-2">
                    <time dateTime={p.publishDate}>{formatPublishDate(p.publishDate)}</time>
                  </p>
                  <h2 className="text-lg md:text-xl font-bold leading-snug mb-2 text-foreground group-hover:text-accent transition-colors">
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="text-sm text-zinc-700 leading-relaxed line-clamp-3">
                      {p.excerpt}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <FooterSimple />
    </div>
  );
}
