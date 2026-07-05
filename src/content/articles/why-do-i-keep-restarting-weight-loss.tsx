import type { Article } from "./types";
import heroImage from "@/assets/blog/why-do-i-keep-restarting-weight-loss-hero.jpg";

const meta: import("./types").ArticleMeta = {
  slug: "why-do-i-keep-restarting-weight-loss",
  title: "Why Do I Keep Restarting Weight Loss?",
  excerpt:
    "Repeated weight regain is often a behavioural permanence problem, not an information problem.",
  metaDescription:
    "Many people repeatedly restart weight loss because the underlying behavioural systems never changed. Learn how LS Diet approaches permanence differently.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "stop-weight-regain",
  topics: [
    "weight-regain",
    "behavioural-permanence",
    "motivation",
    "dieting-psychology",
    "consistency",
  ],
  primaryFoundationSlug:
    "the-weight-permanence-triangle-how-to-stop-regaining-weight",
  relatedFoundationSlugs: [
    "friction-awareness",
    "pattern-awareness",
    "action-practice",
  ],
  heroImage,
  heroImageAlt:
    "Couple embracing at the bottom of a staircase, representing the support that sustains lasting change",
};

function Body() {
  return (
    <>
      <p>
        Repeated weight regain almost never comes from missing information.
        If you've lost the same 20 pounds three or four times, you already
        know what to eat. The real problem is that the underlying behaviour
        never changed. The weight came back the moment life got loud again.
      </p>

      <p>
        This is the restart cycle, and it's one of the central problems
        explored in{" "}
        <a href="/blog/why-people-regain-weight-after-dieting">
          Why People Regain Weight After Dieting
        </a>
        .
      </p>

      <h2>What Does the Restart Cycle Actually Look Like?</h2>

      <p>
        It usually looks like this. Motivation spikes, weight drops, then
        life gets stressful and routines collapse. Old defaults return:
        stress eating, emotional eating, convenience eating. The regain
        begins. The details vary, but the pattern almost never does.
      </p>

      <h2>Why Does Motivation Alone Keep Failing?</h2>

      <p>
        Motivation is reactive. It shows up after embarrassment, after a
        breakup, after a health scare, before vacation, on January 1st. Then
        it leaves. Anything you built on top of it leaves with it.
      </p>

      <p>
        Permanence works differently. The{" "}
        <a href="/weight-permanence-training">Weight Permanence Training™</a>{" "}
        treats motivation as one ingredient, not the whole recipe. It pairs
        motivation with friction reduction, pattern recognition, and
        repeatable practice.
      </p>

      <h2>Why Do You Need Awareness Before You Can Change?</h2>

      <p>
        You can't fix a pattern you can't see. Most people never fully clock
        their own triggers: the time of day, the emotion, the environment,
        the drift after a hard week. Walking through the{" "}
        <a href="/awareness-stages">5 Awareness Stages</a> makes those
        invisible loops visible, especially{" "}
        <a href="/blog/pattern-awareness">pattern awareness</a> and{" "}
        <a href="/blog/friction-awareness">friction awareness</a>.
      </p>

      <h2>Why Does Extreme Dieting Multiply Restarts?</h2>

      <p>
        Crash diets, starvation phases, and brutal exercise blocks produce
        fast results and fragile systems. They collapse under stress, social
        events, fatigue, or emotional pressure. Every collapse trains the
        brain that weight loss is temporary by nature.
      </p>

      <p>
        Sustainable LS eating plus repeatable behaviour, the{" "}
        <a href="/blog/action-practice">Action Practice</a> approach, points
        the opposite direction.
      </p>

      <h2>What Actually Stops the Restart Cycle?</h2>

      <p>
        The real goal isn't another round of weight loss. It's stopping the
        restart cycle for good. That requires more than a diet. It requires
        behavioural permanence.
      </p>

      <p>
        Walk through the full system inside the{" "}
        <a
          href="https://www.skool.com/lsdiet/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          free LS Diet Course
        </a>
        .
      </p>
    </>
  );
}

const article: Article = { meta, Body };
export default article;
