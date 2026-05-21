// Foundation pillar — code-managed (NOT Contentful).
// canonicalTopic: awareness-stages | subTopic: reality-awareness
// Sub-pillar 3.1 of the Weight Permanence Triangle™.
import featuredImage from "@/assets/foundations/reality-awareness-hero.png";
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

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl md:text-2xl font-bold tracking-tight mt-8 mb-3 text-zinc-900">
    {children}
  </h3>
);

const meta: Foundation["meta"] = {
  slug: "reality-awareness",
  title: "Reality Awareness | The First Step Toward Permanent Weight Loss",
  listTitle: "Reality Awareness",
  order: 3.1,
  excerpt:
    "Honest self assessment is the first step toward weight permanence. Reality Awareness helps people see their current behavioural, emotional, and physical baseline before trying to stop the cycle of losing and regaining the same weight.",
  metaDescription:
    "Reality Awareness helps you establish an honest baseline before trying to stop regaining weight. Stage 1 of the Weight Permanence Triangle™ — the behavioural foundation of LS Diet's weight regain prevention system.",
  publishDate: "2026-05-19T00:00:00.000Z",
  updatedAt: "2026-05-19T00:00:00.000Z",
  canonicalTopic: "awareness-stages",
  subTopic: "reality-awareness",
  topics: [
    "reality-awareness",
    "self-assessment",
    "stop-weight-regain",
    "behavioural-permanence",
    "awareness-stages",
  ],
  contentType: "pillar",
  parentUrl: "https://lsdiet.com/topics/weight-permanence-triangle",
  relatedTopics: ["weight-permanence-triangle", "stop-weight-regain"],
  featuredImage: {
    src: featuredImage,
    alt: "Reality Awareness — Stage 1 of the 5 Awareness Stages in the Weight Permanence Triangle™",
  },
  faqs: [
    {
      q: "What is Reality Awareness?",
      a: "Reality Awareness is the first stage of the Weight Permanence Triangle™. It focuses on honestly understanding your current physical, behavioural, emotional, and environmental situation before attempting sustainable change.",
    },
    {
      q: "Why is honest self assessment important for weight loss?",
      a: "Without a clear baseline, progress becomes emotional and difficult to measure. Honest self assessment helps create direction and behavioural understanding.",
    },
    {
      q: "Does Reality Awareness mean tracking calories?",
      a: "Not necessarily. Reality Awareness focuses more broadly on behaviours, routines, emotional eating, environments, and patterns that affect consistency.",
    },
    {
      q: "Why do people avoid self assessment?",
      a: "Many people associate reality with shame or self criticism. Avoidance often becomes a psychological defence against discomfort.",
    },
    {
      q: "How does Reality Awareness help stop weight regain?",
      a: "Reality Awareness helps expose the behaviours and patterns that repeatedly lead to regain so people can begin changing them consciously.",
    },
  ],
};

