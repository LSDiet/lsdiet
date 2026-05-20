import type { Article } from "./types";

const meta: import("./types").ArticleMeta = {
  slug: "what-should-you-eat-for-lunch-to-lose-weight",
  title: "What Should You Eat for Lunch to Lose Weight?",
  excerpt:
    "Lunch becomes much easier when meals are simple, filling, and sustainable enough to repeat consistently.",
  metaDescription:
    "Simple LS meals focused on protein and vegetables may help reduce cravings and improve consistency during busy workdays.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "ls-diet-examples",
  topics: [
    "low-starch-low-sugar",
    "protein",
    "eating-until-full",
    "consistency",
    "cravings",
  ],
  primaryFoundationSlug:
    "why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting",
  relatedFoundationSlugs: ["action-practice", "friction-awareness"],
};

function Body() {
  return (
    <>
      <p>
        Lunch is where most office weight-loss plans quietly fall apart.
        Convenience usually wins — sandwiches, rice bowls, takeout, sugary
        drinks. The fix isn't a better recipe. It's a simpler, more repeatable
        default.
      </p>

      <h2>What an LS Lunch Actually Looks Like</h2>

      <p>
        Most LS lunches lean on the same handful of moves: a real protein, a
        generous pile of vegetables, enough food to actually feel full, and a
        format simple enough to repeat without thinking. Think chicken and
        vegetables, eggs and salad, or a protein bowl built without rice.
      </p>

      <p>
        The goal is sustainability, not perfection — which is the entire point
        of{" "}
        <a href="/blog/why-low-starch-low-sugar-is-more-sustainable-than-extreme-dieting">
          low-starch, low-sugar eating
        </a>
        .
      </p>

      <h2>Simplicity Is a Behavioural Strategy</h2>

      <p>
        Complicated meal systems collapse under stress, fatigue, and long
        workdays. Simple meals reduce behavioural friction — the same friction{" "}
        <a href="/blog/friction-awareness">friction awareness</a> trains you to
        spot in your kitchen, your calendar, and your commute.
      </p>

      <h2>Why Protein Matters So Much Here</h2>

      <p>
        When starch and sugar come down, protein is what keeps you full,
        protects muscle, and quiets the afternoon cravings that usually push
        people back into the vending machine.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        The best lunch isn't the most impressive one. It's the one you can
        actually repeat next Tuesday — and the Tuesday after that. That's
        consistency, and it's exactly what the daily reps inside{" "}
        <a href="/blog/action-practice">Action Practice</a> are designed to
        build.
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
