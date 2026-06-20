// Foundation pillar — code-managed (NOT Contentful).
// canonicalTopic: weight-permanence-triangle
import featuredImage from "@/assets/foundation-weight-permanence-triangle.png";
import awarenessStagesImage from "@/assets/5-stages-of-awareness.png";
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
  slug: "the-weight-permanence-triangle-how-to-stop-regaining-weight",
  title: "The Weight Permanence Training™: How to Stop Regaining Weight",
  listTitle: "Weight Permanence Training",
  order: 3,
  excerpt:
    "Learn how the Weight Permanence Training™ uses awareness, action practice, and permanence to help reduce repeated weight regain and build sustainable long-term weight loss habits.",
  metaDescription:
    "Learn how the Weight Permanence Training™ uses awareness, action practice, and permanence to help reduce repeated weight regain and build sustainable long-term weight loss habits.",
  publishDate: "2026-05-19T00:00:00.000Z",
  updatedAt: "2026-05-19T00:00:00.000Z",
  canonicalTopic: "weight-permanence-triangle",
  subTopic: "framework-overview",
  topics: [
    "weight-permanence",
    "behavioural-permanence",
    "awareness-stages",
    "action-practice",
    "stop-weight-regain",
  ],
  contentType: "pillar",
  parentUrl: "https://lsdiet.com/topics/stop-weight-regain",
  relatedTopics: ["stop-weight-regain", "awareness-stages", "action-practice-examples"],
  featuredImage: {
    src: featuredImage,
    alt: "The Weight Permanence Training™ — Awareness, Practice, Permanence — the LS Diet framework to stop regaining weight",
  },
  faqs: [
    {
      q: "What is the Weight Permanence Training™?",
      a: "The Weight Permanence Training™ is a behavioural framework focused on awareness, action practice, and permanence to help reduce repeated weight regain.",
    },
    {
      q: "Why do most people regain weight after dieting?",
      a: "Many people rely on temporary motivation and restrictive dieting without developing sustainable behavioural systems or psychological permanence.",
    },
    {
      q: "What are the 5 Awareness Stages?",
      a: "The 5 Awareness Stages are: Reality Awareness, Friction Awareness, Pattern Awareness, Consequence Awareness, and Identity Awareness.",
    },
    {
      q: "What is PUSH and PULL motivation?",
      a: "Consequence Awareness develops PUSH motivation by understanding the cost of inaction. Identity Awareness develops PULL motivation by connecting behaviour to a desired future identity.",
    },
    {
      q: "Why is permanence important in weight loss?",
      a: "Permanence helps behaviours remain consistent during stress, setbacks, and emotional difficulties, rather than collapsing once motivation fades.",
    },
    {
      q: "How does LS Diet use the Weight Permanence Training™?",
      a: "LS Diet applies the framework through low-starch, low-sugar eating, behavioural awareness, repeatable routines, and long-term consistency strategies designed to reduce repeated regain.",
    },
  ],
};

