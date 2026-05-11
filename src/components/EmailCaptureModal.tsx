import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loader2, Download } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface EmailCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resourceTitle: string;
  onSubmit: (email: string, firstName: string) => Promise<void>;
  isLoading: boolean;
}

const CONSENT_TEXT = "I agree to receive free resources and educational updates from What About Weight. I can unsubscribe at any time.";

// Shared form component used by both Dialog and Drawer
function EmailCaptureForm({
  resourceTitle,
  onSubmit,
  isLoading,
}: {
  resourceTitle: string;
  onSubmit: (email: string, firstName: string) => Promise<void>;
  isLoading: boolean;
}) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidName = firstName.trim().length > 0;
  const canSubmit = isValidName && isValidEmail && consentChecked && !isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      await onSubmit(email, firstName.trim());
      // Reset form on success
      setFirstName('');
      setEmail('');
      setConsentChecked(false);
    } catch {
      // Error handled by parent
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First name</Label>
        <Input
          id="firstName"
          type="text"
          placeholder="Your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={isLoading}
          autoComplete="given-name"
          maxLength={100}
          required
        />
      </div>

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
  );
}

export function EmailCaptureModal({
  open,
  onOpenChange,
  resourceTitle,
  onSubmit,
  isLoading,
}: EmailCaptureModalProps) {
  const isMobile = useIsMobile();

  const handleFormSubmit = async (email: string, firstName: string) => {
    await onSubmit(email, firstName);
    onOpenChange(false);
  };

  // Mobile/Tablet: Use Drawer with dismissible=false
  if (isMobile) {
    return (
      <Drawer 
        open={open} 
        onOpenChange={onOpenChange}
        dismissible={false}
      >
        <DrawerContent className="px-4 pb-8">
          <DrawerHeader className="text-left">
            <DrawerTitle>Get Your Free Resource</DrawerTitle>
            <DrawerDescription>
              Enter your email to download <span className="font-medium">{resourceTitle}</span>
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <EmailCaptureForm
              resourceTitle={resourceTitle}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Use Dialog (also prevent escape/outside click dismissal)
  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpen) => {
        // Only allow closing programmatically (after form submission)
        // Prevent closing via escape key or clicking outside
        if (!newOpen && open) {
          return; // Block closing
        }
        onOpenChange(newOpen);
      }}
    >
      <DialogContent 
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        // Hide the X close button by using a custom class
        hideCloseButton
      >
        <DialogHeader>
          <DialogTitle>Get Your Free Resource</DialogTitle>
          <DialogDescription>
            Enter your email to download <span className="font-medium">{resourceTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <EmailCaptureForm
          resourceTitle={resourceTitle}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
