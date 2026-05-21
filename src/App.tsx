import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import QAPage from "./pages/QAPage";
import FreeResources from "./pages/FreeResources";
import GLP1GuidePage from "./pages/GLP1GuidePage";
import LSDietGuidePage from "./pages/LSDietGuidePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import HealthDisclaimer from "./pages/HealthDisclaimer";
import WhatIsLSDietPage from "./pages/WhatIsLSDietPage";
import WeightPermanenceTrianglePage from "./pages/WeightPermanenceTrianglePage";
import AwarenessStagesPage from "./pages/AwarenessStagesPage";
import AboutOscarPoonPage from "./pages/AboutOscarPoonPage";
import OscarPoonPage from "./pages/OscarPoonPage";
import CoreFAQPage from "./pages/CoreFAQPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ShareRedirectPage from "./pages/ShareRedirectPage";
import CategoryArchivePage from "./pages/CategoryArchivePage";
import PartnersPage from "./pages/PartnersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:handle" element={<ProductDetail />} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/FreeResources" element={<FreeResources />} />
        <Route path="/does-glp-1-work" element={<GLP1GuidePage />} />
        <Route path="/ls-diet-guide" element={<LSDietGuidePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/disclaimer" element={<HealthDisclaimer />} />
        <Route path="/what-is-ls-diet" element={<WhatIsLSDietPage />} />
        <Route path="/weight-permanence-triangle" element={<WeightPermanenceTrianglePage />} />
        <Route path="/awareness-stages" element={<AwarenessStagesPage />} />
        <Route path="/about-oscar-poon" element={<AboutOscarPoonPage />} />
        <Route path="/oscar-poon" element={<OscarPoonPage />} />
        <Route path="/faq" element={<CoreFAQPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/share/:slug" element={<ShareRedirectPage />} />
        <Route path="/category/:slug" element={<CategoryArchivePage />} />
        <Route path="/partners" element={<PartnersPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
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
