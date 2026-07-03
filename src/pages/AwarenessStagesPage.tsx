import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { Button } from "@/components/ui/button";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getArticlesByFoundation } from "@/content/articles";

import stagesDiagram from "@/assets/5-stages-of-awareness-v3.jpg";
import aware1 from "@/assets/awareness/aware1.png";
import aware2 from "@/assets/awareness/aware2.png";
import aware3 from "@/assets/awareness/aware3.png";
import aware4 from "@/assets/awareness/aware4.png";
import aware5 from "@/assets/awareness/aware5.png";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-06-26T12:00:00+00:00";
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

// One or two articles pulled from each stage foundation, deduped, capped at 6.
const stageArticles = Array.from(
  new Map(
    stages
      .flatMap((s) => getArticlesByFoundation(s.slug, 2))
      .map((a) => [a.meta.slug, a]),
  ).values(),
).slice(0, 6);

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
    question: "How many times have you lost weight and regained it?",
    options: [
      {
        label: "This would be my first time",
        reveal: "You're here before the cycle starts. Most people don't find this until after several attempts. Take your time going through the stages.",
      },
      {
        label: "Once or twice",
        reveal: "You've already learned what doesn't work. That's useful information. The stages ahead are about understanding what was missing, not what went wrong.",
      },
      {
        label: "More than I want to count",
        reveal: "Most people in this situation have tried harder than anyone around them realises. The problem was never effort. Something else has been missing. That's what these stages look at.",
      },
    ],
    reveal: "",
    revealType: "neutral",
    nextLabel: "Begin Stage 1: Reality →",
    stageRef: null,
  },
  {
    num: "1",
    label: "Stage 1 of 5 · 14 questions",
    title: "Reality awareness",
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
        reveal: "Environmental eating is invisible to most people. You don't decide to eat. The food is just there. This pattern shows up most in people who do well alone but struggle at gatherings.",
      },
      {
        label: "Out of habit at certain times or places",
        reveal: "Habitual eating is the most automatic of all. No hunger, no emotion. Just a trigger and a response. These are the easiest patterns to interrupt once you see them.",
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
    question: "If nothing changes, what's the most likely outcome in 5 years?",
    options: [
      {
        label: "More medication, more health problems",
        reveal: "That's not abstract. That's a specific future you can already see coming. When the cost of inaction feels real, the motivation to change stops depending on willpower.",
      },
      {
        label: "Less energy, fewer experiences",
        reveal: "The experiences you're not having right now. That is not a future problem. Every summer, every trip, every activity you quietly opted out of. That's the consequence.",
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
    question: "Complete this sentence: \"The version of me I most want to become is someone who...\"",
    options: [
      {
        label: "Shows up with energy every single day",
        reveal: "That person doesn't drag themselves out of bed thinking about motivation. They eat in a way that sustains their energy. That's not discipline. That's identity.",
      },
      {
        label: "In control of food, not controlled by it",
        reveal: "When you identify as that person, the craving shows up and you respond rather than react. That shift is the entire game.",
      },
      {
        label: "Feels proud when they look in the mirror",
        reveal: "That feeling isn't vanity. It's alignment. It means your outside matches your inside. That's what Weight Permanence feels like.",
      },
      {
        label: "Sets the example for the people they love",
        reveal: "One of the most powerful motivators that exists. It's not about you anymore. It's about what your habits are teaching the people watching you.",
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
  const [chosenPath, setChosenPath] = useState<"stages" | "profile" | null>(null);
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

  const selectPath = (path: "stages" | "profile") => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "awareness_path_selected", path });
    setChosenPath(path);
    setTimeout(() => {
      const el = document.getElementById("path-content");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>How to Stop Weight Regain | Weight Permanence Training™</title>
        <meta
          name="description"
          content="Weight Permanence Training™ is a 5-stage awareness system that builds the identity and motivation needed to stop regaining weight — permanently. Free inside LS Diet."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="How to Stop Weight Regain | Weight Permanence Training™" />
        <meta property="og:description" content="5-stage awareness system that builds the identity and motivation needed to stop regaining weight — permanently." />
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
        <header className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-3">
            Weight Permanence Training™
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-normal text-primary leading-tight mb-4">
            This Is What Makes Weight Loss Permanent
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
            Most people who come to me have already lost weight before. Sometimes more than once. Losing the weight was never the problem. Keeping it off was.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto mt-3">
            The reason it keeps coming back is not discipline. It is a pattern you have not identified yet. These five stages walk you through exactly why — and help you build the awareness and identity that make change stick the second time.
          </p>
          <p className="text-sm font-semibold text-foreground mt-6">
            Your first step is free. Start wherever you are right now.
          </p>
        </header>

        {/* Path Gate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Card A — Stages */}
          <button
            onClick={() => selectPath("stages")}
            className={`text-left rounded-xl border overflow-hidden transition-colors flex flex-col ${
              chosenPath === "stages"
                ? "border-primary"
                : "border-border bg-card hover:border-accent/50"
            }`}
          >
            <div className="w-full h-32 bg-primary flex flex-col items-center justify-center gap-1 shrink-0">
              <p className="text-4xl font-extrabold text-white tracking-tight">10 min</p>
              <p className="text-[11px] uppercase tracking-widest text-accent font-semibold">Deep dive</p>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <p className="text-base font-semibold text-foreground mb-1">Build the identity that makes weight loss permanent</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                Five stages of awareness training build your new identity and stack the motivations that keep working long after willpower runs out.
              </p>
              <span className="text-sm font-semibold text-foreground">Explore the stages →</span>
            </div>
          </button>

          {/* Card B — Profile */}
          <a
            href="/quiz/"
            className="text-left rounded-xl border border-border bg-card hover:border-accent/50 overflow-hidden transition-colors flex flex-col"
          >
            <div className="w-full h-32 bg-primary flex flex-col items-center justify-center gap-1 shrink-0">
              <p className="text-4xl font-extrabold text-white tracking-tight">30 sec</p>
              <p className="text-[11px] uppercase tracking-widest text-accent font-semibold">Quick start</p>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <p className="text-base font-semibold text-foreground mb-1">Do you know the real reason your weight keeps coming back?</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                Answer 5 quick questions. Get a personalised weight regain profile and a clear starting point — for free!
              </p>
              <span className="text-sm font-semibold text-foreground">Get my profile →</span>
            </div>
          </a>
        </div>

        {/* Path content */}
        <div id="path-content">

          {/* Path A: Stages overview */}
          {chosenPath === "stages" && (
            <div className="divide-y divide-border mb-10">
              {[
                {
                  num: "01",
                  name: "Reality Awareness",
                  slug: "reality-awareness",
                  reframe: "You've thought about your weight. But have you ever sat with an honest, undefended picture of where you actually are right now?",
                },
                {
                  num: "02",
                  name: "Friction Awareness",
                  slug: "friction-awareness",
                  reframe: "You know something needs to change. This stage names the specific gap between where you are and where you don't want to end up — before anything else.",
                },
                {
                  num: "03",
                  name: "Pattern Awareness",
                  slug: "pattern-awareness",
                  reframe: "You've noticed the same thing keeps happening. This stage maps the exact who, when, where, and why behind it.",
                },
                {
                  num: "04",
                  name: "Consequence Awareness",
                  slug: "consequence-awareness",
                  reframe: "You've thought about what might happen if nothing changes. This stage makes that cost feel real enough to actually move you.",
                },
                {
                  num: "05",
                  name: "Identity Awareness",
                  slug: "identity-awareness",
                  reframe: "You've pictured a different version of yourself. This stage builds that person deliberately — so your habits match who you're becoming.",
                },
              ].map((s) => (
                <a
                  key={s.slug}
                  href={`/blog/${s.slug}`}
                  className="flex items-start gap-5 py-6 group hover:bg-muted/30 -mx-4 px-4 transition-colors"
                >
                  <span className="text-3xl font-extrabold text-muted-foreground/30 leading-none shrink-0 w-10 text-right">
                    {s.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-foreground mb-1">{s.name}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.reframe}</p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-1">→</span>
                </a>
              ))}
            </div>
          )}

        </div>

        <RelatedArticles items={stageArticles} />

      </main>

      <FooterSimple />
    </div>
  );
}
