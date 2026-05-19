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
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${CANONICAL}#person`,
  name: "Oscar Poon",
  url: CANONICAL,
  image: "https://lsdiet.com/oscar-photo.jpeg",
  jobTitle: "Founder of LS Diet",
  description:
    "Founder of LS Diet and creator of the Weight Permanence Triangle™. Lost 80+ lbs three times and built LS Diet from what those restarts taught him.",
  knowsAbout: [
    "Stop Weight Regain",
    "Weight Permanence Triangle",
    "5 Awareness Stages",
    "Low-Starch Low-Sugar Lifestyle",
    "Behavioural Permanence",
  ],
  worksFor: {
    "@type": "Organization",
    name: "LS Diet",
    url: "https://lsdiet.com",
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
          content="Oscar Poon is the founder of LS Diet and creator of the Weight Permanence Triangle™. He has lost 80+ lbs three times and built LS Diet from what those restarts taught him."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Oscar Poon — Founder of LS Diet" />
        <meta property="og:description" content="Founder of LS Diet, creator of the Weight Permanence Triangle™." />
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
            Founder of LS Diet · Creator of the Weight Permanence Triangle™
          </p>
        </header>

        <img
          src={oscarPhoto}
          alt="Oscar Poon, founder of LS Diet and creator of the Weight Permanence Triangle™"
          className="w-full max-w-md mx-auto rounded-xl mb-10 aspect-square object-cover"
        />

        <div className="space-y-5 text-zinc-800 leading-relaxed text-base md:text-lg">
          <p>
            Oscar Poon is the founder and creator of <strong className="text-foreground">LS Diet</strong>.
            He has lost 80+ lbs three separate times — and each restart was a tuition payment that
            eventually became the method he teaches now. The diets worked. The behavioural
            infrastructure underneath them did not. That gap is what LS Diet exists to close.
          </p>
          <p>
            Today Oscar shares the low-starch, low-sugar lifestyle and the Weight Permanence
            Triangle™ through monthly mini-challenges on{" "}
            <a href="https://www.youtube.com/@JoinLSDiet" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              YouTube (@JoinLSDiet)
            </a>
            , a weekly live webinar, and the free LS Diet course. The work is deliberately
            oriented around people who have already lost weight and don't want to do it again.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Background and Method
          </h2>
          <p>
            Oscar holds a degree in psychology and spent over a year supporting clients at a
            substance-abuse centre in Vancouver. That work shaped how he thinks about cravings,
            identity, and relapse — the vocabulary of addiction recovery maps almost directly onto
            the cycle of losing and regaining weight. He also spent a decade as a surgical
            market-data consultant, which trained him to see patterns in messy human behaviour and
            to design systems that hold up in real environments rather than ideal ones.
          </p>
          <p>
            That mix — clinical psychology plus pattern analysis — is what makes LS Diet
            structurally different from typical diet content. The food framework is intentionally
            simple. The behavioural framework is where the real engineering lives. Read the
            breakdown on the{" "}
            <a href="/weight-permanence-triangle" className="text-accent hover:underline">
              Weight Permanence Triangle™
            </a>{" "}
            page, the{" "}
            <a href="/awareness-stages" className="text-accent hover:underline">5 Awareness Stages</a>,
            or the{" "}
            <a href="/what-is-ls-diet" className="text-accent hover:underline">What Is LS Diet</a> overview.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight pt-6 mt-2 text-foreground">
            Why He Built LS Diet
          </h2>
          <p>
            After the third restart, Oscar stopped looking for a better diet and started looking
            for the missing layer underneath every diet he had tried. The pattern was always the
            same: the food worked while life was calm; the food collapsed when life wasn't. The
            intervention had to operate above food, not below it. LS Diet is the result — a
            low-starch, low-sugar lifestyle paired with awareness work, daily practice, and
            permanence systems that course-correct early instead of demanding another restart.
          </p>
          <blockquote className="border-l-2 border-accent/40 pl-4 italic text-accent">
            "Lose the extra weight so you can avoid a future where your choices shrink."
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
                JOIN LS DIET (FREE)
              </a>
            </Button>
          </div>
        </div>
      </article>

      <FooterSimple />
    </div>
  );
}
