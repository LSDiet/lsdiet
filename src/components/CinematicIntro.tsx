import { ChevronDown } from "lucide-react";

import img201710 from "@/assets/journey/201710-graduation.jpg";
import img201908 from "@/assets/journey/201908-after-stress.jpg";
import img202012 from "@/assets/journey/202012-after-attempt1.jpg";
import img202204 from "@/assets/journey/202204-regain1.jpg";
import img202311 from "@/assets/journey/202311-after-attempt2.jpg";
import img202405 from "@/assets/journey/202405-regain2.jpg";

const columns = [
  {
    top: { src: img201908, label: "300 lbs", objectPos: "object-[center_15%]" },
    bottom: { src: img201710, label: "180 lbs", objectPos: "object-center" },
    year: "2019",
  },
  {
    top: { src: img202204, label: "280 lbs", objectPos: "object-[center_15%]" },
    bottom: { src: img202012, label: "200 lbs", objectPos: "object-[center_15%]" },
    year: "2022",
  },
  {
    top: { src: img202405, label: "300 lbs", objectPos: "object-[center_15%]" },
    bottom: { src: img202311, label: "190 lbs", objectPos: "object-[center_15%]" },
    year: "2025",
  },
];

function AnimatedLine({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) {
  const words = text.split(" ");
  let globalIndex = 0;

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-4"
      style={{ perspective: "800px" }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex">
          {word.split("").map((char) => {
            const i = globalIndex++;
            return (
              <span
                key={`${wi}-${i}`}
                className="relative inline-block text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tight animate-letter-pop-3d"
                style={{
                  animationDelay: `${(delayOffset + i) * 70}ms`,
                  animationFillMode: "both",
                  fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                }}
              >
                {/* Dark stroke layer behind */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "6px rgba(0,0,0,0.9)",
                  }}
                >
                  {char}
                </span>
                {/* Gold gradient layer on top */}
                <span
                  style={{
                    position: "relative",
                    background: "linear-gradient(180deg, #fde68a 0%, #f59e0b 40%, #b45309 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}

export function CinematicIntro() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden pt-14">
      <div className="absolute inset-0 grid grid-cols-3 gap-0">
        {columns.map((col, i) => (
          <div key={i} className="relative flex h-full min-h-0 flex-col">
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <img
                src={col.top.src}
                alt={`Oscar Poon at ${col.top.label} during his weight cycling journey before LS Diet`}
                className={`h-full w-full object-cover ${col.top.objectPos} scale-[1.03] opacity-70`}
              />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-wider text-foreground/70 md:text-xs">
                {col.top.label}
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-center bg-background/70 py-1">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent md:text-sm">
                {col.year}
              </span>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden">
              <img
                src={col.bottom.src}
                alt={`Oscar Poon at ${col.bottom.label} after losing weight with the low-starch, low-sugar lifestyle`}
                className={`h-full w-full object-cover ${col.bottom.objectPos} scale-[1.03] opacity-70`}
              />
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-wider text-foreground/70 md:text-xs">
                {col.bottom.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/35 to-background/70" />

      {/* "Lost 80+ Lbs" centered on the TOP (fat) row */}
      <div className="pointer-events-none absolute inset-x-0 top-14 z-10 flex items-center justify-center" style={{ height: "calc((100dvh - 3.5rem) / 2 - 0.75rem)" }}>
        <AnimatedLine text="Lost 80+ Lbs" />
      </div>

      {/* "Three Times" centered on the BOTTOM (skinny) row */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-center" style={{ height: "calc((100dvh - 3.5rem) / 2 - 0.75rem)" }}>
        <div className="flex flex-col items-center gap-4">
          <AnimatedLine text="Three Times" delayOffset={10} />
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "2s", animationFillMode: "both" }}>
            <ChevronDown className="h-7 w-7 text-accent/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}