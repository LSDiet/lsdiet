import { Button } from "@/components/ui/button";
import heroPhoto from "@/assets/hero-photo.png";

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
        <div className="order-1 md:order-2 flex flex-col gap-6 md:gap-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent opacity-0 animate-fade-in-up">
            Lost 80 lbs three Times. Now It's Forever.
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-[1.05] tracking-tight opacity-0 animate-fade-in-up animate-delay-100">
            The Secret to{" "}
            <span className="text-accent">Permanent</span>{" "}
            Weight Loss
          </h1>

          <p className="text-base md:text-lg text-[hsl(0_0%_60%)] leading-relaxed max-w-lg opacity-0 animate-fade-in-up animate-delay-200">
            The <span className="text-accent animate-pulse-glow">Weight Permanence Triangle™</span> —
            <br />a neurobehavioural training to lose weight, keep it off, and live freely with a{" "}
            <span className="font-bold text-[hsl(0_0%_80%)]">low-starch, low-sugar (LS)</span> lifestyle.
          </p>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animate-delay-300">
            <Button variant="accent" size="lg" className="px-8" asChild>
              <a href="#book">Pre-Order the Book</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-[hsl(0_0%_24%)] text-[hsl(0_0%_70%)] hover:text-[hsl(0_0%_96%)] hover:border-[hsl(0_0%_40%)] bg-transparent"
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
