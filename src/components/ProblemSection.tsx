/**
 * Problem section — sits right after the Hero on the home page.
 * Frames the scale of the problem LS Diet was built to solve using
 * three sourced statistics.
 */
const stats = [
  {
    stat: "42.4%",
    text: "of US adults are obese (BMI 30+)",
    source: "CDC",
    href: "https://www.cdc.gov/obesity/adult-obesity-facts/index.html",
  },
  {
    stat: "29.5%",
    text: "of Canadian adults are obese (BMI 30+)",
    source: "Government of Canada",
    href: "https://www.canada.ca/en/public-health/services/publications/healthy-living/obesity-statistics-canada.html?utm",
  },
  {
    stat: "50%",
    text: "of people starting exercise programs drop out within 6 months",
    source: "BMJ Open (PDF)",
    href: "/research/e027987.full.pdf",
  },
];

export function ProblemSection() {
  return (
    <section id="the-problem" className="py-14 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The Problem
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight">
            Dieting Works. <span className="text-accent">Keeping It Off Doesn&apos;t.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-[hsl(0_0%_30%)] max-w-2xl mx-auto">
            Obesity keeps rising and most weight-loss attempts collapse. The hard
            part was never losing the weight — it&apos;s preventing the regain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {stats.map((s) => (
            <div
              key={s.stat}
              className="rounded-3xl bg-card border border-border p-6 md:p-8 shadow-[0_2px_24px_-12px_hsl(0_0%_0%/0.08)] text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-2">
                {s.stat}
              </div>
              <p className="text-sm text-[hsl(0_0%_30%)] leading-snug mb-3">{s.text}</p>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] uppercase tracking-[0.14em] text-[hsl(0_0%_50%)] hover:text-accent underline underline-offset-4 decoration-[hsl(0_0%_80%)] hover:decoration-accent transition-colors"
              >
                {s.source} ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
