const cards = [
  {
    keyword: "Psychology",
    text: (
      <>
        Why do people who want to lose weight and have a goal still fail? Without your intrinsic <span className="font-bold text-accent">push</span> and <span className="font-bold text-accent">pull</span> <span className="font-bold text-foreground">motivation</span>, weight loss will always fail.
      </>
    ),
  },
  {
    keyword: "Biology",
    text: (
      <>
        Too many programs force <span className="font-bold text-accent">mechanistic eating</span> by dictating what, when, and how much you eat. But we're all <span className="font-bold text-foreground">biologically different</span>, and one plan can't fit every body.
      </>
    ),
  },
  {
    keyword: "Environment",
    text: (
      <>
        Too often dieters return to their <span className="font-bold text-accent">old habits</span> when <span className="font-bold text-foreground">life gets busy and becomes stressful</span>.
      </>
    ),
  },
];

export function CorePrincipleSection() {
  return (
    <section className="section-dark py-14 md:py-20">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              The Restart Cycle
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              Why People <span className="text-accent">Restart</span> Weight Loss
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mb-12 space-y-4 text-[hsl(0_0%_78%)] leading-relaxed text-base md:text-lg text-center md:text-left">
            <p>
              Almost everyone who loses weight regains it. The restart cycle isn't a willpower failure — it's
              structural. Conventional diets address food but ignore the psychology, biology, and environment
              that drive eating behaviour. As soon as life gets stressful, the old patterns return and the weight
              comes back. <strong className="text-foreground">LS Diet</strong> targets the three problems below with
              a low-starch, low-sugar lifestyle and the Weight Permanence Triangle™, so behavioural permanence
              replaces the restart loop.
            </p>
            <p className="text-sm">
              <a href="/faq" className="text-accent hover:underline font-medium">
                See frequently asked questions about the restart cycle →
              </a>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-start">
            {cards.map((card) => (
              <div
                key={card.keyword}
                className="flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-background/70 p-6 text-center backdrop-blur-sm md:p-8"
              >
                <p className="text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
                  {card.keyword}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
