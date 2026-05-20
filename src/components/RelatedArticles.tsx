// End-of-article "Related Posts" grid for code-managed Search articles.
// Pulls similarity-ranked items from getRelatedArticles, excluding any
// slugs already surfaced in the pathway or the mid-flow aside so the
// three placements stay distinct.

import type { Article } from "@/content/articles";
import { clusterOfSlug } from "@/lib/searchArticleClusters";

interface Props {
  items: Article[];
}

export function RelatedArticles({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <section className="mt-16 pt-8 border-t border-zinc-200">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2">
        Related Posts
      </p>
      <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-zinc-900 mb-6">
        More on this topic
      </h2>
      <ul className="grid sm:grid-cols-2 gap-4">
        {items.map((a) => {
          const cluster = clusterOfSlug(a.meta.slug);
          return (
            <li key={a.meta.slug}>
              <a
                href={`/blog/${a.meta.slug}`}
                className="group block h-full rounded-xl border border-zinc-200 hover:border-accent/60 hover:bg-accent/5 transition-colors p-4"
              >
                {cluster && (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-1.5 group-hover:text-accent transition-colors">
                    {cluster.title}
                  </p>
                )}
                <h3 className="text-[15px] font-bold text-zinc-900 group-hover:text-accent transition-colors leading-snug mb-1.5">
                  {a.meta.title}
                </h3>
                <p className="text-[13px] text-zinc-600 line-clamp-2 leading-snug">
                  {a.meta.excerpt}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
