import { Beef, Brain, Target, TrendingUp } from "lucide-react";

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

export function WhatIsLSDietSection() {
  return (
    <section id="what-is-ls-diet" className="py-14 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The Methodology
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight">
            What Is <span className="text-accent">LS Diet?</span>
          </h2>
        </div>

        {/* Step 1 — The problem, backed by stats */}
        <div className="flex items-center justify-center gap-2 mb-5 text-accent">
          <TrendingUp className="w-5 h-5" aria-hidden="true" />
          <p className="text-sm md:text-base font-bold uppercase tracking-[0.15em]">
            Obesity is on the rise
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {stats.map((s) => (
            <div
              key={s.stat}
              className="rounded-3xl bg-card border border-border p-6 md:p-7 shadow-[0_2px_24px_-12px_hsl(0_0%_0%/0.08)] text-center"
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

        {/* Bridge to the solution */}
        <p className="mt-10 md:mt-12 mb-6 md:mb-8 text-center text-lg md:text-xl font-bold text-foreground max-w-2xl mx-auto">
          To prevent regaining weight, you need:
        </p>


        {/* Two pillars: A) WPT training  B) LS lifestyle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* A) WPT card */}
          <a
            href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-primary/30 bg-primary/[0.06] p-5 md:p-6 hover:border-primary hover:bg-primary/[0.1] transition-colors"
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/30 bg-background">
                <Brain className="w-6 h-6 md:w-7 md:h-7 text-primary" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">A) Training</p>
                <h3 className="text-lg md:text-2xl font-extrabold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                  Weight Permanence Triangle™
                </h3>
                <p className="mt-1 text-sm md:text-base font-semibold text-primary">Psychology + Behaviour Training</p>
                <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm font-semibold text-[hsl(0_0%_20%)]">
                  <li>5 Stages of Awareness</li>
                  <li className="text-primary" aria-hidden="true">·</li>
                  <li>Daily Action Practice</li>
                </ul>
              </div>
            </div>
          </a>

          {/* B) LS card */}
          <a
            href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-accent/30 bg-accent/[0.06] p-5 md:p-6 hover:border-accent hover:bg-accent/[0.1] transition-colors"
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-accent/30 bg-background">
                <Beef className="w-6 h-6 md:w-7 md:h-7 text-accent" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-1">B) Sustainable Lifestyle</p>
                <h3 className="text-lg md:text-2xl font-extrabold uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
                  Low-Starch, Low-Sugar
                </h3>
                <p className="mt-1 text-sm md:text-base font-semibold text-accent">Food System</p>
                <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm font-semibold text-[hsl(0_0%_20%)]">
                  <li>Eat until full</li>
                  <li className="text-accent" aria-hidden="true">·</li>
                  <li>No counting</li>
                  <li className="text-accent" aria-hidden="true">·</li>
                  <li>Sustainable</li>
                </ul>
              </div>
            </div>
          </a>
        </div>

        <p className="mt-8 md:mt-10 text-center text-sm md:text-base text-[hsl(0_0%_30%)] max-w-2xl mx-auto">
          New here? Start with the pillar article on{" "}
          <a
            href="/blog/why-people-regain-weight-after-dieting"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-semibold hover:underline"
          >
            why people regain weight after dieting
          </a>{" "}
          — the problem LS Diet was built to solve.
        </p>
      </div>
    </section>
  );
}
