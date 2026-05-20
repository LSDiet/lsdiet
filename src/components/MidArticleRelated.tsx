// Compact mid-flow related reading block. Text-only, no thumbnails, no
// cards. Injected programmatically by BlogPostPage into a DOM placeholder
// before the 2nd <h2> of the article body (or ~40% fallback).

interface Item {
  title: string;
  href: string;
}

interface Props {
  items: Item[];
}

export function MidArticleRelated({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <aside className="my-10 py-5 border-y border-zinc-200">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">
        Related LS Diet Reading
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.href} className="leading-snug">
            <a
              href={item.href}
              className="text-[15px] font-medium text-zinc-900 hover:text-accent transition-colors inline-flex items-baseline gap-2 group"
            >
              <span className="text-zinc-400 group-hover:text-accent transition-colors">→</span>
              <span className="border-b border-transparent group-hover:border-accent/40">
                {item.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
