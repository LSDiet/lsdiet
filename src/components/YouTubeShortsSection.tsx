import { useState, useEffect } from "react";
import { Play, ExternalLink, BookOpen, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CATEGORIES = [
  {
    label: "Education",
    icon: BookOpen,
    ids: ["xuN6enMPXMo", "P9K2VctpccA", "tN6H5UpAM9o"],
  },
  {
    label: "LS Lifestyle",
    icon: Utensils,
    ids: ["EIXfSTyNcpA", "wbEQiQkdDHs", "Fxg65gd33W0"],
  },
];

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
            See How I Eat{" "}
            <span className="text-accent">Every Day</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            I document what I eat, my ongoing transformation,
            <br />
            and the lessons I learned over the last 10 years.
          </p>
          <p className="mt-4 tracking-wide">
            <span className="text-lg md:text-xl font-bold text-foreground">Low-starch. Low-sugar.</span>
            <br />
            <span className="text-base font-bold text-accent">Real food. Real results.</span>
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.label}>
              {/* Category badge */}
              <div className="flex items-center gap-2 mb-4">
                <cat.icon className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                  {cat.label}
                </span>
              </div>

              {/* Cards stack */}
              <div className="flex flex-col gap-4">
                {cat.ids.map((id) => (
                  <div
                    key={id}
                    className="relative aspect-[9/16] rounded-xl overflow-hidden bg-muted cursor-pointer group"
                    onClick={() => setSelectedVideo(id)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${id}/0.jpg`}
                      alt={titles[id] || "YouTube Short"}
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
                        {titles[id] || "Loading…"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
