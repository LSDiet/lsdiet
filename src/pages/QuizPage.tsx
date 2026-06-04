import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";

const QUIZ_ID = "1ppvQlwpv4RYQlq0zs66";
const QUIZ_SRC = `https://api.leadconnectorhq.com/widget/quiz/${QUIZ_ID}`;
const EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Why You Keep Regaining Weight — LS Diet Quiz",
  description:
    "A 60-second quiz that identifies your weight regain pattern and the next step to stop the cycle.",
  url: "https://lsdiet.com/quiz",
  educationalLevel: "beginner",
  learningResourceType: "Self Assessment",
  about: { "@type": "Thing", name: "Weight Regain Prevention" },
};

export default function QuizPage() {
  useEffect(() => {
    if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return;
    const s = document.createElement("script");
    s.src = EMBED_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Stop Regaining Weight Quiz — LS Diet</title>
        <meta
          name="description"
          content="Take the free 60-second LS Diet quiz to find out why you keep regaining weight and get a personalized next step."
        />
        <link rel="canonical" href="https://lsdiet.com/quiz" />
        <meta property="og:title" content="Stop Regaining Weight Quiz — LS Diet" />
        <meta
          property="og:description"
          content="Find out why the weight keeps coming back. 60-second personalized result."
        />
        <meta property="og:url" content="https://lsdiet.com/quiz" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(quizSchema)}</script>
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container max-w-3xl">
          <header className="text-center mb-8 md:mb-10">
            <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-accent font-semibold mb-3">
              Free 60-Second Quiz
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-normal text-primary leading-tight mb-4">
              Find Out Why You<br />Keep Regaining Weight
            </h1>
            <p className="mt-4 text-xs md:text-sm uppercase tracking-[0.14em] text-muted-foreground/80">
              Free • 100% Private • Instant Result
            </p>
          </header>

          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xl">
            <iframe
              src={QUIZ_SRC}
              id={QUIZ_ID}
              title="LS Diet Quiz"
              scrolling="no"
              style={{ border: "none", width: "100%", minHeight: "600px", display: "block" }}
            />
          </div>
        </div>
      </main>

      <FooterSimple />
    </div>
  );
}
