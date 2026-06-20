import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";

const profiles: Record<string, {
  slug: string;
  name: string;
  youtubeId: string;
  banner: string;
  tagline: string;
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
    banner: "/profiles/motivation-chaser.png",
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
    banner: "/profiles/overwhelmed-beginner.png",
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
    banner: "/profiles/restarter.png",
    tagline: "The goal isn't to stop having bad days. It's to stop letting bad days reset the clock.",
    whatItMeans: "Every Monday has been a potential turning point. You're not lazy — if anything, you've put more effort into weight loss than most people. The problem is that your system doesn't survive contact with real life. A stressful project, a vacation, a family situation — and the whole structure collapses. Then you rebuild from scratch instead of picking up where you left off.",
    whyYouStruggle: "You've been treating consistency as an all-or-nothing state. Either you're fully on the plan, or you've failed and need to start again. This binary thinking turns every interruption into a reset. The longer the restart takes, the deeper the regression. Over time, the gaps between starts get longer and the starts themselves get smaller.",
    biggestMistake: "Believing the fix is a stronger plan — more detailed, more structured, more bulletproof. The real skill you're missing isn't planning. It's recovery. Knowing what to do the day after a bad day is more valuable than having a perfect day.",
    howWPTHelps: "Weight Permanence Training treats recovery as a specific skill, not an afterthought. Pattern Awareness shows you exactly when and how your consistency starts to break down — before it becomes a full restart. Consequence Awareness makes the cost of each restart feel real rather than abstract. Identity Awareness gives you a version of yourself to return to, not a new plan to follow.",
    helpPoints: [
      "Identify the exact moment your consistency starts to slip — before it becomes a restart",
      "Learn to recover from a bad day or week without starting over",
      "Understand what specifically interrupts your consistency — every time",
      "Build an identity that survives real-life disruptions",
    ],
    outcome: "You don't need another fresh start. You need to become someone who recovers faster than they drift.",
    seoTitle: "Restarter Weight Regain Profile | Why You Keep Starting Over With Weight Loss",
    seoDescription: "Every Monday feels like day one. Learn why Restarters keep cycling back to the beginning and how Weight Permanence Training breaks that pattern.",
  },
  "stress-eater": {
    slug: "stress-eater",
    name: "Stress Eater",
    youtubeId: "3gvPOGk03qs",
    banner: "/profiles/stress-eater.png",
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
    banner: "/profiles/weight-cycler.png",
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

      <main className="max-w-3xl mx-auto px-4 py-12 md:py-16">

        {/* Banner */}
        <div className="rounded-xl overflow-hidden mb-8 shadow-sm">
          <img
            src={profile.banner}
            alt={`${profile.name} weight regain profile`}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Your Weight Regain Profile</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{profile.name}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed italic">{profile.tagline}</p>
        </div>

        {/* YouTube video */}
        <div className="mb-10 rounded-xl overflow-hidden shadow-sm aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${profile.youtubeId}`}
            title={`${profile.name} — Weight Regain Profile`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Content sections */}
        <div className="space-y-8">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What {profile.name} Means</h2>
            <p className="text-muted-foreground leading-relaxed">{profile.whatItMeans}</p>
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Why You Keep Struggling</h2>
            <p className="text-muted-foreground leading-relaxed">{profile.whyYouStruggle}</p>
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">The Mistake Most {profile.name}s Make</h2>
            <p className="text-muted-foreground leading-relaxed">{profile.biggestMistake}</p>
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How Weight Permanence Training Addresses This</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{profile.howWPTHelps}</p>
            <ul className="space-y-2">
              {profile.helpPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">{i + 1}</span>
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Outcome callout */}
          <div className="rounded-xl bg-zinc-950 text-white px-6 py-6 text-center">
            <p className="text-lg font-medium leading-relaxed">{profile.outcome}</p>
          </div>

          {/* Primary CTA */}
          <div className="rounded-xl border border-border bg-card p-6 md:p-8 text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Ready to stop the cycle?</p>
            <h3 className="text-2xl font-bold text-foreground">Join the free LS Diet community</h3>
            <p className="text-muted-foreground">
              Weight Permanence Training is free inside the Skool community. No upsell. No trial. Just the system.
            </p>
            <a
              href="https://www.skool.com/lsdiet/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Join Free — Skool Community
            </a>
            <p className="text-xs text-muted-foreground pt-1">
              Want your personalised email series?{" "}
              <Link to="/quiz" className="underline">Take the full Weight Regain Profile Quiz</Link>.
            </p>
          </div>

          {/* Navigation back */}
          <div className="text-center pt-2">
            <Link
              to="/awareness-stages"
              className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
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
