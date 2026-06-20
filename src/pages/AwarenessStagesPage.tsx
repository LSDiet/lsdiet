import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { Button } from "@/components/ui/button";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-06-20T12:00:00+00:00";
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
    body: "Identity Awareness is the fifth stage of the Weight Permanence Training and the foundation of PULL motivation. PULL motivation is an emotionally connected reason that draws you toward a future identity, outcome, or version of yourself that you genuinely want to create. Identity Awareness shifts the question from 'how do I lose weight' to 'who am I becoming.' When your future identity is specific and emotionally real, weight permanence stops being an act of discipline and becomes an expression of who you already are.",
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

const stageConfig = [
  {
    num: "?",
    label: "Before we begin",
    title: "Quick question",
    intro: "Not a trick. Just an honest starting point.",
    question: "How many times have you lost weight and regained it?",
    options: [
      { label: "This would be my first time" },
      { label: "Once or twice" },
      { label: "More than I want to count" },
    ],
    reveal: "That's exactly why you're here. Most people who struggle with weight aren't lazy or weak — they've been solving the wrong problem. You've been trying to lose weight. WPT helps you become someone who never has to lose it again.",
    revealType: "neutral",
    nextLabel: "Begin Stage 1: Reality →",
    stageRef: null,
  },
  {
    num: "1",
    label: "Stage 1 of 5 · 14 questions",
    title: "Reality awareness",
    intro: "Before anything else, you need an honest baseline. Not what you think — what's actually true. Most people soften this in their own minds. We're going to be specific.",
    question: "On a scale of 1–10, how accurately do you track what you actually eat each day?",
    isSlider: true,
    sliderMin: 1,
    sliderMax: 10,
    sliderDefault: 7,
    sliderReveals: {
      low: "Most people overestimate this by 2–3 points. Research shows we underreport calorie intake by 30–50% on average. That's not dishonesty — it's how memory works. This stage is about closing that gap.",
      mid: "That's more honest than most. The question isn't whether your tracking is perfect — it's whether you know your patterns well enough to change them. That's what we're building.",
      high: "People who track very precisely often still struggle with weight — because awareness of intake isn't the same as awareness of why you eat. That's what the next stages uncover.",
    },
    revealType: "neutral",
    nextLabel: "Stage 2: Friction →",
    stageRef: "reality-awareness",
  },
  {
    num: "2",
    label: "Stage 2 of 5 · 48 questions",
    title: "Friction awareness",
    intro: "You know what you should do. Something keeps stopping you. This stage names that something — without judgment, without excuses. Just facts.",
    question: "Do you like your current weight?",
    options: [
      {
        label: "No",
        reveal: "That gap between knowing and doing — that's friction. It's not laziness. Something in your current situation makes the healthy choice feel harder than the easy one. This stage names exactly what that is.",
      },
      {
        label: "Somewhat — I've accepted it",
        reveal: "Acceptance is a coping mechanism, not a choice. When you say you've accepted it, you mean you've stopped fighting — because fighting hasn't worked. That's important information. Let's look at why.",
      },
      {
        label: "Yes, I'm happy with it",
        reveal: "Then something else brought you here. Maybe you're here for someone else, or for preventive reasons, or you're just curious. That's okay — motivation that isn't yours rarely lasts, but curiosity is a fine place to start.",
      },
    ],
    revealType: "neutral",
    nextLabel: "Stage 3: Pattern →",
    stageRef: "friction-awareness",
  },
  {
    num: "3",
    label: "Stage 3 of 5 · 83 questions",
    title: "Pattern awareness",
    intro: "Most eating behaviour is automatic — you're on autopilot and don't know it. This stage maps exactly when, where, why, and how you eat. You can't change a pattern you haven't seen clearly.",
    question: "When do you find yourself eating even though you're not hungry?",
    options: [
      {
        label: "When I'm stressed or overwhelmed",
        reveal: "Stress eating is the most common pattern — and the hardest to see, because it feels justified. 'I had a hard day' is real. But the food doesn't fix the stress. It just makes the feeling quieter for a few minutes. That's the loop.",
      },
      {
        label: "When I'm bored",
        reveal: "Boredom eating is usually about stimulation, not hunger. The body knows food equals dopamine. When nothing else is interesting, it reaches for the fastest reward available. Knowing this changes how you respond.",
      },
      {
        label: "In social settings — I eat what's there",
        reveal: "Environmental eating is invisible to most people. You don't decide to eat — the food is just there. This pattern shows up most in people who do well alone but struggle at gatherings.",
      },
      {
        label: "Out of habit — certain times or places",
        reveal: "Habitual eating is the most automatic of all. You eat at 3pm because you always eat at 3pm. No hunger, no emotion — just a trigger and a response. These are the easiest patterns to interrupt once you see them.",
      },
    ],
    revealType: "neutral",
    nextLabel: "Stage 4: Consequence →",
    stageRef: "pattern-awareness",
  },
  {
    num: "4",
    label: "Stage 4 of 5 · 66 questions · PUSH",
    title: "Consequence awareness",
    intro: "This is the stage most people skip — and it's why they go back to old habits. You need to feel what staying the same actually costs you. Not in theory. In your real life, five years from now.",
    question: "If nothing changes, what's the most likely outcome in 5 years?",
    options: [
      {
        label: "More medication, more health problems",
        reveal: "That's not abstract — that's a specific future you can already see coming. This stage makes that future feel as real and immediate as today's craving. When the cost of inaction feels real, the motivation to change stops depending on willpower.",
      },
      {
        label: "Less energy, fewer experiences",
        reveal: "The experiences you're not having right now — that's not a future problem. That's already happening. Every summer, every trip, every activity you quietly opted out of. That's the consequence.",
      },
      {
        label: "Deeper disconnection from who I want to be",
        reveal: "This is the deepest one. You know who you want to be. Every day you live outside that identity, there's a quiet dissonance. That gap is exhausting. And it's optional.",
      },
      {
        label: "Not being there for people I love",
        reveal: "People often change for others before they change for themselves. That's okay — use whatever motivation is real. The goal of this stage is to connect the stakes to real, specific, named people. Abstract consequences don't move us. Personal ones do.",
      },
    ],
    revealType: "push",
    nextLabel: "Stage 5: Identity →",
    stageRef: "consequence-awareness",
  },
  {
    num: "5",
    label: "Stage 5 of 5 · 56 questions · PULL",
    title: "Identity awareness",
    intro: "The person you want to become already has the habits you're trying to build. This stage isn't about goals — it's about who. When your identity changes, the behaviour follows automatically.",
    question: "Complete this sentence: \"The version of me I most want to become is someone who...\"",
    options: [
      {
        label: "Shows up with energy every single day",
        reveal: "That person doesn't drag themselves out of bed thinking about motivation. They sleep well, move regularly, and eat in a way that sustains their energy. That's not discipline — that's identity. When you decide you're that person, the choices that support it start feeling obvious.",
      },
      {
        label: "Is in control of food — not controlled by it",
        reveal: "Food controlled by you, not the other way around. When you identify as that person — the craving shows up and you respond, rather than react. That shift is the entire game.",
      },
      {
        label: "Feels proud when they look in the mirror",
        reveal: "That feeling isn't vanity — it's alignment. It means your outside matches your inside. The person you see reflects the choices you've been making. That's what Weight Permanence feels like.",
      },
      {
        label: "Sets the example for the people they love",
        reveal: "This is one of the most powerful and most sustainable motivators that exists — because it's not about you anymore. It's about what your habits are teaching the people watching you.",
      },
    ],
    revealType: "pull",
    nextLabel: "See your results →",
    stageRef: "identity-awareness",
  },
];

