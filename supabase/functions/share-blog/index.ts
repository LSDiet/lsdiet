// Server-rendered OG meta + redirect for blog posts.
// Social crawlers (Facebook, LinkedIn, WhatsApp, X) read the meta tags here;
// humans get instantly redirected to the canonical lsdiet.com/blog/{slug} URL.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/contentful";
const CONTENT_TYPE = "blogPost";
const SITE = "https://lsdiet.com";
const FALLBACK_IMAGE = "https://lsdiet.com/og-image.jpg";

function env(name: string): string {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`${name} is not configured`);
  return v;
}

async function cf(path: string, query: Record<string, string>) {
  const LOVABLE_API_KEY = env("LOVABLE_API_KEY");
  const CONTENTFUL_API_KEY = env("CONTENTFUL_API_KEY");
  const SPACE_ID = env("CONTENTFUL_SPACE_ID");
  const qs = new URLSearchParams(query).toString();
  const url = `${GATEWAY}/spaces/${SPACE_ID}/environments/master${path}?${qs}`;
  const r = await fetch(url, {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": CONTENTFUL_API_KEY,
    },
  });
  if (!r.ok) throw new Error(`Contentful gateway ${r.status}: ${await r.text()}`);
  return r.json();
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const CRAWLER_UA = /facebookexternalhit|facebookcatalog|meta-externalagent|LinkedInBot|Twitterbot|WhatsApp|Slackbot|TelegramBot|Discordbot|Pinterest|bingbot|Googlebot|Applebot|redditbot|embedly|quora link preview|skypeuripreview|vkShare|W3C_Validator/i;

function isCrawler(ua: string | null): boolean {
  return !!ua && CRAWLER_UA.test(ua);
}

