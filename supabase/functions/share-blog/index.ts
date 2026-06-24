// Server-rendered OG meta + redirect for blog posts.
// Social crawlers (Facebook, LinkedIn, WhatsApp, X) read the meta tags here;
// humans get instantly redirected to the canonical lsdiet.com/blog/{slug} URL.
//
// Lookup priority:
//   1. TSX_ARTICLES registry (local TSX articles not in Contentful)
//   2. Contentful (with publishDate filter)
//   3. Contentful retry without date filter (catches draft/wrong-date articles)
//   4. Fallback homepage OG
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY = "https://connector-gateway.lovable.dev/contentful";
const CONTENT_TYPE = "blogPost";
const SITE = "https://lsdiet.com";
const FALLBACK_IMAGE = "https://lsdiet.com/og-image.jpg";
const OG_BASE = "https://lsdiet.com/og";

/* ----------------------------------------------------------------
   Static registry for TSX articles (not in Contentful).
   image: if the article has a hero image in public/og/[slug].jpg, set true.
   ---------------------------------------------------------------- */
const TSX_ARTICLES: Record<string, { title: string; description: string; image: boolean }> = {
  "can-a-physical-job-help-you-lose-weight": { title: "Can a Physical Job Help You Lose Weight?", description: "Physical labour may increase calorie burn, but sustainable weight loss still depends heavily on eating behaviour and consistency.", image: false },
  "can-accountability-help-you-lose-weight": { title: "Can Accountability Help You Lose Weight?", description: "Many people struggle less when they no longer feel isolated during the weight loss process.", image: false },
  "can-stress-at-work-prevent-weight-loss": { title: "Can Stress at Work Prevent Weight Loss?", description: "Stress does not just affect emotions. It directly affects cravings, eating behaviour, sleep, and consistency.", image: false },
  "can-you-lose-weight-on-a-low-carb-diet": { title: "Can You Lose Weight on a Low Carb Diet?", description: "Low carb eating may reduce cravings and simplify weight loss, but sustainability still determines long term success.", image: false },
  "can-you-lose-weight-while-working-night-shifts": { title: "Can You Lose Weight While Working Night Shifts?", description: "Night shifts create behavioural and environmental challenges, but sustainable systems can still make weight loss possible.", image: false },
  "can-you-lose-weight-without-changing-your-diet": { title: "Can You Lose Weight Without Changing Your Diet?", description: "Whether weight loss is possible without changing your diet depends heavily on what your current diet already looks like.", image: false },
  "can-you-lose-weight-without-feeling-hungry": { title: "Can You Lose Weight Without Feeling Hungry?", description: "Weight loss and hunger often interact differently depending on food quality, body composition, and eating behaviour.", image: false },
  "can-you-lose-weight-without-going-to-the-gym": { title: "Can You Lose Weight Without Going to the Gym?", description: "You do not need a gym membership to lose weight. Sustainable food systems and behavioural consistency matter more than intense exercise routines.", image: false },
  "do-standing-desks-help-with-weight-loss": { title: "Do Standing Desks Help With Weight Loss?", description: "Standing desks do not magically burn fat, but they may encourage movement and reduce long periods of inactivity.", image: false },
  "do-you-need-to-count-calories-to-lose-weight": { title: "Do You Need to Count Calories to Lose Weight?", description: "Many people can lose weight sustainably without tracking every number.", image: false },
  "does-weight-loss-change-dating-and-attraction": { title: "Does Weight Loss Change Dating and Attraction?", description: "Confidence, communication, and emotional presence often influence attraction more deeply than appearance alone.", image: false },
  "how-does-sleep-affect-your-ability-to-lose-weight": { title: "How Does Sleep Affect Your Ability to Lose Weight?", description: "Poor sleep affects cravings, stress, emotional eating, and behavioural consistency far more than most people realize.", image: false },
  "how-much-does-weight-loss-affect-your-metabolism": { title: "How Much Does Weight Loss Affect Your Metabolism?", description: "Weight loss becomes increasingly different with age as metabolism, recovery, and energy levels gradually change.", image: false },
  "how-much-exercise-do-you-need-for-heart-health-and-weight-loss": { title: "150 Minutes a Week Is the Heart Health Minimum | LS Diet", description: "New UK Biobank research shows 150 minutes weekly is a heart health baseline, not a weight loss formula. Learn how exercise and the LS Diet work together.", image: false },
  "how-much-protein-should-you-eat-to-lose-weight": { title: "How Much Protein Should You Eat to Lose Weight?", description: "Protein becomes increasingly important when reducing starch and sugar intake during weight loss.", image: false },
  "how-much-weight-can-you-realistically-lose-in-a-month": { title: "How Much Weight Can You Realistically Lose in a Month?", description: "Most sustainable weight loss happens more gradually than extreme diet marketing suggests.", image: false },
  "how-to-avoid-weight-gain-working-an-office-job": { title: "How to Avoid Weight Gain Working an Office Job", description: "Most office environments naturally encourage behavioural drift unless routines become intentional.", image: false },
  "how-to-get-energy-to-exercise-after-working-all-day": { title: "How to Get Energy to Exercise After Working All Day", description: "The issue is often not energy itself, but behavioural prioritization and psychological resistance.", image: false },
  "how-to-lose-weight-quietly-without-announcing-it": { title: "How to Lose Weight Quietly Without Announcing It", description: "Sometimes the strongest weight loss progress happens quietly before other people even notice.", image: false },
  "how-to-lose-weight-when-you-work-long-hours": { title: "How to Lose Weight When You Work Long Hours", description: "Weight loss during long work hours is less about time management and more about behavioural prioritization.", image: false },
  "how-to-lose-weight-with-a-desk-job": { title: "How to Lose Weight With a Desk Job", description: "Learn how to lose weight while working a full time desk job using meal prep, low-starch low-sugar eating, and behavioural systems that reduce weight regain.", image: false },
  "how-to-meal-prep-for-weight-loss-on-a-busy-schedule": { title: "How to Meal Prep for Weight Loss on a Busy Schedule", description: "Simple meal prep systems can reduce decision fatigue and help prevent weight regain during stressful workweeks.", image: false },
  "how-to-overcome-weight-loss-plateaus": { title: "How to Overcome Weight Loss Plateaus", description: "Weight loss plateaus often signal the need for behavioural adjustments, not emotional panic.", image: false },
  "how-to-stay-motivated-to-lose-weight-when-working-full-time": { title: "How to Stay Motivated to Lose Weight When Working Full Time", description: "Motivation fades when weight loss depends only on emotion. Learn how LS Diet uses awareness and behavioural reinforcement to create long term consistency.", image: false },
  "how-to-stay-on-track-with-weight-loss-during-busy-seasons-at-work": { title: "How to Stay on Track With Weight Loss During Busy Seasons at Work", description: "Busy work seasons often disrupt routines and consistency. Learn how LS Diet approaches behavioural stability during stressful periods.", image: false },
  "how-weight-loss-changes-confidence-and-social-behaviour": { title: "How Weight Loss Changes Confidence and Social Behaviour", description: "Weight loss often changes how people feel, move, communicate, and socially engage with others.", image: false },
  "is-diet-or-exercise-more-important-for-weight-loss": { title: "Is Diet or Exercise More Important for Weight Loss?", description: "Most weight loss results come from sustainable food systems, not extreme exercise routines.", image: false },
  "office-job-weight-loss-success-stories": { title: "Office Job Weight Loss Success Stories", description: "Sustainable weight loss is still possible even while working a demanding full time office job.", image: false },
  "what-foods-help-you-lose-weight-fastest": { title: "What Foods Help You Lose Weight Fastest?", description: "Fast weight loss and sustainable weight loss are often two very different goals.", image: false },
  "what-should-you-eat-for-lunch-to-lose-weight": { title: "What Should You Eat for Lunch to Lose Weight?", description: "Lunch becomes much easier when meals are simple, filling, and sustainable enough to repeat consistently.", image: false },
  "whats-the-best-weight-loss-program-for-busy-professionals": { title: "What's the Best Weight Loss Program for Busy Professionals?", description: "Busy professionals need sustainable systems that survive stress, fatigue, and irregular schedules. Learn how LS Diet approaches behavioural permanence.", image: false },
  "why-do-healthy-habits-collapse-during-stress": { title: "Why Do Healthy Habits Collapse During Stress?", description: "Stress is the real test of whether a weight loss system is actually sustainable.", image: false },
  "why-do-i-eat-even-when-im-not-hungry": { title: "Why Do I Eat Even When I'm Not Hungry?", description: "Eating behaviour is often driven by emotion, habit, stress, or environment rather than true physical hunger.", image: false },
  "why-do-i-keep-losing-and-regaining-the-same-weight": { title: "Why Do I Keep Losing and Regaining the Same Weight?", description: "Repeated weight regain is usually a behavioural permanence problem rather than an information problem.", image: false },
  "why-do-i-keep-restarting-weight-loss": { title: "Why Do I Keep Restarting Weight Loss?", description: "Many people repeatedly restart weight loss because the underlying behavioural systems never changed. Learn how LS Diet approaches permanence differently.", image: false },
  "why-do-i-lose-motivation-after-a-few-weeks": { title: "Why Do I Lose Motivation After a Few Weeks?", description: "Temporary motivation often fades when behaviour is not reinforced psychologically. Learn how LS Diet approaches behavioural permanence differently.", image: false },
  "why-do-i-restart-weight-loss-every-monday": { title: "Why Do I Restart Weight Loss Every Monday?", description: "Many people repeatedly restart weight loss because the system was never sustainable to begin with.", image: false },
  "why-do-people-emotionally-eat-after-work": { title: "Why Do People Emotionally Eat After Work?", description: "Many people emotionally eat after work because stress, fatigue, and behavioural conditioning increase reward seeking behaviour.", image: false },
  "why-does-stress-make-me-eat-more": { title: "Why Does Stress Make Me Eat More?", description: "Stress eating is often an emotional regulation pattern rather than a physical hunger problem.", image: false },
  "why-does-weight-loss-feel-easier-when-im-younger": { title: "Why Does Weight Loss Feel Easier When I'm Younger?", description: "Age affects metabolism, recovery, energy, and behavioural flexibility. Learn why sustainable systems matter more over time.", image: false },
  "why-ozempic-wont-keep-the-weight-off": { title: "Why Ozempic Won't Keep the Weight Off | LS Diet", description: "GLP-1 drugs can suppress your appetite but they cannot build a new identity, and that's the only thing that actually keeps weight off permanently.", image: true },
  "why-you-eat-at-night-even-when-youre-not-hungry": { title: "Why You Eat at Night Even When You're Not Hungry | LS Diet", description: "Night eating is not a willpower problem. It's a pattern with specific triggers and once you can see the pattern, you can change the environment instead of fighting yourself.", image: true },
  "why-you-regain-weight-after-stopping-ozempic": { title: "Why You Gain the Weight Back After Stopping Ozempic | LS Diet", description: "Research shows most people regain weight within a year of stopping Ozempic. Here's the real reason why, and what actually needs to change.", image: true },
  "will-losing-weight-change-how-people-treat-you-at-work": { title: "Will Losing Weight Change How People Treat You at Work?", description: "Some colleagues will notice. Some won't. What actually shifts is how you treat yourself and that changes everything else.", image: false },
  "will-losing-weight-improve-your-career-prospects": { title: "Will Losing Weight Improve Your Career Prospects?", description: "Career outcomes are influenced more heavily by confidence, communication, and behaviour than appearance alone.", image: false },
  "youre-losing-muscle-not-just-fat-on-glp1-drugs": { title: "You're Losing Muscle, Not Just Fat, on GLP-1 Drugs | LS Diet", description: "GLP-1 drugs like Ozempic cause significant muscle loss alongside fat loss. Here's what the research shows and why this matters more if you're over 45.", image: true },
};

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
  image: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  redirect?: boolean;
}): string {
  const { title, description, canonical, image, imageAlt, imageWidth = 1200, imageHeight = 630, imageType, redirect = true } = opts;
  const t = esc(title);
  const d = esc(description);
  const u = esc(canonical);
  const img = esc(image);
  const alt = imageAlt ? `<meta property="og:image:alt" content="${esc(imageAlt)}" />` : "";
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
<meta property="og:url" content="${u}" />
<meta property="og:image" content="${img}" />
<meta property="og:image:secure_url" content="${img}" />
<meta property="og:image:width" content="${imageWidth}" />
<meta property="og:image:height" content="${imageHeight}" />
<meta property="og:site_name" content="LS Diet" />
${alt}
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
  return new Response(html, {
    status,
    headers: {
      ...CORS,
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function redirectResponse(target: string): Response {
  return new Response(
    `<!doctype html><meta http-equiv="refresh" content="0; url=${target}"><a href="${target}">Continue</a>`,
    {
      status: 302,
      headers: {
        ...CORS,
        Location: target,
        "Cache-Control": "no-store",
        "Content-Type": "text/html; charset=utf-8",
      },
    }
  );
}

function extractContentfulMeta(data: any): { title: string; description: string; image: string; imageAlt?: string; imageWidth?: number; imageHeight?: number; imageType?: string } | null {
  const item = data?.items?.[0];
  if (!item) return null;

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
  const featuredUrl = featured?.url && /^https:\/\//i.test(featured.url) ? featured.url : null;
  const image = featuredUrl ?? FALLBACK_IMAGE;

  return {
    title: `${f.title ?? "LS Diet"} | LS Diet`,
    description: f.excerpt || `${f.title} — by Oscar Poon on the LS Diet blog.`,
    image,
    imageAlt: featured?.title || f.title,
    imageWidth: featuredUrl ? featured?.width : 1200,
    imageHeight: featuredUrl ? featured?.height : 630,
    imageType: featuredUrl ? featured?.contentType : "image/jpeg",
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

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
          title: "LS Diet Blog | Weight Permanence Training",
          description: "Stop weight regain with the low-starch, low-sugar lifestyle.",
          canonical: `${SITE}/blog`,
          image: FALLBACK_IMAGE,
          redirect,
        }),
        404
      );
    }

    const cleanSlug = decodeURIComponent(slug).replace(/[^a-zA-Z0-9-_]/g, "");
    const canonical = `${SITE}/blog/${cleanSlug}`;

    // Humans: short-circuit immediately to the canonical article (302).
    if (!crawler) return redirectResponse(canonical);

    // ── Priority 1: TSX article static registry ──────────────────────────
    const tsx = TSX_ARTICLES[cleanSlug];
    if (tsx) {
      const image = tsx.image ? `${OG_BASE}/${cleanSlug}.jpg` : FALLBACK_IMAGE;
      return htmlResponse(
        renderHtml({
          title: tsx.title,
          description: tsx.description,
          canonical,
          image,
          imageWidth: 1200,
          imageHeight: 630,
          imageType: "image/jpeg",
          redirect,
        })
      );
    }

    // ── Priority 2: Contentful with publishDate filter ────────────────────
    let meta: ReturnType<typeof extractContentfulMeta> = null;
    try {
      const data = await cf("/entries", {
        content_type: CONTENT_TYPE,
        "fields.slug": cleanSlug,
        "fields.publishDate[lte]": new Date().toISOString(),
        include: "2",
        limit: "1",
      });
      meta = extractContentfulMeta(data);
    } catch (_) { /* will retry */ }

    // ── Priority 3: Contentful retry without date filter ──────────────────
    if (!meta) {
      try {
        const data = await cf("/entries", {
          content_type: CONTENT_TYPE,
          "fields.slug": cleanSlug,
          include: "2",
          limit: "1",
        });
        meta = extractContentfulMeta(data);
      } catch (_) { /* fall through to 404 */ }
    }

    if (meta) {
      return htmlResponse(
        renderHtml({ ...meta, canonical, redirect })
      );
    }

    // ── Priority 4: Not found — use article canonical URL, not homepage ───
    return htmlResponse(
      renderHtml({
        title: "Article Not Found | LS Diet",
        description: "This article doesn't exist or hasn't been published yet.",
        canonical,
        image: FALLBACK_IMAGE,
        redirect,
      }),
      404
    );

  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error("share-blog error:", msg);
    return htmlResponse(
      renderHtml({
        title: "LS Diet | Weight Permanence Training",
        description: "Stop weight regain with the low-starch, low-sugar lifestyle.",
        canonical: `${SITE}/blog`,
        image: FALLBACK_IMAGE,
        redirect,
      }),
      500
    );
  }
});
