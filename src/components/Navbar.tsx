import { useState } from "react";
import { Triangle, Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { label: "Weight Problem", href: "/#journey" },
  { label: "Solution", href: "/#method" },
  { label: "Book", href: "/#book" },
  { label: "Free Resources", href: "/free" },
  { label: "Q&A", href: "/qa" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center">
            <Triangle className="w-4 h-4 text-primary fill-primary" />
          </div>
          <span className="text-lg font-semibold text-foreground">Weight Permanence</span>
        </a>
        
        {/* Desktop nav */}
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
        
        <div className="flex items-center gap-2">
          <CartDrawer />
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background border-t border-border">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
