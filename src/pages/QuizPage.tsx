import { useEffect, useState } from "react";
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

function QuizSkeleton() {
  return (
    <div className="p-6 md:p-10 space-y-6 animate-pulse">
      <div className="space-y-3">
        <div className="h-3 w-24 rounded bg-muted" />
        <div className="h-5 w-3/4 rounded bg-muted" />
      </div>
      <div className="space-y-3 pt-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 rounded-full bg-muted flex-shrink-0" />
            <div className="h-4 rounded bg-muted" style={{ width: `${55 + i * 8}%` }} />
          </div>
        ))}
      </div>
      <div className="pt-4 flex justify-end">
        <div className="h-9 w-24 rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function QuizPage() {
  const [loaded, setLoaded] = useState(false);

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
            {!loaded && <QuizSkeleton />}
            <iframe
              src={QUIZ_SRC}
              id={QUIZ_ID}
              title="LS Diet Quiz"
              scrolling="no"
              onLoad={() => setLoaded(true)}
              style={{
                border: "none",
                width: "100%",
                minHeight: "600px",
                display: loaded ? "block" : "none",
              }}
            />
          </div>
        </div>
      </main>

      <FooterSimple />
    </div>
  );
}
