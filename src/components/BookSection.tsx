import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Gift, Play, Brain, Target, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { WaitlistModal } from "@/components/WaitlistModal";

const features = [
  "The Weight Permanence Triangle™ Implementation",
  "Working with emotion instead of fighting it",
  "Making low-starch, low-sugar food decisions in any environment",
  "Replacing short-term weight loss with a permanent approach",
];

const lessons = [
  { day: 1, title: "Your WHY", icon: Target },
  { day: 2, title: "Identity Shift", icon: Brain },
  { day: 3, title: "The Triangle", icon: Play },
  { day: 4, title: "Food Framework", icon: Shield },
  { day: 5, title: "Emotional Eating", icon: Brain },
  { day: 6, title: "Environment", icon: Shield },
  { day: 7, title: "Permanence", icon: Target },
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
          {/* Course mockup */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-4 bg-accent/15 rounded-3xl blur-2xl" />

              {/* Device frame */}
              <div className="relative bg-[hsl(0_0%_8%)] rounded-2xl border border-[hsl(0_0%_18%)] p-5 shadow-2xl">
                {/* Top bar */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[hsl(0_0%_25%)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[hsl(0_0%_25%)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[hsl(0_0%_25%)]" />
                  <div className="flex-1 mx-3 h-5 rounded-full bg-[hsl(0_0%_14%)] flex items-center justify-center">
                    <span className="text-[9px] text-[hsl(0_0%_40%)] tracking-wide">weightpermanence.com</span>
                  </div>
                </div>

                {/* Course header inside device */}
                <div className="mb-4 px-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent mb-1">
                    Free 7-Day Course
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    Weight Permanence
                  </p>
                </div>

                {/* Lesson cards */}
                <div className="space-y-2">
                  {lessons.map((lesson, i) => {
                    const Icon = lesson.icon;
                    return (
                      <div
                        key={lesson.day}
                        className="flex items-center gap-3 bg-[hsl(0_0%_12%)] rounded-lg px-3 py-2.5 border border-[hsl(0_0%_16%)] transition-all duration-500"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? "translateX(0)" : "translateX(20px)",
                          transitionDelay: `${i * 100 + 300}ms`,
                        }}
                      >
                        <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-[hsl(0_0%_45%)] uppercase tracking-wide">
                            Day {lesson.day}
                          </p>
                          <p className="text-xs font-medium text-[hsl(0_0%_80%)] truncate">
                            {lesson.title}
                          </p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-[hsl(0_0%_25%)] flex items-center justify-center flex-shrink-0">
                          <Play className="w-2.5 h-2.5 text-[hsl(0_0%_40%)]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Course info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
              Coming Soon
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-6">
              Weight Permanence
            </h2>

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
                    Join the waitlist and be first to receive one month of free access to <span className="font-semibold text-[hsl(0_0%_96%)]">Awareness Compass</span>, a proprietary conversational platform that guides you through the five stages of Awareness.
                  </p>
                  <p className="text-[hsl(0_0%_50%)] text-xs">
                    After the first month, access is $30/month.
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
