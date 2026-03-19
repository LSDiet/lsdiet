export function CorePrincipleSection() {
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

  return (
    <section className="section-dark py-14 md:py-20">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Why Weight Loss Fails
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              3 Problems Most Diets{" "}
              <span className="text-accent">Ignore</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.keyword}
                className="bg-[hsl(0_0%_10%)] rounded-xl border border-[hsl(0_0%_18%)] p-6 md:p-8 flex flex-col text-center items-center gap-3"
              >
                <p className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground">
                  {card.keyword}
                </p>
                <p className="text-sm text-[hsl(0_0%_70%)] leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
