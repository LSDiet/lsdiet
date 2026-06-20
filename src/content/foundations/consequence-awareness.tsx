// Foundation pillar — code-managed (NOT Contentful).
// canonicalTopic: awareness-stages | subTopic: consequence-awareness
// Sub-pillar 3.4 of the Weight Permanence Training™.
import featuredImage from "@/assets/foundations/consequence-awareness-hero.png";
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
  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
    {children}
  </h2>
);

const meta: Foundation["meta"] = {
  slug: "consequence-awareness",
  title: "Consequence Awareness: When the Cost of Staying the Same Becomes Clear",
  listTitle: "Consequence Awareness",
  order: 3.4,
  excerpt:
    "PUSH motivation often develops when the consequences of inaction become impossible to ignore.",
  metaDescription:
    "Consequence Awareness is the fourth stage of the Weight Permanence Training™. Learn how PUSH motivation develops when the consequences of repeated inaction become emotionally real.",
  publishDate: "2026-05-22T16:00:00.000Z",
  updatedAt: "2026-05-22T16:00:00.000Z",
  canonicalTopic: "awareness-stages",
  subTopic: "consequence-awareness",
  topics: [
    "consequence-awareness",
    "push-motivation",
    "awareness-stages",
    "behavioural-permanence",
    "stop-weight-regain",
  ],
  contentType: "pillar",
  parentUrl: "https://lsdiet.com/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight",
  relatedTopics: ["weight-permanence-triangle", "stop-weight-regain", "awareness-stages"],
  featuredImage: {
    src: featuredImage,
    alt: "Consequence Awareness — Stage 4 of the 5 Awareness Stages in the Weight Permanence Training™",
  },
  faqs: [
    {
      q: "What is Consequence Awareness?",
      a: "Consequence Awareness is the fourth stage of the Weight Permanence Training™. It focuses on understanding the future impact of repeated unhealthy behaviour and inaction.",
    },
    {
      q: "What is PUSH motivation?",
      a: "PUSH motivation develops when people become emotionally motivated to move away from pain, limitation, discomfort, or future negative consequences.",
    },
    {
      q: "Is Consequence Awareness about fear?",
      a: "No. Consequence Awareness focuses on honest future reflection, not fear mongering or self punishment.",
    },
    {
      q: "Why do people ignore long term consequences?",
      a: "The brain often prioritizes immediate comfort, stress relief, and convenience over distant future outcomes.",
    },
    {
      q: "How does LS Diet use Consequence Awareness?",
      a: "LS Diet uses awareness training to help people understand how repeated routines, environments, and behavioural inconsistency may affect future quality of life and long term weight regain.",
    },
  ],
};