function Body() {
  return (
    <>
      <Lead>Most people do not struggle to lose weight temporarily. They struggle to stop regaining it.</Lead>
      <P>This is one of the biggest problems in modern weight loss.</P>
      <P>Millions of people repeatedly cycle through:</P>
      <UL items={["dieting", "temporary progress", "exhaustion", "regain", "restarting again"]} />
      <P>The problem is not usually intelligence. Most people already know:</P>
      <UL
        items={[
          "vegetables are healthier",
          "processed foods are easier to overeat",
          "excessive sugar can create problems",
          "movement matters",
          "consistency matters",
        ]}
      />
      <P>Yet regain still happens repeatedly. Why?</P>
      <P>
        <strong className="text-zinc-900">Because temporary motivation eventually loses against automatic behaviour.</strong>
      </P>

      <Figure
        src={awarenessStagesImage}
        alt="The 5 Stages of Awareness — Reality, Friction, Pattern, Consequence, and Identity Awareness — the push and pull motivation system behind LS Diet weight regain prevention"
        caption="The 5 Stages of Awareness: the push and pull motivation behind lasting change."
      />

      <P>The Weight Permanence Training™ (WPT) was created to explain this problem. The framework focuses on helping people:</P>
      <UL
        items={[
          "understand their psychological state",
          "identify what is blocking consistency",
          "develop both PUSH and PULL motivation",
          "build repeatable actions",
          "create long term behavioural permanence",
        ]}
      />
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        The goal is not temporary dieting. The goal is stopping the cycle of constantly regaining weight.
      </blockquote>

      <H2>Why Most People Regain Weight</H2>
      <P>Many weight loss systems focus heavily on:</P>
      <UL
        items={[
          "calorie restriction",
          "meal plans",
          "exercise intensity",
          "short term discipline",
          "rapid results",
        ]}
      />
      <P>Some people temporarily succeed with these approaches. But eventually:</P>
      <UL
        items={[
          "life becomes stressful",
          "routines collapse",
          "emotional eating returns",
          "convenience eating returns",
          "cravings increase",
          "motivation fades",
        ]}
      />
      <P>Then the regain starts again.</P>
      <P>
        This is why the question <em>“How do I lose weight?”</em> is often incomplete. The more important question is:{" "}
        <strong className="text-zinc-900">“How do I stop regaining it?”</strong>
      </P>
      <P>
        This is the core problem WPT was designed to address. For the deeper psychology behind the regain cycle, read{" "}
        <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
          Why People Regain Weight After Dieting
        </a>
        .
      </P>

      <H2>What Is the Weight Permanence Training™?</H2>
      <P>The Weight Permanence Training™ is a behavioural framework designed to help weight loss become psychologically sustainable. The framework has three connected systems:</P>
      <UL items={["Awareness", "Action Practice", "Permanence"]} />
      <P>Each part supports the others:</P>
      <UL
        items={[
          "Without awareness, behaviour remains automatic.",
          "Without action practice, awareness never becomes behavioural change.",
          "Without permanence, temporary progress collapses once motivation fades.",
        ]}
      />
      <P>Together, these systems help create sustainable long term consistency.</P>

      <H2>Part 1: Awareness</H2>
      <P>Awareness is the foundation of WPT. Many people try to change behaviour before understanding behaviour. That usually fails.</P>
      <P>Awareness helps people recognize:</P>
      <UL
        items={[
          "why they eat",
          "when they overeat",
          "what triggers cravings",
          "how environments influence decisions",
          "why previous diets failed",
          "what psychological patterns repeat",
        ]}
      />
      <P>The awareness system has five stages.</P>

      <H3>Reality Awareness</H3>
      <P>Reality Awareness focuses on honestly understanding your current situation. Many people underestimate:</P>
      <UL
        items={[
          "calorie intake",
          "snacking frequency",
          "emotional eating",
          "processed food exposure",
          "weight regain patterns",
        ]}
      />
      <P>Without a clear baseline, weight loss becomes emotional instead of measurable. Reality awareness removes guesswork.</P>

      <H3>Friction Awareness</H3>
      <P>Friction Awareness identifies what feels limiting, frustrating, or unsustainable. Examples include:</P>
      <UL
        items={[
          "low energy",
          "poor mobility",
          "emotional discomfort",
          "social limitations",
          "lack of confidence",
          "frustration from repeated regain",
        ]}
      />
      <P>This stage helps people recognize the real cost of staying the same.</P>

      <H3>Pattern Awareness</H3>
      <P>Repeated behaviour creates predictable outcomes. Pattern Awareness helps identify:</P>
      <UL
        items={[
          "stress eating",
          "boredom snacking",
          "late night eating",
          "social overeating",
          "convenience food habits",
          "emotional eating loops",
        ]}
      />
      <P>Most regain patterns are repetitive. Awareness helps expose those automatic cycles.</P>

      <H3>Consequence Awareness</H3>
      <P>Consequence Awareness develops PUSH motivation. This stage asks:</P>
      <UL
        items={[
          "What happens if nothing changes?",
          "What is repeated regain costing you?",
          "What future limitations are developing?",
        ]}
      />
      <P>The purpose is not fear. The purpose is clarity. Many people avoid thinking long term because it feels uncomfortable. But avoiding reality usually strengthens complacency.</P>

      <H3>Identity Awareness</H3>
      <P>Identity Awareness develops PULL motivation. This stage focuses on:</P>
      <UL
        items={[
          "who you want to become",
          "what your future could look like",
          "what weight loss would emotionally mean",
          "what kind of person you want to be",
        ]}
      />
      <P>Weight loss becomes more sustainable when behaviour connects to identity instead of temporary emotion.</P>

      <H2>Part 2: Action Practice</H2>
      <P>Awareness alone is not enough. People must repeatedly practice behaviours until they become easier and more automatic. Action Practice turns awareness into behaviour.</P>
      <P>This includes:</P>
      <UL
        items={[
          "low-starch low-sugar meal building",
          "reducing decision friction",
          "restructuring food environments",
          "emotional eating awareness",
          "movement routines",
          "simplifying food choices",
          "tracking behaviours",
          "interrupting automatic patterns",
        ]}
      />
      <P>The goal is not perfection. The goal is repeatability. Small sustainable actions usually outperform aggressive temporary intensity.</P>

      <H3>Why Small Daily Actions Matter</H3>
      <P>Many people fail because they rely on emotional intensity. Examples:</P>
      <UL
        items={[
          "“starting Monday”",
          "extreme restrictions",
          "all-or-nothing thinking",
          "short bursts of motivation",
        ]}
      />
      <P>These approaches are difficult to sustain. Action Practice focuses on reducing behavioural resistance instead.</P>
      <P>Examples may include:</P>
      <UL
        items={[
          "walking after waking up",
          "simplifying meals",
          "reducing processed food exposure",
          "stopping at fullness",
          "improving food awareness",
          "creating repeatable meal patterns",
        ]}
      />
      <P>Practice creates familiarity. Familiarity reduces resistance. Reduced resistance increases consistency.</P>

      <H2>Part 3: Permanence</H2>
      <P>Permanence is the long term behavioural anchor. Most people can temporarily force themselves into behaviour. Very few psychologically prioritize those behaviours permanently.</P>
      <P>Permanence focuses on:</P>
      <UL
        items={[
          "consistency",
          "recovery after setbacks",
          "emotional resilience",
          "behavioural anchoring",
          "sustainable routines",
          "identity reinforcement",
        ]}
      />
      <P>This is where weight loss stops feeling temporary. Instead of constantly negotiating internally every day, healthier behaviour gradually becomes more automatic.</P>
      <P>This is one reason LS Diet focuses heavily on:</P>
      <UL
        items={[
          "sustainability",
          "simplicity",
          "reduced friction",
          "behavioural consistency",
          "long term lifestyle adoption",
        ]}
      />
      <blockquote className="border-l-4 border-accent pl-5 my-8 text-lg md:text-xl italic text-zinc-900">
        The goal is not temporary dieting. The goal is permanence.
      </blockquote>

      <H2>Why LS Diet Aligns With the Weight Permanence Training™</H2>
      <P>
        <a href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting" className="text-accent hover:underline">
          LS Diet
        </a>{" "}
        is designed around sustainability. Instead of aggressive restriction, the system focuses on:
      </P>
      <UL
        items={[
          "reducing excessive starch and sugar",
          "reducing cravings",
          "improving fullness",
          "simplifying decisions",
          "reducing behavioural friction",
          "creating repeatable routines",
          "sustainable movement",
          "awareness based eating",
        ]}
      />
      <P>The Weight Permanence Training™ explains the behavioural side behind that lifestyle. Together, they help explain:</P>
      <UL
        items={[
          "why motivation fades",
          "why diets collapse",
          "why emotional eating returns",
          "why stress disrupts routines",
          "why people repeatedly restart",
          "why permanence matters more than intensity",
        ]}
      />

      <H2>How Does LS Diet Help People Stop Regaining Weight?</H2>
      <P>Many people already know basic nutrition advice. The difficult part is maintaining consistency when:</P>
      <UL
        items={[
          "motivation disappears",
          "stress increases",
          "emotional eating returns",
          "life becomes busy",
          "routines collapse",
        ]}
      />
      <P>LS Diet focuses heavily on solving those long term behavioural problems. The system combines:</P>
      <UL
        items={[
          "low-starch low-sugar eating",
          "awareness training",
          "action practice",
          "repeatable routines",
          "sustainable movement",
          "psychological permanence",
        ]}
      />
      <P>The goal is not temporary dieting. The goal is to stop repeated weight regain.</P>
      <P>
        Built by{" "}
        <a href="/oscar-poon" className="text-accent hover:underline">Oscar Poon</a>, who lost 80+ lbs three times before
        designing the system. Explore the{" "}
        <a href="/topics/stop-weight-regain" className="text-accent hover:underline">
          Stop Weight Regain topic hub
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
