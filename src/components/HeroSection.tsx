import img2019a from "@/assets/hero/2019a.png?w=400;800&format=avif;webp&as=picture";
import img2019b from "@/assets/hero/2019b.png?w=400;800&format=avif;webp&as=picture";
import img2021a from "@/assets/hero/2021a.png?w=400;800&format=avif;webp&as=picture";
import img2021b from "@/assets/hero/2021b.png?w=400;800&format=avif;webp&as=picture";
import img2024a from "@/assets/hero/2024a.png?w=400;800&format=avif;webp&as=picture";
import img2024b from "@/assets/hero/2024b.png?w=400;800&format=avif;webp&as=picture";

type PictureSrc = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

const SIZES = "(min-width: 768px) 22vw, 45vw";

function ResponsivePicture({
  src,
  alt,
  className,
  eager,
  priority,
}: {
  src: PictureSrc;
  alt: string;
  className?: string;
  eager?: boolean;
  priority?: boolean;
}) {
  return (
    <picture>
      {Object.entries(src.sources).map(([type, srcset]) => (
        <source key={type} type={`image/${type}`} srcSet={srcset} sizes={SIZES} />
      ))}
      <img
        src={src.img.src}
        width={src.img.w}
        height={src.img.h}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}

const pairs = [
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
] as { year: string; before: PictureSrc; beforeLbs: string; beforePos: string; after: PictureSrc; afterLbs: string; afterPos: string }[];

export function HeroSection() {
  return (
    <section className="relative w-full bg-[#0a0a0a] pt-14 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:gap-8 md:px-8 md:py-10">
        <div className="text-center">
          <h1 className="font-sans text-3xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            LS Diet:
            <br className="sm:hidden" />
            <span className="sm:ml-3">A </span>
            <span className="relative inline-block text-accent animate-pulse-glow">
              weight regain prevention
            </span>
            <span> system</span>
          </h1>
        </div>


        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {pairs.map((pair, idx) => (
            <div
              key={pair.year}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
            >
              <div className="grid aspect-[4/3] grid-cols-2">
                <div className="relative overflow-hidden">
                  <ResponsivePicture
                    src={pair.before}
                    alt={`Oscar Poon in ${pair.year}, weighing ${pair.beforeLbs} before adopting the LS Diet low-starch, low-sugar lifestyle`}
                    eager={idx === 0}
                    priority={idx === 0}
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
                    eager={idx === 0}
                    priority={idx === 0}
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
          ))}
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
