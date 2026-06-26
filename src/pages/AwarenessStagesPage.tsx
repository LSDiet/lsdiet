import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { Button } from "@/components/ui/button";

import stagesDiagram from "@/assets/5-stages-of-awareness-v2.png";
import aware1 from "@/assets/awareness/aware1.png";
import aware2 from "@/assets/awareness/aware2.png";
import aware3 from "@/assets/awareness/aware3.png";
import aware4 from "@/assets/awareness/aware4.png";
import aware5 from "@/assets/awareness/aware5.png";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-06-20T12:00:00+00:00";
const CANONICAL = "https://lsdiet.com/awareness-stages";
const WPT_TERMSET_ID = `${CANONICAL}#weight-permanence-training`;

const stages = [
  {
    name: "Reality Awareness",
    slug: "reality-awareness",
    body: "Reality Awareness is the first stage of the Weight Permanence Training. It is the practice of establishing an honest, undefended baseline of your current physical state, eating patterns, and daily behaviours.",
  },
  {
    name: "Friction Awareness",
    slug: "friction-awareness",
    body: "Friction Awareness maps the gap between your current reality and your intended direction. Naming that gap precisely is what makes the next stages possible.",
  },
  {
    name: "Pattern Awareness",
    slug: "pattern-awareness",
    body: "Pattern Awareness identifies the specific conditions under which your weight regain behaviour occurs: who, when, where, what, why, and how. Without it, behaviour change targets the wrong problem.",
  },
  {
    name: "Consequence Awareness",
    slug: "consequence-awareness",
    body: "Consequence Awareness is the foundation of PUSH motivation. It makes the cost of regain feel real and personal rather than abstract and distant.",
  },
  {
    name: "Identity Awareness",
    slug: "identity-awareness",
    body: "Identity Awareness is the foundation of PULL motivation. It shifts the question from 'how do I lose weight' to 'who am I becoming.'",
  },
];

const stageIcons = [aware1, aware2, aware3, aware4, aware5];

