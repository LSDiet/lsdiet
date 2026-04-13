import { ChevronDown } from "lucide-react";

import img201710 from "@/assets/journey/201710-graduation.jpg";
import img201908 from "@/assets/journey/201908-after-stress.jpg";
import img202012 from "@/assets/journey/202012-after-attempt1.jpg";
import img202204 from "@/assets/journey/202204-regain1.jpg";
import img202311 from "@/assets/journey/202311-after-attempt2.jpg";
import img202405 from "@/assets/journey/202405-regain2.jpg";

const photos = [
  { src: img201710, label: "220 lbs", year: "2017" },
  { src: img201908, label: "300 lbs", year: "2019" },
  { src: img202012, label: "220 lbs", year: "2020" },
  { src: img202204, label: "300 lbs", year: "2022" },
  { src: img202311, label: "220 lbs", year: "2023" },
  { src: img202405, label: "300 lbs", year: "2024" },
];

export function CinematicIntro() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden pt-14">
      {/* Photo grid background */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0">
        {photos.map((photo, i) => (
          <div key={i} className="relative overflow-hidden">
            <img
              src={photo.src}
              alt={`Oscar at ${photo.label} in ${photo.year}`}
              className="w-full h-full object-cover object-[center_15%] scale-[1.03] opacity-35"
            />
            {/* Weight + year label */}
            <div className="absolute bottom-3 left-3 flex flex-col gap-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-accent/80">
                {photo.year}
              </span>
              <span className="text-sm md:text-base font-extrabold text-white/70">
                {photo.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0_0%_4%/0.4)] via-[hsl(0_0%_4%/0.55)] to-[hsl(0_0%_4%/0.95)]" />

      {/* Centered overlay text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 gap-5">
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent text-xs font-bold uppercase tracking-[0.2em] opacity-0 animate-fade-in-up">
          The Weight Yo-Yo
        </span>

        {/* Headline */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.95] tracking-tight opacity-0 animate-fade-in-up animate-delay-100">
          Lost 80+ Lbs.
          <br />
          <span className="text-accent animate-pulse-glow">Three Times.</span>
        </h2>

        {/* Subtext */}
        <p className="max-w-md text-base md:text-lg text-[hsl(0_0%_60%)] leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
          Every time, he gained it all back.
          <br />
          <span className="text-foreground font-semibold">
            Until he figured out why.
          </span>
        </p>

        {/* Scroll prompt */}
        <div className="absolute bottom-8 opacity-0 animate-fade-in-up animate-delay-300">
          <ChevronDown className="w-7 h-7 text-accent/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
