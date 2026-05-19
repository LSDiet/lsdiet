// Foundation pillar — code-managed (NOT Contentful).
// canonicalTopic: action-practice-examples | subTopic: action-practice
// Implementation pillar of the Weight Permanence Triangle™.
import featuredImage from "@/assets/foundations/action-practice-classroom.png";
import skoolCard from "@/assets/foundations/action-practice-skool-card.png";
import consistencyRewards from "@/assets/foundations/action-practice-consistency-rewards.png";
import unlockAccountability from "@/assets/foundations/action-practice-unlock-accountability.png";
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

const Figure = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
  <figure className="my-8">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full rounded-xl border border-zinc-200 shadow-sm"
    />
    {caption ? (
      <figcaption className="text-sm text-zinc-600 mt-2 text-center italic">{caption}</figcaption>
    ) : null}
  </figure>
);

const meta: Foundation["meta"] = {
  slug: "action-practice",
  title: "Action Practice: Why Awareness Alone Does Not Stop Weight Regain",
  listTitle: "Action Practice",
  order: 9,
  excerpt:
    "Awareness creates direction, but Action Practice is what turns consistency into real behavioural change.",
  metaDescription:
    "Action Practice is the implementation stage of the Weight Permanence Triangle™. Learn how repeatable daily systems, environmental design, and accountability help stop weight regain long term.",
  publishDate: "2026-05-24T16:00:00.000Z",
  updatedAt: "2026-05-24T16:00:00.000Z",
  canonicalTopic: "action-practice-examples",
  subTopic: "action-practice",
  topics: [
    "behavioural-permanence",
    "habit-formation",
    "accountability",
    "environmental-design",
    "consistency",
  ],
  contentType: "pillar",
  parentUrl: "https://lsdiet.com/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight",
  relatedTopics: [
    "action-practice-examples",
    "awareness-stages",
    "stop-weight-regain",
    "weight-permanence-triangle",
  ],
  featuredImage: {
    src: featuredImage,
    alt: "LS Diet Action Practice classroom — repeatable behavioural systems for permanent weight loss",
  },
  faqs: [
    {
      q: "What is Action Practice?",
      a: "Action Practice is the implementation stage of the Weight Permanence Triangle™. It focuses on repeatable behavioural systems and sustainable daily routines.",
    },
    {
      q: "Why is awareness alone not enough?",
      a: "Awareness creates direction and understanding, but sustainable weight loss still requires behavioural implementation and repeatable action.",
    },
    {
      q: "Is the LS Diet classroom free?",
      a: "Yes. The LS Diet Skool classroom includes free Action Practice systems and implementation modules that people can begin using immediately.",
    },
    {
      q: "What kinds of Action Practice modules are included?",
      a: "Modules include environmental restructuring, emotional eating awareness, hydration systems, habit integration, LS meal building, behavioural interruption systems, and sustainable movement practices.",
    },
    {
      q: "What if I need accountability?",
      a: "People who need additional support, guidance, reminders, or accountability can later choose to join the LS Diet accountability system.",
    },
  ],
};

