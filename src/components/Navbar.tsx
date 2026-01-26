import { Triangle, ShoppingCart } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { label: "My Journey", href: "#journey" },
  { label: "The Method", href: "#method" },
  { label: "The Book", href: "#book" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Triangle className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Weight Permanence</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        <CartDrawer />
      </div>
    </header>
  );
}
