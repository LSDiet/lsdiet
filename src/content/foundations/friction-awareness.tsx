// Foundation pillar — code-managed (NOT Contentful).
// canonicalTopic: awareness-stages | subTopic: friction-awareness
// Sub-pillar 3.2 of the Weight Permanence Training™.
import featuredImage from "@/assets/foundations/friction-awareness-hero.png";
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
  slug: "friction-awareness",
  title: "Friction Awareness: Why Change Starts When Tension Becomes Clear",
  listTitle: "Friction Awareness",
  order: 3.2,
  excerpt:
    "Friction Awareness examines the tension between your current behaviour and the future you want.",
  metaDescription:
    "Friction Awareness is the second stage of the Weight Permanence Training™. Learn how tension, honesty, procrastination, and behavioural prioritization affect long term weight loss consistency.",
  publishDate: "2026-05-20T16:00:00.000Z",
  updatedAt: "2026-05-20T16:00:00.000Z",
  canonicalTopic: "awareness-stages",
  subTopic: "friction-awareness",
  topics: [
    "friction-awareness",
    "behavioural-permanence",
    "awareness-stages",
    "dieting-psychology",
    "stop-weight-regain",
  ],
  contentType: "pillar",
  parentUrl: "https://lsdiet.com/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight",
  relatedTopics: ["weight-permanence-triangle", "stop-weight-regain"],
  featuredImage: {
    src: featuredImage,
    alt: "Friction Awareness — Stage 2 of the 5 Awareness Stages in the Weight Permanence Training™",
  },
  faqs: [
    {
      q: "What is Friction Awareness?",
      a: "Friction Awareness is the second stage of the Weight Permanence Training™. It focuses on recognizing the tension between your current behaviour and the future you want.",
    },
    {
      q: "Is friction always negative?",
      a: "No. Friction can come from pain, frustration, limitation, or discomfort, but it can also come from ambition, possibility, growth, and future goals.",
    },
    {
      q: "Why do people procrastinate weight loss?",
      a: "Many people psychologically prioritize stress relief, emotional escape, convenience, or routine above long term behavioural consistency.",
    },
    {
      q: "Is Friction Awareness about shame?",
      a: "No. Friction Awareness focuses on honesty and self assessment, not guilt or punishment.",
    },
    {
      q: "How does LS Diet use Friction Awareness?",
      a: "LS Diet uses awareness training to help people recognize emotional eating, behavioural inconsistency, avoidance patterns, and psychological prioritization so sustainable routines become easier to maintain long term.",
    },
  ],
};

