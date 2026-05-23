import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { JoinFloatingBar } from "@/components/JoinFloatingBar";
import {
  listBlogPosts,
  fetchCategories,
  fetchBlogPost,
  formatPublishDate,
  type BlogPost,
  type CategorySummary,
} from "@/lib/blog";
import { fetchBlogIndex, type BlogIndexEntry } from "@/lib/blogIndex";
import { FOUNDATIONS } from "@/content/foundations";
import { FoundationsCurriculum } from "@/components/FoundationsCurriculum";
import { SearchDrivenIndex } from "@/components/SearchDrivenIndex";


type EnrichedPost = BlogPost & {
  contentType: BlogIndexEntry["contentType"];
  canonicalTopic: string;
};

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
  const [contentfulPosts, setContentfulPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [indexEntries, setIndexEntries] = useState<BlogIndexEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      listBlogPosts().catch(() => [] as BlogPost[]),
      fetchBlogIndex().catch(() => [] as BlogIndexEntry[]),
      fetchCategories().catch(() => [] as CategorySummary[]),
    ])
      .then(([raw, index, cats]) => {
        if (cancelled) return;
        setIndexEntries(index);
        setContentfulPosts(raw);
        setCategories(cats);
        const foundations = foundationsAsBlogPosts();
        const foundationSlugs = new Set(foundations.map((p) => p.slug));
        const merged: BlogPost[] = [
          ...foundations,
          ...raw.filter((p) => !foundationSlugs.has(p.slug)),
        ];
        merged.sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
        const bySlug = new Map(index.map((i) => [i.slug, i]));
        setPosts(
          merged.map((p) => {
            const meta = bySlug.get(p.slug);
            return {
              ...p,
              contentType: (meta?.contentType ?? "supporting") as BlogIndexEntry["contentType"],
              canonicalTopic: meta?.canonicalTopic ?? "",
            };
          }),
        );
      })
      .catch((e) => !cancelled && setError(e.message ?? "Failed to load"));
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredEditorial = useMemo(() => {
    if (!activeCategory) return contentfulPosts;
    return contentfulPosts.filter((p) => p.categorySlug === activeCategory);
  }, [contentfulPosts, activeCategory]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://lsdiet.com/blog#collection",
    name: "LS Diet Blog",
    url: "https://lsdiet.com/blog",
    inLanguage: "en-CA",
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
      inLanguage: "en-CA",
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
        <meta property="og:locale" content="en_CA" />
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

            {contentfulPosts.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-4">
                  Editorial Posts
                </h2>

                {categories.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    <FilterChip
                      label="All"
                      count={contentfulPosts.length}
                      active={!activeCategory}
                      onClick={() => setActiveCategory("")}
                    />
                    {categories.map((c) => (
                      <FilterChip
                        key={c.slug}
                        label={c.label}
                        count={c.count}
                        active={activeCategory === c.slug}
                        onClick={() => setActiveCategory(c.slug)}
                        href={`/category/${c.slug}`}
                      />
                    ))}
                  </div>
                )}

                {filteredEditorial.length === 0 ? (
                  <p className="text-sm text-zinc-600">No posts in this category yet.</p>
                ) : (
                  <ul className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
                    {filteredEditorial.map((p) => (
                      <li key={p.id}>
                        <a
                          href={`/blog/${p.slug}`}
                          className="group flex items-start gap-4 py-5 px-2 -mx-2 rounded hover:bg-zinc-50 transition-colors"
                        >
                          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-accent/10">
                            {p.featuredImage?.url ? (
                              <img
                                src={p.featuredImage.url}
                                alt={p.featuredImage.title || p.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            {p.category && p.categorySlug && (
                              <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">
                                {p.category}
                              </span>
                            )}
                            <h3 className="text-lg md:text-xl font-bold text-zinc-900 group-hover:text-accent transition-colors mt-1">
                              {p.title}
                            </h3>
                            {p.excerpt && (
                              <p className="text-sm text-zinc-700 mt-1 line-clamp-2">{p.excerpt}</p>
                            )}
                            <p className="text-xs text-zinc-500 mt-1">
                              {formatPublishDate(p.publishDate)}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            <SearchDrivenIndex entries={indexEntries} />
          </div>
        )}

      </section>

      <FooterSimple />
      <JoinFloatingBar />

    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
  href,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  href?: string;
}) {
  const className = `inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors ${
    active
      ? "bg-accent text-accent-foreground border-accent"
      : "bg-transparent text-zinc-700 border-zinc-300 hover:border-accent hover:text-accent"
  }`;
  // Render as anchor when href is provided so crawlers see the archive link.
  // Click intercepts to apply the in-page filter without nav.
  if (href) {
    return (
      <a
        href={href}
        className={className}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
          e.preventDefault();
          onClick();
        }}
      >
        {label} <span className="opacity-70">({count})</span>
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      {label} <span className="opacity-70">({count})</span>
    </button>
  );
}
