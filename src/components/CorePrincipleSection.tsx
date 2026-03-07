export function CorePrincipleSection() {
  return (
    <section className="section-dark py-14 md:py-20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
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
            {/* The Motivation Problem */}
            <div className="bg-[hsl(0_0%_10%)] rounded-xl p-6 md:p-8 border border-[hsl(0_0%_18%)] flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-4 text-center">
                The Motivation Problem
              </h4>
              <p className="text-[hsl(0_0%_70%)] mb-4 text-sm">
                People say they lack <span className="font-bold text-[hsl(0_0%_96%)]">motivation</span>.
              </p>
              <p className="text-[hsl(0_0%_70%)] mb-5 text-sm">
                What they really lack is <span className="font-bold text-accent">clarity</span>.
              </p>
              <div className="bg-[hsl(0_0%_14%)] rounded-lg p-4 flex-grow">
                <p className="text-xs text-[hsl(0_0%_56%)] leading-relaxed text-center">
                  Without it, eating what feels good will always beat eating what is <span className="font-medium text-[hsl(0_0%_80%)]">right</span>.
                </p>
              </div>
            </div>

            {/* The Daily Choice Problem */}
            <div className="bg-[hsl(0_0%_10%)] rounded-xl p-6 md:p-8 border border-[hsl(0_0%_18%)] flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-4 text-center">
                The Daily Choice Problem
              </h4>
              <p className="text-[hsl(0_0%_70%)] mb-4 text-sm">
                Weight loss is shaped by <span className="font-bold text-[hsl(0_0%_96%)]">moment-to-moment</span> food choices.
              </p>
              <p className="text-[hsl(0_0%_70%)] mb-5 text-sm">
                Most people try a diet briefly, then drift back to <span className="font-bold text-[hsl(0_0%_96%)]">familiar foods</span>.
              </p>
              <div className="bg-[hsl(0_0%_14%)] rounded-lg p-4 flex-grow">
                <p className="text-xs text-[hsl(0_0%_56%)] leading-relaxed text-center">
                  Progress stops before <span className="font-medium text-[hsl(0_0%_80%)]">results appear</span>.
                </p>
              </div>
            </div>

            {/* The Relapse Problem */}
            <div className="bg-[hsl(0_0%_10%)] rounded-xl p-6 md:p-8 border border-[hsl(0_0%_18%)] flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-4 text-center">
                The Relapse Problem
              </h4>
              <p className="text-[hsl(0_0%_70%)] mb-4 text-sm">
                When <span className="font-bold text-[hsl(0_0%_96%)]">stress, travel, or social pressure</span> hits, routines break.
              </p>
              <p className="text-[hsl(0_0%_70%)] mb-5 text-sm">
                Old habits return. The weight <span className="font-bold text-accent">slowly comes back</span>.
              </p>
              <div className="bg-[hsl(0_0%_14%)] rounded-lg p-4 flex-grow">
                <p className="text-xs text-[hsl(0_0%_56%)] leading-relaxed text-center">
                  Without a system to <span className="font-medium text-[hsl(0_0%_80%)]">catch the slide</span>, relapse is inevitable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
