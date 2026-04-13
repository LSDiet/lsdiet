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

export function CinematicIntro() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden pt-14">
      <div className="absolute inset-0 grid grid-cols-3 gap-0">
        {columns.map((col, i) => (
          <div key={i} className="relative flex h-full min-h-0 flex-col">
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <img
                src={col.top.src}
                alt={`Oscar at ${col.top.label}`}
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
                alt={`Oscar at ${col.bottom.label}`}
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

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-between px-6 pb-8 pt-24 text-center">
        <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent opacity-0 animate-fade-in-up">
          The Weight Yo-Yo
        </span>

        <div className="opacity-0 animate-fade-in-up animate-delay-200">
          <ChevronDown className="h-7 w-7 text-accent/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
