import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { JoinFloatingBar } from "@/components/JoinFloatingBar";
import { formatPublishDate, type BlogPost } from "@/lib/blog";
import { fetchBlogIndex, type BlogIndexEntry } from "@/lib/blogIndex";
import { SEARCH_ARTICLE_CLUSTERS } from "@/lib/searchArticleClusters";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

const SUPPORTING_TYPES = new Set(["supporting", "comparison", "evergreen-faq"]);

// ---------------------------------------------------------------------------
// Hero — single latest article with image
// ---------------------------------------------------------------------------

function HeroArticle({ entry }: { entry: BlogIndexEntry }) {
  return (
    <a
      href={`/blog/${entry.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl bg-zinc-900 border-l-4 border-accent px-7 py-8 md:px-12 md:py-10 hover:bg-zinc-800 transition-colors"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent mb-3">
        The Problem
      </p>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug mb-3 group-hover:text-accent transition-colors">
        {entry.title}
      </h2>
      {entry.excerpt && (
        <p className="text-sm text-zinc-400 line-clamp-1 mb-6">
          {entry.excerpt}
        </p>
      )}
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-900 bg-accent px-4 py-2 rounded-full group-hover:bg-white transition-colors">
        Read the article →
      </span>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Latest Articles — 3 most recent cards
// ---------------------------------------------------------------------------

function LatestArticles({ entries }: { entries: BlogIndexEntry[] }) {
  const latest = entries
    .filter((e) => SUPPORTING_TYPES.has(e.contentType))
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
    .slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-1">
          Just published
        </p>
        <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight">
          Latest Articles
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {latest.map((e) => (
          <a
            key={e.slug}
            href={`/blog/${e.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border border-zinc-200 overflow-hidden hover:border-accent transition-colors"
          >
            <div className="aspect-video bg-accent/10 overflow-hidden flex-shrink-0">
              {e.featuredImage?.url ? (
                <img
                  src={e.featuredImage.url}
                  alt={e.featuredImage.alt || e.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5" />
              )}
            </div>
            <div className="p-4 flex flex-col gap-1 flex-1">
              <p className="text-xs text-zinc-500">{formatPublishDate(e.publishDate)}</p>
              <h3 className="text-sm font-bold text-zinc-900 group-hover:text-accent transition-colors leading-snug">
                {e.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Start Here links — shown at top of each expanded category block
// ---------------------------------------------------------------------------

interface StartHereLink { label: string; href: string; }

function StartHereRow({ links }: { links: StartHereLink[] }) {
  return (
    <div className="mb-4 px-4 py-3 rounded-lg bg-accent/5 border border-accent/10">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-2">
        Start here
      </p>
      <div className="flex flex-col gap-1">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-zinc-800 hover:text-accent transition-colors flex items-center gap-2"
          >
            <span className="text-accent">→</span>
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Category Block — accordion
// ---------------------------------------------------------------------------

const START_HERE: Record<string, StartHereLink[]> = {
  "ozempic-and-weight-loss-drugs": [],
  "mind-and-habits": [
    { label: "The Weight Permanence Triangle", href: "/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" },
    { label: "The 5 Awareness Stages", href: "/awareness-stages" },
    { label: "Why People Regain Weight After Dieting", href: "/blog/why-people-regain-weight-after-dieting" },
  ],
  "body-and-what-to-eat": [
    { label: "Why Low Starch, Low Sugar Works", href: "/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting" },
    { label: "Action Practice", href: "/blog/action-practice" },
  ],
  "weight-loss-at-work": [],
};

interface CategoryBlockProps {
  cluster: (typeof SEARCH_ARTICLE_CLUSTERS)[number];
  entries: BlogIndexEntry[];
  defaultOpen?: boolean;
}

function CategoryBlock({ cluster, entries, defaultOpen = false }: CategoryBlockProps) {
  const [open, setOpen] = useState(defaultOpen);
  const startHere = START_HERE[cluster.id] ?? [];
  const count = entries.length;

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden">
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-5 md:py-6 text-left hover:bg-zinc-50 transition-colors"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <h2 className="text-lg md:text-xl font-extrabold uppercase tracking-tight text-zinc-900 leading-tight">
            {cluster.title}
          </h2>
          <p className="text-sm text-zinc-500 mt-0.5">{cluster.tagline}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            {count} {count === 1 ? "article" : "articles"}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-zinc-100 px-5 py-4">
          {startHere.length > 0 && <StartHereRow links={startHere} />}
          <ul className="divide-y divide-zinc-100">
            {entries.map((e) => (
              <li key={e.slug}>
                <a
                  href={`/blog/${e.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 py-3 hover:text-accent transition-colors"
                >
                  {e.featuredImage?.url && (
                    <img
                      src={e.featuredImage.url}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-md object-cover flex-shrink-0 mt-0.5"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-800 group-hover:text-accent leading-snug transition-colors">
                      {e.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">{formatPublishDate(e.publishDate)}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// WPT Curriculum Strip — 5 awareness stages in order
// ---------------------------------------------------------------------------

const STAGE_LABELS = ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5"];

function WPTCurriculumStrip({ entries }: { entries: BlogIndexEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-1">
          The Solution
        </p>
        <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight">
          How to Stop Regaining Weight
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          Five stages. Work through them in order.
        </p>
      </div>
      {/* Horizontal scroll on mobile, grid on md+ */}
      <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 md:grid md:grid-cols-5 snap-x snap-mandatory">
        {entries.map((e, i) => (
          <a
            key={e.slug}
            href={`/blog/${e.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 w-52 md:w-auto snap-start flex flex-col rounded-xl border border-zinc-200 hover:border-accent transition-colors p-4 gap-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
              {STAGE_LABELS[i]}
            </span>
            <p className="text-sm font-bold text-zinc-900 group-hover:text-accent transition-colors leading-snug">
              {e.title}
            </p>
            {e.excerpt && (
              <p className="text-xs text-zinc-500 line-clamp-2">{e.excerpt}</p>
            )}
          </a>
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
      .then((data) => { setEntries(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const supporting = entries.filter((e) => SUPPORTING_TYPES.has(e.contentType));

  // Hero: pin the Problem article; fall back to latest supporting post with image
  const PROBLEM_SLUG = "why-people-regain-weight-after-dieting";
  const hero =
    entries.find((e) => e.slug === PROBLEM_SLUG) ??
    supporting.filter((e) => !!e.featuredImage?.url).sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))[0] ??
    supporting[0];

  // WPT Curriculum: 5 awareness stages in stage order
  const STAGE_SLUGS = [
    "reality-awareness",
    "friction-awareness",
    "pattern-awareness",
    "consequence-awareness",
    "identity-awareness",
  ];
  const stageEntries = STAGE_SLUGS.map((s) => entries.find((e) => e.slug === s)).filter(Boolean) as BlogIndexEntry[];

  // Build cluster → entry map
  const slugToCluster = new Map<string, string>();
  for (const c of SEARCH_ARTICLE_CLUSTERS) {
    for (const s of c.slugs) slugToCluster.set(s, c.id);
  }

  const clusterEntries = new Map<string, BlogIndexEntry[]>();
  for (const c of SEARCH_ARTICLE_CLUSTERS) clusterEntries.set(c.id, []);

  // Unmapped entries fall into "mind-and-habits"
  for (const e of supporting) {
    const cid = slugToCluster.get(e.slug) ?? "mind-and-habits";
    const arr = clusterEntries.get(cid);
    if (arr) arr.push(e);
  }

  // Sort each cluster by publishDate desc
  for (const arr of clusterEntries.values()) {
    arr.sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
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

      <main className="container max-w-5xl mx-auto px-4 pt-24 pb-20 space-y-14">

        {loading && (
          <div className="text-zinc-500 text-sm pt-8">Loading…</div>
        )}

        {!loading && hero && <HeroArticle entry={hero} />}

        {!loading && stageEntries.length > 0 && (
          <WPTCurriculumStrip entries={stageEntries} />
        )}

        {!loading && supporting.length > 0 && (
          <LatestArticles entries={supporting} />
        )}

        {!loading && supporting.length > 0 && (
          <section className="space-y-4">
            <div className="mb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-1">
                Explore
              </p>
              <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight">
                Browse by Topic
              </h2>
            </div>
            {SEARCH_ARTICLE_CLUSTERS.map((cluster) => (
              <CategoryBlock
                key={cluster.id}
                cluster={cluster}
                entries={clusterEntries.get(cluster.id) ?? []}
              />
            ))}
          </section>
        )}

      </main>

      <FooterSimple />
      <JoinFloatingBar />
    </div>
  );
}
