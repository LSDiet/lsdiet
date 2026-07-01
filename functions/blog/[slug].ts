import { ARTICLES } from "../_shared/articles";

const SITE = "https://lsdiet.com";
const FALLBACK_IMAGE = "https://lsdiet.com/og-image.jpg";

// Social bots: only need OG meta tags
const SOCIAL_UA = /facebookexternalhit|facebookcatalog|meta-externalagent|LinkedInBot|Twitterbot|WhatsApp|Slackbot|TelegramBot|Discordbot|Pinterest|bingbot|Googlebot|Applebot|redditbot|embedly|quora link preview|skypeuripreview|vkShare|W3C_Validator/i;

// AI crawlers: need readable article body
const AI_UA = /ClaudeBot|Claude-Web|anthropic-ai|GPTBot|ChatGPT-User|OAI-SearchBot|PerplexityBot|cohere-ai|Diffbot|Bytespider|PetalBot|CCBot/i;

const isSocialCrawler = (ua: string) => !!ua && SOCIAL_UA.test(ua);
const isAICrawler = (ua: string) => !!ua && AI_UA.test(ua);

const esc = (s: string) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");

const ogHtml = (title: string, description: string, canonical: string, image: string) => {
  const t=esc(title),d=esc(description),u=esc(canonical),img=esc(image);
  return `<!doctype html><html lang="en"><head>
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
</head><body><p><a href="${u}">${t}</a></p></body></html>`;
};

const aiHtml = (title: string, description: string, canonical: string, image: string, body: string) => {
  const t=esc(title),d=esc(description),u=esc(canonical),img=esc(image);
  return `<!doctype html><html lang="en"><head>
<meta charset="UTF-8"/><title>${t}</title>
<meta name="description" content="${d}"/>
<link rel="canonical" href="${u}"/>
<meta property="og:type" content="article"/>
<meta property="og:title" content="${t}"/>
<meta property="og:description" content="${d}"/>
<meta property="og:url" content="${u}"/>
<meta property="og:image" content="${img}"/>
<meta property="og:site_name" content="LS Diet"/>
</head><body>
<article>
<p>Source: <a href="${u}">${u}</a> | Author: Oscar Poon | Site: LS Diet (lsdiet.com)</p>
${body}
</article>
</body></html>`;
};

export const onRequestGet = async (context: { request: Request; params: { slug: string }; next: () => Promise<Response> }) => {
  const ua = context.request.headers.get("user-agent") || "";
  const slug = String(context.params.slug).replace(/[^a-zA-Z0-9-_]/g,"").toLowerCase();
  const canonical = `${SITE}/blog/${slug}`;
  const article = ARTICLES[slug];

  if (isAICrawler(ua)) {
    if (article) {
      const image = article.image ? `${SITE}/og/${slug}.jpg` : FALLBACK_IMAGE;
      const body = article.body || `<p>${esc(article.description)}</p>`;
      return new Response(aiHtml(article.title, article.description, canonical, image, body), {
        headers: {"Content-Type":"text/html; charset=utf-8","Cache-Control":"public, max-age=300","X-Robots-Tag":"index, follow"}
      });
    }
    return new Response(
      aiHtml("LS Diet | Weight Permanence Training","Stop regaining weight with the low-starch, low-sugar approach.",canonical,FALLBACK_IMAGE,"<p>This article is part of the LS Diet blog at lsdiet.com, covering Weight Permanence Training and the low-starch, low-sugar approach to permanent weight loss.</p>"),
      {status:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}}
    );
  }

  if (isSocialCrawler(ua)) {
    if (article) {
      const image = article.image ? `${SITE}/og/${slug}.jpg` : FALLBACK_IMAGE;
      return new Response(ogHtml(article.title, article.description, canonical, image), {
        headers: {"Content-Type":"text/html; charset=utf-8","Cache-Control":"public, max-age=300"}
      });
    }
    return new Response(
      ogHtml("LS Diet | Weight Permanence Training","Stop regaining weight with the low-starch, low-sugar approach.",canonical,FALLBACK_IMAGE),
      {status:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}}
    );
  }

  return context.next();
};
