// Search-driven articles section for /blog.
//
// Renders the utility/search-entry layer (code-managed ARTICLES + any
// Contentful supporting posts already in the index) grouped into 5
// behavioural clusters defined in src/lib/searchArticleClusters.ts.
//
// Title-only rows, no thumbnails, no cards. Same visual philosophy as
// FoundationsCurriculum: compact, scannable, dense but calm.

import type { BlogIndexEntry } from "@/lib/blogIndex";
import { SEARCH_ARTICLE_CLUSTERS } from "@/lib/searchArticleClusters";

const SUPPORTING_TYPES = new Set(["supporting", "comparison", "evergreen-faq"]);

interface Props {
  entries: BlogIndexEntry[];
}

export function SearchDrivenIndex({ entries }: Props) {
  const supporting = entries.filter((e) => SUPPORTING_TYPES.has(e.contentType));
  if (supporting.length === 0) return null;

  const bySlug = new Map<string, BlogIndexEntry>();
  for (const e of supporting) bySlug.set(e.slug, e);

  // Resolve each cluster's slugs in order. Skip slugs that don't exist
  // in the supporting set (defensive).
  const renderedClusters = SEARCH_ARTICLE_CLUSTERS.map((c) => ({
    cluster: c,
    posts: c.slugs.map((s) => bySlug.get(s)).filter((x): x is BlogIndexEntry => !!x),
  })).filter((r) => r.posts.length > 0);

  // Track which supporting entries were mapped — anything left over goes
  // into a final "More" bucket only if it actually has items.
  const mappedSlugs = new Set<string>();
  for (const r of renderedClusters) for (const p of r.posts) mappedSlugs.add(p.slug);
  const more = supporting.filter((e) => !mappedSlugs.has(e.slug));

  return (
    <section>
      <div className="mb-10 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">
          Search-driven articles
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-2">
          Real Life Weight Questions
        </h2>
        <p className="text-sm md:text-base text-zinc-700">
          Grouped into behavioural clusters — not a chronological feed. Hover a title
          to peek the answer.
        </p>
      </div>

      <div className="space-y-12">
        {renderedClusters.map(({ cluster, posts }) => (
          <ClusterBlock
            key={cluster.id}
            title={cluster.title}
            description={cluster.description}
            posts={posts}
          />
        ))}

        {more.length > 0 && (
          <ClusterBlock
            title="More"
            description="Additional supporting articles not yet sorted into a cluster."
            posts={more}
          />
        )}
      </div>
    </section>
  );
}

interface ClusterBlockProps {
  title: string;
  description: string;
  posts: BlogIndexEntry[];
}

function ClusterBlock({ title, description, posts }: ClusterBlockProps) {
  return (
    <div>
      <h3 className="text-sm md:text-base font-bold uppercase tracking-[0.18em] text-zinc-900 mb-1">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 mb-4">{description}</p>
      <ul className="divide-y divide-zinc-100">
        {posts.map((p) => (
          <li key={p.slug} className="group">
            <a
              href={`/blog/${p.slug}`}
              className="flex items-baseline gap-3 py-2 focus:outline-none focus-visible:bg-accent/5 rounded-sm"
            >
              <div className="flex-1 min-w-0">
                <div className="text-[15px] md:text-base font-medium text-zinc-900 group-hover:text-accent transition-colors">
                  {p.title}
                </div>
                {p.excerpt && (
                  <div className="hidden md:grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                    <div className="overflow-hidden">
                      <p className="text-sm text-zinc-600 mt-1 leading-snug">
                        {p.excerpt}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <span
                aria-hidden
                className="shrink-0 text-zinc-300 group-hover:text-accent group-hover:translate-x-1 transition-all"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-zinc-500">
        Anchor in the framework:{" "}
        <a
          href="/weight-permanence-training"
          className="font-semibold text-zinc-700 underline-offset-2 hover:text-accent hover:underline"
        >
          The Weight Permanence Training™
        </a>
      </p>
    </div>
  );
}

