import { Beef, Brain, Target } from "lucide-react";

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
          <p className="mt-4 text-sm md:text-base text-[hsl(0_0%_30%)] max-w-2xl mx-auto">
            Two pillars working together. Neither stands alone.
          </p>
        </div>

        {/* Outcome at top */}
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="absolute -inset-4 bg-accent/20 blur-2xl rounded-full -z-10" aria-hidden="true" />
          <div className="flex items-center justify-center gap-4 md:gap-6 rounded-full border-2 border-accent bg-accent/15 px-5 py-4 md:px-8 md:py-6 animate-pulse-glow">
            <Target className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 text-accent" aria-hidden="true" />
            <span className="block h-10 md:h-14 w-px bg-accent/40" aria-hidden="true" />
            <span className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-accent leading-none">
              Stop Weight Regain
            </span>
          </div>
        </div>

        {/* Connector: simple line on mobile, branching tree on desktop */}
        <div className="relative mx-auto w-full max-w-3xl h-8 md:h-14" aria-hidden="true">
          {/* Mobile: single vertical line */}
          <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-accent/50" />
          {/* Desktop: branching tree */}
          <svg
            viewBox="0 0 300 56"
            preserveAspectRatio="none"
            className="hidden md:block absolute inset-0 w-full h-full"
          >
            <path
              d="M150 0 L150 22 L40 22 L40 56 M150 22 L260 22 L260 56"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="2"
              strokeOpacity="0.6"
            />
          </svg>
        </div>

        {/* Mobile label between line and cards */}
        <p className="md:hidden -mt-2 mb-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
          Built on two pillars
        </p>

        {/* Two foundation pillars side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* LS card */}
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

          {/* WPT card */}
          <a
            href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-primary/30 bg-primary/[0.06] p-5 md:p-6 hover:border-primary hover:bg-primary/[0.1] transition-colors"
          >
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/30 bg-background">
                  <Brain className="w-6 h-6 md:w-7 md:h-7 text-primary" aria-hidden="true" />
                </div>
                <span className="inline-flex items-center justify-center rounded-md bg-primary px-2 py-0.5 text-xs md:text-sm font-extrabold uppercase tracking-wide text-primary-foreground">
                  WPT
                </span>
              </div>
              <div className="min-w-0">
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
