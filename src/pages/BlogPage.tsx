import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { fetchBlogIndex, type BlogIndexEntry } from "@/lib/blogIndex";
import { SEARCH_ARTICLE_CLUSTERS } from "@/lib/searchArticleClusters";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SUPPORTING_TYPES = new Set(["supporting", "comparison", "evergreen-faq"]);

/** "JUN 30, 2026" — monospace catalog-card date used across this page. */
function formatShortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
}

interface FoundationCard {
  n: string;
  kicker: string;
  title: string;
  bullets: string[];
  bg: string;
  border: string;
  blob: string;
  href: string;
}

const FOUNDATION_CARDS: FoundationCard[] = [
  {
    n: "01",
    kicker: "The Foundation · Step 1",
    title: "The Problem",
    bullets: ["Why loss never lasts", "The regain trap", "What willpower can't fix"],
    bg: "bg-gradient-to-br from-white to-[hsl(0_0%_96%)]",
    border: "border-[hsl(0_0%_89%)]",
    blob: "bg-accent/[0.09]",
    href: "/blog/why-people-regain-weight-after-dieting",
  },
  {
    n: "02",
    kicker: "The Foundation · Step 2",
    title: "The Solution",
    bullets: ["The LS Diet method", "Low starch, low sugar", "Built for permanence"],
    bg: "bg-gradient-to-br from-white to-[hsl(0_0%_96%)]",
    border: "border-tint-cream-border",
    blob: "bg-[hsl(38_90%_55%/0.16)]",
    href: "/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting",
  },
  {
    n: "03",
    kicker: "The Foundation · Step 3",
    title: "Psychology Training",
    bullets: ["Rewire the triggers", "The 5 awareness stages", "Change the identity"],
    bg: "bg-gradient-to-br from-white to-[hsl(0_0%_96%)]",
    border: "border-tint-sage-border",
    blob: "bg-[hsl(152_45%_40%/0.16)]",
    href: "/awareness-stages",
  },
  {
    n: "04",
    kicker: "The Foundation · Step 4",
    title: "Behaviour Training",
    bullets: ["The daily practice", "Small, repeatable actions", "Make it automatic"],
    bg: "bg-gradient-to-br from-white to-[hsl(0_0%_96%)]",
    border: "border-tint-slate-border",
    blob: "bg-[hsl(210_60%_45%/0.16)]",
    href: "/blog/action-practice",
  },
];

const FOUNDATION_COUNT = FOUNDATION_CARDS.length;

// ---------------------------------------------------------------------------
// Foundation — swipeable card deck
// ---------------------------------------------------------------------------

