import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    tagline: "You don't have a discipline problem. You have a dependency problem — on motivation.",
    whatItMeans: "You are someone who can get highly motivated and make impressive progress when you're emotionally engaged in the goal. Starting is rarely your problem. Maintaining momentum after the initial excitement fades is usually where things become difficult.",
    whyYouStruggle: "Most Motivation Chasers unknowingly depend on motivation to carry the entire journey. When motivation is high, healthy choices feel easy. When motivation drops, consistency often drops with it. Over time, this creates a cycle of starting, stopping, and restarting.",
    biggestMistake: "Many people believe they need more motivation. In reality, they need motivation that lasts longer than a Monday morning promise to themselves.",
    howWPTHelps: "Weight Permanence Training teaches you how to intentionally build and strengthen both push motivations (what you want to avoid) and pull motivations (who you want to become) so your commitment becomes more durable over time. The goal is not to feel motivated every day. The goal is to make weight loss important enough that consistency survives even when motivation doesn't.",
    helpPoints: [
      "Build emotional connections to both push and pull motivations",
      "Replace motivation-dependency with identity-driven consistency",
      "Develop systems that work even when you don't feel like it",
      "Learn why your past restarts happened — and how to prevent the next one",
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
    tagline: "You don't need more information. You need clarity on what actually matters.",
    whatItMeans: "You are likely carrying around a lot of weight loss information already. The challenge is not a lack of knowledge. The challenge is knowing which advice to trust and what to focus on first.",
    whyYouStruggle: "When there are too many options, every decision becomes harder. Many people end up jumping between diets, watching endless videos, reading conflicting advice, and second-guessing themselves. Instead of moving forward, they become stuck in analysis mode.",
    biggestMistake: "Most people assume they need more information. In reality, they often need less information and more clarity.",
    howWPTHelps: "Weight Permanence Training helps you cut through the noise and focus on the few behaviours that matter most. Instead of giving you more information, it helps you simplify decisions, identify what actually matters, and build confidence through consistent action.",
    helpPoints: [
      "Stop chasing conflicting advice from different experts",
      "Focus on actions instead of endless research",
      "Build confidence through consistency — not knowledge",
      "Create a simple system that supports long-term success",
    ],
    outcome: "You do not need another expert to confuse you. You need a process that helps you act on what already matters.",
    seoTitle: "Overwhelmed Beginner Weight Regain Profile | Information Overload and Weight Loss",
    seoDescription: "Too much advice is making you stuck. Learn why Overwhelmed Beginners struggle with weight loss and how Weight Permanence Training provides clarity.",
  },
  "restarter": {
    slug: "restarter",
    name: "Restarter",
    youtubeId: "L45rGwguXWA",
    banner: "/profiles/restarter.png",
    tagline: "You're not someone who quits. You're someone who hasn't learned to recover yet.",
    whatItMeans: "You are someone who has likely started many weight loss efforts throughout your life. The challenge is not getting started. The challenge is staying connected to the process when life interrupts your routine.",
    whyYouStruggle: "Most people expect consistency to be perfect. When a setback happens, they feel like they've failed and decide to start over later instead of recovering immediately. Over time, small interruptions become long breaks and long breaks become complete restarts.",
    biggestMistake: "Restarters often believe their problem is discipline. More often, the problem is recovery. One difficult day becomes a difficult week. One missed workout becomes a lost month. One off-plan meal becomes permission to abandon the entire effort.",
    howWPTHelps: "Weight Permanence Training teaches you how to recognise setbacks early and recover before they become restarts. The goal is not to be perfect. The goal is to become someone who recovers faster than they drift.",
    helpPoints: [
      "Identify when consistency is beginning to break down",
      "Recover from mistakes without starting all over",
      "Build habits that survive real-life disruptions",
      "Reduce the restart cycle that keeps you stuck",
    ],
    outcome: "You don't need another fresh start. You need fewer reasons to start over in the first place.",
    seoTitle: "Restarter Weight Regain Profile | Why You Keep Starting Over With Weight Loss",
    seoDescription: "Every Monday feels like day one. Learn why Restarters keep cycling back to the beginning and how Weight Permanence Training breaks that pattern.",
  },
  "stress-eater": {
    slug: "stress-eater",
    name: "Stress Eater",
    youtubeId: "3gvPOGk03qs",
    banner: "/profiles/stress-eater.png",
    tagline: "You're not out of control. Your brain has learned to use food as a coping tool.",
    whatItMeans: "You likely understand more about healthy eating than you give yourself credit for. The challenge is not knowledge. The challenge is that stress, frustration, boredom, loneliness, or exhaustion often influence eating decisions.",
    whyYouStruggle: "Stress creates a strong desire for relief. For many people, food becomes the fastest and most reliable source of comfort. Over time, the brain begins to associate difficult emotions with eating, making healthy intentions harder to follow when stress levels rise.",
    biggestMistake: "Many Stress Eaters focus entirely on food — trying harder diets, stricter rules, or more willpower. The real issue is that the emotional trigger remains untouched. As long as food remains the primary coping strategy, the cycle tends to repeat itself.",
    howWPTHelps: "Weight Permanence Training helps you recognise the situations, emotions, and patterns that lead to stress eating before they take over. Permanent weight loss doesn't happen when stress disappears. It happens when stress stops making your decisions for you.",
    helpPoints: [
      "Identify emotional eating triggers before they take over",
      "Increase awareness of automatic eating decisions",
      "Build alternative responses to stress and difficult emotions",
      "Create habits that support long-term consistency",
    ],
    outcome: "The goal is not to eliminate stress. The goal is to stop stress from controlling your eating decisions.",
    seoTitle: "Stress Eater Weight Regain Profile | Emotional Eating and Weight Regain",
    seoDescription: "You're not weak — your brain learned to cope with food. Learn why Stress Eaters regain weight and how Weight Permanence Training rewires that pattern.",
  },
  "weight-cycler": {
    slug: "weight-cycler",
    name: "Weight Cycler",
    youtubeId: "TScfhpE7YyI",
    banner: "/profiles/weight-cycler.png",
    tagline: "You know how to lose weight. The real problem is what happens after.",
    whatItMeans: "You've probably experienced successful weight loss before. Unlike many others, your main challenge isn't figuring out how to lose weight — it's maintaining your progress and preventing the weight from coming back over time.",
    whyYouStruggle: "Many weight-loss plans focus on achieving a target weight. They overlook what comes next. When the initial motivation, structure, and excitement fade away, old habits tend to creep back in. The program ends, but the environment that caused the weight gain never changed.",
    biggestMistake: "Most Weight Cyclers assume they need a better weight loss plan. In reality, they often need a better weight maintenance plan. The issue is not losing weight. The issue is what happens after the weight is lost.",
    howWPTHelps: "Weight Permanence Training builds the awareness and habits needed to prevent the regain cycle from repeating itself. You'll gain clarity on why weight comes back, what sparks the cycle, how to respond early before things get out of hand, and how to treat maintenance as a permanent achievement rather than an afterthought.",
    helpPoints: [
      "Understand exactly why your weight returned after past success",
      "Build push and pull motivations that survive the post-diet phase",
      "Develop awareness of the patterns that trigger regain",
      "Create a maintenance identity, not just a weight-loss identity",
    ],
    outcome: "The real finish line isn't losing the weight. The real finish line is never having to lose the same weight again.",
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
        <Footer />
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
          <p className="text-lg text-muted-foreground leading-relaxed">{profile.tagline}</p>
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
            <h2 className="text-xl font-bold text-foreground mb-3">Why {profile.name}s Struggle</h2>
            <p className="text-muted-foreground leading-relaxed">{profile.whyYouStruggle}</p>
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">The Biggest Mistake</h2>
            <p className="text-muted-foreground leading-relaxed">{profile.biggestMistake}</p>
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How Weight Permanence Training Helps</h2>
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
              Want to go deeper?{" "}
              <Link to="/quiz" className="underline">Take the full Weight Regain Profile Quiz</Link>
              {" "}to get your personalised email series.
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

      <Footer />
    </div>
  );
}
