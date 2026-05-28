import { useEffect, useRef, useState } from "react";

export type VideoClip = {
  /** WebM source (smallest; VP9/AV1). Optional but preferred. */
  webm?: string;
  /** MP4 source (H.264 fallback). */
  mp4: string;
};

type Props = {
  /** Ordered list of clips to crossfade through, looping forever. */
  clips: VideoClip[];
  /** Poster / fallback image (the LCP element — renders instantly). */
  poster: string;
  alt: string;
  className?: string;
  /** Crossfade duration in ms. */
  fadeMs?: number;
};

/**
 * Performance-first crossfading background video.
 *
 *  - Poster image is the LCP: it renders instantly behind everything.
 *  - Video clips are muted, looping-by-cycle, autoplay, playsInline.
 *  - Two stacked <video> elements crossfade via CSS opacity (no library).
 *  - Playback only starts after first paint, so video bytes never block
 *    the headline / labels.
 *  - Honors prefers-reduced-motion and silently falls back to the poster
 *    if no clips are provided or a clip fails to load.
 */
export function BackgroundVideo({
  clips,
  poster,
  alt,
  className = "",
  fadeMs = 1200,
}: Props) {
  // Two video layers we ping-pong between.
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  // Which layer is currently on top (visible).
  const [activeLayer, setActiveLayer] = useState<"A" | "B">("A");
  // Index of the clip loaded into each layer.
  const idxRef = useRef({ A: 0, B: 1 % Math.max(clips.length, 1) });
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);

  const hasClips = clips.length > 0;

  useEffect(() => {
    if (!hasClips) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Start after first paint so we never compete with the LCP.
    const id = window.requestAnimationFrame(() => setEnabled(true));
    return () => window.cancelAnimationFrame(id);
  }, [hasClips]);

  useEffect(() => {
    if (!enabled || clips.length === 0) return;

    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b) return;

    a.play().catch(() => {});

    // Single clip: just loop it, no crossfade needed.
    if (clips.length === 1) {
      a.loop = true;
      return;
    }

    const layers = { A: a, B: b };

    const handleEnded = (which: "A" | "B") => () => {
      const next = which === "A" ? "B" : "A";
      const nextEl = layers[next];
      const total = clips.length;
      // Advance the *outgoing* layer to the clip after the incoming one.
      idxRef.current[which] = (idxRef.current[next] + 1) % total;
      // Make the next layer visible and play it.
      nextEl.currentTime = 0;
      nextEl.play().catch(() => {});
      setActiveLayer(next);
      // Preload the upcoming clip into the now-hidden layer.
      const upcoming = clips[idxRef.current[which]];
      loadClip(layers[which], upcoming);
    };

    const onEndedA = handleEnded("A");
    const onEndedB = handleEnded("B");
    a.addEventListener("ended", onEndedA);
    b.addEventListener("ended", onEndedB);

    return () => {
      a.removeEventListener("ended", onEndedA);
      b.removeEventListener("ended", onEndedB);
    };
  }, [enabled, clips]);

  function loadClip(el: HTMLVideoElement | null, clip: VideoClip) {
    if (!el) return;
    const sources = el.querySelectorAll("source");
    // Sources are static per layer in markup; for >2 clips we swap src.
    if (clip.webm && sources[0]) sources[0].setAttribute("src", clip.webm);
    if (sources[clip.webm ? 1 : 0]) {
      sources[clip.webm ? 1 : 0].setAttribute("src", clip.mp4);
    }
    el.load();
  }

  // No clips, reduced motion, or load failure -> just the poster image.
  const showVideo = hasClips && enabled && !failed;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={poster}
        alt={alt}
        loading="eager"
        decoding="async"
        // @ts-expect-error fetchpriority is valid HTML
        fetchpriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {hasClips && (
        <>
          <video
            ref={videoA}
            muted
            playsInline
            autoPlay={false}
            preload="metadata"
            aria-hidden="true"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-center transition-opacity ease-in-out"
            style={{
              opacity: showVideo && activeLayer === "A" ? 1 : 0,
              transitionDuration: `${fadeMs}ms`,
            }}
          >
            {clips[0]?.webm && <source src={clips[0].webm} type="video/webm" />}
            {clips[0] && <source src={clips[0].mp4} type="video/mp4" />}
          </video>

          {clips.length > 1 && (
            <video
              ref={videoB}
              muted
              playsInline
              autoPlay={false}
              preload="none"
              aria-hidden="true"
              onError={() => setFailed(true)}
              className="absolute inset-0 h-full w-full object-cover object-center transition-opacity ease-in-out"
              style={{
                opacity: showVideo && activeLayer === "B" ? 1 : 0,
                transitionDuration: `${fadeMs}ms`,
              }}
            >
              {clips[1]?.webm && <source src={clips[1].webm} type="video/webm" />}
              {clips[1] && <source src={clips[1].mp4} type="video/mp4" />}
            </video>
          )}
        </>
      )}
    </div>
  );
}
