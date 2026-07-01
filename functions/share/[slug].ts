// Cloudflare Pages Function — /share/[slug]
// Social crawlers (Facebook, LinkedIn, X, WhatsApp) get server-rendered OG meta tags.
// Humans get an instant 302 redirect to the canonical blog URL.
// No Supabase. No Contentful. No Lovable. Pure Cloudflare.
//
// Article metadata comes from ../_shared/articles.ts — the same registry
// used by functions/blog/[slug].ts. Do not add a local ARTICLES dict here;
// a second hand-maintained copy is what caused new articles to silently
// fall through to the generic fallback OG page on first Facebook share.

import { ARTICLES } from "../_shared/articles";

const SITE = "https://lsdiet.com";
const FALLBACK_IMAGE = "https://lsdiet.com/og-image.jpg";

const CRAWLER_UA =
  /facebookexternalhit|facebookcatalog|meta-externalagent|LinkedInBot|Twitterbot|WhatsApp|Slackbot|TelegramBot|Discordbot|Pinterest|bingbot|Googlebot|Applebot|redditbot|embedly|quora link preview|skypeuripreview|vkShare|W3C_Validator/i;

function isCrawler(ua: string | null) {
  return !!ua && CRAWLER_UA.test(ua);
}

function esc(s: string) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}

function ogHtml(title: string, description: string, canonical: string, image: string, redirect: boolean) {
  const t=esc(title),d=esc(description),u=esc(canonical),img=esc(image);
  return `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8"/><title>${t}</title>
<meta name="description" content="${d}"/>
<link rel="canonical" href="${u}"/>
<meta property="og:type" content="article"/>
<meta property="og:title" content="${t}"/>
<meta property="og:description" content="${d}"/>
<meta property="og:url" content="${u}"/>
<meta property="og:image" content="${img}"/>
<meta property="og:image:secure_url" content="${img}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:site_name" content="LS Diet"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="@JoinLSDiet"/>
<meta name="twitter:title" content="${t}"/>
<meta name="twitter:description" content="${d}"/>
<meta name="twitter:image" content="${img}"/>
${redirect ? `<meta http-equiv="refresh" content="0; url=${u}"/><script>window.location.replace(${JSON.stringify(canonical)})<\/script>` : ""}
</head><body><p><a href="${u}">${t}</a></p></body></html>`;
}

export const onRequestGet = async (context: { request: Request; params: { slug: string } }) => {
  const slug = String(context.params.slug).replace(/[^a-zA-Z0-9-_]/g,"").toLowerCase();
  const canonical = `${SITE}/blog/${slug}`;
  const ua = context.request.headers.get("user-agent");
  const crawler = isCrawler(ua);
  if (!crawler) return Response.redirect(canonical, 302);

  const article = ARTICLES[slug];
  if (article) {
    const image = article.image ? `${SITE}/og/${slug}.jpg` : FALLBACK_IMAGE;
    return new Response(ogHtml(article.title, article.description, canonical, image, false),
      { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" } });
  }

  return new Response(ogHtml("LS Diet | Weight Permanence Training","Stop regaining weight with the low-starch, low-sugar approach.",canonical, FALLBACK_IMAGE, false),
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
};