function Body() {
  return (
    <>
      <Lead>Knowing you should change has never been enough. This stage makes the cost feel real.</Lead>
      <P>
        You already know weight regain is bad for you. You've known that for years.
        And yet the behaviour continues. That's not a knowledge problem — it's an
        urgency problem. The consequences of staying the same don't feel immediate
        enough to override the comfort of the current moment.
      </P>
      <P>
        Consequence Awareness is the fourth stage of the{" "}
        <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
          Weight Permanence Training™
        </a>
        . Its job is to close the psychological distance between where you are today
        and where your current direction is actually leading — and to make that future
        feel as real as tonight's craving.
      </P>

      <H2>What Is Consequence Awareness?</H2>
      <P>
        Consequence Awareness asks a question most people avoid: if nothing changes,
        what does five years from now actually look like?
      </P>
      <P>
        Not the optimistic version where you somehow get serious later. The realistic
        version — based on your current direction, your current patterns, your current
        trajectory.
      </P>
      <UL
        items={[
          "What happens to your mobility, your energy, your health?",
          "What activities do you quietly stop doing?",
          "What medical conversations become inevitable?",
          "What version of yourself do the people around you have to deal with?",
          "What do your children or grandchildren watch you become?",
        ]}
      />
      <P>
        The goal is not fear. The goal is clarity. Because behaviour that feels
        optional in the short term often has consequences that feel inevitable in
        the long term — and most people don't make that connection until it's
        already arrived.
      </P>

      <H2>Why PUSH Motivation Matters</H2>
      <P>
        PUSH motivation is the emotional force that moves you away from a future
        you're no longer willing to accept. It's not the same as anxiety or fear.
        It's a clear-eyed decision: this is where I'm heading, and I'm done
        pretending that's acceptable.
      </P>
      <P>
        People with strong PUSH motivation don't need to feel inspired to act.
        They act because the alternative — continuing the current pattern — feels
        worse than the difficulty of changing. That shift in emotional weight is
        what makes behaviour change durable instead of temporary.
      </P>
      <P>
        Without PUSH motivation, every behavioural change is a negotiation. With
        it, the negotiation largely disappears — because the outcome of not changing
        is no longer emotionally acceptable.
      </P>

      <H2>Why People Often Ignore Consequences</H2>
      <P>
        The brain prioritizes immediate comfort over future outcomes. Always. This
        isn't a weakness — it's how human cognition is built. The food in front
        of you is concrete and immediate. The health consequences ten years from
        now are abstract and distant.
      </P>
      <P>
        So people adapt. Clothing sizes change quietly. Activities get dropped
        without announcement. Energy declines so gradually it feels like just getting
        older. Each individual change is small enough to rationalize, and the full
        picture never assembles itself in one uncomfortable moment.
      </P>
      <P>
        Consequence Awareness interrupts that gradual normalization. It assembles
        the full picture deliberately — not to create panic, but to prevent the
        slow drift from continuing unexamined.
      </P>

      <H2>Why Environmental Influence Matters</H2>
      <P>
        The people around you affect your behaviour more than most people acknowledge.
        If your household, your social group, or your workplace normalizes the patterns
        that drive weight regain, those patterns become almost invisible to you. They
        feel like just how things are.
      </P>
      <P>
        Consequence Awareness includes examining not just where your behaviour leads,
        but what environment is reinforcing it — and what the cost of that environment
        is over time. For the underlying patterns that built this environment, read{" "}
        <a href="/blog/pattern-awareness" className="text-accent hover:underline">
          Pattern Awareness
        </a>
        .
      </P>

      <H2>The Definition of Insanity</H2>
      <P>
        The phrase is overused but structurally accurate: doing the same thing and
        expecting a different result. Most weight regain cycles follow exactly this
        structure. The diet ends. The old patterns return. The weight comes back.
        Then the next diet starts.
      </P>
      <P>
        Consequence Awareness asks you to honestly examine what that cycle has already
        cost you — and what it will continue to cost you if the pattern doesn't change.
        Not as motivation by guilt. As information. Because the first step toward
        breaking a cycle is refusing to pretend it isn't one.
      </P>

      <H2>Why Consequences Become Harder to Ignore Over Time</H2>
      <P>
        The consequences of weight regain compound. The fifth restart is harder than
        the first — physically, emotionally, and psychologically. The body becomes
        more resistant. The shame accumulates. The belief that this time will be
        different gets harder to sustain.
      </P>
      <P>
        This is why Consequence Awareness belongs in the middle of the Weight
        Permanence Training, not at the end. It creates urgency before the pattern
        has compounded further — not after the next health scare has already happened.
      </P>
      <P>
        From here, the fifth stage —{" "}
        <a href="/blog/identity-awareness" className="text-accent hover:underline">
          Identity Awareness
        </a>{" "}
        — builds the PULL motivation that completes the emotional foundation for
        lasting change.
      </P>

      <H2>How LS Diet Uses Consequence Awareness</H2>
      <P>
        LS Diet doesn't use consequences to shame people into changing. It uses
        them to create the emotional seriousness that behaviour change requires.
        Temporary motivation produces temporary results. Consequence Awareness
        produces the kind of internal shift that doesn't require motivation to
        maintain — because the cost of reverting has become personally unacceptable.
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
