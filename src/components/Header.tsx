import { CartDrawer } from "./CartDrawer";
import { Triangle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center">
            <Triangle className="w-4 h-4 text-primary fill-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">What About Weight</span>
        </a>
        <CartDrawer />
      </div>
    </header>
  );
}
