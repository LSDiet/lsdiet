import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function CorePrincipleSection() {
  const { ref: coreRef, isVisible: coreVisible } = useScrollAnimation();

  return (
    <section className="py-5">
      <div className="container">
        <div 
          ref={coreRef}
          className={`max-w-6xl mx-auto transition-all duration-700 ${
            coreVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-4">
              <span className="text-sm font-medium text-accent">The Core Principle</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-normal mb-2 text-primary">
              Low-Starch. Low-Sugar.
            </h3>
            <p className="text-muted-foreground italic">(Simple, but not easy.)</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* The Biology Problem Card */}
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border flex flex-col">
              <h4 className="text-sm font-semibold text-primary/70 uppercase tracking-wide mb-4 text-center">The <span className="font-bold text-primary">Biology</span> Problem</h4>
              <p className="text-muted-foreground mb-4">
                Your body runs on two main fuels: <span className="font-bold text-primary">sugar and fat</span>.
              </p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-primary">
                    <span className="font-semibold text-red-500">HIGH</span> sugar → fat stays stored
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-primary">
                    <span className="font-semibold text-green-500">LOW</span> sugar → body burns fat
                  </span>
                </li>
              </ul>
              <div className="bg-muted/40 rounded-lg p-4 flex-grow">
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  The body prioritizes sugar when it's readily available. When sugar drops, it naturally shifts toward using fat for energy. <span className="font-medium text-primary">When this process is disrupted, hunger stays high.</span>
                </p>
              </div>
              
              {/* Rhetorical question hook */}
              <div className="mt-6 pt-5 border-t border-border/50">
                <p className="text-center text-base font-serif text-primary/80">
                  <span className="text-accent text-2xl leading-none">"</span>
                  <span className="italic">Why does eating less sugar feel harder than willpower alone can explain?</span>
                  <span className="text-accent text-2xl leading-none">"</span>
                </p>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  ↗ The answer lies in more than biology
                </p>
              </div>
            </div>

            {/* The Culture Problem Card */}
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border flex flex-col">
              <h4 className="text-sm font-semibold text-primary/70 uppercase tracking-wide mb-4 text-center">The <span className="font-bold text-primary">Culture</span> Problem</h4>
              <p className="text-muted-foreground mb-4">
                Many cultures centre meals around <span className="font-bold text-primary">starch-based staples</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🥖 Bread</span>
                <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🍚 Rice</span>
                <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🍝 Pasta</span>
                <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🍜 Noodles</span>
                <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🌽 Corn</span>
              </div>
              <div className="bg-muted/40 rounded-lg p-4 flex-grow">
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  Eating differently often means pushing against tradition, family expectations, and <span className="font-bold text-primary">social norms</span>.
                </p>
              </div>
              
              {/* Rhetorical question hook */}
              <div className="mt-6 pt-5 border-t border-border/50">
                <p className="text-center text-base font-serif text-primary/80">
                  <span className="text-accent text-2xl leading-none">"</span>
                  <span className="italic">What happens when your plate contradicts your heritage?</span>
                  <span className="text-accent text-2xl leading-none">"</span>
                </p>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  ↗ Culture shapes cravings more than we think
                </p>
              </div>
            </div>

            {/* The Environment Problem Card */}
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border flex flex-col">
              <h4 className="text-sm font-semibold text-primary/70 uppercase tracking-wide mb-4 text-center">The <span className="font-bold text-primary">Environment</span> Problem</h4>
              <p className="text-muted-foreground mb-4">
                We live in a food environment dominated by <span className="font-bold text-primary">ultra-processed products</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                <span className="px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-600 text-xs font-medium">
                  🍭 Hyper-palatable
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 text-xs font-medium">
                  💵 Low Cost
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 text-xs font-medium">
                  📍 Highly Accessible
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-600 text-xs font-medium">
                  🔁 Habit
                </span>
              </div>
              <div className="bg-muted/40 rounded-lg p-4 flex-grow">
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  These products are everywhere. They are much more affordable than whole foods, engineered to be irresistible, and hard to avoid. Like, <span className="font-bold text-primary">really hard to avoid!</span>
                </p>
              </div>
              
              {/* Rhetorical question hook */}
              <div className="mt-6 pt-5 border-t border-border/50">
                <p className="text-center text-base font-serif text-primary/80">
                  <span className="text-accent text-2xl leading-none">"</span>
                  <span className="italic">How do you resist what's designed to be irresistible?</span>
                  <span className="text-accent text-2xl leading-none">"</span>
                </p>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  ↗ The deck is stacked against willpower
                </p>
              </div>
            </div>
          </div>

          {/* Transition Statement */}
          <div className="text-center mt-12 mb-4">
            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl font-serif text-primary/90 leading-relaxed">
                When eating behaviour is shaped by <span className="font-semibold text-accent">biology</span>, <span className="font-semibold text-accent">culture</span>, and <span className="font-semibold text-accent">environment</span>, it cannot be changed with a single tactic.
                <span className="block mt-3">
                  <span className="inline-flex items-center gap-2 text-accent font-semibold">
                    It requires a system.
                    <span className="animate-pulse text-xl">↓</span>
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
