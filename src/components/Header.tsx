import { CartDrawer } from "./CartDrawer";
import lsDietLogo from "@/assets/lsdiet-logo.png";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src={lsDietLogo} alt="LS Diet logo" className="h-9 w-9 rounded-md object-contain" />
          <span className="text-xl font-bold text-foreground">What About Weight</span>
        </a>
        <CartDrawer />
      </div>
    </header>
  );
}
