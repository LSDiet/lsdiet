import type { ReactNode } from "react";

interface SectionPhotoFrameProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  children: ReactNode;
}

export function SectionPhotoFrame({
  beforeSrc,
  afterSrc,
  beforeLabel = "300 lbs",
  afterLabel = "220 lbs",
  children,
}: SectionPhotoFrameProps) {
  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] border border-border/40 shadow-2xl">
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative">
          <img
            src={beforeSrc}
            alt="Oscar before his transformation"
            loading="lazy"
            className="h-full w-full object-cover object-[center_15%] scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/15 via-background/70 to-background" />
        </div>

        <div className="relative">
          <img
            src={afterSrc}
            alt="Oscar after his transformation"
            loading="lazy"
            className="h-full w-full object-cover object-[center_15%] scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background/15 via-background/70 to-background" />
        </div>
      </div>

      <div className="absolute inset-0 bg-background/20" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-border/40" />

      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-border/50 bg-background/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-sm md:left-6 md:top-6">
        Before · {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full border border-border/50 bg-background/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm md:right-6 md:top-6">
        After · {afterLabel}
      </div>

      <div className="relative z-10 px-5 py-14 md:px-10 md:py-16">{children}</div>
    </div>
  );
}
