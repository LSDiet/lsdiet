import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-05-14T12:00:00+00:00";
const CANONICAL = "https://lsdiet.com/awareness-stages";
const WPT_TERMSET_ID = `${CANONICAL}#weight-permanence-training`;

const stages = [
  {
    name: "Reality Awareness",
    slug: "reality-awareness",
    body: "Reality Awareness is the first stage of the Weight Permanence Training. It is the practice of establishing an honest, undefended baseline of your current physical state, eating patterns, and daily behaviours. Most people in a weight regain cycle avoid this stage because accurate self-assessment is uncomfortable. Reality Awareness does not require perfection. It requires honesty about where you actually are, not where you wish you were or where you used to be.",
  },
  {
    name: "Friction Awareness",
    slug: "friction-awareness",
    body: "Friction Awareness is the second stage of the Weight Permanence Training. It maps the gap between your current reality and your intended direction. Friction is not failure. It is the measurable distance between who you are behaving as today and who you need to become to stop the regain cycle permanently. Naming that gap precisely is what makes the next stages possible.",
  },
  {
    name: "Pattern Awareness",
    slug: "pattern-awareness",
    body: "Pattern Awareness is the third stage of the Weight Permanence Training. It identifies the specific conditions under which your weight regain behaviour occurs, using six lenses: who you are with, when it happens, where you are, what triggers it, why it feels justified in the moment, and how it unfolds. Pattern Awareness is the diagnostic stage. Without it, behaviour change targets the wrong problem.",
  },
  {
    name: "Consequence Awareness",
    slug: "consequence-awareness",
    body: "Consequence Awareness is the fourth stage of the Weight Permanence Training and the foundation of PUSH motivation. PUSH motivation is an emotionally connected reason that moves you away from a future outcome, consequence, or version of yourself that you are no longer willing to tolerate. Consequence Awareness makes the cost of regain feel real and personal rather than abstract and distant. It is what gives urgency to change.",
  },
  {
    name: "Identity Awareness",
    slug: "identity-awareness",
    body: "Identity Awareness is the fifth stage of the Weight Permanence Training and the foundation of PULL motivation. PULL motivation is an emotionally connected reason that draws you toward a future identity, outcome, or version of yourself that you genuinely want to create. Identity Awareness shifts the question from \"how do I lose weight\" to \"who am I becoming.\" When your future identity is specific and emotionally real, weight permanence stops being an act of discipline and becomes an expression of who you already are.",
  },
];

const DEFINED_TERM_SET_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": WPT_TERMSET_ID,
  name: "Weight Permanence Training",
  alternateName: "WPT",
  url: CANONICAL,
  inDefinedTermSet: CANONICAL,
  creator: { "@id": "https://lsdiet.com/oscar-poon#person" },
  hasDefinedTerm: stages.map((s) => ({
    "@type": "DefinedTerm",
    "@id": `https://lsdiet.com/blog/${s.slug}#term`,
    name: s.name,
    description: s.body,
    url: `https://lsdiet.com/blog/${s.slug}`,
    inDefinedTermSet: WPT_TERMSET_ID,
  })),
};


export default function AwarenessStagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>The 5 Awareness Stages | LS Diet</title>
        <meta
          name="description"
          content="Inside LS Diet, Awareness moves through five stages: Reality, Friction, Pattern, Consequence, and Identity. Together they produce push and pull motivation."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="The 5 Awareness Stages" />
        <meta property="og:description" content="The first vertex of the Weight Permanence Training™, in five stages." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The 5 Awareness Stages",
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          author: { "@type": "Person", "@id": "https://lsdiet.com/oscar-poon#person", name: "Oscar Poon", url: "https://lsdiet.com/oscar-poon" },
          publisher: { "@type": "Organization", name: "LS Diet", url: "https://lsdiet.com" },
          mainEntityOfPage: CANONICAL,
          about: { "@id": WPT_TERMSET_ID },
        })}</script>
        <script type="application/ld+json">{JSON.stringify(DEFINED_TERM_SET_LD)}</script>
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
            <a href="/weight-permanence-triangle" className="text-accent hover:underline">Weight Permanence Training™</a>
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
                <h3 className="text-xl font-bold text-foreground">
                  {i + 1}.{" "}
                  <a href={`/blog/${s.slug}`} className="text-accent hover:underline">
                    {s.name}
                  </a>
                </h3>
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
              START YOUR FREE TRAINING TODAY
            </a>
          </Button>
        </div>
      </article>

      <FooterSimple />
    </div>
  );
}
