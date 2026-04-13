import { ChevronDown } from "lucide-react";

import img201710 from "@/assets/journey/201710-graduation.jpg";
import img201908 from "@/assets/journey/201908-after-stress.jpg";
import img202012 from "@/assets/journey/202012-after-attempt1.jpg";
import img202204 from "@/assets/journey/202204-regain1.jpg";
import img202311 from "@/assets/journey/202311-after-attempt2.jpg";
import img202405 from "@/assets/journey/202405-regain2.jpg";

// Columns: each column is a vertical pair (top=300lbs, bottom=220lbs)
const columns = [
  {
    top: { src: img201908, label: "300 lbs" },
    bottom: { src: img201710, label: "220 lbs" },
    year: "2019",
  },
  {
    top: { src: img202204, label: "300 lbs" },
    bottom: { src: img202311, label: "220 lbs" },
    year: "2022",
  },
  {
    top: { src: img202405, label: "300 lbs" },
    bottom: { src: img202012, label: "220 lbs" },
    year: "2024",
  },
];

export function CinematicIntro() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden pt-14">
      {/* Photo grid: 3 columns, each with top photo, year divider, bottom photo */}
      <div className="absolute inset-0 grid grid-cols-3 gap-0">
        {columns.map((col, i) => (
          <div key={i} className="relative flex flex-col h-full">
            {/* Top photo (300 lbs) — shorter so bottom photos are visible */}
            <div className="relative flex-[0.85] overflow-hidden">
              <img
                src={col.top.src}
                alt={`Oscar at ${col.top.label}`}
                className="w-full h-full object-cover object-[center_15%] scale-[1.03] opacity-60"
              />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-extrabold text-white/60 uppercase tracking-wider">
                {col.top.label}
              </span>
            </div>

            {/* Year divider */}
            <div className="relative z-10 flex items-center justify-center py-1 bg-[hsl(0_0%_4%/0.85)]">
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-accent/90">
                {col.year}
              </span>
            </div>

            {/* Bottom photo (220 lbs) — taller to show transformation */}
            <div className="relative flex-[1.15] overflow-hidden">
              <img
                src={col.bottom.src}
                alt={`Oscar at ${col.bottom.label}`}
                className="w-full h-full object-cover object-[center_15%] scale-[1.03] opacity-60"
              />
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-extrabold text-white/60 uppercase tracking-wider">
                {col.bottom.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlay — lighter to let photos show */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0_0%_4%/0.3)] via-[hsl(0_0%_4%/0.45)] to-[hsl(0_0%_4%/0.85)]" />

      {/* Centered overlay text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 gap-5">
        <span className="inline-block px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent text-xs font-bold uppercase tracking-[0.2em] opacity-0 animate-fade-in-up">
          The Weight Yo-Yo
        </span>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.95] tracking-tight opacity-0 animate-fade-in-up animate-delay-100">
          Lost 80+ Lbs.
          <br />
          <span className="text-accent animate-pulse-glow">Three Times.</span>
        </h2>

        <div className="absolute bottom-8 opacity-0 animate-fade-in-up animate-delay-200">
          <ChevronDown className="w-7 h-7 text-accent/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
