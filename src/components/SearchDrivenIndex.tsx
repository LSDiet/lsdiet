// Search-driven articles section for /blog.
//
// Renders the utility/search-entry layer (code-managed ARTICLES + any
// Contentful supporting posts already in the index), grouped by
// canonicalTopic. Title-only rows, no thumbnails, no dates. Hover or
// focus reveals a one-line excerpt using the same CSS grid-rows
// transition as FoundationsCurriculum.

import type { BlogIndexEntry } from "@/lib/blogIndex";

// Human-readable labels for the 6 locked canonical topics.
const TOPIC_LABELS: Record<string, string> = {
  "stop-weight-regain": "Stop Weight Regain",
  "weight-permanence-triangle": "Weight Permanence Triangle",
  "awareness-stages": "Awareness Stages",
  "action-practice-examples": "Action Practice Examples",
  "ls-diet-foundations": "LS Diet Foundations",
  "ls-diet-examples": "LS Diet Examples",
};

const TOPIC_ORDER: string[] = [
  "stop-weight-regain",
  "weight-permanence-triangle",
  "awareness-stages",
  "action-practice-examples",
  "ls-diet-foundations",
  "ls-diet-examples",
];

const SUPPORTING_TYPES = new Set(["supporting", "comparison", "evergreen-faq"]);

interface Props {
  entries: BlogIndexEntry[];
}

export function SearchDrivenIndex({ entries }: Props) {
  const supporting = entries.filter((e) => SUPPORTING_TYPES.has(e.contentType));

  // Bucket by canonicalTopic. Unknown topics fall into a misc bucket only if
  // they actually exist — we don't render empty buckets.
  const buckets = new Map<string, BlogIndexEntry[]>();
  for (const e of supporting) {
    const key = TOPIC_LABELS[e.canonicalTopic] ? e.canonicalTopic : "_misc";
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(e);
  }

  if (supporting.length === 0) {
    return null;
  }

  const orderedKeys = [
    ...TOPIC_ORDER.filter((k) => buckets.has(k)),
    ...(buckets.has("_misc") ? ["_misc"] : []),
  ];

  return (
    <section>
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">
          Search-driven articles
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-2">
          Real Life Weight Questions
        </h2>
        <p className="text-sm md:text-base text-zinc-700">
          Practical answers to the questions people actually ask while trying to stop regaining.
          Grouped by topic. Hover a title to peek the answer.
        </p>
      </div>

      <div className="space-y-10">
        {orderedKeys.map((key) => {
          const posts = buckets.get(key)!;
          const label = key === "_misc" ? "More" : TOPIC_LABELS[key];
          return (
            <div key={key}>
              <h3 className="text-base md:text-lg font-bold uppercase tracking-wider text-zinc-900 mb-3 pb-2 border-b border-zinc-200">
                {label}
                <span className="ml-2 text-xs font-normal text-zinc-500 normal-case tracking-normal">
                  {posts.length} {posts.length === 1 ? "article" : "articles"}
                </span>
              </h3>
              <ul className="divide-y divide-zinc-100">
                {posts.map((p) => (
                  <li key={p.slug} className="group">
                    <a
                      href={`/blog/${p.slug}`}
                      className="block py-2.5 focus:outline-none focus-visible:bg-accent/5 rounded-sm"
                    >
                      <div className="text-[15px] md:text-base font-medium text-zinc-900 group-hover:text-accent transition-colors">
                        {p.title}
                      </div>
                      {p.excerpt && (
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                          <div className="overflow-hidden">
                            <p className="text-sm text-zinc-600 mt-1 leading-snug">
                              {p.excerpt}
                            </p>
                          </div>
                        </div>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
