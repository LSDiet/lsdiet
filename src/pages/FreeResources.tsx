import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  description: 'The smarter, sustainable alternative to No Carb and Keto — lower insulin, burn fat, and still eat real food.',
  filePath: 'Low-Starch Low-Sugar Guide.pdf',
  coverImage: lsCover,
  dedicatedPage: '/ls-diet-guide',
  learningPoints: [
    'Why insulin — not calories — controls fat burning',
    'Why LS beats No Carb and Keto long-term',
    'What to eat across 6 food categories',
    'How to make LS a lifestyle, not a diet'
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
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-5xl">
          {resources.length === 0 ? <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No free resources are published yet. Check back soon!</p>
            </div> : <div className="space-y-16">
              {resources.map((resource, index) => <ResourceCard key={resource.id} resource={resource} index={index} onDownload={handleDownloadClick} isLoading={isLoading} />)}
            </div>}
        </div>
      </main>

      <FooterSimple />

      {selectedResource && <EmailCaptureModal open={modalOpen} onOpenChange={setModalOpen} resourceTitle={selectedResource.title} onSubmit={handleModalSubmit} isLoading={isLoading} />}
    </div>;
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