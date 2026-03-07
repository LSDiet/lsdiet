export function CorePrincipleSection() {
  const cards = [
    {
      keyword: "Motivation",
      title: "The Motivation Problem",
      lines: [
        <>People say they lack <span className="font-bold text-foreground">motivation</span>.</>,
        <>What they really lack is <span className="font-bold text-accent">clarity</span>.</>,
      ],
      takeaway: <>Without clarity, eating what feels good always beats eating what is <span className="font-semibold text-[hsl(0_0%_80%)]">right</span>.</>,
    },
    {
      keyword: "Daily Choice",
      title: "The Daily Choice Problem",
      lines: [
        <>Weight loss is shaped by <span className="font-bold text-accent">moment-to-moment food choices</span>.</>,
        <>Most people try a diet briefly, then drift back to <span className="font-bold text-foreground">familiar foods</span>.</>,
      ],
      takeaway: <>Progress stops before <span className="font-semibold text-[hsl(0_0%_80%)]">results appear</span>.</>,
    },
    {
      keyword: "Old Habit",
      title: "The Old Habit Problem",
      lines: [
        <>When <span className="font-bold text-foreground">stress, travel, or social pressure</span> hits, routines break.</>,
        <><span className="font-bold text-accent">Old habits return.</span> The weight slowly comes back.</>,
      ],
      takeaway: <>Without a system to <span className="font-semibold text-[hsl(0_0%_80%)]">catch the slide</span>, relapse is inevitable.</>,
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
                key={card.title}
                className="bg-[hsl(0_0%_10%)] rounded-xl border border-[hsl(0_0%_18%)] flex flex-col text-center"
              >
                {/* Top content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center gap-3">
                  <p className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground mb-1">
                    {card.keyword}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent mb-2">
                    {card.title}
                  </p>
                  {card.lines.map((line, i) => (
                    <p key={i} className="text-sm text-[hsl(0_0%_70%)] leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Takeaway strip */}
                <div className="bg-[hsl(0_0%_14%)] rounded-b-xl px-6 py-4">
                  <p className="text-xs text-[hsl(0_0%_56%)] leading-relaxed">
                    {card.takeaway}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
