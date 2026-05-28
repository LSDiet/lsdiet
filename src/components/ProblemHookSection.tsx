/**
 * Problem Hook — the very first thing visitors see on the home page.
 *
 * Goal: the moment someone lands (laptop OR phone, no scrolling) they should
 * think "that's me". A single data array drives both compositions:
 *   - Desktop/tablet (md+): photo of a frustrated woman with 5 neon pain-point
 *     boxes positioned around her.
 *   - Phone (<md): headline + compact photo + 5 small tappable neon chips,
 *     all sized to fit within one screen height.
 *
 * Performance constraints (per spec):
 *   - Responsive AVIF/WebP via vite-imagetools
 *   - loading="eager" + fetchPriority high (this is the LCP image)
 *   - No parallax, no video, no blur-backdrop filters
 *   - Neon glow = lightweight box-shadow only
 *   - Animation limited to the chevron bounce
 */
import { ChevronDown, Compass, BatteryLow, TrendingDown, Footprints, CloudRain } from "lucide-react";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import bg from "@/assets/problem-hook-bg.jpg?w=400;800;1200;1600&format=avif;webp&as=picture";

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

/** Absolute positions for the 5 desktop boxes, arranged around the woman. */
const desktopPos = [
  "left-[3%] top-[34%]",
  "right-[4%] top-[26%]",
  "left-[5%] top-[60%]",
  "right-[6%] top-[56%]",
  "left-1/2 -translate-x-1/2 bottom-[7%]",
];

function NeonBox({ pain, className = "" }: { pain: Pain; className?: string }) {
  const { Icon } = pain;
  return (
    <a
      href={pain.href}
      className={`group inline-flex items-center gap-3 rounded-2xl border-2 bg-black/70 px-4 py-3 text-left transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
      style={{
        borderColor: `hsl(${pain.hsl})`,
        boxShadow: `0 0 14px -2px hsl(${pain.hsl} / 0.55)`,
      }}
    >
      <Icon className="h-5 w-5 shrink-0" style={{ color: `hsl(${pain.hsl})` }} aria-hidden="true" />
      <span className="text-sm font-bold leading-tight text-white">{pain.label}</span>
    </a>
  );
}

function NeonChip({ pain }: { pain: Pain }) {
  const { Icon } = pain;
  return (
    <a
      href={pain.href}
      className="flex items-center gap-2 rounded-xl border-2 bg-black/70 px-3 py-2.5"
      style={{
        borderColor: `hsl(${pain.hsl})`,
        boxShadow: `0 0 10px -2px hsl(${pain.hsl} / 0.55)`,
      }}
    >
      <Icon className="h-4 w-4 shrink-0" style={{ color: `hsl(${pain.hsl})` }} aria-hidden="true" />
      <span className="text-[13px] font-bold leading-tight text-white">{pain.label}</span>
    </a>
  );
}

function Headline() {
  return (
    <h1 className="text-center font-sans font-extrabold uppercase leading-[1.05] tracking-tight text-white text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl">
      How to <span className="text-accent">lose weight</span> when&hellip;
    </h1>
  );
}

export function ProblemHookSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] text-white">
      {/* ============ DESKTOP / TABLET (md+) ============ */}
      <div className="relative hidden min-h-[100svh] md:block">
        <ResponsivePicture
          src={bg}
          alt="A tired, frustrated woman sitting alone at a dark table at night"
          eager
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* darkening overlay (gradient, no blur) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

        <div className="relative z-10 flex min-h-[100svh] flex-col px-8 pt-24 pb-10">
          <Headline />
          <div className="relative mt-auto w-full max-w-6xl mx-auto flex-1">
            {pains.map((pain, i) => (
              <div key={pain.label} className={`absolute ${desktopPos[i]} max-w-[15rem]`}>
                <NeonBox pain={pain} />
              </div>
            ))}
          </div>
          <ChevronDown className="mx-auto mt-4 h-7 w-7 animate-bounce text-accent" aria-hidden="true" />
        </div>
      </div>

      {/* ============ PHONE (<md) ============ */}
      <div className="relative flex min-h-[100svh] flex-col px-4 pt-20 pb-6 md:hidden">
        <Headline />
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10">
          <ResponsivePicture
            src={bg}
            alt="A tired, frustrated woman sitting alone at a dark table at night"
            eager
            priority
            sizes="100vw"
            className="h-[24svh] w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {pains.slice(0, 4).map((pain) => (
            <NeonChip key={pain.label} pain={pain} />
          ))}
          <div className="col-span-2 flex justify-center">
            <div className="w-1/2">
              <NeonChip pain={pains[4]} />
            </div>
          </div>
        </div>
        <ChevronDown className="mx-auto mt-auto h-6 w-6 animate-bounce text-accent" aria-hidden="true" />
      </div>
    </section>
  );
}