function Body() {
  return (
    <>
      <Lead>Many people believe weight loss starts with motivation. But sustainable change often starts with friction.</Lead>
      <P>
        Friction Awareness is the second stage of the{" "}
        <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
          Weight Permanence Training™
        </a>{" "}
        (WPT).
      </P>
      <P>This stage examines the tension between:</P>
      <UL items={["your current behaviour", "your current condition", "the future you want"]} />
      <P>Without friction, people rarely change consistently.</P>
      <P>The purpose of Friction Awareness is not shame. It is honesty.</P>
      <P>Not to attack yourself. Not to judge yourself. Not to feel hopeless.</P>
      <P>The goal is to recognize the gap between:</P>
      <UL items={["where you are today", "and where you genuinely want to go"]} />
      <P>Because until that gap becomes psychologically meaningful, change usually remains optional.</P>

      <H2>What Is Friction Awareness?</H2>
      <P>Friction Awareness focuses on identifying internal tension.</P>
      <P>Sometimes that tension is painful. Examples include:</P>
      <UL
        items={[
          "feeling physically limited",
          "struggling with mobility",
          "frustration from repeated regain",
          "emotional exhaustion from dieting",
          "low confidence",
          "discomfort in social situations",
          "worrying about long term health",
        ]}
      />
      <P>But friction is not always negative. Sometimes friction comes from possibility. Examples include:</P>
      <UL
        items={[
          "wanting confidence",
          "wanting capability",
          "wanting energy",
          "wanting freedom while travelling",
          "wanting to become athletic again",
          "wanting to climb a mountain",
          "wanting a different future",
        ]}
      />
      <P>Both forms of tension matter.</P>
      <P>Some people change because they want to escape pain. Others change because they want to pursue possibility. Most people experience both.</P>
      <P>Friction Awareness simply asks:</P>
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        “What tension exists between my current condition and the future I want?”
      </blockquote>
      <P>That tension creates psychological movement. Without it, routines usually stay the same.</P>

      <H2>Why Tension Often Precedes Change</H2>
      <P>Most meaningful behaviour change begins when remaining the same becomes psychologically harder than changing.</P>
      <P>This does not always mean crisis. Sometimes it is:</P>
      <UL items={["frustration", "discomfort", "exhaustion", "disappointment", "ambition", "aspiration", "desire for growth"]} />
      <P>
        The important point is this:{" "}
        <strong className="text-zinc-900">
          people rarely sustain difficult behavioural changes without emotionally meaningful reasons.
        </strong>
      </P>
      <P>Temporary dieting often fails because the motivation is weak, vague, or disconnected from daily life.</P>
      <P>Many people say:</P>
      <UL items={["“I should lose weight.”", "“I know what to do.”", "“I need more discipline.”"]} />
      <P>But those thoughts often lack emotional urgency. Friction Awareness helps make the problem psychologically real. Not exaggerated. Not catastrophic. Just real.</P>
      <P>The later stages of WPT expand this further:</P>
      <UL
        items={[
          "Consequence Awareness develops PUSH motivation",
          "Identity Awareness develops PULL motivation",
        ]}
      />
      <P>Friction Awareness is where the tension first becomes visible.</P>

      <H2>Why People Rationalize and Procrastinate Change</H2>
      <P>Many people do not fail because they lack information. They fail because change is not psychologically prioritized strongly enough.</P>
      <P>This often appears as procrastination. Examples:</P>
      <UL
        items={[
          "“I’ll start next month.”",
          "“Work is too stressful right now.”",
          "“I need more motivation first.”",
          "“Things will calm down later.”",
          "“I’ll focus after vacation.”",
        ]}
      />
      <P>Behaviourally, the problem appears physical. Psychologically, the problem is often priority.</P>
      <P>When something becomes truly important, people usually create time, attention, and energy for it.</P>
      <P>This is one reason repeated restarting happens. Weight loss remains emotionally secondary compared to:</P>
      <UL
        items={[
          "stress relief",
          "convenience",
          "comfort eating",
          "emotional escape",
          "work exhaustion",
          "automatic routines",
        ]}
      />
      <P>People also rationalize problems psychologically. Examples include:</P>
      <UL
        items={[
          "minimizing the problem",
          "pretending the situation is temporary",
          "distracting themselves",
          "emotionally eating to avoid discomfort",
          "avoiding self reflection",
          "endlessly blaming circumstances",
        ]}
      />
      <P>These coping patterns temporarily reduce emotional tension. But they also delay behavioural change.</P>
      <P>Friction Awareness helps interrupt avoidance. Not through shame. Through honesty.</P>

      <H2>Weight Is Often Not the Real Problem</H2>
      <P>Many people think body weight itself is the main issue. But weight is often the visible symptom. The deeper issue is usually behavioural prioritization.</P>
      <P>People may genuinely want to lose weight. But psychologically:</P>
      <UL
        items={[
          "convenience becomes higher priority",
          "emotional relief becomes higher priority",
          "work becomes higher priority",
          "food becomes stress management",
          "routines become automatic",
        ]}
      />
      <P>As a result, long term consistency disappears.</P>
      <P>
        This is why many people repeatedly regain weight even after successfully losing weight temporarily. For the
        deeper psychology, read{" "}
        <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
          Why People Regain Weight After Dieting
        </a>
        .
      </P>
      <P>The issue is not always knowledge. The issue is that sustainable behaviour never became psychologically important enough to survive:</P>
      <UL items={["stress", "emotion", "environment", "exhaustion", "routine", "convenience"]} />
      <P>This is one reason the Weight Permanence Training™ exists. WPT helps people:</P>
      <UL
        items={[
          "understand their psychological state",
          "identify behavioural patterns",
          "recognize meaningful motivations",
          "expose avoidance honestly",
          "psychologically prioritize change",
          "build sustainable consistency",
        ]}
      />
      <P>The goal is not temporary dieting intensity. The goal is permanence.</P>

      <H2>Friction Awareness Is About Honesty, Not Shame</H2>
      <P>Many people avoid self assessment because they fear guilt or judgment. But honesty and shame are not the same thing.</P>
      <P>Friction Awareness is not:</P>
      <UL items={["self hatred", "punishment", "humiliation", "perfectionism"]} />
      <P>It is simply the willingness to acknowledge reality clearly. Examples:</P>
      <UL
        items={[
          "“I emotionally eat during stress.”",
          "“My habits are inconsistent.”",
          "“I avoid difficult self reflection.”",
          "“I keep restarting.”",
          "“My current direction is not leading where I want.”",
        ]}
      />
      <P>Honest awareness creates direction. Avoidance creates stagnation.</P>
      <P>This stage matters because unresolved friction quietly affects:</P>
      <UL
        items={[
          "confidence",
          "mobility",
          "emotional state",
          "energy",
          "relationships",
          "future opportunities",
          "long term health",
        ]}
      />
      <P>
        Many people try to skip awareness and jump directly into action. But actions without awareness usually collapse
        under stress. Friction Awareness slows people down long enough to ask:
      </P>
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        “What is truly preventing change right now?”
      </blockquote>
      <P>Because the answer is often deeper than food itself. Friction Awareness builds on the baseline established in <a href="/blog/reality-awareness" className="text-accent hover:underline">Reality Awareness</a>.</P>

      <H2>How LS Diet Uses Friction Awareness</H2>
      <P>LS Diet is not only focused on food. It focuses heavily on behavioural permanence.</P>
      <P>Many people already know:</P>
      <UL items={["calories matter", "movement matters", "processed foods affect appetite"]} />
      <P>But long term consistency still fails. Why? Because behaviour is heavily influenced by:</P>
      <UL
        items={[
          "stress",
          "emotion",
          "routine",
          "environment",
          "avoidance",
          "coping patterns",
          "psychological prioritization",
        ]}
      />
      <P>Friction Awareness helps expose those deeper patterns honestly.</P>
      <P>
        <a href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting" className="text-accent hover:underline">
          LS Diet
        </a>{" "}
        then helps simplify behaviour through:
      </P>
      <UL
        items={[
          "low-starch, low-sugar eating",
          "improved fullness",
          "reduced cravings",
          "sustainable routines",
          "awareness training",
          "repeatable Action Practice systems",
          "slow jogging as sustainable movement",
          "behavioural consistency",
        ]}
      />
      <P>The goal is not perfection. The goal is building a lifestyle sustainable enough to continue during real life.</P>
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
