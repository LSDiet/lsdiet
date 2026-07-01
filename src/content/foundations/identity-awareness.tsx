// Foundation pillar — code-managed (NOT Contentful).
// canonicalTopic: awareness-stages | subTopic: identity-awareness
// Sub-pillar 3.5 of the Weight Permanence Training™.
import featuredImage from "@/assets/foundations/identity-awareness-hero.png";
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
  slug: "identity-awareness",
  title: "Identity Awareness: How to Change Your Relationship With Food",
  listTitle: "Identity Awareness",
  order: 3.5,
  excerpt:
    "PULL motivation develops when future identity becomes emotionally important enough to pursue consistently.",
  metaDescription:
    "Identity Awareness is the fifth stage of the Weight Permanence Training™. Learn how PULL motivation, future identity, and meaningful personal direction influence long term behavioural consistency.",
  publishDate: "2026-05-23T16:00:00.000Z",
  updatedAt: "2026-05-23T16:00:00.000Z",
  canonicalTopic: "awareness-stages",
  subTopic: "identity-awareness",
  topics: [
    "identity-awareness",
    "pull-motivation",
    "awareness-stages",
    "behavioural-permanence",
    "stop-weight-regain",
  ],
  contentType: "pillar",
  parentUrl: "https://lsdiet.com/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight",
  relatedTopics: ["weight-permanence-triangle", "stop-weight-regain", "awareness-stages"],
  featuredImage: {
    src: featuredImage,
    alt: "Identity Awareness — Stage 5 of the 5 Awareness Stages in the Weight Permanence Training™",
  },
  faqs: [
    {
      q: "What is Identity Awareness?",
      a: "Identity Awareness is the fifth stage of the Weight Permanence Training™. It focuses on connecting behaviour to future identity, meaning, and long term personal direction.",
    },
    {
      q: "What is PULL motivation?",
      a: "PULL motivation moves people toward future possibility, identity, freedom, capability, and emotionally meaningful goals.",
    },
    {
      q: "Why does identity affect behaviour?",
      a: "Identity influences priorities, routines, standards, and consistency. Behaviour often becomes easier to maintain when it aligns with meaningful self perception.",
    },
    {
      q: "Is Identity Awareness about positive thinking?",
      a: "No. Identity Awareness focuses on meaningful future direction and behavioural alignment, not unrealistic motivational fantasy.",
    },
    {
      q: "How does LS Diet use Identity Awareness?",
      a: "LS Diet uses awareness training and behavioural systems to help people align long term consistency with future identity, capability, freedom, and sustainable lifestyle change.",
    },
  ],
};

