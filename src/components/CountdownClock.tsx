import { useState, useEffect } from "react";

const LAUNCH_DATE = new Date("2026-04-30T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = Math.max(0, LAUNCH_DATE.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ perspective: "200px" }}>
        <div className="relative w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16">
          {/* Top half */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-accent/30 to-accent/20 rounded-t-lg border border-b-0 border-accent/30 overflow-hidden z-10">
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-2xl sm:text-3xl md:text-4xl font-black text-accent tabular-nums">
              {display}
            </span>
          </div>
          {/* Bottom half */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/15 to-accent/20 rounded-b-lg border border-t-0 border-accent/30 overflow-hidden">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl font-black text-accent tabular-nums">
              {display}
            </span>
          </div>
          {/* Center line */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-background/40 z-20" />
          {/* Shine */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-20" />
        </div>
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-semibold">
        {label}
      </span>
    </div>
  );
}

export function CountdownClock({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-sm font-bold text-accent tabular-nums">
        <span>{time.days}d</span>
        <span className="text-muted-foreground">:</span>
        <span>{String(time.hours).padStart(2, "0")}h</span>
        <span className="text-muted-foreground">:</span>
        <span>{String(time.minutes).padStart(2, "0")}m</span>
        <span className="text-muted-foreground">:</span>
        <span>{String(time.seconds).padStart(2, "0")}s</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      <FlipUnit value={time.days} label="Days" />
      <span className="text-2xl md:text-3xl font-bold text-accent/50 self-start mt-4 md:mt-5">:</span>
      <FlipUnit value={time.hours} label="Hours" />
      <span className="text-2xl md:text-3xl font-bold text-accent/50 self-start mt-4 md:mt-5">:</span>
      <FlipUnit value={time.minutes} label="Min" />
      <span className="text-2xl md:text-3xl font-bold text-accent/50 self-start mt-4 md:mt-5">:</span>
      <FlipUnit value={time.seconds} label="Sec" />
    </div>
  );
}
