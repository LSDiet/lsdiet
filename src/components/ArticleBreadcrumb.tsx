// Text-only breadcrumb for supporting article pages.
//   LS Diet Foundations → {Cluster} → {Article Title}
//
// Replaces the generic PageBreadcrumb on article-source posts so the
// hierarchy feels like a framework navigation, not a CMS path.

interface Props {
  clusterTitle?: string;
  articleTitle: string;
}

export function ArticleBreadcrumb({ clusterTitle, articleTitle }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <a href="/blog" className="hover:text-accent transition-colors">
            LS Diet Foundations
          </a>
        </li>
        {clusterTitle && (
          <>
            <li aria-hidden className="text-accent/60">→</li>
            <li>
              <a href="/blog" className="hover:text-accent transition-colors">
                {clusterTitle}
              </a>
            </li>
          </>
        )}
        <li aria-hidden className="text-accent/60">→</li>
        <li className="text-zinc-700 normal-case tracking-normal font-medium truncate max-w-[60vw]" aria-current="page">
          {articleTitle}
        </li>
      </ol>
    </nav>
  );
}
