import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-16 pb-0 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-8 opacity-0 animate-fade-in-up">
          <span className="text-sm font-medium text-accent">
            Lost 60 lbs – Three Times. Now It's Forever.
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-6 text-primary opacity-0 animate-fade-in-up animate-delay-100">
          The Secret to{" "}
          <span className="text-accent font-semibold">Permanent</span> Weight Loss
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
          The Weight Permanence Triangle™ — a neurobehavioural training to lose weight, keep it off, and live freely with a low-starch, low-sugar lifestyle.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in-up animate-delay-300">
          <Button size="lg" className="px-8" asChild>
            <a href="#book">Pre-Order the Book</a>
          </Button>
          <Button size="lg" variant="outline" className="px-8" asChild>
            <a href="#journey">See My Journey</a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <a href="#journey" className="inline-flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors opacity-0 animate-fade-in-up animate-delay-400">
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
