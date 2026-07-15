import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  fetchBlogPost,
  fetchPostsByCategory,
  formatPublishDate,
  formatUpdatedShort,
  listBlogPosts,
  type BlogPost,
  type RelatedPostLite,
} from "@/lib/blog";
import { RichText } from "@/lib/contentfulRenderers";
import { ShareButtons } from "@/components/ShareButtons";
import { AboutAuthorBlock } from "@/components/AboutAuthorBlock";
import { RelatedFoundations } from "@/components/RelatedFoundations";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getFoundationBySlug, type Foundation } from "@/content/foundations";
import { getArticleBySlug, getArticlesByFoundation, type Article } from "@/content/articles";
import { ArticleBreadcrumb } from "@/components/ArticleBreadcrumb";
import { ArticleProgression } from "@/components/ArticleProgression";
import { clusterOfSlug } from "@/lib/searchArticleClusters";
import {
  getPathway,
  pathwaySlugSet,
  getFoundationTitle,
} from "@/lib/behaviouralPathway";
import { getRelatedArticles } from "@/lib/relatedArticles";
import { readingTimeMinutes } from "@/lib/readingTime";
import { LSDietCTA } from "@/components/LSDietCTA";
import { ctaCopyFor, type CtaContext } from "@/lib/ctaVariants";
import { useCtaInjection } from "@/lib/useCtaInjection";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";


type ViewModel = {
  source: "foundation" | "contentful" | "article";
  title: string;
  seoTitle: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  updatedAt: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  faqs?: { q: string; a: string }[];
  category?: string;
  categorySlug?: string;
  foundation?: Foundation;
  contentful?: BlogPost;
  article?: Article;
};

function fromFoundation(f: Foundation): ViewModel {
  return {
    source: "foundation",
    title: f.meta.title,
    seoTitle: f.meta.title,
    slug: f.meta.slug,
    excerpt: f.meta.excerpt,
    publishDate: f.meta.publishDate,
    updatedAt: f.meta.updatedAt,
    metaDescription: f.meta.metaDescription,
    image: f.meta.featuredImage.src.startsWith("https://") ? f.meta.featuredImage.src : `https://lsdiet.com${f.meta.featuredImage.src}`,
    imageAlt: f.meta.featuredImage.alt,
    imageWidth: f.meta.featuredImage.width,
    imageHeight: f.meta.featuredImage.height,
    faqs: f.meta.faqs,
    foundation: f,
  };
}

function fromContentful(p: BlogPost): ViewModel {
  const seoTitle = p.seoTitle?.trim() || p.title;
  const metaDescription =
    p.metaDescription?.trim() ||
    p.excerpt ||
    `${p.title} — by Oscar Poon on the LS Diet blog.`;
  return {
    source: "contentful",
    title: p.title,
    seoTitle,
    slug: p.slug,
    excerpt: p.excerpt,
    publishDate: p.publishDate,
    updatedAt: p.updatedAt,
    metaDescription,
    image: p.featuredImage?.url ?? "https://lsdiet.com/og-image.jpg",
    imageAlt: p.featuredImage?.title || p.title,
    imageWidth: p.featuredImage?.width,
    imageHeight: p.featuredImage?.height,
    category: p.category,
    categorySlug: p.categorySlug,
    contentful: p,
  };
}

function fromArticle(a: Article): ViewModel {
  return {
    source: "article",
    title: a.meta.title,
    seoTitle: a.meta.title,
    slug: a.meta.slug,
    excerpt: a.meta.excerpt,
    publishDate: a.meta.publishDate,
    updatedAt: a.meta.updatedAt,
    metaDescription: a.meta.metaDescription,
    image: a.meta.heroImage
      ? (a.meta.heroImage.startsWith("https://") ? a.meta.heroImage : `https://lsdiet.com${a.meta.heroImage}`)
      : "https://lsdiet.com/og-image.jpg",
    imageAlt: a.meta.heroImageAlt ?? a.meta.title,
    article: a,
  };
}

