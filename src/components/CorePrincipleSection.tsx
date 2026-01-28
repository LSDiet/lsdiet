import { Utensils, Users, Store } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function CorePrincipleSection() {
  const { ref: coreRef, isVisible: coreVisible } = useScrollAnimation();

  return (
    <section className="py-5">
      <div className="container">
        <div 
          ref={coreRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
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

          <div className="grid md:grid-cols-2 gap-6">
            {/* The Biology Card */}
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
              <h4 className="text-sm font-semibold text-primary/70 uppercase tracking-wide mb-4">The Biology</h4>
              <p className="text-muted-foreground mb-4">When starch and sugar keep insulin elevated:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-primary">Your body favours fat storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-primary">Fat access is blocked</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-primary">Hunger stays high</span>
                </li>
              </ul>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Hunger is biological, not a lack of discipline. When that biology is deliberately amplified by a multibillion-dollar ultra-processed food industry built for repeat consumption, willpower alone will never win.
              </p>
            </div>

            {/* The Challenge Card */}
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
              <h4 className="text-sm font-semibold text-primary/70 uppercase tracking-wide mb-4">The Challenge</h4>
              <p className="text-muted-foreground mb-4">Low-starch and low-sugar looks like a food swap on the surface. In reality, it reshapes:</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <Utensils className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-primary">What to eat and when — meal timing, food choices, and portion instincts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-primary">How you navigate cultural traditions and family expectations around food</span>
                </li>
                <li className="flex items-start gap-3">
                  <Store className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-primary">A food environment where ultra-processed products outnumber whole foods on every shelf</span>
                </li>
              </ul>
              <div className="border-t border-border pt-4 text-center">
                <p className="text-muted-foreground text-sm mb-2">Weight loss is not just a diet change.</p>
                <p className="text-primary text-sm">
                  It is a <span className="font-semibold text-primary">personal</span>, <span className="font-semibold text-accent">social</span>, and <span className="font-semibold text-primary">environmental</span> challenge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
