import { useEffect, useMemo, useState } from "react";
import { Facebook, Linkedin, Link2, Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface ShareButtonsProps {
  url: string;
  title: string;
  variant: "rail" | "inline";
  className?: string;
  /** URL used for social-network share intents (FB, LinkedIn, X, WhatsApp, Email).
   * Should point to a server-rendered OG-meta endpoint so crawlers see proper previews.
   * Falls back to `url` when not provided. Copy Link and native share always use `url`. */
  crawlerShareUrl?: string;
}

/* ---- deterministic seeded random (djb2) ---- */
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h, 33) ^ s.charCodeAt(i);
  }
  return Math.abs(h);
}
function seeded(seed: string, min: number, max: number): number {
  return (hashStr(seed) % (max - min + 1)) + min;
}
function slugFromUrl(url: string): string {
  return url.split("/blog/")[1]?.split("?")[0] || url;
}

/* ---- icon components ---- */
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.904-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.887 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.04 0C5.463 0 .104 5.358.101 11.94a11.93 11.93 0 0 0 1.594 5.945L0 24l6.305-1.654a11.94 11.94 0 0 0 5.71 1.454h.005c6.578 0 11.937-5.358 11.94-11.94a11.86 11.86 0 0 0-3.487-8.476z" />
  </svg>
);

const HeartIcon = ({ filled, className }: { filled: boolean; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.8}
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
    />
  </svg>
);

export function ShareButtons({ url, title, variant, className, crawlerShareUrl }: ShareButtonsProps) {
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const slug = slugFromUrl(url);

  const shareCount = useMemo(() => seeded(slug + "_sh", 12, 58), [slug]);
  const baseLikes = useMemo(() => seeded(slug + "_lk", 1, 15), [slug]);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setHasNativeShare(true);
    }
  }, []);

  useEffect(() => {
    try {
      const hasLiked = localStorage.getItem(`liked_${slug}`) === "true";
      setLiked(hasLiked);
      setLikeCount(baseLikes + (hasLiked ? 1 : 0));
    } catch {
      setLikeCount(baseLikes);
    }
  }, [slug, baseLikes]);

  const handleLike = () => {
    if (liked) return;
    try {
      localStorage.setItem(`liked_${slug}`, "true");
    } catch {
      /* storage blocked */
    }
    setLiked(true);
    setLikeCount((c) => c + 1);
    trackEvent("like", { content_type: "article", item_id: url });
  };

  const shareTarget = crawlerShareUrl ?? url;
  const u = encodeURIComponent(shareTarget);
  const t = encodeURIComponent(title + " | LS Diet");

  const links = [
    {
      label: "Share on Facebook",
      method: "facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      Icon: Facebook,
    },
    {
      label: "Share on X",
      method: "x",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      Icon: XIcon,
    },
    {
      label: "Share on LinkedIn",
      method: "linkedin",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      Icon: Linkedin,
    },
    {
      label: "Share on WhatsApp",
      method: "whatsapp",
      href: `https://wa.me/?text=${t}%20${encodeURIComponent(url)}`,
      Icon: WhatsAppIcon,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      trackEvent("share", { method: "copy_link", content_type: "article", item_id: url });
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url });
      trackEvent("share", { method: "native", content_type: "article", item_id: url });
    } catch {
      /* user cancelled */
    }
  };

  const isRail = variant === "rail";

  const containerCls = isRail
    ? "flex flex-col items-center gap-2"
    : "flex flex-row items-center justify-center flex-wrap gap-2";

  const btnCls =
    "inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground/70 hover:text-accent hover:border-accent transition-colors";

  const likeBtnCls = cn(
    "inline-flex items-center justify-center gap-1 rounded-full border px-3 h-10 text-sm font-medium transition-colors",
    liked
      ? "border-rose-400 text-rose-500 bg-rose-50"
      : "border-border text-foreground/70 hover:text-rose-500 hover:border-rose-400"
  );

  return (
    <div className={cn(containerCls, className)} aria-label="Share this article">
      {links.map(({ label, method, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onClick={() =>
            trackEvent("share", { method, content_type: "article", item_id: url })
          }
          className={btnCls}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}

      <button type="button" onClick={handleCopy} aria-label="Copy link" className={btnCls}>
        <Link2 className="w-4 h-4" />
      </button>

      {hasNativeShare && (
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label="Open share menu"
          className={btnCls}
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}

      <button
        type="button"
        onClick={handleLike}
        aria-label={liked ? "You liked this" : "Like this article"}
        disabled={liked}
        className={likeBtnCls}
      >
        <HeartIcon filled={liked} className="w-4 h-4" />
        <span>{likeCount}</span>
      </button>

      {isRail && (
        <p className="text-[10px] text-zinc-400 mt-1 text-center leading-tight">
          {shareCount} shares
        </p>
      )}

      {!isRail && (
        <span className="text-xs text-zinc-400 ml-1">{shareCount} shares</span>
      )}
    </div>
  );
}
