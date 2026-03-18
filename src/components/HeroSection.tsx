import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import heroPhoto from "@/assets/hero-photo.png";

function ComparisonTable() {
  return (
    <div className="grid grid-cols-2 gap-3 text-[13px]">
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-3 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-destructive/80 mb-2">
          Old-School Dieting
        </p>
        <p className="flex items-start gap-1.5 text-[hsl(0_0%_55%)]">
          <X className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
          Rigid meal plans you can't stick to.
        </p>
        <p className="flex items-start gap-1.5 text-[hsl(0_0%_55%)]">
          <X className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
          Cuts entire food groups, isolating you socially.
        </p>
        <p className="flex items-start gap-1.5 text-[hsl(0_0%_55%)]">
          <X className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
          No plan for when life gets hard.
        </p>
      </div>

      <div className="rounded-lg border border-accent/20 bg-accent/5 px-3 py-3 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent/80 mb-2">
          The WPT Approach
        </p>
        <p className="flex items-start gap-1.5 text-[hsl(0_0%_55%)]">
          <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
          Find your "Why" and build lasting motivation.
        </p>
        <p className="flex items-start gap-1.5 text-[hsl(0_0%_55%)]">
          <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
          Eat what you want within three metabolic rules.
        </p>
        <p className="flex items-start gap-1.5 text-[hsl(0_0%_55%)]">
          <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
          Lose 6–10 lbs/month consistently.
        </p>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="section-dark relative min-h-[100dvh] flex items-center pt-14">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-0">
        {/* Image */}
        <div className="order-2 md:order-1 flex justify-center">
          <img
            src={heroPhoto}
            alt="Oscar at 300 lbs — the tipping point that started the journey"
            className="w-full max-w-md md:max-w-lg rounded-lg object-cover shadow-2xl"
          />
        </div>

        {/* Text */}
        <div className="order-1 md:order-2 flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-[1.05] tracking-tight opacity-0 animate-fade-in-up">
            I Lost 80+ Lbs.{" "}
            <span className="text-accent">Three Times.</span>
          </h1>

          <p className="text-base md:text-lg text-[hsl(0_0%_60%)] leading-relaxed max-w-lg opacity-0 animate-fade-in-up animate-delay-100">
            I help obese people to <span className="font-semibold text-[hsl(0_0%_85%)]">end weight cycling</span>.
          </p>

          <div className="opacity-0 animate-fade-in-up animate-delay-200">
            <ComparisonTable />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-in-up animate-delay-300">
            <Button variant="accent" size="lg" className="px-8" asChild>
              <a href="#book">Join the Waitlist</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-[hsl(0_0%_24%)] text-muted-foreground hover:text-foreground hover:border-[hsl(0_0%_40%)] bg-transparent"
              asChild
            >
              <a href="#journey">See My Journey</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
