import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import oscarPhoto from "@/assets/oscar-photo.jpeg";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-05-19T12:00:00+00:00";
const CANONICAL = "https://lsdiet.com/oscar-poon";

// Single source of truth for the Oscar Poon Person entity. Every article and
// entity hub references this @id via JSON-LD author.@id.
const WPT_TERMSET_ID = "https://lsdiet.com/awareness-stages#weight-permanence-training";

const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${CANONICAL}#person`,
  name: "Oscar Poon",
  url: CANONICAL,
  image: "https://lsdiet.com/oscar-photo.jpeg",
  jobTitle: "Founder of LS Diet",
  description:
    "Founder of LS Diet and creator of the Weight Permanence Training™. Lost 80+ lbs three times and built LS Diet from what those restarts taught him.",
  knowsAbout: [
    "Stop Weight Regain",
    "Weight Permanence Training",
    "5 Awareness Stages",
    "Low-Starch Low-Sugar Lifestyle",
    "Behavioural Permanence",
  ],
  worksFor: {
    "@type": "Organization",
    name: "LS Diet",
    url: "https://lsdiet.com",
  },
  subjectOf: {
    "@type": "DefinedTermSet",
    "@id": WPT_TERMSET_ID,
    name: "Weight Permanence Training",
    url: "https://lsdiet.com/awareness-stages",
  },
  sameAs: [
    "https://www.youtube.com/@JoinLSDiet",
    "https://www.instagram.com/JoinLSDiet",
    "https://www.tiktok.com/@JoinLSDiet",
    "https://www.linkedin.com/in/poonoscar/",
  ],
};

const PROFILE_LD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: CANONICAL,
  mainEntity: { "@id": `${CANONICAL}#person` },
  datePublished: PUBLISHED,
  dateModified: UPDATED,
};

export default function OscarPoonPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Oscar Poon | Founder of LS Diet</title>
        <meta
          name="description"
          content="Oscar Poon, founder of LS Diet and creator of the Weight Permanence Training™. Lost 80+ lbs three times before building a system that lasts."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Oscar Poon — Founder of LS Diet" />
        <meta property="og:description" content="Founder of LS Diet, creator of the Weight Permanence Training™." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify(PERSON_LD)}</script>
        <script type="application/ld+json">{JSON.stringify(PROFILE_LD)}</script>
      </Helmet>
      <Navbar />
      <PageBreadcrumb items={[{ name: "Home", url: "/" }, { name: "Oscar Poon", url: "/oscar-poon" }]} />

      <article className="container max-w-3xl mx-auto px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-3">
            <span className="text-accent">Oscar Poon</span>
          </h1>
          <p className="text-xs text-zinc-600 uppercase tracking-wider">
            Founder of LS Diet · Creator of the Weight Permanence Training™
          </p>
        </header>

        <img
          src={oscarPhoto}
          alt="Oscar Poon, founder of LS Diet and creator of the Weight Permanence Training™"
          className="w-full max-w-md mx-auto rounded-xl mb-10 aspect-square object-cover"
        />

        <div className="space-y-5 text-zinc-800 leading-relaxed text-base md:text-lg">
          <p>
            Oscar Poon is a behavioural weight loss coach, the founder of{" "}
            <a href="/what-is-ls-diet" className="text-accent hover:underline">LS Diet</a>, and the creator of the{" "}
            <a href="/weight-permanence-triangle" className="text-accent hover:underline">
              Weight Permanence Training™
            </a>{" "}
            (WPT).
          </p>
          <p>
            He holds a BA in Psychology from Simon Fraser University and spent a year working with clients in a Detox centre in Vancouver, where he observed firsthand how people in active behavioural change either build lasting habits or relapse into old ones. He then spent 10 years as a surgical market research consultant at iData Research, studying how decision-makers in high-stakes environments change their behaviour under pressure.
          </p>
          <p>
            He applied that background to his own weight loss. He has lost more than 80 lbs three separate times. After reaching 310 lbs in November 2024, he lost more than 100 lbs and has maintained that loss without repeated restarts. Most importantly, his weight has not fluctuated more than 5 lbs in either direction in over 14 months.
          </p>
          <p>
            The experience became the foundation for the Weight Permanence Training, a system designed to help people stop restarting weight loss and prevent weight regain.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            The Weight Permanence Training
          </h2>
          <p>
            The{" "}
            <a href="/weight-permanence-triangle" className="text-accent hover:underline">
              Weight Permanence Training
            </a>{" "}
            is built on five sequential{" "}
            <a href="/awareness-stages" className="text-accent hover:underline">awareness stages</a>:{" "}
            <a href="/blog/reality-awareness" className="text-accent hover:underline">Reality</a>,{" "}
            <a href="/blog/friction-awareness" className="text-accent hover:underline">Friction</a>,{" "}
            <a href="/blog/pattern-awareness" className="text-accent hover:underline">Pattern</a>,{" "}
            <a href="/blog/consequence-awareness" className="text-accent hover:underline">Consequence</a>, and{" "}
            <a href="/blog/identity-awareness" className="text-accent hover:underline">Identity</a>.
            The Consequence stage builds PUSH motivation, which is an emotionally connected
            reason to move away from outcomes you no longer accept. The Identity stage builds
            PULL motivation, which is an emotionally connected reason to move toward the future
            person you are becoming. Together they create enough emotional momentum that weight
            regain becomes unacceptable rather than inevitable.
          </p>
          <p>
            <a href="/what-is-ls-diet" className="text-accent hover:underline">LS Diet</a> is the
            community where that training is applied through daily{" "}
            <a href="/blog/action-practice" className="text-accent hover:underline">behavioural practice</a>.
          </p>
          <blockquote className="border-l-2 border-accent/40 pl-4 italic text-accent text-center text-xl font-serif font-extrabold">
            "Build a future that is not limited by your weight."
          </blockquote>
        </div>

        <div className="mt-10 p-6 rounded-xl border border-accent/30 bg-accent/5 text-center">
          <p className="text-sm text-zinc-800 mb-4">Follow the work — and join the free course.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="accent" size="lg" asChild>
              <a href="https://www.youtube.com/@JoinLSDiet" target="_blank" rel="noopener noreferrer">
                Subscribe on YouTube
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer">
                START YOUR FREE TRAINING TODAY
              </a>
            </Button>
          </div>
        </div>
      </article>

      <FooterSimple />
    </div>
  );
}
