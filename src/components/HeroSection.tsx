import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import heroPhoto from "@/assets/hero-photo.png";

function ComparisonTable() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-0 animate-fade-in-up animate-delay-200">
      {/* Old Way */}
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-destructive mb-3">
          Old-School Dieting
        </p>
        <ul className="space-y-2.5">
          <li className="flex items-start gap-2 text-sm text-muted-foreground leading-snug">
            <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            Gives you a rigid daily meal plan and expects you to follow it — as if you were a robot.
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground leading-snug">
            <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            You fail because you can't adhere to a mechanistic eating routine long-term.
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground leading-snug">
            <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            Almost all plans ask you to cut an entire food category, creating friction with friends and family.
          </li>
        </ul>
      </div>

      {/* New Way */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-3">
          The WPT Approach
        </p>
        <ul className="space-y-2.5">
          <li className="flex items-start gap-2 text-sm text-muted-foreground leading-snug">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            A structured way to identify your "Why" and build intrinsic push-and-pull motivation.
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground leading-snug">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            You choose what to eat — as long as it follows three basic metabolic principles: energy balance, insulin management, and metabolic adaptation.
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground leading-snug">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            Teaches you to manage biological, social, and environmental pressures while losing 6–10 lbs consistently every month.
          </li>
        </ul>
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
        <div className="order-1 md:order-2 flex flex-col gap-4 md:gap-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent opacity-0 animate-fade-in-up">
            I Lost 80+ Lbs. Three Times.
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase leading-[1.1] tracking-tight opacity-0 animate-fade-in-up animate-delay-100">
            I Teach People to{" "}
            <span className="text-accent">Psychologically Prioritize</span>{" "}
            Weight Loss
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg opacity-0 animate-fade-in-up animate-delay-150">
            So your day-to-day weight-loss behaviour becomes{" "}
            <span className="font-bold text-[hsl(0_0%_80%)]">automatic</span>.{" "}
            <span className="text-accent">Weight cycling is multifactorial.</span>
          </p>

          <ComparisonTable />

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animate-delay-300">
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