const revealBg: Record<string, string> = {
  neutral: "bg-zinc-900/5 border border-zinc-200 text-zinc-700",
  push: "bg-red-50 border border-red-200 text-red-800",
  pull: "bg-emerald-50 border border-emerald-200 text-emerald-800",
};

export default function AwarenessStagesPage() {
  const [unlocked, setUnlocked] = useState(0);
  const [selections, setSelections] = useState<Record<number, number | null>>({});
  const [sliderVal, setSliderVal] = useState(7);
  const [showCta, setShowCta] = useState(false);
  const navigate = useNavigate();

  // Assign profile based on Stage 3 (pattern) + Stage 0 (regain count)
  const getProfile = (sels: Record<number, number | null>): string => {
    const stage3 = sels[3]; // 0=stressed, 1=bored, 2=social, 3=habit
    const stage0 = sels[0]; // 0=first time, 1=once or twice, 2=more than I want to count
    if (stage3 === 0) return "stress-eater";
    if (stage3 === 1) return "overwhelmed-beginner";
    if (stage3 === 2) return "motivation-chaser";
    // habit: tiebreak on regain count
    if (stage0 === 1) return "weight-cycler";
    if (stage0 === 2) return "restarter";
    return "overwhelmed-beginner"; // fallback (first time + habit)
  };

  const handleOption = (stageIdx: number, optIdx: number) => {
    setSelections((prev) => ({ ...prev, [stageIdx]: optIdx }));
  };

  const handleNext = (stageIdx: number) => {
    const next = stageIdx + 1;
    if (next > 5) {
      const profile = getProfile(selections);
      navigate(`/weight-regain-profile/${profile}`);
    } else {
      setUnlocked(next);
      setTimeout(() => {
        const el = document.getElementById(`stage-${next}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const sliderReveal = (val: number) => {
    const cfg = stageConfig[1];
    if (!cfg.sliderReveals) return "";
    if (val <= 4) return cfg.sliderReveals.low;
    if (val <= 7) return cfg.sliderReveals.mid;
    return cfg.sliderReveals.high;
  };

  const isStageAnswered = (stageIdx: number) => {
    if (stageIdx === 1) return sliderVal !== null;
    return selections[stageIdx] !== undefined && selections[stageIdx] !== null;
  };

  const progressPct = Math.round((unlocked / 5) * 100);

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

      <main className="container max-w-2xl mx-auto px-4 pt-28 pb-24">

        {/* Hero */}
        <header className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-3">
            Weight Permanence Training™
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-normal text-primary leading-tight mb-4">
            You don't have a willpower problem.<br />You have an identity problem.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Every diet you've tried worked. The problem is you couldn't live inside it forever.
            Let's find out why — in 5 steps.
          </p>
        </header>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-2 mb-3 flex-wrap">
            {["Start", "Reality", "Friction", "Pattern", "Consequence", "Identity"].map((label, i) => (
              <span
                key={i}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  i <= unlocked
                    ? "bg-foreground text-background border-foreground"
                    : "text-muted-foreground border-border"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="h-[3px] bg-border rounded-full">
            <div
              className="h-full bg-foreground rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Stage cards */}
        <div className="space-y-4">
          {stageConfig.map((cfg, i) => {
            const locked = i > unlocked;
            const answered = isStageAnswered(i);
            const selectedOpt = selections[i] ?? null;

            return (
              <div
                key={i}
                id={`stage-${i}`}
                style={{ scrollMarginTop: "100px" }}
                className={`rounded-xl border bg-card p-6 transition-all duration-300 ${
                  locked ? "opacity-30 pointer-events-none select-none" : "border-border"
                }`}
              >
                {/* Stage header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                    i === 0 ? "bg-zinc-100 text-zinc-500" :
                    i === 1 ? "bg-blue-50 text-blue-700" :
                    i === 2 ? "bg-amber-50 text-amber-700" :
                    i === 3 ? "bg-green-50 text-green-700" :
                    i === 4 ? "bg-red-50 text-red-700" :
                    "bg-emerald-50 text-emerald-700"
                  }`}>
                    {cfg.num}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{cfg.label}</p>
                    <p className="text-base font-semibold text-foreground capitalize">{cfg.title}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cfg.intro}</p>

                {/* Question */}
                <div className="bg-muted/40 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-foreground mb-3">{cfg.question}</p>

                  {cfg.isSlider ? (
                    <div>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={cfg.sliderMin}
                          max={cfg.sliderMax}
                          value={sliderVal}
                          onChange={(e) => setSliderVal(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-base font-semibold w-6 text-center">{sliderVal}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>Not at all</span><span>Perfectly</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {cfg.options?.map((opt, oi) => (
                        <button
                          key={oi}
                          onClick={() => handleOption(i, oi)}
                          className={`text-left text-sm px-4 py-2.5 rounded-lg border transition-all ${
                            selectedOpt === oi
                              ? "border-foreground bg-background font-medium"
                              : "border-border bg-background hover:bg-muted/50"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reveal */}
                {answered && (
                  <div className={`rounded-lg p-4 text-sm leading-relaxed mb-4 ${revealBg[cfg.revealType]}`}>
                    {cfg.isSlider
                      ? sliderReveal(sliderVal)
                      : selectedOpt !== null && cfg.options
                        ? (cfg.options[selectedOpt] as { label: string; reveal?: string }).reveal ?? cfg.reveal
                        : cfg.reveal}
                  </div>
                )}

                {/* Next button */}
                {answered && (
                  <div className="flex items-center justify-between">
                    {cfg.stageRef && (
                      <a
                        href={`/blog/${cfg.stageRef}`}
                        className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                      >
                        Read full {cfg.title} →
                      </a>
                    )}
                    <button
                      onClick={() => handleNext(i)}
                      className="ml-auto text-sm font-semibold bg-foreground text-background px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {cfg.nextLabel}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        {showCta && (
          <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
              You just did what most people never do
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-normal text-primary mb-4 leading-snug">
              You went through all 5 stages.<br />Now go deeper — for free.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
              The full Weight Permanence Training has 267 questions across these stages, plus 30+ daily
              Practice modules to build the habits that stick. The community is free. No credit card.
            </p>
            <Button variant="accent" size="lg" asChild>
              <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
                Join the free community
              </a>
            </Button>
          </div>
        )}

        {/* SEO content — educational text for crawlers */}
        <section className="mt-16 pt-10 border-t border-border space-y-6 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-lg font-semibold text-foreground">About the 5 Awareness Stages</h2>
          <p>
            The 5 Awareness Stages are the first half of{" "}
            <a href="/weight-permanence-triangle" className="text-accent hover:underline">
              Weight Permanence Training™
            </a>
            . They are designed in a specific chronological order because each stage builds the emotional
            readiness required for the next. You cannot skip to{" "}
            <a href="/blog/identity-awareness" className="text-accent hover:underline">Identity Awareness</a>{" "}
            without first mapping your patterns and consequences — the insights won't land without the foundation
            underneath them.
          </p>
          <div className="space-y-4">
            {stages.map((s, i) => (
              <div key={s.slug}>
                <h3 className="font-semibold text-foreground mb-1">
                  {i + 1}.{" "}
                  <a href={`/blog/${s.slug}`} className="text-accent hover:underline">
                    {s.name}
                  </a>
                </h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <p>
            Once the five stages have done their work, the{" "}
            <a href="/blog/action-practice" className="text-accent hover:underline">
              Practice Training
            </a>{" "}
            translates that clarity into daily behaviour. Read more about the founder's path on the{" "}
            <a href="/oscar-poon" className="text-accent hover:underline">About Oscar Poon</a> page.
          </p>
        </section>
      </main>

      <FooterSimple />
    </div>
  );
}
