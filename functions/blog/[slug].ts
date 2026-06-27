const SITE = "https://lsdiet.com";
const FALLBACK_IMAGE = "https://lsdiet.com/og-image.jpg";

// Social bots: only need OG meta tags
const SOCIAL_UA = /facebookexternalhit|facebookcatalog|meta-externalagent|LinkedInBot|Twitterbot|WhatsApp|Slackbot|TelegramBot|Discordbot|Pinterest|bingbot|Googlebot|Applebot|redditbot|embedly|quora link preview|skypeuripreview|vkShare|W3C_Validator/i;

// AI crawlers: need readable article body
const AI_UA = /ClaudeBot|Claude-Web|anthropic-ai|GPTBot|ChatGPT-User|OAI-SearchBot|PerplexityBot|cohere-ai|Diffbot|Bytespider|PetalBot|CCBot/i;

const isSocialCrawler = (ua: string) => !!ua && SOCIAL_UA.test(ua);
const isAICrawler = (ua: string) => !!ua && AI_UA.test(ua);

const ARTICLES: Record<string, { title: string; description: string; image: boolean; body?: string }> = {
  "yo-yo-dieting-metabolism-myth":{"title":"Yo-Yo Dieting Did Not Ruin Your Metabolism. It Did Something Worse. | LS Diet","description":"Yo-yo dieting does not permanently damage your metabolism. Here is what the research actually shows and why the myth is harder to shake than the facts.","image":true,"body":`<h1>Yo-Yo Dieting Did Not Ruin Your Metabolism. It Did Something Worse.</h1>
<p>For years, the conventional wisdom has been brutal: yo-yo dieting ruins your metabolism. Lose and regain weight enough times and you have permanently damaged your body's ability to burn fat. You are stuck, and it is your own fault.</p>
<p>A major review published in May 2026 in <em>The Lancet Diabetes &amp; Endocrinology</em> challenges this directly. After analysing decades of research in humans and animals, Magkos and Stefan (2026) found no convincing causal evidence that weight cycling itself leads to long-term metabolic harm. Losing and regaining weight does not permanently lower your resting metabolic rate or cause the kind of muscle loss that would not otherwise occur with ageing.</p>
<p>That is genuinely good news. But it is also incomplete news. Your metabolism may have survived the cycles. What they left behind is harder to measure and harder to fix.</p>

<h2>What the Research Actually Shows</h2>
<p>The Magkos and Stefan review is significant because it separates what happens to your metabolism from what happens to your body as you age. When you lose weight and regain it multiple times, your resting metabolic rate does not plummet. Instead, research shows that resting energy expenditure decreases by approximately 4 kcal per year with age alone, independent of weight cycling. This metabolic decline happens to everyone, regardless of their dieting history.</p>
<p>The confusion arises because people experience real, measurable changes after weight regain. But those changes are not caused by the cycles themselves. They are caused by ageing, the cumulative time spent at a higher body weight, and repeated exposure to an environment designed to promote overeating. Most of the adverse effects people attribute to yo-yo dieting are better explained by these factors than by metabolic damage.</p>

<h2>Why the Myth Feels True</h2>
<p>Your body does change after repeated weight loss and regain. At 25, healthy young adults typically have fasting insulin levels between 2 and 8 microunits per millilitre, reflecting strong insulin sensitivity. By 35 or 45, insulin sensitivity decreases naturally with age, and your body responds differently to food. Two weeks of eating starchy carbohydrates at 25 might add 2 pounds. The same two weeks at 40 might add 5 pounds.</p>
<p>This is not permanent metabolic damage. This is your body responding correctly to ageing and changing hormone levels. But people in weight cycling patterns experience this shift directly. The second weight loss is slower. The regain feels faster. The food rules need to be stricter. All of these experiences are real. None of them are evidence of a broken metabolism. They are evidence that your biology has changed.</p>

<h2>The Real Consequence: Systemic Exploitation</h2>
<p>If your metabolism is not broken, then why do more than 80 percent of people regain all of their weight loss within five years? The answer is not internal. It is external. Research shows that adults in the United States consume 57 percent of their calories from ultra-processed foods. These foods are not accidental. They are engineered.</p>
<p>In December 2025, the City of San Francisco filed a landmark lawsuit against ten of the world's largest food manufacturers, including Kraft Heinz, Coca-Cola, PepsiCo, and Nestlé. The allegation was that these companies knowingly engineered ultra-processed foods to be addictive and deliberately marketed those products to children using tactics borrowed from the tobacco industry (City Attorney of San Francisco, 2025). The lawsuit was described as the first of its kind filed by a city government.</p>
<p>This is not a fringe claim. It is a legal argument made by a major city, backed by internal corporate documents. Research using the Yale Food Addiction Scale across 36 countries found that ultra-processed foods may meet scientific criteria for addictive substances, triggering the brain's reward system in ways similar to nicotine and alcohol. These foods have been engineered to be high in both refined carbohydrates and added fats in a way not seen in nature. They lead to behaviour that meets the clinical criteria for substance use disorders: excessive intake, loss of control over consumption, and intense cravings.</p>
<p>You were not weak. You were targeted. Your metabolism survived the cycles. But the food industry is designed to exploit the biology that remains.</p>

<h2>What This Means for You</h2>
<p>Understanding what is actually true changes what you do next. Your metabolism is not permanently broken. Your body has changed in real ways over time. You were operating in an environment specifically designed to make stopping difficult. That is the starting point for permanent change. Not motivation. Not a new plan. An accurate read of what actually happened.</p>

<h2>Frequently Asked Questions</h2>
<h3>Does yo-yo dieting permanently damage your metabolism?</h3>
<p>According to a comprehensive review published in <em>The Lancet Diabetes &amp; Endocrinology</em> in May 2026, the evidence does not support a causal link between weight cycling and permanent metabolic harm (Magkos &amp; Stefan, 2026). Research shows that resting energy expenditure decreases by approximately 4 kcal per year due to ageing alone. Most of the adverse effects associated with yo-yo dieting appear to be related to ageing, repeated exposure to obesogenic environments, or longer cumulative time spent at a higher body weight rather than to the cycles themselves. This does not mean weight cycling has no consequences, but the specific fear that your metabolism is permanently broken is not well supported by the current evidence.</p>
<h3>Why does my body seem to respond to food so differently after years of dieting?</h3>
<p>Your body does change over time. Healthy young adults typically have fasting insulin levels between 2 and 8 microunits per millilitre, but insulin sensitivity decreases with age. By 35 or 45, your body handles the same food intake differently than it did at 25. These are real physiological shifts, but they are not the same as permanent damage. They are changes in how your body operates in its current environment, which is why the quality of your food choices and your relationship to carbohydrates and sugar matter more at this stage than they did a decade ago. The LS Diet approach, which lowers insulin through reduced starch and sugar, is designed specifically to work with this reality rather than against it.</p>
<h3>If my metabolism is not broken, why do I keep regaining weight?</h3>
<p>Weight regain is not a failure of your metabolism. It is a failure of the environment to support your choices. Adults in the United States consume 57 percent of their calories from ultra-processed foods. These foods are engineered to trigger addictive-like responses, meeting scientific criteria for addictive substances. Research using the Yale Food Addiction Scale across 36 countries found that these engineered foods trigger the brain's reward system in ways similar to nicotine and alcohol. More than 80 percent of people regain their weight within five years, not because they are weak, but because they are navigating a system designed to make overeating the path of least resistance. Permanent weight management requires either changing the environment or building systems that work within it. That is where Reality Awareness begins.</p>

<h2>References</h2>
<p>City Attorney of San Francisco. (2025, December 2). <em>San Francisco City Attorney Chiu sues largest manufacturers of ultra-processed foods.</em> https://sfcityattorney.org/san-francisco-city-attorney-chiu-sues-largest-manufacturers-of-ultra-processed-foods/</p>
<p>Magkos, F., &amp; Stefan, N. (2026). Is weight cycling clinically harmful? <em>The Lancet Diabetes &amp; Endocrinology</em>. https://doi.org/10.1016/S2213-8587(26)00037-9</p>`}
  "why-people-regain-weight-after-dieting":{"title":"Why People Regain Weight After Dieting | LS Diet","description":"Weight regain after dieting is the real long-term problem. Learn why people regain weight and how LS Diet helps you stop for good.","image":false},
  "why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting":{"title":"Why Low Starch Low Sugar Is More Sustainable Than Extreme Dieting | LS Diet","description":"Extreme diets rely on restriction and willpower. Low-starch, low-sugar eating reduces cravings and insulin load, making it easier to sustain long-term.","image":false},
  "the-weight-permanence-triangle-how-to-stop-regaining-weight":{"title":"The Weight Permanence Triangle | How to Stop Regaining Weight | LS Diet","description":"The Weight Permanence Triangle is the core LS Diet framework combining Awareness, Action Practice, and Permanence to stop the cycle of losing and regaining weight.","image":false},
  "reality-awareness":{"title":"Reality Awareness | The First Step Toward Permanent Weight Loss | LS Diet","description":"Reality Awareness helps you establish an honest baseline before trying to stop regaining weight. Stage 1 of Weight Permanence Training.","image":false},
  "friction-awareness":{"title":"Friction Awareness | Identify What Keeps Stopping You | LS Diet","description":"Friction Awareness identifies the specific obstacles that repeatedly interrupt your consistency. Stage 2 of Weight Permanence Training.","image":false},
  "pattern-awareness":{"title":"Pattern Awareness | See the Cycle Before It Repeats | LS Diet","description":"Pattern Awareness helps you recognise recurring behavioural loops that lead to weight regain. Stage 3 of Weight Permanence Training.","image":false},
  "consequence-awareness":{"title":"Consequence Awareness | Understanding the Real Cost of Weight Regain | LS Diet","description":"Consequence Awareness connects your current behaviours to their long-term outcomes, building motivation that outlasts short-term effort. Stage 4 of Weight Permanence Training.","image":false},
  "identity-awareness":{"title":"Identity Awareness | Becoming Someone Who Keeps the Weight Off | LS Diet","description":"Identity Awareness shifts how you see yourself from someone trying to lose weight to someone who naturally maintains it. Stage 5 of Weight Permanence Training.","image":false},
  "action-practice":{"title":"Action Practice | Building Habits That Survive Real Life | LS Diet","description":"Action Practice is the daily repetition that turns awareness into permanent behaviour. The final stage of Weight Permanence Training.","image":false},
  "oral-glp-1-pill-what-happens-when-you-stop":{"title":"No More Injections? The New Oral Weight Loss Pill and What Happens When You Stop | LS Diet","description":"Elecoglipron is an oral GLP-1 drug that may replace injections. Here is what the science says about what happens when you stop taking it.","image":true},
  "why-ozempic-wont-keep-the-weight-off":{"title":"Why Ozempic Won't Keep the Weight Off | LS Diet","description":"GLP-1 drugs can suppress your appetite but they cannot build a new identity, and that's the only thing that actually keeps weight off permanently.","image":true},
  "why-you-eat-at-night-even-when-youre-not-hungry":{"title":"Why You Eat at Night Even When You're Not Hungry | LS Diet","description":"Night eating is not a willpower problem. It's a pattern with specific triggers and once you can see the pattern, you can change the environment instead of fighting yourself.","image":true},
  "why-you-regain-weight-after-stopping-ozempic":{"title":"Why You Gain the Weight Back After Stopping Ozempic | LS Diet","description":"Research shows most people regain weight within a year of stopping Ozempic. Here's the real reason why, and what actually needs to change.","image":true},
  "youre-losing-muscle-not-just-fat-on-glp1-drugs":{"title":"You're Losing Muscle, Not Just Fat, on GLP-1 Drugs | LS Diet","description":"GLP-1 drugs like Ozempic cause significant muscle loss alongside fat loss. Here's what the research shows and why this matters more if you're over 45.","image":true},
  "can-a-physical-job-help-you-lose-weight":{"title":"Can a Physical Job Help You Lose Weight?","description":"Physical labour may increase calorie burn, but sustainable weight loss still depends heavily on eating behaviour and consistency.","image":false},
  "can-accountability-help-you-lose-weight":{"title":"Can Accountability Help You Lose Weight?","description":"Many people struggle less when they no longer feel isolated during the weight loss process.","image":false},
  "can-stress-at-work-prevent-weight-loss":{"title":"Can Stress at Work Prevent Weight Loss?","description":"Stress does not just affect emotions. It directly affects cravings, eating behaviour, sleep, and consistency.","image":false},
  "can-you-lose-weight-on-a-low-carb-diet":{"title":"Can You Lose Weight on a Low Carb Diet?","description":"Low carb eating may reduce cravings and simplify weight loss, but sustainability still determines long term success.","image":false},
  "can-you-lose-weight-while-working-night-shifts":{"title":"Can You Lose Weight While Working Night Shifts?","description":"Night shifts create behavioural and environmental challenges, but sustainable systems can still make weight loss possible.","image":false},
  "can-you-lose-weight-without-changing-your-diet":{"title":"Can You Lose Weight Without Changing Your Diet?","description":"Whether weight loss is possible without changing your diet depends heavily on what your current diet already looks like.","image":false},
  "can-you-lose-weight-without-feeling-hungry":{"title":"Can You Lose Weight Without Feeling Hungry?","description":"Weight loss and hunger often interact differently depending on food quality, body composition, and eating behaviour.","image":false},
  "can-you-lose-weight-without-going-to-the-gym":{"title":"Can You Lose Weight Without Going to the Gym?","description":"You do not need a gym membership to lose weight. Sustainable food systems and behavioural consistency matter more than intense exercise routines.","image":false},
  "do-standing-desks-help-with-weight-loss":{"title":"Do Standing Desks Help With Weight Loss?","description":"Standing desks do not magically burn fat, but they may encourage movement and reduce long periods of inactivity.","image":false},
  "do-you-need-to-count-calories-to-lose-weight":{"title":"Do You Need to Count Calories to Lose Weight?","description":"Many people can lose weight sustainably without tracking every number.","image":false},
  "does-weight-loss-change-dating-and-attraction":{"title":"Does Weight Loss Change Dating and Attraction?","description":"Confidence, communication, and emotional presence often influence attraction more deeply than appearance alone.","image":false},
  "how-does-sleep-affect-your-ability-to-lose-weight":{"title":"How Does Sleep Affect Your Ability to Lose Weight?","description":"Poor sleep affects cravings, stress, emotional eating, and behavioural consistency far more than most people realize.","image":false},
  "how-much-does-weight-loss-affect-your-metabolism":{"title":"How Much Does Weight Loss Affect Your Metabolism?","description":"Weight loss becomes increasingly different with age as metabolism, recovery, and energy levels gradually change.","image":false},
  "how-much-exercise-do-you-need-for-heart-health-and-weight-loss":{"title":"150 Minutes a Week Is the Heart Health Minimum | LS Diet","description":"New UK Biobank research shows 150 minutes weekly is a heart health baseline, not a weight loss formula.","image":false},
  "how-much-protein-should-you-eat-to-lose-weight":{"title":"How Much Protein Should You Eat to Lose Weight?","description":"Protein becomes increasingly important when reducing starch and sugar intake during weight loss.","image":false},
  "how-much-weight-can-you-realistically-lose-in-a-month":{"title":"How Much Weight Can You Realistically Lose in a Month?","description":"Most sustainable weight loss happens more gradually than extreme diet marketing suggests.","image":false},
  "how-to-avoid-weight-gain-working-an-office-job":{"title":"How to Avoid Weight Gain Working an Office Job","description":"Most office environments naturally encourage behavioural drift unless routines become intentional.","image":false},
  "how-to-get-energy-to-exercise-after-working-all-day":{"title":"How to Get Energy to Exercise After Working All Day","description":"The issue is often not energy itself, but behavioural prioritization and psychological resistance.","image":false},
  "how-to-lose-weight-quietly-without-announcing-it":{"title":"How to Lose Weight Quietly Without Announcing It","description":"Sometimes the strongest weight loss progress happens quietly before other people even notice.","image":false},
  "how-to-lose-weight-when-you-work-long-hours":{"title":"How to Lose Weight When You Work Long Hours","description":"Weight loss during long work hours is less about time management and more about behavioural prioritization.","image":false},
  "how-to-lose-weight-with-a-desk-job":{"title":"How to Lose Weight With a Desk Job","description":"Learn how to lose weight while working a full time desk job using meal prep, low-starch low-sugar eating, and behavioural systems that reduce weight regain.","image":false},
  "how-to-meal-prep-for-weight-loss-on-a-busy-schedule":{"title":"How to Meal Prep for Weight Loss on a Busy Schedule","description":"Simple meal prep systems can reduce decision fatigue and help prevent weight regain during stressful workweeks.","image":false},
  "how-to-overcome-weight-loss-plateaus":{"title":"How to Overcome Weight Loss Plateaus","description":"Weight loss plateaus often signal the need for behavioural adjustments, not emotional panic.","image":false},
  "how-to-stay-motivated-to-lose-weight-when-working-full-time":{"title":"How to Stay Motivated to Lose Weight When Working Full Time","description":"Motivation fades when weight loss depends only on emotion. Learn how LS Diet uses awareness and behavioural reinforcement to create long term consistency.","image":false},
  "how-to-stay-on-track-with-weight-loss-during-busy-seasons-at-work":{"title":"How to Stay on Track With Weight Loss During Busy Seasons at Work","description":"Busy work seasons often disrupt routines and consistency.","image":false},
  "how-weight-loss-changes-confidence-and-social-behaviour":{"title":"How Weight Loss Changes Confidence and Social Behaviour","description":"Weight loss often changes how people feel, move, communicate, and socially engage with others.","image":false},
  "is-diet-or-exercise-more-important-for-weight-loss":{"title":"Is Diet or Exercise More Important for Weight Loss?","description":"Most weight loss results come from sustainable food systems, not extreme exercise routines.","image":false},
  "office-job-weight-loss-success-stories":{"title":"Office Job Weight Loss Success Stories","description":"Sustainable weight loss is still possible even while working a demanding full time office job.","image":false},
  "what-foods-help-you-lose-weight-fastest":{"title":"What Foods Help You Lose Weight Fastest?","description":"Fast weight loss and sustainable weight loss are often two very different goals.","image":false},
  "what-should-you-eat-for-lunch-to-lose-weight":{"title":"What Should You Eat for Lunch to Lose Weight?","description":"Lunch becomes much easier when meals are simple, filling, and sustainable enough to repeat consistently.","image":false},
  "whats-the-best-weight-loss-program-for-busy-professionals":{"title":"What's the Best Weight Loss Program for Busy Professionals?","description":"Busy professionals need sustainable systems that survive stress, fatigue, and irregular schedules.","image":false},
  "why-do-healthy-habits-collapse-during-stress":{"title":"Why Do Healthy Habits Collapse During Stress?","description":"Stress is the real test of whether a weight loss system is actually sustainable.","image":false},
  "why-do-i-eat-even-when-im-not-hungry":{"title":"Why Do I Eat Even When I'm Not Hungry?","description":"Eating behaviour is often driven by emotion, habit, stress, or environment rather than true physical hunger.","image":false},
  "why-do-i-keep-losing-and-regaining-the-same-weight":{"title":"Why Do I Keep Losing and Regaining the Same Weight?","description":"Repeated weight regain is usually a behavioural permanence problem rather than an information problem.","image":false},
  "why-do-i-keep-restarting-weight-loss":{"title":"Why Do I Keep Restarting Weight Loss?","description":"Many people repeatedly restart weight loss because the underlying behavioural systems never changed.","image":false},
  "why-do-i-lose-motivation-after-a-few-weeks":{"title":"Why Do I Lose Motivation After a Few Weeks?","description":"Temporary motivation often fades when behaviour is not reinforced psychologically.","image":false},
  "why-do-i-restart-weight-loss-every-monday":{"title":"Why Do I Restart Weight Loss Every Monday?","description":"Many people repeatedly restart weight loss because the system was never sustainable to begin with.","image":false},
  "why-do-people-emotionally-eat-after-work":{"title":"Why Do People Emotionally Eat After Work?","description":"Many people emotionally eat after work because stress, fatigue, and behavioural conditioning increase reward seeking behaviour.","image":false},
  "why-does-stress-make-me-eat-more":{"title":"Why Does Stress Make Me Eat More?","description":"Stress eating is often an emotional regulation pattern rather than a physical hunger problem.","image":false},
  "why-does-weight-loss-feel-easier-when-im-younger":{"title":"Why Does Weight Loss Feel Easier When I'm Younger?","description":"Age affects metabolism, recovery, energy, and behavioural flexibility.","image":false},
  "will-losing-weight-change-how-people-treat-you-at-work":{"title":"Will Losing Weight Change How People Treat You at Work?","description":"Some colleagues will notice. Some won't. What actually shifts is how you treat yourself.","image":false},
  "will-losing-weight-improve-your-career-prospects":{"title":"Will Losing Weight Improve Your Career Prospects?","description":"Career outcomes are influenced more heavily by confidence, communication, and behaviour than appearance alone.","image":false}
};

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
