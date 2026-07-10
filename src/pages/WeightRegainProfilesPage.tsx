import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";

const profiles = [
  {
    slug: "motivation-chaser",
    name: "Motivation Chaser",
    banner: "/profiles/motivation-chaser.webp",
    tagline: "Starts strong. Loses steam. Restarts. Repeat.",
    description: "You run on one tank of motivation. Great for getting started, but it was never going to last the whole trip. Once it's empty, the weight quietly comes back.",
  },
  {
    slug: "overwhelmed-beginner",
    name: "Overwhelmed Beginner",
    banner: "/profiles/overwhelmed-beginner.webp",
    tagline: "Too much advice. Zero clarity. Stuck in research mode.",
    description: "You've read every article and watched every video, but never actually started. Like studying swimming for months and never getting in the water.",
  },
  {
    slug: "restarter",
    name: "Restarter",
    banner: "/profiles/restarter.webp",
    tagline: "Leaves before results show up. Every time.",
    description: "You switch diets before any of them get a real chance to work, like changing lanes in traffic because the other one looks faster, and never getting ahead.",
  },
  {
    slug: "stress-eater",
    name: "Stress Eater",
    banner: "/profiles/stress-eater.webp",
    tagline: "Food has a second job, and it's not nutrition.",
    description: "You know exactly what to eat. But when stress hits, you eat anyway, like knowing exactly where the fire exit is, then bolting for the nearest door in a panic.",
  },
  {
    slug: "weight-cycler",
    name: "Weight Cycler",
    banner: "/profiles/weight-cycler.webp",
    tagline: "Loses weight. Gains it back. Loses it again.",
    description: "You already know how to lose weight. You've done it more than once. What you've never had is a plan for keeping it off, so it always creeps back.",
  },
];

// TODO: replace with the real checkout/assessment URL once provided.
const COMPREHENSIVE_ASSESSMENT_URL = "#";

export default function WeightRegainProfilesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>The 5 Weight Regain Profiles | LS Diet</title>
        <meta name="description" content="Five distinct profiles that explain why people regain weight after losing it. Each profile points to a different root cause, and a different WPT solution." />
        <link rel="canonical" href="https://lsdiet.com/weight-regain-profiles" />
      </Helmet>

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Weight Regain Profiles</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The 5 Weight Regain Profiles</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Weight regain isn't random. Five distinct patterns, each with a different root cause. Find out which one fits you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {profiles.map((profile) => (
            <Link
              key={profile.slug}
              to={`/weight-regain-profile/${profile.slug}`}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="overflow-hidden">
                <img
                  src={profile.banner}
                  alt={profile.name}
                  width={1600}
                  height={471}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Profile</p>
                <h2 className="text-lg font-bold text-foreground mb-1">{profile.name}</h2>
                <p className="text-sm font-medium text-muted-foreground mb-2 italic">{profile.tagline}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{profile.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">Not sure which one is you?</p>
          <div className="rounded-xl border border-border overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-8 text-center space-y-3 bg-card">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-muted text-muted-foreground px-3 py-1 rounded-full">
                Free · 60 Seconds
              </span>
              <h3 className="text-xl font-bold text-foreground">Take the Free Quiz</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Find your #1 weight-regain trigger and the exact WPT training that fixes it.
              </p>
              <Link
                to="/quiz"
                className="inline-flex w-full sm:w-auto items-center justify-center bg-primary text-primary-foreground font-semibold px-7 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Start the Free Quiz
              </Link>
            </div>
            <div className="p-6 md:p-8 text-center space-y-3 bg-zinc-950 text-white border-t md:border-t-0 md:border-l border-border">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-accent text-accent-foreground px-3 py-1 rounded-full">
                Full Assessment
              </span>
              <h3 className="text-xl font-bold">Get the Comprehensive Assessment</h3>
              <p className="text-white/70 text-sm max-w-xs mx-auto">
                Everything in the free quiz, plus an extensive personality test that uncovers the real root cause behind your weight struggles.
              </p>
              <a
                href={COMPREHENSIVE_ASSESSMENT_URL}
                className="inline-flex w-full sm:w-auto items-center justify-center bg-accent text-accent-foreground font-semibold px-7 py-3 rounded-lg hover:brightness-110 transition-all"
              >
                Get the Full Assessment
              </a>
            </div>
          </div>
        </div>

      </main>

      <FooterSimple />
    </div>
  );
}
