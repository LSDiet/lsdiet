import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
import { CircularHungerCycle } from "./CircularHungerCycle";

function HeroSolutionReveal() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="text-center mb-8">
      {/* Breaking the cycle */}
      <div 
        className={`inline-flex items-center gap-3 mb-5 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Zap className="w-6 h-6 text-accent" />
        <span className="text-lg md:text-xl font-semibold text-accent">Breaking the Cycle</span>
        <Zap className="w-6 h-6 text-accent" />
      </div>

      {/* Hero reveal */}
      <div 
        className={`bg-gradient-to-r from-primary/10 via-accent/15 to-primary/10 border border-accent/30 rounded-2xl p-5 md:p-6 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          After months of trial and error, I realised that{" "}
          <span 
            className={`inline-block font-bold text-primary text-lg md:text-xl transition-all duration-500 delay-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            low-starch, low-sugar
          </span>{" "}
          is the healthiest and most sustainable method to lose weight and build muscle simultaneously — without starvation for a single day.
        </p>
      </div>
    </div>
  );
}

const equationSteps = [
  { text: "Lower starch & sugar", variant: "start" },
  { text: "Lower insulin", variant: "middle" },
  { text: "Fat burning", subtitle: "(fat mobilization and oxidation)", variant: "middle" },
  { text: "Less hunger", variant: "key" },
  { text: "Eat less naturally", variant: "end" },
];

function EquationFlow() {
  const { ref, isVisible } = useScrollAnimation();
  const isMobile = useIsMobile();

  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "start":
        return "bg-primary/8 text-primary/90 font-medium";
      case "middle":
        return "bg-muted/60 text-muted-foreground";
      case "key":
        return "bg-accent/20 text-accent-foreground font-medium";
      case "end":
        return "bg-primary/12 text-primary font-medium";
      default:
        return "bg-muted/50 text-muted-foreground";
    }
  };

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2"
    >
      {equationSteps.map((step, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center gap-1.5 md:gap-2">
          <span
            className={`px-3 py-1.5 rounded-md text-xs md:text-sm transition-all duration-700 text-center ${getVariantClasses(step.variant)} ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <span className="block">{step.text}</span>
            {step.subtitle && (
              <span className="block text-[10px] md:text-xs opacity-70 font-normal">{step.subtitle}</span>
            )}
          </span>
          {index < equationSteps.length - 1 && (
            <span
              className={`text-muted-foreground/50 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 80 + 40}ms` }}
            >
              {isMobile ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function CountUpNumber({ target, isVisible }: { target: number; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span>{count}%</span>;
}

function CountUpMultiplier({ target, isVisible }: { target: number; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span>{count}×</span>;
}

export function MissingPieceSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: statRef, isVisible: statVisible } = useScrollAnimation();
  const { ref: stat2Ref, isVisible: stat2Visible } = useScrollAnimation();
  const { ref: stat3Ref, isVisible: stat3Visible } = useScrollAnimation();
  const { ref: stat4Ref, isVisible: stat4Visible } = useScrollAnimation();

  return (
    <section className="py-5 bg-secondary/30">
      <div className="container">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section Badge */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25">
              <span className="text-sm font-medium text-accent">The Missing Piece</span>
            </div>
          </div>

          {/* The Surgeon Story - Visual Narrative */}
          <div className="space-y-4 mb-6">
            {/* Story opener */}
            <div className="bg-card/50 backdrop-blur rounded-2xl p-5 md:p-6 border border-border/50">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                In 2025, I interviewed a bariatric surgeon for a project.
              </p>
            </div>
            
            {/* The surprise */}
            <div className="bg-accent/5 border-l-4 border-accent/40 rounded-r-xl p-5 md:p-6 ml-4 md:ml-8">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                What surprised me wasn't the surgery itself — <span className="text-primary font-medium">it was what happened after.</span>
              </p>
            </div>
            
            {/* The insight */}
            <div className="bg-card/50 backdrop-blur rounded-2xl p-5 md:p-6 border border-border/50">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                He explained that <span className="font-bold text-primary">20–35%</span> of patients experience significant weight regain within 2–10 years. Not because the surgery failed, but because certain foods <span className="text-primary font-medium">re-trigger hunger hormones and reward pathways</span>, overriding the biological advantages of the procedure.
              </p>
            </div>
            
            {/* The seed */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 md:p-6 text-center">
              <p className="text-sm text-muted-foreground/80 italic mb-3">
                That conversation planted a simple but uncomfortable question:
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                <em className="text-primary font-semibold">"Why does every weight loss method eventually turn into a fight with hunger?"</em>
              </p>
            </div>
          </div>

          {/* The Discovery */}
          <div className="bg-card/50 backdrop-blur rounded-2xl p-5 md:p-6 border border-border/50 mb-6 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              So I began learning how fat is formed, stored, and burned. I spent more than eight months testing the variables until I found a pattern — one where my weight dropped without ever feeling starved.
            </p>
          </div>

          {/* Transitional Bridge Line */}
          <p className="text-center text-base md:text-lg text-muted-foreground mb-6">
            Of all the clinical insights he shared, one dataset struck me like thunder:
          </p>

          {/* Health Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* 40% Obesity */}
            <div ref={statRef} className="flex items-center gap-4 bg-card/30 rounded-xl p-4 border border-border/30">
              <div className="text-4xl md:text-5xl font-bold text-accent shrink-0">
                <CountUpNumber target={40} isVisible={statVisible} />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                of adults struggle with <span className="font-semibold">obesity</span>.
              </p>
            </div>

            {/* 23% Diabetes */}
            <div ref={stat2Ref} className="flex items-center gap-4 bg-card/30 rounded-xl p-4 border border-border/30">
              <div className="text-4xl md:text-5xl font-bold text-accent shrink-0">
                <CountUpNumber target={23} isVisible={stat2Visible} />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                of U.S. adults with obesity have diagnosed <span className="font-semibold">diabetes</span>.
              </p>
            </div>

            {/* 58% High Blood Pressure */}
            <div ref={stat3Ref} className="flex items-center gap-4 bg-card/30 rounded-xl p-4 border border-border/30">
              <div className="text-4xl md:text-5xl font-bold text-accent shrink-0">
                <CountUpNumber target={58} isVisible={stat3Visible} />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                of adults with obesity have <span className="font-semibold">high blood pressure</span>.
              </p>
            </div>

            {/* 4x Knee Osteoarthritis */}
            <div ref={stat4Ref} className="flex items-center gap-4 bg-card/30 rounded-xl p-4 border border-border/30">
              <div className="text-4xl md:text-5xl font-bold text-accent shrink-0">
                <CountUpMultiplier target={4} isVisible={stat4Visible} />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                more likely to develop <span className="font-semibold">knee osteoarthritis</span>.
              </p>
            </div>
          </div>

          {/* Q&A Reference */}
          <p className="text-center text-sm text-muted-foreground mb-8">
            <a href="/qa" className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors">
              See the full list of how obesity is making you sick →
            </a>
          </p>

          {/* The Hunger Cycle */}
          <div className="text-center mb-4">
            <p className="text-base md:text-lg text-muted-foreground mb-3">
              The pattern behind these numbers? It's not laziness or lack of willpower.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              It's a cycle driven by <span className="font-semibold text-primary">hunger</span> and <span className="font-semibold text-primary">the wrong foods</span>:
            </p>
          </div>

          {/* Circular Hunger Cycle */}
          <CircularHungerCycle />

          {/* Hero Solution Reveal */}
          <HeroSolutionReveal />
        </div>

        {/* Equation Label */}
        <p className="text-center text-base md:text-lg text-muted-foreground mb-5">
          Here's how:
        </p>

        {/* Equation Flow Diagram */}
        <div className="max-w-4xl mx-auto mb-5">
          <EquationFlow />
        </div>

        {/* Clarifier */}
        <p className="text-center text-sm text-muted-foreground italic max-w-2xl mx-auto mb-8">
          (Calories still matter. But when hunger is regulated, food intake naturally decreases.)
        </p>

        {/* The Insight */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card/50 backdrop-blur rounded-2xl p-5 md:p-6 border border-border/50 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Weight loss is not just about eating less and exercising more, but about{" "}
              <span className="font-semibold text-primary">
                eating right and moving in ways that make sense within your culture, access, and physical reality.
              </span>
            </p>
          </div>
        </div>

        {/* Transition to Core Principle */}
        <div className="text-center mt-3">
          <div className="inline-flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground italic">
              What does this actually look like in practice?
            </p>
            <ChevronDown className="w-5 h-5 text-accent animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
