import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import heroPhoto from "@/assets/hero-photo.png";

function ComparisonTable() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] leading-relaxed">
      {/* Old Way */}
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-destructive/80 mb-2">
          Old-School Dieting
        </p>
        <p className="flex items-start gap-2 text-[hsl(0_0%_55%)]">
          <X className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
          Gives you a rigid meal plan and expects you to follow it — as if you were a robot.
        </p>
        <p className="flex items-start gap-2 text-[hsl(0_0%_55%)]">
          <X className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
          You fail because you can't adhere to a mechanistic eating routine long-term.
        </p>
        <p className="flex items-start gap-2 text-[hsl(0_0%_55%)]">
          <X className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
          Almost all plans cut an entire food category, creating friction with friends and family.
        </p>
      </div>

      {/* New Way */}
      <div className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-3 space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent/80 mb-2">
          The WPT Approach
        </p>
        <p className="flex items-start gap-2 text-[hsl(0_0%_55%)]">
          <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
          A structured way to identify your "Why" and build intrinsic push-and-pull motivation.
        </p>
        <p className="flex items-start gap-2 text-[hsl(0_0%_55%)]">
          <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
          You choose what to eat — as long as it follows three metabolic principles: energy balance, insulin management, and metabolic adaptation.
        </p>
        <p className="flex items-start gap-2 text-[hsl(0_0%_55%)]">
          <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
          Teaches you to manage biological, social, and environmental pressures while losing 6–10 lbs consistently every month.
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent opacity-0 animate-fade-in-up">
            I Lost 80+ Lbs. Three Times.
          </p>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase leading-[1.1] tracking-tight opacity-0 animate-fade-in-up animate-delay-100">
            I Teach People to{" "}
            <span className="text-accent">Psychologically Prioritize</span>{" "}
            Weight Loss
          </h1>

          <p className="text-sm md:text-base text-[hsl(0_0%_55%)] leading-relaxed max-w-lg opacity-0 animate-fade-in-up animate-delay-150">
            So your day-to-day weight-loss behaviour becomes{" "}
            <span className="font-semibold text-[hsl(0_0%_80%)]">automatic</span>.{" "}
            Weight cycling is multifactorial&nbsp;—
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
