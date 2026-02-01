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
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  const handleDownloadClick = async (resource: Resource) => {
    if (hasEmail) {
      await downloadForReturningUser(resource.id, resource.filePath);
    } else {
      setSelectedResource(resource);
      setModalOpen(true);
    }
  };
  const handleModalSubmit = async (email: string) => {
    if (!selectedResource) return;
    await captureAndDownload(email, selectedResource.id, selectedResource.filePath);
  };
  return <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-5xl">
          <div className="relative text-center mb-12">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
              <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
            </div>

            {/* Badge */}
            <div className="relative inline-flex items-center px-4 py-2 rounded-full bg-accent/15 border border-accent/25 mb-6 opacity-0 animate-fade-in-up">
              <span className="text-sm font-medium text-accent">100% Free</span>
            </div>

            {/* Heading with LS highlight */}
            <h1 className="relative text-3xl md:text-4xl font-serif font-normal text-primary mb-4 opacity-0 animate-fade-in-up animate-delay-100">
              Free Tools for a Low-Starch, Low-Sugar{" "}
              <span className="text-accent">(LS)</span> Lifestyle
            </h1>

          </div>

          {resources.length === 0 ? <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No free resources are published yet. Check back soon!</p>
            </div> : <div className="space-y-16">
              {resources.map(resource => <div key={resource.id} ref={ref} className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                  {/* eBook Cover */}
                  <div className="flex justify-center">
                    <div className="relative animate-float">
                      <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
                      {resource.coverImage ? <img src={resource.coverImage} alt={resource.title} className="relative max-w-sm w-full drop-shadow-2xl rounded-lg" /> : <div className="relative max-w-sm w-full aspect-[3/4] bg-secondary rounded-lg flex items-center justify-center drop-shadow-2xl">
                          <FileText className="w-24 h-24 text-primary/30" />
                        </div>}
                    </div>
                  </div>

                  {/* eBook Info */}
                  <div>
                    
                    
                    <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 text-primary">
                      {resource.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {resource.description}
                    </p>

                    <p className="text-foreground font-medium mb-4">
                      In this short guide, you will learn:
                    </p>

                    <ul className="space-y-3 mb-8">
                      {resource.learningPoints.map(point => <li key={point} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-foreground">{point}</span>
                        </li>)}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button size="lg" className="w-full sm:w-auto px-8 animate-pulse-glow" onClick={() => handleDownloadClick(resource)} disabled={isLoading}>
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
                          <Link to={resource.dedicatedPage}>
                            Read the Full Guide
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>)}
            </div>}
        </div>
      </main>

      <FooterSimple />

      {selectedResource && <EmailCaptureModal open={modalOpen} onOpenChange={setModalOpen} resourceTitle={selectedResource.title} onSubmit={handleModalSubmit} isLoading={isLoading} />}
    </div>;
}