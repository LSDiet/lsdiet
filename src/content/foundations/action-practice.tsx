// Foundation pillar — code-managed (NOT Contentful).
// canonicalTopic: action-practice-examples | subTopic: action-practice
// Implementation pillar of the Weight Permanence Training™.
import featuredImage from "@/assets/foundations/action-practice-classroom.png";
import skoolCard from "@/assets/foundations/action-practice-skool-card.png";
import consistencyRewards from "@/assets/foundations/action-practice-consistency-rewards.png";
import unlockAccountability from "@/assets/foundations/action-practice-unlock-accountability.png";
import mapQuote from "@/assets/foundations/action-practice-map-quote.png";
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
  order: 3.6,
  excerpt:
    "Awareness creates direction, but Action Practice is what turns consistency into real behavioural change.",
  metaDescription:
    "Action Practice is the implementation stage of the Weight Permanence Training™. Learn how repeatable daily systems, environmental design, and accountability help stop weight regain long term.",
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
      a: "Action Practice is the implementation stage of the Weight Permanence Training™. It focuses on repeatable behavioural systems and sustainable daily routines.",
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
      <Lead>Awareness creates direction. Practice is what actually changes behaviour.</Lead>
      <P>
        Action Practice is the implementation stage of the{" "}
        <a href="/blog/the-weight-permanence-triangle-how-to-stop-regaining-weight" className="text-accent hover:underline">
          Weight Permanence Training™
        </a>
        . It's where awareness becomes behaviour, not through motivation or willpower,
        but through deliberate, repeatable daily practice.
      </P>
      <P>
        You can understand exactly why you regain weight, identify the patterns driving it,
        feel the full cost of staying the same, and have a clear picture of who you want
        to become, and still not change. None of that is implementation.
        Understanding and doing are two completely different things.
      </P>

      <H2>What Is Action Practice?</H2>
      <P>
        Action Practice is a set of daily behavioural modules built on one principle:
        consistency beats intensity, every time. The people who make permanent change
        are not the ones who try the hardest for the shortest time. They're the ones
        who practise the right things repeatedly until those things become automatic.
      </P>
      <P>
        Each module targets a specific behaviour pattern identified in the awareness stages:
      </P>
      <UL
        items={[
          "interrupting emotional eating triggers before they fire",
          "redesigning environments that produce automatic overeating",
          "building decision routines that don't depend on willpower",
          "making the low-starch, low-sugar approach repeatable without overthinking it",
          "practising the identity-based responses that align with who you're becoming",
        ]}
      />
      <P>
        The modules are available free inside the LS Diet Skool community. They take
        minutes to complete and are designed to stack, each one building on the last
        until the behaviour stops requiring conscious effort.
      </P>

      <H2>What Can You Expect Inside the Skool Classroom?</H2>
      <P>
        Action Practice is the behavioural training arm of the LS Diet program, and it
        lives inside{" "}
        <a
          href="https://www.skool.com/lsdiet/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Skool.com/LSDiet
        </a>
        . It is a self-paced library, not a locked drip sequence. You join, you see
        every module, and you start wherever your own awareness work says you need
        to start. New modules get added most weeks, so the library keeps growing
        after you join.
      </P>
      <P>
        Some modules target the mental side of change: interrupting the
        self-licensing effect that lets one good choice justify a bad one, identifying
        the triggers and environmental cues behind a pattern, and learning to respond
        instead of react in the moment a craving actually hits.
      </P>
      <P>
        Others rebuild the physical environment around you: restructuring your food
        environment, reducing decision friction, reading a label correctly, and
        building LS meals you can repeat without thinking. A few modules cover daily
        physiology most people ignore, including how much water to drink, walking 30
        minutes after waking, and stopping at the first burp instead of the point of
        discomfort.
      </P>
      <P>
        The rest work on identity and consistency directly: measuring weight in time
        rather than a single number on the scale, telling the difference between
        emotional and functional eating, tracking progress with LS pictures instead
        of the scale alone, and building the mindset modules like gratitude training
        and mastering the loser lifestyle that keep you showing up after the
        motivation fades.
      </P>
      <P>
        You don't need to finish the whole library before it works. Pick the module
        that matches the pattern you're stuck in right now, do it, and move to the
        next one when you're ready.
      </P>

      <H2>Why Isn't Awareness Alone Enough to Stop Weight Regain?</H2>
      <P>
        The five{" "}
        <a href="/awareness-stages" className="text-accent hover:underline">
          Awareness Stages
        </a>{" "}
        build a complete picture: where you are (
        <a href="/blog/reality-awareness" className="text-accent hover:underline">
          Reality
        </a>
        ), what's stopping you (
        <a href="/blog/friction-awareness" className="text-accent hover:underline">
          Friction
        </a>
        ), what keeps repeating (
        <a href="/blog/pattern-awareness" className="text-accent hover:underline">
          Pattern
        </a>
        ), what it's costing you (
        <a href="/blog/consequence-awareness" className="text-accent hover:underline">
          Consequence
        </a>
        ), and who you're choosing to become (
        <a href="/blog/identity-awareness" className="text-accent hover:underline">
          Identity
        </a>
        ).
      </P>
      <P>
        But awareness is a map, not a destination. The map tells you where to go.
        Action Practice is the walking. Without it, awareness becomes a sophisticated
        way of understanding why you're stuck, but you stay stuck.
      </P>
      <Figure
        src={mapQuote}
        alt="Quote graphic: Awareness is a map, not a destination. The map tells you where to go. Action Practice is the walking."
        caption="lsdiet.com/blog"
      />
      <P>
        Here is the most common failure mode in weight loss programs: people learn,
        feel motivated, then life intervenes and behaviour defaults back to automatic.
        Action Practice is specifically designed to interrupt that default.
      </P>

      <H2>Why Does a System Beat Willpower?</H2>
      <P>
        Willpower is finite. It depletes across the day. Every decision you make, at
        work, in traffic, in relationships, draws from the same pool. By the time
        you're making food decisions in the evening, that pool is often nearly empty.
      </P>
      <P>
        Systems don't deplete. A well-designed routine runs on habit, not decision.
        Once you've practised a behaviour enough times that it becomes automatic,
        it no longer requires willpower to execute. It just happens, the same way
        brushing your teeth happens, regardless of how tired or stressed you are.
      </P>
      <P>
        Action Practice builds those systems deliberately. Instead of trying to
        out-discipline your patterns, you replace them with new ones that serve you better.
      </P>

      <H2>Why Does Consistency Require Environmental Design?</H2>
      <P>
        Your environment is constantly making decisions for you. The food in your
        kitchen, the route you drive, the habits of the people you eat with are not
        neutral. They're inputs that produce predictable outputs.
      </P>
      <P>
        Trying to maintain healthy behaviour in an environment designed to produce
        unhealthy behaviour is like trying to stay dry while standing in the rain.
        The effort is real, but the environment is working against you. Action Practice
        includes environmental redesign as a core component, not an afterthought.
      </P>
      <P>
        Small environmental changes compound. When the default choice is the better
        choice, you stop needing to fight for consistency. You just live in an
        environment that makes consistency easier.
      </P>

      <H2>How Does Daily Repetition Build a New Identity?</H2>
      <P>
        Every time you practise a behaviour that aligns with the identity you're
        building in{" "}
        <a href="/blog/identity-awareness" className="text-accent hover:underline">
          Identity Awareness
        </a>
        , you cast a vote for that identity. One vote doesn't change much. But
        repeated votes, daily practice over weeks and months, fundamentally shift
        how you see yourself.
      </P>
      <P>
        You don't decide to be a healthy person once and maintain it forever through
        discipline. You practise being a healthy person daily until that's just who
        you are. The practice creates the identity. The identity makes the behaviour
        feel natural.
      </P>

      <H2>How Does Action Practice Connect to the LS Diet?</H2>
      <P>
        The{" "}
        <a href="/what-is-ls-diet" className="text-accent hover:underline">
          LS Diet low-starch, low-sugar approach
        </a>{" "}
        dramatically reduces the decision load around food. When cravings are lower
        and meals are simpler, the behavioural work becomes easier. Action Practice
        is built on top of that foundation, using the reduced friction of LS eating
        to make the daily practice of new behaviour more sustainable.
      </P>
      <P>
        The two systems reinforce each other: better food decisions reduce the cravings
        and energy swings that make behaviour change difficult, and consistent Action
        Practice makes the food decisions easier to maintain long term.
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
        Start the daily practice free:{" "}
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
