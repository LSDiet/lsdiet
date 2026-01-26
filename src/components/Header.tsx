import { CartDrawer } from "./CartDrawer";
import { Scale } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Scale className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-foreground">What About Weight</span>
        </a>
        <CartDrawer />
      </div>
    </header>
  );
}