function FoundationDeck() {
  const [i, setI] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);

  const goTo = (idx: number) => setI(((idx % FOUNDATION_COUNT) + FOUNDATION_COUNT) % FOUNDATION_COUNT);
  const next = () => goTo(i + 1);
  const prev = () => goTo(i - 1);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) return;
    startXRef.current = e.clientX;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore — pointer capture unsupported
    }
    setDragging(true);
    setDragX(0);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragX(e.clientX - startXRef.current);
  };

  const endDrag = () => {
    if (!dragging) return;
    if (dragX < -60) goTo(i + 1);
    else if (dragX > 60) goTo(i - 1);
    setDragging(false);
    setDragX(0);
  };

  return (
    <section className="mt-9 md:mt-12">
      <div className="flex items-baseline justify-between gap-3.5 mb-1.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[hsl(38_90%_38%)]">
          Start here · The Foundation
        </p>
        <span className="text-[11px] font-semibold font-mono text-[hsl(0_0%_50%)] whitespace-nowrap shrink-0">
          {i + 1} / {FOUNDATION_COUNT}
        </span>
      </div>
      <h2 className="font-display font-extrabold text-[clamp(22px,5.5vw,27px)] leading-[1.12] text-[hsl(0_0%_10%)] mb-5">
        The four foundations
      </h2>

      <div className="relative h-[296px] md:h-[340px]">
        {FOUNDATION_CARDS.map((card, idx) => {
          const depth = (idx - i + FOUNDATION_COUNT) % FOUNDATION_COUNT;
          const front = depth === 0;
          const dx = front ? dragX : 0;
          const tx = depth * 16 + dx;
          const ty = depth * 12;
          const scale = 1 - depth * 0.05;
          const rot = front ? dx * 0.02 : 0;
          const z = FOUNDATION_COUNT - depth;
          const opacity = depth >= 3 ? 0.35 : 1;
          const transition =
            front && dragging ? "none" : "transform .4s cubic-bezier(.4,0,.2,1), opacity .4s ease";

          return (
            <div
              key={card.title}
              className={`absolute top-0 left-0 right-0 ${front ? "cursor-grab touch-pan-y" : "pointer-events-none"}`}
              style={{
                transform: `translate(${tx}px, ${ty}px) scale(${scale}) rotate(${rot}deg)`,
                zIndex: z,
                opacity,
                transition,
              }}
              onPointerDown={front ? onPointerDown : undefined}
              onPointerMove={front ? onPointerMove : undefined}
              onPointerUp={front ? endDrag : undefined}
              onPointerCancel={front ? endDrag : undefined}
            >
              <div
                className={`relative overflow-hidden h-[286px] md:h-[330px] rounded-[22px] border ${card.bg} ${card.border} flex flex-col px-7 pt-[26px] pb-[22px]`}
                style={{ boxShadow: "0 24px 48px -26px rgba(0,0,0,.35)" }}
              >
                <div className={`absolute -right-10 -top-14 w-48 h-48 rounded-full blur-2xl pointer-events-none ${card.blob}`} />
                <div className={`absolute -left-12 -bottom-16 w-40 h-40 rounded-full blur-2xl pointer-events-none ${card.blob}`} />

                <div className="relative flex items-start justify-between">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[hsl(38_90%_40%)]">
                    {card.kicker}
                  </span>
                  <span className="font-display font-extrabold text-[44px] leading-[0.8] text-primary/15">
                    {card.n}
                  </span>
                </div>
                <h3 className="relative font-display font-extrabold text-[clamp(24px,4.5vw,29px)] leading-[1.1] text-[hsl(0_0%_10%)] mt-3">
                  {card.title}
                </h3>
                <div className="relative flex flex-col gap-2 mt-4 flex-1">
                  {card.bullets.map((b) => (
                    <span key={b} className="flex items-center gap-2.5 text-[14.5px] font-medium text-[hsl(0_0%_28%)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {b}
                    </span>
                  ))}
                </div>
                <div className="relative flex items-center justify-between border-t border-black/[.07] pt-4 mt-1.5">
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12.5px] font-bold text-white bg-primary rounded-full px-4 py-2.5"
                  >
                    Read →
                  </a>
                  <span className="text-[10.5px] font-semibold text-[hsl(0_0%_48%)]">‹ Swipe for next</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous foundation"
          className="w-10 h-10 rounded-full border border-[hsl(0_0%_84%)] bg-white text-[hsl(0_0%_30%)] font-bold text-base hover:border-[hsl(38_90%_55%)] transition-colors"
        >
          ‹
        </button>
        <div className="flex gap-2 items-center">
          {FOUNDATION_CARDS.map((card, idx) => (
            <button
              key={card.title}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to foundation ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === i ? "w-[22px] h-2 bg-primary" : "w-2 h-2 bg-[hsl(0_0%_78%)]"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Next foundation"
          className="w-10 h-10 rounded-full border border-[hsl(0_0%_84%)] bg-white text-[hsl(0_0%_30%)] font-bold text-base hover:border-[hsl(38_90%_55%)] transition-colors"
        >
          ›
        </button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Just Published — 6 latest supporting-content cards
// ---------------------------------------------------------------------------

function JustPublished({ entries }: { entries: BlogIndexEntry[] }) {
  const latest = entries
    .filter((e) => SUPPORTING_TYPES.has(e.contentType))
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
    .slice(0, 6);

  if (latest.length === 0) return null;

  return (
    <section className="mt-11 md:mt-14">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[hsl(38_90%_40%)] mb-1.5">
        Just published
      </p>
      <h2 className="font-display font-extrabold text-[clamp(22px,5.5vw,27px)] leading-[1.1] text-[hsl(0_0%_10%)] mb-5">
        Latest articles
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[18px] md:gap-6">
        {latest.map((e) => (
          <a key={e.slug} href={`/blog/${e.slug}`} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2.5">
            <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden border border-[hsl(0_0%_90%)]">
              {e.featuredImage?.url ? (
                <img
                  src={e.featuredImage.url}
                  alt={e.featuredImage.alt || e.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.06]"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-tint-sage to-tint-cream transition-transform duration-[400ms] group-hover:scale-[1.06]" />
              )}
            </div>
            <p className="text-[10px] md:text-xs font-semibold font-mono text-[hsl(0_0%_55%)]">{formatShortDate(e.publishDate)}</p>
            <h3 className="text-[14.5px] md:text-base font-bold leading-snug text-[hsl(0_0%_11%)] transition-colors group-hover:text-[hsl(152_40%_26%)]">
              {e.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Browse the shelves — accordion, one open at a time
// ---------------------------------------------------------------------------

function Shelf({
  cluster,
  entries,
  isOpen,
  onToggle,
  index,
}: {
  cluster: (typeof SEARCH_ARTICLE_CLUSTERS)[number];
  entries: BlogIndexEntry[];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const count = entries.length;

  return (
    <div
      className={`border border-[hsl(0_0%_87%)] rounded-[18px] overflow-hidden transition-colors duration-300 ${
        isOpen ? "bg-[hsl(152_30%_97%)]" : "bg-white"
      }`}
      style={{ boxShadow: isOpen ? "0 18px 40px -24px rgba(0,0,0,.4)" : "0 1px 2px rgba(0,0,0,.02)" }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-[18px] flex gap-3.5 items-center"
      >
        <span className="w-11 h-11 shrink-0 rounded-xl bg-primary text-white font-display font-extrabold text-[17px] leading-[44px] text-center">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-base font-bold leading-tight text-[hsl(0_0%_11%)]">{cluster.title}</span>
          <span className="block text-[12.5px] leading-snug text-[hsl(0_0%_46%)] mt-0.5">{cluster.tagline}</span>
        </span>
        <span className="inline-flex items-center gap-2.5 shrink-0">
          <span className="text-[10.5px] font-bold text-[hsl(0_0%_45%)] bg-[hsl(0_0%_95%)] rounded-full px-2.5 py-1.5">
            {count} {count === 1 ? "article" : "articles"}
          </span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(152_30%_94%)]">
            <span
              className="text-primary font-bold text-lg leading-none transition-transform duration-[350ms]"
              style={{ transform: isOpen ? "rotate(135deg)" : "rotate(0deg)" }}
            >
              +
            </span>
          </span>
        </span>
      </button>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
        style={{ maxHeight: isOpen ? 220 : 0, opacity: isOpen ? 1 : 0 }}
      >
        <div className="flex gap-3 overflow-x-auto px-[18px] pb-5 pt-0.5">
          {entries.slice(0, 6).map((e) => (
            <a
              key={e.slug}
              href={`/blog/${e.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-[158px] bg-white border border-[hsl(0_0%_89%)] rounded-[13px] overflow-hidden hover:border-[hsl(38_90%_55%)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {e.featuredImage?.url ? (
                <img src={e.featuredImage.url} alt="" loading="lazy" decoding="async" className="block h-[86px] w-full object-cover" />
              ) : (
                <span className="block h-[86px] bg-gradient-to-br from-tint-sage to-tint-cream" />
              )}
              <span className="block text-[12.5px] font-bold leading-snug text-[hsl(0_0%_13%)] px-3 pt-2.5 pb-3">{e.title}</span>
            </a>
          ))}
          <a
            href={`/blog/topic/${cluster.id}`}
            className="shrink-0 w-[120px] flex items-center justify-center text-center bg-primary text-white rounded-[13px] text-[12.5px] font-bold p-3"
          >
            View all {count} →
          </a>
        </div>
      </div>
    </div>
  );
}

function BrowseShelves({ clusterEntries }: { clusterEntries: Map<string, BlogIndexEntry[]> }) {
  const [open, setOpen] = useState(-1);

  return (
    <section className="mt-12">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[hsl(38_90%_40%)] mb-1.5">Explore</p>
      <h2 className="font-display font-extrabold text-[clamp(22px,5.5vw,27px)] leading-[1.1] text-[hsl(0_0%_10%)] mb-5">
        Browse the shelves
      </h2>
      <div className="flex flex-col gap-3.5">
        {SEARCH_ARTICLE_CLUSTERS.map((cluster, idx) => (
          <Shelf
            key={cluster.id}
            cluster={cluster}
            entries={clusterEntries.get(cluster.id) ?? []}
            isOpen={open === idx}
            onToggle={() => setOpen((o) => (o === idx ? -1 : idx))}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main BlogPage
// ---------------------------------------------------------------------------

export default function BlogPage() {
  const [entries, setEntries] = useState<BlogIndexEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogIndex()
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const supporting = entries.filter((e) => SUPPORTING_TYPES.has(e.contentType));

  // Build cluster → entry map
  const slugToCluster = new Map<string, string>();
  for (const c of SEARCH_ARTICLE_CLUSTERS) {
    for (const s of c.slugs) slugToCluster.set(s, c.id);
  }

  const clusterEntries = new Map<string, BlogIndexEntry[]>();
  for (const c of SEARCH_ARTICLE_CLUSTERS) clusterEntries.set(c.id, []);

  // Unmapped entries fall into "weight-permanence-training"
  for (const e of supporting) {
    const cid = slugToCluster.get(e.slug) ?? "weight-permanence-training";
    const arr = clusterEntries.get(cid);
    if (arr) arr.push(e);
  }

  for (const arr of clusterEntries.values()) {
    arr.sort((a, b) => {
      const aDate = a.updatedAt || a.publishDate;
      const bDate = b.updatedAt || b.publishDate;
      return aDate < bDate ? 1 : -1;
    });
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://lsdiet.com/blog#collection",
    name: "LS Diet Blog",
    url: "https://lsdiet.com/blog",
    inLanguage: "en-CA",
    description:
      "LS Diet articles on low-starch low-sugar eating, Weight Permanence Training, and the real questions people ask when they're tired of regaining the same weight.",
    author: { "@type": "Person", "@id": "https://lsdiet.com/oscar-poon#person" },
    publisher: { "@type": "Organization", name: "LS Diet", url: "https://lsdiet.com" },
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>LS Diet Blog | The LS Way & Weight Permanence Training</title>
        <meta
          name="description"
          content="Articles on low-starch low-sugar eating, Weight Permanence Training, and real weight loss questions — from someone who lost 80 lbs three times and figured out why."
        />
        <link rel="canonical" href="https://lsdiet.com/blog" />
        <meta property="og:title" content="LS Diet Blog" />
        <meta property="og:description" content="The LS Way, Weight Permanence Training, and real questions — answered." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lsdiet.com/blog" />
        <meta property="og:locale" content="en_CA" />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <Navbar />

      <main className="max-w-[660px] md:max-w-[1180px] mx-auto px-[22px] md:px-10 pt-24 pb-16">
        {loading && <div className="text-zinc-500 text-sm pt-8">Loading…</div>}

        {!loading && (
          <>
            <div className="md:max-w-[560px] md:mx-auto">
              <section className="pt-2 pb-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(38_90%_40%)] mb-3.5">
                  The LS Diet Library
                </p>
                <h1 className="font-display font-extrabold text-[clamp(34px,8vw,46px)] leading-[1.06] tracking-[-0.018em] text-[hsl(0_0%_8%)] mb-4">
                  Stop Regaining Weight Today
                </h1>
                <p className="text-[clamp(15px,4vw,17px)] leading-relaxed text-[hsl(0_0%_38%)]">
                  The LS Diet foundations, the newest articles, and real-life topics that are worth your time.
                </p>
              </section>

              <FoundationDeck />
            </div>

            <JustPublished entries={supporting} />

            <BrowseShelves clusterEntries={clusterEntries} />
          </>
        )}
      </main>

      <FooterSimple />
    </div>
  );
}
