import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Zap, ChevronsRight, ChevronsLeft } from "lucide-react";
import imgTippingPoint from "@/assets/journey/202411-tipping-point.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
import { CircularHungerCycle } from "./CircularHungerCycle";
function KeyQuestionHook() {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  return <div ref={ref} className={`relative my-4 py-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/8 via-accent/5 to-transparent rounded-3xl" />
      
      {/* Decorative opening quote */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl md:text-7xl text-accent/60 font-serif select-none">
        "
      </span>
      
      {/* The Question */}
      <p className="relative text-center text-xl md:text-2xl lg:text-3xl font-semibold text-primary leading-snug max-w-2xl mx-auto px-4 pt-8 pb-6">
        "What was it about{" "}
        <span className="text-accent font-bold animate-pulse-glow">"normal"</span>{" "}
        eating<br />that kept pulling me back here?"
      </p>
      
      {/* Decorative closing quote */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-6xl md:text-7xl text-accent/60 font-serif select-none rotate-180">
        "
      </span>
    </div>;
}
const equationSteps = [{
  text: "Lower starch & sugar",
  variant: "start"
}, {
  text: "Lower insulin",
  variant: "middle"
}, {
  text: "Fat burning",
  subtitle: "(fat mobilization and oxidation)",
  variant: "middle"
}, {
  text: "Less hunger",
  variant: "key"
}, {
  text: "Eat less naturally",
  variant: "end"
}];
function EquationFlow() {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  const isMobile = useIsMobile();
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "start":
        return "bg-primary/8 text-primary/90 font-medium";
      case "middle":
        return "bg-muted/60 text-muted-foreground";
      case "key":
        return "bg-accent/30 text-accent font-semibold border border-accent/40";
      case "end":
        return "bg-primary/15 text-primary font-medium border border-primary/25";
      default:
        return "bg-muted/50 text-muted-foreground";
    }
  };
  return <div ref={ref} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
      {equationSteps.map((step, index) => <div key={index} className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
          <span className={`px-6 py-3 md:px-3 md:py-1.5 rounded-xl md:rounded-md text-base md:text-sm transition-all duration-700 text-center min-w-[200px] md:min-w-0 ${getVariantClasses(step.variant)} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{
        transitionDelay: `${index * 80}ms`
      }}>
            <span className="block font-medium">{step.text}</span>
            {step.subtitle && <span className="block text-sm md:text-xs opacity-70 font-normal mt-0.5">{step.subtitle}</span>}
          </span>
          {index < equationSteps.length - 1 && <span className={`text-muted-foreground/50 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{
        transitionDelay: `${index * 80 + 40}ms`
      }}>
              {isMobile ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </span>}
        </div>)}
    </div>;
}
function CountUpNumber({
  target,
  isVisible
}: {
  target: number;
  isVisible: boolean;
}) {
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
function CountUpMultiplier({
  target,
  isVisible
}: {
  target: number;
  isVisible: boolean;
}) {
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
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  const {
    ref: statRef,
    isVisible: statVisible
  } = useScrollAnimation();
  const {
    ref: stat2Ref,
    isVisible: stat2Visible
  } = useScrollAnimation();
  const {
    ref: stat3Ref,
    isVisible: stat3Visible
  } = useScrollAnimation();
  const {
    ref: stat4Ref,
    isVisible: stat4Visible
  } = useScrollAnimation();
  const {
    ref: transitionRef,
    isVisible: transitionVisible
  } = useScrollAnimation();
  const {
    ref: solutionRef,
    isVisible: solutionVisible
  } = useScrollAnimation();
  return <section className="py-5 bg-secondary/30">
      <div className="container">
        <div ref={ref} className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Section Badge */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25">
              <span className="text-sm font-medium text-accent">The Tipping Point</span>
            </div>
          </div>

          {/* Emotional Hook - Story Format */}
          <div className="bg-card/50 backdrop-blur rounded-2xl p-6 md:p-8 border border-border/50 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-3 items-stretch">
              {/* Photo */}
              <div className="mx-auto md:mx-0">
                <img 
                  src={imgTippingPoint} 
                  alt="Oscar at 300 lbs in 2024"
                  className="w-64 md:w-full aspect-[4/5] object-cover rounded-xl"
                />
              </div>
              
              {/* Story Text */}
              <div className="flex flex-col justify-center gap-4 text-center py-4">
                {/* The Weight */}
                <p className="text-xl md:text-2xl font-bold text-primary">In 2024, I was back at <span className="underline">300</span> lbs.</p>
                
                {/* The Defense */}
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  I was eating what I thought was normal.
                </p>
                
                {/* The Clarification - whispered defense */}
                <p className="text-sm md:text-base text-muted-foreground italic">
                  Not bingeing. Not giving up. Just living.
                </p>
                
                {/* The Frustration */}
                <p className="text-base md:text-lg font-bold text-primary">
                  Yet the weight kept coming back.
                </p>
                
                {/* The Shift - the tipping point moment */}
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed pt-2">
                  That was the moment I stopped blaming discipline and started questioning<br />
                  <span className="font-semibold text-accent animate-pulse-glow">
                    the food itself
                  </span>.
                </p>
              </div>
            </div>
          </div>


          {/* Health Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                of adults with obesity have diagnosed <span className="font-semibold">diabetes</span>.
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
              See the documented risks of obesity →
            </a>
          </p>


          {/* Breaking the Cycle + Pathway */}
          <div className="text-center mb-3 mt-4">
            {/* Visual separator */}
            <div className="w-24 h-px bg-border/60 mx-auto mb-3" />
            
            {/* Breaking the cycle header */}
            <div className="inline-flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-accent" />
              <span className="text-lg md:text-xl font-semibold text-accent">Breaking the Cycle: Start from Eating the Right Food</span>
              <Zap className="w-6 h-6 text-accent" />
            </div>
          </div>

          {/* Equation Label */}
          <p className="text-center text-lg md:text-xl font-bold text-primary mb-5">
            The Insulin-Fat Pathway:
          </p>

          {/* Equation Flow Diagram */}
          <div className="max-w-4xl mx-auto mb-5">
            <EquationFlow />
          </div>

          {/* Clarifier */}
          <p className="text-center text-sm text-muted-foreground italic max-w-2xl mx-auto mb-8">
            (Calories still matter. But when hunger is regulated, food intake naturally decreases.)
          </p>

          {/* Rhetorical Question + Expert Credibility */}
          <div className="bg-gradient-to-r from-primary/10 via-accent/15 to-primary/10 border border-accent/30 rounded-2xl p-5 md:p-6 max-w-2xl mx-auto mb-8">
            <p className="text-center text-base md:text-lg font-serif text-primary/90 italic mb-4">
              "What if I could cut out <span className="font-bold">90% of starch and sugar</span>? Is this sustainable?"
            </p>
            <p className="text-center text-sm text-muted-foreground">
              To find out, I studied from leading experts in metabolic health: Dr. Annette Bosworth, Dr. Jason Fung, Dr. Eric Berg, Dr. Benjamin Bikman, Dr. Andrew Huberman, etc.
            </p>
          </div>

          {/* Bridge to 3 BIG PROBLEMS */}
          <div ref={solutionRef} className={`text-center transition-all duration-700 ${solutionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
              Sustaining a <span className="font-bold text-accent">low-starch, low-sugar</span> lifestyle requires solving three real-world problems.
            </p>
            
            {/* Animated arrows pointing to 3 BIG PROBLEMS */}
            <div className="flex justify-center gap-8 mt-4">
              {[0, 1, 2].map(i => <ChevronDown key={i} className="w-8 h-8 text-accent animate-bounce" style={{
              animationDelay: `${i * 150}ms`
            }} />)}
            </div>
          </div>
        </div>
      </div>
    </section>;
}