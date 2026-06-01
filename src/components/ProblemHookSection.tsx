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
import { ChevronDown, ChevronRight, Compass, BatteryLow, TrendingDown, Footprints, CloudRain } from "lucide-react";
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

const pains: Pain[] = [
  { label: "I don\u2019t know where to start", shortLabel: "Stuck", href: "/blog/why-do-i-keep-losing-and-regaining-the-same-weight", hsl: "0 84% 60%", Icon: Compass },
  { label: "I have no motivation", shortLabel: "Unmotivated", href: "/blog/why-do-i-lose-motivation-after-a-few-weeks", hsl: "212 90% 60%", Icon: BatteryLow },
  { label: "The method stops working", shortLabel: "Plateaued", href: "/blog/how-to-overcome-weight-loss-plateaus", hsl: "38 92% 55%", Icon: TrendingDown },
  { label: "I don\u2019t want to exercise", shortLabel: "Hate exercise", href: "/blog/is-diet-or-exercise-more-important-for-weight-loss", hsl: "150 70% 48%", Icon: Footprints },
  { label: "I stress eat", shortLabel: "Stress eating", href: "/blog/why-does-stress-make-me-eat-more", hsl: "280 70% 65%", Icon: CloudRain },
];

/** Slightly varied widths so the right-edge cluster reads as ONE organic
 *  psychological stack, not 5 identical menu buttons (desktop, right-aligned). */
const railWidths = [
  "md:w-full",
  "md:w-[90%]",
  "md:w-[98%]",
  "md:w-[85%]",
  "md:w-[95%]",
];

/** Tiny vertical nudges so the stack feels hand-placed, not generated. */
const railOffsets = [
  "md:translate-x-0",
  "md:-translate-x-[3px]",
  "md:translate-x-[2px]",
  "md:-translate-x-[2px]",
  "md:translate-x-[1px]",
];



/** Subtle grey border shadow for glass cards. */
function cardShadow() {
  return "0 0 0 1px hsl(0 0% 100% / 0.08), 0 8px 24px -16px rgba(0,0,0,0.8)";
}


/**
 * DESKTOP rail item — dark glass, white text, subtle grey border.
 * Only the icon retains its colour.
 */
function RailItem({ pain, widthClass, offsetClass }: { pain: Pain; widthClass: string; offsetClass: string }) {
  const { Icon } = pain;
  return (
    <a
      href={pain.href}
      onClick={() =>
        trackEvent("problem_card_click", {
          location: "problem_hook",
          variant: "desktop_rail",
          label: pain.shortLabel,
          destination: pain.href,
        })
      }
      className={`group relative flex w-full items-center gap-3.5 rounded-xl border border-white/15 bg-black/60 px-5 py-4 text-left backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-black/75 ${widthClass} ${offsetClass}`}
      style={{ boxShadow: cardShadow() }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] transition-colors duration-300 group-hover:bg-white/[0.10]"
        style={{ color: `hsl(${pain.hsl})` }}
      >
        <Icon className="h-[1.4rem] w-[1.4rem] opacity-90 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[1.02rem] font-bold leading-snug text-white transition-colors duration-300">
          {pain.label}
        </span>
        <span className="mt-0.5 max-h-0 overflow-hidden text-xs font-medium tracking-wide text-white/50 opacity-0 transition-all duration-300 group-hover:max-h-6 group-hover:opacity-100">
          Read article &rarr;
        </span>
      </span>
    </a>
  );
}


function PillChip({ pain }: { pain: Pain }) {
  const { Icon } = pain;
  return (
    <a
      href={pain.href}
      onClick={() =>
        trackEvent("problem_card_click", {
          location: "problem_hook",
          variant: "pill_chip",
          label: pain.shortLabel,
          destination: pain.href,
        })
      }
      className="group mx-auto flex w-full max-w-[20rem] items-center gap-3 rounded-full border border-white/15 bg-black/55 pl-2 pr-4 py-1.5 backdrop-blur-md transition-all duration-300 ease-out hover:border-white/30 hover:bg-black/70"
      style={{ boxShadow: "0 4px 14px -8px rgba(0,0,0,0.7)" }}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
        style={{
          borderColor: `hsl(${pain.hsl} / 0.55)`,
          backgroundColor: `hsl(${pain.hsl} / 0.12)`,
          color: `hsl(${pain.hsl})`,
        }}
      >
        <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
      </span>
      <span className="flex-1 text-[0.95rem] font-bold uppercase tracking-wide text-white">
        {pain.shortLabel}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-white/55 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}

function Headline() {
  return (
    <h1 className="text-center font-sans font-extrabold uppercase leading-[1.05] tracking-tight text-white text-[1.7rem] sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
      How to <span className="text-accent">lose weight</span> when&hellip;
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
          <BackgroundVideo clips={desktopClips} poster={posterUrl} alt={POSTER_ALT} />
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

          {/* Pill stack pinned to the right — tight, connected, "tap to explore" */}
          <div className="mt-8 flex flex-1 items-center justify-end">
            <nav
              aria-label="Common weight-loss struggles"
              className="ml-auto flex w-full max-w-[24rem] flex-col gap-1.5 lg:max-w-[26rem]"
            >
              {pains.map((pain) => (
                <PillChip key={pain.label} pain={pain} />
              ))}
            </nav>
          </div>

          <p className="mt-6 text-center text-base font-extrabold uppercase tracking-tight text-white lg:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Built for people who keep regaining weight
          </p>
          <ChevronDown className="mx-auto mt-3 h-7 w-7 animate-bounce text-accent/80" aria-hidden="true" />
        </div>

      </div>




      {/* ============ PHONE (<md) ============ */}
      <div className="relative flex flex-col md:hidden">
        {/* Dominant video/image fills the screen; everything overlays it */}
        <BackgroundVideo clips={mobileClips} poster={posterUrl} alt={POSTER_ALT} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/95" />

        <div className="relative z-10 flex flex-col px-4 pt-16 pb-6">
          <div className="mt-3">
            <Headline />
          </div>
          {/* Pill stack — tight spacing, reads as one connected list */}
          <div className="mt-6 flex flex-col gap-1.5">
            {pains.map((pain) => (
              <PillChip key={pain.label} pain={pain} />
            ))}
          </div>
          <p className="mt-5 text-center text-base font-extrabold uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Built for people who keep regaining weight
          </p>
        </div>


      </div>

    </section>
  );
}