export default function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();

  // Local-first: foundations and articles are in the JS bundle. Render them
  // instantly with zero network. Only fall through to Contentful otherwise.
  const localVm = useMemo<ViewModel | null>(() => {
    const f = getFoundationBySlug(slug);
    if (f) return fromFoundation(f);
    const a = getArticleBySlug(slug);
    if (a) return fromArticle(a);
    return null;
  }, [slug]);

  const {
    data: contentfulPost,
    isLoading: contentfulLoading,
    isError: contentfulError,
  } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchBlogPost(slug),
    enabled: !!slug && !localVm,
  });

  const vm: ViewModel | null = localVm
    ? localVm
    : contentfulPost
    ? fromContentful(contentfulPost)
    : null;

  const status: "loading" | "ok" | "missing" | "error" = localVm
    ? "ok"
    : contentfulLoading
    ? "loading"
    : contentfulError
    ? "error"
    : contentfulPost
    ? "ok"
    : "missing";

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-3xl mx-auto px-4 pt-32 pb-20 text-center text-zinc-600">
          Loading post…
        </div>
      </div>
    );
  }

  if (status === "missing" || status === "error" || !vm) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Post not found | LS Diet Blog</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Navbar />
        <div className="container max-w-3xl mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-extrabold uppercase mb-4">Post not found</h1>
          <p className="text-zinc-700 mb-8">
            This post doesn't exist yet, or its publish date hasn't arrived.
          </p>
          <Button variant="accent" asChild>
            <a href="/blog">Back to Blog</a>
          </Button>
        </div>
        <FooterSimple />
      </div>
    );
  }

  const url = `https://lsdiet.com/blog/${vm.slug}`;
  // Local articles are prerendered with correct OG tags at the canonical URL.
  // Contentful posts use the Supabase edge function to serve OG metadata.
  const crawlerShareUrl = `https://lsdiet.com/share/${vm.slug}`;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: vm.title,
    description: vm.metaDescription,
    image: vm.image,
    url,
    inLanguage: "en-CA",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: vm.publishDate,
    dateModified: vm.updatedAt,
    author: { "@id": "https://lsdiet.com/#oscar-poon" },
    publisher: { "@id": "https://lsdiet.com/#organization" },
    isPartOf: { "@id": "https://lsdiet.com/#website" },
    about: { "@type": "Thing", name: "Weight regain prevention" },
    ...(vm.category ? { articleSection: vm.category } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lsdiet.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://lsdiet.com/blog" },
      { "@type": "ListItem", position: 3, name: vm.title, item: url },
    ],
  };

  const faqSchema = vm.faqs && vm.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: vm.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;


  const isArticle = vm.source === "article" && !!vm.article;
  const foundationArticles = vm.source === "foundation" ? getArticlesByFoundation(vm.slug) : [];

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />

      <Helmet>
        <title>{vm.seoTitle} | LS Diet</title>
        <meta name="description" content={vm.metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={vm.seoTitle} />
        <meta property="og:description" content={vm.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="en_CA" />
        {vm.image && <meta property="og:image" content={vm.image} />}
        <meta property="article:published_time" content={vm.publishDate} />
        <meta property="article:modified_time" content={vm.updatedAt} />
        <meta property="article:author" content="Oscar Poon" />
        {vm.category && <meta property="article:section" content={vm.category} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={vm.seoTitle} />
        <meta name="twitter:description" content={vm.metaDescription} />
        {vm.image && <meta name="twitter:image" content={vm.image} />}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <Navbar />

      {!isArticle && (
        <PageBreadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            ...(vm.category && vm.categorySlug
              ? [{ name: vm.category, url: `/category/${vm.categorySlug}` }]
              : []),
            { name: vm.title, url: `/blog/${vm.slug}` },
          ]}
        />
      )}

      <div className="relative">
        <div className="hidden lg:block absolute left-4 top-0 h-full pointer-events-none">
          <div className="sticky top-28 pointer-events-auto">
            <ShareButtons url={url} crawlerShareUrl={crawlerShareUrl} title={vm.title} variant="rail" />
          </div>
        </div>

        {isArticle && vm.article ? (
          <ArticleLayout
            article={vm.article}
            url={url}
            crawlerShareUrl={crawlerShareUrl}
            publishDate={vm.publishDate}
            updatedAt={vm.updatedAt}
          />
        ) : (
          <article className="container max-w-3xl mx-auto px-4 pt-4 md:pt-16 pb-20">
            <header className="mb-8">
              {vm.category && vm.categorySlug && (
                <a
                  href={`/category/${vm.categorySlug}`}
                  className="inline-block mb-3 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider hover:bg-accent/20 transition-colors"
                >
                  {vm.category}
                </a>
              )}
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-900">
                {vm.title}
              </h1>
              <p className="text-sm text-zinc-500 mb-1">
                By <span className="font-semibold text-zinc-700">Oscar Poon</span> · {formatPublishDate(vm.publishDate)}
              </p>
              {vm.updatedAt && vm.updatedAt !== vm.publishDate && (
                <p className="text-xs text-zinc-500 mb-4">
                  Updated {formatUpdatedShort(vm.updatedAt)}
                </p>
              )}
              <ShareButtons url={url} crawlerShareUrl={crawlerShareUrl} title={vm.title} variant="inline" className="justify-start mt-3" />
            </header>

            {vm.image && (
              <figure className="mb-10 -mx-4 md:mx-0">
                <img
                  src={vm.image}
                  alt={vm.imageAlt}
                  width={vm.imageWidth}
                  height={vm.imageHeight}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full md:rounded-xl"
                />
              </figure>
            )}

            <ProseBody
              slug={vm.slug}
              ctaContext={
                vm.source === "foundation"
                  ? { foundationSlug: vm.slug }
                  : { category: vm.category }
              }
              disableCta={vm.source === "foundation"}
            >
              {vm.source === "foundation" && vm.foundation ? (
                <vm.foundation.Body />
              ) : vm.contentful?.content ? (
                <RichText document={vm.contentful.content} />
              ) : null}
            </ProseBody>

            <div className="mt-14 text-center">
              <p className="text-sm text-zinc-600 mb-3">
                Know someone struggling with weight regain? Share this article.
              </p>
              <ShareButtons url={url} crawlerShareUrl={crawlerShareUrl} title={vm.title} variant="inline" />
            </div>

            <RelatedFoundations excludeSlug={vm.slug} />

            {vm.source === "foundation" && <RelatedArticles items={foundationArticles} />}

            <AboutAuthorBlock />

            {vm.source === "contentful" ? (
              <DynamicRelated
                currentSlug={vm.slug}
                explicit={vm.contentful?.relatedPosts ?? []}
                categorySlug={vm.categorySlug ?? ""}
              />
            ) : (
              <section className="mt-14 p-6 rounded-xl border border-accent/30 bg-accent/5">
                <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-900 mb-3">
                  Continue reading
                </h2>
                <ul className="space-y-2 text-zinc-800">
                  <li><a href="/" className="text-accent hover:underline">LS Diet — homepage</a></li>
                  <li><a href="/what-is-ls-diet" className="text-accent hover:underline">What is the LS Diet?</a></li>
                  <li><a href="/weight-permanence-training" className="text-accent hover:underline">The Weight Permanence Training™</a></li>
                  <li><a href="/faq" className="text-accent hover:underline">Frequently Asked Questions</a></li>
                </ul>
              </section>
            )}

          </article>
        )}
      </div>

      <FooterSimple />
    </div>
  );
}

