import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";

const profiles: Record<string, {
  slug: string;
  name: string;
  youtubeId: string;
  banner: string;
  painStatement: string;
  tagline: string;
  mobileInsight: string;
  whatItMeans: string;
  whyYouStruggle: string;
  biggestMistake: string;
  howWPTHelps: string;
  helpPoints: string[];
  outcome: string;
  seoTitle: string;
  seoDescription: string;
}> = {
  "motivation-chaser": {
    slug: "motivation-chaser",
    name: "Motivation Chaser",
    youtubeId: "ot6uJo7In24",
    banner: "/profiles/motivation-chaser.webp",
    painStatement: "I always run out of motivation.",
    mobileInsight: "You start strong because you genuinely want to change. But your entire system runs on motivation — and motivation was never designed to last six months.",
    tagline: "The person who never has to restart isn't more motivated than you. They just stopped depending on motivation to show up.",
    whatItMeans: "You start with genuine fire. The pantry gets cleaned out. The gym bag comes back. For a few weeks, everything works. Then life gets ordinary again — and ordinary is the enemy of motivation. Most Motivation Chasers have lost weight before. The problem isn't starting. It's that your entire system depends on a feeling that was never designed to last six months.",
    whyYouStruggle: "Motivation is a spark, not a fuel source. Every time you rely on it to drive consistency, you're one bad week away from stopping. And when you stop, the restart becomes harder — because now there's shame attached to it too. Over time, the cycle shortens. The starts get smaller. The gaps get longer.",
    biggestMistake: "Believing the fix is finding stronger motivation. More videos, better quotes, a new program with a better community. The real problem is structural — you've never built a system that doesn't require motivation to run.",
    howWPTHelps: "Weight Permanence Training builds two specific types of motivation — PUSH (what you're moving away from) and PULL (who you're becoming) — and then trains you to strengthen the emotional connection to both. The goal isn't to feel motivated every day. It's to make your identity clear enough that the habits maintain themselves even when motivation disappears.",
    helpPoints: [
      "Build PUSH motivation: an emotionally connected reason to stop the regain cycle",
      "Build PULL motivation: a specific identity to move toward, not just a weight goal",
      "Learn why your past restarts happened — the exact trigger, not a vague explanation",
      "Develop a system that runs on identity, not feelings",
    ],
    outcome: "You don't need another restart. You need a system that makes restarting unnecessary.",
    seoTitle: "Motivation Chaser Weight Regain Profile | Why Motivation Alone Fails",
    seoDescription: "You're not lazy — you're dependent on motivation. Learn why Motivation Chasers regain weight and how Weight Permanence Training builds lasting commitment.",
  },
  "overwhelmed-beginner": {
    slug: "overwhelmed-beginner",
    name: "Overwhelmed Beginner",
    youtubeId: "XvJoKFvXe0M",
    banner: "/profiles/overwhelmed-beginner.webp",
    painStatement: "I don’t know where to start.",
    mobileInsight: "You're not new to dieting. You're exhausted by an industry that produces more conflicting advice than results. More research has never produced more action.",
    tagline: "You don't need a better diet. You need to stop letting the search for the perfect diet keep you from starting the one in front of you.",
    whatItMeans: "You're not a beginner at dieting. You're overwhelmed by the industry built around it. One expert says eat less and move more. Another says that's outdated. One study says breakfast is essential. Another says skip it entirely. After years of this, your default response to new information isn't excitement — it's exhaustion.",
    whyYouStruggle: "Analysis paralysis is real. When you can't decide what's right, you default to either doing nothing or bouncing between systems. Neither produces the consistent behaviour that actually drives weight change. Every new piece of information introduces a new reason to wait.",
    biggestMistake: "Assuming more research will eventually give you enough confidence to start. It usually does the opposite. The diet industry is designed to keep you consuming content — not to get you to a decision. More information is how they keep you engaged, not how you lose weight.",
    howWPTHelps: "Weight Permanence Training doesn't give you more information to evaluate. It gives you a framework for understanding your own behaviour — why you eat the way you eat, what triggers it, what it costs you, and who you want to become. That's the data that actually moves people. Not another nutrition study.",
    helpPoints: [
      "Stop collecting strategies and start understanding your actual patterns",
      "Identify the specific friction points that stall your progress — yours, not everyone's",
      "Build confidence through consistent action, not through more research",
      "Learn to make decisions from self-awareness instead of expert consensus",
    ],
    outcome: "You already have enough information. What you need is a reason to act on it.",
    seoTitle: "Overwhelmed Beginner Weight Regain Profile | Information Overload and Weight Loss",
    seoDescription: "Too much advice is keeping you stuck. Learn why Overwhelmed Beginners struggle with weight loss and how Weight Permanence Training cuts through the noise.",
  },
  "restarter": {
    slug: "restarter",
    name: "Restarter",
    youtubeId: "L45rGwguXWA",
    banner: "/profiles/restarter.webp",
    painStatement: "I jump from one method to the next before seeing results.",
    mobileInsight: "You've never stayed with one method long enough to find out if it actually works. Most approaches need six to eight weeks before results appear. You've been leaving in week two.",
    tagline: "The problem isn’t that nothing works. It’s that you leave before anything has time to.",
    whatItMeans: "You’ve tried more approaches to weight loss than most people have heard of. Keto, intermittent fasting, the app, the coach, the meal plan. Each one gets a few weeks. Then something new comes along that seems more promising — better science, better results, fewer restrictions — and you switch. The old program gets abandoned. The new one starts fresh. And the cycle continues. You’ve been in week one of dozens of programs. You’ve almost never experienced week eight.",
    whyYouStruggle: "Weight loss has a feedback gap. The behaviour changes immediately. The physical results take weeks. Most methods produce almost no visible change in the first two to three weeks — which is exactly when a Restarter finds the next thing. So you’ve been stuck in the gap between starting and results your entire weight loss journey, never staying long enough to find out whether anything actually works for your body.",
    biggestMistake: "Believing the problem is the method. That the right program is still out there, and if you can just find it, you’ll finally commit. But the issue isn’t commitment to a specific diet — it’s commitment to a direction. Any sound method, followed consistently for long enough, would have produced results. The switching is the problem, not the methods.",
    howWPTHelps: "Weight Permanence Training starts with Pattern Awareness — mapping exactly how many times you’ve switched, at what point you switched, and what triggered the switch each time. That pattern is almost always the same. Once you can see it clearly, you can interrupt it before it fires. Consequence Awareness makes the cost of continued switching feel real: every switch resets the feedback clock and delays the result by weeks. Identity Awareness builds a version of you that identifies as someone who sees things through — not because of discipline, but because finishing is now who you are.",
    helpPoints: [
      "Map your switching pattern — how many methods, how quickly you left each one, what triggered the switch",
      "Understand the feedback gap and why results take longer than the first two to three weeks you’ve been giving methods",
      "Build commitment to a direction, not loyalty to a specific program",
      "Learn to distinguish ‘this isn’t working’ from ‘this hasn’t had enough time yet’",
    ],
    outcome: "You don’t need a better method. You need to stay with one long enough to find out if it works.",
    seoTitle: "Restarter Weight Regain Profile | Shiny Object Syndrome and Weight Loss",
    seoDescription: "You keep switching programs before any of them have time to work. Learn why Restarters never see results and how Weight Permanence Training breaks the cycle.",
  },
  "stress-eater": {
    slug: "stress-eater",
    name: "Stress Eater",
    youtubeId: "3gvPOGk03qs",
    banner: "/profiles/stress-eater.webp",
    painStatement: "I eat when I’m stressed.",
    mobileInsight: "The problem isn't the food. Food has a second job in your life — it reliably makes stress quieter for a few minutes. Your brain learned that and filed it as an effective coping strategy.",
    tagline: "You're not trying to eliminate stress. You're building a version of yourself for whom food is no longer the default response to it.",
    whatItMeans: "You know more about nutrition than most people. The problem isn't knowledge — it's that food has a second job in your life. When you're stressed, overwhelmed, exhausted, or running on empty, food reliably makes it quieter for a few minutes. Your brain has filed that under \"effective coping strategy.\" And it's not wrong — it works in the short term. That's exactly why it keeps happening.",
    whyYouStruggle: "You can't willpower your way out of a coping mechanism. Every time you try to white-knuckle past stress-driven eating, you're fighting a behaviour your nervous system reinforced hundreds of times. The harder you resist, the more depleted you become — and the more vulnerable you are the next time stress shows up.",
    biggestMistake: "Focusing exclusively on food rules. Stricter macros, no-eating-after-8pm rules, removing trigger foods from the house. These reduce opportunity but don't touch the underlying response. The next stressor finds a way through anyway, because the emotional trigger was never addressed.",
    howWPTHelps: "Weight Permanence Training starts with Pattern Awareness — mapping exactly when, where, and why stress eating happens in your specific life. Not in general. In yours. Then Consequence Awareness builds a real reason to interrupt the pattern. Identity Awareness gives you a version of yourself that responds to stress differently — not because you forced it, but because you changed what you believe about who you are.",
    helpPoints: [
      "Map your specific stress eating triggers — the situations, emotions, and times that drive it",
      "Build awareness before the automatic response fires, not after",
      "Develop a PUSH motivation strong enough to interrupt the pattern in the moment",
      "Build an identity that doesn't use food as a stress management tool",
    ],
    outcome: "The food is not the problem. The food is the symptom. WPT addresses what's underneath.",
    seoTitle: "Stress Eater Weight Regain Profile | Emotional Eating and Weight Regain",
    seoDescription: "You're not weak — your brain learned to cope with food. Learn why Stress Eaters regain weight and how Weight Permanence Training rewires that pattern.",
  },
  "weight-cycler": {
    slug: "weight-cycler",
    name: "Weight Cycler",
    youtubeId: "TScfhpE7YyI",
    banner: "/profiles/weight-cycler.webp",
    painStatement: "I lose weight but it always comes back.",
    mobileInsight: "You've already proven you can lose weight. The program worked. What it didn't do was prepare you for what comes after — so old habits refilled the space the diet vacated.",
    tagline: "You already know how to lose weight. What you need to learn is how to become someone who doesn't have to.",
    whatItMeans: "You've already proven you can lose weight. That's not the problem. The problem is that every program you followed was designed to get you to a number on a scale — and then it stopped. No one taught you what to do with the life you were supposed to live once you got there. So old habits slowly refilled the space the diet vacated.",
    whyYouStruggle: "Weight loss programs end. Old environments don't. The people, places, habits, and patterns that existed before the diet are still there after it. Without a system designed for maintenance, you're relying on willpower to hold the line indefinitely — and willpower is a finite resource that was already depleted by the diet itself.",
    biggestMistake: "Looking for a better weight loss plan. You don't need one. You need a weight maintenance plan — built before you reach your goal weight, not after. The window between reaching goal and starting to regain is usually weeks. Most people don't act on it because they're still celebrating.",
    howWPTHelps: "Weight Permanence Training treats maintenance as the primary objective, not an afterthought. The 5 Awareness Stages are specifically designed to build the self-understanding needed to sustain change — not just achieve it. Consequence Awareness makes the next regain feel preventable rather than inevitable. Identity Awareness builds a version of you that identifies as someone who maintains, not someone who is currently on a diet.",
    helpPoints: [
      "Understand exactly why your weight returned after each successful loss",
      "Build a maintenance identity before you reach your goal — not after",
      "Identify the specific patterns that signal the start of a regain cycle",
      "Develop PUSH and PULL motivations strong enough to survive the post-diet phase",
    ],
    outcome: "The real finish line isn't losing the weight. It's never having to lose the same weight again.",
    seoTitle: "Weight Cycler Profile | Why You Keep Regaining Weight After Losing It",
    seoDescription: "You've lost weight before — but it keeps coming back. Learn why Weight Cyclers regain and how Weight Permanence Training ends the cycle for good.",
  },
};

