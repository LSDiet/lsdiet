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
      "LS Diet is a low-starch low-sugar lifestyle paired with the Weight Permanence Triangle, a three part behavioural framework that helps you stop regaining weight. Created by Oscar Poon, it focuses on permanence instead of restart cycles.",
    render: () => (
      <p className="text-[hsl(0_0%_20%)] leading-relaxed text-base">
        LS Diet is a low-starch low-sugar lifestyle paired with a three part behavioural framework that helps you stop regaining weight.{" "}
        <a href="/what-is-ls-diet" className="text-accent hover:underline">
          Read the full definition on What Is LS Diet →
        </a>
      </p>
    ),
  },
  {
    q: "Why do people keep regaining the weight?",
    schemaAnswer:
      "Most diets work on food alone and ignore the behavioural layers underneath. Without awareness, the same pattern that regained weight last time repeats, and the consequence catches up later. LS Diet adds an awareness layer and a permanence layer so a slip never becomes a full restart.",
    render: () => (
      <p className="text-[hsl(0_0%_20%)] leading-relaxed text-base">
        Most diets work on food alone and ignore the behavioural layers underneath. Without awareness, the same patterns repeat and the consequences catch up later. LS Diet adds the layers conventional plans skip.{" "}
        <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
          Read the foundation →
        </a>
      </p>
    ),
  },
  {
    q: "How long does it take to see results?",
    schemaAnswer:
      "Most people notice changes within the first two weeks of practising the low-starch low-sugar lifestyle alongside daily awareness reps. The deeper goal is permanence — building habits that hold up months and years later, not just on the scale on day fourteen.",
    render: () => (
      <p className="text-[hsl(0_0%_20%)] leading-relaxed text-base">
        Most people notice changes within the first two weeks of practising the lifestyle alongside daily awareness reps. The deeper goal is permanence — habits that hold up months and years later, not just on the scale on day fourteen.{" "}
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