/* ----------------------------------------------------------------
   Dynamic "Continue reading" for Contentful posts.
   Fallback chain: explicit relatedPosts → same-category → latest.
   ---------------------------------------------------------------- */

function DynamicRelated({
  currentSlug,
  explicit,
  categorySlug,
}: {
  currentSlug: string;
  explicit: RelatedPostLite[];
  categorySlug: string;
}) {
  const [items, setItems] = useState<
    Array<{ title: string; slug: string; excerpt: string; category: string; categorySlug: string }>
  >([]);

  useEffect(() => {
    let cancelled = false;
    // Priority 1: explicit relatedPosts.
    const explicitFiltered = explicit
      .filter((p) => p.slug && p.slug !== currentSlug)
      .slice(0, 4);
    if (explicitFiltered.length > 0) {
      setItems(
        explicitFiltered.map((p) => ({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          category: p.category,
          categorySlug: p.categorySlug,
        })),
      );
      return;
    }

    // Priority 2: same-category posts.
    const loadFallback = async () => {
      if (categorySlug) {
        const { posts } = await fetchPostsByCategory(categorySlug);
        const same = posts
          .filter((p) => p.slug !== currentSlug)
          .slice(0, 4)
          .map((p) => ({
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt,
            category: p.category ?? "",
            categorySlug: p.categorySlug ?? "",
          }));
        if (!cancelled && same.length > 0) {
          setItems(same);
          return;
        }
      }
      // Priority 3: latest published.
      const all = await listBlogPosts().catch(() => [] as BlogPost[]);
      const latest = all
        .filter((p) => p.slug !== currentSlug)
        .slice(0, 4)
        .map((p) => ({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          category: p.category ?? "",
          categorySlug: p.categorySlug ?? "",
        }));
      if (!cancelled) setItems(latest);
    };
    loadFallback();
    return () => {
      cancelled = true;
    };
  }, [currentSlug, explicit, categorySlug]);

  if (items.length === 0) return null;

  return (
    <section className="mt-14 p-6 rounded-xl border border-accent/30 bg-accent/5">
      <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-900 mb-4">
        Continue reading
      </h2>
      <ul className="space-y-4">
        {items.map((p) => (
          <li key={p.slug} className="border-b border-accent/10 last:border-0 pb-3 last:pb-0">
            <a href={`/blog/${p.slug}`} className="group block">
              <h3 className="font-bold text-zinc-900 group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              {p.excerpt && (
                <p className="text-sm text-zinc-700 mt-1 line-clamp-2">{p.excerpt}</p>
              )}
              {p.category && (
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1">
                  {p.category}
                </p>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ----------------------------------------------------------------
   Supporting-article layout (code-managed articles).
   ---------------------------------------------------------------- */

interface ArticleLayoutProps {
  article: Article;
  url: string;
  crawlerShareUrl: string;
  publishDate: string;
  updatedAt: string;
}

function ArticleLayout({ article, url, crawlerShareUrl, publishDate, updatedAt }: ArticleLayoutProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [readingMin, setReadingMin] = useState<number | null>(null);

  const pathway = useMemo(() => getPathway(article), [article]);
  const footerRelated = useMemo(() => {
    const exclude = pathwaySlugSet(pathway);
    return getRelatedArticles(article, exclude, 4);
  }, [article, pathway]);

  useLayoutEffect(() => {
    const wrapper = bodyRef.current;
    if (!wrapper) return;
    const text = wrapper.textContent || "";
    setReadingMin(readingTimeMinutes(text));
  }, [article.meta.slug]);

  const cluster = clusterOfSlug(article.meta.slug);
  const foundationTitle = getFoundationTitle(article.meta.primaryFoundationSlug);
  const showUpdated = updatedAt && updatedAt !== publishDate;

  const ctaContext: CtaContext = { clusterId: cluster?.id };
  const ctaSlots = useCtaInjection({ bodyRef, slug: article.meta.slug });

  return (
    <article className="container mx-auto px-4 pt-28 pb-20">
      <div className="mx-auto" style={{ maxWidth: "68ch" }}>
        <ArticleBreadcrumb clusterTitle={cluster?.title} articleTitle={article.meta.title} />

        <header className="mb-8">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3 text-zinc-900 leading-tight">
            {article.meta.title}
          </h1>

          <p className="text-xs md:text-sm text-zinc-500 mb-1">
            By <span className="font-semibold text-zinc-700">Oscar Poon</span>
            <span aria-hidden> · </span>
            {formatPublishDate(publishDate)}
            {readingMin !== null && (
              <>
                <span aria-hidden> · </span>
                <span data-testid="reading-time">{readingMin} min read</span>
              </>
            )}
          </p>
          {showUpdated && (
            <p className="text-xs text-zinc-500 mb-2">
              Updated {formatUpdatedShort(updatedAt)}
            </p>
          )}

          {foundationTitle && (
            <p className="text-xs text-zinc-500" data-testid="topic-line">
              Part of the LS Diet Foundations ecosystem ·{" "}
              <a
                href={`/blog/${article.meta.primaryFoundationSlug}`}
                className="text-zinc-700 hover:text-accent font-medium underline-offset-2 hover:underline transition-colors"
                data-testid="topic-value"
              >
                {foundationTitle}
              </a>
            </p>
          )}
        </header>

        {article.meta.heroImage && (
          <figure className="mb-8 -mx-4 md:mx-0">
            <img
              src={article.meta.heroImage}
              alt={article.meta.heroImageAlt ?? article.meta.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full md:rounded-xl"
            />
          </figure>
        )}

        <div ref={bodyRef} className="prose-article">
          <article.Body />
        </div>

        {ctaSlots.map((s) => {
          const copy = ctaCopyFor(ctaContext);
          return createPortal(
            <LSDietCTA placement={s.placement} headline={copy.headline} body={copy.body} />,
            s.node,
            `cta-${s.placement}`,
          );
        })}

        <div className="pt-6 border-t border-zinc-200 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-zinc-500">Found this useful? Share it.</p>
          <ShareButtons url={url} crawlerShareUrl={crawlerShareUrl} title={article.meta.title} variant="inline" />
        </div>

        <ArticleProgression pathway={pathway} slug={article.meta.slug} />

        <RelatedArticles items={footerRelated} />

        <AboutAuthorBlock />
      </div>
    </article>
  );
}

/* ----------------------------------------------------------------
   Shared prose wrapper for foundation + Contentful posts.
   Owns CTA injection (single <LSDietCTA /> after the conclusion)
   so the same logic runs across every blog template.
   ---------------------------------------------------------------- */

interface ProseBodyProps {
  slug: string;
  ctaContext: CtaContext;
  children: React.ReactNode;
  disableCta?: boolean;
}

function ProseBody({ slug, ctaContext, children, disableCta }: ProseBodyProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const ctaSlots = useCtaInjection({ bodyRef, slug });
  return (
    <div ref={bodyRef} className="prose-content">
      {children}
      {!disableCta && ctaSlots.map((s) => {
        const copy = ctaCopyFor(ctaContext);
        return createPortal(
          <LSDietCTA placement={s.placement} headline={copy.headline} body={copy.body} />,
          s.node,
          `cta-${s.placement}`,
        );
      })}
    </div>
  );
}
