import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useEmblaCarousel from "embla-carousel-react";

const SHORTS = [
  { id: "e3P3cBenjnM", title: "26 Day LS Challenge: How to Eat Out Daily" },
  { id: "P9K2VctpccA", title: "What BMI Is and Is Not: Use It Directionally" },
  { id: "tN6H5UpAM9o", title: "Why I Do 26 Days LS Diet Instead of 30" },
  { id: "wbEQiQkdDHs", title: "Stop saying NO to family gatherings" },
  { id: "Fxg65gd33W0", title: "My egg exploded in the microwave (but I ate it)" },
];

export function YouTubeShortsSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

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
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            I record my meals and transformation daily on YouTube. Low starch, low sugar — real food, real results.
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden mb-10" ref={emblaRef}>
          <div className="flex gap-4">
            {SHORTS.map((short) => (
              <div
                key={short.id}
                className="flex-none w-[200px] md:w-[240px] cursor-pointer group"
                onClick={() => setSelectedVideo(short.id)}
              >
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-muted">
                  <img
                    src={`https://img.youtube.com/vi/${short.id}/0.jpg`}
                    alt={short.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-[hsl(0_0%_0%/0.3)] group-hover:bg-[hsl(0_0%_0%/0.15)] transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-accent-foreground fill-accent-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {short.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe CTA */}
        <div className="text-center">
          <Button variant="accent" size="lg" className="px-8 gap-2" asChild>
            <a
              href="https://www.youtube.com/@WhatAboutWeight"
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
