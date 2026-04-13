/**
 * Reusable flanking before/after photo strips for content sections.
 * Wraps children with a BEFORE photo on the left and AFTER photo on the right.
 * On mobile, shows the photo pair above the content instead.
 */

interface SectionPhotoFrameProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  children: React.ReactNode;
}

export function SectionPhotoFrame({
  beforeSrc,
  afterSrc,
  beforeLabel = "300 lbs",
  afterLabel = "220 lbs",
  children,
}: SectionPhotoFrameProps) {
  return (
    <>
      {/* Mobile: side-by-side pair above content */}
      <div className="md:hidden flex gap-3 justify-center mb-8 px-4">
        <div className="relative w-36 h-48 rounded-xl overflow-hidden border border-[hsl(0_0%_18%)]">
          <img src={beforeSrc} alt="Before" className="w-full h-full object-cover object-[center_15%]" />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent py-2 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent/80">Before</span>
            <span className="block text-xs font-extrabold text-white/80">{beforeLabel}</span>
          </div>
        </div>
        <div className="relative w-36 h-48 rounded-xl overflow-hidden border border-[hsl(0_0%_18%)]">
          <img src={afterSrc} alt="After" className="w-full h-full object-cover object-[center_15%]" />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent py-2 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80">After</span>
            <span className="block text-xs font-extrabold text-white/80">{afterLabel}</span>
          </div>
        </div>
      </div>

      {/* Desktop: flanking layout */}
      <div className="hidden md:grid md:grid-cols-[140px_1fr_140px] gap-6 items-stretch">
        {/* Before strip */}
        <div className="relative rounded-xl overflow-hidden border border-[hsl(0_0%_18%)]">
          <img src={beforeSrc} alt="Before" className="w-full h-full object-cover object-[center_15%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 inset-x-0 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent/80">Before</span>
            <span className="block text-sm font-extrabold text-white/80">{beforeLabel}</span>
          </div>
        </div>

        {/* Section content */}
        <div>{children}</div>

        {/* After strip */}
        <div className="relative rounded-xl overflow-hidden border border-[hsl(0_0%_18%)]">
          <img src={afterSrc} alt="After" className="w-full h-full object-cover object-[center_15%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 inset-x-0 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80">After</span>
            <span className="block text-sm font-extrabold text-white/80">{afterLabel}</span>
          </div>
        </div>
      </div>
    </>
  );
}
