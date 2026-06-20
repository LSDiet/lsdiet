// Foundation pillar — code-managed (NOT Contentful).
// canonicalTopic: awareness-stages | subTopic: pattern-awareness
// Sub-pillar 3.3 of the Weight Permanence Training™.
import featuredImage from "@/assets/foundations/pattern-awareness-hero.png";
import type { Foundation } from "./types";

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base md:text-lg text-zinc-800 leading-relaxed mb-4">{children}</p>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xl md:text-2xl font-semibold text-zinc-900 leading-snug mb-6">{children}</p>
);

const UL = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="list-disc list-outside pl-6 space-y-1 mb-6 text-zinc-800 text-base md:text-lg leading-relaxed">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-8 md:mt-12 mb-4 text-zinc-900">
    {children}
  </h2>
);

const meta: Foundation["meta"] = {
  slug: "pattern-awareness",
  title: "Pattern Awareness: The Behavioural Patterns Behind Weight Regain",
  listTitle: "Pattern Awareness",
  order: 3.3,
  excerpt:
    "Pattern Awareness explores the who, what, when, where, why, and how behind repeated eating behaviour.",
  metaDescription:
    "Pattern Awareness is the third stage of the Weight Permanence Training™. Learn how routines, environments, cravings, and repeated eating behaviours contribute to long term weight regain.",
  publishDate: "2026-05-21T16:00:00.000Z",
  updatedAt: "2026-05-21T16:00:00.000Z",
  canonicalTopic: "awareness-stages",
  subTopic: "pattern-awareness",
  topics: [
    "pattern-awareness",
    "behavioural-permanence",
    "awareness-stages",
    "emotional-eating",
    "stop-weight-regain",
  ],
  contentType: "pillar",
  parentUrl: "https://lsdiet.com/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight",
  relatedTopics: ["weight-permanence-triangle", "stop-weight-regain", "awareness-stages"],
  featuredImage: {
    src: featuredImage,
    alt: "Pattern Awareness — Stage 3 of the 5 Awareness Stages in the Weight Permanence Training™",
  },
  faqs: [
    {
      q: "What is Pattern Awareness?",
      a: "Pattern Awareness is the third stage of the Weight Permanence Training™. It focuses on identifying repeated behavioural and environmental patterns influencing eating behaviour.",
    },
    {
      q: "Why do eating patterns repeat automatically?",
      a: "Repeated behaviour becomes neurologically reinforced over time. Many eating decisions eventually become automatic routines connected to stress, emotion, environment, and habit.",
    },
    {
      q: "How does environment affect weight regain?",
      a: "Environments influence cravings, convenience, stress levels, food availability, and routine behaviour. Many people regain weight because the environments reinforcing old habits never changed.",
    },
    {
      q: "Is emotional eating a behavioural pattern?",
      a: "Yes. Emotional eating often becomes conditioned behaviour where food is repeatedly used for stress relief, comfort, distraction, or emotional escape.",
    },
    {
      q: "How does LS Diet use Pattern Awareness?",
      a: "LS Diet uses awareness training to help identify emotional triggers, eating routines, environmental influences, and repeated behavioural loops so sustainable consistency becomes easier long term.",
    },
  ],
};

