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
import { ChevronDown, Compass, BatteryLow, TrendingDown, Footprints, CloudRain } from "lucide-react";
import { BackgroundVideo, type VideoClip } from "@/components/ui/BackgroundVideo";
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
  href: string;
  /** HSL triplet used for border + glow */
  hsl: string;
  Icon: typeof Compass;
};

const pains: Pain[] = [
  { label: "I don\u2019t know where to start", href: "/blog/why-do-i-keep-losing-and-regaining-the-same-weight", hsl: "0 84% 60%", Icon: Compass },
  { label: "I have no motivation", href: "/blog/why-do-i-lose-motivation-after-a-few-weeks", hsl: "212 90% 60%", Icon: BatteryLow },
  { label: "The method stops working", href: "/blog/how-to-overcome-weight-loss-plateaus", hsl: "38 92% 55%", Icon: TrendingDown },
  { label: "I don\u2019t want to exercise", href: "/blog/is-diet-or-exercise-more-important-for-weight-loss", hsl: "150 70% 48%", Icon: Footprints },
  { label: "I stress eat", href: "/blog/why-does-stress-make-me-eat-more", hsl: "280 70% 65%", Icon: CloudRain },
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



/** Layered, performance-safe neon glow (box-shadow only). */
function glow(hsl: string) {
  return `0 0 0 1px hsl(${hsl} / 0.5), 0 0 12px -2px hsl(${hsl} / 0.45), 0 0 22px -6px hsl(${hsl} / 0.3)`;
}

/**
 * DESKTOP rail item — subdued by default, only strongly activates on hover.
 * Premium / restrained: translucent dark bg, subtle border, muted glow.
 */
function RailItem({ pain, widthClass, offsetClass }: { pain: Pain; widthClass: string; offsetClass: string }) {
  const { Icon } = pain;
  const hoverShadow = `0 0 0 1px hsl(${pain.hsl} / 0.75), 0 0 20px -2px hsl(${pain.hsl} / 0.55), 0 10px 30px -10px hsl(${pain.hsl} / 0.4)`;
  return (
    <a
      href={pain.href}
      className={`group relative flex w-full items-center gap-3.5 rounded-xl border border-white/10 bg-black/55 px-5 py-4 text-left backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/70 ${widthClass} ${offsetClass}`}
      style={{ boxShadow: "0 0 0 1px hsl(0 0% 100% / 0.04), 0 8px 24px -16px rgba(0,0,0,0.8)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = hoverShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 1px hsl(0 0% 100% / 0.04), 0 8px 24px -16px rgba(0,0,0,0.8)";
      }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] transition-colors duration-300 group-hover:bg-white/[0.08]"
        style={{ color: `hsl(${pain.hsl})` }}
      >
        <Icon className="h-[1.4rem] w-[1.4rem] opacity-75 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[1.02rem] font-bold leading-snug text-white/90 transition-colors duration-300 group-hover:text-white">
          {pain.label}
        </span>
        <span
          className="mt-0.5 max-h-0 overflow-hidden text-xs font-medium tracking-wide opacity-0 transition-all duration-300 group-hover:max-h-6 group-hover:opacity-100"
          style={{ color: `hsl(${pain.hsl})` }}
        >
          Read article &rarr;
        </span>
      </span>
    </a>
  );
}


function NeonChip({ pain }: { pain: Pain }) {
  const { Icon } = pain;
  return (
    <a
      href={pain.href}
      className="mx-auto flex w-[16rem] max-w-full flex-col items-center gap-1.5 rounded-xl border-2 bg-black/40 px-4 py-2.5 text-center backdrop-blur-[2px]"
      style={{ borderColor: `hsl(${pain.hsl})`, boxShadow: glow(pain.hsl) }}
    >
      <Icon className="h-5 w-5 shrink-0" style={{ color: `hsl(${pain.hsl})` }} aria-hidden="true" />
      <span className="text-[0.95rem] font-bold leading-tight text-white">{pain.label}</span>
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
      {/* Mirrors the mobile flow: full-bleed video → headline → centred chip
          cluster → transition sentence. */}
      <div className="relative flex min-h-[100svh] flex-col md:block hidden">
        <BackgroundVideo clips={desktopClips} poster={posterUrl} alt={POSTER_ALT} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/95" />

        <div className="relative z-10 flex min-h-[100svh] flex-col px-8 pt-24 pb-10 lg:px-12">
          <Headline />
          {/* Chips stacked + centred, same psychological cluster as mobile */}
          <div className="mt-8 grid w-full max-w-3xl mx-auto grid-cols-2 gap-3 lg:max-w-4xl">
            {pains.map((pain, i) => (
              <div key={pain.label} className={i === pains.length - 1 ? "col-span-2 mx-auto w-1/2" : ""}>
                <NeonChip pain={pain} />
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-2xl font-extrabold uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] lg:text-3xl">
            I know this <span className="text-accent">cycle</span> too well &darr;
          </p>
        </div>
      </div>



      {/* ============ PHONE (<md) ============ */}
      <div className="relative flex flex-col md:hidden">
        {/* Dominant video/image fills the screen; everything overlays it */}
        <BackgroundVideo clips={mobileClips} poster={posterUrl} alt={POSTER_ALT} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/95" />

        <div className="relative z-10 flex flex-col px-4 pt-20 pb-6">
          <Headline />
          {/* Boxes stacked vertically right below the headline, overlaying the video */}
          <div className="mt-5 flex flex-col gap-2.5">
            {pains.map((pain) => (
              <NeonChip key={pain.label} pain={pain} />
            ))}
          </div>
          <p className="mt-4 text-center text-lg font-extrabold uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            I know this <span className="text-accent">cycle</span> too well &darr;
          </p>
        </div>


      </div>

    </section>
  );
}
