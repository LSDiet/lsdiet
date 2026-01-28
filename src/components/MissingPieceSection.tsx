import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

const cycleSteps = [
  "High glucose food",
  "Body craves more",
  "Hungry more often",
  "More starch & processed food",
];

function GlucoseCycleDiagram() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="flex justify-center mb-8">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Center text */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="text-center">
            <span className="text-sm md:text-base font-semibold text-destructive/80">The Vicious</span>
            <br />
            <span className="text-lg md:text-xl font-bold text-destructive">Cycle</span>
          </div>
        </div>
        
        {/* Circular arrows/path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="hsl(var(--destructive) / 0.2)"
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
          />
        </svg>

        {/* Cycle steps positioned around the circle */}
        {cycleSteps.map((step, index) => {
          const angle = (index * 90 - 45) * (Math.PI / 180);
          const radius = 42;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          
          return (
            <div
              key={index}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-center max-w-[90px] md:max-w-[110px]">
                <span className="text-[10px] md:text-xs text-destructive/90 font-medium leading-tight block">
                  {step}
                </span>
              </div>
              {/* Arrow to next step */}
              <div 
                className="absolute text-destructive/50"
                style={{
                  transform: `rotate(${index * 90 + 45}deg)`,
                  right: index === 0 || index === 3 ? '-12px' : 'auto',
                  left: index === 1 || index === 2 ? '-12px' : 'auto',
                  top: '50%',
                  marginTop: '-6px',
                }}
              >
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeroSolutionReveal() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="text-center mb-8">
      {/* Breaking the cycle */}
      <div 
        className={`inline-flex items-center gap-2 mb-4 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Zap className="w-5 h-5 text-accent" />
        <span className="text-sm font-medium text-muted-foreground">Breaking the cycle</span>
        <Zap className="w-5 h-5 text-accent" />
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

          {/* The Problem */}
          <div className="bg-card/50 backdrop-blur rounded-2xl p-5 md:p-6 border border-border/50 mb-4 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Veggie cleanses, carnivore, intermittent fasting, daily exercise. I followed the <strong>"eat less, exercise more"</strong> rule for years. They all worked until they stopped working...
            </p>
          </div>

          {/* The Lightbulb Moment */}
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 md:p-6 mb-4 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
              In 2025, after interviewing a bariatric surgeon for a project, he explained the pros and cons of different bariatric surgeries. He confirmed that surgery alone isn't a permanent fix — if patients continue their old eating habits, they will gain the weight back. That's when a thought struck me.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              <em className="text-primary font-medium">"I hate being hungry when I lose weight... what if there is a way to stay full and burn fat? Is that biologically possible?"</em>
            </p>
          </div>

          {/* The Discovery */}
          <div className="bg-card/50 backdrop-blur rounded-2xl p-5 md:p-6 border border-border/50 mb-6 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              So I began learning how fat is formed, stored, and burned. I spent more than eight months testing the variables until I found a pattern where I see my weight drops without starvation.
            </p>
          </div>

          {/* Transitional Bridge Line */}
          <p className="text-center text-base md:text-lg text-muted-foreground mb-6">
            The latest data shows this is a widespread challenge:
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

          {/* The Vicious Cycle */}
          <div className="text-center mb-4">
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              For most, the missing link is <span className="font-semibold text-primary">hunger</span> and <span className="font-semibold text-primary">eating the wrong food</span>. Here's the cycle:
            </p>
          </div>

          {/* Circular Glucose Cycle Diagram */}
          <GlucoseCycleDiagram />

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
