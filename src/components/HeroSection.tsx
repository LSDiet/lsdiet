import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import heroPhoto from "@/assets/hero-photo.png";
import { WaitlistModal } from "@/components/WaitlistModal";

const coursePoints = [
  "How to lose 6–10 lbs per month.",
  'A structured way to identify your "WHY" and gain extreme clarity on the PUSH and PULL motivation.',
  "How to psychologically prioritize weight loss so the right behaviors become automatic.",
  "Why 33% to 66% of dieters regained more weight than they lost in the long term.",
  "A relapse-proof system built for real life, stress, and social eating.",
];

function StrikethroughText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="text-muted-foreground">{children}</span>
      <svg
        className="absolute left-0 top-1/2 w-full h-[0.35em] -translate-y-1/2 pointer-events-none"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M2 8 C 30 2, 60 12, 100 6 S 170 2, 198 7"
          fill="none"
          stroke="hsl(0 84.2% 60.2%)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function HeroSection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

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
        <div className="order-1 md:order-2 flex flex-col gap-5">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-[1.05] tracking-tight opacity-0 animate-fade-in-up">
            I Lost 80+ Lbs.{" "}
            <span className="text-accent">Three Times.</span>
          </h1>

          <p className="text-base md:text-lg leading-relaxed max-w-lg opacity-0 animate-fade-in-up animate-delay-100">
            <span className="text-muted-foreground">Now I help obese people end</span>{" "}
            <StrikethroughText>weight cycling</StrikethroughText>
          </p>

          <div className="opacity-0 animate-fade-in-up animate-delay-200 space-y-3">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Join my{" "}
              <span className="font-bold text-accent">FREE</span>{" "}
              7-day Weight Permanence course. You'll discover:
            </p>

            <ul className="space-y-1.5">
              {coursePoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[13px] md:text-sm text-muted-foreground leading-snug"
                >
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="opacity-0 animate-fade-in-up animate-delay-300">
            <Button
              variant="accent"
              size="lg"
              className="px-10"
              onClick={() => setWaitlistOpen(true)}
            >
              Join the Waitlist
            </Button>
          </div>
        </div>
      </div>

      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </section>
  );
}