function Body() {
  return (
    <>
      <Lead>You keep doing the same things in the same situations. You just can't see them yet.</Lead>
      <P>
        Behaviour that repeats consistently is not random. It has a structure — a specific
        set of conditions under which it reliably shows up. Pattern Awareness maps that
        structure so you can finally see what's actually driving the behaviour, instead of
        blaming willpower for something that was never a willpower problem.
      </P>
      <P>
        Pattern Awareness is the third stage of the{" "}
        <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
          Weight Permanence Training™
        </a>
        . It uses six diagnostic lenses — who, what, when, where, why, and how — to
        map the specific conditions under which weight-regaining behaviour occurs in
        your life. Not in general. In yours.
      </P>

      <H2>What Is Pattern Awareness?</H2>
      <P>
        Pattern Awareness is the diagnostic stage of WPT. Its job is to expose the
        automatic routines and environmental triggers that drive eating behaviour before
        you have a chance to make a conscious choice.
      </P>
      <P>
        The six lenses each reveal a different dimension of the pattern:
      </P>
      <UL
        items={[
          "Who — which people or social contexts shift your eating behaviour?",
          "What — which specific foods, situations, or emotions consistently trigger overeating?",
          "When — what times of day, week, or season does the behaviour repeat?",
          "Where — which locations or environments make the pattern harder to resist?",
          "Why — what emotional state or need is the eating actually serving?",
          "How — how does the pattern unfold from trigger to response?",
        ]}
      />
      <P>
        Most people have never answered all six of these for their own behaviour. Which
        means they've been trying to solve a pattern they only understand in fragments.
      </P>

      <H2>Why Repeated Behaviour Becomes Automatic</H2>
      <P>
        The brain is efficient. Behaviour that gets repeated enough stops requiring
        conscious decision-making and becomes automatic. You don't decide to reach for
        something at 3pm — you just do it. You don't decide to eat more when you're
        stressed — it just happens before you've finished the thought.
      </P>
      <P>
        Automatic behaviour is invisible behaviour. You can't report it accurately
        because you're not actually conscious of it in the moment. This is why
        people are often genuinely surprised by what pattern mapping reveals — the
        behaviour has been there all along, just below the level of observation.
      </P>
      <P>
        You can't interrupt a pattern you haven't seen clearly. Pattern Awareness
        makes the invisible visible.
      </P>

      <H2>Why Environment Shapes Eating Behaviour</H2>
      <P>
        Environment is a stronger driver of eating behaviour than most people realize.
        The food in your kitchen, the route you drive home, the people you eat lunch
        with, the office that provides free snacks, the couch you sit on at 10pm —
        these aren't neutral settings. They're cues. And cues trigger patterns.
      </P>
      <P>
        This is why willpower fails so consistently. Willpower is a finite resource
        that depletes across the day. Environment keeps working regardless of how tired
        you are. When a pattern is deeply established, the environment can trigger the
        behaviour faster than a conscious decision can intervene.
      </P>
      <P>
        Pattern Awareness identifies your specific environmental triggers so you can
        redesign the environment instead of fighting it with willpower every single day.
      </P>

      <H2>Why Emotional Eating Often Becomes a Pattern</H2>
      <P>
        Food reliably produces a short-term feeling of relief. Not much relief, and
        not for long — but reliably. When you're stressed, overwhelmed, bored, or
        exhausted, the brain files that away: food equals relief. Over time, the
        connection becomes automatic. The emotional state triggers the eating before
        any conscious decision is made.
      </P>
      <P>
        This is not a character flaw. It's a learned pattern. And like any pattern,
        once you can see the structure of it — the specific emotion, the specific
        trigger, the specific sequence — you can begin interrupting it deliberately
        instead of trying to overpower it with willpower.
      </P>
      <P>
        For more on the emotional mechanics of this, read{" "}
        <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
          Why People Regain Weight After Dieting
        </a>
        .
      </P>

      <H2>Why Diets Often Fail Repeatedly</H2>
      <P>
        Most diets address the food without ever touching the pattern. They tell you
        what to eat, when to eat it, and how much. But they don't map why you ate
        differently before — the who, what, when, where, why, and how of the behaviour
        that caused the weight gain in the first place.
      </P>
      <P>
        So the diet runs in parallel with the pattern for a while. Then life gets
        stressful, a familiar trigger fires, the automatic response takes over — and
        the diet collapses. Not because of weak willpower, but because the underlying
        pattern was never identified or addressed.
      </P>

      <H2>Why Pattern Interrupts Matter</H2>
      <P>
        Once you've mapped a pattern clearly, you can insert a deliberate interrupt
        at the right point in the sequence. Not at the end, when the behaviour has
        already happened. At the trigger point — before the automatic response fires.
      </P>
      <P>
        This is the work of{" "}
        <a href="/blog/action-practice" className="text-accent hover:underline">
          Action Practice
        </a>
        , which begins after all five awareness stages are complete. But the interrupt
        can only be placed accurately if the pattern has been mapped first.
      </P>
      <P>
        From Pattern Awareness, the next stage is{" "}
        <a href="/blog/consequence-awareness" className="text-accent hover:underline">
          Consequence Awareness
        </a>{" "}
        — making the long-term cost of these patterns feel emotionally real, not
        intellectually abstract.
      </P>

      <H2>How LS Diet Uses Pattern Awareness</H2>
      <P>
        LS Diet uses Pattern Awareness to make the low-starch, low-sugar eating approach
        actually stick. Knowing what to eat is not the problem. The problem is the
        specific conditions under which you stop eating that way — and those conditions
        are different for every person.
      </P>
      <P>
        By mapping your patterns first, the behavioural interventions that follow are
        targeted instead of generic. You're not trying to overhaul everything. You're
        identifying the handful of specific patterns that account for most of the regain,
        and addressing those directly.
      </P>
      <P>
        Built by{" "}
        <a href="/oscar-poon" className="text-accent hover:underline">
          Oscar Poon
        </a>
        , who lost 80+ lbs three times before designing the system. Explore the{" "}
        <a href="/topics/weight-permanence-triangle" className="text-accent hover:underline">
          Weight Permanence Training™ topic hub
        </a>{" "}
        for related foundations.
      </P>
      <P>
        Stop regaining weight:{" "}
        <a
          href="https://www.skool.com/lsdiet/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          join the LS Diet community
        </a>
        .
      </P>

      <H2>Frequently Asked Questions</H2>
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
