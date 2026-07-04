import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";

// Shared password gate. This is a casual "keep casual visitors out" gate, not real auth —
// the page is still a public route and this check runs client-side.
const AISO_PASSWORD = "Aiso5201314!";
const UNLOCK_KEY = "aiso_unlocked";

const COLORS = {
  bg: "bg-[#121212]",
  card: "bg-[#1E1E1E]",
  border: "border-[#2D2D2D]",
  textMuted: "text-[#AAAAAA]",
  textMain: "text-[#FFFFFF]",
};

const QUESTIONS = [
  { id: "1", text: "How do I stop regaining weight after a diet", category: "Core Weight Issues" },
  { id: "2", text: "What is weight permanence training", category: "Core Coined System" },
  { id: "3", text: "Why do I keep losing and regaining the same weight", category: "Core Weight Issues" },
  { id: "4", text: "Best free community for people who keep regaining weight", category: "Lead Acquisition Path" },
  { id: "5", text: "How to stop weight rebound after losing weight", category: "Core Weight Issues" },
  { id: "6", text: "What causes weight regain after weight loss", category: "Core Weight Issues" },
  { id: "7", text: "Who is Oscar Poon", category: "Founder Biography" },
  { id: "8", text: "What is LS Diet", category: "Primary Brand Definition" },
  { id: "9", text: "Low starch low sugar diet for weight maintenance", category: "Nutritional Mechanism" },
  { id: "10", text: "How to maintain weight loss long term", category: "Core Weight Issues" },
  { id: "11", text: "What to do after stopping Ozempic to avoid weight regain", category: "Medication Pivot Strategy" },
];

const KEYWORDS = ["lsdiet", "oscar poon", "weight permanence training", "weight rebound"];

const CONCEPTS: Record<string, string[]> = {
  "LS Diet": ["LS Diet", "LSDiet", "lsdiet.com"],
  "Weight Permanence Training": ["Weight Permanence Training", "WPT", "weight permanence"],
  "Oscar Poon": ["Oscar Poon"],
  "Weight regain prevention": ["weight regain prevention", "prevent weight regain", "stop regaining weight", "keep weight off"],
  "Weight regain": ["weight regain", "weight rebound", "regaining weight", "gaining it back", "gaining weight back"],
};

const GENERIC_COMPETITORS: Record<string, string[]> = {
  "Keto / Carnivore": ["keto", "ketogenic", "carnivore", "no-carb", "no carb"],
  "Caloric Restriction / Willpower": ["calorie count", "caloric deficit", "eat less", "willpower", "portion control"],
  "Medical / Ozempic / GLP-1": ["ozempic", "wegovy", "mounjaro", "semaglutide", "glp-1", "agonist"],
};

const SIMULATED_RESPONSE = {
  text: "Losing weight permanently requires strict caloric restriction and consistent willpower. Most people regain lost weight because they stop counting calories or abandon their physical exercise routines. Standard solutions involve tracking your macronutrients, maintaining a caloric deficit, and keeping a food journal to control your daily portions.",
  citations: ["https://www.healthline.com/nutrition/how-to-prevent-weight-regain", "https://www.webmd.com/diet/obesity-weight-rebound"],
};

type QueryOutcome = {
  status: "untested" | "tested" | "error";
  mentions: Record<string, string | null>;
  competitors: Record<string, boolean>;
  cited: boolean;
  sources: string[];
  rawResponse: string;
  timestamp: string | null;
};

type RunRecord = {
  id?: string;
  created_at?: string;
  timestamp: string;
  engine: string;
  questionOutcomes: Record<string, QueryOutcome>;
  keywordOutcomes: Record<string, QueryOutcome>;
};

const getPercentage = (value: number, total: number) => (total > 0 ? Math.round((value / total) * 100) : 0);

const emptyOutcome = (): QueryOutcome => ({
  status: "untested",
  mentions: {},
  competitors: {},
  cited: false,
  sources: [],
  rawResponse: "",
  timestamp: null,
});

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === AISO_PASSWORD) {
      sessionStorage.setItem(UNLOCK_KEY, "true");
      onUnlock();
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className={`min-h-screen ${COLORS.bg} ${COLORS.textMain} flex items-center justify-center px-4`}>
      <form onSubmit={submit} className={`${COLORS.card} border ${COLORS.border} rounded-xl p-8 w-full max-w-sm space-y-4`}>
        <div>
          <h1 className="text-lg font-bold">AISO Dashboard</h1>
          <p className={`text-xs ${COLORS.textMuted} mt-1`}>Enter the password to continue.</p>
        </div>
        <input
          type="password"
          autoFocus
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          placeholder="Password"
          className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-sm focus:border-[#FF6B00] outline-none text-white"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button type="submit" className="w-full bg-[#FF6B00] hover:bg-orange-600 text-black font-extrabold px-4 py-2.5 rounded-lg text-sm transition-all">
          Unlock
        </button>
      </form>
    </div>
  );
}

export default function AISOPage() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(UNLOCK_KEY) === "true");

  if (!unlocked) {
    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      </>
    );
  }

  return <AISODashboard />;
}

