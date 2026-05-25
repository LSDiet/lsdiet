// Foundation pillar — code-managed (NOT Contentful).
// canonicalTopic: awareness-stages | subTopic: identity-awareness
// Sub-pillar 3.5 of the Weight Permanence Triangle™.
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
  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
    {children}
  </h2>
);

const meta: Foundation["meta"] = {
  slug: "identity-awareness",
  title: "Identity Awareness: Why Future Identity Drives Long Term Weight Loss",
  listTitle: "Identity Awareness",
  order: 3.5,
  excerpt:
    "PULL motivation develops when future identity becomes emotionally important enough to pursue consistently.",
  metaDescription:
    "Identity Awareness is the fifth stage of the Weight Permanence Triangle™. Learn how PULL motivation, future identity, and meaningful personal direction influence long term behavioural consistency.",
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
    alt: "Identity Awareness — Stage 5 of the 5 Awareness Stages in the Weight Permanence Triangle™",
  },
  faqs: [
    {
      q: "What is Identity Awareness?",
      a: "Identity Awareness is the fifth stage of the Weight Permanence Triangle™. It focuses on connecting behaviour to future identity, meaning, and long term personal direction.",
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
      <Lead>Many people try to lose weight because they want to escape discomfort. But long term consistency often requires something more powerful.</Lead>
      <P>
        Identity Awareness is the fifth stage of the{" "}
        <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
          Weight Permanence Triangle™
        </a>{" "}
        (WPT), and it is the stage that most directly addresses{" "}
        <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
          why weight regain happens
        </a>{" "}
        after motivation fades.
      </P>
      <P>This stage focuses on:</P>
      <UL
        items={[
          "future identity",
          "future possibility",
          "personal meaning",
          "emotional direction",
          "long term purpose",
        ]}
      />
      <P>PULL motivation develops when future identity becomes emotionally important enough to pursue consistently.</P>
      <P>
        Unlike PUSH motivation, which moves people away from pain (see{" "}
        <a href="/blog/consequence-awareness" className="text-accent hover:underline">Consequence Awareness</a>),
        PULL motivation moves people toward possibility.
      </P>
      <P>This stage asks:</P>
      <UL
        items={[
          "Who do you want to become?",
          "What kind of future are you moving toward?",
          "What would long term consistency allow you to experience?",
          "What would change emotionally, physically, socially, or professionally?",
        ]}
      />
      <P>Because behaviour often becomes more sustainable when it aligns with identity.</P>

      <H2>What Is Identity Awareness?</H2>
      <P>Identity Awareness focuses on future self connection. This stage examines:</P>
      <UL
        items={[
          "the future you want",
          "the life you want",
          "the capability you want",
          "the identity you want to build",
        ]}
      />
      <P>Many people approach weight loss only as:</P>
      <UL items={["restriction", "punishment", "temporary suffering", "obligation"]} />
      <P>That mindset often creates resistance. Identity Awareness changes the emotional direction of change.</P>
      <P>Instead of only asking:</P>
      <blockquote className="border-l-4 border-accent pl-5 my-6 text-lg md:text-xl italic text-zinc-900">
        “What am I trying to avoid?”
      </blockquote>
      <P>It also asks:</P>
      <blockquote className="border-l-4 border-accent pl-5 my-6 text-lg md:text-xl italic text-zinc-900">
        “What am I trying to become?”
      </blockquote>
      <P>Examples:</P>
      <UL
        items={[
          "a healthier parent",
          "someone physically capable",
          "someone consistent",
          "someone energetic",
          "someone confident",
          "someone who no longer feels controlled by food",
          "someone free to travel, move, and participate fully in life",
        ]}
      />
      <P>Identity Awareness helps make future possibility emotionally meaningful. Because people often sustain difficult behaviour longer when it feels personally important.</P>

      <H2>Why Identity Often Shapes Behaviour</H2>
      <P>Human behaviour is heavily influenced by identity. Examples:</P>
      <UL
        items={[
          "smokers smoke",
          "athletes train",
          "organized people maintain systems",
          "healthy people prioritize healthy behaviour",
        ]}
      />
      <P>Identity influences:</P>
      <UL items={["priorities", "routines", "decisions", "standards", "consistency"]} />
      <P>This matters because many people repeatedly attempt behavioural change without changing identity perception. Examples:</P>
      <UL
        items={[
          "“I’m lazy.”",
          "“I’ve always struggled.”",
          "“I’m not disciplined.”",
          "“I always fail eventually.”",
        ]}
      />
      <P>
        Over time, repeated failure experiences can become psychologically internalized. People begin identifying with
        inconsistency itself. For more on those repeating loops, see{" "}
        <a href="/blog/pattern-awareness" className="text-accent hover:underline">Pattern Awareness</a>.
      </P>
      <P>Identity Awareness helps interrupt that cycle. Because when behaviour aligns with meaningful identity, consistency often feels less forced.</P>

      <H2>Why PULL Motivation Matters</H2>
      <P>Many people initially change because of PUSH motivation. Examples:</P>
      <UL
        items={[
          "fear",
          "discomfort",
          "declining health",
          "frustration",
          "physical limitation",
        ]}
      />
      <P>But fear alone often fades over time. PULL motivation helps sustain long term direction. Examples:</P>
      <UL
        items={[
          "wanting confidence",
          "wanting freedom",
          "wanting capability",
          "wanting self respect",
          "wanting energy",
          "wanting a different future",
          "wanting alignment between behaviour and identity",
        ]}
      />
      <P>PULL motivation changes the emotional tone of behaviour.</P>
      <P>Instead of:</P>
      <blockquote className="border-l-4 border-accent pl-5 my-6 text-lg md:text-xl italic text-zinc-900">
        “I have to lose weight.”
      </blockquote>
      <P>The mindset gradually becomes:</P>
      <blockquote className="border-l-4 border-accent pl-5 my-6 text-lg md:text-xl italic text-zinc-900">
        “This is the kind of person I want to become.”
      </blockquote>
      <P>That shift matters psychologically. Because identity based behaviour often feels more purposeful and sustainable than behaviour driven only by fear or restriction.</P>

      <H2>Why Future Possibility Matters</H2>
      <P>Many people become trapped focusing only on current problems. Examples:</P>
      <UL
        items={[
          "current body weight",
          "current frustration",
          "current limitations",
          "current setbacks",
          "current failures",
        ]}
      />
      <P>Identity Awareness shifts focus toward future possibility. Examples:</P>
      <UL
        items={[
          "future mobility",
          "future freedom",
          "future relationships",
          "future confidence",
          "future experiences",
          "future opportunities",
          "future self respect",
        ]}
      />
      <P>This matters because people move more consistently toward emotionally meaningful futures.</P>
      <P>Without future direction, behaviour often feels:</P>
      <UL items={["forced", "repetitive", "restrictive", "exhausting"]} />
      <P>Identity Awareness helps behaviour feel connected to something bigger than dieting itself. That emotional connection strengthens long term consistency.</P>

      <H2>Why Identity Awareness Is Not Fantasy</H2>
      <P>Identity Awareness is not pretending. It is not:</P>
      <UL
        items={[
          "unrealistic optimism",
          "motivational fantasy",
          "perfectionism",
          "fake confidence",
        ]}
      />
      <P>The purpose is not to imagine becoming flawless. The purpose is to create meaningful direction.</P>
      <P>Many people never clearly define:</P>
      <UL
        items={[
          "who they want to become",
          "why change matters personally",
          "what long term consistency would emotionally improve",
        ]}
      />
      <P>Without that clarity, behaviour often loses emotional importance during stress. Identity Awareness helps create psychological anchoring. Because behaviour becomes easier to repeat when it aligns with meaningful identity.</P>

      <H2>Why Weight Loss Often Becomes More Sustainable When Connected to Identity</H2>
      <P>Many people approach weight loss temporarily. Examples:</P>
      <UL
        items={[
          "“I’ll do this for 3 months.”",
          "“I just need motivation.”",
          "“I’ll go back to normal afterward.”",
        ]}
      />
      <P>But if “normal” created repeated regain previously, returning to old identity patterns often recreates old outcomes.</P>
      <P>Identity Awareness shifts the focus from temporary dieting toward long term behavioural identity. Examples:</P>
      <UL
        items={[
          "becoming someone who prioritizes consistency",
          "becoming someone who plans intentionally",
          "becoming someone who handles stress differently",
          "becoming someone who values long term health",
          "becoming someone who no longer feels controlled by cravings",
        ]}
      />
      <P>This is one reason behavioural permanence matters. Because sustainable weight loss usually requires sustainable identity alignment.</P>

      <H2>How LS Diet Uses Identity Awareness</H2>
      <P>LS Diet focuses heavily on behavioural permanence. Many people already understand:</P>
      <UL items={["nutrition basics", "calorie concepts", "exercise recommendations"]} />
      <P>But consistency still collapses repeatedly. Why? Because behaviour is heavily influenced by:</P>
      <UL
        items={[
          "emotional meaning",
          "identity",
          "routines",
          "environments",
          "psychological prioritization",
        ]}
      />
      <P>Identity Awareness helps people emotionally connect behaviour to:</P>
      <UL
        items={[
          "future capability",
          "future freedom",
          "future confidence",
          "future direction",
          "future self respect",
        ]}
      />
      <P>
        <a href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting" className="text-accent hover:underline">
          LS Diet
        </a>{" "}
        then helps simplify long term consistency through:
      </P>
      <UL
        items={[
          "low-starch, low-sugar eating",
          "improved fullness",
          "reduced cravings",
          "awareness training",
          "repeatable Action Practice systems",
          "sustainable routines",
          "slow jogging as sustainable movement",
        ]}
      />
      <P>The goal is not temporary dieting intensity. The goal is building a sustainable lifestyle aligned with the future you genuinely want.</P>
      <P>
        Built by{" "}
        <a href="/oscar-poon" className="text-accent hover:underline">
          Oscar Poon
        </a>
        , who lost 80+ lbs three times before designing the system.
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
