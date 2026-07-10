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
            <div
              key={profile.slug}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <Link
                to={`/weight-regain-profile/${profile.slug}`}
                className="group block hover:opacity-95 transition-opacity"
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
                <div className="p-5 pb-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Profile</p>
                  <h2 className="text-lg font-bold text-foreground mb-1">{profile.name}</h2>
                  <p className="text-sm font-medium text-muted-foreground mb-2 italic">{profile.tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{profile.description}</p>
                </div>
              </Link>

              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <Link
                    to="/quiz"
                    className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold px-5 py-3 text-sm hover:opacity-90 transition-opacity"
                  >
                    Take the Free Quiz · 60 Seconds
                  </Link>
                  <a
                    href={COMPREHENSIVE_ASSESSMENT_URL}
                    className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-semibold px-5 py-3 text-sm hover:brightness-110 transition-all"
                  >
                    Get the Full Assessment
                  </a>
                </div>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Already took the quiz?{" "}
                  <a
                    href="https://www.skool.com/lsdiet/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    Start your free training today
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>

      </main>

      <FooterSimple />
    </div>
  );
}
