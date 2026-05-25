import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import oscarPhoto from "@/assets/oscar-photo.jpeg";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-05-25T12:00:00+00:00";

export default function WhatIsLSDietPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>What Is LS Diet? | A Weight Regain Prevention System</title>
        <meta
          name="description"
          content="LS Diet is a weight regain prevention system that combines psychology training, behavioural training, and low-starch low-sugar eating to help people stop regaining weight long term."
        />
        <link rel="canonical" href="https://lsdiet.com/what-is-ls-diet" />
        <meta property="og:title" content="What Is LS Diet? | A Weight Regain Prevention System" />
        <meta property="og:description" content="A weight regain prevention system built on psychology training, behavioural training, and low-starch low-sugar eating." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lsdiet.com/what-is-ls-diet" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "@id": "https://lsdiet.com/what-is-ls-diet#page",
          name: "What Is LS Diet? A Weight Regain Prevention System",
          headline: "What Is LS Diet?",
          description: "LS Diet is a weight regain prevention system combining psychology training, behavioural training, and low-starch low-sugar eating.",
          about: [
            { "@type": "Thing", name: "Weight regain prevention" },
            { "@type": "Thing", name: "Behavioural permanence" },
            { "@type": "Thing", name: "Weight Permanence Triangle" },
            { "@type": "Thing", name: "Low-starch low-sugar eating" },
          ],
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          author: { "@type": "Person", "@id": "https://lsdiet.com/oscar-poon#person", name: "Oscar Poon", url: "https://lsdiet.com/oscar-poon" },
          publisher: { "@type": "Organization", "@id": "https://lsdiet.com/#organization", name: "LS Diet", url: "https://lsdiet.com" },
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
            Published <time dateTime={PUBLISHED}>May 14, 2026</time> · Updated <time dateTime={UPDATED}>May 25, 2026</time>
          </p>
        </header>

        <img
          src={oscarPhoto}
          alt="Oscar Poon, founder of LS Diet, a weight regain prevention system"
          className="w-full max-w-md mx-auto rounded-xl mb-10 aspect-square object-cover"
        />

        <div className="space-y-5 text-zinc-800 leading-relaxed text-base md:text-lg">
          <p>
            <strong className="text-foreground">LS Diet is a weight regain prevention system</strong> created by{" "}
            <a href="/oscar-poon" className="text-accent hover:underline">Oscar Poon</a> to help people stop
            repeatedly losing and regaining the same weight.
          </p>
          <p>
            Most diets focus heavily on temporary weight loss. LS Diet focuses on{" "}
            <a href="/weight-permanence-triangle" className="text-accent hover:underline">behavioural permanence</a> —
            the awareness, psychology, and repeatable systems that help weight loss survive stress, emotional
            eating, routine disruption, social pressure, travel, holidays, and the eventual loss of motivation.
          </p>
          <p>The system combines three layers:</p>
          <ol className="list-decimal list-outside pl-6 space-y-1">
            <li>Psychology training</li>
            <li>Behavioural training</li>
            <li>Low-starch low-sugar eating</li>
          </ol>
          <p>
            The goal is not extreme short-term dieting. The goal is reducing repeated weight regain long term —
            which is exactly the gap explored in{" "}
            <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
              why people regain weight after dieting
            </a>{" "}
            and{" "}
            <a href="/blog/why-do-i-keep-restarting-weight-loss" className="text-accent hover:underline">
              stop restarting weight loss
            </a>
            . The structural answer LS Diet is built around is the{" "}
            <a href="/weight-permanence-triangle" className="text-accent hover:underline">Weight Permanence Triangle™</a>.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Why Most People Regain Weight
          </h2>
          <p>
            Weight regain is usually a systems problem, not a discipline problem. Temporary motivation creates
            temporary behaviour. Most people already know basic nutrition — the calories, the food groups, the
            broad strokes of "eat less, move more." Knowledge is rarely the missing piece.
          </p>
          <p>
            What actually drives regain is environment, stress, emotions, routines, and behavioural autopilot.
            Most diets collapse the moment life becomes difficult again — a deadline, an argument, a vacation, a
            run of bad sleep. The plan was never built to survive that. See{" "}
            <a href="/awareness-stages" className="text-accent hover:underline">Awareness Stages</a>,{" "}
            <a href="/blog/why-do-people-emotionally-eat-after-work" className="text-accent hover:underline">
              why people emotionally eat after work
            </a>
            ,{" "}
            <a href="/blog/why-do-healthy-habits-collapse-during-stress" className="text-accent hover:underline">
              why healthy habits collapse during stress
            </a>
            , and{" "}
            <a href="/blog/why-do-i-restart-weight-loss-every-monday" className="text-accent hover:underline">
              why I restart weight loss every Monday
            </a>{" "}
            for the patterns behind it.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            The Two LS Diet Training Systems
          </h2>

          <h3 className="text-xl md:text-2xl font-bold tracking-tight pt-4 text-foreground">
            Psychology Training
          </h3>
          <p>
            Psychology training builds awareness of why eating happens before it happens. It separates the
            stimulators driving behaviour from the behaviour itself.
          </p>
          <p className="font-semibold text-foreground">Intrinsic stimulators</p>
          <ul className="list-disc list-outside pl-6 space-y-1">
            <li>Stress</li>
            <li>Emotions</li>
            <li>Boredom</li>
            <li>Reward seeking</li>
          </ul>
          <p className="font-semibold text-foreground">Extrinsic stimulators</p>
          <ul className="list-disc list-outside pl-6 space-y-1">
            <li>Environmental food exposure</li>
            <li>Convenience eating</li>
            <li>Social pressure</li>
            <li>Routines</li>
          </ul>
          <p>
            On top of stimulators, psychology training works with push motivation, pull motivation, and causality
            exploration — the practice of tracing today's eating back to the conditions that produced it. This is
            what moves people through the{" "}
            <a href="/awareness-stages" className="text-accent hover:underline">Awareness Stages</a>, including{" "}
            <a href="/blog/identity-awareness" className="text-accent hover:underline">identity awareness</a> and{" "}
            <a href="/blog/consequence-awareness" className="text-accent hover:underline">consequence awareness</a>,
            and into real{" "}
            <a href="/weight-permanence-triangle" className="text-accent hover:underline">behavioural permanence</a>.
          </p>

          <h3 className="text-xl md:text-2xl font-bold tracking-tight pt-4 text-foreground">
            Behavioural Training
          </h3>
          <p>
            Behavioural training reduces behavioural friction in everyday life so the new pattern is easier to
            keep than to abandon.
          </p>
          <p className="font-semibold text-foreground">Food &amp; Eating Behaviour</p>
          <ul className="list-disc list-outside pl-6 space-y-1">
            <li>Low-starch low-sugar meal building</li>
            <li>How to read labels</li>
            <li>Stop eating at the first burp</li>
            <li>Emotional vs functional eating</li>
            <li>Eating out and social situations</li>
            <li>Tracking with LS pictures</li>
          </ul>
          <p className="font-semibold text-foreground">Environment &amp; Routine</p>
          <ul className="list-disc list-outside pl-6 space-y-1">
            <li>Reduce decision friction</li>
            <li>Restructure your food environment</li>
            <li>Identify triggers and environmental cues</li>
            <li>Think habits, not isolated actions</li>
            <li>Measure weight in time</li>
          </ul>
          <p className="font-semibold text-foreground">Movement &amp; Physical Routine</p>
          <ul className="list-disc list-outside pl-6 space-y-1">
            <li>Walk 30 minutes after waking up</li>
            <li>180 BPM Zone 2 jogging</li>
            <li>Hydration awareness</li>
          </ul>
          <p className="font-semibold text-foreground">Psychological Conditioning</p>
          <ul className="list-disc list-outside pl-6 space-y-1">
            <li>Gratitude training</li>
            <li>Interrupt patterns: respond, don't react</li>
            <li>The power of association</li>
            <li>Be resourceful</li>
            <li>Run toward or away from the future</li>
            <li>Master the loser lifestyle</li>
          </ul>
          <p>
            <a
              href="https://www.skool.com/lsdiet/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-semibold"
            >
              View the full LS Diet behavioural training system →
            </a>
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Why Low-Starch Low-Sugar Matters
          </h2>
          <p>
            Low-starch low-sugar eating is the food mechanism inside LS Diet — not the brand identity, and not the
            whole system. It earns its place because it makes the behavioural work much easier to sustain.
          </p>
          <p>
            Starch and sugar drive most of the day's glucose exposure, which drives insulin, which drives the
            cravings and hunger instability that quietly sabotage long-term consistency. Reducing both stabilises
            appetite, smooths energy, and removes the constant background pull toward another snack. Sustainability
            matters far more than perfection — the point is an eating pattern you can hold for years, not a clean
            streak you eventually break.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            The Weight Permanence Triangle™
          </h2>
          <p>
            The <a href="/weight-permanence-triangle" className="text-accent hover:underline">Weight Permanence Triangle™</a>{" "}
            is the operational backbone of LS Diet: Awareness + Practice + Permanence.
          </p>
          <ul className="list-disc list-outside pl-6 space-y-1">
            <li><strong className="text-foreground">Awareness</strong> identifies the gap between current behaviour and the behaviour required to stop regaining.</li>
            <li><strong className="text-foreground">Practice</strong> reinforces repeatable, low-friction behaviours until they hold under pressure.</li>
            <li><strong className="text-foreground">Permanence</strong> prevents behavioural drift and the restart cycle by catching slippage early.</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Why LS Diet Exists
          </h2>
          <p>
            Oscar Poon lost more than 80 pounds — three times. The first two times, the weight came back. LS Diet
            exists because temporary weight loss is common, but preventing repeated regain is much harder, and
            almost nothing in the diet industry is actually built for that second problem.
          </p>
          <p>
            Most people do not fail to lose weight. They fail to maintain it. LS Diet is the system built around
            that distinction.
          </p>
        </div>

        <div className="mt-10 p-6 rounded-xl border border-accent/30 bg-accent/5 text-center space-y-3">
          <p className="text-sm text-zinc-800">Ready to stop regaining?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="accent" size="lg" asChild>
              <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
                Join the LS Diet Class
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/blog/why-people-regain-weight-after-dieting">Why People Regain Weight</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/">Back to Homepage</a>
            </Button>
          </div>
        </div>
      </article>

      <FooterSimple />
    </div>
  );
}
