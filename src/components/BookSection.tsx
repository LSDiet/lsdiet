import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Gift } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { WaitlistModal } from "@/components/WaitlistModal";
import bookCover from "@/assets/book-cover.png";

const features = [
  "The Weight Permanence Triangle™ Implementation",
  "Working with emotion instead of fighting it",
  "Making low-starch, low-sugar food decisions in any environment",
  "Replacing short-term weight loss with a permanent approach",
];

export function BookSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <section id="book" className="section-dark py-14 md:py-20">
      <div className="container">
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Book mockup */}
          <div className="flex justify-center">
            <div className="relative animate-float">
              <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
              <img
                src={bookCover}
                alt="Weight Permanence Book"
                className="relative max-w-sm w-full drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Book info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
              Coming Soon
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-4">
              Weight Permanence
            </h2>
            <p className="text-[hsl(0_0%_60%)] mb-6 leading-relaxed text-sm">
              A step-by-step guide to the Weight Permanence Triangle™ Method. Learn how to build a low-starch, low-sugar lifestyle designed to resist weight regain.
            </p>

            <ul className="space-y-3 mb-6">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-[hsl(0_0%_80%)] text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Early Access Bonus */}
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-accent uppercase tracking-[0.1em] mb-2">
                    Early Access Bonus
                  </p>
                  <p className="text-[hsl(0_0%_80%)] text-sm leading-relaxed mb-2">
                    Join the waitlist and be first to receive 12 months of free access to <span className="font-semibold text-[hsl(0_0%_96%)]">Awareness Compass</span>, a proprietary conversational platform that guides you through the five stages of Awareness.
                  </p>
                  <p className="text-[hsl(0_0%_50%)] text-xs">
                    After the first year, access is $10/month.
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="accent"
              size="lg"
              className="w-full sm:w-auto px-8"
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
