// Foundation pillar — code-managed (NOT Contentful).
// canonicalTopic: stop-weight-regain
import featuredImage from "@/assets/foundation-why-people-regain-weight.png";
import obviousSugarImg from "@/assets/foundation-obvious-sugar.png";
import starchHiddenImg from "@/assets/foundation-starch-hidden-problem.png";
import dietsComparisonImg from "@/assets/foundation-diets-comparison.png";
import reverseInsulinImg from "@/assets/foundation-reverse-insulin-resistance.png";
import type { Foundation } from "./types";

function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8 -mx-4 md:mx-0">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full md:rounded-xl border border-border"
      />
      {caption && (
        <figcaption className="mt-2 px-4 md:px-0 text-sm text-zinc-600 italic text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const meta: Foundation["meta"] = {
  slug: "why-people-regain-weight-after-dieting",
  title: "Why People Regain Weight After Dieting | Stop Weight Regain | LS Diet",
  order: 1,
  excerpt:
    "Weight regain is the real failure mode of dieting — most people lose weight successfully, then slowly regain it. This LS Diet pillar article explains why repeated weight regain happens, why temporary motivation collapses, and how LS Diet is built as a weight regain prevention system instead of another diet.",
  metaDescription:
    "Weight regain after dieting is the real long-term problem. Learn why people regain weight, why temporary motivation collapses, and how LS Diet's weight regain prevention system helps you stop regaining weight for good.",
  publishDate: "2026-05-19T00:00:00.000Z",
  updatedAt: "2026-05-25T00:00:00.000Z",
  canonicalTopic: "stop-weight-regain",
  subTopic: null,
  topics: [
    "weight-regain",
    "behavioural-permanence",
    "consistency",
    "emotional-eating",
    "dieting-psychology",
  ],
  contentType: "pillar",
  parentUrl: "https://lsdiet.com/topics/stop-weight-regain",
  relatedTopics: ["weight-permanence-triangle", "awareness-stages", "action-practice-examples"],
  featuredImage: {
    src: featuredImage,
    alt: "Why people regain weight after dieting — LS Diet pillar article",
  },
  faqs: [
    {
      q: "Why do most people regain weight after dieting?",
      a: "Many people rely on temporary motivation, restriction, or unsustainable routines. When stress, cravings, and normal life pressures return, previous behaviours often return as well.",
    },
    {
      q: "What is behavioural permanence?",
      a: "Behavioural permanence refers to creating sustainable habits and systems that continue long after motivation fades.",
    },
    {
      q: "Why does LS Diet focus on starch and sugar?",
      a: "Starch and sugar both affect glucose and insulin levels. LS Diet attempts to reduce excessive insulin exposure by lowering starch and sugar intake sustainably.",
    },
    {
      q: "Is LS Diet low carb?",
      a: "Not exactly. LS Diet focuses more specifically on controlling starch and sugar while improving long-term consistency and reducing behavioural friction.",
    },
    {
      q: "Why is maintaining weight loss harder than losing weight?",
      a: "Short-term dieting can temporarily change behaviour. Long-term maintenance requires permanent behavioural adaptation within real-life environments.",
    },
    {
      q: "What is the Weight Permanence Training?",
      a: "The Weight Permanence Training is an LS Diet framework focused on awareness, practice, and permanence to help reduce repeated weight regain.",
    },
  ],
};

// Body uses the same prose-content envelope as Contentful-rendered posts.
function Body() {
  return (
    <>
      <p className="text-xl md:text-2xl font-semibold text-zinc-900 leading-snug mb-6">
        Most people do not fail to lose weight. They fail to maintain it.
      </p>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        Weight regain is the reason many people feel trapped in an endless cycle of dieting,
        restarting, and frustration. People lose 20, 50, even 100 pounds — then slowly regain
        weight after motivation fades, routines collapse, stress returns, or old eating patterns
        reappear. The real long-term problem is usually not losing weight. It is stopping
        repeated weight regain.
      </p>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        LS Diet was built specifically as a{" "}
        <a href="/what-is-ls-diet" className="text-accent hover:underline">
          weight regain prevention system
        </a>
        . Losing 5–7 pounds per month is only one part of the equation. The larger goal is
        helping people{" "}
        <a href="/blog/why-do-i-keep-restarting-weight-loss" className="text-accent hover:underline">
          stop restarting weight loss
        </a>{" "}
        by building{" "}
        <a href="/weight-permanence-triangle" className="text-accent hover:underline">
          behavioural permanence
        </a>{" "}
        that can survive real life long after motivation fades.
      </p>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        Most weight loss programs focus heavily on temporary intensity: calorie deficits,
        aggressive restriction, detoxes, discipline challenges, excessive cardio, meal plans,
        fasting schedules, and rapid short-term results. LS Diet focuses differently. The system
        combines psychology training and behavioural training to reduce the likelihood of
        repeated regain over time.
      </p>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        The psychology training — grounded in the{" "}
        <a href="/awareness-stages" className="text-accent hover:underline">
          Awareness Stages
        </a>{" "}
        — focuses on helping people identify the connection between eating behaviours and
        intrinsic stimulators such as stress, emotions, boredom, reward-seeking, and exhaustion,
        while also recognizing extrinsic stimulators such as environmental triggers, convenience
        eating, social pressure, food exposure, and routine-based habits. The goal is to explore
        causality instead of relying purely on willpower while repeatedly building both push
        motivation and pull motivation to reinforce long-term consistency.
      </p>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        The behavioural training focuses on repeatable systems that reduce behavioural friction
        in everyday life. This includes food awareness,{" "}
        <a href="/what-is-ls-diet" className="text-accent hover:underline">
          low-starch low-sugar
        </a>{" "}
        meal building, eating behaviour, movement routines, environmental restructuring,
        emotional regulation, consistency training, and sustainable routines designed to help
        people stop regaining weight instead of repeatedly restarting temporary diets.
      </p>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        LS Diet is built around the idea that long-term success depends less on short bursts of
        motivation and more on creating systems — anchored by the{" "}
        <a href="/weight-permanence-triangle" className="text-accent hover:underline">
          Weight Permanence Training
        </a>{" "}
        — that remain stable when life becomes stressful, emotional, busy, repetitive, or
        difficult. Walk through the{" "}
        <a
          href="https://www.skool.com/lsdiet/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          full LS Diet behavioural training
        </a>{" "}
        to see how the system is taught end-to-end. That is the central problem LS Diet was
        designed to solve.
      </p>

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
        Why Temporary Weight Loss Often Leads To Weight Regain
      </h2>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        Many people believe losing weight is the difficult part. In reality, maintaining weight loss
        is often harder. Temporary motivation can produce temporary behaviour. But permanent results
        usually require permanent behavioural change.
      </p>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        This is why many people experience:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>successful short-term dieting</li>
        <li>followed by gradual behavioural collapse</li>
        <li>followed by weight regain</li>
        <li>followed by another restart attempt</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        Over time, restarting becomes psychologically exhausting. Many people begin believing:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>they lack discipline</li>
        <li>they are lazy</li>
        <li>something is wrong with them</li>
        <li>long-term success is impossible</li>
      </ul>
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        But repeated regain is often a systems problem, not a character flaw.
      </blockquote>

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
        Why Most Diets Fail Long Term
      </h2>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        Many diets fail because they rely too heavily on temporary intensity. Examples include:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>extreme restriction</li>
        <li>unsustainable meal rules</li>
        <li>excessive cardio</li>
        <li>fear-based dieting</li>
        <li>constant hunger</li>
        <li>rigid food elimination</li>
        <li>motivational hype</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        These approaches can temporarily reduce weight. But eventually:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>cravings increase</li>
        <li>stress returns</li>
        <li>routines collapse</li>
        <li>emotional eating returns</li>
        <li>motivation fades</li>
        <li>life becomes busy again</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        Then people slowly return to previous behavioural patterns. Repeated behaviour matters more
        than temporary effort.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        “You are what you repeatedly consume.”
      </blockquote>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        Eating unhealthy once does not define someone. Repeating behaviours daily eventually does.
        The same principle applies positively. Long-term consistency matters more than short bursts
        of perfection.
      </p>

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
        The Real Problem Is Behavioural Autopilot
      </h2>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        Many people believe weight gain happens because of occasional bad decisions. Usually it
        happens because of repeated automatic behaviour.
      </p>
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        “There is no autopilot.” Every meal is a decision.
      </blockquote>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        Many people unintentionally develop automatic patterns such as:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>stress eating after work</li>
        <li>overeating during social events</li>
        <li>convenience eating during exhaustion</li>
        <li>emotional reward eating</li>
        <li>binge–restriction cycles</li>
        <li>frequent snacking</li>
        <li>reacting emotionally to setbacks</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        Over time, these repeated behaviours become normal. Eventually the body reflects those
        patterns. Just like smoking once does not make someone a smoker, overeating once does not
        create obesity — repeated exposure changes outcomes.
      </p>

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
        Why Weight Regain Happens So Easily
      </h2>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        The modern environment constantly pushes people toward:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>convenience eating</li>
        <li>processed foods</li>
        <li>high sugar intake</li>
        <li>high starch intake</li>
        <li>emotional coping through food</li>
        <li>sitting for long periods</li>
        <li>sleep disruption</li>
        <li>stress</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        Most people are surrounded by behavioural friction all day. This is one reason weight regain
        happens so frequently after dieting. Many people temporarily force themselves into highly
        restrictive behaviour. But eventually their environment overwhelms temporary willpower. LS
        Diet focuses heavily on reducing behavioural friction instead of relying purely on
        motivation.
      </p>

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
        The Insulin Connection
      </h2>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        LS Diet is built around controlling sugar, starch, and insulin. The reasoning is simple.
        Food breaks down into glucose. The body releases insulin to manage that glucose. When
        insulin stays elevated frequently:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>fat burning becomes more difficult</li>
        <li>hunger may increase</li>
        <li>cravings may increase</li>
        <li>energy instability may increase</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        This becomes especially problematic when people consume:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>refined starches</li>
        <li>sugary drinks</li>
        <li>ultra-processed foods</li>
        <li>high-frequency meals</li>
        <li>constant snacks</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        LS Diet focuses on reducing insulin burden by:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>lowering starch intake</li>
        <li>lowering sugar intake</li>
        <li>reducing excessive eating frequency</li>
        <li>improving food quality</li>
        <li>improving consistency</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        The goal is not perfection. The goal is sustainable control.
      </p>

      <Figure
        src={obviousSugarImg}
        alt="The obvious sugar — soda, candy, cakes, and hidden sugar in juice, smoothies, yogurt, and sauces"
        caption="Sugar triggers a fast glucose spike — and it hides in foods marketed as healthy."
      />

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
        Starch Is Often The Hidden Problem
      </h2>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        Many people focus only on obvious sugar. But starch is frequently consumed multiple times
        every day:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>bread</li>
        <li>rice</li>
        <li>noodles</li>
        <li>cereal</li>
        <li>crackers</li>
        <li>chips</li>
        <li>pastries</li>
        <li>oats</li>
        <li>processed grains</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        Starch eventually breaks down into glucose. This means many people maintain elevated insulin
        exposure constantly throughout the day without realizing it. LS Diet emphasizes awareness,
        consistency, repeatable food decisions, and long-term sustainability — not temporary
        elimination phases.
      </p>

      <Figure
        src={starchHiddenImg}
        alt="Starch is the hidden problem — rice, bread, noodles, cereals, potatoes, corn, and oats produce the same insulin response as sugar"
        caption="Starch produces the same insulin response as sugar — and it shows up at almost every meal."
      />

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
        Why Consistency Matters More Than Intensity
      </h2>
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        “The dose makes the poison.”
      </blockquote>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        One unhealthy meal usually does not create long-term damage. Repeated behaviour does. This
        applies to:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>eating frequency</li>
        <li>portion size</li>
        <li>sugar intake</li>
        <li>starch intake</li>
        <li>emotional eating</li>
        <li>convenience eating</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        Many people fail because they think:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>one healthy day fixes everything</li>
        <li>one workout justifies overeating</li>
        <li>one restrictive phase reverses months of habits</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        This creates reactive dieting behaviour. LS Diet instead emphasizes proactive behaviour:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>making better decisions before overeating happens</li>
        <li>reducing food friction early</li>
        <li>improving consistency gradually</li>
        <li>building repeatable systems</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        The objective is sustainability.
      </p>

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
        There Is No Perfect Diet
      </h2>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        Many people search endlessly for the perfect meal plan, the perfect macro ratio, the
        perfect calorie target, the perfect fasting schedule. But long-term success usually depends
        more on:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>sustainability</li>
        <li>repeatability</li>
        <li>behavioural consistency</li>
        <li>environmental control</li>
        <li>emotional resilience</li>
      </ul>
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        “You need to be selective to be effective.”
      </blockquote>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        The best diet is usually the one:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>you can repeat</li>
        <li>you can sustain</li>
        <li>that reduces behavioural chaos</li>
        <li>that reduces regain risk</li>
        <li>that fits real life</li>
      </ul>

      <Figure
        src={dietsComparisonImg}
        alt="How popular diets handle sugar and starch compared to LS Diet (low-starch, low-sugar)"
        caption="Most diet approaches collapse on long-term sustainability. LS is designed for consistency."
      />

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
        Why LS Diet Focuses On Permanence
      </h2>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        LS Diet was built after repeated personal weight regain experiences. Losing weight
        temporarily was possible. Maintaining it consistently was much harder. This eventually led
        to the development of:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>
          the{" "}
          <a href="/weight-permanence-triangle" className="text-accent hover:underline">
            Weight Permanence Training™
          </a>
        </li>
        <li>
          <a href="/awareness-stages" className="text-accent hover:underline">
            Awareness Stages
          </a>
        </li>
        <li>Action Practice systems</li>
        <li>behavioural permanence concepts</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        The central idea is this: long-term weight control requires psychological prioritization —
        not just temporary motivation. Because motivation fluctuates. Life fluctuates. Stress
        fluctuates. But systems can remain.
      </p>

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
        The Goal Is Not Temporary Weight Loss
      </h2>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        Many people approach weight loss like a short project. Then eventually return to:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>old environments</li>
        <li>old coping systems</li>
        <li>old eating patterns</li>
        <li>old behaviours</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        LS Diet approaches weight loss differently. The goal is:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
        <li>reducing repeated regain</li>
        <li>improving long-term consistency</li>
        <li>reducing behavioural friction</li>
        <li>improving food awareness</li>
        <li>building sustainable routines</li>
        <li>creating permanence</li>
      </ul>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-6">
        This is why LS Diet focuses on low-starch, low-sugar eating, consistency, awareness,
        sustainable movement, repeatable systems, and behavioural psychology — not extreme dieting
        cycles.
      </p>

      <Figure
        src={reverseInsulinImg}
        alt="Three steps to reverse insulin resistance: eat less often, eat smaller portions, choose low-sugar low-starch whole foods"
        caption="The practical pattern: eat less often, smaller portions, and shift toward low-starch, low-sugar foods."
      />

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
        Related Reading
      </h2>
      <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">
        Companion articles that explore specific patterns inside the weight regain cycle:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-2 mb-8 text-base md:text-lg leading-relaxed">
        <li>
          <a href="/blog/why-do-i-keep-losing-and-regaining-the-same-weight" className="text-accent hover:underline">
            Why do I keep losing and regaining the same weight?
          </a>
        </li>
        <li>
          <a href="/blog/why-do-i-keep-restarting-weight-loss" className="text-accent hover:underline">
            Why do I keep restarting weight loss?
          </a>
        </li>
        <li>
          <a href="/blog/why-do-i-restart-weight-loss-every-monday" className="text-accent hover:underline">
            Why do I restart weight loss every Monday?
          </a>
        </li>
        <li>
          <a href="/blog/why-do-i-lose-motivation-after-a-few-weeks" className="text-accent hover:underline">
            Why do I lose motivation after a few weeks?
          </a>
        </li>
        <li>
          <a href="/blog/why-do-healthy-habits-collapse-during-stress" className="text-accent hover:underline">
            Why do healthy habits collapse during stress?
          </a>
        </li>
        <li>
          <a href="/blog/why-do-people-emotionally-eat-after-work" className="text-accent hover:underline">
            Why do people emotionally eat after work?
          </a>
        </li>
      </ul>

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-5 text-zinc-900">
        Frequently Asked Questions
      </h2>
      {meta.faqs?.map((f) => (
        <div key={f.q} className="mb-6">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-zinc-900">{f.q}</h3>
          <p className="text-base md:text-lg text-zinc-800 leading-relaxed">{f.a}</p>
        </div>
      ))}
    </>
  );
}

const foundation: Foundation = { meta, Body };
export default foundation;
