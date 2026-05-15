import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import heroPhoto from "@/assets/hero-photo.png";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-05-14T12:00:00+00:00";

export default function WeightPermanenceTrianglePage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>The Weight Permanence Triangle™ | LS Diet Framework</title>
        <meta
          name="description"
          content="The Weight Permanence Triangle™ is the three-pillar behavioural framework — Awareness, Practice, Permanence — at the heart of LS Diet."
        />
        <link rel="canonical" href="https://lsdiet.com/weight-permanence-triangle" />
        <meta property="og:title" content="The Weight Permanence Triangle™" />
        <meta property="og:description" content="Awareness, Practice, Permanence — the LS Diet framework that ends the restart cycle." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lsdiet.com/weight-permanence-triangle" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The Weight Permanence Triangle™",
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          author: { "@type": "Person", name: "Oscar Poon", url: "https://lsdiet.com/about-oscar-poon" },
          publisher: { "@type": "Organization", name: "LS Diet", url: "https://lsdiet.com" },
          mainEntityOfPage: "https://lsdiet.com/weight-permanence-triangle",
        })}</script>
      </Helmet>
      <Navbar />
      <PageBreadcrumb items={[{ name: "Home", url: "/" }, { name: "Weight Permanence Triangle™", url: "/weight-permanence-triangle" }]} />

      <article className="container max-w-3xl mx-auto px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-3">
            The Weight Permanence <span className="text-accent">Triangle™</span>
          </h1>
          <p className="text-xs text-zinc-600 uppercase tracking-wider">
            Published <time dateTime={PUBLISHED}>May 14, 2026</time> · Updated <time dateTime={UPDATED}>May 14, 2026</time>
          </p>
        </header>

        <img
          src={heroPhoto}
          alt="Oscar Poon demonstrating the Weight Permanence Triangle™ method behind LS Diet"
          className="w-full rounded-xl mb-10 object-cover max-h-[420px]"
        />

        <div className="space-y-5 text-zinc-800 leading-relaxed text-base md:text-lg">
          <p>
            The <strong className="text-foreground">Weight Permanence Triangle™</strong> is the three-pillar
            framework that powers LS Diet. Each pillar — Awareness, Practice, Permanence — solves a problem the
            other two cannot. Awareness creates the why, Practice creates the how, and Permanence creates the
            survival layer that keeps the work intact when life turns hostile. Pulled apart, each pillar fails
            quickly. Combined, they convert weight loss from a temporary outcome into a stable identity.
          </p>
          <p>
            The Triangle was built out of a frustration the founder of LS Diet,{" "}
            <a href="/about-oscar-poon" className="text-accent hover:underline">Oscar Poon</a>, lived three
            separate times: lose 80 lbs, regain it, repeat. Conventional advice handled food but ignored the
            behavioural scaffolding. The Triangle is the scaffolding.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Awareness — The Source of Motivation
          </h2>
          <p>
            Awareness is the first pillar because nothing else holds without it. It is the work of seeing your
            current reality clearly, naming the friction points that derail you, and surfacing the consequence and
            identity tensions that produce real motivation rather than borrowed enthusiasm.
          </p>
          <h3 className="text-xl font-bold text-foreground pt-2">The Five Awareness Stages</h3>
          <p>
            Inside Awareness, LS Diet walks you through five stages: Reality, Friction, Pattern, Consequence, and
            Identity. The last two are particularly important — Consequence Awareness produces push motivation
            (what staying the same will cost you) and Identity Awareness produces pull motivation (the person
            you're becoming). Read the full breakdown on the{" "}
            <a href="/awareness-stages" className="text-accent hover:underline">5 Awareness Stages</a> page.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Practice — Daily Behaviour That Survives Stress
          </h2>
          <p>
            Practice is the food and behaviour layer: adopting a low-starch, low-sugar lifestyle, adapting it to
            your culture and social life, and turning obstacles into opportunities. Most diet content lives here,
            but practice in isolation only lasts as long as motivation does. Inside the Triangle, Practice is the
            visible behaviour that the other two pillars protect.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Permanence — Course Correction Before Restart
          </h2>
          <p>
            Permanence is the system that catches you when you drift. It includes a psychological anchor (a clear
            internal commitment that survives bad weeks), an internal alert system (the noticing that says "I'm
            slipping" before the scale confirms it), and a course-correction protocol that returns you to your LS
            lifestyle without requiring you to start over. Permanence is what makes LS Diet a one-time decision
            rather than an annual restart.
          </p>
        </div>

        <div className="mt-10 p-6 rounded-xl border border-accent/30 bg-accent/5 text-center">
          <p className="text-sm text-zinc-800 mb-4">See the Triangle in action.</p>
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
