import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loader2, Download } from 'lucide-react';

interface EmailCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resourceTitle: string;
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
}

const CONSENT_TEXT = "I agree to receive free resources and educational updates from What About Weight. I can unsubscribe at any time.";

export function EmailCaptureModal({
  open,
  onOpenChange,
  resourceTitle,
  onSubmit,
  isLoading,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = isValidEmail && consentChecked && !isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      await onSubmit(email);
      // Reset form on success
      setEmail('');
      setConsentChecked(false);
      onOpenChange(false);
    } catch {
      // Error handled by parent
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Your Free Resource</DialogTitle>
          <DialogDescription>
            Enter your email to download <span className="font-medium">{resourceTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
              required
            />
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent"
              checked={consentChecked}
              onCheckedChange={(checked) => setConsentChecked(checked === true)}
              disabled={isLoading}
            />
            <Label 
              htmlFor="consent" 
              className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
            >
              {CONSENT_TEXT}
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
