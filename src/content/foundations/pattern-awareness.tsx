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
  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-4 text-zinc-900">
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
      <Lead>Many people focus heavily on food itself. But long term weight regain is often driven by repeated behavioural patterns.</Lead>
      <P>
        Pattern Awareness is the third stage of the{" "}
        <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
          Weight Permanence Training™
        </a>{" "}
        (WPT).
      </P>
      <P>This stage focuses on identifying:</P>
      <UL
        items={[
          "repeated routines",
          "repeated environments",
          "repeated emotional triggers",
          "repeated behaviours",
          "repeated decision patterns",
        ]}
      />
      <P>Because repeated behaviour eventually becomes automatic behaviour.</P>
      <P>Pattern Awareness explores the who, what, when, where, why, and how behind repeated eating behaviour.</P>
      <P>Without this stage, many people continue repeating the same cycles unconsciously:</P>
      <UL
        items={[
          "emotional eating",
          "convenience eating",
          "stress eating",
          "late-night snacking",
          "binge eating",
          "restarting diets repeatedly",
        ]}
      />
      <P>The goal of Pattern Awareness is not blame. The goal is understanding. Because patterns predict outcomes.</P>

      <H2>What Is Pattern Awareness?</H2>
      <P>Pattern Awareness examines how repeated behaviours shape eating decisions over time.</P>
      <P>Many food choices feel spontaneous. But most are highly patterned. Examples:</P>
      <UL
        items={[
          "eating while stressed",
          "overeating during social events",
          "snacking while watching screens",
          "eating differently on weekends",
          "ordering takeout after work",
          "losing consistency during travel",
          "eating certain foods at certain times automatically",
        ]}
      />
      <P>These behaviours often repeat so frequently that they stop feeling like decisions. They become routines.</P>
      <P>Pattern Awareness helps bring those routines into conscious awareness. This stage asks questions like:</P>
      <UL
        items={[
          "Who do you usually eat with?",
          "What foods trigger overeating?",
          "When do cravings appear most often?",
          "Where are you most likely to lose control?",
          "Why do certain situations lead to emotional eating?",
          "How do your routines affect consistency?",
        ]}
      />
      <P>The purpose is not perfection. The purpose is visibility. Because invisible patterns are difficult to change.</P>

      <H2>Why Repeated Behaviour Becomes Automatic</H2>
      <P>The brain constantly tries to conserve energy. Repeated behaviour eventually becomes more automatic because automatic routines require less mental effort.</P>
      <P>This is useful for:</P>
      <UL items={["driving", "brushing teeth", "morning routines"]} />
      <P>But automatic behaviour can also create unhealthy eating patterns. Examples:</P>
      <UL
        items={[
          "automatically buying snacks during stress",
          "emotionally eating after work",
          "associating television with overeating",
          "eating dessert every night regardless of hunger",
          "using food as reward or relief",
        ]}
      />
      <P>Over time, these behaviours stop feeling intentional. They begin feeling normal. Many people then believe:</P>
      <UL items={["“This is just who I am.”", "“I have no discipline.”", "“I can’t control myself.”"]} />
      <P>But often, repeated behaviour has simply become neurologically reinforced.</P>
      <P>Pattern Awareness helps interrupt automaticity. Because behaviour repeated consistently becomes easier to repeat again.</P>

      <H2>Why Environment Shapes Eating Behaviour</H2>
      <P>Many people assume weight loss depends entirely on willpower. But environments strongly influence behaviour. Examples:</P>
      <UL
        items={[
          "visible snacks increase eating frequency",
          "social groups influence food choices",
          "workplace stress affects cravings",
          "sleep deprivation affects hunger",
          "convenience affects decision making",
          "restaurant culture affects portions",
        ]}
      />
      <P>This is important because many people repeatedly return to the same environments after dieting. Nothing around them changed. So the same behavioural patterns return. Examples:</P>
      <UL
        items={[
          "stressful workdays",
          "emotional exhaustion",
          "social pressure",
          "highly processed foods",
          "late-night routines",
          "convenience eating",
        ]}
      />
      <P>
        Many people regain weight not because they forgot nutrition information. They regain because the environments
        reinforcing old patterns never changed. For the deeper psychology, read{" "}
        <a href="/blog/why-people-regain-weight-after-dieting" className="text-accent hover:underline">
          Why People Regain Weight After Dieting
        </a>
        .
      </P>
      <P>Pattern Awareness helps identify those environmental loops honestly.</P>

      <H2>Why Emotional Eating Often Becomes a Pattern</H2>
      <P>Many eating behaviours are emotional coping systems. Food may temporarily provide:</P>
      <UL items={["comfort", "distraction", "stimulation", "stress relief", "emotional escape", "reward", "numbness"]} />
      <P>This is why emotional eating often repeats automatically. Not because someone lacks intelligence. But because the brain remembers relief.</P>
      <P>Over time, emotional eating becomes conditioned behaviour. Examples:</P>
      <UL
        items={[
          "stress triggers cravings",
          "boredom triggers snacking",
          "loneliness triggers takeout",
          "anxiety triggers overeating",
          "exhaustion triggers convenience eating",
        ]}
      />
      <P>The behaviour becomes associated with emotional regulation. Pattern Awareness helps expose these loops clearly.</P>
      <P>Because sustainable change requires understanding:</P>
      <UL
        items={[
          "what triggers behaviour",
          "what behaviour accomplishes emotionally",
          "what environments reinforce it",
          "what patterns repeatedly lead to regain",
        ]}
      />

      <H2>Why Diets Often Fail Repeatedly</H2>
      <P>Many diets focus heavily on short term restriction. But repeated behavioural patterns underneath remain unchanged. Examples:</P>
      <UL
        items={[
          "emotional eating still exists",
          "stress coping remains unchanged",
          "routines remain inconsistent",
          "processed foods remain highly rewarding",
          "environments remain the same",
          "automatic eating behaviour continues",
        ]}
      />
      <P>As a result:</P>
      <UL items={["motivation fades", "old patterns return", "consistency collapses", "regain happens again"]} />
      <P>This is one reason many people repeatedly restart weight loss. The problem is often not information. The problem is repeated behavioural reinforcement.</P>
      <P>
        Pattern Awareness builds on{" "}
        <a href="/blog/reality-awareness" className="text-accent hover:underline">Reality Awareness</a> and{" "}
        <a href="/blog/friction-awareness" className="text-accent hover:underline">Friction Awareness</a>, slowing
        people down enough to examine:
      </P>
      <UL
        items={[
          "what repeatedly happens",
          "when it happens",
          "why it happens",
          "what conditions reinforce it",
        ]}
      />
      <P>Because without awareness, patterns continue automatically.</P>

      <H2>Why Pattern Interrupts Matter</H2>
      <P>Patterns continue because they are repeated. Interrupting patterns creates opportunities for behavioural change. Examples of pattern interrupts:</P>
      <UL
        items={[
          "changing eating environments",
          "removing trigger foods",
          "walking after meals",
          "replacing late-night routines",
          "slowing eating speed",
          "planning meals earlier",
          "reducing highly processed foods",
          "interrupting emotional eating triggers consciously",
        ]}
      />
      <P>Small repeated interruptions matter. Because behavioural permanence develops gradually through repetition.</P>
      <P>Many people try to rely on motivation alone. But sustainable consistency usually requires:</P>
      <UL
        items={[
          "awareness",
          "environmental adjustments",
          "repeatable systems",
          "reduced friction",
          "simpler routines",
        ]}
      />
      <P>Pattern Awareness helps identify where interruption is needed most.</P>

      <H2>How LS Diet Uses Pattern Awareness</H2>
      <P>LS Diet focuses heavily on behavioural consistency. Many people already understand:</P>
      <UL items={["calories exist", "processed foods affect appetite", "movement matters"]} />
      <P>But repeated behavioural patterns still overpower temporary motivation. Pattern Awareness helps expose:</P>
      <UL
        items={[
          "emotional eating patterns",
          "stress eating routines",
          "environmental triggers",
          "convenience habits",
          "highly processed food dependence",
          "inconsistency loops",
        ]}
      />
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
          "repeatable routines",
          "awareness training",
          "Action Practice systems",
          "sustainable movement like slow jogging",
        ]}
      />
      <P>The goal is not temporary dieting intensity. The goal is reducing repeated regain through behavioural permanence.</P>
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
