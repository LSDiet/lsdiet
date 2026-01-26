import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/5 mt-20">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-primary" />
            <span className="font-semibold text-foreground">What About Weight</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} What About Weight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
