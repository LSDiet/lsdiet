/**
 * Problem Hook — the very first thing visitors see on the home page.
 *
 * Cinematic emotional composition (Netflix-poster, NOT dashboard UI):
 *   - The woman is the emotional anchor. The 5 pain-point labels ARE the hook
 *     message — they surround her like pressure, so visitors self-identify
 *     instantly ("that's me") with zero scrolling on phone or desktop.
 *   - Desktop/tablet (md+): full-bleed image, 5 glowing cards placed
 *     asymmetrically around her, pulled inward.
 *   - Phone (<md): a dominant image with the cards overlaying its lower
 *     portion, tightly grouped 2-2-1.
 *
 * Performance constraints (per spec):
 *   - Responsive AVIF/WebP via vite-imagetools
 *   - loading="eager" + fetchPriority high (this is the LCP image)
 *   - No parallax, no video, no blur-backdrop filters
 *   - Neon glow = lightweight layered box-shadow only (dialed back ~20%)
 *   - Animation limited to the chevron bounce
 */
import { useEffect, useRef } from "react";
import { ChevronDown, ArrowRight, Compass, BatteryLow, Repeat, RotateCcw, CloudRain, Pill } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/lsdiet/about";

function HeroJoinCTA({ placement }: { placement: "desktop" | "mobile" }) {
  return (
    <div className="mx-auto mt-5 flex w-full max-w-md flex-col items-center text-center">
      <p className="whitespace-nowrap text-white/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] text-center text-[11px] font-bold mt-[10px] my-0 uppercase tracking-[0.02em] sm:text-sm sm:tracking-[0.15em]">
        Not sure why keeping the weight off is so hard?
      </p>
      <a
        href="/quiz"
        onClick={() =>
          trackEvent("cta_click", {
            location: "problem_hook",
            placement: `hero_quiz_${placement}`,
            destination: "/quiz",
          })
        }
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-base font-extrabold uppercase tracking-wider text-accent-foreground shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.7)] transition-all hover:brightness-110 hover:-translate-y-0.5 md:text-lg"
      >
        Find Out Why
        <ArrowRight className="h-5 w-5" aria-hidden />
      </a>
      <p className="mt-2 text-[11px] font-medium text-white/60">
        Free · 60 seconds
      </p>
    </div>
  );
}
import { BackgroundVideo, type VideoClip } from "@/components/ui/BackgroundVideo";
import { trackEvent } from "@/lib/analytics";
import posterUrl from "@/assets/problem-hook-bg.jpg";
import clip1D from "@/assets/hook-clip1-d.mp4";
import clip2D from "@/assets/hook-clip2-d.mp4";
import clip3D from "@/assets/hook-clip3-d.mp4";
import clip4D from "@/assets/hook-clip4-d.mp4";
import clip1M from "@/assets/hook-clip1-m.mp4";
import clip2M from "@/assets/hook-clip2-m.mp4";
import clip3M from "@/assets/hook-clip3-m.mp4";
import clip4M from "@/assets/hook-clip4-m.mp4";

/** Background clips play strictly in order 1 → 2 → 3 → 4, then loop. */
const desktopClips: VideoClip[] = [
  { mp4: clip1D },
  { mp4: clip2D },
  { mp4: clip3D },
  { mp4: clip4D },
];
const mobileClips: VideoClip[] = [
  { mp4: clip1M },
  { mp4: clip2M },
  { mp4: clip3M },
  { mp4: clip4M },
];

const POSTER_ALT =
  "A frustrated, mentally tired woman sitting at a table, struggling with repeated weight-loss attempts";

type Pain = {
  label: string;
  shortLabel: string;
  href: string;
  /** HSL triplet used for border + glow */
  hsl: string;
  Icon: typeof Compass;
};

/** shortLabels are written to read naturally as the tail end of the
 *  headline: "How to prevent regaining weight when I am\u2026 [shortLabel]". */
const pains: Pain[] = [
  { label: "I\u2019m thinking about GLP-1 medication", shortLabel: "On GLP-1 Medication", href: "/glp-1-rebound-analysis", hsl: "261 80% 65%", Icon: Pill },
  { label: "I don\u2019t know where to start", shortLabel: "Overwhelmed", href: "/weight-regain-profile/overwhelmed-beginner", hsl: "0 84% 60%", Icon: Compass },
  { label: "I always run out of motivation", shortLabel: "Unmotivated", href: "/weight-regain-profile/motivation-chaser", hsl: "212 90% 60%", Icon: BatteryLow },
  { label: "I keep switching to a new diet plan", shortLabel: "Switching Diets Again", href: "/weight-regain-profile/weight-cycler", hsl: "38 92% 55%", Icon: Repeat },
  { label: "I jump from one method to the next before seeing results", shortLabel: "Restarting Again", href: "/weight-regain-profile/restarter", hsl: "150 70% 48%", Icon: RotateCcw },
  { label: "I eat when I\u2019m stressed", shortLabel: "Stress Eating", href: "/weight-regain-profile/stress-eater", hsl: "280 70% 65%", Icon: CloudRain },
];

