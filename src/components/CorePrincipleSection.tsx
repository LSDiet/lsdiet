export function CorePrincipleSection() {
  return (
    <section className="section-dark py-14 md:py-20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Why It's So Hard
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              3 Big <span className="text-accent">Problems</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* The Biology Problem Card */}
            <div className="bg-[hsl(0_0%_10%)] rounded-xl p-6 md:p-8 border border-[hsl(0_0%_18%)] flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-4 text-center">
                The Biology Problem
              </h4>
              <p className="text-[hsl(0_0%_70%)] mb-4 text-sm">
                Your body runs on two main fuels: <span className="font-bold text-[hsl(0_0%_96%)]">sugar and fat</span>.
              </p>
              <ul className="space-y-2 mb-5 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span className="text-[hsl(0_0%_80%)]">
                    <span className="font-bold text-red-400">HIGH</span> sugar → fat stays stored
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span className="text-[hsl(0_0%_80%)]">
                    <span className="font-bold text-green-400">LOW</span> sugar → body burns fat
                  </span>
                </li>
              </ul>
              <div className="bg-[hsl(0_0%_14%)] rounded-lg p-4 flex-grow">
                <p className="text-xs text-[hsl(0_0%_56%)] leading-relaxed text-center">
                  The body prioritizes sugar when it's readily available. When sugar drops, it naturally shifts toward using fat for energy. <span className="font-medium text-[hsl(0_0%_80%)]">When this process is disrupted, hunger stays high.</span>
                </p>
              </div>
            </div>

            {/* The Culture Problem Card */}
            <div className="bg-[hsl(0_0%_10%)] rounded-xl p-6 md:p-8 border border-[hsl(0_0%_18%)] flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-4 text-center">
                The Culture Problem
              </h4>
              <p className="text-[hsl(0_0%_70%)] mb-4 text-sm">
                Many cultures centre meals around <span className="font-bold text-[hsl(0_0%_96%)]">starch-based staples</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                <span className="px-3 py-1.5 rounded-full bg-[hsl(0_0%_16%)] text-[hsl(0_0%_64%)] text-xs">🥖 Bread</span>
                <span className="px-3 py-1.5 rounded-full bg-[hsl(0_0%_16%)] text-[hsl(0_0%_64%)] text-xs">🍚 Rice</span>
                <span className="px-3 py-1.5 rounded-full bg-[hsl(0_0%_16%)] text-[hsl(0_0%_64%)] text-xs">🍝 Pasta</span>
                <span className="px-3 py-1.5 rounded-full bg-[hsl(0_0%_16%)] text-[hsl(0_0%_64%)] text-xs">🍜 Noodles</span>
                <span className="px-3 py-1.5 rounded-full bg-[hsl(0_0%_16%)] text-[hsl(0_0%_64%)] text-xs">🌽 Corn</span>
              </div>
              <div className="bg-[hsl(0_0%_14%)] rounded-lg p-4 flex-grow">
                <p className="text-xs text-[hsl(0_0%_56%)] leading-relaxed text-center">
                  Eating differently often means pushing against tradition, family expectations, and <span className="font-bold text-[hsl(0_0%_80%)]">social norms</span>.
                </p>
              </div>
            </div>

            {/* The Environment Problem Card */}
            <div className="bg-[hsl(0_0%_10%)] rounded-xl p-6 md:p-8 border border-[hsl(0_0%_18%)] flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-4 text-center">
                The Environment Problem
              </h4>
              <p className="text-[hsl(0_0%_70%)] mb-4 text-sm">
                We live in a food environment dominated by <span className="font-bold text-[hsl(0_0%_96%)]">ultra-processed products</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                <span className="px-2.5 py-1 rounded-md bg-[hsl(0_0%_16%)] text-[hsl(0_0%_64%)] text-xs">🍭 Hyper-palatable</span>
                <span className="px-2.5 py-1 rounded-md bg-[hsl(0_0%_16%)] text-[hsl(0_0%_64%)] text-xs">💵 Low Cost</span>
                <span className="px-2.5 py-1 rounded-md bg-[hsl(0_0%_16%)] text-[hsl(0_0%_64%)] text-xs">📍 Accessible</span>
                <span className="px-2.5 py-1 rounded-md bg-[hsl(0_0%_16%)] text-[hsl(0_0%_64%)] text-xs">🔁 Habit</span>
              </div>
              <div className="bg-[hsl(0_0%_14%)] rounded-lg p-4 flex-grow">
                <p className="text-xs text-[hsl(0_0%_56%)] leading-relaxed text-center">
                  These products are everywhere. Affordable, engineered to be irresistible, and hard to avoid. Like, <span className="font-bold text-[hsl(0_0%_80%)]">really hard to avoid!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
