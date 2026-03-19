import { useState, useEffect, useCallback } from "react";
import { Play, ExternalLink, BookOpen, Utensils, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CATEGORIES = [
  {
    label: "Free Weight Loss Training",
    icon: BookOpen,
    ids: ["yskJGdXZXpI", "e3P3cBenjnM", "tN6H5UpAM9o", "DMoDkc7E_4c", "UkrflkjxXC0", "o9zbpAGtbTI"],
  },
  {
    label: "Low-Starch, Low-Sugar Lifestyle",
    icon: Utensils,
    ids: ["EIXfSTyNcpA", "wbEQiQkdDHs", "Fxg65gd33W0", "c5Yd4Ptqhf4", "4OjR5XyZ94c"],
  },
];

function VideoCard({
  id,
  title,
  direction,
  onPlay,
}: {
  id: string;
  title: string;
  direction: "left" | "right";
  onPlay: () => void;
}) {
  return (
    <div
      key={id}
      className={`relative aspect-[9/16] rounded-xl overflow-hidden bg-muted cursor-pointer group animate-fade-in`}
      onClick={onPlay}
    >
      <img
        src={`https://img.youtube.com/vi/${id}/0.jpg`}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {/* Play overlay */}
      <div className="absolute inset-0 bg-[hsl(0_0%_0%/0.25)] group-hover:bg-[hsl(0_0%_0%/0.1)] transition-colors flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="w-6 h-6 text-accent-foreground fill-accent-foreground ml-0.5" />
        </div>
      </div>
      {/* Title scrim */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[hsl(0_0%_0%/0.8)] to-transparent p-4 pt-10">
        <p className="text-sm font-medium text-[hsl(0_0%_100%)] line-clamp-2">
          {title}
        </p>
      </div>
    </div>
  );
}

function CategoryColumn({
  label,
  icon: Icon,
  ids,
  titles,
  onPlay,
}: {
  label: string;
  icon: typeof BookOpen;
  ids: string[];
  titles: Record<string, string>;
  onPlay: (id: string) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > activeIndex ? "right" : "left");
      setActiveIndex(idx);
    },
    [activeIndex]
  );

  const prev = () => goTo((activeIndex - 1 + ids.length) % ids.length);
  const next = () => goTo((activeIndex + 1) % ids.length);

  const currentId = ids[activeIndex];

  return (
    <div>
      {/* Category badge - centered */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-foreground" />
        <span className="text-sm font-semibold uppercase tracking-wider text-foreground">
          {label}
        </span>
      </div>

      {/* Card with navigation */}
      <div className="relative max-w-[300px] mx-auto">
        <VideoCard
          id={currentId}
          title={titles[currentId] || "Loading…"}
          direction={direction}
          onPlay={() => onPlay(currentId)}
        />

        {/* Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors z-10"
          aria-label="Previous video"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors z-10"
          aria-label="Next video"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-3">
          {ids.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "bg-accent w-5"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/70"
              }`}
              aria-label={`Go to video ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function YouTubeShortsSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [titles, setTitles] = useState<Record<string, string>>({});

  useEffect(() => {
    const allIds = CATEGORIES.flatMap((c) => c.ids);
    allIds.forEach((id) => {
      fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/shorts/${id}&format=json`
      )
        .then((r) => r.json())
        .then((data) => {
          if (data.title) {
            setTitles((prev) => ({ ...prev, [id]: data.title }));
          }
        })
        .catch(() => {});
    });
  }, []);

  return (
    <section className="py-14 md:py-20">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            YouTube Channel
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-4">
            Watch, Learn &{" "}
            <span className="text-accent">Transform</span>
          </h2>
        </div>

        {/* Two-column grid — one card visible per category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {CATEGORIES.map((cat) => (
            <CategoryColumn
              key={cat.label}
              label={cat.label}
              icon={cat.icon}
              ids={cat.ids}
              titles={titles}
              onPlay={(id) => setSelectedVideo(id)}
            />
          ))}
        </div>

        {/* Subscribe CTA */}
        <div className="text-center">
          <Button variant="accent" size="lg" className="px-8 gap-2" asChild>
            <a
              href="https://www.youtube.com/@WhatAboutWeight?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe on YouTube
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Video modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-sm w-full p-0 bg-black border-none overflow-hidden [&>button]:text-white [&>button]:z-10">
          {selectedVideo && (
            <div className="aspect-[9/16] w-full">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube Short"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
