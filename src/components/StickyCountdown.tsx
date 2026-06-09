import { useState, useEffect } from "react";
import { CountdownClock } from "@/components/CountdownClock";
import { WaitlistModal } from "@/components/WaitlistModal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function StickyCountdown() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero (~100vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-accent/20 shadow-[0_-4px_20px_hsl(var(--accent)/0.15)] animate-fade-in-up">
        <div className="container flex items-center justify-between gap-3 py-2.5 px-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <span className="hidden sm:inline text-sm font-semibold text-foreground whitespace-nowrap">
              Course launches in
            </span>
            <CountdownClock compact />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              className="whitespace-nowrap text-xs sm:text-sm"
              onClick={() => setWaitlistOpen(true)}
            >
              START YOUR FREE TRAINING TODAY
            </Button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss countdown"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </>
  );
}
