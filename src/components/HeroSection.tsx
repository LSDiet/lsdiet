import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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

const LCP_SIZES = "(min-width: 768px) 22vw, 45vw";
const MOBILE_SIZES = "(min-width: 768px) 22vw, 45vw";

function TransformationCard({
  pair,
  eager,
  priority,
  sizes,
  mounted = true,
}: {
  pair: Pair;
  eager?: boolean;
  priority?: boolean;
  sizes: string;
  mounted?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_24px_-12px_hsl(0_0%_0%/0.12)]">
      <div className="grid aspect-[4/3] grid-cols-2">
        <div className="relative overflow-hidden bg-white/[0.03]">
          {mounted && (
            <ResponsivePicture
              src={pair.before}
              alt={`Oscar Poon in ${pair.year}, weighing ${pair.beforeLbs} before adopting the LS Diet low-starch, low-sugar lifestyle`}
              eager={eager}
              priority={priority}
              sizes={sizes}
              className={`h-full w-full object-cover ${pair.beforePos}`}
            />
          )}
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-3 py-1 text-[11px] font-extrabold tracking-wider text-accent backdrop-blur-sm">
            {pair.beforeLbs}
          </span>
        </div>
        <div className="relative overflow-hidden bg-white/[0.03]">
          {mounted && (
            <ResponsivePicture
              src={pair.after}
              alt={`Oscar Poon in ${pair.year}, weighing ${pair.afterLbs} after losing weight on LS Diet`}
              eager={eager}
              priority={priority}
              sizes={sizes}
              className={`h-full w-full object-cover ${pair.afterPos}`}
            />
          )}
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-3 py-1 text-[11px] font-extrabold tracking-wider text-white backdrop-blur-sm">
            {pair.afterLbs}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 py-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Before</span>
        <span className="text-xl font-extrabold text-accent">{pair.year}</span>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">After</span>
      </div>

    </div>
  );
}

function MobileHeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);
  // Track which slides have been mounted. First slide eager; others mount
  // on first interaction OR after idle, whichever comes first.
  const [mounted, setMounted] = useState<boolean[]>(() => pairs.map((_, i) => i === 0));

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      setSelected(idx);
      setMounted((prev) => {
        if (prev[idx]) return prev;
        const next = [...prev];
        next[idx] = true;
        return next;
      });
    };
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Idle mount of remaining slides so autoplay has assets ready.
  useEffect(() => {
    const cb = () => setMounted(pairs.map(() => true));
    const w = window as typeof window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(cb, { timeout: 3000 })
      : window.setTimeout(cb, 2500);
    return () => {
      if (w.requestIdleCallback && typeof id === "number") {
        (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
      } else {
        clearTimeout(id as number);
      }
    };
  }, []);

  const scrollTo = (idx: number) => emblaApi?.scrollTo(idx);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">

        ← Swipe left or right →
      </p>
      <div className="overflow-hidden" ref={emblaRef} aria-label="Transformation years carousel">
        <div className="flex touch-pan-y">
          {pairs.map((pair, idx) => (
            <div key={pair.year} className="min-w-0 flex-[0_0_100%]">
              <TransformationCard
                pair={pair}
                eager={idx === 0}
                priority={idx === 0}
                sizes={MOBILE_SIZES}
                mounted={mounted[idx]}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Select transformation year">
        {pairs.map((pair, idx) => (
          <button
            key={pair.year}
            type="button"
            role="tab"
            aria-selected={selected === idx}
            aria-label={`Show ${pair.year} transformation`}
            onClick={() => scrollTo(idx)}
            className={`h-1.5 rounded-full transition-all ${
              selected === idx ? "w-8 bg-accent" : "w-2 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative w-full bg-background pt-4 md:pt-14 text-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 md:gap-8 md:px-8 md:py-10">

        {/* Heading — shown at top on desktop only */}
        <div className="hidden text-center md:block">
          <h2 className="font-sans text-3xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            LS Diet:
            <br />
            A{" "}
            <span className="text-accent animate-pulse-glow">
              weight regain prevention
            </span>{" "}
            system
          </h2>
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

        {/* MOBILE (<md): single full-width auto-advancing carousel */}
        <div className="md:hidden">
          <MobileHeroCarousel />
        </div>

        <p className="text-center text-sm font-medium text-foreground sm:text-base">
          I learned and now I help people{" "}
          <span className="text-accent font-bold">stop regaining weight</span>.
        </p>


        {/* Heading — shown below the stats on mobile only */}
        <div className="text-center md:hidden">
          <h2 className="font-sans text-3xl font-extrabold uppercase leading-[1.1] tracking-tight">
            LS Diet:
            <br />
            A{" "}
            <span className="text-accent animate-pulse-glow">
              weight regain prevention
            </span>{" "}
            system
          </h2>
        </div>
      </div>

    </section>
  );
}
