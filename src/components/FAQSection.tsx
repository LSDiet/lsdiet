import { Helmet } from "react-helmet-async";

type FaqEntry = {
  q: string;
  /** Plain text answer used for JSON-LD schema */
  schemaAnswer: string;
  /** Rendered answer node with inline links */
  render: () => JSX.Element;
};

// Note: inline links in section 4 (Method) and section 5 (Awareness curriculum)
// already cover every awareness stage, Action Practice, the WPT pillar, and the
// low-starch low-sugar pillar. This FAQ only links to destinations NOT already
// linked higher on the homepage.

const faqs: FaqEntry[] = [
  {
    q: "What is LS Diet?",
    schemaAnswer:
      "LS Diet is neuro-behavioural training to stop weight regain. At its core is the Weight Permanence Triangle (WPT) — a framework LS Diet invented from real-life experience after losing 80 lbs three times. It's a tested system built on basic human psychology, so it works for anyone serious about making weight loss permanent.",
    render: () => (
      <p className="text-[hsl(0_0%_20%)] leading-relaxed text-base">
        LS Diet is neuro-behavioural training to stop weight regain. At its core is the Weight Permanence Triangle (WPT) — a framework LS Diet invented from real-life experience after losing 80 lbs three times. It's a tested system built on basic human psychology, so it works for anyone serious about making weight loss permanent.{" "}
        <a href="/what-is-ls-diet" className="text-accent hover:underline">
          Read the full definition on What Is LS Diet →
        </a>
      </p>
    ),
  },
  {
    q: "Why do people keep regaining the weight?",
    schemaAnswer:
      "Regaining weight isn't a willpower problem — it's a priority problem. Every regain traces back to the moment something else (stress, convenience, social pressure, comfort) quietly outranked your health on the priority list. Diets never fix that ranking, so the same patterns return and the weight returns with them. LS Diet rebuilds the priority underneath the food rules, which is why the result holds.",
    render: () => (
      <p className="text-[hsl(0_0%_20%)] leading-relaxed text-base">
        Regaining weight isn't a willpower problem — it's a priority problem. Every regain traces back to the moment something else (stress, convenience, social pressure, comfort) quietly outranked your health on the priority list. Diets never fix that ranking, so the same patterns return and the weight returns with them. LS Diet rebuilds the priority underneath the food rules, which is why the result holds.{" "}
        <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
          Read the foundation →
        </a>
      </p>
    ),
  },
  {
    q: "How long does it take to see results?",
    schemaAnswer:
      "Two weeks. Cutting starch and sugar depletes glycogen, and glycogen pulls water with it — so the scale moves fast and visibly in the first fortnight. That early drop is the signal the lifestyle is actually working in your body. From there, the daily awareness reps are what turn a two-week result into a permanent one.",
    render: () => (
      <p className="text-[hsl(0_0%_20%)] leading-relaxed text-base">
        Two weeks. Cutting starch and sugar depletes glycogen, and glycogen pulls water with it — so the scale moves fast and visibly in the first fortnight. That early drop is the signal the lifestyle is actually working in your body. From there, the daily awareness reps are what turn a two-week result into a permanent one.{" "}
        <a href="/awareness-stages" className="text-accent hover:underline">
          Explore the 5 Awareness Stages →
        </a>
      </p>
    ),
  },

  {
    q: "Who created LS Diet?",
    schemaAnswer:
      "Oscar Poon created LS Diet. He lost 80 lbs three times, holds a psychology degree, and spent a decade analysing behavioural patterns as a surgical data consultant. That mix of psychology and pattern analysis shaped the method.",
    render: () => (
      <p className="text-[hsl(0_0%_20%)] leading-relaxed text-base">
        Oscar Poon created LS Diet. He{" "}
        <a href="/oscar-poon" className="text-accent hover:underline">
          lost 80 lbs three times
        </a>
        , holds a psychology degree, and spent a decade analysing behavioural patterns as a surgical data consultant. That mix shaped the method.
      </p>
    ),
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://lsdiet.com/#faq",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.schemaAnswer },
  })),
};

export function FAQSection() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <section id="faq" className="py-14 md:py-20">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Frequently Asked
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              LS Diet <span className="text-accent">FAQ</span>
            </h2>
          </div>

          <div className="space-y-7">
            {faqs.map((f) => (
              <article key={f.q}>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{f.q}</h3>
                {f.render()}
              </article>
            ))}
          </div>

          <p className="text-center mt-10 text-sm">
            <a href="/faq" className="text-accent hover:underline font-medium">
              See the full LS Diet FAQ →
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
