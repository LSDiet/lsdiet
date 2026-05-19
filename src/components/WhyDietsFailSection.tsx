const breakdownCards = [
  {
    n: "01",
    title: "The food layer alone is not enough",
    desc: "Calorie math collapses the moment cravings come back. Insulin friendly eating is the floor, not the ceiling.",
    href: "/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting",
  },
  {
    n: "02",
    title: "Awareness is the missing motivation engine",
    desc: "Without an internal alarm, you stop noticing the slide until the scale climbs back.",
    href: "/blog/reality-awareness",
  },
  {
    n: "03",
    title: "Permanence is what stops the next regain",
    desc: "An identity and a daily action loop are what keep results in place when life gets hard.",
    href: "/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight",
  },
];

export function WhyDietsFailSection() {
  return (
    <section id="why-diets-fail" className="py-14 md:py-20">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The Long Term Problem
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            Why Diets <span className="text-accent">Fail Long Term</span>
          </h2>
        </div>
        <div className="space-y-4 text-[hsl(0_0%_15%)] leading-relaxed text-base md:text-lg">
          <p>
            Most diets work for a while. The scale moves, clothes fit, and confidence returns. Then life
            happens, willpower fades, and the weight comes back faster than it left. We call this the{" "}
            <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline font-medium">
              restart cycle
            </a>
            , and a{" "}
            <a href="/what-is-ls-diet" className="text-accent hover:underline font-medium">
              low-starch low-sugar
            </a>{" "}
            food plan alone will not stop it. What is missing is the{" "}
            <a href="/weight-permanence-triangle" className="text-accent hover:underline font-medium">
              behavioural infrastructure
            </a>{" "}
            underneath the meals.
          </p>
          <p>
            <strong className="text-foreground">LS Diet</strong> is built differently. The food plan removes the biological cravings that
            break willpower. The{" "}
            <a href="/awareness-stages" className="text-accent hover:underline font-medium">
              five stages of awareness
            </a>{" "}
            create the urgency to act, and{" "}
            <a href="/blog/action-practice" className="text-accent hover:underline font-medium">
              daily action practice
            </a>{" "}
            turns that urgency into habits that survive stress, travel, and injury. It is the same method{" "}
            <a href="/oscar-poon" className="text-accent hover:underline font-medium">
              Oscar Poon
            </a>{" "}
            now uses to keep 80+ lbs off for good.
          </p>
        </div>

        {/* Three failure points */}
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent text-center mb-5">
            Where Diets Actually Break
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {breakdownCards.map((c) => (
              <a
                key={c.n}
                href={c.href}
                className="group block rounded-xl border border-border bg-card p-5 hover:border-accent/50 hover:shadow-md transition-all"
              >
                <div className="text-accent text-2xl font-extrabold tracking-tight mb-2">{c.n}</div>
                <h3 className="font-bold text-foreground mb-1.5 leading-snug">{c.title}</h3>
                <p className="text-[hsl(0_0%_30%)] text-sm leading-relaxed mb-3">{c.desc}</p>
                <span className="text-accent text-sm font-medium group-hover:underline">
                  Read the foundation →
                </span>
              </a>
            ))}
          </div>
        </div>

        <p className="text-center mt-10 text-base">
          <a href="/blog" className="text-accent hover:underline font-medium">
            See all LS Diet Foundations →
          </a>
        </p>
      </div>
    </section>
  );
}
