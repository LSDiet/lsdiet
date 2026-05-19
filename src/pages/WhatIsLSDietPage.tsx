import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import oscarPhoto from "@/assets/oscar-photo.jpeg";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-05-14T12:00:00+00:00";

export default function WhatIsLSDietPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>What Is LS Diet? | Low-Starch, Low-Sugar Lifestyle System</title>
        <meta
          name="description"
          content="LS Diet is a low-starch, low-sugar lifestyle system by Oscar Poon. Learn how it differs from conventional diets and why it stops the weight-regain cycle."
        />
        <link rel="canonical" href="https://lsdiet.com/what-is-ls-diet" />
        <meta property="og:title" content="What Is LS Diet?" />
        <meta property="og:description" content="A low-starch, low-sugar lifestyle system designed for behavioural permanence." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lsdiet.com/what-is-ls-diet" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What Is LS Diet?",
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          author: { "@type": "Person", name: "Oscar Poon", url: "https://lsdiet.com/oscar-poon" },
          publisher: { "@type": "Organization", name: "LS Diet", url: "https://lsdiet.com" },
          mainEntityOfPage: "https://lsdiet.com/what-is-ls-diet",
        })}</script>
      </Helmet>
      <Navbar />
      <PageBreadcrumb items={[{ name: "Home", url: "/" }, { name: "What Is LS Diet?", url: "/what-is-ls-diet" }]} />

      <article className="container max-w-3xl mx-auto px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-3">
            What Is <span className="text-accent">LS Diet?</span>
          </h1>
          <p className="text-xs text-zinc-600 uppercase tracking-wider">
            Published <time dateTime={PUBLISHED}>May 14, 2026</time> · Updated <time dateTime={UPDATED}>May 14, 2026</time>
          </p>
        </header>

        <img
          src={oscarPhoto}
          alt="Oscar Poon, founder of LS Diet, the low-starch, low-sugar lifestyle system"
          className="w-full max-w-md mx-auto rounded-xl mb-10 aspect-square object-cover"
        />

        <div className="space-y-5 text-zinc-800 leading-relaxed text-base md:text-lg">
          <p>
            <strong className="text-foreground">LS Diet</strong> is a low-starch, low-sugar lifestyle system created by{" "}
            <a href="/oscar-poon" className="text-accent hover:underline">Oscar Poon</a> to end the cycle of losing
            weight and regaining it. It is not a meal plan, not a calorie target, and not another willpower test.
            It is a framework that combines a simple food rule — keep refined starch and added sugar low — with a
            behavioural method that keeps the new habits intact when life inevitably gets in the way.
          </p>
          <p>
            The core insight is that weight regain is a structural problem, not a discipline problem. People who
            "fail" at weight loss almost always succeed in the short term; the failure is in the system that should
            have protected the new behaviour. LS Diet is built around that gap. The food framework lets you eat
            until full while keeping insulin and cravings down, and the behavioural framework — the{" "}
            <a href="/weight-permanence-triangle" className="text-accent hover:underline">Weight Permanence Triangle™</a>
            {" "}— keeps you consistent across stress, travel, holidays, illness, and the everyday disruptions that
            normally trigger a restart.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            How LS Diet Differs from Conventional Diets
          </h2>
          <p>
            Most modern diets focus on a single lever. Calorie counting reduces intake but ignores the food quality
            that drives hunger. Intermittent fasting compresses the eating window but does little to change what
            ends up on the plate. Macro tracking builds awareness but quickly turns eating into a spreadsheet.
            GLP-1 medications suppress appetite biologically, but the behaviours that produced the original weight
            usually return the moment the medication stops.
          </p>
          <p>
            LS Diet treats food as one of three layers, not the whole answer. Low-starch, low-sugar eating handles
            the biology — fewer insulin spikes, fewer cravings, more satiation. Awareness handles the psychology —
            why you eat, when you eat, and what triggers the eating you regret. Permanence handles the
            environment — the systems that protect the new behaviour when motivation runs out. Skip any one layer
            and the diet eventually collapses.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            The Three Pillars Behind LS Diet
          </h2>
          <p>
            The behavioural backbone of LS Diet is the Weight Permanence Triangle™: Awareness creates urgency and
            clarity; Practice translates clarity into daily low-starch, low-sugar choices that fit your culture and
            social life; Permanence builds the internal alert system that catches drift before it becomes a full
            restart. Together they convert weight loss from an event into an identity.
          </p>
          <p>
            If you've lost the same weight twice (or three times, like Oscar) and you're tired of starting over,
            LS Diet was built for exactly that pattern. Start with the homepage overview, then dive deeper into
            the framework and the founder behind it.
          </p>
        </div>

        <div className="mt-10 p-6 rounded-xl border border-accent/30 bg-accent/5 text-center">
          <p className="text-sm text-zinc-800 mb-4">Ready to stop regaining?</p>
          <Button variant="accent" size="lg" asChild>
            <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
              Join LS Diet
            </a>
          </Button>
        </div>
      </article>

      <FooterSimple />
    </div>
  );
}
