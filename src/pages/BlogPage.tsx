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
      className="group block overflow-hidden rounded-2xl border border-zinc-200 hover:border-accent transition-colors"
    >
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="aspect-video md:aspect-auto md:min-h-[320px] bg-accent/10 overflow-hidden">
          {entry.featuredImage?.url ? (
            <img
              src={entry.featuredImage.url}
              alt={entry.featuredImage.alt || entry.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5" />
          )}
        </div>
        {/* Text */}
        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-3">
            Latest
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 group-hover:text-accent transition-colors leading-snug mb-4">
            {entry.title}
          </h2>
          {entry.excerpt && (
            <p className="text-sm md:text-base text-zinc-600 line-clamp-3 mb-6">
              {entry.excerpt}
            </p>
          )}
          <div className="flex items-center gap-3">
            <p className="text-xs text-zinc-500">{formatPublishDate(entry.publishDate)}</p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent uppercase tracking-wider">
              Read →
            </span>
          </div>
        </div>
      </div>
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
  "ls-way": [
    { label: "Why Low Starch, Low Sugar Works", href: "/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting" },
    { label: "Action Practice", href: "/blog/action-practice" },
  ],
  "weight-permanence-training": [
    { label: "The Weight Permanence Triangle", href: "/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" },
    { label: "The 5 Awareness Stages", href: "/awareness-stages" },
    { label: "Why People Regain Weight After Dieting", href: "/blog/why-people-regain-weight-after-dieting" },
  ],
  "what-people-are-searching": [],
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

  // Hero: latest supporting article with a featuredImage
  const hero = supporting
    .filter((e) => !!e.featuredImage?.url)
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))[0] ?? supporting[0];

  // Build cluster → entry map
  const slugToCluster = new Map<string, string>();
  for (const c of SEARCH_ARTICLE_CLUSTERS) {
    for (const s of c.slugs) slugToCluster.set(s, c.id);
  }

  const clusterEntries = new Map<string, BlogIndexEntry[]>();
  for (const c of SEARCH_ARTICLE_CLUSTERS) clusterEntries.set(c.id, []);

  // Unmapped entries fall into "what-people-are-searching"
  for (const e of supporting) {
    const cid = slugToCluster.get(e.slug) ?? "what-people-are-searching";
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
