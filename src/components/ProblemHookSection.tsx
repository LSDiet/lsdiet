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

/**
 * Background video clips. Empty until copyright-free footage is uploaded and
 * encoded — until then BackgroundVideo gracefully shows the poster image.
 *
 * When clips are ready, drop the encoded files in src/assets and reference:
 *   import clip1Webm from "@/assets/hook-clip-1.webm";
 *   import clip1Mp4  from "@/assets/hook-clip-1.mp4";
 *   then add { webm: clip1Webm, mp4: clip1Mp4 } to the array below.
 */
const desktopClips: VideoClip[] = [];
const mobileClips: VideoClip[] = [];

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
  { label: "I don\u2019t want to exercise", href: "/blog/how-to-get-energy-to-exercise-after-working-all-day", hsl: "150 70% 48%", Icon: Footprints },
  { label: "I stress eat", href: "/blog/why-does-stress-make-me-eat-more", hsl: "280 70% 65%", Icon: CloudRain },
];

/**
 * Asymmetric desktop placements — deliberate inward pressure around the woman,
 * intentionally not mathematically even. Order matches `pains`.
 */
const desktopPos = [
  "left-[4%] top-[20%]",                                  // top-left
  "right-[5%] top-[15%]",                                 // top-right
  "left-[7%] top-[58%]",                                  // lower-left
  "right-[6%] top-[52%]",                                 // mid-right
  "left-1/2 -translate-x-1/2 bottom-[5%]",               // bottom-centre (over table edge)
];

/** Layered, performance-safe neon glow (box-shadow only). */
function glow(hsl: string) {
  return `0 0 0 1px hsl(${hsl} / 0.5), 0 0 12px -2px hsl(${hsl} / 0.45), 0 0 22px -6px hsl(${hsl} / 0.3)`;
}

function NeonBox({ pain }: { pain: Pain }) {
  const { Icon } = pain;
  return (
    <a
      href={pain.href}
      className="group inline-flex items-center gap-3 rounded-2xl border-2 bg-black/75 px-5 py-4 text-left transition-all duration-200 hover:-translate-y-1"
      style={{ borderColor: `hsl(${pain.hsl})`, boxShadow: glow(pain.hsl) }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1px hsl(${pain.hsl} / 0.7), 0 0 18px -2px hsl(${pain.hsl} / 0.6), 0 0 32px -6px hsl(${pain.hsl} / 0.45)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = glow(pain.hsl);
      }}
    >
      <Icon className="h-6 w-6 shrink-0" style={{ color: `hsl(${pain.hsl})` }} aria-hidden="true" />
      <span className="text-base font-bold leading-tight text-white">{pain.label}</span>
    </a>
  );
}

function NeonChip({ pain }: { pain: Pain }) {
  const { Icon } = pain;
  return (
    <a
      href={pain.href}
      className="flex items-center gap-2 rounded-xl border-2 bg-black/80 px-3 py-3"
      style={{ borderColor: `hsl(${pain.hsl})`, boxShadow: glow(pain.hsl) }}
    >
      <Icon className="h-5 w-5 shrink-0" style={{ color: `hsl(${pain.hsl})` }} aria-hidden="true" />
      <span className="text-sm font-bold leading-tight text-white">{pain.label}</span>
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
        <BackgroundVideo clips={desktopClips} poster={posterUrl} alt={POSTER_ALT} />
        {/* Edge-weighted darkening: keep her face bright, vignette the edges + bottom scrim */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_30%,rgba(0,0,0,0.55)_78%,rgba(0,0,0,0.85)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 to-transparent" />

        <div className="relative z-10 flex min-h-[100svh] flex-col px-8 pt-24 pb-10">
          <Headline />
          <div className="relative mt-6 w-full max-w-5xl mx-auto flex-1">
            {pains.map((pain, i) => (
              <div key={pain.label} className={`absolute ${desktopPos[i]} max-w-[16rem]`}>
                <NeonBox pain={pain} />
              </div>
            ))}
          </div>
          <ChevronDown className="mx-auto mt-2 h-7 w-7 animate-bounce text-accent/80" aria-hidden="true" />
        </div>
      </div>

      {/* ============ PHONE (<md) ============ */}
      <div className="relative flex min-h-[100svh] flex-col md:hidden">
        {/* Dominant video/image fills the screen; everything overlays it */}
        <BackgroundVideo clips={mobileClips} poster={posterUrl} alt={POSTER_ALT} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/95" />

        <div className="relative z-10 flex min-h-[100svh] flex-col px-4 pt-20 pb-6">
          <Headline />
          {/* Cards overlay the lower portion of the image, tightly grouped 2-2-1 */}
          <div className="mt-auto grid grid-cols-2 gap-2.5">
            {pains.slice(0, 4).map((pain) => (
              <NeonChip key={pain.label} pain={pain} />
            ))}
            <div className="col-span-2 flex justify-center">
              <div className="w-2/3">
                <NeonChip pain={pains[4]} />
              </div>
            </div>
          </div>
          <ChevronDown className="mx-auto mt-4 h-6 w-6 animate-bounce text-accent/80" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
