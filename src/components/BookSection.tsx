import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackEvent } from "@/lib/analytics";
import vaultDailyVideos from "@/assets/vault-daily-videos.png?w=500;900;1300&format=avif;webp&as=picture";
import vaultCurriculumMap from "@/assets/vault-curriculum-map.png?w=500;900;1300&format=avif;webp&as=picture";

const SKOOL_URL = "https://www.skool.com/lsdiet/about";

const vaultTabs = [
  {
    key: "daily-videos",
    tabLabel: "1. Daily Videos",
    eyebrow: "Action Practice",
    description: "Daily behavioural exercises to make your new habits automatic.",
    image: vaultDailyVideos,
    alt: "Action Practice classroom inside the LS Diet training vault, showing daily behavioural video lessons",
  },
  {
    key: "curriculum-map",
    tabLabel: "2. The Curriculum Map",
    eyebrow: "Start Here",
    description: "Your starting point for the Weight Permanence Training tool.",
    image: vaultCurriculumMap,
    alt: "Full course curriculum map inside the LS Diet training vault, listing every module and lesson",
  },
];

function VaultShowcase() {
  const [active, setActive] = useState(0);
  const item = vaultTabs[active];

  return (
    <div className="mx-auto mb-12 max-w-md md:mb-16">
      <div
        role="tablist"
        aria-label="Inside the LS Diet training vault"
        className="mb-5 grid grid-cols-2 gap-1.5 rounded-full bg-muted p-1"
      >
        {vaultTabs.map((tab, i) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => {
              setActive(i);
              trackEvent("vault_tab_click", { location: "book_section", tab: tab.key });
            }}
            className={`rounded-full px-2 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-colors sm:text-xs ${
              active === i
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.tabLabel}
          </button>
        ))}
      </div>

      <div
        className="overflow-hidden rounded-xl bg-background"
        style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)", borderRadius: "12px" }}
      >
        <ResponsivePicture
          src={item.image}
          alt={item.alt}
          sizes="(min-width: 768px) 400px, 90vw"
          className="block h-auto w-full"
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{item.eyebrow}</p>
        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
      </div>
    </div>
  );
}

export function BookSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="book" className="bg-background py-14 md:py-20 overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              Access the Free LS Diet & Weight Permanence Training Vault
            </p>
            <p className="mx-auto max-w-xl text-sm text-muted-foreground mb-3">
              Get instant, direct access to the entire step-by-step video system, tracking tools, and support chat.
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              A Peek Inside
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              How We Rewire Your Metabolic Habitats
            </p>
          </div>

          <VaultShowcase />

          {/* Single CTA — the one logical exit point for this section */}
          <div className="text-center">
            <Button variant="accent" size="lg" className="px-8" asChild>
              <a
                href={SKOOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "book_section",
                    placement: "primary_button",
                    label: "GET THE FREE SYSTEM",
                    destination: SKOOL_URL,
                  })
                }
              >
                Get the Free System
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
            <p className="mt-3 text-[11px] font-medium text-muted-foreground">
              Free training • Hosted on a secure, private learning platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
