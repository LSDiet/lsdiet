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
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Why Weight Loss Fails
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              3 Problems Most Diets <span className="text-accent">Ignore</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
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
