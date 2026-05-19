import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { listBlogPosts, formatPublishDate, type BlogPost } from "@/lib/blog";
import { fetchBlogIndex, type BlogIndexEntry } from "@/lib/blogIndex";
import { FOUNDATIONS } from "@/content/foundations";
import { FoundationsCurriculum } from "@/components/FoundationsCurriculum";

type EnrichedPost = BlogPost & {
  contentType: BlogIndexEntry["contentType"];
  canonicalTopic: string;
};

const SUPPORTING_TYPES = new Set(["supporting", "comparison", "evergreen-faq"]);

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

  // Foundations are rendered by FoundationsCurriculum from its own source.
  const supporting = (posts ?? []).filter((p) => SUPPORTING_TYPES.has(p.contentType));

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
            <BlogSection
              eyebrow="Search-driven articles"
              title="Real Life Weight Questions"
              description="Practical answers to the questions people actually ask while trying to stop regaining."
              posts={supporting}
              emptyMessage="No real-life articles yet."
            />
          </div>
        )}
      </section>

      <FooterSimple />
    </div>
  );
}

function BlogSection({
  eyebrow,
  title,
  description,
  posts,
  emptyMessage,
}: {
  eyebrow: string;
  title: string;
  description: string;
  posts: EnrichedPost[];
  emptyMessage: string;
}) {
  return (
    <section>
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">{eyebrow}</p>
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-2">{title}</h2>
        <p className="text-sm md:text-base text-zinc-700">{description}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-zinc-500 italic">{emptyMessage}</p>
      ) : (
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
                <h3 className="text-lg md:text-xl font-bold leading-snug mb-2 text-foreground group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                {p.excerpt && (
                  <p className="text-sm text-zinc-700 leading-relaxed line-clamp-3">{p.excerpt}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
