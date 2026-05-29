import { useEffect, useState } from "react";
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

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.887 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.04 0C5.463 0 .104 5.358.101 11.94a11.93 11.93 0 0 0 1.594 5.945L0 24l6.305-1.654a11.94 11.94 0 0 0 5.71 1.454h.005c6.578 0 11.937-5.358 11.94-11.94a11.86 11.86 0 0 0-3.487-8.476z" />
  </svg>
);

export function ShareButtons({ url, title, variant, className, crawlerShareUrl }: ShareButtonsProps) {
  const [hasNativeShare, setHasNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setHasNativeShare(true);
    }
  }, []);

  const shareTarget = crawlerShareUrl ?? url;
  const u = encodeURIComponent(shareTarget);
  const t = encodeURIComponent(title);

  const links = [
    {
      label: "Share on Facebook",
      method: "facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      Icon: Facebook,
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
      href: `https://wa.me/?text=${t}%20${u}`,
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
      // user cancelled — ignore
    }
  };
  const isRail = variant === "rail";

  const containerCls = isRail
    ? "flex flex-col items-center gap-2"
    : "flex flex-row items-center justify-center flex-wrap gap-2";

  const btnCls =
    "inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground/70 hover:text-accent hover:border-accent transition-colors";

  return (
    <div className={cn(containerCls, className)} aria-label="Share this article">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
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
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label="Open share menu"
          className={btnCls}
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
