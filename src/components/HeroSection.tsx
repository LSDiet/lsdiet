import img2019a from "@/assets/hero/2019a.png";
import img2019b from "@/assets/hero/2019b.png";
import img2021a from "@/assets/hero/2021a.png";
import img2021b from "@/assets/hero/2021b.png";
import img2024a from "@/assets/hero/2024a.png";
import img2024b from "@/assets/hero/2024b.png";

const rows = [
  {
    year: "2019",
    left: { src: img2019a, alt: "Oscar in 2019, before weight loss", emphasis: true },
    right: { src: img2019b, alt: "Oscar in 2019, after weight loss", emphasis: false },
  },
  {
    year: "2021",
    left: { src: img2021a, alt: "Oscar in 2021, before weight loss", emphasis: false },
    right: { src: img2021b, alt: "Oscar in 2021, after weight loss", emphasis: false },
  },
  {
    year: "2024",
    left: { src: img2024a, alt: "Oscar in 2024, before weight loss", emphasis: false },
    right: { src: img2024b, alt: "Oscar in 2024, after weight loss", emphasis: true },
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full bg-[#0a0a0a] pt-14 text-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 py-10 md:grid-cols-2 md:gap-14 md:px-10 md:py-14 lg:gap-20 lg:px-16">
        {/* LEFT: photo timeline */}
        <div className="order-1 flex flex-col gap-6 md:gap-8">
          {rows.map((row) => (
            <div key={row.year}>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.3em] text-white/40 md:text-xs">
                {row.year}
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[row.left, row.right].map((img, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden rounded-2xl bg-white/[0.03] ${
                      img.emphasis ? "ring-1 ring-white/10" : ""
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className={`h-full w-full object-cover transition-[filter] duration-300 hover:brightness-110 ${
                        img.emphasis ? "aspect-[4/5]" : "aspect-square"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: typography */}
        <div className="order-2 flex flex-col justify-start md:pt-[8vh] lg:pt-[12vh]">
          <h1 className="font-sans text-5xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block">I Lost</span>
            <span className="block text-accent">80+ Lbs</span>
            <span className="block">Three Times.</span>
          </h1>

          <p className="mt-8 text-xl font-semibold tracking-tight text-white md:text-2xl lg:text-3xl">
            LS Diet stops the <span className="text-accent">weight regain</span>.
          </p>

          <p className="mt-4 text-sm font-normal text-white/50 md:text-base">
            A psychological system for weight permanence.
          </p>
        </div>
      </div>
    </section>
  );
}
