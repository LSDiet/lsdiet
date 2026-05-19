import { Beef, Brain } from "lucide-react";

export function WhatIsLSDietSection() {
  return (
    <section id="what-is-ls-diet" className="py-14 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The Methodology
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            What Is <span className="text-accent">LS Diet?</span>
          </h2>
        </div>

        {/* Two blocks */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <a
            href="/what-is-ls-diet"
            className="group block rounded-2xl border-2 border-border bg-card p-6 md:p-8 hover:border-accent transition-colors text-center"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
              <Beef className="w-7 h-7 text-accent" aria-hidden="true" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2">LS</p>
            <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground mb-2">
              Low-Starch<br/>Low-Sugar
            </h3>
            <p className="text-sm text-[hsl(0_0%_30%)] font-medium">Eat until full · No counting</p>
          </a>

          <a
            href="/weight-permanence-triangle"
            className="group block rounded-2xl border-2 border-border bg-card p-6 md:p-8 hover:border-accent transition-colors text-center"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
              <Brain className="w-7 h-7 text-accent" aria-hidden="true" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2">WPT</p>
            <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground mb-2">
              Weight Permanence<br/>Triangle™
            </h3>
            <p className="text-sm text-[hsl(0_0%_30%)] font-medium">Psychology + Behaviour Training</p>
          </a>
        </div>

        {/* Equation */}
        <div className="mt-8 text-center">
          <p className="inline-flex items-center gap-3 text-base md:text-xl font-extrabold uppercase tracking-tight text-foreground">
            <span className="text-accent">=</span>
            <span>Stop Weight Regain</span>
          </p>
        </div>

        <p className="text-center text-[hsl(0_0%_15%)] mt-6 text-base md:text-lg">
          LS Diet combines low-starch low-sugar eating with behavioural permanence training.
        </p>
      </div>
    </section>
  );
}
