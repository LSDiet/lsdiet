import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";

const PUBLISHED = "2026-05-14T12:00:00+00:00";
const UPDATED = "2026-05-14T12:00:00+00:00";

const methodFaqs = [
  {
    q: "How is LS Diet different from keto?",
    a: "Keto is defined by ketosis — pushing carbs low enough that the body switches to burning ketones for fuel. LS Diet doesn't require ketosis. The goal is reducing the foods that spike insulin most aggressively (refined starch and added sugar), which lets you eat fruit, legumes, and small amounts of whole grains in ways strict keto would not.",
  },
  {
    q: "Do I need to count calories on LS Diet?",
    a: "No. By focusing on food quality rather than caloric arithmetic, intake usually self-regulates because lower-insulin foods are more satiating. The point is to remove the math, not add a new flavour of it.",
  },
  {
    q: "How fast will I see results?",
    a: "Most people notice cravings calm down within the first week, weight stops climbing in week one, and weight loss begins by week two. Long-term results depend less on the food and more on whether the awareness and permanence layers are built alongside it.",
  },
  {
    q: "Is LS Diet safe long term?",
    a: "LS Diet is a lifestyle, not a short-term cut. It keeps protein, healthy fats, fibre-rich vegetables, and lower-sugar fruit on the menu indefinitely. As with any nutrition change, talk to your physician — especially if you take medication for blood sugar or blood pressure.",
  },
];

const lifestyleFaqs = [
  {
    q: "Can I still eat out and travel on LS Diet?",
    a: "Yes — that's a design goal, not a workaround. The lifestyle is built to adapt to restaurants, family meals, and travel without requiring a separate menu. Practice inside the Weight Permanence Triangle™ explicitly trains for these scenarios.",
  },
  {
    q: "What if I slip?",
    a: "Slipping is expected; restarting is what LS Diet is built to prevent. The Permanence pillar gives you an internal alert system and a course-correction protocol so a bad meal, day, or week doesn't become a full reset.",
  },
  {
    q: "Do I need the free course to use LS Diet?",
    a: "No — the homepage, the Weight Permanence Triangle page, and the 5 Awareness Stages page are enough to start. The free 7-day course just compresses the framework into a guided week with a live webinar.",
  },
  {
    q: "Where can I follow Oscar Poon's work?",
    a: "Oscar publishes monthly mini-challenges on YouTube at @JoinLSDiet and runs a weekly webinar inside the free course community. The About Oscar Poon page links to both.",
  },
];

const allFaqs = [...methodFaqs, ...lifestyleFaqs];

export default function CoreFAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>LS Diet FAQ | Method, Lifestyle, and Long-Term Results</title>
        <meta
          name="description"
          content="In-depth answers to the most common LS Diet questions — about the method, the low-starch low-sugar lifestyle, and the Weight Permanence Triangle™."
        />
        <link rel="canonical" href="https://lsdiet.com/faq" />
        <meta property="og:title" content="LS Diet FAQ" />
        <meta property="og:description" content="Method, lifestyle, and long-term answers about LS Diet." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lsdiet.com/faq" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": "https://lsdiet.com/faq#faq",
          mainEntity: allFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}</script>
      </Helmet>
      <Navbar />
      <PageBreadcrumb items={[{ name: "Home", url: "/" }, { name: "FAQ", url: "/faq" }]} />

      <article className="container max-w-3xl mx-auto px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-3">
            LS Diet <span className="text-accent">FAQ</span>
          </h1>
          <p className="text-xs text-zinc-600 uppercase tracking-wider">
            Published <time dateTime={PUBLISHED}>May 14, 2026</time> · Updated <time dateTime={UPDATED}>May 14, 2026</time>
          </p>
        </header>

        <p className="text-zinc-800 leading-relaxed text-base md:text-lg mb-10">
          The questions below come up most often from people exploring LS Diet for the first time. For a shorter
          intro, the homepage carries a top-level FAQ. For deeper context on the framework, see the{" "}
          <a href="/weight-permanence-triangle" className="text-accent hover:underline">Weight Permanence Triangle™</a>
          {" "}or the{" "}
          <a href="/what-is-ls-diet" className="text-accent hover:underline">What Is LS Diet</a> overview.
        </p>

        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground mb-5">
          About the Method
        </h2>
        <div className="space-y-7 mb-12">
          {methodFaqs.map((f) => (
            <article key={f.q}>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{f.q}</h3>
              <p className="text-[hsl(0_0%_82%)] leading-relaxed">{f.a}</p>
            </article>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground mb-5">
          About the Lifestyle
        </h2>
        <div className="space-y-7">
          {lifestyleFaqs.map((f) => (
            <article key={f.q}>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{f.q}</h3>
              <p className="text-[hsl(0_0%_82%)] leading-relaxed">{f.a}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl border border-accent/30 bg-accent/5 text-center">
          <p className="text-sm text-zinc-800 mb-4">Have a question we missed?</p>
          <Button variant="accent" size="lg" asChild>
            <a href="/#contact">Send Oscar a question →</a>
          </Button>
        </div>
      </article>

      <FooterSimple />
    </div>
  );
}
