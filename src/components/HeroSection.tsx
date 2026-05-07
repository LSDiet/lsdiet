import img2019a from "@/assets/hero/2019a.png";
import img2019b from "@/assets/hero/2019b.png";
import img2021a from "@/assets/hero/2021a.png";
import img2021b from "@/assets/hero/2021b.png";
import img2024a from "@/assets/hero/2024a.png";
import img2024b from "@/assets/hero/2024b.png";

const rows = [
  { year: "2019", before: img2019a, after: img2019b },
  { year: "2021", before: img2021a, after: img2021b },
  { year: "2024", before: img2024a, after: img2024b },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full bg-[#0a0a0a] pt-14 text-white">
      <div className="mx-auto flex h-[calc(100dvh-3.5rem)] max-w-3xl flex-col gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-5">
        {/* Headline */}
        <div className="text-center">
          <h1 className="font-sans text-2xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            I Lost <span className="text-accent">80+ Lbs</span> Three Times.
          </h1>
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-white/70 sm:text-xs md:mt-2 md:text-sm">
            And LS Diet is the only way to stop the{" "}
            <span className="text-accent">weight regain</span>.
          </p>
        </div>

        {/* Photo timeline */}
        <div className="flex min-h-0 flex-1 flex-col gap-2 md:gap-3">
          {rows.map((row) => (
            <div key={row.year} className="flex min-h-0 flex-1 items-center gap-2 md:gap-3">
              <div className="w-8 flex-shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/80 md:w-12 md:text-xs">
                {row.year}
              </div>
              <div className="grid min-h-0 flex-1 grid-cols-2 gap-2 md:gap-3 h-full">
                {[row.before, row.after].map((src, i) => (
                  <div
                    key={i}
                    className="h-full overflow-hidden rounded-lg bg-white/[0.03]"
                  >
                    <img
                      src={src}
                      alt={`Oscar in ${row.year}, ${i === 0 ? "before" : "after"} weight loss`}
                      loading="lazy"
                      className="h-full w-full object-contain transition-[filter] duration-300 hover:brightness-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
