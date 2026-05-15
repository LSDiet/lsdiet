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

export default function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "missing" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetchBlogPost(slug)
      .then((p) => {
        if (cancelled) return;
        if (!p) {
          setStatus("missing");
        } else {
          setPost(p);
          setStatus("ok");
        }
      })
      .catch(() => !cancelled && setStatus("error"));
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

  if (status === "missing" || status === "error" || !post) {
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

  const url = `https://lsdiet.com/blog/${post.slug}`;
  const description = post.excerpt || `${post.title} — by Oscar Poon on the LS Diet blog.`;
  const image = post.featuredImage?.url ?? "https://lsdiet.com/og-image.jpg";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    image,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishDate,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: "Oscar Poon", url: "https://lsdiet.com/about-oscar-poon" },
    publisher: {
      "@type": "Organization",
      name: "LS Diet",
      url: "https://lsdiet.com",
      logo: { "@type": "ImageObject", url: "https://lsdiet.com/favicon.ico" },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | LS Diet</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        {image && <meta property="og:image" content={image} />}
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="article:author" content="Oscar Poon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        {image && <meta name="twitter:image" content={image} />}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <Navbar />
      <PageBreadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <article className="container max-w-3xl mx-auto px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-900">
            {post.title}
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-wider">
            <time dateTime={post.publishDate}>{formatPublishDate(post.publishDate)}</time>
            {" · "}By Oscar Poon
          </p>
        </header>

        {post.featuredImage?.url && (
          <figure className="mb-10 -mx-4 md:mx-0">
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.title || post.title}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full md:rounded-xl"
            />
          </figure>
        )}

        <div className="prose-content">
          <RichText document={post.content} />
        </div>

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
              JOIN LS DIET (FREE)
            </a>
          </Button>
        </div>
      </article>

      <FooterSimple />
    </div>
  );
}