export default function WeightRegainProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const profile = slug ? profiles[slug] : null;

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
          <h1 className="text-2xl font-bold">Profile not found</h1>
          <p className="text-muted-foreground">That weight regain profile doesn't exist.</p>
          <Link to="/awareness-stages" className="text-primary underline">Go back to Awareness Stages</Link>
        </div>
        <FooterSimple />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{profile.seoTitle} | LS Diet</title>
        <meta name="description" content={profile.seoDescription} />
        <link rel="canonical" href={`https://lsdiet.com/weight-regain-profile/${profile.slug}`} />
      </Helmet>

      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-10 md:py-14">

        {/* ── Move 1: Banner + identity ── */}
        <div className="rounded-xl overflow-hidden mb-6 shadow-sm">
          <img
            src={profile.banner}
            alt={`${profile.name} weight regain profile`}
            width={1200}
            height={525}
            loading="eager"
            decoding="async"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">Your Weight Regain Profile</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">{profile.name}</h1>
          <span className="inline-block rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            You said: &ldquo;{profile.painStatement}&rdquo;
          </span>
          <p className="text-base text-muted-foreground leading-relaxed italic">{profile.tagline}</p>
        </div>

        {/* ── Move 2: Video ── */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-sm aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${profile.youtubeId}`}
            title={`${profile.name} — Weight Regain Profile`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* ── Move 3: Insight + bullets + outcome + CTA ── */}
        <div className="space-y-6">

          {/* Core insight — 1-2 sentences */}
          <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
            {profile.mobileInsight}
          </p>

          {/* Scannable bullets — what WPT addresses */}
          <ul className="space-y-3">
            {profile.helpPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent text-xs font-extrabold ring-1 ring-accent/30">
                  {i + 1}
                </span>
                <span className="text-sm md:text-base text-muted-foreground leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          {/* Outcome callout */}
          <div className="rounded-xl bg-zinc-950 text-white px-6 py-5 text-center">
            <p className="text-base md:text-lg font-medium leading-relaxed">{profile.outcome}</p>
          </div>

          {/* CTA block */}
          <div className="rounded-xl border border-accent/30 bg-card px-5 py-6 md:px-8 md:py-8 text-center space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Ready to stop the cycle?</p>
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground">Start the training. It's free.</h3>
            <p className="text-sm text-muted-foreground">
              Full Weight Permanence Training inside Skool.
            </p>
            <a
              href="https://www.skool.com/lsdiet/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-sm font-extrabold uppercase tracking-wider text-accent-foreground shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.6)] transition-all hover:brightness-110"
            >
              Join Free — Skool Community
            </a>
            <Link
              to="/quiz"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wider text-foreground transition-all hover:border-foreground/40 hover:bg-foreground/5"
            >
              Take the Full Quiz — Get Your Profile by Email
            </Link>
            <p className="text-[11px] text-muted-foreground pt-1">
              Quiz takes 60 seconds. Skool is 100% free.
            </p>
          </div>

          {/* Back link */}
          <div className="text-center pb-2">
            <Link
              to="/awareness-stages"
              className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
            >
              ← Back to the 5 Awareness Stages
            </Link>
          </div>

        </div>
      </main>

      <FooterSimple />
    </div>
  );
}
