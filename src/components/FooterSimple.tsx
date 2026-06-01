import { Link } from "react-router-dom";
import lsDietLogo from "@/assets/lsdiet-logo.png";

const learnLinks = [
  { label: "Why People Regain Weight", href: "/blog/why-people-regain-weight-after-dieting" },
  { label: "What Is LS Diet?", href: "/what-is-ls-diet" },
  { label: "Weight Permanence Triangle™", href: "/weight-permanence-triangle" },
  { label: "5 Awareness Stages", href: "/awareness-stages" },
  { label: "About Oscar Poon", href: "/oscar-poon" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
];

export function FooterSimple() {
  return (
    <footer className="py-10 border-t border-[hsl(0_0%_14%)] bg-[hsl(0_0%_4%)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img src={lsDietLogo} alt="LS Diet logo" className="w-7 h-7 rounded-md object-contain" />
              <span className="text-sm font-bold uppercase tracking-[0.1em] text-[hsl(0_0%_80%)]">
                LS Diet
              </span>
            </div>
            <p className="text-xs text-[hsl(0_0%_50%)] leading-relaxed max-w-xs">
              A low-starch, low-sugar lifestyle system for permanent weight loss. Founded by Oscar Poon.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-3">Learn</p>
            <ul className="space-y-2">
              {learnLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-xs text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-3">Connect</p>
            <ul className="space-y-2">
              <li>
                <a href="https://www.skool.com/lsdiet/about" target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors">LS Diet Course (Skool)</a>
              </li>
              <li>
                <a href="https://www.youtube.com/@JoinLSDiet" target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors">YouTube (@JoinLSDiet)</a>
              </li>
              <li>
                <a href="https://www.facebook.com/JoinLSDiet" target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors">Facebook (@JoinLSDiet)</a>
              </li>
              <li>
                <a href="https://www.instagram.com/joinlsdiet/" target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors">Instagram (@joinlsdiet)</a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@joinlsdiet" target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors">TikTok (@joinlsdiet)</a>
              </li>
              <li>
                <a href="https://x.com/JoinLSDiet" target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors">X (@JoinLSDiet)</a>
              </li>
              <li>
                <a href="mailto:info@LSDiet.com" className="text-xs text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors">info@LSDiet.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[hsl(0_0%_12%)]">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[hsl(0_0%_44%)]">
            <Link to="/privacy" className="hover:text-[hsl(0_0%_70%)] transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline">·</span>
            <Link to="/terms" className="hover:text-[hsl(0_0%_70%)] transition-colors">Terms of Use</Link>
            <span className="hidden sm:inline">·</span>
            <Link to="/disclaimer" className="hover:text-[hsl(0_0%_70%)] transition-colors">Health Disclaimer</Link>
          </div>
          <p className="text-xs text-[hsl(0_0%_36%)]">
            © {new Date().getFullYear()} NTL Learning Solutions Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
