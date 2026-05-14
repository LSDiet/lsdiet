export function AwarenessStagesSection() {
  return (
    <section id="awareness-stages" className="section-dark py-14 md:py-20">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Inside Awareness
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            The 5 <span className="text-accent">Awareness Stages</span>
          </h2>
        </div>
        <div className="space-y-4 text-[hsl(0_0%_82%)] leading-relaxed text-base md:text-lg">
          <p>
            Awareness is the first vertex of the Weight Permanence Triangle™ inside LS Diet, and it moves through
            five distinct stages. Each stage builds the clarity that makes a low-starch, low-sugar lifestyle feel
            like an obvious choice rather than a daily fight.
          </p>
          <ol className="space-y-3 list-decimal list-inside pl-2">
            <li><strong className="text-foreground">Reality Awareness</strong> — establishing your honest baseline: weight, habits, and the gap between who you are and who you want to be.</li>
            <li><strong className="text-foreground">Friction Awareness</strong> — recognising the daily resistance points that quietly sabotage progress.</li>
            <li><strong className="text-foreground">Pattern Awareness</strong> — examining the how, who, what, when, and why of your eating behaviour.</li>
            <li><strong className="text-foreground">Consequence Awareness</strong> — the root of <span className="text-accent">push motivation</span>: clarity on what staying the same will cost you.</li>
            <li><strong className="text-foreground">Identity Awareness</strong> — the root of <span className="text-accent">pull motivation</span>: becoming the person for whom LS Diet is simply how they live.</li>
          </ol>
          <p>
            Together, push and pull motivation produce behavioural permanence — the difference between losing weight
            once and never restarting again.
          </p>
          <p>
            <a href="/awareness-stages" className="text-accent hover:underline font-medium">
              Explore the 5 Awareness Stages in depth →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
