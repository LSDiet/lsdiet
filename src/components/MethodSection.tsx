import { Eye, Activity, Lock } from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "Awareness",
    description: "Five stages of awareness to clarify why weight loss matters beyond the scale and encode it as an internal priority.",
  },
  {
    icon: Activity,
    title: "Practice",
    description: "Daily actions that reinforce a low-starch, low-sugar identity and keep health the top priority.",
  },
  {
    icon: Lock,
    title: "Permanence",
    description: "Internalized systems that keep decisions stable so behaviour follows structure rather than emotion when external cues change.",
  },
];

export function MethodSection() {
  return (
    <section id="method" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-6">
            <span className="text-sm font-medium text-accent">The Method</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 text-primary">
            The Weight Permanence Triangle™
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Three interconnected principles that keep weight loss prioritized even when life gets busy. When it becomes the primary reference point in your brain, daily choices around food, movement, and recovery align without external reminders.
          </p>
        </div>

        {/* Triangle visualization */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
          {principles.map((principle, index) => (
            <div key={principle.title} className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <principle.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{principle.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>

        {/* Core principle */}
        <div className="max-w-2xl mx-auto text-center bg-card rounded-3xl p-8 md:p-12 border border-border">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-4">
            <span className="text-sm font-medium text-accent">The Core Principle</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-normal mb-2 text-primary">
            Low Starch. Low Sugar.
          </h3>
          <p className="text-muted-foreground italic mb-6">(Simple, but not easy.)</p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            No complicated formulas. No expensive supplements. Just understanding how starch and sugar influence fat storage, and choosing food accordingly.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hunger is biological, not a lack of discipline. And when a multibillion-dollar ultra-processed food industry amplifies it, willpower alone is never going to win.
          </p>
        </div>
      </div>
    </section>
  );
}
