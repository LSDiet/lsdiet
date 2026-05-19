import { Beef, Brain, Target, ChevronDown } from "lucide-react";

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

        <div className="flex flex-col items-center gap-3 md:gap-4">
          {/* LS card */}
          <a
            href="/what-is-ls-diet"
            className="group block w-full rounded-2xl border border-accent/30 bg-accent/[0.06] p-5 md:p-6 hover:border-accent hover:bg-accent/[0.1] transition-colors"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-accent/30 bg-background">
                <Beef className="w-7 h-7 md:w-8 md:h-8 text-accent" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center justify-center rounded-md bg-accent px-2 py-0.5 text-xs md:text-sm font-extrabold uppercase tracking-wide text-accent-foreground">
                    LS
                  </span>
                  <h3 className="text-base md:text-2xl font-extrabold uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
                    Low-Starch, Low-Sugar
                  </h3>
                </div>
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

          <ChevronDown className="w-6 h-6 text-accent" aria-hidden="true" />

          {/* WPT card */}
          <a
            href="/weight-permanence-triangle"
            className="group block w-full rounded-2xl border border-primary/30 bg-primary/[0.06] p-5 md:p-6 hover:border-primary hover:bg-primary/[0.1] transition-colors"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-primary/30 bg-background">
                <Brain className="w-7 h-7 md:w-8 md:h-8 text-primary" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center justify-center rounded-md bg-primary px-2 py-0.5 text-xs md:text-sm font-extrabold uppercase tracking-wide text-primary-foreground">
                    WPT
                  </span>
                  <h3 className="text-base md:text-2xl font-extrabold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                    Weight Permanence Triangle™
                  </h3>
                </div>
                <p className="mt-1 text-sm md:text-base font-semibold text-primary">Psychology + Behaviour Training</p>
                <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm font-semibold text-[hsl(0_0%_20%)]">
                  <li>Awareness</li>
                  <li className="text-primary" aria-hidden="true">·</li>
                  <li>Practice</li>
                  <li className="text-primary" aria-hidden="true">·</li>
                  <li>Permanence</li>
                </ul>
              </div>
            </div>
          </a>

          <ChevronDown className="w-6 h-6 text-primary" aria-hidden="true" />

          {/* STOP WEIGHT REGAIN outcome */}
          <div className="relative w-full">
            <div className="absolute -inset-4 bg-accent/20 blur-2xl rounded-full -z-10" aria-hidden="true" />
            <div className="flex items-center gap-4 md:gap-6 rounded-full border-2 border-accent bg-accent/15 px-5 py-4 md:px-8 md:py-6 animate-pulse-glow">
              <Target className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 text-accent" aria-hidden="true" />
              <span className="block h-10 md:h-14 w-px bg-accent/40" aria-hidden="true" />
              <span className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-accent leading-none">
                Stop Weight Regain
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm md:text-base text-[hsl(0_0%_20%)] mt-8 md:mt-10">
          Food system fuels you. Behaviour system keeps it off. Together, they{" "}
          <span className="text-accent font-bold">stop the restart cycle.</span>
        </p>
      </div>
    </section>
  );
}
