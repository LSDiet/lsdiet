// Renders sibling foundation (pillar) posts that share a canonicalTopic.
// Reused by BlogPostPage today and by the future /topics/* entity hubs.

import { useEffect, useState } from "react";
import { fetchBlogIndex, type BlogIndexEntry } from "@/lib/blogIndex";

interface Props {
  /** Filter to pillars sharing this canonicalTopic. If omitted, shows any pillar. */
  canonicalTopic?: string;
  /** Slug to exclude (the current article). */
  excludeSlug?: string;
  /** Max items to render. Defaults to 3. */
  limit?: number;
  /** Heading text. */
  heading?: string;
  className?: string;
}

export function RelatedFoundations({
  canonicalTopic,
  excludeSlug,
  limit = 3,
  heading = "Related Foundations",
  className = "",
}: Props) {
  const [items, setItems] = useState<BlogIndexEntry[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchBlogIndex()
      .then((all) => {
        if (cancelled) return;
        // If no canonicalTopic was passed, infer it from the current slug.
        const topic =
          canonicalTopic ??
          (excludeSlug ? all.find((p) => p.slug === excludeSlug)?.canonicalTopic : undefined);
        const filtered = all
          .filter((p) => p.contentType === "pillar")
          .filter((p) => (topic ? p.canonicalTopic === topic : true))
          .filter((p) => p.slug !== excludeSlug)
          .slice(0, limit);
        setItems(filtered);
      })
      .catch(() => !cancelled && setItems([]));
    return () => {
      cancelled = true;
    };
  }, [canonicalTopic, excludeSlug, limit]);

  // Hide cleanly when fewer than 2 siblings exist — avoids stub UI.
  if (!items || items.length < 2) return null;

  return (
    <section className={`mt-14 ${className}`}>
      <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-900 mb-4">
        {heading}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group block rounded-xl border border-border bg-card p-5 hover:border-accent/60 transition-colors"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent mb-2">
              Foundation
            </p>
            <h3 className="text-base font-bold leading-snug text-foreground group-hover:text-accent transition-colors mb-2">
              {p.title}
            </h3>
            {p.excerpt && (
              <p className="text-sm text-zinc-700 leading-relaxed line-clamp-3">{p.excerpt}</p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
