import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { fetchBlogPost, formatPublishDate, type BlogPost } from "@/lib/blog";
import { RichText } from "@/lib/contentfulRenderers";
import { ShareButtons } from "@/components/ShareButtons";
import { ArticleByline } from "@/components/ArticleByline";
import { AboutAuthorBlock } from "@/components/AboutAuthorBlock";
import { RelatedFoundations } from "@/components/RelatedFoundations";
import { getFoundationBySlug, type Foundation } from "@/content/foundations";
import { getArticleBySlug, type Article } from "@/content/articles";

type ViewModel = {
  source: "foundation" | "contentful" | "article";
  title: string;
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
  // Renderers — only one is set:
  foundation?: Foundation;
  contentful?: BlogPost;
  article?: Article;
};

function fromFoundation(f: Foundation): ViewModel {
  return {
    source: "foundation",
    title: f.meta.title,
    slug: f.meta.slug,
    excerpt: f.meta.excerpt,
    publishDate: f.meta.publishDate,
    updatedAt: f.meta.updatedAt,
    metaDescription: f.meta.metaDescription,
    image: f.meta.featuredImage.src,
    imageAlt: f.meta.featuredImage.alt,
    imageWidth: f.meta.featuredImage.width,
    imageHeight: f.meta.featuredImage.height,
    faqs: f.meta.faqs,
    foundation: f,
  };
}

function fromContentful(p: BlogPost): ViewModel {
  return {
    source: "contentful",
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    publishDate: p.publishDate,
    updatedAt: p.updatedAt,
    metaDescription: p.excerpt || `${p.title} — by Oscar Poon on the LS Diet blog.`,
    image: p.featuredImage?.url ?? "https://lsdiet.com/og-image.jpg",
    imageAlt: p.featuredImage?.title || p.title,
    imageWidth: p.featuredImage?.width,
    imageHeight: p.featuredImage?.height,
    contentful: p,
  };
}

function fromArticle(a: Article): ViewModel {
  return {
    source: "article",
    title: a.meta.title,
    slug: a.meta.slug,
    excerpt: a.meta.excerpt,
    publishDate: a.meta.publishDate,
    updatedAt: a.meta.updatedAt,
    metaDescription: a.meta.metaDescription,
    image: "",
    imageAlt: "",
    article: a,
  };
}

export default function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [vm, setVm] = useState<ViewModel | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "missing" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    // 1. Code-managed foundations take priority (authority layer).
    const foundation = getFoundationBySlug(slug);
    if (foundation) {
      setVm(fromFoundation(foundation));
      setStatus("ok");
      return;
    }

    // 2. Contentful — curated editorial layer.
    // 3. Code-managed articles — Search-driven utility layer (fallback).
    fetchBlogPost(slug)
      .then((p) => {
        if (cancelled) return;
        if (p) {
          setVm(fromContentful(p));
          setStatus("ok");
          return;
        }
        const article = getArticleBySlug(slug);
        if (article) {
          setVm(fromArticle(article));
          setStatus("ok");
        } else {
          setStatus("missing");
        }
      })
      .catch(() => {
        if (cancelled) return;
        // Contentful failure must not block Articles from resolving.
        const article = getArticleBySlug(slug);
        if (article) {
          setVm(fromArticle(article));
          setStatus("ok");
        } else {
          setStatus("error");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

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
  const crawlerShareUrl = `https://joohccchfpcshlihctsm.supabase.co/functions/v1/share-blog/${vm.slug}`;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: vm.title,
    description: vm.metaDescription,
    image: vm.image,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: vm.publishDate,
    dateModified: vm.updatedAt,
    author: { "@id": "https://lsdiet.com/oscar-poon#person" },
    publisher: {
      "@type": "Organization",
      name: "LS Diet",
      url: "https://lsdiet.com",
      logo: { "@type": "ImageObject", url: "https://lsdiet.com/favicon.ico" },
    },
  };

  // FAQ schema only when foundation declares FAQs.
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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{vm.title} | LS Diet</title>
        <meta name="description" content={vm.metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={vm.title} />
        <meta property="og:description" content={vm.metaDescription} />
        <meta property="og:url" content={url} />
        {vm.image && <meta property="og:image" content={vm.image} />}
        <meta property="article:published_time" content={vm.publishDate} />
        <meta property="article:modified_time" content={vm.updatedAt} />
        <meta property="article:author" content="Oscar Poon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={vm.title} />
        <meta name="twitter:description" content={vm.metaDescription} />
        {vm.image && <meta name="twitter:image" content={vm.image} />}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <Navbar />
      <PageBreadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: vm.title, url: `/blog/${vm.slug}` },
        ]}
      />

      <div className="relative">
        {/* Desktop sticky share rail */}
        <div className="hidden lg:block absolute left-4 top-0 h-full pointer-events-none">
          <div className="sticky top-28 pointer-events-auto">
            <ShareButtons url={url} crawlerShareUrl={crawlerShareUrl} title={vm.title} variant="rail" />
          </div>
        </div>

        <article className="container max-w-3xl mx-auto px-4 pb-20">
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-900">
              {vm.title}
            </h1>
            <ArticleByline
              publishDate={vm.publishDate}
              formattedDate={formatPublishDate(vm.publishDate)}
              className="mb-5"
            />
            <ShareButtons url={url} crawlerShareUrl={crawlerShareUrl} title={vm.title} variant="inline" className="justify-start" />
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

          <div className="prose-content">
            {vm.source === "foundation" && vm.foundation ? (
              <vm.foundation.Body />
            ) : vm.source === "article" && vm.article ? (
              <vm.article.Body />
            ) : vm.contentful?.content ? (
              <RichText document={vm.contentful.content} />
            ) : null}
          </div>

          <div className="mt-14 text-center">
            <p className="text-sm text-zinc-600 mb-3">
              Know someone struggling with weight regain? Share this article.
            </p>
            <ShareButtons url={url} crawlerShareUrl={crawlerShareUrl} title={vm.title} variant="inline" />
          </div>

          <RelatedFoundations excludeSlug={vm.slug} />

          <AboutAuthorBlock />

          <section className="mt-14 p-6 rounded-xl border border-accent/30 bg-accent/5">
            <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-900 mb-3">
              Continue reading
            </h2>
            <ul className="space-y-2 text-zinc-800">
              <li>
                <a href="/" className="text-accent hover:underline">LS Diet — homepage</a>
              </li>
              <li>
                <a href="/what-is-ls-diet" className="text-accent hover:underline">What is the LS Diet?</a>
              </li>
              <li>
                <a href="/weight-permanence-triangle" className="text-accent hover:underline">The Weight Permanence Triangle™</a>
              </li>
              <li>
                <a href="/faq" className="text-accent hover:underline">Frequently Asked Questions</a>
              </li>
            </ul>
          </section>

          <div className="mt-10 text-center">
            <Button variant="accent" size="lg" asChild>
              <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
                Join LS Diet
              </a>
            </Button>
          </div>
        </article>
      </div>

      <FooterSimple />
    </div>
  );
}
