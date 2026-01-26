import { Triangle } from "lucide-react";

export function FooterSimple() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Triangle className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Weight Permanence</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Weight Permanence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
