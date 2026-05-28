import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-05-14T12:00:00+00:00";

const stages = [
  {
    name: "Reality Awareness",
    body: "Reality Awareness is the honest baseline: weight, habits, energy, the shape of an average week. Most weight loss attempts skip this and start with a goal weight, which is why the gap between today and the goal feels overwhelming. Reality Awareness names where you actually stand without flinching.",
  },
  {
    name: "Friction Awareness",
    body: "Friction Awareness surfaces the daily resistance points — the meeting that always ends in takeout, the late-night fridge visit, the social setting that quietly derails you. These aren't moral failings; they're predictable patterns. Naming them is the first step to redesigning around them.",
  },
  {
    name: "Pattern Awareness",
    body: "Pattern Awareness examines the how, who, what, when, and why of your eating. It looks for the loops you repeat without thinking — the people you eat differently around, the times of day you reach for sugar, the emotional states that precede a binge. Patterns become predictable; predictable becomes solvable.",
  },
  {
    name: "Consequence Awareness",
    body: "Consequence Awareness is the root of push motivation. It is the clear-eyed look at what staying the same will cost you over five, ten, twenty years — physically, socially, financially, emotionally. Push motivation is uncomfortable on purpose. It is also the most reliable fuel when discipline runs out.",
  },
  {
    name: "Identity Awareness",
    body: "Identity Awareness is the root of pull motivation. It defines the person for whom LS Diet is simply how they live — the version of you who doesn't have to fight cravings because the lifestyle is already who they are. Pull motivation feels lighter than push, but you usually need both.",
  },
];

export default function AwarenessStagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>The 5 Awareness Stages | LS Diet</title>
        <meta
          name="description"
          content="Inside LS Diet, Awareness moves through five stages: Reality, Friction, Pattern, Consequence, and Identity. Together they produce push and pull motivation."
        />
        <link rel="canonical" href="https://lsdiet.com/awareness-stages" />
        <meta property="og:title" content="The 5 Awareness Stages" />
        <meta property="og:description" content="The first vertex of the Weight Permanence Triangle™, in five stages." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lsdiet.com/awareness-stages" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The 5 Awareness Stages",
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          author: { "@type": "Person", name: "Oscar Poon", url: "https://lsdiet.com/oscar-poon" },
          publisher: { "@type": "Organization", name: "LS Diet", url: "https://lsdiet.com" },
          mainEntityOfPage: "https://lsdiet.com/awareness-stages",
        })}</script>
      </Helmet>
      <Navbar />
      <PageBreadcrumb items={[{ name: "Home", url: "/" }, { name: "5 Awareness Stages", url: "/awareness-stages" }]} />

      <article className="container max-w-3xl mx-auto px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-3">
            The 5 <span className="text-accent">Awareness Stages</span>
          </h1>
          <p className="text-xs text-zinc-600 uppercase tracking-wider">
            Published <time dateTime={PUBLISHED}>May 14, 2026</time> · Updated <time dateTime={UPDATED}>May 14, 2026</time>
          </p>
        </header>

        <div className="space-y-5 text-zinc-800 leading-relaxed text-base md:text-lg">
          <p>
            Awareness is the first vertex of the{" "}
            <a href="/weight-permanence-triangle" className="text-accent hover:underline">Weight Permanence Triangle™</a>
            {" "}inside LS Diet, and it is rarely the part people skip on purpose — it is the part most diets simply
            never include. Without awareness, even the best food framework eventually collapses under stress because
            the underlying motivation is borrowed rather than internal.
          </p>
          <p>
            LS Diet treats Awareness as a sequence, not a single insight. You move through five distinct stages, and
            each one unlocks the next. By the end, the low-starch, low-sugar lifestyle stops feeling like a rule and
            starts feeling like a natural expression of who you've decided to be — which is what breaks the{" "}
            <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
              weight regain cycle
            </a>{" "}
            most diets leave untouched.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Push Motivation vs Pull Motivation
          </h2>
          <p>
            The five stages produce two kinds of motivation that work together. Push motivation comes from
            consequence — the clarity of what continuing as you are will cost you. Pull motivation comes from
            identity — the person you're becoming and the life that person already lives. Push gets you started on
            the hardest days; pull keeps you going on the easy ones. Most weight-loss attempts try to run on one
            and burn out fast.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Walking Through the Five Stages
          </h2>
          <div className="space-y-5">
            {stages.map((s, i) => (
              <div key={s.name}>
                <h3 className="text-xl font-bold text-foreground">{i + 1}. {s.name}</h3>
                <p className="mt-1">{s.body}</p>
              </div>
            ))}
          </div>

          <p className="pt-4">
            Awareness is the entry point, but it doesn't replace the rest of the Triangle. Once the five stages have
            done their work, you still need Practice and Permanence to translate clarity into daily behaviour and
            to protect that behaviour when life gets hard. Read more about the founder's path on the{" "}
            <a href="/oscar-poon" className="text-accent hover:underline">About Oscar Poon</a> page.
          </p>
        </div>

        <div className="mt-10 p-6 rounded-xl border border-accent/30 bg-accent/5 text-center">
          <p className="text-sm text-zinc-800 mb-4">Ready to apply Awareness in real life?</p>
          <Button variant="accent" size="lg" asChild>
            <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
              Join LS Diet Community
            </a>
          </Button>
        </div>
      </article>

      <FooterSimple />
    </div>
  );
}
