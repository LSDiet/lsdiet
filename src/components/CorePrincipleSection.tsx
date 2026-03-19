export function CorePrincipleSection() {
  const cards = [
    {
      keyword: "Psychology",
      title: "The Psychology Problem",
      text: (
        <>
          Most diets force you to become a <span className="font-bold text-foreground">different person</span>. When your behaviour misaligns with how you <span className="font-bold text-accent">see yourself</span>, weight loss will always fail.
        </>
      ),
    },
    {
      keyword: "Biology",
      title: "The Biology Problem",
      text: (
        <>
          Too many programs force <span className="font-bold text-accent">mechanistic eating</span> by dictating what, when, and how much you eat. But we're all <span className="font-bold text-foreground">biologically different</span>, and one plan can't fit every body.
        </>
      ),
    },
    {
      keyword: "Environ\u00ADment",
      title: "The Environment Problem",
      text: (
        <>
          You skip gatherings and become <span className="font-bold text-foreground">"that person"</span> at dinner. When you <span className="font-bold text-accent">sacrifice more than you gain</span>, you burn out and old habits return.
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
                key={card.title}
                className="bg-[hsl(0_0%_10%)] rounded-xl border border-[hsl(0_0%_18%)] p-6 md:p-8 flex flex-col text-center justify-center gap-3"
              >
                <p className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground mb-1">
                  {card.keyword}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent mb-2">
                  {card.title}
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