function Body() {
  return (
    <>
      <Lead>Honest self assessment is often the first step toward permanent weight loss.</Lead>
      <P>Many people want change.</P>
      <P>But very few accurately understand their current situation before trying to change it.</P>
      <P>This creates one of the biggest problems in weight loss:</P>
      <P>
        <strong className="text-zinc-900">People try to solve problems they have not clearly identified yet.</strong>
      </P>
      <P>Without a clear baseline:</P>
      <UL
        items={[
          "goals become emotional",
          "expectations become unrealistic",
          "progress becomes difficult to measure",
          "motivation becomes unstable",
          "frustration increases quickly",
        ]}
      />
      <P>
        Reality Awareness is the first stage of the{" "}
        <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
          Weight Permanence Triangle™
        </a>{" "}
        because sustainable change requires clarity first.
      </P>
      <P>Before behaviour changes, awareness must change.</P>

      <H2>Why Most People Avoid Honest Self Assessment</H2>
      <P>Reality can feel uncomfortable.</P>
      <P>Many people avoid:</P>
      <UL
        items={[
          "weighing themselves",
          "looking at photos",
          "tracking eating habits",
          "assessing emotional eating",
          "acknowledging regain",
          "evaluating their routines honestly",
        ]}
      />
      <P>This avoidance is understandable.</P>
      <UL
        items={[
          "Self judgement often creates shame.",
          "Shame creates emotional discomfort.",
          "Emotional discomfort increases avoidance.",
        ]}
      />
      <P>Over time, people stop measuring reality entirely.</P>
      <P>Instead, they rely on:</P>
      <UL items={["assumptions", "emotions", "temporary motivation", "wishful thinking"]} />
      <P>This usually weakens consistency long term.</P>
      <P>
        Reality Awareness is not about self punishment. <strong className="text-zinc-900">It is about removing uncertainty.</strong>
      </P>

      <H2>Why Weight Loss Without a Baseline Becomes Emotional</H2>
      <P>Many people start weight loss with vague goals like:</P>
      <UL
        items={[
          "“I need to get healthier.”",
          "“I need to lose weight.”",
          "“I need to stop eating badly.”",
        ]}
      />
      <P>But they often cannot clearly answer:</P>
      <UL
        items={[
          "How much weight have I regained?",
          "What behaviours are repeating?",
          "When do I overeat most?",
          "What emotional patterns exist?",
          "What environments trigger poor decisions?",
          "What routines are hurting consistency?",
        ]}
      />
      <P>Without measurable awareness, decision making becomes emotional instead of behavioural.</P>
      <P>This creates:</P>
      <UL
        items={[
          "inconsistent effort",
          "unrealistic expectations",
          "discouragement",
          "repeated restarting",
        ]}
      />
      <P>
        Reality Awareness creates direction. For the deeper psychology behind repeated regain, read{" "}
        <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
          Why People Regain Weight After Dieting
        </a>
        .
      </P>

      <H2>Reality Awareness Is About Observation, Not Shame</H2>
      <P>One of the biggest misunderstandings about self assessment is believing honesty equals self criticism.</P>
      <P>It does not.</P>
      <P>Reality Awareness is not:</P>
      <UL items={["self hatred", "guilt", "humiliation", "perfectionism", "obsession"]} />
      <P>It is observation.</P>
      <P>The purpose is to:</P>
      <UL
        items={[
          "identify patterns",
          "understand behaviours",
          "establish baselines",
          "reduce uncertainty",
          "improve decision making",
        ]}
      />
      <P>Many people remain stuck because they emotionally resist reality instead of learning from it.</P>
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        The future arrives whether we acknowledge reality or not. Reality Awareness helps people move toward the future
        consciously instead of reactively.
      </blockquote>

      <H2>What Should People Assess Honestly?</H2>
      <P>Reality Awareness includes both physical and behavioural assessment.</P>

      <H3>Physical Awareness</H3>
      <UL
        items={[
          "current weight",
          "waist size",
          "energy levels",
          "mobility",
          "sleep quality",
          "physical limitations",
          "blood work if available",
        ]}
      />

      <H3>Behavioural Awareness</H3>
      <UL
        items={[
          "emotional eating frequency",
          "snacking patterns",
          "processed food exposure",
          "late night eating",
          "eating speed",
          "stress eating",
          "binge eating patterns",
          "social eating habits",
        ]}
      />

      <H3>Environmental Awareness</H3>
      <UL
        items={[
          "food availability",
          "household eating culture",
          "work schedule",
          "convenience eating exposure",
          "delivery app usage",
          "social pressure",
        ]}
      />

      <H3>Emotional Awareness</H3>
      <UL
        items={[
          "shame",
          "frustration",
          "self criticism",
          "hopelessness",
          "emotional exhaustion",
          "avoidance patterns",
        ]}
      />
      <P>Most people focus only on food. Reality Awareness examines the full system surrounding behaviour.</P>

      <H2>Why People Underestimate Their Behaviour</H2>
      <P>Human behaviour naturally becomes automatic over time.</P>
      <P>People often underestimate:</P>
      <UL
        items={[
          "portion sizes",
          "snacking frequency",
          "liquid calories",
          "emotional eating",
          "processed food intake",
          "convenience eating",
        ]}
      />
      <P>Not because they are dishonest. Because automatic behaviour becomes invisible.</P>
      <P>This is why awareness matters. Observation exposes patterns that emotions often hide.</P>

      <H2>The Goal Is Clarity, Not Perfection</H2>
      <P>Many people avoid self assessment because they fear feeling discouraged.</P>
      <P>But uncertainty often creates more anxiety than reality itself.</P>
      <P>Clarity creates:</P>
      <UL
        items={[
          "direction",
          "measurable progress",
          "realistic expectations",
          "behavioural understanding",
          "emotional honesty",
        ]}
      />
      <P>Reality Awareness helps people stop negotiating with uncertainty.</P>
      <P>
        <strong className="text-zinc-900">The goal is not perfection. The goal is understanding.</strong>
      </P>

      <H2>Why Reality Awareness Matters for Permanent Weight Loss</H2>
      <P>Temporary motivation can create short term effort. But long term consistency usually requires deeper behavioural understanding.</P>
      <P>Reality Awareness helps people identify:</P>
      <UL
        items={[
          "what is actually happening",
          "what repeatedly causes regain",
          "what environments create problems",
          "what emotions trigger eating",
          "what behaviours need interruption",
        ]}
      />
      <P>Without awareness, behaviour stays automatic. Automatic behaviour eventually overpowers temporary motivation.</P>
      <P>This is one reason many people repeatedly restart weight loss despite wanting change sincerely.</P>

      <H2>How Reality Awareness Connects to LS Diet</H2>
      <P>LS Diet focuses heavily on sustainability and behavioural permanence.</P>
      <P>Reality Awareness supports that process by helping people:</P>
      <UL
        items={[
          "understand their current patterns",
          "identify behavioural friction",
          "recognize emotional eating",
          "reduce denial",
          "simplify future decisions",
          "establish realistic expectations",
        ]}
      />
      <P>The system encourages observation before aggressive intervention.</P>
      <P>Instead of chasing perfection, the goal is building awareness that supports repeatable long term behaviour.</P>
      <P>Reality Awareness becomes the foundation for:</P>
      <UL
        items={[
          "Friction Awareness",
          "Pattern Awareness",
          "Consequence Awareness",
          "Identity Awareness",
          "Action Practice",
          "long term permanence",
        ]}
      />

      <H2>How Does LS Diet Use Reality Awareness?</H2>
      <P>Many people already know basic nutrition information.</P>
      <P>The difficult part is understanding:</P>
      <UL
        items={[
          "why behaviour repeats",
          "why consistency collapses",
          "why emotional eating returns",
          "why regain keeps happening",
        ]}
      />
      <P>Reality Awareness helps identify those patterns honestly.</P>
      <P>LS Diet uses awareness training alongside:</P>
      <UL
        items={[
          "low-starch low-sugar eating",
          "simplified food decisions",
          "repeatable routines",
          "sustainable movement",
          "behavioural permanence strategies",
        ]}
      />
      <P>The goal is not temporary motivation. The goal is long term consistency without repeatedly restarting.</P>
      <P>
        Built by{" "}
        <a href="/oscar-poon" className="text-accent hover:underline">
          Oscar Poon
        </a>
        , who lost 80+ lbs three times before designing the system. Explore the{" "}
        <a href="/topics/weight-permanence-triangle" className="text-accent hover:underline">
          Weight Permanence Triangle™ topic hub
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