function Body() {
  return (
    <>
      <P>Identity Awareness is Stage 5 of Weight Permanence Training™ — it builds PULL motivation by connecting permanent weight loss to the person you want to become, not just the number you want to see on a scale.</P>
      <Lead>You've been trying to change your behaviour. You should be trying to change who you are.</Lead>
      <P>
        Behaviour follows identity. What you do consistently is a reflection of how you see
        yourself. Not the other way around. This is why people who lose weight and then
        regain it are not failing at the diet. They're succeeding at being the version of
        themselves they still believe they are.
      </P>
      <P>
        Identity Awareness is Stage 5 of the{" "}
        <a href="/awareness-stages" className="text-accent hover:underline">
          5 Awareness Stages
        </a>{" "}
        in the{" "}
        <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
          Weight Permanence Training™
        </a>
        . It builds PULL motivation: the forward force that draws you toward a version
        of yourself you genuinely want to become, rather than pushing you away from
        consequences you're trying to avoid.
      </P>
      <P>
        PUSH motivation from{" "}
        <a href="/blog/consequence-awareness" className="text-accent hover:underline">
          Consequence Awareness
        </a>{" "}
        creates urgency. Identity Awareness creates direction.
      </P>

      <H2>What Is Identity Awareness?</H2>
      <P>
        Identity Awareness asks you to articulate who you are becoming. Not who you
        want to be eventually, but who you are actively deciding to become right now.
        That distinction matters. "Someday" is a deferral. "I am becoming" is a decision.
      </P>
      <P>
        The stage examines three things:
      </P>
      <UL
        items={[
          "Who is the version of you that has already solved this problem? What do they do, value, and prioritize?",
          "What gap exists between who you are today and who that person is?",
          "What one or two behaviours, if practised consistently, would begin closing that gap?",
        ]}
      />
      <P>
        Identity Awareness is not about visualization or positive thinking. It is about
        building a specific, concrete picture of the person you're choosing to become —
        and then making decisions from that identity instead of from your current one.
      </P>

      <H2>Why Behaviour Follows Identity</H2>
      <P>
        People don't act consistently with what they know. They act consistently with
        how they see themselves. A person who sees themselves as "someone who tries to
        eat healthy" will eventually eat unhealthily, because the identity has a built-in escape hatch. Trying is not the same as being.
      </P>
      <P>
        A person who has decided "I am someone who prioritizes healthy behaviour" makes
        a different calculation every time a decision comes up. Not because they have
        more willpower, but because the decision is no longer a negotiation. It's an
        expression of who they are.
      </P>
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        Smokers smoke. Healthy people prioritize healthy behaviour. You become what you
        repeatedly decide you are.
      </blockquote>
      <P>
        This is the Identity-Alignment Rule at the core of Weight Permanence Training.
        Behaviour that conflicts with your identity creates internal tension. Behaviour
        that aligns with your identity feels natural, even when it's difficult.
      </P>

      <H2>Why PULL Motivation Lasts Longer Than PUSH Motivation</H2>
      <P>
        PUSH motivation is powerful but temporary. It comes from consequences, fear, or pain. Once the discomfort fades, so does the motivation.
        This is why people restart weight loss after a health scare, stay disciplined
        for a few weeks, then gradually drift back when the fear loses its edge.
      </P>
      <P>
        PULL motivation works differently. It doesn't depend on how bad you feel
        right now. It depends on how clearly you can see the person you're becoming
        and how much you want to be that person. That clarity doesn't fade the same
        way urgency does. It compounds. Every action you take that aligns with your
        intended identity reinforces the identity itself.
      </P>
      <P>
        The goal of Identity Awareness is to build PULL motivation strong enough that
        behaviour change stops requiring daily willpower. You're not fighting your old
        habits. You're expressing your new identity.
      </P>

      <H2>The Moral Licensing Trap</H2>
      <P>
        One of the most common reasons identity-based change fails is moral licensing —
        the unconscious belief that doing something good earlier in the day earns you
        permission to do something self-sabotaging later. "I exercised this morning,
        so I deserve this."
      </P>
      <P>
        Moral licensing is an identity problem. It means the behaviour was performed as
        an action, not as an expression of identity. A healthy person doesn't think
        "I earned this." The action was never a sacrifice to be compensated.
        It was just what they do.
      </P>
      <P>
        WPT actively counters moral licensing through the "I am… so I…" framework.
        When behaviour is anchored to identity rather than effort, the compensation
        logic breaks down.
      </P>

      <H2>Why Identity Change Feels Uncomfortable at First</H2>
      <P>
        Your current identity has been reinforced for years. Every choice you've made
        has strengthened it. Choosing differently feels like a contradiction, which
        the brain interprets as a threat. This is why change that feels right in theory
        still feels wrong in practice at first.
      </P>
      <P>
        That discomfort is not a sign you're doing it wrong. It's a sign that the
        old identity is being challenged. The discomfort decreases as the new behaviour
        becomes the new norm. Not through discipline. Through repetition.
        Repetition builds identity. Identity makes behaviour feel automatic.
      </P>

      <H2>How LS Diet Uses Identity Awareness</H2>
      <P>
        Every stage of the awareness training builds toward this one.{" "}
        <a href="/blog/reality-awareness" className="text-accent hover:underline">Reality Awareness</a>{" "}
        shows you where you are.{" "}
        <a href="/blog/friction-awareness" className="text-accent hover:underline">Friction Awareness</a>{" "}
        names the gap.{" "}
        <a href="/blog/pattern-awareness" className="text-accent hover:underline">Pattern Awareness</a>{" "}
        maps the behaviour driving the gap.{" "}
        <a href="/blog/consequence-awareness" className="text-accent hover:underline">Consequence Awareness</a>{" "}
        makes the cost of staying in the gap feel real. Identity Awareness gives you a direction to move toward.
      </P>
      <P>
        From here, the practical work begins in{" "}
        <a href="/blog/action-practice" className="text-accent hover:underline">
          Action Practice
        </a>{" "}
        : daily behavioural modules designed to make your new identity feel lived-in
        rather than aspirational. But identity has to come first. Action Practice
        without a clear identity is just willpower with extra steps.
      </P>
      <P>
        The system was built by{" "}
        <a href="/oscar-poon" className="text-accent hover:underline">
          Oscar Poon
        </a>
        . Identity Awareness is where the shift finally happened for him after years of losing and regaining the same weight. Explore the full{" "}
        <a href="/weight-permanence-training" className="text-accent hover:underline">
          Weight Permanence Training™
        </a>{" "}
        or{" "}
        <a
          href="https://www.skool.com/lsdiet/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          join the free LS Diet community
        </a>
        .
      </P>

      <div className="my-8 rounded-xl border border-accent/20 bg-accent/5 p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">Training Complete — What's Next</p>
          <p className="text-base font-bold text-zinc-900">See the full Weight Permanence Training™ framework</p>
        </div>
        <a href="/weight-permanence-training" className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:brightness-110 transition-all">
          Explore →
        </a>
      </div>

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
