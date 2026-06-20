// Foundation pillar — code-managed (NOT Contentful).
// canonicalTopic: awareness-stages | subTopic: reality-awareness
// Sub-pillar 3.1 of the Weight Permanence Training™.
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
  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-8 md:mt-12 mb-4 text-zinc-900">
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
    "Reality Awareness helps you establish an honest baseline before trying to stop regaining weight. Stage 1 of the Weight Permanence Training™ — the behavioural foundation of LS Diet's weight regain prevention system.",
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
    alt: "Reality Awareness — Stage 1 of the 5 Awareness Stages in the Weight Permanence Training™",
  },
  faqs: [
    {
      q: "What is Reality Awareness?",
      a: "Reality Awareness is the first stage of the Weight Permanence Training™. It focuses on honestly understanding your current physical, behavioural, emotional, and environmental situation before attempting sustainable change.",
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
      <Lead>Most people start weight loss without knowing where they actually are.</Lead>
      <P>
        Not approximately. Not emotionally. <strong className="text-zinc-900">Actually.</strong>
      </P>
      <P>
        You know roughly what you weigh. You know your habits are off. But if someone asked you
        to describe exactly when you overeat, what triggers it, how often it happens, and what
        environments make it worse — most people can't answer that with any precision.
      </P>
      <P>
        That gap is why so many weight loss efforts stall immediately. You're trying to fix
        a problem you haven't clearly identified yet. Without a real baseline, goals become
        emotional, expectations become unrealistic, and the first hard week breaks everything.
      </P>
      <P>
        Reality Awareness is the first stage of the{" "}
        <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
          Weight Permanence Training™
        </a>{" "}
        because sustainable change requires clarity first. Before behaviour changes, awareness
        must change.
      </P>

      <H2>Why Most People Avoid Honest Self Assessment</H2>
      <P>
        Because reality feels like a verdict. Stepping on the scale, looking at photos,
        honestly tracking what you eat — these feel like moments of judgment, not information.
        So you avoid them. And the avoidance feels like self-protection, but it's actually
        self-sabotage.
      </P>
      <P>
        When you stop measuring reality, you replace it with assumptions. You assume things
        aren't that bad. You assume you'll get serious next week. You assume the problem is
        motivation, not behaviour. None of those assumptions help you change anything.
      </P>
      <P>
        Reality Awareness is not self-punishment.{" "}
        <strong className="text-zinc-900">It is removing uncertainty.</strong> The goal is
        observation — clear, factual, non-emotional. What's actually happening, not what
        you wish were happening.
      </P>

      <H2>Why Weight Loss Without a Baseline Becomes Emotional</H2>
      <P>
        "I need to get healthier." "I need to stop eating so badly." These feel like goals,
        but they're not. They're feelings. Without a measurable baseline, you can't track
        progress, can't calibrate effort, and can't tell the difference between a real
        setback and a normal hard week.
      </P>
      <P>
        This is why people lose motivation so fast. They're measuring effort against an
        emotional ideal, not against actual behaviour. Every day that isn't perfect feels
        like failure, because there's no real baseline to anchor progress to.
      </P>
      <P>
        Reality Awareness creates direction. For the psychology behind why people keep
        restarting despite genuine effort, read{" "}
        <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
          Why People Regain Weight After Dieting
        </a>
        .
      </P>

      <H2>Reality Awareness Is About Observation, Not Shame</H2>
      <P>
        Honesty is not the same as self-criticism. Reality Awareness is not about cataloguing
        your failures or building a case against yourself. It is about seeing clearly — the
        same way a doctor reads bloodwork. The numbers aren't a judgment. They're information.
      </P>
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        The future arrives whether you acknowledge reality or not. Reality Awareness helps you
        move toward it consciously instead of reactively.
      </blockquote>
      <P>
        The people who struggle most with weight loss are often the ones who stop looking.
        They avoid the scale, avoid photos, avoid honest conversations with themselves —
        because looking feels worse than not knowing. In practice, not knowing is always worse.
      </P>

      <H2>What Should People Assess Honestly?</H2>
      <P>
        Reality Awareness goes beyond the number on the scale. The full assessment covers
        four areas:
      </P>

      <H3>Physical Awareness</H3>
      <UL
        items={[
          "current weight and waist measurements",
          "energy levels throughout the day",
          "mobility and physical limitations",
          "sleep quality",
          "bloodwork if available",
        ]}
      />

      <H3>Behavioural Awareness</H3>
      <UL
        items={[
          "emotional eating frequency",
          "snacking and late-night eating patterns",
          "processed food and liquid calorie intake",
          "eating speed and portion awareness",
          "stress eating and binge patterns",
        ]}
      />

      <H3>Environmental Awareness</H3>
      <UL
        items={[
          "food availability at home and at work",
          "household eating culture",
          "convenience eating exposure",
          "delivery app reliance",
          "social pressure around food",
        ]}
      />

      <H3>Emotional Awareness</H3>
      <UL
        items={[
          "shame or frustration around weight",
          "avoidance patterns",
          "emotional exhaustion from repeated restarting",
          "self-criticism cycles",
        ]}
      />
      <P>
        Most people focus only on food. Reality Awareness examines the full system surrounding
        behaviour — because the food is usually not the root problem.
      </P>

      <H2>Why People Underestimate Their Behaviour</H2>
      <P>
        Automatic behaviour becomes invisible. You don't consciously decide to grab a handful
        of something while making dinner, or eat faster when stressed, or finish what's on
        your plate regardless of hunger. It just happens. Which means you can't report it
        accurately — not because you're dishonest, but because you genuinely don't see it.
      </P>
      <P>
        This is why observation matters more than memory. Tracking creates awareness that
        emotions hide. You can't change what you can't see.
      </P>

      <H2>The Goal Is Clarity, Not Perfection</H2>
      <P>
        Uncertainty creates more anxiety than reality does. When you don't know where you
        stand, your brain fills the gap with worst-case assumptions and vague dread. When
        you know exactly where you stand — even if it's uncomfortable — you have something
        to work with.
      </P>
      <P>
        <strong className="text-zinc-900">The goal is not perfection. The goal is understanding.</strong>{" "}
        Once you understand your actual patterns, the rest of the Weight Permanence Training™
        becomes possible.
      </P>

      <H2>Why Reality Awareness Matters for Permanent Weight Loss</H2>
      <P>
        Temporary motivation can produce short-term effort. But consistent behaviour over
        months and years requires something that motivation can't provide: a clear picture
        of what's actually happening and why.
      </P>
      <P>
        Without awareness, behaviour stays automatic. Automatic behaviour eventually
        overpowers temporary motivation — every time. This is why people who genuinely
        want to change still end up back where they started.
      </P>
      <P>
        Reality Awareness breaks that loop by making the invisible visible. Once you can
        see your patterns clearly, you can begin working on{" "}
        <a href="/blog/friction-awareness" className="text-accent hover:underline">
          Friction Awareness
        </a>{" "}
        — identifying exactly what keeps stopping you.
      </P>

      <H2>How Does LS Diet Use Reality Awareness?</H2>
      <P>
        You already know the basics of nutrition. The difficult part isn't knowing what to
        eat — it's understanding why you keep not doing it. Reality Awareness addresses
        that by exposing the behavioural and emotional patterns that keep overriding your
        intentions.
      </P>
      <P>
        LS Diet pairs this awareness with a{" "}
        <a href="/what-is-ls-diet" className="text-accent hover:underline">
          low-starch, low-sugar eating approach
        </a>{" "}
        that reduces cravings and decision fatigue — making the behaviours you identified
        in Reality Awareness easier to change systematically. The goal is not temporary
        motivation. The goal is long-term consistency without repeatedly restarting.
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
