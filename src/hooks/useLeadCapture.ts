import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const CONSENT_TEXT = "I agree to receive free resources and educational updates from What About Weight. I can unsubscribe at any time.";
const STORAGE_KEY = 'wp_lead_email';

interface UseLeadCaptureReturn {
  isLoading: boolean;
  hasEmail: boolean;
  storedEmail: string | null;
  captureAndDownload: (email: string, source: string, filePath: string) => Promise<void>;
  downloadForReturningUser: (source: string, filePath: string) => Promise<void>;
}

export function useLeadCapture(): UseLeadCaptureReturn {
  const [isLoading, setIsLoading] = useState(false);
  const storedEmail = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  const hasEmail = !!storedEmail;

  const triggerDownload = async (filePath: string): Promise<void> => {
    const { data, error } = await supabase.functions.invoke('get-download-url', {
      body: { filePath },
    });

    if (error || !data?.signedUrl) {
      throw new Error('Failed to get download URL');
    }

    // Open signed URL in new tab to trigger download
    window.open(data.signedUrl, '_blank');
  };

  const captureAndDownload = useCallback(async (email: string, source: string, filePath: string) => {
    setIsLoading(true);
    try {
      // Upsert lead with consent data
      const { error: upsertError } = await supabase
        .from('leads')
        .upsert(
          {
            email: email.toLowerCase().trim(),
            source,
            consent_given: true,
            consent_timestamp: new Date().toISOString(),
            consent_text: CONSENT_TEXT,
            download_count: 1,
            last_download_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        );

      if (upsertError) {
        console.error('Lead capture error:', upsertError);
        throw new Error('Failed to save your information');
      }

      // Save email to localStorage for returning user flow
      localStorage.setItem(STORAGE_KEY, email.toLowerCase().trim());

      // Get signed URL and download
      await triggerDownload(filePath);

      toast({
        title: "Download started!",
        description: "Your PDF is downloading. Check your downloads folder.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const downloadForReturningUser = useCallback(async (source: string, filePath: string) => {
    if (!storedEmail) {
      throw new Error('No stored email found');
    }

    setIsLoading(true);
    try {
      // First get current download count
      const { data: leadData } = await supabase
        .from('leads')
        .select('download_count')
        .eq('email', storedEmail)
        .single();

      // Update download count for returning user
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          download_count: (leadData?.download_count || 0) + 1,
          last_download_at: new Date().toISOString(),
        })
        .eq('email', storedEmail);

      // Don't throw on update error - still allow download
      if (updateError) {
        console.warn('Failed to update download count:', updateError);
      }

      await triggerDownload(filePath);

      toast({
        title: "Download started!",
        description: "Your PDF is downloading. Check your downloads folder.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [storedEmail]);

  return {
    isLoading,
    hasEmail,
    storedEmail,
    captureAndDownload,
    downloadForReturningUser,
  };
}
