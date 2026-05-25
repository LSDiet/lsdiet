import { ResponsivePicture, type PictureSrc } from "@/components/ui/ResponsivePicture";
import img2019a from "@/assets/hero/2019a.png?w=400;800;1200&format=avif;webp&as=picture";
import img2019b from "@/assets/hero/2019b.png?w=400;800;1200&format=avif;webp&as=picture";
import img2021a from "@/assets/hero/2021a.png?w=400;800&format=avif;webp&as=picture";
import img2021b from "@/assets/hero/2021b.png?w=400;800&format=avif;webp&as=picture";
import img2024a from "@/assets/hero/2024a.png?w=400;800&format=avif;webp&as=picture";
import img2024b from "@/assets/hero/2024b.png?w=400;800&format=avif;webp&as=picture";

type Pair = {
  year: string;
  before: PictureSrc;
  beforeLbs: string;
  beforePos: string;
  after: PictureSrc;
  afterLbs: string;
  afterPos: string;
};

const pairs: Pair[] = [
  {
    year: "2019",
    before: img2019a, beforeLbs: "300 LBS", beforePos: "object-top",
    after: img2019b, afterLbs: "180 LBS", afterPos: "object-top",
  },
  {
    year: "2022",
    before: img2021a, beforeLbs: "280 LBS", beforePos: "object-right",
    after: img2021b, afterLbs: "200 LBS", afterPos: "object-top",
  },
  {
    year: "2024",
    before: img2024a, beforeLbs: "310 LBS", beforePos: "object-top",
    after: img2024b, afterLbs: "190 LBS", afterPos: "object-top",
  },
];

// LCP card (mobile primary, desktop first column) uses ~50vw on mobile, ~22vw on desktop.
const LCP_SIZES = "(min-width: 768px) 22vw, 45vw";
// Secondary cards on mobile scroll-snap strip take ~80vw of viewport.
const MOBILE_STRIP_SIZES = "(min-width: 768px) 22vw, 70vw";

function TransformationCard({
  pair,
  eager,
  priority,
  sizes,
}: {
  pair: Pair;
  eager?: boolean;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="grid aspect-[4/3] grid-cols-2">
        <div className="relative overflow-hidden">
          <ResponsivePicture
            src={pair.before}
            alt={`Oscar Poon in ${pair.year}, weighing ${pair.beforeLbs} before adopting the LS Diet low-starch, low-sugar lifestyle`}
            eager={eager}
            priority={priority}
            sizes={sizes}
            className={`h-full w-full object-cover ${pair.beforePos}`}
          />
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-3 py-1 text-[11px] font-extrabold tracking-wider text-accent backdrop-blur-sm">
            {pair.beforeLbs}
          </span>
        </div>
        <div className="relative overflow-hidden">
          <ResponsivePicture
            src={pair.after}
            alt={`Oscar Poon in ${pair.year}, weighing ${pair.afterLbs} after losing weight on LS Diet`}
            eager={eager}
            priority={priority}
            sizes={sizes}
            className={`h-full w-full object-cover ${pair.afterPos}`}
          />
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-3 py-1 text-[11px] font-extrabold tracking-wider text-white backdrop-blur-sm">
            {pair.afterLbs}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 py-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Before</span>
        <span className="text-xl font-extrabold text-accent">{pair.year}</span>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">After</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative w-full bg-[#0a0a0a] pt-14 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:gap-8 md:px-8 md:py-10">
        <div className="text-center">
          <h1 className="font-sans text-3xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            LS Diet:
            <br />
            A{" "}
            <span className="text-accent animate-pulse-glow">
              weight regain prevention
            </span>{" "}
            system
          </h1>
        </div>

        {/* DESKTOP (md+): 3-card grid — unchanged behaviour */}
        <div className="hidden md:grid gap-6 md:grid-cols-3">
          {pairs.map((pair, idx) => (
            <TransformationCard
              key={pair.year}
              pair={pair}
              eager={idx === 0}
              priority={idx === 0}
              sizes={LCP_SIZES}
            />
          ))}
        </div>

        {/* MOBILE (<md): LCP card eager + priority; remaining cards in
            horizontal scroll-snap strip below, all lazy-loaded.
            Cuts LCP image count from 6 to 2 on phones. */}
        <div className="md:hidden flex flex-col gap-4">
          <TransformationCard pair={pairs[0]} eager priority sizes={LCP_SIZES} />

          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            Swipe for more years →
          </p>

          <div
            className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Additional transformation years"
          >
            {pairs.slice(1).map((pair) => (
              <div key={pair.year} className="w-[80vw] flex-shrink-0 snap-center">
                <TransformationCard pair={pair} sizes={MOBILE_STRIP_SIZES} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm font-medium text-white/85 sm:text-base">
          Lost <span className="text-accent font-bold">80+ lbs three times</span>. Built LS Diet to stop restarting.
        </p>

        <div className="flex justify-center pt-2">
          <a
            href="https://www.skool.com/lsdiet/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-lg shadow-accent/20 transition-transform hover:scale-[1.02] md:text-base"
          >
            Join LS Diet
          </a>
        </div>
      </div>
    </section>
  );
}
