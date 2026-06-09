import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import lsDietLogo from "@/assets/lsdiet-wordmark.png";

type NavLink = {
  label: string;
  href?: string;
  highlight?: boolean;
  children?: { label: string; href: string; external?: boolean }[];
};

const navLinks: NavLink[] = [
  { label: "Weight Problem", href: "/#journey" },
  { label: "Solution", href: "/#method" },
  { label: "Free Resources", href: "/free-resources" },
  { label: "Quiz", href: "/quiz" },
  { label: "Blog", href: "/blog" },
  {
    label: "Start Here",
    highlight: true,
    children: [
      { label: "START YOUR FREE TRAINING TODAY (Free)", href: "https://www.skool.com/lsdiet/about", external: true },
      { label: "Weight Permanence Toolbook", href: "https://book.lsdiet.com/", external: true },
    ],
  },
  { label: "Become a Partner", href: "/partners" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(0_0%_6%)] border-b border-[hsl(0_0%_18%)]">
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <img src={lsDietLogo} alt="LSDiet logo" className="h-12 md:h-14 w-auto object-contain" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-accent/90 font-semibold">
            Stop Regaining Weight
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div key={link.label} className="relative group">
                  <button
                    className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] transition-colors nav-link-hover ${
                      link.highlight
                        ? "text-accent text-sm animate-bounce-subtle animate-pulse-glow rounded-md px-3 py-1.5"
                        : "text-[hsl(0_0%_56%)] hover:text-[hsl(0_0%_96%)]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="min-w-[260px] bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_18%)] rounded-md shadow-xl overflow-hidden">
                      {link.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          rel={child.external ? "noopener noreferrer" : undefined}
                          className="block px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[hsl(0_0%_80%)] hover:text-accent hover:bg-[hsl(0_0%_12%)] transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.12em] transition-colors nav-link-hover text-[hsl(0_0%_56%)] hover:text-[hsl(0_0%_96%)]"
              >
                {link.label}
              </a>
            );
          })}
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
            {navLinks.map((link) => {
              if (link.children) {
                const open = mobileSubOpen === link.label;
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileSubOpen(open ? null : link.label)}
                      className={`w-full flex items-center justify-between py-2.5 text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${
                        link.highlight
                          ? "text-accent text-base animate-pulse-glow rounded-md px-3"
                          : "text-[hsl(0_0%_56%)] hover:text-[hsl(0_0%_96%)]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && (
                      <div className="pl-4 flex flex-col">
                        {link.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            target={child.external ? "_blank" : undefined}
                            rel={child.external ? "noopener noreferrer" : undefined}
                            className="py-2 text-sm font-medium text-[hsl(0_0%_75%)] hover:text-accent"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold uppercase tracking-[0.1em] py-2.5 transition-colors text-[hsl(0_0%_56%)] hover:text-[hsl(0_0%_96%)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
