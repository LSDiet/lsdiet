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
  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-8 md:mt-12 mb-4 text-zinc-900">
    {children}
  </h2>
);

const meta: Foundation["meta"] = {
  slug: "friction-awareness",
  title: "Friction Awareness: Why Losing Weight Feels So Hard",
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
  relatedTopics: ["awareness-stages", "weight-permanence-triangle", "stop-weight-regain"],
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
      <Lead>You know what you should do. Something keeps stopping you. This stage names it.</Lead>
      <P>
        Friction is the gap between your current behaviour and the life you actually want.
        It's not vague dissatisfaction. It's a specific, nameable distance between where
        you are and where you're trying to go.
      </P>
      <P>
        Most people skip this stage entirely. They try to fix behaviour before they've
        honestly named what's making the current behaviour so persistent. So they get
        motivated, start a new plan, hit the same invisible wall, and restart.
      </P>
      <P>
        Friction Awareness is Stage 2 of the{" "}
        <a href="/awareness-stages" className="text-accent hover:underline">
          5 Awareness Stages
        </a>{" "}
        in the{" "}
        <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
          Weight Permanence Training™
        </a>
        . You can't resolve friction you haven't acknowledged. The gap between
        knowing and doing is not a motivation problem. It's friction. And friction has a source.
      </P>

      <H2>What Is Friction Awareness?</H2>
      <P>
        Friction Awareness identifies the specific tension that exists between your current
        reality and your intended direction. That tension can come from two places.
      </P>
      <P>
        Sometimes it's pain: feeling physically limited, struggling with mobility,
        exhaustion from repeated dieting cycles, low confidence, discomfort in social
        situations, worry about long-term health consequences.
      </P>
      <P>
        Sometimes it's possibility: wanting the energy you had five years ago, wanting
        to travel without physical limitations, wanting to set an example for your kids,
        wanting to recognize yourself in photos again.
      </P>
      <P>
        Both forms of tension matter. Some people change because they want to escape pain.
        Others change because they want to pursue something. Most experience both at once.
        Friction Awareness simply asks: what is the real gap, and is it close enough to
        feel urgent?
      </P>

      <H2>Why Tension Often Precedes Change</H2>
      <P>
        People don't change when they think about changing. They change when not changing
        feels worse than changing. That's what tension does. It makes the cost of
        staying the same impossible to ignore.
      </P>
      <P>
        Without named friction, change stays optional. You can always start "next week"
        because there's no real urgency. The Monday restart cycle exists largely because
        people never make their friction concrete enough to feel immediate.
      </P>
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        Comfortable dissatisfaction is the most common reason people don't change.
        The situation is bad enough to complain about, but not bad enough to act on.
      </blockquote>
      <P>
        Friction Awareness moves dissatisfaction from vague to specific. From "I'm not happy with my weight" to "this is what my current direction is costing me, and I can't keep pretending otherwise."
      </P>

      <H2>Why People Rationalize and Procrastinate Change</H2>
      <P>
        The brain is extremely good at making the current situation feel temporary.
        "I'll get serious after the holidays." "Things will calm down soon."
        "I've done it before. I can do it again whenever I decide to."
        These aren't lies. They're rationalizations that protect you from having
        to act right now.
      </P>
      <P>
        The longer you stay in that holding pattern, the more normal the discomfort
        becomes. Tighter clothing gets replaced. Activities get quietly dropped. The
        baseline shifts and you adapt to it. Until the next health scare or emotional breaking point forces the restart cycle again.
      </P>
      <P>
        Friction Awareness interrupts that normalization. It asks you to look at
        your current direction honestly. Not the temporary version you're planning to change. The actual trajectory if nothing changes.
      </P>

      <H2>Weight Is Often Not the Real Problem</H2>
      <P>
        The number on the scale is a symptom. The real friction is usually underneath it:
        the energy you've lost, the things you've stopped doing, the version of yourself
        you keep deferring. Weight is how the friction shows up physically. But that's
        not where it lives.
      </P>
      <P>
        This is why diets that focus purely on food almost always fail long term. They
        address the symptom without naming the friction. When the diet ends, the friction
        is still there. Old behaviour refills the space the diet temporarily vacated.
      </P>
      <P>
        For the deeper explanation of why this cycle repeats, read{" "}
        <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
          Why People Regain Weight After Dieting
        </a>
        .
      </P>

      <H2>Friction Awareness Is About Honesty, Not Shame</H2>
      <P>
        Naming friction is not the same as attacking yourself. You're not building a
        case for why you're failing. You're identifying what's actually in the way, so you can work with it instead of around it.
      </P>
      <P>
        Name the gap clearly enough that it stops being deniable. A gap you can see clearly is one you can
        close. A gap you keep softening in your own mind stays open indefinitely.
      </P>
      <P>
        From here,{" "}
        <a href="/blog/pattern-awareness" className="text-accent hover:underline">
          Pattern Awareness
        </a>{" "}
        maps exactly how and when the behaviour that created this friction keeps repeating.
      </P>

      <H2>How LS Diet Uses Friction Awareness</H2>
      <P>
        LS Diet doesn't try to motivate you past friction. It helps you map the friction
        clearly so the right changes target the right problems.
      </P>
      <P>
        Most people try to change everything at once and overwhelm themselves within two
        weeks. Friction Awareness shows you where the actual resistance is. You can address it directly instead of burning energy on the wrong things.
      </P>
      <P>
        This is Stage 2 of the{" "}
        <a href="/awareness-stages" className="text-accent hover:underline">
          5 Awareness Stages
        </a>
        . The full system was built by{" "}
        <a href="/oscar-poon" className="text-accent hover:underline">
          Oscar Poon
        </a>
        , who spent years restarting before mapping why it kept happening. Explore the{" "}
        <a href="/weight-permanence-triangle" className="text-accent hover:underline">
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
