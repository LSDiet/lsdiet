import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { listBlogPosts, type BlogPost } from "@/lib/blog";
import { fetchBlogIndex, type BlogIndexEntry } from "@/lib/blogIndex";
import { FOUNDATIONS } from "@/content/foundations";
import { FoundationsCurriculum } from "@/components/FoundationsCurriculum";
import { SearchDrivenIndex } from "@/components/SearchDrivenIndex";

type EnrichedPost = BlogPost & {
  contentType: BlogIndexEntry["contentType"];
  canonicalTopic: string;
};

// Convert code-managed foundations to the BlogPost shape so they render in the grid.
function foundationsAsBlogPosts(): BlogPost[] {
  return FOUNDATIONS.map((f) => ({
    id: `foundation:${f.meta.slug}`,
    createdAt: f.meta.publishDate,
    updatedAt: f.meta.updatedAt,
    title: f.meta.title,
    slug: f.meta.slug,
    excerpt: f.meta.excerpt,
    content: null,
    featuredImage: {
      url: f.meta.featuredImage.src,
      title: f.meta.featuredImage.alt,
      width: f.meta.featuredImage.width,
      height: f.meta.featuredImage.height,
    },
    publishDate: f.meta.publishDate,
  }));
}

export default function BlogPage() {
  const [posts, setPosts] = useState<EnrichedPost[] | null>(null);
  const [indexEntries, setIndexEntries] = useState<BlogIndexEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Contentful list may fail in early phases (no posts yet) — don't let that
    // block foundations from rendering.
    Promise.all([
      listBlogPosts().catch(() => [] as BlogPost[]),
      fetchBlogIndex().catch(() => [] as BlogIndexEntry[]),
    ])
      .then(([raw, index]) => {
        if (cancelled) return;
        setIndexEntries(index);
        const foundations = foundationsAsBlogPosts();
        const foundationSlugs = new Set(foundations.map((p) => p.slug));
        // Foundations win on slug collision.
        const merged: BlogPost[] = [
          ...foundations,
          ...raw.filter((p) => !foundationSlugs.has(p.slug)),
        ];
        merged.sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));

        const bySlug = new Map(index.map((i) => [i.slug, i]));
        const enriched: EnrichedPost[] = merged.map((p) => {
          const meta = bySlug.get(p.slug);
          return {
            ...p,
            contentType: (meta?.contentType ?? "supporting") as BlogIndexEntry["contentType"],
            canonicalTopic: meta?.canonicalTopic ?? "",
          };
        });
        setPosts(enriched);
      })
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
      "LS Diet Foundations and real-life weight loss questions — articles on stopping weight regain, the Weight Permanence Triangle™, awareness, and practical action.",
    author: { "@type": "Person", "@id": "https://lsdiet.com/oscar-poon#person" },
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
        <title>LS Diet Blog | Foundations & Real-Life Weight Questions</title>
        <meta
          name="description"
          content="LS Diet Foundations and real-life weight loss questions — articles on stopping weight regain, the Weight Permanence Triangle™, awareness, and practical action."
        />
        <link rel="canonical" href="https://lsdiet.com/blog" />
        <meta property="og:title" content="LS Diet Blog" />
        <meta property="og:description" content="LS Diet Foundations and real-life weight loss questions." />
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
            Long-form notes on the LS Diet system — and the real-life questions that come with
            stopping weight regain for good.
          </p>
        </header>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-zinc-800">
            Couldn't load posts. Please refresh in a moment.
          </div>
        )}

        {!error && posts === null && <div className="text-zinc-600">Loading posts…</div>}

        {!error && posts && posts.length === 0 && (
          <div className="rounded-xl border border-border p-8 text-center">
            <p className="text-zinc-700 mb-4">No posts published yet. Check back soon.</p>
            <Button variant="accent" asChild>
              <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
                Join LS Diet
              </a>
            </Button>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="space-y-16">
            <FoundationsCurriculum />
            <SearchDrivenIndex entries={indexEntries} />
          </div>
        )}
      </section>

      <FooterSimple />
    </div>
  );
}

