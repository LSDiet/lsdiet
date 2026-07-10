import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";

// TODO: replace with the real checkout/assessment URL once provided.
const COMPREHENSIVE_ASSESSMENT_URL = "#";

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
    mobileInsight: "Motivation is like a single tank of gas — it gets you moving, but the distance is fixed the moment you start driving. There's no way to refuel once it runs dry, so when it's gone, so is your progress.",
    tagline: "The person who never restarts isn't more motivated than you. They just stopped needing motivation to show up every day.",
    whatItMeans: "You start strong. The pantry gets cleaned out, the gym bag comes back out, and for a few weeks everything works. Then life gets ordinary again, the excitement fades, and so does the effort. This can happen before you even start, halfway through, or right after you hit your goal — because your whole plan is running on one feeling, and feelings don't last forever.",
    whyYouStruggle: "Motivation is a spark, not fuel. If a single feeling is the only thing driving you, you're always one bad week away from stopping. And once you stop, restarting feels even harder, because now there's guilt attached too.",
    biggestMistake: "Thinking the fix is \"more motivation\" — a new video, a better quote, a fresh program. The real issue is that your plan has no backup source of drive once the spark burns out.",
    howWPTHelps: "Weight Permanence Training gives you two separate reasons to keep going, so losing one doesn't cost you the other: a PUSH reason, something real you want to move away from that creates urgency right now, and a PULL reason, the person you're becoming, which still matters even after the urgency fades. Think of it as a two-tank system — if one runs low, the other keeps you moving.",
    helpPoints: [
      "Find a PUSH reason: something real you want to stop happening, that gets you moving today",
      "Find a PULL reason: the person you're actually becoming, not just a number on a scale",
      "Learn exactly what caused your past restarts, not a vague guess",
      "Build a plan that runs on who you are, not how you feel that day",
    ],
    outcome: "You don't need more motivation. You need a plan that still works on the days you don't have any.",
    seoTitle: "Motivation Chaser Weight Regain Profile | Why Motivation Alone Fails",
    seoDescription: "You're not lazy — you're dependent on motivation. Learn why Motivation Chasers regain weight and how Weight Permanence Training builds lasting commitment.",
  },
  "overwhelmed-beginner": {
    slug: "overwhelmed-beginner",
    name: "Overwhelmed Beginner",
    youtubeId: "XvJoKFvXe0M",
    banner: "/profiles/overwhelmed-beginner.webp",
    painStatement: "I don’t know where to start.",
    mobileInsight: "It's like reading every book and watching every tutorial on swimming, buying all the gear, and studying technique for months — and never actually getting in the water.",
    tagline: "You don't need a better diet. You need to stop searching for the perfect one and start the one in front of you.",
    whatItMeans: "You're eager to lose weight. You read, you research, you take quizzes, you watch videos. But somehow you never actually start. That's not laziness — it's that all your effort is going into preparing instead of doing. One expert says eat less, another says that's outdated. One study says skip breakfast, another says never skip it. After enough of this, you stop trusting any answer, including your own.",
    whyYouStruggle: "Research never runs out — there's always one more article. Without a clear starting line, you can keep \"preparing\" forever and never risk actually trying. And a vague feeling of not being ready yet isn't something you can act on, because it isn't a real, specific problem.",
    biggestMistake: "Believing that more research will eventually make you feel ready. It usually does the opposite — every new article is just another reason to wait one more day.",
    howWPTHelps: "Weight Permanence Training doesn't hand you more information — you already have more than enough. It gives you an honest starting point, so there's nothing left to \"prepare\" for, and helps you name the one specific thing actually in your way, instead of a vague feeling of not knowing enough.",
    helpPoints: [
      "Get a clear, honest starting point — no more research needed",
      "Name the one real thing that's stopping you, instead of a vague feeling",
      "Build confidence by doing something small, not by reading something else",
      "Learn to trust your own judgment instead of chasing expert consensus",
    ],
    outcome: "You already know enough to start. What you need is a reason to actually do it.",
    seoTitle: "Overwhelmed Beginner Weight Regain Profile | Information Overload and Weight Loss",
    seoDescription: "Too much advice is keeping you stuck. Learn why Overwhelmed Beginners struggle with weight loss and how Weight Permanence Training cuts through the noise.",
  },
  "restarter": {
    slug: "restarter",
    name: "Restarter",
    youtubeId: "L45rGwguXWA",
    banner: "/profiles/restarter.webp",
    painStatement: "I jump from one method to the next before seeing results.",
    mobileInsight: "It's like changing lanes in traffic because the other one looks faster — over and over, never staying in one lane long enough to actually get ahead.",
    tagline: "Nothing works because you leave before anything has time to.",
    whatItMeans: "You try diet A for a week, switch to diet B in week two, and conclude neither one works. But look closer: the pattern isn't any single diet failing, it's the switching itself. No method ever gets run long enough to actually produce a result.",
    whyYouStruggle: "You act fast when something feels urgent, but you've never practiced sitting still while you wait for slow results. Most methods need several weeks before real change shows up — and you're usually gone by week two, so you never make it that far.",
    biggestMistake: "Believing the problem is the method — that the \"right\" diet is still out there waiting to be found. It isn't. Any solid method, followed long enough, would have worked. The switching is the problem, not the diets.",
    howWPTHelps: "Weight Permanence Training first shows you the pattern in black and white: every time you've switched, and what set it off. Once \"diets don't work for me\" becomes \"I switch too early,\" you have something you can actually fix. From there, it trains the specific skill you're missing — staying with something past the point where the excitement wears off, but before the results arrive.",
    helpPoints: [
      "See your exact switching pattern — how many methods, how fast you left each one",
      "Understand why results take longer than you've been giving them",
      "Learn to commit to a direction, not a specific program",
      "Tell the difference between \"this isn't working\" and \"this just needs more time\"",
    ],
    outcome: "You don't need a better method. You need to stay with one long enough to find out if it works.",
    seoTitle: "Restarter Weight Regain Profile | Shiny Object Syndrome and Weight Loss",
    seoDescription: "You keep switching programs before any of them have time to work. Learn why Restarters never see results and how Weight Permanence Training breaks the cycle.",
  },
  "stress-eater": {
    slug: "stress-eater",
    name: "Stress Eater",
    youtubeId: "3gvPOGk03qs",
    banner: "/profiles/stress-eater.webp",
    painStatement: "I eat when I’m stressed.",
    mobileInsight: "It's like knowing exactly where the fire exit is — then running for the nearest door in a panic anyway when the alarm actually goes off. Knowing the right move doesn't automatically mean you'll make it under pressure.",
    tagline: "You don't need to remove all the stress from your life. You need food to stop being your default reaction to it.",
    whatItMeans: "You already know what to eat. That's never been the issue. The problem is that when stress, exhaustion, or emotion shows up, that knowledge gets overridden before you can use it. This isn't a knowledge gap — it's the gap between what you know when you're calm and what you actually do under pressure.",
    whyYouStruggle: "You can't think your way out of a habit your body already trusts. Food reliably makes stress quieter, even if just for a few minutes, so your brain has filed it as \"this works\" — and it keeps reaching for it under pressure, no matter what you know.",
    biggestMistake: "Focusing only on food rules — stricter macros, no eating after 8pm, clearing junk food from the house. These make food a little harder to reach for, but they don't touch the real trigger. The next stressful moment finds a way through anyway.",
    howWPTHelps: "Weight Permanence Training starts by finding your specific stress triggers, not \"stress causes overeating\" in general, but the exact situations that set it off for you. From there, it works on lowering how much stress you're carrying day to day, and trains a steadier response you can count on when pressure hits, because willpower alone tends to fail at the exact moment you need it most.",
    helpPoints: [
      "Find your specific triggers — the situations and emotions that set it off, not stress in general",
      "Catch the urge before it fires, not after",
      "Lower your everyday stress load so the trigger fires less often",
      "Build a steady response that holds up under pressure, not just when things are calm",
    ],
    outcome: "The food was never the problem. It's the symptom. This fixes what's underneath it.",
    seoTitle: "Stress Eater Weight Regain Profile | Emotional Eating and Weight Regain",
    seoDescription: "You're not weak — your brain learned to cope with food. Learn why Stress Eaters regain weight and how Weight Permanence Training rewires that pattern.",
  },
  "weight-cycler": {
    slug: "weight-cycler",
    name: "Weight Cycler",
    youtubeId: "TScfhpE7YyI",
    banner: "/profiles/weight-cycler.webp",
    painStatement: "I lose weight but it always comes back.",
    mobileInsight: "It's like quitting smoking every January through sheer willpower, staying quit for months, relapsing, and repeating that same cycle for years. The ability to quit was never the question. What's missing is something that makes it stick.",
    tagline: "You already know how to lose weight. What you need to learn is how to become someone who doesn't have to.",
    whatItMeans: "You're determined and good at losing weight — you've hit your goal before, more than once. This isn't a motivation problem; motivation was never what you were missing. The failure happens after the goal: the weight comes back, again and again, sometimes 50 pounds or more, over years. That's not a one-time slip. That's a repeating cycle.",
    whyYouStruggle: "Every program you've followed was built to get you to a number on the scale, and then it stopped. Nobody taught you what to do with your life once you got there. The people, places, and habits that were there before the diet are still there after it, so without a real plan for what comes next, old habits slowly move back in.",
    biggestMistake: "Looking for a better weight loss plan. You don't need one — you've already proven you can lose weight. What you need is a maintenance plan, built before you hit your goal, not after.",
    howWPTHelps: "Weight Permanence Training treats this the way it should be treated: as a permanent shift in how you eat, not a phase with an end date. It pairs that mindset with full training on how to actually maintain, since staying at your goal weight is its own separate skill, one that was never supposed to happen automatically just because the weight came off.",
    helpPoints: [
      "Understand exactly why the weight came back each time, not just that it did",
      "Build your maintenance plan before you hit your goal, not after",
      "Spot the early signs of a regain cycle starting",
      "Get a plan built to last, not one built to end",
    ],
    outcome: "The real finish line isn't losing the weight. It's never having to lose it again.",
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

        {/* ── Profile name ── */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">Weight Regain Profile</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">{profile.name}</h1>
          <p className="text-base text-muted-foreground leading-relaxed italic">{profile.tagline}</p>
        </div>

        {/* ── Video ── */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-sm aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${profile.youtubeId}`}
            title={`${profile.name} — Weight Regain Profile`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* ── Insight + bullets + outcome + CTA ── */}
        <div className="space-y-6">

          <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
            {profile.mobileInsight}
          </p>

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

          <div className="rounded-xl bg-zinc-950 text-white px-6 py-5 text-center">
            <p className="text-base md:text-lg font-medium leading-relaxed">{profile.outcome}</p>
          </div>

          {/* CTA block */}
          <div className="rounded-xl border border-border overflow-hidden">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary text-center pt-6">Not sure which profile is yours?</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2">
              <div className="p-5 md:p-6 text-center space-y-3 bg-card">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-muted text-muted-foreground px-3 py-1 rounded-full">
                  Free · 60 Seconds
                </span>
                <h3 className="text-lg font-bold text-foreground">Free Quiz</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Find your main weight-regain trigger and the WPT training that fixes it.
                </p>
                <Link
                  to="/quiz"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Take the Free Quiz
                </Link>
              </div>

              <div className="p-5 md:p-6 text-center space-y-3 bg-zinc-950 text-white border-t md:border-t-0 md:border-l border-border">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-accent text-accent-foreground px-3 py-1 rounded-full">
                  $4.99 · Full Assessment
                </span>
                <h3 className="text-lg font-bold">Comprehensive Assessment</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  The quiz, plus an in-depth personality test that finds the root cause behind your weight struggles.
                </p>
                <a
                  href={COMPREHENSIVE_ASSESSMENT_URL}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-accent-foreground shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.6)] transition-all hover:brightness-110"
                >
                  Get the Full Assessment
                </a>
              </div>
            </div>

            <div className="px-5 pb-6 pt-4 mt-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3 text-center">Already took the quiz?</p>
              <div className="flex flex-col gap-2 items-center">
                <a
                  href="https://www.skool.com/lsdiet/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Start your free training on Skool →
                </a>
                <a
                  href="https://lsdiet.com/app"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Activate your Motivation Navigator Subscription (Advanced) →
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <FooterSimple />
    </div>
  );
}