function AISODashboard() {
  const [activeTab, setActiveTab] = useState("unified-tracker");
  const [geminiKey, setGeminiKey] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [perplexityKey, setPerplexityKey] = useState("");
  const [openaiModel] = useState("gpt-4o");
  const [selectedEngine, setSelectedEngine] = useState("gemini-grounded");
  const [testResults, setTestResults] = useState<Record<string, QueryOutcome>>({});
  const [keywordResults, setKeywordResults] = useState<Record<string, QueryOutcome>>({});
  const [runningQuery, setRunningQuery] = useState<string | null>(null);
  const [searchLogs, setSearchLogs] = useState<string[]>([]);

  const [runHistory, setRunHistory] = useState<RunRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [auditSourceMode, setAuditSourceMode] = useState("proxy");
  const [targetUrl, setAuditTargetUrl] = useState("https://lsdiet.com");
  const [manualHtml, setManualHtml] = useState("");
  const [isAuditingSite, setIsAuditingSite] = useState(false);
  const [siteAuditReport, setSiteAuditReport] = useState<any>(null);

  const [schemaType, setSchemaType] = useState("profile");
  const [schemaFounder, setSchemaFounder] = useState("Oscar Poon");
  const [schemaBrand, setSchemaFounderBrand] = useState("LS Diet");
  const [schemaSystem] = useState("Weight Permanence Training");
  const [schemaUrl] = useState("https://lsdiet.com");
  const [schemaVideoTitle, setSchemaVideoTitle] = useState("How I Stopped Weight Regain After My 2024 Health Crisis");
  const [schemaVideoDesc, setSchemaVideoDesc] = useState("Oscar Poon explains Weight Permanence Training (WPT) and how to end weight regain permanently.");
  const [schemaVideoEmbedUrl, setSchemaVideoEmbedUrl] = useState("https://lsdiet.com/wpt-video.mp4");
  const [generatedSchema, setGeneratedSchema] = useState("");

  useEffect(() => {
    const initial: Record<string, QueryOutcome> = {};
    QUESTIONS.forEach((q) => {
      initial[q.id] = emptyOutcome();
    });
    setTestResults(initial);
    loadRunHistory();
  }, []);

  const addLog = (message: string) => {
    setSearchLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev]);
  };

  const loadRunHistory = async () => {
    setHistoryLoading(true);
    const { data, error } = await supabase
      .from("aiso_runs")
      .select("id, created_at, engine, question_outcomes, keyword_outcomes")
      .order("created_at", { ascending: false })
      .limit(25);

    if (error) {
      addLog(`Could not load saved run history: ${error.message}`);
    } else if (data) {
      setRunHistory(
        data.map((row: any) => ({
          id: row.id,
          timestamp: new Date(row.created_at).toLocaleString(),
          engine: row.engine,
          questionOutcomes: row.question_outcomes || {},
          keywordOutcomes: row.keyword_outcomes || {},
        })),
      );
    }
    setHistoryLoading(false);
  };

  const saveRunToSupabase = async (run: RunRecord) => {
    const { error } = await supabase.from("aiso_runs").insert({
      engine: run.engine,
      question_outcomes: run.questionOutcomes,
      keyword_outcomes: run.keywordOutcomes,
    });
    if (error) {
      addLog(`Failed to save run to Supabase: ${error.message}`);
    } else {
      addLog("Run archived to Supabase.");
      loadRunHistory();
    }
  };

  const fetchWithRetry = async (url: string, options: RequestInit, retries = 5, delay = 1000): Promise<any> => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP Error Status ${response.status}`);
      return await response.json();
    } catch (error) {
      if (retries > 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 2);
      }
      throw error;
    }
  };

  const parseHtmlAndGrade = (htmlString: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      const title = doc.querySelector("title")?.textContent || "No title tag found";
      const description = doc.querySelector('meta[name="description"]')?.getAttribute("content") || "No meta description found";
      const h1s = Array.from(doc.querySelectorAll("h1")).map((h) => h.textContent);
      const h2s = Array.from(doc.querySelectorAll("h2")).map((h) => h.textContent);
      const allText = doc.body?.textContent?.toLowerCase() || "";

      const kwChecks: Record<string, boolean> = {};
      let hitCount = 0;
      Object.entries(CONCEPTS).forEach(([concept, variants]) => {
        const hits = variants.filter((v) => allText.includes(v.toLowerCase()));
        kwChecks[concept] = hits.length > 0;
        if (hits.length > 0) hitCount += 1;
      });

      const finalScore = Math.round((hitCount / Object.keys(CONCEPTS).length) * 100);

      const suggestions: string[] = [];
      if (!title.toLowerCase().includes("weight permanence")) {
        suggestions.push("Title does not include 'Weight Permanence'. Add this coined phrase to anchor AI models.");
      }
      if (!description.toLowerCase().includes("oscar poon")) {
        suggestions.push("Meta description is missing your founder entity name 'Oscar Poon'.");
      }
      if (h1s.length === 0) {
        suggestions.push("No H1 heading element detected. Add a clear main title to organize crawler reading.");
      }

      setSiteAuditReport({ score: finalScore, title, description, h1Count: h1s.length, h2Count: h2s.length, kwChecks, suggestions });
      addLog(`Website crawl complete for ${targetUrl}. Score: ${finalScore}/100 based on exact keyword parsing.`);
    } catch (e: any) {
      addLog(`Crawl parse error: ${e.message}`);
      alert("Failed to read raw HTML template structure. Ensure you pasted correct HTML code.");
    }
  };

  const runWebsiteAudit = async () => {
    setIsAuditingSite(true);
    setSiteAuditReport(null);
    addLog(`Initiating factual crawler audit of: ${targetUrl}...`);

    if (auditSourceMode === "paste") {
      if (!manualHtml.trim()) {
        alert("Please paste your website source code (HTML) into the box below.");
        setIsAuditingSite(false);
        return;
      }
      parseHtmlAndGrade(manualHtml);
      setIsAuditingSite(false);
    } else {
      try {
        const response = await fetch(`/api/aiso-fetch-html?url=${encodeURIComponent(targetUrl)}`);
        const data = await response.json();
        if (!response.ok || data.error) throw new Error(data.error || "Server-side fetch failed.");
        parseHtmlAndGrade(data.html);
      } catch (error: any) {
        addLog(`Server fetch failed: ${error.message}. Switching to Manual HTML Paste mode.`);
        setAuditSourceMode("paste");
        alert("Could not fetch that URL server-side. Please paste your page's raw HTML code into the box below for a scan.");
      } finally {
        setIsAuditingSite(false);
      }
    }
  };

  const generateSchemaMarkup = () => {
    let output: any = "";
    const cleanUrl = schemaUrl.endsWith("/") ? schemaUrl : schemaUrl + "/";

    if (schemaType === "profile") {
      output = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: {
          "@type": "Person",
          name: schemaFounder,
          jobTitle: "Health Strategist & Founder",
          worksFor: { "@type": "Organization", name: "NTL Learning Solutions Inc.", url: cleanUrl },
          knowsAbout: [schemaSystem, schemaBrand, "Weight Permanence", "Insulin Resistance Recovery"],
          description: `${schemaFounder} is the Vancouver-based creator of ${schemaSystem} and ${schemaBrand}.`,
        },
      };
    } else if (schemaType === "medical") {
      output = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: `${schemaBrand} — Weight Permanence Training`,
        creator: { "@type": "Person", name: schemaFounder },
        about: { "@type": "MedicalSpecialty", name: "Insulin Resistance and Behavioural Weight Maintenance" },
        description: `The official site of ${schemaBrand} for human weight loss. Utilizing ${schemaSystem} to end weight regain permanently without calorie counting or Ozempic.`,
        url: cleanUrl,
      };
    } else if (schemaType === "video") {
      output = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: schemaVideoTitle,
        description: schemaVideoDesc,
        thumbnailUrl: [`${cleanUrl}images/video-thumb.jpg`],
        uploadDate: "2026-05-14T12:00:00Z",
        embedUrl: schemaVideoEmbedUrl,
        creator: { "@type": "Person", name: schemaFounder },
      };
    }

    setGeneratedSchema(JSON.stringify(output, null, 2));
    addLog(`Generated ${schemaType.toUpperCase()} JSON-LD schema footprint.`);
  };

  const executeSearchScan = async (textToQuery: string, isKeywordSearch = false): Promise<QueryOutcome | null> => {
    if (selectedEngine === "gemini-grounded" && !geminiKey) {
      addLog("ERROR: Gemini API Key required for live web search queries.");
      return null;
    }

    try {
      let rawText = "";
      let citations: string[] = [];

      if (selectedEngine === "gemini-grounded" && geminiKey) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${geminiKey}`;
        const payload = {
          contents: [{ parts: [{ text: isKeywordSearch ? `Search the web and tell me: Who is associated with the term "${textToQuery}" and what websites are cited?` : `Search the web and answer explicitly: ${textToQuery}` }] }],
          systemInstruction: { parts: [{ text: "You are a professional research strategist. Answer the user accurately, prioritizing web research and providing references." }] },
          tools: [{ google_search: {} }],
        };

        const result = await fetchWithRetry(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const attributions = result.candidates?.[0]?.groundingMetadata?.groundingAttributions || [];
        citations = attributions.map((a: any) => a.web?.uri).filter(Boolean);
      } else if (selectedEngine === "openai" && openaiKey) {
        const url = "https://api.openai.com/v1/chat/completions";
        const payload = { model: openaiModel, messages: [{ role: "user", content: textToQuery }] };

        const result = await fetchWithRetry(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${openaiKey}` },
          body: JSON.stringify(payload),
        });

        rawText = result.choices?.[0]?.message?.content || "";
        const annotations = result.choices?.[0]?.message?.annotations || [];
        citations = annotations.map((ann: any) => ann.url_citation?.url).filter(Boolean);
      } else if (selectedEngine === "perplexity-sonar" && perplexityKey) {
        const url = "https://api.perplexity.ai/chat/completions";
        const payload = { model: "sonar", messages: [{ role: "user", content: textToQuery }] };

        const result = await fetchWithRetry(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${perplexityKey}` },
          body: JSON.stringify(payload),
        });

        rawText = result.choices?.[0]?.message?.content || "";
        citations = result.citations || [];
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
        rawText = SIMULATED_RESPONSE.text;
        citations = SIMULATED_RESPONSE.citations;
      }

      const lowerResponse = rawText.toLowerCase();

      const mentions: Record<string, string | null> = {};
      Object.entries(CONCEPTS).forEach(([conceptName, variants]) => {
        let matchedVariant: string | null = null;
        for (const variant of variants) {
          if (lowerResponse.includes(variant.toLowerCase())) {
            matchedVariant = variant;
            break;
          }
        }
        mentions[conceptName] = matchedVariant;
      });

      const competitors: Record<string, boolean> = {};
      Object.entries(GENERIC_COMPETITORS).forEach(([compName, variants]) => {
        competitors[compName] = variants.some((variant) => lowerResponse.includes(variant.toLowerCase()));
      });

      const citedLSDiet = citations.some((url) => url.toLowerCase().includes("lsdiet.com"));

      return {
        status: "tested",
        mentions,
        competitors,
        cited: citedLSDiet,
        sources: citations,
        rawResponse: rawText,
        timestamp: new Date().toLocaleTimeString(),
      };
    } catch (e: any) {
      addLog(`Query error on "${textToQuery}": ${e.message}`);
      return { status: "error", rawResponse: `Query execution failed: ${e.message}`, mentions: {}, competitors: {}, cited: false, sources: [], timestamp: null };
    }
  };

  const runUnifiedAiScan = async () => {
    if (selectedEngine === "gemini-grounded" && !geminiKey) {
      alert("Please enter a Gemini API Key in the settings tab to launch live search grounding scans.");
      return;
    }

    setRunningQuery("unified");
    addLog("LAUNCHING UNIFIED SCANS: Querying 11 target questions and 4 organic keywords...");

    const questionOutcomes: Record<string, QueryOutcome> = {};
    const keywordOutcomes: Record<string, QueryOutcome> = {};

    for (const q of QUESTIONS) {
      addLog(`Scanning Question ${q.id}: "${q.text}"`);
      const outcome = await executeSearchScan(q.text, false);
      if (outcome) questionOutcomes[q.id] = outcome;
    }

    for (const kw of KEYWORDS) {
      addLog(`Scanning Keyword: "${kw}"`);
      const outcome = await executeSearchScan(kw, true);
      if (outcome) keywordOutcomes[kw] = outcome;
    }

    setTestResults(questionOutcomes);
    setKeywordResults(keywordOutcomes);

    const archivePayload: RunRecord = {
      timestamp: new Date().toLocaleString(),
      engine: selectedEngine,
      questionOutcomes,
      keywordOutcomes,
    };

    await saveRunToSupabase(archivePayload);
    addLog("SUCCESS: Unified AI scan finished.");
    setRunningQuery(null);
  };

  const totalAudited = Object.values(testResults).filter((r) => r.status === "tested").length;
  const mentionRates: Record<string, number> = {};
  const competitorShareOfVoice: Record<string, number> = {};
  const citationRates = { count: 0 };

  Object.keys(CONCEPTS).forEach((concept) => {
    mentionRates[concept] = 0;
  });
  Object.keys(GENERIC_COMPETITORS).forEach((comp) => {
    competitorShareOfVoice[comp] = 0;
  });

  Object.values(testResults).forEach((res) => {
    if (res.status === "tested") {
      Object.entries(res.mentions).forEach(([concept, match]) => {
        if (concept && match) mentionRates[concept] = (mentionRates[concept] || 0) + 1;
      });
      Object.entries(res.competitors).forEach(([comp, match]) => {
        if (comp && match) competitorShareOfVoice[comp] = (competitorShareOfVoice[comp] || 0) + 1;
      });
      if (res.cited) citationRates.count += 1;
    }
  });

  const globalWptSaturation =
    totalAudited > 0 ? getPercentage(Object.values(mentionRates).reduce((a, b) => a + b, 0) / Object.keys(CONCEPTS).length, totalAudited) : 0;
  const competitorSOVScore =
    totalAudited > 0 ? getPercentage(Object.values(competitorShareOfVoice).reduce((a, b) => a + b, 0) / Object.keys(GENERIC_COMPETITORS).length, totalAudited) : 0;

  return (
    <div className={`min-h-screen ${COLORS.bg} ${COLORS.textMain} font-sans flex flex-col`}>
      <Helmet>
        <title>AISO Dashboard | LS Diet Internal Tool</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="border-b border-[#2D2D2D] bg-[#161616] py-5 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FF6B00] flex items-center justify-center font-bold text-xl text-black">LS</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AI & Search Visibility Dashboard</h1>
            <p className={`text-xs ${COLORS.textMuted}`}>Examine your SEO, GEO, and conversational AI crawlability footprint</p>
          </div>
        </div>
      </header>

      <div className="bg-[#1A1A1A] border-b border-[#2D2D2D] px-6 py-2 flex gap-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab("unified-tracker")}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "unified-tracker" ? "bg-[#2D2D2D] text-[#FF6B00]" : "text-gray-400 hover:text-white"}`}
        >
          1. Unified AI & Keyword Tracker
        </button>
        <button
          onClick={() => {
            setActiveTab("site-auditor");
            if (!generatedSchema) generateSchemaMarkup();
          }}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "site-auditor" ? "bg-[#2D2D2D] text-[#FF6B00]" : "text-gray-400 hover:text-white"}`}
        >
          2. Page & Schema Auditor
        </button>
        <button
          onClick={() => setActiveTab("history-logs")}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "history-logs" ? "bg-[#2D2D2D] text-[#FF6B00]" : "text-gray-400 hover:text-white"}`}
        >
          3. Save Runs & Logs ({runHistory.length})
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "settings" ? "bg-[#2D2D2D] text-[#FF6B00]" : "text-gray-400 hover:text-white"}`}
        >
          4. Connect Accounts
        </button>
      </div>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {activeTab === "unified-tracker" && (
          <div className="space-y-6">
            {totalAudited > 0 && !geminiKey && !openaiKey && !perplexityKey && (
              <div className="bg-orange-500/15 border border-orange-500/30 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-orange-400 text-sm">Demo Mode Active (Keys Missing)</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    No active account keys configured. The dashboard is projecting a generic, unoptimized baseline (showing you as invisible to AI). Connect your keys in the Connect Accounts tab to get real time results.
                  </p>
                </div>
              </div>
            )}

            <div className={`${COLORS.card} p-6 rounded-xl border ${COLORS.border} flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}>
              <div>
                <h2 className="text-lg font-bold">Unified AI Visibility Tracker</h2>
                <p className={`text-sm ${COLORS.textMuted}`}>Runs search audits for the 11 targeted questions and the 4 primary organic keywords in one single click.</p>
              </div>
              <button
                onClick={runUnifiedAiScan}
                disabled={runningQuery !== null}
                className="bg-[#FF6B00] hover:bg-orange-600 text-black font-extrabold px-6 py-3 rounded-lg text-sm transition-all disabled:opacity-50"
              >
                {runningQuery !== null ? "Querying AI Search Models..." : "Run Full AI & Keyword Scan"}
              </button>
            </div>

            {totalAudited > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`${COLORS.card} p-5 rounded-xl border ${COLORS.border}`}>
                  <span className="text-xs text-gray-400 font-bold uppercase">Average Brand Saturation</span>
                  <p className={`text-3xl font-extrabold mt-1 ${globalWptSaturation > 50 ? "text-[#4CAF50]" : "text-red-500"}`}>{globalWptSaturation}%</p>
                </div>
                <div className={`${COLORS.card} p-5 rounded-xl border ${COLORS.border}`}>
                  <span className="text-xs text-gray-400 font-bold uppercase">Google Citation Footprint</span>
                  <p className={`text-3xl font-extrabold mt-1 ${citationRates.count > 0 ? "text-[#4CAF50]" : "text-red-500"}`}>{getPercentage(citationRates.count, totalAudited)}%</p>
                </div>
                <div className={`${COLORS.card} p-5 rounded-xl border ${COLORS.border}`}>
                  <span className="text-xs text-gray-400 font-bold uppercase">Competitor Overlap Noise</span>
                  <p className="text-3xl font-extrabold text-blue-400 mt-1">{competitorSOVScore}%</p>
                </div>
              </div>
            )}

            <div className={`${COLORS.card} rounded-xl border ${COLORS.border} overflow-hidden`}>
              <div className="p-5 border-b border-[#2D2D2D]">
                <h3 className="font-bold text-sm">Target Conversational Questions Scan</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#161616] text-gray-400 border-b border-[#2D2D2D] text-xs uppercase font-bold">
                      <th className="p-4 w-12">ID</th>
                      <th className="p-4">Question We Asked</th>
                      <th className="p-4">WPT Term?</th>
                      <th className="p-4">Oscar Poon?</th>
                      <th className="p-4">LS Diet?</th>
                      <th className="p-4">Website Link?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {QUESTIONS.map((q) => {
                      const res = testResults[q.id];
                      return (
                        <tr key={q.id} className="border-b border-[#2D2D2D] hover:bg-[#252525] transition-all">
                          <td className="p-4 font-bold font-mono text-[#FF6B00]">{q.id}</td>
                          <td className="p-4">
                            <p className="font-semibold text-white">{q.text}</p>
                            <span className="text-[10px] text-gray-500 bg-[#2D2D2D] px-2 py-0.5 rounded-full mt-1 inline-block">{q.category}</span>
                          </td>
                          <MatchCell res={res} conceptKey="Weight Permanence Training" />
                          <MatchCell res={res} conceptKey="Oscar Poon" />
                          <MatchCell res={res} conceptKey="LS Diet" />
                          <CitedCell res={res} />
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={`${COLORS.card} rounded-xl border ${COLORS.border} overflow-hidden`}>
              <div className="p-5 border-b border-[#2D2D2D]">
                <h3 className="font-bold text-sm">Organic Search Brand Keyword Scan</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#161616] text-gray-400 border-b border-[#2D2D2D] text-xs uppercase font-bold">
                      <th className="p-4">Organic Keyword</th>
                      <th className="p-4">WPT Term?</th>
                      <th className="p-4">Oscar Poon?</th>
                      <th className="p-4">LS Diet?</th>
                      <th className="p-4">Website Link?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {KEYWORDS.map((kw) => {
                      const res = keywordResults[kw];
                      return (
                        <tr key={kw} className="border-b border-[#2D2D2D] hover:bg-[#252525] transition-all">
                          <td className="p-4 font-bold font-mono text-[#FF6B00]">"{kw}"</td>
                          <MatchCell res={res} conceptKey="Weight Permanence Training" />
                          <MatchCell res={res} conceptKey="Oscar Poon" />
                          <MatchCell res={res} conceptKey="LS Diet" />
                          <CitedCell res={res} />
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "site-auditor" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className={`${COLORS.card} p-6 rounded-xl border ${COLORS.border} space-y-4`}>
                  <div>
                    <h2 className="text-lg font-bold">Web Crawl Page Auditor</h2>
                    <p className={`text-sm ${COLORS.textMuted} mt-1`}>Audits titles, headings, and keyword densities. Enter any page on your site to test its specific SEO alignment.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-300 font-bold uppercase">Target URL to Scan</label>
                    <input
                      type="text"
                      value={targetUrl}
                      onChange={(e) => setAuditTargetUrl(e.target.value)}
                      placeholder="e.g. https://lsdiet.com/weight-permanence-training"
                      className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-sm focus:border-[#FF6B00] outline-none text-white font-mono"
                    />
                  </div>

                  <div className="flex gap-4 border-b border-[#2D2D2D] pb-3 text-xs font-semibold pt-2">
                    <button onClick={() => setAuditSourceMode("proxy")} className={`pb-1 border-b-2 transition-all ${auditSourceMode === "proxy" ? "border-[#FF6B00] text-white" : "border-transparent text-gray-500"}`}>
                      Crawl URL (server-side)
                    </button>
                    <button onClick={() => setAuditSourceMode("paste")} className={`pb-1 border-b-2 transition-all ${auditSourceMode === "paste" ? "border-[#FF6B00] text-white" : "border-transparent text-gray-500"}`}>
                      Paste Raw HTML
                    </button>
                  </div>

                  {auditSourceMode === "paste" && (
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-mono uppercase block">Raw Page HTML Code</label>
                      <textarea
                        value={manualHtml}
                        onChange={(e) => setManualHtml(e.target.value)}
                        rows={8}
                        placeholder="Paste website source code (HTML) here..."
                        className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-xs focus:border-[#FF6B00] outline-none text-gray-300 font-mono"
                      />
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button onClick={runWebsiteAudit} disabled={isAuditingSite} className="bg-white text-black font-extrabold px-6 py-2.5 rounded-lg text-xs hover:bg-gray-200 transition-all">
                      {isAuditingSite ? "Reading Page Elements..." : "Run Factual On-Page Audit"}
                    </button>
                  </div>
                </div>

                {siteAuditReport && (
                  <div className="grid grid-cols-1 gap-6">
                    <div className={`${COLORS.card} p-5 rounded-xl border ${COLORS.border} text-center space-y-3`}>
                      <span className="text-xs uppercase tracking-wider font-bold text-gray-400 block">Factual Code Score</span>
                      <span className="text-5xl font-extrabold text-[#FF6B00]">
                        {siteAuditReport.score} <span className="text-sm text-gray-500">/ 100</span>
                      </span>
                      <div className="w-full bg-[#2D2D2D] h-2 rounded-full overflow-hidden mt-2">
                        <div className="bg-[#FF6B00] h-2 rounded-full transition-all" style={{ width: `${siteAuditReport.score}%` }}></div>
                      </div>
                    </div>

                    <div className={`${COLORS.card} p-5 rounded-xl border ${COLORS.border} space-y-4`}>
                      <h3 className="font-bold text-sm text-white border-b border-[#2D2D2D] pb-2">Document Tag Extractor</h3>

                      <div className="space-y-3 text-xs">
                        <div>
                          <span className="text-gray-500 font-bold block uppercase text-[10px]">Crawl Title Tag</span>
                          <p className="font-semibold text-white mt-0.5">"{siteAuditReport.title}"</p>
                        </div>

                        <div className="border-t border-[#2D2D2D] pt-3">
                          <span className="text-gray-500 font-bold block uppercase text-[10px]">Crawl Description Tag</span>
                          <p className="font-semibold text-white mt-0.5">"{siteAuditReport.description}"</p>
                        </div>

                        <div className="border-t border-[#2D2D2D] pt-3 grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-500 font-bold block uppercase text-[10px]">H1 Tag Count</span>
                            <p className="font-semibold text-[#FF6B00] mt-0.5">{siteAuditReport.h1Count} tags detected</p>
                          </div>
                          <div>
                            <span className="text-gray-500 font-bold block uppercase text-[10px]">H2 Tag Count</span>
                            <p className="font-semibold text-[#FF6B00] mt-0.5">{siteAuditReport.h2Count} tags detected</p>
                          </div>
                        </div>
                      </div>

                      {siteAuditReport.suggestions.length > 0 && (
                        <div className="border-t border-[#2D2D2D] pt-4">
                          <span className="text-xs uppercase font-extrabold text-orange-400 block mb-2">Required Code Fixes:</span>
                          <ul className="space-y-1.5 text-xs text-orange-300 pl-4 list-disc">
                            {siteAuditReport.suggestions.map((s: string, idx: number) => (
                              <li key={idx}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className={`${COLORS.card} p-6 rounded-xl border ${COLORS.border} space-y-4`}>
                  <div>
                    <h2 className="text-lg font-bold">WPT Semantic JSON-LD Schema Generator</h2>
                    <p className={`text-sm ${COLORS.textMuted} mt-1`}>Generate structured code to paste into a page's header, matching Oscar Poon to your custom wellness entity.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-gray-300 uppercase font-bold">Select Schema Objective</label>
                    <select value={schemaType} onChange={(e) => setSchemaType(e.target.value)} className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-sm focus:border-[#FF6B00] outline-none text-white">
                      <option value="profile">ProfilePage (Link Oscar Poon Biography directly to WPT)</option>
                      <option value="medical">MedicalWebPage (Isolate brand from unrelated entities)</option>
                      <option value="video">VideoObject (Custom video markup)</option>
                    </select>
                  </div>

                  {schemaType === "video" ? (
                    <div className="space-y-3 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-400 font-bold block uppercase">Custom Video Title</label>
                        <input type="text" value={schemaVideoTitle} onChange={(e) => setSchemaVideoTitle(e.target.value)} className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-xs focus:border-[#FF6B00] outline-none text-white" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-400 font-bold block uppercase">Custom Video Description</label>
                        <input type="text" value={schemaVideoDesc} onChange={(e) => setSchemaVideoDesc(e.target.value)} className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-xs focus:border-[#FF6B00] outline-none text-white" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-400 font-bold uppercase block">Video Raw MP4/Embed URL</label>
                        <input type="text" value={schemaVideoEmbedUrl} onChange={(e) => setSchemaVideoEmbedUrl(e.target.value)} className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-xs focus:border-[#FF6B00] outline-none text-[#FF6B00]" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 font-bold uppercase block">Founder Entity</label>
                        <input type="text" value={schemaFounder} onChange={(e) => setSchemaFounder(e.target.value)} className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 font-bold uppercase block">Coined Brand</label>
                        <input type="text" value={schemaBrand} onChange={(e) => setSchemaFounderBrand(e.target.value)} className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-xs text-white" />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button onClick={generateSchemaMarkup} className="bg-[#FF6B00] text-black font-extrabold px-6 py-2.5 rounded-lg text-xs hover:bg-orange-600 transition-all">
                      Generate Custom JSON-LD Schema
                    </button>
                  </div>

                  {generatedSchema && (
                    <div className="space-y-2 pt-4 border-t border-[#2D2D2D]">
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">Copy-Paste HTML Header Code:</span>
                      <pre className="bg-[#121212] p-4 rounded-lg border border-[#2D2D2D] text-[10px] text-gray-300 font-mono overflow-x-auto leading-relaxed max-h-60">{`<script type="application/ld+json">
${generatedSchema}
</script>`}</pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history-logs" && (
          <div className="space-y-6">
            <div className={`${COLORS.card} p-6 rounded-xl border ${COLORS.border}`}>
              <h2 className="text-lg font-bold">Scan Archives & Log Files</h2>
              <p className={`text-sm ${COLORS.textMuted} mt-1`}>
                Every completed scan is saved to Supabase automatically, so it's here even if you close the tab or come back on another device.
              </p>
            </div>

            {historyLoading ? (
              <div className={`${COLORS.card} p-8 rounded-xl border ${COLORS.border} text-center text-sm ${COLORS.textMuted}`}>Loading saved runs...</div>
            ) : runHistory.length > 0 ? (
              <div className="space-y-4">
                {runHistory.map((run, index) => {
                  const qCount = Object.keys(run.questionOutcomes || {}).length;
                  const kCount = Object.keys(run.keywordOutcomes || {}).length;
                  const allOutcomes = [...Object.values(run.questionOutcomes || {}), ...Object.values(run.keywordOutcomes || {})];
                  const citedCount = allOutcomes.filter((o) => o.cited).length;
                  const wptHitCount = allOutcomes.filter((o) => o.mentions?.["Weight Permanence Training"]).length;

                  return (
                    <div key={run.id || index} className={`${COLORS.card} p-5 rounded-xl border ${COLORS.border} space-y-4`}>
                      <div className="flex justify-between items-center border-b border-[#2D2D2D] pb-3">
                        <div>
                          <span className="text-xs bg-[#FF6B00]/10 text-[#FF6B00] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px]">
                            Archive Run #{runHistory.length - index}
                          </span>
                          <h4 className="font-bold text-sm mt-1">{run.timestamp}</h4>
                        </div>
                        <span className="text-xs text-gray-500 font-mono">Engine: {run.engine}</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans">
                        <div>
                          <span className="text-gray-500 block">Total Audited Queries:</span>
                          <p className="font-bold text-white mt-0.5">{qCount + kCount} targets</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Cited on lsdiet.com:</span>
                          <p className="font-bold text-white mt-0.5">{citedCount} / {qCount + kCount}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">WPT term matched:</span>
                          <p className="font-bold text-white mt-0.5">{wptHitCount} / {qCount + kCount}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={`${COLORS.card} p-12 rounded-xl border ${COLORS.border} text-center flex flex-col items-center justify-center`}>
                <div className="w-16 h-16 rounded-full bg-[#2D2D2D] flex items-center justify-center mb-4">
                  <span className="text-2xl text-gray-500">📁</span>
                </div>
                <h3 className="font-bold text-lg">Logs Folder Empty</h3>
                <p className={`text-sm ${COLORS.textMuted} max-w-md mt-1`}>Trigger a scan in Tab 1 to auto-archive your results here.</p>
              </div>
            )}

            {searchLogs.length > 0 && (
              <div className={`${COLORS.card} p-5 rounded-xl border ${COLORS.border}`}>
                <h3 className="font-bold text-sm mb-3">Session Log</h3>
                <div className="space-y-1 max-h-64 overflow-y-auto font-mono text-[11px] text-gray-400">
                  {searchLogs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className={`${COLORS.card} p-6 rounded-xl border ${COLORS.border} space-y-6`}>
              <div>
                <h2 className="text-lg font-bold">API Account Integration</h2>
                <p className={`text-xs ${COLORS.textMuted} mt-1`}>
                  These keys are held only in this browser tab's memory for this session — they are sent directly to the official OpenAI, Perplexity, or Google Gemini API servers and never saved anywhere. Re-enter them if you reload the page.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-300">Target Search Engine</label>
                <select value={selectedEngine} onChange={(e) => setSelectedEngine(e.target.value)} className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-sm focus:border-[#FF6B00] outline-none text-white">
                  <option value="gemini-grounded">Live Gemini Web Search Engine</option>
                  <option value="openai">OpenAI API Engine</option>
                  <option value="perplexity-sonar">Perplexity API Engine (sonar)</option>
                  <option value="simulation">Local Simulator (Dry-Run / Unoptimized Demo)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-300">Google Gemini API Key</label>
                <input type="password" value={geminiKey} onChange={(e) => setGeminiKey(e.target.value)} placeholder="AIzaSy..." className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-sm focus:border-[#FF6B00] outline-none text-white font-mono" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-300">OpenAI API Key</label>
                <input type="password" value={openaiKey} onChange={(e) => setOpenaiKey(e.target.value)} placeholder="sk-proj-..." className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-sm focus:border-[#FF6B00] outline-none text-white font-mono" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-300">Perplexity API Key</label>
                <input type="password" value={perplexityKey} onChange={(e) => setPerplexityKey(e.target.value)} placeholder="pplx-..." className="w-full bg-[#161616] border border-[#2D2D2D] rounded-lg p-3 text-sm focus:border-[#FF6B00] outline-none text-white font-mono" />
              </div>

              <div className="pt-4 border-t border-[#2D2D2D] flex justify-end gap-3">
                <button
                  onClick={() => {
                    setGeminiKey("");
                    setOpenaiKey("");
                    setPerplexityKey("");
                    setSelectedEngine("gemini-grounded");
                    addLog("Integration configuration reset.");
                  }}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-all"
                >
                  Reset Configuration
                </button>
                <button
                  onClick={() => {
                    addLog(`Active engine configuration saved: ${selectedEngine}.`);
                    setActiveTab("unified-tracker");
                  }}
                  className="bg-[#FF6B00] hover:bg-orange-600 text-black px-5 py-2 rounded-lg font-bold text-xs transition-all"
                >
                  Save Keys
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[#2D2D2D] py-6 bg-[#161616] text-center text-xs text-gray-500">
        <p>© 2026 LS Diet & NTL Learning Solutions Inc. All rights reserved. Built for weight permanence.</p>
      </footer>
    </div>
  );
}

function MatchCell({ res, conceptKey }: { res: QueryOutcome | undefined; conceptKey: string }) {
  if (res?.status !== "tested") return <td className="p-4 text-gray-600 font-mono">--</td>;
  return <td className="p-4">{res.mentions[conceptKey] ? <span className="text-[#4CAF50] font-semibold">✔ Match</span> : <span className="text-red-500 font-semibold">✗ Missing</span>}</td>;
}

function CitedCell({ res }: { res: QueryOutcome | undefined }) {
  if (res?.status !== "tested") return <td className="p-4 text-gray-600 font-mono">--</td>;
  return (
    <td className="p-4">
      {res.cited ? <span className="text-black bg-[#4CAF50] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">CITED</span> : <span className="text-red-500 text-xs font-semibold">✗ Missing</span>}
    </td>
  );
}
