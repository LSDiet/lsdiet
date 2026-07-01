import type { ArticleMeta, Article } from "./types";

const meta: ArticleMeta = {
  slug: "how-weight-loss-changes-confidence-and-social-behaviour",
  title: "How Weight Loss Changes Confidence and Social Behaviour",
  excerpt:
    "Weight loss often changes how people feel, move, communicate, and socially engage with others.",
  metaDescription:
    "Weight loss often changes confidence, body language, and social behaviour. Learn how behavioural changes influence workplace and social interactions.",
  publishDate: "2026-05-20",
  updatedAt: "2026-05-20",
  canonicalTopic: "awareness-stages",
  topics: [
    "confidence",
    "identity",
    "social-behaviour",
    "workplace-confidence",
    "behavioural-change",
  ],
  primaryFoundationSlug: "identity-awareness",
  relatedFoundationSlugs: [
    "consequence-awareness",
    "the-weight-permanence-triangle-how-to-stop-regaining-weight",
  ],
};

function Body() {
  return (
    <>
      <p>
        People notice the body change first, but the more interesting shift
        is behavioural. Eye contact lasts longer. Posture opens up. There's
        more participation in conversations and less hesitation to be seen.
        Others respond to that confidence, not the scale.
      </p>

      <h2>Small Movements Compound Into Big Signals</h2>

      <p>
        When someone is significantly overweight, ordinary movements carry
        friction — pushing off your legs to stand, avoiding stairs, opting
        out of social moments to dodge attention. As friction drops, that
        avoidance quietly turns into approach behaviour, and the
        psychological dividends compound.
      </p>

      <h2>Why Identity Sits at the Centre</h2>

      <p>
        The{" "}
        <a href="/weight-permanence-training">Weight Permanence Training™</a>{" "}
        treats long term behaviour change as an identity problem before it's
        a food problem. When you start seeing yourself differently,
        communication, social behaviour, and emotional stability shift
        downstream — which is exactly the work inside{" "}
        <a href="/blog/identity-awareness">identity awareness</a>.
      </p>

      <h2>Confidence Is Built, Not Found</h2>

      <p>
        Real confidence usually shows up as a side effect of self-trust —
        and self-trust is built from repeated action you actually follow
        through on. That's why the daily reps inside{" "}
        <a href="/blog/action-practice">Action Practice</a> matter more than
        any single motivational moment. Recognising the long term cost of
        not changing is the territory of{" "}
        <a href="/blog/consequence-awareness">consequence awareness</a>, and
        it's often what makes the identity shift stick.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        Weight loss can boost confidence. Sustainable confidence comes from
        consistency, behavioural reinforcement, and a new identity that
        survives a bad week.
      </p>

      <p>
        See the full system inside the{" "}
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
