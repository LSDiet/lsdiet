import { useState } from "react";
import { Menu, X } from "lucide-react";
import lsDietLogo from "@/assets/lsdiet-wordmark.png";

const navLinks = [
  { label: "Weight Problem", href: "/#journey" },
  { label: "Solution", href: "/#method" },
  { label: "Free Resources", href: "/FreeResources", highlight: true },
  { label: "Q&A", href: "/qa" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(0_0%_6%/0.95)] backdrop-blur supports-[backdrop-filter]:bg-[hsl(0_0%_6%/0.8)] border-b border-[hsl(0_0%_18%)]">
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <img src={lsDietLogo} alt="LSDiet logo" className="h-12 md:h-14 w-auto object-contain" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-accent/90 font-semibold">
            Stop Restarting Weight Loss
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-[0.12em] transition-colors nav-link-hover ${
                link.highlight
                  ? "text-accent text-sm animate-bounce-subtle animate-pulse-glow"
                  : "text-[hsl(0_0%_56%)] hover:text-[hsl(0_0%_96%)]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[hsl(0_0%_96%)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[hsl(0_0%_6%)] border-t border-[hsl(0_0%_18%)]">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-[0.1em] py-2.5 transition-colors ${
                  link.highlight
                    ? "text-accent text-base animate-pulse-glow"
                    : "text-[hsl(0_0%_56%)] hover:text-[hsl(0_0%_96%)]"
                }`}
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