function renderHtml(opts: {
  title: string;
  description: string;
  canonical: string;
  socialUrl?: string;
  image: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  redirect?: boolean;
}): string {
  const { title, description, canonical, socialUrl = canonical, image, imageAlt, imageWidth, imageHeight, imageType, redirect = true } = opts;
  const t = esc(title);
  const d = esc(description);
  const u = esc(canonical);
  const ogu = esc(socialUrl);
  const img = esc(image);
  const alt = imageAlt ? `<meta property="og:image:alt" content="${esc(imageAlt)}" />` : "";
  const w = imageWidth ? `<meta property="og:image:width" content="${imageWidth}" />` : "";
  const h = imageHeight ? `<meta property="og:image:height" content="${imageHeight}" />` : "";
  const type = imageType ? `<meta property="og:image:type" content="${esc(imageType)}" />` : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${t}</title>
<meta name="description" content="${d}" />
<link rel="canonical" href="${u}" />

<meta property="og:type" content="article" />
<meta property="og:title" content="${t}" />
<meta property="og:description" content="${d}" />
<meta property="og:url" content="${ogu}" />
<meta property="og:image" content="${img}" />
<meta property="og:image:secure_url" content="${img}" />
<meta property="og:site_name" content="LS Diet" />
${alt}
${w}
${h}
${type}

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@JoinLSDiet" />
<meta name="twitter:title" content="${t}" />
<meta name="twitter:description" content="${d}" />
<meta name="twitter:image" content="${img}" />

${redirect ? `<meta http-equiv="refresh" content="0; url=${u}" />
<script>window.location.replace(${JSON.stringify(canonical)});</script>` : ""}
</head>
<body>
<p><a href="${u}">${esc(title)}</a></p>
</body>
</html>`;
}

function htmlResponse(html: string, status = 200): Response {
  const headers = new Headers(corsHeaders);
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Cache-Control", "public, max-age=300, s-maxage=600");
  return new Response(html, { status, headers });
}

function redirectResponse(target: string): Response {
  const headers = new Headers(corsHeaders);
  headers.set("Location", target);
  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", "text/html; charset=utf-8");
  return new Response(
    `<!doctype html><meta http-equiv="refresh" content="0; url=${target}"><a href="${target}">Continue</a>`,
    { status: 302, headers }
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const ua = req.headers.get("user-agent");
  const crawler = isCrawler(ua);
  const redirect = !crawler;

  const ua = req.headers.get("user-agent");
  const crawler = isCrawler(ua);
  const redirect = !crawler;

  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("share-blog");
    const slug = idx >= 0 ? parts[idx + 1] : parts[parts.length - 1];

    if (!slug || slug === "share-blog") {
      if (!crawler) return redirectResponse(`${SITE}/blog`);
      return htmlResponse(
        renderHtml({
          title: "LS Diet Blog",
          description: "Stop weight regain with the low-starch, low-sugar lifestyle.",
          canonical: `${SITE}/blog`,
          image: FALLBACK_IMAGE,
          imageWidth: 1200,
          imageHeight: 630,
          redirect,
        }),
        404
      );
    }
          description: "Stop weight regain with the low-starch, low-sugar lifestyle.",
          canonical: `${SITE}/blog`,
          image: FALLBACK_IMAGE,
          imageWidth: 1200,
          imageHeight: 630,
          redirect,
        }),
        404
      );
    }

    const cleanSlug = decodeURIComponent(slug).replace(/[^a-zA-Z0-9-_]/g, "");
    const canonical = `${SITE}/blog/${cleanSlug}`;
    const socialUrl = `${SITE}/share/${cleanSlug}`;

    const data = await cf("/entries", {
      content_type: CONTENT_TYPE,
      "fields.slug": cleanSlug,
      "fields.publishDate[lte]": new Date().toISOString(),
      include: "2",
      limit: "1",
    });

    const item = data.items?.[0];
    if (!item) {
      return htmlResponse(
        renderHtml({
          title: "Post not found | LS Diet",
          description: "This article doesn't exist or hasn't been published yet.",
          canonical,
          image: FALLBACK_IMAGE,
          imageWidth: 1200,
          imageHeight: 630,
          redirect,
        }),
        404
      );
    }

    const f = item.fields;
    const assets: Record<string, any> = {};
    for (const a of data.includes?.Asset ?? []) {
      assets[a.sys.id] = {
        url: a.fields.file?.url ? `https:${a.fields.file.url}` : null,
        title: a.fields.title ?? "",
        contentType: a.fields.file?.contentType,
        width: a.fields.file?.details?.image?.width,
        height: a.fields.file?.details?.image?.height,
      };
    }
    const featured = f.featuredImage?.sys?.id ? assets[f.featuredImage.sys.id] : null;

    // Validate image: must be HTTPS; otherwise fall back.
    const featuredUrl = featured?.url && /^https:\/\//i.test(featured.url) ? featured.url : null;
    const image = featuredUrl ?? FALLBACK_IMAGE;
    const imageWidth = featuredUrl ? featured?.width : 1200;
    const imageHeight = featuredUrl ? featured?.height : 630;
    if (featuredUrl && (!featured?.width || !featured?.height)) {
      console.warn(`share-blog: missing image dimensions for ${cleanSlug}`);
    }

    const title = `${f.title ?? "LS Diet"} | LS Diet`;
    const description = f.excerpt || `${f.title} — by Oscar Poon on the LS Diet blog.`;

    return htmlResponse(
      renderHtml({
        title,
        description,
        canonical,
        socialUrl,
        image,
        imageAlt: featured?.title || f.title,
        imageWidth,
        imageHeight,
        imageType: featuredUrl ? featured?.contentType : "image/jpeg",
        redirect,
      })
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error("share-blog error:", msg);
    return htmlResponse(
      renderHtml({
        title: "LS Diet Blog",
        description: "Stop weight regain with the low-starch, low-sugar lifestyle.",
        canonical: `${SITE}/blog`,
        image: FALLBACK_IMAGE,
        imageWidth: 1200,
        imageHeight: 630,
        redirect,
      }),
      500
    );
  }
});
