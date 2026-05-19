import { Helmet } from "react-helmet-async";

type FaqEntry = {
  q: string;
  /** Plain text answer used for JSON-LD schema */
  schemaAnswer: string;
  /** Rendered answer node with inline links */
  render: () => JSX.Element;
};

const faqs: FaqEntry[] = [
  {
    q: "What is LS Diet?",
    schemaAnswer:
      "LS Diet is a low-starch low-sugar lifestyle paired with the Weight Permanence Triangle, a three part behavioural framework that helps you stop regaining weight. Created by Oscar Poon, it focuses on permanence instead of restart cycles.",
    render: () => (
      <p className="text-[hsl(0_0%_78%)] leading-relaxed text-base">
        LS Diet is a{" "}
        <a
          href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting"
          className="text-accent hover:underline"
        >
          low-starch low-sugar lifestyle
        </a>{" "}
        paired with a three part behavioural framework that helps you stop regaining weight.{" "}
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
      <p className="text-[hsl(0_0%_78%)] leading-relaxed text-base">
        Most diets work on food alone and ignore the behavioural layers underneath. Without awareness, the same{" "}
        <a href="/blog/pattern-awareness" className="text-accent hover:underline">
          pattern that repeats
        </a>{" "}
        will regain the weight again, and the{" "}
        <a href="/blog/consequence-awareness" className="text-accent hover:underline">
          consequence catches up later
        </a>
        . LS Diet adds the layers conventional plans skip.{" "}
        <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
          Read the foundation →
        </a>
      </p>
    ),
  },
  {
    q: "What is the Weight Permanence Triangle?",
    schemaAnswer:
      "The Weight Permanence Triangle is the framework at the centre of LS Diet. Awareness creates urgency, Practice builds the daily low-starch low-sugar actions, and Permanence protects those actions when life gets hard.",
    render: () => (
      <p className="text-[hsl(0_0%_78%)] leading-relaxed text-base">
        The Weight Permanence Triangle is the framework at the centre of LS Diet.{" "}
        <a href="/awareness-stages" className="text-accent hover:underline">
          Awareness
        </a>{" "}
        creates urgency,{" "}
        <a href="/blog/action-practice" className="text-accent hover:underline">
          practice
        </a>{" "}
        builds the daily low-starch low-sugar actions, and{" "}
        <a href="/blog/identity-awareness" className="text-accent hover:underline">
          permanence
        </a>{" "}
        protects those actions when life gets hard.{" "}
        <a
          href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight"
          className="text-accent hover:underline"
        >
          Read the foundation →
        </a>
      </p>
    ),
  },
  {
    q: "Who created LS Diet?",
    schemaAnswer:
      "Oscar Poon created LS Diet. He lost 80 lbs three times, holds a psychology degree, and spent a decade analysing behavioural patterns as a surgical data consultant. That mix of psychology and pattern analysis shaped the method.",
    render: () => (
      <p className="text-[hsl(0_0%_78%)] leading-relaxed text-base">
        Oscar Poon created LS Diet. He{" "}
        <a href="/oscar-poon" className="text-accent hover:underline">
          lost 80 lbs three times
        </a>
        , holds a psychology degree, and spent a decade analysing behavioural patterns as a surgical data consultant. That mix shaped the method.{" "}
        <a href="/oscar-poon" className="text-accent hover:underline">
          Read his story →
        </a>
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

const keepExploring = [
  { label: "LS Foundations", href: "/blog" },
  { label: "5 Stages of Awareness", href: "/awareness-stages" },
  { label: "Friction Awareness", href: "/blog/friction-awareness" },
  { label: "Action Practice", href: "/blog/action-practice" },
  { label: "About Oscar Poon", href: "/oscar-poon" },
];

export function FAQSection() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <section id="faq" className="section-dark py-14 md:py-20">
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

          {/* Keep exploring */}
          <nav
            aria-label="Keep exploring LS Diet"
            className="mt-12 border-t border-[hsl(0_0%_20%)] pt-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent text-center mb-4">
              Keep Exploring
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {keepExploring.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center rounded-full border border-[hsl(0_0%_25%)] bg-[hsl(0_0%_10%)] px-3.5 py-1.5 text-sm text-[hsl(0_0%_90%)] hover:border-accent hover:text-accent transition-colors"
                  >
                    {link.label} →
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-center mt-8 text-sm">
            <a href="/faq" className="text-accent hover:underline font-medium">
              See the full LS Diet FAQ →
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