/**
 * FloatingCarousel3D — true 3D cylinder of pain point cards.
 *
 * Each card is placed around a circle using rotateY + translateZ. Rotation
 * is driven by requestAnimationFrame (not a CSS keyframe) so a finger on the
 * carousel can pause and manually spin it: pointer-down freezes auto-spin
 * and hands control to drag deltas, pointer-up leaves it still for ~0.5s
 * then resumes auto-spin from wherever it was left (no jump/reset).
 *
 * Function note: only the front facing card is legible at any moment. This
 * is intentional and approved — the carousel is decorative/atmospheric, not
 * the primary routing mechanism. The quiz CTA below it (Find Your Profile)
 * is the real conversion path. Each card keeps its href for graceful
 * degradation (a visitor who taps mid rotation still lands correctly), but
 * do not treat tap rate on individual cards as a meaningful metric.
 */
const CAROUSEL_DEG_PER_MS = 360 / 28000; // same pace as the original 28s/revolution
const CAROUSEL_DRAG_SENSITIVITY = 0.5; // degrees rotated per pixel dragged
const CAROUSEL_RESUME_DELAY_MS = 500;

function FloatingCarousel3D({
  pains,
  variant,
  className = "",
  height = 380,
  radius = 210,
  cardWidth = 176,
  cardHeight = 76,
  spotlightSize = 240,
  iconSize = 30,
  fontSize = 12.8,
  gap = 10,
  paddingX = 14,
  paddingY = 12,
}: {
  pains: Pain[];
  /** distinguishes desktop vs mobile in analytics events */
  variant: string;
  className?: string;
  height?: number;
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  spotlightSize?: number;
  iconSize?: number;
  fontSize?: number;
  gap?: number;
  paddingX?: number;
  paddingY?: number;
}) {
  const step = 360 / pains.length;

  const trackRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const resumeTimerRef = useRef<number>();

  useEffect(() => {
    let lastTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      if (!pausedRef.current) {
        rotationRef.current += CAROUSEL_DEG_PER_MS * dt;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translate(-50%, -50%) rotateY(${rotationRef.current}deg)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Drag tracking is done via window-level listeners (added on pointerdown,
  // removed on pointerup/cancel) rather than relying on setPointerCapture —
  // iOS Safari has had long-standing bugs where pointer capture silently
  // fails on touch input, which made the carousel driftable in desktop
  // preview but inert on real phones. touch-action: none on the surface
  // (below) hands the whole gesture to JS instead of letting WebKit's
  // native gesture recognizer intercept it.
  const handleWindowPointerMove = (e: PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    dragDistanceRef.current += Math.abs(dx);
    rotationRef.current += dx * CAROUSEL_DRAG_SENSITIVITY;
  };

  const handleWindowPointerUp = () => {
    endDrag();
    window.removeEventListener("pointermove", handleWindowPointerMove);
    window.removeEventListener("pointerup", handleWindowPointerUp);
    window.removeEventListener("pointercancel", handleWindowPointerUp);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    pausedRef.current = true;
    lastXRef.current = e.clientX;
    dragDistanceRef.current = 0;
    window.clearTimeout(resumeTimerRef.current);
    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);
    window.addEventListener("pointercancel", handleWindowPointerUp);
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, CAROUSEL_RESUME_DELAY_MS);
  };

  // iOS Safari can still fire a synthetic click on the underlying <a> at
  // touch-end after a real drag. Suppress navigation once the finger has
  // actually moved past a small threshold; real taps (no meaningful
  // movement) still navigate normally.
  const CARD_CLICK_DRAG_THRESHOLD = 6;
  const handleCardClick = (e: React.MouseEvent) => {
    if (dragDistanceRef.current > CARD_CLICK_DRAG_THRESHOLD) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={`relative cursor-grab active:cursor-grabbing ${className}`}
      style={{ perspective: "900px", touchAction: "none", height }}
      onPointerDown={handlePointerDown}
    >
      {/* soft spotlight so whatever is currently frontmost reads as "in focus" */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: spotlightSize,
          height: spotlightSize,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div
        ref={trackRef}
        className="absolute left-1/2 top-1/2"
        style={{
          width: cardWidth,
          height: cardHeight,
          transformStyle: "preserve-3d",
          transform: "translate(-50%, -50%) rotateY(0deg)",
        }}
      >
        {pains.map((pain, i) => {
          const { Icon } = pain;
          return (
            <a
              key={pain.label}
              href={pain.href}
              draggable={false}
              onClick={(e) => {
                handleCardClick(e);
                if (e.defaultPrevented) return;
                trackEvent("problem_card_click", {
                  location: "problem_hook",
                  variant,
                  label: pain.shortLabel,
                  destination: pain.href,
                  type: "profile",
                });
              }}
              className="absolute inset-0 flex items-center rounded-2xl border border-white/15 bg-black/55 select-none [-webkit-touch-callout:none]"
              style={{
                transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                boxShadow: "0 10px 26px -14px rgba(0,0,0,0.9)",
                gap,
                paddingLeft: paddingX,
                paddingRight: paddingX,
                paddingTop: paddingY,
                paddingBottom: paddingY,
              }}
            >
              <span
                className="flex shrink-0 items-center justify-center rounded-full border"
                style={{
                  width: iconSize,
                  height: iconSize,
                  borderColor: `hsl(${pain.hsl} / 0.55)`,
                  backgroundColor: `hsl(${pain.hsl} / 0.16)`,
                  color: `hsl(${pain.hsl})`,
                }}
              >
                <Icon size={Math.round(iconSize * 0.55)} aria-hidden="true" />
              </span>
              <span className="font-bold leading-tight text-white" style={{ fontSize }}>
                {pain.shortLabel}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function Headline() {
  return (
    <h1 className="text-center font-sans font-extrabold uppercase leading-[1.15] tracking-tight text-white text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
      <span className="block">Lose the Weight</span>
      <span className="mt-1 block text-accent">Stop the Rebound</span>
      <span className="mt-2 block normal-case">But <span className="uppercase">how</span> when I am&hellip;</span>
    </h1>
  );
}


export function ProblemHookSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] text-white">
      {/* ============ DESKTOP / TABLET (md+) ============ */}
      <div className="relative hidden min-h-[100svh] md:block">
        {/* Video is intentionally NOT full-bleed: it anchors centre-left and
            fades into a darker right panel so the pain cluster commands the
            right side. Reduced width + brightness + dominance. */}
        <div className="absolute inset-y-0 left-0 right-0 lg:right-[38%]">
          <BackgroundVideo
            clips={desktopClips}
            poster={posterUrl}
            alt={POSTER_ALT}
            className="brightness-[1.18] contrast-[1.06] saturate-[1.1]"
          />
          {/* Dial brightness/dominance down */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Edge-weighted vignette keeps her face the emotional anchor */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_42%_44%,transparent_28%,rgba(0,0,0,0.6)_80%,rgba(0,0,0,0.9)_100%)]" />
          {/* Fade the right edge into the dark composition panel */}
          <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-r from-transparent to-[#0a0a0a]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 to-transparent" />

        <div className="relative z-10 flex min-h-[100svh] flex-col px-8 pt-20 pb-8 lg:px-12">
          <div className="mt-3">
            <Headline />
          </div>

          {/* 3D carousel pinned to the right — larger version of the mobile
              carousel, scaled up for the extra room on desktop/tablet. */}
          <div className="mt-8 flex flex-1 items-center justify-end">
            <nav aria-label="Common weight-loss struggles" className="ml-auto w-full max-w-[36rem]">
              <p className="text-right text-sm font-bold uppercase tracking-[0.15em] text-white/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Which one sounds like you?
              </p>
              <FloatingCarousel3D
                pains={pains}
                variant="carousel_3d_desktop"
                height={420}
                radius={230}
                cardWidth={210}
                cardHeight={84}
                spotlightSize={280}
                iconSize={34}
                fontSize={15}
                gap={12}
                paddingX={18}
                paddingY={14}
              />
            </nav>
          </div>

          <HeroJoinCTA placement="desktop" />
          <ChevronDown className="mx-auto mt-4 h-7 w-7 animate-bounce text-accent/80" aria-hidden="true" />

        </div>

      </div>




      {/* ============ PHONE (<md) ============ */}
      <div className="relative flex min-h-[92svh] flex-col md:hidden">
        {/* Dominant video/image fills the screen; everything overlays it.
            Brightness/contrast/saturation nudged up since the raw clips
            read dark and slightly flat on phone screens. */}
        <BackgroundVideo
          clips={mobileClips}
          poster={posterUrl}
          alt={POSTER_ALT}
          className="brightness-[1.18] contrast-[1.06] saturate-[1.1]"
        />
        {/* Lighter than the old solid pill stack — the video is meant to
            stay visible, not be buried. Just enough gradient for text
            legibility at top and bottom. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/80" />

        <div className="relative z-10 flex flex-1 flex-col px-4 pt-16 pb-6">
          <div className="mt-3 rounded-2xl bg-black/30 px-3 py-3 backdrop-blur-[2px]">
            <Headline />
          </div>

          {/* 3D carousel — replaces the old blocking pill stack. Decorative/
              atmospheric; the quiz CTA below is the real routing path. */}
          <p className="mt-6 text-center text-sm font-bold uppercase tracking-[0.15em] text-white/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            Which one sounds like you?
          </p>
          <FloatingCarousel3D pains={pains} variant="carousel_3d_mobile" className="mt-3" />

          <HeroJoinCTA placement="mobile" />

        </div>


      </div>

    </section>
  );
}
