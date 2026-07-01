import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import { useAnalyticsPageviews } from "@/hooks/useAnalyticsPageviews";
import { PrerenderReady } from "@/components/PrerenderReady";
// Home stays eager so SSG prerender captures full HTML synchronously.
import Index from "./pages/Index";

// All other routes lazy-load — keeps article/foundation registries
// (40 articles + 9 foundations with 2 MB hero PNGs each) out of the
// main bundle. Prerendered routes are eager via the prerender script's
// own bundle resolution; in-browser SPA navigation gets the lazy chunks.
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const QAPage = lazy(() => import("./pages/QAPage"));
const FreeResources = lazy(() => import("./pages/FreeResources"));
const GLP1GuidePage = lazy(() => import("./pages/GLP1GuidePage"));
const GLP1ReboundPage = lazy(() => import("./pages/GLP1ReboundPage"));
const LSDietGuidePage = lazy(() => import("./pages/LSDietGuidePage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const HealthDisclaimer = lazy(() => import("./pages/HealthDisclaimer"));
const WhatIsLSDietPage = lazy(() => import("./pages/WhatIsLSDietPage"));
const WeightPermanenceTrainingPage = lazy(() => import("./pages/WeightPermanenceTrainingPage"));
const AwarenessStagesPage = lazy(() => import("./pages/AwarenessStagesPage"));
const AboutOscarPoonPage = lazy(() => import("./pages/AboutOscarPoonPage"));
const OscarPoonPage = lazy(() => import("./pages/OscarPoonPage"));
const CoreFAQPage = lazy(() => import("./pages/CoreFAQPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const ShareRedirectPage = lazy(() => import("./pages/ShareRedirectPage"));
const CategoryArchivePage = lazy(() => import("./pages/CategoryArchivePage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const WeightRegainProfilePage = lazy(() => import("./pages/WeightRegainProfilePage"));
const WeightRegainProfilesPage = lazy(() => import("./pages/WeightRegainProfilesPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AppSalesPage = lazy(() => import("./pages/AppSalesPage"));
const AppPage = lazy(() => import("./pages/AppPage"));
const AppLoginPage = lazy(() => import("./pages/AppLoginPage"));
const AppRegisterPage = lazy(() => import("./pages/AppRegisterPage"));
const AppAdminPage = lazy(() => import("./pages/AppAdminPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

// Minimal fallback — invisible to avoid layout flash on route swap.
const RouteFallback = () => <div className="min-h-screen bg-background" aria-hidden="true" />;

function RouterEffects() {
  useAnalyticsPageviews();
  return null;
}

function AppContent() {
  useCartSync();

  return (
    <BrowserRouter>
      <RouterEffects />
      <PrerenderReady />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/qa" element={<QAPage />} />
          <Route path="/free-resources" element={<FreeResources />} />
          <Route path="/FreeResources" element={<Navigate to="/free-resources" replace />} />
          <Route path="/does-glp-1-work" element={<GLP1GuidePage />} />
          <Route path="/glp-1-rebound-analysis" element={<GLP1ReboundPage />} />
          <Route path="/ls-diet-guide" element={<LSDietGuidePage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/disclaimer" element={<HealthDisclaimer />} />
          <Route path="/what-is-ls-diet" element={<WhatIsLSDietPage />} />
          <Route path="/weight-permanence-training" element={<WeightPermanenceTrainingPage />} />
          <Route path="/awareness-stages" element={<AwarenessStagesPage />} />
          <Route path="/about-oscar-poon" element={<AboutOscarPoonPage />} />
          <Route path="/oscar-poon" element={<OscarPoonPage />} />
          <Route path="/faq" element={<CoreFAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/share/:slug" element={<ShareRedirectPage />} />
          <Route path="/category/:slug" element={<CategoryArchivePage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/weight-regain-profile/:slug" element={<WeightRegainProfilePage />} />
          <Route path="/weight-regain-profiles" element={<WeightRegainProfilesPage />} />
          <Route path="/app" element={<AppSalesPage />} />
          <Route path="/app/login" element={<AppLoginPage />} />
          <Route path="/app/register" element={<AppRegisterPage />} />
          <Route path="/app/chat" element={<AppPage />} />
          <Route path="/app/admin" element={<AppAdminPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}


const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
