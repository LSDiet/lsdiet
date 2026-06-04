import { Compass, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export const QUIZ_INVITE_ANCHOR_ID = "quiz-invite-inline";

export function QuizInviteCard() {
  return (
    <section className="bg-background py-10 md:py-14">
      <div className="container mx-auto max-w-2xl px-4">
        <a
          id={QUIZ_INVITE_ANCHOR_ID}
          href="/quiz"
          onClick={() =>
            trackEvent("cta_click", {
              location: "quiz_invite_inline",
              destination: "/quiz",
            })
          }
          className="group relative block overflow-hidden rounded-2xl border border-accent/40 bg-[hsl(0_0%_6%)] p-5 md:p-6 transition-all hover:border-accent hover:-translate-y-0.5 shadow-[0_8px_28px_-12px_hsl(var(--accent)/0.4)]"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
              <Compass className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                1-min quiz · Free Report
              </p>
              <h3 className="mt-1 text-lg md:text-xl font-extrabold leading-snug text-white">
                Know your Weight Regain Profile?
              </h3>
            </div>
            <span className="hidden sm:inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-accent-foreground transition-transform group-hover:translate-x-0.5">
              Take the quiz
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-accent-foreground sm:hidden">
            Take the 1-min quiz
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </div>
        </a>
      </div>
    </section>
  );
}
