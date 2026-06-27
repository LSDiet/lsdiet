const SITE = "https://lsdiet.com";
const FALLBACK_IMAGE = "https://lsdiet.com/og-image.jpg";

// Social bots: only need OG meta tags
const SOCIAL_UA = /facebookexternalhit|facebookcatalog|meta-externalagent|LinkedInBot|Twitterbot|WhatsApp|Slackbot|TelegramBot|Discordbot|Pinterest|bingbot|Googlebot|Applebot|redditbot|embedly|quora link preview|skypeuripreview|vkShare|W3C_Validator/i;

// AI crawlers: need readable article body
const AI_UA = /ClaudeBot|Claude-Web|anthropic-ai|GPTBot|ChatGPT-User|OAI-SearchBot|PerplexityBot|cohere-ai|Diffbot|Bytespider|PetalBot|CCBot/i;

const isSocialCrawler = (ua: string) => !!ua && SOCIAL_UA.test(ua);
const isAICrawler = (ua: string) => !!ua && AI_UA.test(ua);

const ARTICLES: Record<string, { title: string; description: string; image: boolean; body?: string }> = {
  "yo-yo-dieting-metabolism-myth":{"title":"Yo-Yo Dieting Did Not Ruin Your Metabolism. It Did Something Worse. | LS Diet","description":"New Lancet research clears yo-yo dieting of permanently damaging your metabolism. What it actually damages is your identity. That is harder to fix.","image":true,"body":`
<h1>Yo-Yo Dieting Did Not Ruin Your Metabolism. It Did Something Worse.</h1>
<p>If you have lost and regained weight more than once, you have probably told yourself the same story: each cycle made it harder because you broke something in your metabolism. A May 2026 review in The Lancet Diabetes and Endocrinology found no causal evidence that weight cycling causes permanent metabolic damage. Your metabolism adapted. It did not break.</p>
<p>What yo-yo dieting actually damages is harder to measure and far more consequential: your identity, your confidence, and your relationship with your own body.</p>

<h2>Your Metabolism Survived. Your Identity May Not Have.</h2>
<p>The research is clear that repeated weight cycling does not permanently alter your resting metabolic rate in a clinically meaningful way. The body adapts temporarily during restriction, but those adaptations are not permanent fixtures. What does become permanent is the internal narrative. After multiple cycles, most people stop believing they are capable of lasting change. That belief is the real damage.</p>
<p>Stage 1 of Weight Permanence Training is called Reality Awareness. It begins by separating what is actually true about your body from what you have come to believe after years of failed attempts. Those are two very different things, and conflating them is one of the most common reasons people give up before they start.</p>

<h2>The Physical Toll Nobody Tracks</h2>
<p>Even if metabolism is not permanently altered, the physical experience of repeated weight cycling is real and cumulative. Gaining and losing the same 20 or 30 pounds multiple times creates what some describe as a balloon body effect: skin elasticity changes, fat redistributes differently with each cycle, and energy levels shift in ways that are not explained by calorie intake alone.</p>
<p>In your late twenties, losing weight felt intuitive. By your late thirties, the same effort produces different results and your energy baseline has dropped enough that exercise now requires deliberate scheduling rather than casual intention. That change is real. It is just not metabolism. It is the compounding cost of years of restriction and rebound on your hormonal environment, your muscle-to-fat ratio, and your sleep quality.</p>

<h2>The Psychological Weight That Never Shows on a Scale</h2>
<p>The psychological damage from yo-yo dieting is documented and severe. Self-doubt compounds with each cycle. Shame accumulates around clothing that no longer fits. Confidence in social situations erodes as your body changes in ways you cannot control or predict. People who have cycled three or more times often describe the experience as losing trust in themselves, not just in diets.</p>
<p>This is the damage the Lancet review does not capture because it falls outside metabolic markers. But it is the damage that prevents people from trying again, or from trying seriously when they do. It is also the damage that Weight Permanence Training was built to address directly, starting with an honest assessment of where you actually are and why you got here.</p>

<h2>You Were Not Weak. You Were Targeted.</h2>
<p>In December 2025, the City Attorney of San Francisco filed a lawsuit against ten major food manufacturers, including Kraft Heinz, Coca-Cola, PepsiCo, and Nestle, alleging that their products were deliberately engineered to override satiety signals and create compulsive consumption patterns. This is not a fringe claim. It is now a legal argument being made in court.</p>
<p>The foods most people eat during weight regain, ultra-processed, high-starch, high-sugar products, are not neutral. They are designed by teams of food scientists to make you eat more than you intend to. Recognizing this is not an excuse. It is Reality Awareness. You cannot build a permanent system on top of a false premise about why the previous ones failed.</p>

<h2>Where Reality Awareness Changes Everything</h2>
<p>Most people approach a new diet attempt the same way they approached the last one: with motivation, a plan, and an unexamined assumption that the previous failures were personal failures. Reality Awareness, the first stage of Weight Permanence Training, challenges that assumption before you take a single action.</p>
<p>It asks: What actually happened? Not what you wish had happened, not what the plan said should happen. What actually happened, and what external forces were involved that you did not account for? Answering that honestly is harder than starting a new diet. It is also the only thing that produces a different result.</p>
<p>Your metabolism did not betray you. The system you were operating in did. And now you know the difference.</p>

<h2>Frequently Asked Questions</h2>
<h3>Does yo-yo dieting permanently damage your metabolism?</h3>
<p>Current research, including a May 2026 review in The Lancet Diabetes and Endocrinology by Magkos and Stefan, found no causal evidence that weight cycling causes permanent metabolic damage. The body adapts during caloric restriction, but those adaptations are not permanent. If you feel like your metabolism is different after multiple cycles, the more likely explanation is changes in muscle mass, hormonal environment, and sleep quality rather than a broken metabolic rate.</p>
<h3>Why do I keep regaining weight after every diet?</h3>
<p>Weight regain is usually a behavioural permanence problem, not a willpower problem. Most diets create temporary restriction without changing the underlying patterns, environment, or identity that led to the original weight gain. Without addressing those, the same conditions that produced the weight will reproduce it. Weight Permanence Training addresses this through a staged awareness process that identifies the specific friction points in your behaviour before you attempt to change them. Learn more at the awareness stages overview.</p>
<h3>What is Reality Awareness and how does it help with yo-yo dieting?</h3>
<p>Reality Awareness is Stage 1 of Weight Permanence Training. It involves establishing an honest baseline about your current weight, your history with dieting, and the external forces that contributed to previous cycles. It specifically separates personal responsibility from systemic factors like engineered food products, because conflating them leads to misdiagnosis and failed solutions. Most people who have yo-yo dieted have never done this assessment honestly, which is why they keep approaching new attempts the same way. You can start the Reality Awareness assessment at the awareness stages page.</p>

<h2>References</h2>
<p>City Attorney of San Francisco. (2025, December). <em>People of the State of California v. Kraft Heinz et al.</em> Office of the City Attorney.</p>
<p>Magkos, F., &amp; Stefan, N. (2026). Weight cycling and metabolic health: A systematic review. <em>The Lancet Diabetes &amp; Endocrinology.</em> https://doi.org/10.1016/S2213-8587(26)00037-9</p>
`},
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
