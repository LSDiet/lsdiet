import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackEvent } from "@/lib/analytics";
import vaultStartHere from "@/assets/vault-start-here.png?w=500;900;1300&format=avif;webp&as=picture";
import vaultDailyVideos from "@/assets/vault-daily-videos.png?w=500;900;1300&format=avif;webp&as=picture";
import vaultCurriculumMap from "@/assets/vault-curriculum-map.png?w=500;900;1300&format=avif;webp&as=picture";

const SKOOL_URL = "https://www.skool.com/lsdiet/about";

const classroomItems = [
  {
    key: "start-here",
    image: vaultStartHere,
    alt: "Start Here module inside the LS Diet training vault",
    eyebrow: "Start Here",
    description: "Your starting point for the Weight Permanence Training tool.",
  },
  {
    key: "action-practice",
    image: vaultDailyVideos,
    alt: "Action Practice classroom inside the LS Diet training vault, showing daily behavioural video lessons",
    eyebrow: "Action Practice",
    description: "Daily practices to make your new habits automatic.",
  },
];

const CARD_SHADOW_STYLE = { boxShadow: "0 10px 30px rgba(0,0,0,0.15)", borderRadius: "12px" };

const vaultTabs = [
  { key: "classroom", tabLabel: "1. The Classroom" },
  { key: "curriculum-map", tabLabel: "2. The Curriculum Map" },
] as const;

function VaultShowcase() {
  const [active, setActive] = useState<(typeof vaultTabs)[number]["key"]>("classroom");

  return (
    <div className="mx-auto mb-12 max-w-md md:mb-16">
      <div
        role="tablist"
        aria-label="Inside the LS Diet training vault"
        className="mb-5 grid grid-cols-2 gap-1.5 rounded-full bg-muted p-1"
      >
        {vaultTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => {
              setActive(tab.key);
              trackEvent("vault_tab_click", { location: "book_section", tab: tab.key });
            }}
            className={`rounded-full px-2 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-colors sm:text-xs ${
              active === tab.key
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.tabLabel}
          </button>
        ))}
      </div>

      {active === "classroom" ? (
        <div className="flex flex-col gap-6">
          {classroomItems.map((item) => (
            <div key={item.key}>
              <div className="overflow-hidden rounded-xl bg-background" style={CARD_SHADOW_STYLE}>
                <ResponsivePicture
                  src={item.image}
                  alt={item.alt}
                  sizes="(min-width: 768px) 400px, 90vw"
                  className="block h-auto w-full"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{item.eyebrow}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div
            className="relative overflow-hidden rounded-xl bg-background"
            style={{
              ...CARD_SHADOW_STYLE,
              WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            }}
          >
            <ResponsivePicture
              src={vaultCurriculumMap}
              alt="Curriculum map inside the LS Diet training vault, listing course modules and lessons"
              sizes="(min-width: 768px) 400px, 90vw"
              className="block h-auto w-full"
            />
          </div>
          <p className="mt-3 text-center text-sm font-semibold text-muted-foreground">
            + 12 more metabolic modules inside&hellip;
          </p>
        </div>
      )}
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              A Peek Inside the Vault
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              No long lectures. Just 3-minute daily tools that help you lose 5-7 lbs a month.
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
                    label: "CLAIM YOUR FREE ACCESS",
                    destination: SKOOL_URL,
                  })
                }
              >
                Claim Your Free Access
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
            <p className="mt-3 text-[11px] font-medium text-muted-foreground">
              Instant training • Hosted on a secure, private learning platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
