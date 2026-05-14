import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function PageBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `https://lsdiet.com${item.url}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="container pt-20 pb-2">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-[hsl(0_0%_55%)]">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-1">
                {isLast ? (
                  <span aria-current="page" className="text-[hsl(0_0%_75%)]">
                    {item.name}
                  </span>
                ) : (
                  <a href={item.url} className="hover:text-accent transition-colors">
                    {item.name}
                  </a>
                )}
                {!isLast && <ChevronRight className="w-3 h-3" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
