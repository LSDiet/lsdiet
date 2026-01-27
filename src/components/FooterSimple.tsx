import { Triangle } from "lucide-react";

export function FooterSimple() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full border-2 border-primary flex items-center justify-center">
              <Triangle className="w-3 h-3 text-primary fill-primary" />
            </div>
            <span className="font-semibold text-foreground">Weight Permanence</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NTL Learning Solutions Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
