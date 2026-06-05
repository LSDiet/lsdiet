import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  fetchPostsByCategory,
  formatPublishDate,
  type BlogPost,
} from "@/lib/blog";
import { labelForSlug } from "@/lib/category";

export default function CategoryArchivePage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [resolvedLabel, setResolvedLabel] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    setPosts(null);
    fetchPostsByCategory(slug).then(({ posts, category }) => {
      if (cancelled) return;
      setPosts(posts);
      setResolvedLabel(category || labelForSlug(slug) || "");
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const label = resolvedLabel || labelForSlug(slug) || "Category";
  const canonical = `https://lsdiet.com/category/${slug}`;
  const isEmpty = posts !== null && posts.length === 0;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#collection`,
    name: `${label} | LS Diet Blog`,
    url: canonical,
    inLanguage: "en-CA",
    description: `Articles in the ${label} category on the LS Diet blog.`,
    isPartOf: { "@type": "WebSite", url: "https://lsdiet.com" },
    hasPart: (posts ?? []).map((p) => ({
      "@type": "Article",
      headline: p.title,
      url: `https://lsdiet.com/blog/${p.slug}`,
      datePublished: p.publishDate,
      dateModified: p.updatedAt,
      inLanguage: "en-CA",
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{label} | LS Diet Blog</title>
        <meta
          name="description"
          content={`Articles in the ${label} category on the LS Diet blog.`}
        />
        <link rel="canonical" href={canonical} />
        {isEmpty && <meta name="robots" content="noindex,follow" />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${label} | LS Diet Blog`} />
        <meta
          property="og:description"
          content={`Articles in the ${label} category on the LS Diet blog.`}
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="en_CA" />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <Navbar />
      <PageBreadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: label, url: `/category/${slug}` },
        ]}
      />

      <main data-route-root className="container max-w-5xl mx-auto px-4 pb-20">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Category</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-zinc-900">
            {label}
          </h1>
          <p className="text-base md:text-lg text-zinc-700">
            Articles tagged <span className="font-semibold">{label}</span> on the LS Diet blog.
          </p>
        </header>

        {posts === null && <div className="text-zinc-600">Loading…</div>}

        {isEmpty && (
          <div className="rounded-xl border border-border p-8 text-center">
            <p className="text-zinc-700 mb-4">
              No posts in this category yet. Check back soon.
            </p>
            <Button variant="accent" asChild>
              <a href="/blog">Back to all posts</a>
            </Button>
          </div>
        )}

        {posts && posts.length > 0 && (
          <ul className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
            {posts.map((p) => (
              <li key={p.id}>
                <a
                  href={`/blog/${p.slug}`}
                  className="group block py-6 hover:bg-zinc-50 transition-colors px-2 -mx-2 rounded"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-accent transition-colors mb-1">
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="text-sm md:text-base text-zinc-700 mb-2 line-clamp-2">
                      {p.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-zinc-500">
                    {formatPublishDate(p.publishDate)}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <FooterSimple />
    </div>
  );
}
