import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";

const PUBLISHED = "2026-05-14";
const UPDATED = "2026-05-14";

const upcoming = [
  "The low-starch grocery list — what to actually buy",
  "How to read a nutrition label through an LS lens",
  "Awareness journaling: the 10-minute weekly check-in",
  "Travelling without restarting: airports, hotels, family events",
  "Why GLP-1 alone doesn't fix weight regain",
  "Building a permanence anchor that survives a stressful quarter",
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>LS Diet Blog | Long-Form Notes on Permanent Weight Loss</title>
        <meta
          name="description"
          content="The LS Diet blog publishes long-form notes on the low-starch low-sugar lifestyle, awareness work, and behavioural permanence — written by Oscar Poon."
        />
        <link rel="canonical" href="https://lsdiet.com/blog" />
        <meta property="og:title" content="LS Diet Blog" />
        <meta property="og:description" content="Long-form notes on permanent weight loss, by Oscar Poon." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lsdiet.com/blog" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "LS Diet Blog",
          url: "https://lsdiet.com/blog",
          description: "Long-form notes on the low-starch, low-sugar lifestyle and the Weight Permanence Triangle™.",
          author: { "@type": "Person", name: "Oscar Poon", url: "https://lsdiet.com/about-oscar-poon" },
          publisher: { "@type": "Organization", name: "LS Diet", url: "https://lsdiet.com" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
        })}</script>
      </Helmet>
      <Navbar />
      <PageBreadcrumb items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]} />

      <article className="container max-w-3xl mx-auto px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-3">
            LS Diet <span className="text-accent">Blog</span>
          </h1>
          <p className="text-xs text-[hsl(0_0%_55%)] uppercase tracking-wider">
            Published <time dateTime={PUBLISHED}>May 14, 2026</time> · Updated <time dateTime={UPDATED}>May 14, 2026</time>
          </p>
        </header>

        <div className="space-y-5 text-[hsl(0_0%_85%)] leading-relaxed text-base md:text-lg">
          <p>
            The LS Diet blog is the long-form arm of the project. The homepage tells the story; the framework pages
            ({" "}
            <a href="/weight-permanence-triangle" className="text-accent hover:underline">Weight Permanence Triangle™</a>,{" "}
            <a href="/awareness-stages" className="text-accent hover:underline">5 Awareness Stages</a>) explain the
            method; the blog goes one level deeper into the day-to-day mechanics of living it.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-4 text-foreground">
            What You'll Find Here
          </h2>
          <p>
            Practical posts on low-starch, low-sugar eating in real life — groceries, recipes, restaurants, travel,
            social events. Awareness deep-dives that expand individual stages into worked examples. Permanence
            essays on building anchors and alert systems that survive bad weeks. And founder notes from{" "}
            <a href="/about-oscar-poon" className="text-accent hover:underline">Oscar Poon</a> on what's working and
            what's changing inside the method.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-4 text-foreground">
            Coming Topics
          </h2>
          <ul className="space-y-2 list-disc list-inside pl-2">
            {upcoming.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p>
            New posts publish irregularly but consistently. The fastest way to be notified is to join the free 7-day
            LS Diet course — community announcements include new blog drops.
          </p>
        </div>

        <div className="mt-10 p-6 rounded-xl border border-accent/30 bg-accent/5 text-center">
          <p className="text-sm text-[hsl(0_0%_80%)] mb-4">Get notified when new posts go live.</p>
          <Button variant="accent" size="lg" asChild>
            <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
              Join the FREE 7-Day LS Diet Course →
            </a>
          </Button>
        </div>
      </article>

      <FooterSimple />
    </div>
  );
}
