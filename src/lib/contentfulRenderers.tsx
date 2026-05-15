import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, type Document } from "@contentful/rich-text-types";

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-bold text-zinc-900">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
    [MARKS.CODE]: (text) => (
      <code className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-900 text-sm font-mono">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_, children) => (
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-12 mb-5 text-zinc-900">{children}</h2>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-10 mb-4 text-zinc-900">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3 text-zinc-900">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_, children) => (
      <h4 className="text-lg md:text-xl font-bold mt-6 mb-2 text-zinc-900">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="list-disc list-outside pl-6 space-y-2 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="list-decimal list-outside pl-6 space-y-2 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li className="leading-relaxed [&>p]:mb-2">{children}</li>,
    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="border-l-4 border-accent pl-5 italic my-6 text-zinc-700 text-lg">{children}</blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-10 border-zinc-200" />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const file = node.data?.target?.fields?.file;
      const title = node.data?.target?.fields?.title ?? "";
      if (!file?.url) return null;
      return (
        <figure className="my-8">
          <img
            src={`https:${file.url}`}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full rounded-lg"
          />
          {title && <figcaption className="text-sm text-zinc-500 mt-2 text-center">{title}</figcaption>}
        </figure>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        className="text-accent font-medium underline underline-offset-2 hover:no-underline"
        target={node.data.uri.startsWith("http") ? "_blank" : undefined}
        rel={node.data.uri.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

export function RichText({ document }: { document: Document | null }) {
  if (!document) return null;
  return (
    <div className="prose-content max-w-none text-zinc-800">
      {documentToReactComponents(document, options)}
    </div>
  );
}
