import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { FooterSimple } from '@/components/FooterSimple';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmailCaptureModal } from '@/components/EmailCaptureModal';
import { useLeadCapture } from '@/hooks/useLeadCapture';
import { Download, FileText, Loader2 } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  filePath: string; // Path in the free-resources bucket
}

// Define available resources here
// Update filePath values after uploading PDFs to the free-resources bucket
const resources: Resource[] = [];

export default function FreeResources() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const { isLoading, hasEmail, captureAndDownload, downloadForReturningUser } = useLeadCapture();

  const handleDownloadClick = async (resource: Resource) => {
    if (hasEmail) {
      // Returning user - download directly
      await downloadForReturningUser(resource.id, resource.filePath);
    } else {
      // New user - show modal
      setSelectedResource(resource);
      setModalOpen(true);
    }
  };

  const handleModalSubmit = async (email: string) => {
    if (!selectedResource) return;
    await captureAndDownload(email, selectedResource.id, selectedResource.filePath);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Free Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download these free guides to start your journey toward lasting weight balance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Card key={resource.id} className="flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button
                    onClick={() => handleDownloadClick(resource)}
                    disabled={isLoading}
                    className="w-full"
                    variant="outline"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <FooterSimple />

      {selectedResource && (
        <EmailCaptureModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          resourceTitle={selectedResource.title}
          onSubmit={handleModalSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
