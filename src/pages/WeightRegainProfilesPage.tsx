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
    description: "Motivation gets you started but can't sustain you. This profile is for people whose consistency collapses the moment the initial excitement fades.",
  },
  {
    slug: "overwhelmed-beginner",
    name: "Overwhelmed Beginner",
    banner: "/profiles/overwhelmed-beginner.webp",
    tagline: "Too much advice. Zero clarity. Stuck in research mode.",
    description: "Not a beginner at dieting — a beginner at deciding. Years of conflicting information have made starting feel impossible.",
  },
  {
    slug: "restarter",
    name: "Restarter",
    banner: "/profiles/restarter.webp",
    tagline: "Leaves before results show up. Every time.",
    description: "You've tried more methods than most people have heard of — and left each one in week two. The problem isn't the method. It's that results take longer than your patience does.",
  },
  {
    slug: "stress-eater",
    name: "Stress Eater",
    banner: "/profiles/stress-eater.webp",
    tagline: "Food has a second job — and it's not nutrition.",
    description: "You know what to eat. The problem is that stress, exhaustion, and emotion keep overriding that knowledge before you can act on it.",
  },
  {
    slug: "weight-cycler",
    name: "Weight Cycler",
    banner: "/profiles/weight-cycler.webp",
    tagline: "Loses weight. Gains it back. Loses it again.",
    description: "You've already proven you can lose weight. The problem is what happens after — no system for maintenance, so old habits slowly refill the space.",
  },
];

export default function WeightRegainProfilesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>The 5 Weight Regain Profiles — Find Yours | LS Diet</title>
        <meta name="description" content="Five distinct profiles that explain why people regain weight after losing it. Each profile points to a different root cause — and a different WPT solution." />
        <link rel="canonical" href="https://lsdiet.com/weight-regain-profiles" />
      </Helmet>

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Weight Regain Profiles</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The 5 Weight Regain Profiles</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Weight regain isn't random. Five distinct patterns — each with a different root cause. Find out which one fits you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {profiles.map((profile) => (
            <Link
              key={profile.slug}
              to={`/weight-regain-profile/${profile.slug}`}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors lg:max-w-md"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={profile.banner}
                  alt={profile.name}
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

        <div className="mt-12 rounded-xl border border-border bg-card p-6 md:p-8 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Not sure which one is you?</p>
          <h3 className="text-xl font-bold text-foreground">Take the Free Quiz — 60 seconds</h3>
          <p className="text-muted-foreground text-sm">You'll get your profile by email plus a personalised next step.</p>
          <Link
            to="/quiz"
            className="inline-block bg-primary text-primary-foreground font-semibold px-7 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Take the Quiz
          </Link>
        </div>

      </main>

      <FooterSimple />
    </div>
  );
}
