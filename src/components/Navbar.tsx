import { Triangle, ShoppingCart } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { label: "The Weight Problem", href: "/#journey" },
  { label: "The Solution", href: "/#method" },
  { label: "The Book", href: "/#book" },
  { label: "Q&A", href: "/qa" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center">
            <Triangle className="w-4 h-4 text-primary fill-primary" />
          </div>
          <span className="text-lg font-semibold text-foreground">Weight Permanence</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors nav-link-hover"
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