const stageMeta = [
  { name: "Reality",     full: "Reality Awareness",     purpose: "Establish your honest baseline",          questions: 14, slug: "reality-awareness"     },
  { name: "Friction",    full: "Friction Awareness",    purpose: "Name the gap between knowing and doing",  questions: 48, slug: "friction-awareness"    },
  { name: "Pattern",     full: "Pattern Awareness",     purpose: "Map when, where, and why you eat",        questions: 83, slug: "pattern-awareness"     },
  { name: "Consequence", full: "Consequence Awareness", purpose: "Feel the real cost of staying the same",  questions: 66, slug: "consequence-awareness" },
  { name: "Identity",    full: "Identity Awareness",    purpose: "Build the future self who doesn't regain",questions: 56, slug: "identity-awareness"    },
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
    reveal: "That's exactly why you're here. Most people who struggle with weight aren't lazy or weak. They've been solving the wrong problem. You've been trying to lose weight. WPT helps you become someone who never has to lose it again.",
    revealType: "neutral",
    nextLabel: "Begin Stage 1: Reality →",
    stageRef: null,
  },
  {
    num: "1",
    label: "Stage 1 of 5 · 14 questions",
    title: "Reality awareness",
    intro: "Before anything else, you need an honest baseline. Not what you think. What is actually true.",
    question: "On a scale of 1–10, how accurately do you track what you actually eat each day?",
    isSlider: true,
    sliderMin: 1,
    sliderMax: 10,
    sliderDefault: 7,
    sliderReveals: {
      low: "Most people overestimate this by 2–3 points. Research shows we underreport calorie intake by 30–50% on average. That's not dishonesty. It's how memory works. This stage closes that gap.",
      mid: "That's more honest than most. The question isn't whether your tracking is perfect. It's whether you know your patterns well enough to change them.",
      high: "People who track very precisely often still struggle. Awareness of intake isn't the same as awareness of why you eat. That's what the next stages uncover.",
    },
    revealType: "neutral",
    nextLabel: "Stage 2: Friction →",
    stageRef: "reality-awareness",
  },
  {
    num: "2",
    label: "Stage 2 of 5 · 48 questions",
    title: "Friction awareness",
    intro: "You know what you should do. Something keeps stopping you. This stage names that something.",
    question: "Do you like your current weight?",
    options: [
      {
        label: "No",
        reveal: "That gap between knowing and doing is friction. Something in your current situation makes the healthy choice feel harder than the easy one. This stage names exactly what that is.",
      },
      {
        label: "Somewhat. I've made peace with it.",
        reveal: "Acceptance is a coping mechanism, not a choice. When you say you've accepted it, you mean you've stopped fighting because fighting hasn't worked. That's important information.",
      },
      {
        label: "Yes, I'm happy with it",
        reveal: "Then something else brought you here. Maybe curiosity, or preventive reasons. That's okay. Curiosity is a fine place to start.",
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
    intro: "Most eating is automatic. This stage maps exactly when, where, and why it happens.",
    question: "When do you find yourself eating even though you're not hungry?",
    options: [
      {
        label: "When I'm stressed or overwhelmed",
        reveal: "Stress eating always feels justified. You think: I had a hard day. But the food doesn't fix the stress. It just makes the feeling quieter for a few minutes. That's the loop.",
      },
      {
        label: "When I'm bored",
        reveal: "Boredom eating is usually about stimulation, not hunger. The body knows food equals dopamine. When nothing else is interesting, it reaches for the fastest reward available.",
      },
      {
        label: "In social settings when food is around",
        reveal: "Environmental eating is invisible to most people. You don't decide to eat. The food is just there.. This pattern shows up most in people who do well alone but struggle at gatherings.",
      },
      {
        label: "Out of habit at certain times or places",
        reveal: "Habitual eating is the most automatic of all. No hunger, no emotion. Just a trigger and a response.. These are the easiest patterns to interrupt once you see them.",
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
    intro: "This is the stage most people skip. You need to feel what staying the same actually costs you.",
    question: "If nothing changes, what's the most likely outcome in 5 years?",
    options: [
      {
        label: "More medication, more health problems",
        reveal: "That's not abstract. That's a specific future you can already see coming. When the cost of inaction feels real, the motivation to change stops depending on willpower.",
      },
      {
        label: "Less energy, fewer experiences",
        reveal: "The experiences you're not having right now. That is not a future problem.. Every summer, every trip, every activity you quietly opted out of. That's the consequence.",
      },
      {
        label: "Deeper disconnection from who I want to be",
        reveal: "Every day you live outside that identity, there's a quiet dissonance. That gap is exhausting. And it's optional.",
      },
      {
        label: "Not being there for people I love",
        reveal: "The goal of this stage is to connect the stakes to real, specific, named people. Abstract consequences don't move us. Personal ones do.",
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
    intro: "The person you want to become already has the habits you're trying to build. This stage isn't about goals. It's about who.",
    question: "Complete this sentence: \"The version of me I most want to become is someone who...\"",
    options: [
      {
        label: "Shows up with energy every single day",
        reveal: "That person doesn't drag themselves out of bed thinking about motivation. They eat in a way that sustains their energy. That's not discipline. That's identity..",
      },
      {
        label: "In control of food, not controlled by it",
        reveal: "When you identify as that person, the craving shows up and you respond rather than react. That shift is the entire game.",
      },
      {
        label: "Feels proud when they look in the mirror",
        reveal: "That feeling isn't vanity. It's alignment.. It means your outside matches your inside. That's what Weight Permanence feels like.",
      },
      {
        label: "Sets the example for the people they love",
        reveal: "One of the most powerful motivators that exists. It's not about you anymore.. It's about what your habits are teaching the people watching you.",
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

  const getProfile = (sels: Record<number, number | null>): string => {
    const stage3 = sels[3];
    const stage0 = sels[0];
    if (stage3 === 0) return "stress-eater";
    if (stage3 === 1) return "overwhelmed-beginner";
    if (stage3 === 2) return "motivation-chaser";
    if (stage0 === 1) return "weight-cycler";
    if (stage0 === 2) return "restarter";
    return "overwhelmed-beginner";
  };

  const handleOption = (stageIdx: number, optIdx: number) => {
    setSelections((prev) => ({ ...prev, [stageIdx]: optIdx }));
  };

  const handleNext = (stageIdx: number) => {
    const next = stageIdx + 1;
    if (next > 5) {
      setShowCta(true);
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
          <h1 className="text-3xl md:text-4xl font-serif font-normal text-primary leading-tight mb-4">
            Most diets work.<br />The problem is living inside one permanently.
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
            Every failed diet left you with data. What it didn't give you was self-knowledge: <em>why</em> you eat the way you do, and what's actually driving the regain cycle.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto mt-2">
            The 5 Stages of Awareness fix that gap. When you have this clarity, weight permanence stops depending on willpower.
          </p>
        </header>

        {/* Diagram */}
        <div className="mb-10">
          <img
            src={stagesDiagram}
            alt="The 5 Stages of Awareness: Reality, Friction, Pattern, Consequence, Identity"
            className="w-full rounded-xl shadow-md"
          />
        </div>

        {/* Stage icon row */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4 text-center">
            The 5 stages
          </p>
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4">
            {stageMeta.map((s, i) => (
              <a
                key={s.slug}
                href={`/blog/${s.slug}`}
                className="snap-start shrink-0 w-36 rounded-xl border border-border bg-card p-3 flex flex-col items-center text-center hover:border-accent/50 transition-colors"
              >
                <img src={stageIcons[i]} alt={s.full} className="w-14 h-14 object-contain mb-2" />
                <p className="text-xs font-semibold text-foreground leading-snug mb-1">{s.name}</p>
                <span className="text-[10px] text-muted-foreground">{s.questions} questions</span>
              </a>
            ))}
          </div>
        </div>

        {/* Quiz section header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold whitespace-nowrap">
            Try one question from each stage
          </p>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Progress */}
        <div className="mb-6">
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
                className={`rounded-xl border bg-card p-5 transition-all duration-300 ${
                  locked ? "opacity-30 pointer-events-none select-none" : "border-border"
                }`}
              >
                {/* Stage header */}
                <div className="flex items-center gap-3 mb-3">
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
                          className={`text-left text-sm px-4 py-3 rounded-lg border transition-all ${
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
                      className="ml-auto text-sm font-semibold bg-foreground text-background px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {cfg.nextLabel}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dual CTA */}
        {showCta && (
          <div className="mt-10 rounded-xl border border-accent/30 bg-accent/5 p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2 text-center">
              You just did what most people never do
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-normal text-primary mb-2 text-center leading-snug">
              You went through all 5 stages.
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              The community gives you structure. The Navigator gives you answers in the moment.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Card 1 — Skool */}
              <div className="flex-1 rounded-xl border border-border bg-card p-5 flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-semibold mb-2">Free</span>
                <p className="text-base font-semibold text-foreground mb-2">Practice Training Community</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  30+ daily behaviour modules, group accountability, and guided exercises. No credit card required.
                </p>
                <Button variant="default" className="w-full" asChild>
                  <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
                    Join free on Skool →
                  </a>
                </Button>
              </div>

              {/* Card 2 — Motivation Navigator */}
              <div className="flex-1 rounded-xl border border-border bg-card p-5 flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">AI Coaching</span>
                <p className="text-base font-semibold text-foreground mb-2">Motivation Navigator</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  Ask about your eating habits, motivation, and hurdles. Get personalised responses grounded in the WPT system, with clear stackable motivations for when you feel like quitting.
                </p>
                <Button variant="accent" className="w-full" asChild>
                  <a href="/app">
                    Try the Navigator →
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}

      </main>

      <FooterSimple />
    </div>
  );
}
