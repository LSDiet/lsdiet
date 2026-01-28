import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

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

export function MissingPieceSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: statRef, isVisible: statVisible } = useScrollAnimation();

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

          {/* The Problem */}
          <div className="bg-card/50 backdrop-blur rounded-2xl p-5 md:p-6 border border-border/50 mb-4 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Veggie cleanses, carnivore, intermittent fasting, daily exercise. I followed the <strong>"eat less, exercise more"</strong> rule for years. They all worked until they stopped working...
            </p>
          </div>

          {/* The Lightbulb Moment */}
          <div className="border-l-4 border-accent/60 bg-accent/5 rounded-r-xl p-5 md:p-6 mb-4">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
              In 2025, after interviewing a surgeon for an Endoscopic Sleeve Gastroplasty (ESG) project, a minimally invasive procedure that reduces stomach capacity by 70–80%, a thought struck me.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              <em className="text-primary font-medium">"I rebound not because I lack willpower, but because I had zero understanding of how fat actually functions in my body. I hate being hungry when I lose weight... what if there is a way to stay full and burn fat? Is that biologically possible?"</em>
            </p>
          </div>

          {/* The Discovery */}
          <div className="bg-card/50 backdrop-blur rounded-2xl p-5 md:p-6 border border-border/50 mb-6 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              I spent eight months learning how fat is formed, stored, and burned. I tested variables until I found the pattern. When I ate the right foods at the right times, paired with the right calorie expenditure, I stayed full every day and watched my weight drop consistently every month.
            </p>
          </div>

          {/* Transitional Bridge Line */}
          <p className="text-center text-base md:text-lg text-muted-foreground mb-6">
            And I'm not alone in this.
          </p>

          {/* Visual Statistic Callout */}
          <div ref={statRef} className="flex items-center justify-center gap-6 my-8">
            <div className="text-5xl md:text-6xl font-bold text-accent">
              <CountUpNumber target={40} isVisible={statVisible} />
            </div>
            <div className="text-muted-foreground text-left">
              <p className="text-base md:text-lg">of adults struggle with <span className="font-semibold">obesity</span>.</p>
              <p className="text-sm mt-1">This is more than a willpower problem. Biology and environment both play a role.</p>
            </div>
          </div>

          {/* Bridging Sentence */}
          <p className="text-center text-base md:text-lg text-muted-foreground mb-6">
            For most, the missing link is <span className="font-semibold text-primary">hunger itself</span>. When hunger wins, diets fail.
          </p>

          {/* Visual Separator */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              <div className="w-1 h-1 rounded-full bg-accent/40" />
            </div>
          </div>

          {/* Equation Intro - The Discovery Reveal */}
          <div className="text-center mb-6">
            <p className="text-base md:text-lg text-muted-foreground mb-2">
              Feeling hungry all the time?
            </p>
            <p className="text-lg md:text-xl text-primary font-semibold">
              Here's what I discovered:
            </p>
            <p className="text-base md:text-lg text-primary/90 mt-2 max-w-xl mx-auto">
              A <span className="font-bold">low-starch, low-sugar</span> lifestyle lets you eat until full — and still lose weight.
            </p>
          </div>
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

        {/* Transition to Method */}
        <div className="text-center mt-3">
          <div className="inline-flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground italic">
              How does this insight actually turn into something usable?
            </p>
            <ChevronDown className="w-5 h-5 text-accent animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
