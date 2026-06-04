import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Compass, X, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { QUIZ_INVITE_ANCHOR_ID } from "./QuizInviteCard";

const DISMISS_KEY = "quizSideTabDismissedAt";
const DISMISS_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

function isRecentlyDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < DISMISS_TTL_MS;
  } catch {
    return false;
  }
}

export function QuizSideTab() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Hide on the quiz page itself.
  const onQuiz = pathname.startsWith("/quiz");

  useEffect(() => {
    if (onQuiz) return;
    if (isRecentlyDismissed()) {
      setDismissed(true);
      return;
    }
    const target = document.getElementById(QUIZ_INVITE_ANCHOR_ID);
    if (!target) {
      // Fallback: show after meaningful scroll.
      const onScroll = () => {
        if (window.scrollY > window.innerHeight * 1.2) setVisible(true);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Once the inline card has scrolled out of view past the top, reveal.
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            setVisible(true);
          }
        }
      },
      { threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [onQuiz, pathname]);

  if (onQuiz || dismissed || !visible) return null;

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    trackEvent("dismiss", { location: "quiz_invite_side_tab" });
    setDismissed(true);
  };

  const onClick = () =>
    trackEvent("cta_click", {
      location: "quiz_invite_side_tab",
      destination: "/quiz",
    });

  return (
    <>
      {/* MOBILE: compact chip pinned under the navbar, top-right */}
      <a
        href="/quiz"
        onClick={onClick}
        className="md:hidden fixed right-2 top-[64px] z-40 inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-[hsl(0_0%_6%/0.92)] py-1.5 pl-2 pr-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_6px_20px_-10px_hsl(var(--accent)/0.7)] animate-fade-in backdrop-blur-md"
        aria-label="Take the 1-minute quiz: why do you keep regaining weight?"
      >
        <Compass className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        <span>1-min quiz</span>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss quiz invite"
          className="ml-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
        >
          <X className="h-3 w-3" />
        </button>
      </a>

      {/* DESKTOP: left-edge vertical tab, click to expand */}
      <div className="hidden md:block fixed left-0 top-[45vh] z-40 animate-fade-in">
        {expanded ? (
          <div className="flex items-center gap-3 rounded-r-2xl border border-l-0 border-accent/40 bg-[hsl(0_0%_6%)] py-3 pl-4 pr-3 shadow-[0_10px_28px_-12px_hsl(var(--accent)/0.6)]">
            <Compass className="h-5 w-5 text-accent" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                1-min quiz · Free Report
              </p>
              <p className="text-sm font-extrabold text-white">
                Why do you keep regaining weight?
              </p>
            </div>
            <a
              href="/quiz"
              onClick={onClick}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:brightness-110"
            >
              Take quiz
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss quiz invite"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-label="Open quiz invite"
            className="flex items-center gap-2 rounded-r-xl border border-l-0 border-accent/40 bg-[hsl(0_0%_6%)] px-2.5 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-[0_8px_24px_-12px_hsl(var(--accent)/0.6)] hover:border-accent hover:bg-[hsl(0_0%_10%)]"
          >
            <Compass className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="[writing-mode:vertical-rl] rotate-180">
              Why do you keep regaining weight?
            </span>
          </button>
        )}
      </div>
    </>
  );
}
