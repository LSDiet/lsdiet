import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { FooterSimple } from '@/components/FooterSimple';
import { Button } from '@/components/ui/button';
import { EmailCaptureModal } from '@/components/EmailCaptureModal';
import { useLeadCapture } from '@/hooks/useLeadCapture';
import { Download, FileText, Loader2, Check, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import glp1Cover from '@/assets/ebook-glp1-cover.png';
import lsCover from '@/assets/ebook-ls-cover.jpg';

interface Resource {
  id: string;
  title: string;
  description: string;
  filePath: string;
  coverImage?: string;
  learningPoints: string[];
  dedicatedPage?: string; // Optional link to dedicated SEO page
}

// Define available resources here
const resources: Resource[] = [{
  id: 'ebook-ls-diet-guide',
  title: 'Low Starch, Low Sugar = Burn Fat',
  description: 'The flexible, sustainable alternative to restrictive No Carb diet — lower insulin, burn fat, and still eat happily.',
  filePath: 'Low-Starch Low-Sugar Guide.pdf',
  coverImage: lsCover,
  dedicatedPage: '/ls-diet-guide',
  learningPoints: [
    'How insulin controls fat burning',
    'Why LS beats No Carb diet long-term',
    'What to eat across 6 food categories',
    'How to make LS a lifestyle'
  ]
}, {
  id: 'ebook-glp1-weight-loss',
  title: 'Does GLP-1 Work for Weight Loss?',
  description: 'Why GLP-1 (e.g., Ozempic) works, why weight often returns, and what actually determines long-term results.',
  filePath: 'Does GLP-1 work for weight loss.pdf',
  coverImage: glp1Cover,
  dedicatedPage: '/does-glp-1-work',
  learningPoints: ['What GLP-1 actually does in the body and brain', 'Why most people regain weight after stopping medication', 'How to use the GLP-1 window to build lasting change']
}];
export default function FreeResources() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const {
    isLoading,
    hasEmail,
    captureAndDownload,
    downloadForReturningUser
  } = useLeadCapture();
  const handleDownloadClick = async (resource: Resource) => {
    if (hasEmail) {
      await downloadForReturningUser(resource.id, resource.filePath);
    } else {
      setSelectedResource(resource);
      setModalOpen(true);
    }
  };
  const handleModalSubmit = async (email: string, firstName: string) => {
    if (!selectedResource) return;
    await captureAndDownload(email, selectedResource.id, selectedResource.filePath, undefined, firstName);
  };
  return <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Free LS Diet Resources | Low-Starch & GLP-1 Guides</title>
        <meta
          name="description"
          content="Download free LS Diet guides: the Low-Starch Low-Sugar guide for sustainable fat loss, and the GLP-1 guide explaining why weight returns after Ozempic and how to prevent it."
        />
        <link rel="canonical" href="https://lsdiet.com/free-resources" />
        <meta property="og:title" content="Free LS Diet Resources" />
        <meta property="og:description" content="Free downloadable guides on the Low-Starch Low-Sugar lifestyle and GLP-1 weight loss." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lsdiet.com/free-resources" />
      </Helmet>
      <Navbar />
      
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-5xl">
          {resources.length === 0 ? <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No free resources are published yet. Check back soon!</p>
            </div> : <div className="space-y-16">
              <QuizCard />
              {resources.map((resource, index) => <ResourceCard key={resource.id} resource={resource} index={index + 1} onDownload={handleDownloadClick} isLoading={isLoading} />)}
            </div>}
        </div>
      </main>

      <FooterSimple />

      {selectedResource && <EmailCaptureModal open={modalOpen} onOpenChange={setModalOpen} resourceTitle={selectedResource.title} onSubmit={handleModalSubmit} isLoading={isLoading} />}
    </div>;
}

function QuizCard() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-8 items-center transition-all duration-700 opacity-100 translate-y-0`}>
      <div className="flex justify-center">
        <div className="relative animate-float">
          <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
          <div className="relative max-w-[260px] md:max-w-xs w-full aspect-[3/4] rounded-lg flex flex-col items-center justify-center bg-gradient-to-br from-accent/90 to-accent text-accent-foreground p-8 drop-shadow-2xl">
            <span className="text-xs uppercase tracking-[0.18em] font-semibold mb-3 opacity-90">Free 60-Second Quiz</span>
            <span className="text-2xl font-serif font-normal text-center leading-tight">Weight Regain Profile</span>
          </div>
        </div>
      </div>
      <div>
        <span className="inline-block text-xs uppercase tracking-[0.16em] font-semibold text-accent mb-3">Free 60-Second Quiz</span>
        <h2 className="text-2xl md:text-3xl font-serif font-normal mb-3 text-primary leading-tight">
          Why does my weight <br />keep coming back?
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-5 leading-relaxed whitespace-pre-line">
          Find out your{"\n"}Weight Regain Profile
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="w-full sm:w-auto px-8 animate-pulse-glow" asChild>
            <a href="/quiz">
              Take the Quiz
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ resource, index, onDownload, isLoading }: { resource: Resource; index: number; onDownload: (r: Resource) => void; isLoading: boolean }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-8 items-center transition-all duration-700 ${index === 0 || isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* eBook Cover */}
      <div className="flex justify-center">
        <div className="relative animate-float">
          <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
          {resource.coverImage ? <img src={resource.coverImage} alt={resource.title} className="relative max-w-[260px] md:max-w-xs w-full drop-shadow-2xl rounded-lg" /> : <div className="relative max-w-xs w-full aspect-[3/4] bg-secondary rounded-lg flex items-center justify-center drop-shadow-2xl">
              <FileText className="w-24 h-24 text-primary/30" />
            </div>}
        </div>
      </div>

      {/* eBook Info */}
      <div>
        <h2 className="text-2xl md:text-3xl font-serif font-normal mb-3 text-primary leading-tight">
          {resource.title}
        </h2>
        
        <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
          {resource.description}
        </p>

        <p className="text-sm text-foreground font-medium mb-3">
          In this short guide, you will learn:
        </p>

        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-5">
          {resource.learningPoints.map(point => <li key={point} className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm text-foreground leading-snug">{point}</span>
            </li>)}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="w-full sm:w-auto px-8 animate-pulse-glow" onClick={() => onDownload(resource)} disabled={isLoading}>
            {isLoading ? <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Loading...
              </> : <>
                <Download className="w-4 h-4 mr-2" />
                Download the Free Guide
              </>}
          </Button>
          
          {resource.dedicatedPage && (
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href={resource.dedicatedPage}>
                Read the Full Guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}