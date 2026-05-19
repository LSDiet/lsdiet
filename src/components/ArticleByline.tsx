// Author byline used at the top of every blog post and entity hub.
// Single source of truth for how Oscar Poon is attributed across the site.

interface Props {
  publishDate?: string;
  formattedDate?: string;
  className?: string;
}

export function ArticleByline({ publishDate, formattedDate, className = "" }: Props) {
  return (
    <p className={`text-xs text-zinc-500 uppercase tracking-wider ${className}`}>
      {formattedDate && publishDate && (
        <>
          <time dateTime={publishDate}>{formattedDate}</time>
          {" · "}
        </>
      )}
      By{" "}
      <a href="/oscar-poon" className="text-zinc-700 hover:text-accent transition-colors">
        Oscar Poon
      </a>
    </p>
  );
}