function Body() {
  return (
    <>
      <Lead>Awareness creates direction. But awareness alone does not stop weight regain.</Lead>
      <P>Many people:</P>
      <UL
        items={[
          "understand nutrition",
          "know they should exercise",
          "understand the risks of regain",
          "want to lose weight badly",
          "genuinely want their life to improve",
        ]}
      />
      <P>Yet consistency still collapses repeatedly.</P>
      <P>Why? Because understanding is not the same as implementation.</P>
      <P>
        Action Practice is the implementation stage of the{" "}
        <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
          Weight Permanence Triangle™
        </a>{" "}
        (WPT).
      </P>
      <P>This stage focuses on:</P>
      <UL
        items={[
          "repeatable daily action",
          "behavioural implementation",
          "environmental design",
          "habit integration",
          "consistency systems",
        ]}
      />
      <P>Without action, awareness remains theoretical. Without repeatable practice, behaviour usually returns to automatic patterns.</P>
      <P>Action Practice exists to bridge the gap between knowing and doing.</P>

      <H2>What Is Action Practice?</H2>
      <P>Action Practice focuses on implementation. This stage asks:</P>
      <UL
        items={[
          "What actions are realistically repeatable?",
          "What routines improve consistency?",
          "What environments support better decisions?",
          "What systems reduce behavioural drift?",
          "What habits simplify long term execution?",
        ]}
      />
      <P>Many people approach weight loss emotionally. Examples:</P>
      <UL
        items={[
          "waiting for motivation",
          "relying on willpower",
          "chasing perfection",
          "restarting repeatedly",
          "becoming intense temporarily",
        ]}
      />
      <P>But long term consistency usually depends more on systems than emotion.</P>
      <P>Action Practice helps simplify behaviour into repeatable routines. Because sustainable results usually require sustainable behaviour.</P>

      <H2>Why Awareness Alone Is Not Enough</H2>
      <P>
        The{" "}
        <a href="/awareness-stages" className="text-accent hover:underline">
          Awareness Stages
        </a>{" "}
        help people:
      </P>
      <UL
        items={[
          <>
            establish{" "}
            <a href="/blog/reality-awareness" className="text-accent hover:underline">
              reality
            </a>
          </>,
          <>
            identify{" "}
            <a href="/blog/friction-awareness" className="text-accent hover:underline">
              friction
            </a>
          </>,
          <>
            recognize behavioural{" "}
            <a href="/blog/pattern-awareness" className="text-accent hover:underline">
              patterns
            </a>
          </>,
          <>
            develop PUSH motivation (
            <a href="/blog/consequence-awareness" className="text-accent hover:underline">
              consequence
            </a>
            )
          </>,
          <>
            develop PULL motivation (
            <a href="/blog/identity-awareness" className="text-accent hover:underline">
              identity
            </a>
            )
          </>,
        ]}
      />
      <P>Those stages create clarity, emotional direction, self understanding, and psychological prioritization.</P>
      <P>But awareness alone does not automatically change behaviour. People still need:</P>
      <UL
        items={[
          "implementation",
          "repetition",
          "behavioural interruption",
          "environmental support",
          "practical systems",
        ]}
      />
      <P>This is where many people struggle. They understand what to do. But consistency collapses during:</P>
      <UL
        items={[
          "stress",
          "exhaustion",
          "social situations",
          "emotional eating",
          "busy schedules",
          "low motivation periods",
        ]}
      />
      <P>Action Practice helps transform awareness into behavioural consistency.</P>

      <H2>Why Behaviour Usually Returns to Automatic Patterns</H2>
      <P>Human behaviour is highly automatic. Many decisions happen through:</P>
      <UL items={["habit loops", "routines", "emotional triggers", "environmental cues", "convenience", "repetition"]} />
      <P>This is why many people repeatedly return to:</P>
      <UL
        items={[
          "stress eating",
          "convenience eating",
          "late night eating",
          "inactivity",
          "takeout routines",
          "emotional coping behaviour",
        ]}
      />
      <P>Even when they genuinely want to change.</P>
      <P>Awareness identifies the problem. Action Practice helps interrupt the pattern. Repeated behaviour eventually becomes automatic. That is behavioural permanence.</P>

      <H2>The LS Diet Action Practice System</H2>
      <P>LS Diet includes more than 20 Action Practice modules inside the free Skool classroom. These modules focus on practical implementation — not motivation speeches.</P>

      <Figure
        src={featuredImage}
        alt="LS Diet Action Practice modules list inside the Skool classroom"
        caption="The Action Practice section of the LS Diet classroom — repeatable behavioural modules, not motivation speeches."
      />

      <P>Examples include:</P>
      <UL
        items={[
          "Identify triggers & environmental cues",
          "Interrupt patterns: respond, don’t react",
          "How to read a label",
          "Reduce decision friction",
          "Restructure your food environment",
          "Eating out & social situations",
          "Think habits, not one action",
          "Measure weight in time",
          "Emotional vs functional eating",
          "LS meal building",
          "Track with LS pictures",
          "Be resourceful",
          "Walk 30 minutes after waking up",
          "Stop eating at the first burp",
          "Gratitude training",
          "180 BPM Zone 2 jogging",
          "The power of association",
          "Master the loser lifestyle",
          "Take risks in life",
          "Run toward or away from the future",
        ]}
      />
      <P>These systems are designed to help people:</P>
      <UL
        items={[
          "simplify consistency",
          "reduce overwhelm",
          "interrupt automatic behaviour",
          "reduce behavioural drift",
          "improve awareness implementation",
          "create sustainable routines",
        ]}
      />
      <P>
        The Action Practice system is continuously updated by{" "}
        <a href="/oscar-poon" className="text-accent hover:underline">
          Oscar Poon
        </a>{" "}
        and the LS Diet team. New systems, examples, behavioural tools, and implementation modules continue getting added over time.
      </P>
      <P>People do not need to pay anything to begin. The free LS Diet classroom already includes actionable systems people can begin using immediately.</P>

      <Figure
        src={skoolCard}
        alt="LSDiet: End Weight Rebound — free Skool classroom for the low-starch, low-sugar lifestyle"
        caption="The free LS Diet Skool classroom — start the Action Practice modules immediately."
      />

      <H2>Why Environment Often Matters More Than Motivation</H2>
      <P>Many people believe consistency problems are caused by lack of discipline. But environments strongly influence behaviour. Examples:</P>
      <UL
        items={[
          "visible snacks",
          "stress-heavy routines",
          "convenience eating",
          "processed food exposure",
          "sedentary lifestyles",
          "emotional triggers",
        ]}
      />
      <P>Action Practice helps redesign environments to reduce behavioural friction. Examples:</P>
      <UL
        items={[
          "keeping water visible",
          "restructuring food access",
          "reducing trigger exposure",
          "simplifying healthy decisions",
          "creating behavioural cues",
          "interrupting automatic reactions",
        ]}
      />
      <P>People often repeat what feels easiest, fastest, and most automatic. Action Practice helps make better behaviour easier to repeat.</P>

      <H2>Why Accountability Changes Behaviour</H2>
      <P>Many people already know what they should do. The problem is staying consistent long enough for behaviour to stabilize.</P>
      <P>People often fall off because:</P>
      <UL
        items={[
          "life becomes busy",
          "old habits return",
          "progress feels slow",
          "motivation fades",
          "nobody notices behavioural drift",
          "they restart alone repeatedly",
        ]}
      />
      <P>This is where accountability becomes important. Some people can implement independently. Others need:</P>
      <UL
        items={[
          "behavioural reminders",
          "structure",
          "consistency tracking",
          "guidance",
          "support",
          "external reinforcement",
        ]}
      />
      <P>The LS Diet accountability system exists to help people avoid disappearing during difficult periods. It includes:</P>
      <UL
        items={[
          "tracked daily accountability",
          "behavioural reminders",
          "awareness question systems",
          "consistency reinforcement",
          "priority support",
          "weekly group coaching",
        ]}
      />

      <Figure
        src={consistencyRewards}
        alt="LS Diet Consistency Rewards — $25 at 45 days, $75 at 60 days, $150 at 90 days"
        caption="Consistency rewards reinforce behavioural permanence over weeks and months — not just days."
      />

      <P>The goal is not punishment. The goal is preventing behavioural drift before regain happens again.</P>
      <P>Because many people do not fail from lack of information. They fail from:</P>
      <UL
        items={[
          "inconsistency",
          "disappearing",
          "isolation",
          "loss of priority",
          "behavioural drift over time",
        ]}
      />

      <H2>You Do Not Need To Do This Alone</H2>
      <P>Some people can begin independently using the free classroom. Others may eventually realize:</P>
      <UL
        items={[
          "they are unsure whether they can truly do this alone",
          "they need additional guidance",
          "they need accountability",
          "they repeatedly restart without support",
          "consistency collapses during stress",
        ]}
      />
      <P>That is normal. Behavioural change is difficult when life becomes chaotic.</P>
      <P>The important thing is: people can start immediately for free. The free LS Diet classroom already includes practical systems people can begin implementing right away. For people who later decide they want additional support, accountability options are available.</P>

      <H2>Why Action Practice Completes the Weight Permanence Triangle™</H2>
      <P>The Weight Permanence Triangle™ is not just about awareness. It is about implementation.</P>
      <P>Awareness helps people:</P>
      <UL
        items={[
          "understand themselves",
          "identify behavioural problems",
          "recognize repeated patterns",
          "develop emotional direction",
        ]}
      />
      <P>Action Practice helps transform that awareness into repeatable daily behaviour.</P>
      <P>Without action, awareness remains theoretical. Without repetition, behaviour usually returns to automatic patterns. But when awareness and repeatable practice work together, consistency becomes more sustainable.</P>
      <P>That is the goal of LS Diet: not temporary dieting intensity — but behavioural permanence.</P>

      <Figure
        src={unlockAccountability}
        alt="Don’t let this be you again — the LS Diet system keeps you on track with daily accountability"
        caption="Awareness + Action Practice + Accountability = behavioural permanence."
      />

      <P>
        Stop regaining weight:{" "}
        <a
          href="https://www.skool.com/lsdiet/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          join the free LS Diet classroom
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

      <H2>Continue Reading</H2>
      <UL
        items={[
          <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
            The Weight Permanence Triangle™: How to Stop Regaining Weight
          </a>,
          <a href="/blog/reality-awareness" className="text-accent hover:underline">Reality Awareness</a>,
          <a href="/blog/friction-awareness" className="text-accent hover:underline">Friction Awareness</a>,
          <a href="/blog/pattern-awareness" className="text-accent hover:underline">Pattern Awareness</a>,
          <a href="/blog/consequence-awareness" className="text-accent hover:underline">Consequence Awareness</a>,
          <a href="/blog/identity-awareness" className="text-accent hover:underline">Identity Awareness</a>,
        ]}
      />
    </>
  );
}

const foundation: Foundation = { meta, Body };
export default foundation;
