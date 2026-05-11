import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const STORAGE_KEY = 'wp_lead_email';

interface UseLeadCaptureReturn {
  isLoading: boolean;
  hasEmail: boolean;
  storedEmail: string | null;
  captureAndDownload: (email: string, source: string, filePath: string, resourceTitle?: string, firstName?: string) => Promise<void>;
  downloadForReturningUser: (source: string, filePath: string, resourceTitle?: string) => Promise<void>;
}

export function useLeadCapture(): UseLeadCaptureReturn {
  const [isLoading, setIsLoading] = useState(false);
  const storedEmail = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  const hasEmail = !!storedEmail;

  const captureAndDownload = useCallback(async (email: string, source: string, filePath: string, resourceTitle?: string, firstName?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('capture-lead', {
        body: { email, source, filePath, isReturningUser: false, resourceTitle, firstName },
      });

      if (error || !data?.signedUrl) {
        throw new Error(error?.message || 'Failed to process request');
      }

      // Save email to localStorage for returning user flow
      localStorage.setItem(STORAGE_KEY, email.toLowerCase().trim());

      // Open signed URL in new tab to trigger download
      window.open(data.signedUrl, '_blank');

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

  const downloadForReturningUser = useCallback(async (source: string, filePath: string, resourceTitle?: string) => {
    if (!storedEmail) {
      throw new Error('No stored email found');
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('capture-lead', {
        body: { email: storedEmail, source, filePath, isReturningUser: true, resourceTitle },
      });

      if (error || !data?.signedUrl) {
        throw new Error(error?.message || 'Failed to get download URL');
      }

      window.open(data.signedUrl, '_blank');

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
