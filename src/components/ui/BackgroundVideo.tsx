import { useEffect, useRef, useState } from "react";

export type VideoClip = {
  /** WebM source (smallest; VP9/AV1). Optional. */
  webm?: string;
  /** MP4 source (H.264 fallback / primary). */
  mp4: string;
};

type Props = {
  /** Ordered list of clips to play in sequence, looping forever. */
  clips: VideoClip[];
  /** Poster / fallback image (the LCP element — renders instantly). */
  poster: string;
  alt: string;
  className?: string;
  /** Crossfade duration in ms. */
  fadeMs?: number;
};

type LayerState = { clip: number; visible: boolean };

/**
 * Performance-first background video that plays clips strictly in order
 * (0 → 1 → 2 → … → 0) with a crossfade between each.
 *
 *  - Poster image is the LCP: it renders instantly behind everything.
 *  - Two stacked <video> layers crossfade via CSS opacity (no library).
 *  - Playback only starts after first paint, so video bytes never block
 *    the headline / labels.
 *  - Muted, playsInline, autoplay → allowed to autoplay on mobile.
 *  - Honors prefers-reduced-motion and falls back to the poster if no
 *    clips are provided or a clip fails to load.
 */
export function BackgroundVideo({
  clips,
  poster,
  alt,
  className = "",
  fadeMs = 1000,
}: Props) {
  const hasClips = clips.length > 0;

  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const [a, setA] = useState<LayerState>({ clip: 0, visible: true });
  const [b, setB] = useState<LayerState>({ clip: 1 % Math.max(clips.length, 1), visible: false });
  const top = useRef<"A" | "B">("A");

  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);

  // Start only after first paint + respect reduced motion.
  useEffect(() => {
    if (!hasClips) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.requestAnimationFrame(() => setEnabled(true));
    return () => window.cancelAnimationFrame(id);
  }, [hasClips]);

  // Kick off the first clip.
  useEffect(() => {
    if (!enabled || clips.length === 0) return;
    refA.current?.play().catch(() => {});
    if (clips.length === 1 && refA.current) refA.current.loop = true;
  }, [enabled, clips.length]);

  // Once the first frame of video is on screen, retire the poster so it never
  // peeks through during crossfades.
  const [started, setStarted] = useState(false);


  function advance(finished: "A" | "B") {
    if (clips.length < 2) return;
    const incoming = finished === "A" ? "B" : "A";
    const incomingState = incoming === "A" ? a : b;
    const incomingRef = (incoming === "A" ? refA : refB).current;

    // Reveal the incoming layer (already loaded with the next clip) …
    top.current = incoming;
    if (incomingRef) {
      incomingRef.currentTime = 0;
      incomingRef.play().catch(() => {});
    }

    // … and queue the clip *after* the incoming one into the finishing layer.
    const nextClip = (incomingState.clip + 1) % clips.length;
    if (finished === "A") {
      setA({ clip: nextClip, visible: false });
      setB((s) => ({ ...s, visible: true }));
    } else {
      setB({ clip: nextClip, visible: false });
      setA((s) => ({ ...s, visible: true }));
    }
  }

  const showVideo = hasClips && enabled && !failed;

  const renderVideo = (
    ref: React.RefObject<HTMLVideoElement>,
    state: LayerState,
    which: "A" | "B",
    preload: "auto" | "metadata" | "none",
  ) => {
    const clip = clips[state.clip];
    if (!clip) return null;
    return (
      <video
        ref={ref}
        muted
        playsInline
        preload={preload}
        aria-hidden="true"
        onEnded={() => advance(which)}
        onError={() => setFailed(true)}
        // key forces a reload when the clip assigned to this layer changes
        key={`${which}-${clip.mp4}`}
        className="absolute inset-0 h-full w-full object-cover object-center transition-opacity ease-in-out"
        style={{
          opacity: showVideo && state.visible ? 1 : 0,
          transitionDuration: `${fadeMs}ms`,
        }}
      >
        {clip.webm && <source src={clip.webm} type="video/webm" />}
        <source src={clip.mp4} type="video/mp4" />
      </video>
    );
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={poster}
        alt={alt}
        loading="eager"
        decoding="async"
        // @ts-expect-error fetchpriority is a valid HTML attribute
        fetchpriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {hasClips && (
        <>
          {renderVideo(refA, a, "A", "auto")}
          {clips.length > 1 && renderVideo(refB, b, "B", "metadata")}
        </>
      )}
    </div>
  );
}
