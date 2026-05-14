import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function JoinFloatingBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      const trigger = document.getElementById("method");
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      // Show once user has scrolled into / past the Method section
      if (rect.top < window.innerHeight * 0.6) setVisible(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-fade-in border-t border-accent/40 bg-[hsl(0_0%_6%)] shadow-[0_-8px_24px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
            Stop restarting weight loss.
          </p>
          <p className="truncate text-[11px] text-white/60 sm:text-xs">
            Join the LS Diet community on Skool — free to join.
          </p>
        </div>
        <a
          href="https://www.skool.com/lsdiet/about"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 rounded-md bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-[1.03] sm:px-6 sm:text-sm"
        >
          <span className="inline-block animate-two-weeks">Join Free</span>
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="flex-shrink-0 rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
