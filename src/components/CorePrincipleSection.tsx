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
              <div className="bg-muted/40 rounded-lg p-4 border-l-2 border-accent/50">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The body prioritizes sugar when it's readily available. When sugar drops, it naturally shifts toward using fat for energy. <span className="font-medium text-primary">When this process is disrupted, hunger stays high.</span>
                </p>
              </div>
              
              {/* Rhetorical question hook */}
              <div className="mt-6 pt-5 border-t border-border/50">
                <p className="text-center text-base md:text-lg font-serif text-primary/80">
                  <span className="text-accent text-2xl leading-none">"</span>
                  <span className="italic">Why does eating less sugar feel harder than it should?</span>
                  <span className="text-accent text-2xl leading-none">"</span>
                </p>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  ↗ The answer lies in more than biology
                </p>
              </div>
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
                <p className="text-primary text-sm md:text-base font-medium">
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
