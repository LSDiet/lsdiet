import { Triangle } from "lucide-react";
import { Link } from "react-router-dom";

export function FooterSimple() {
  return (
    <footer className="py-10 border-t border-[hsl(0_0%_14%)] bg-[hsl(0_0%_4%)]">
      <div className="container">
        <div className="flex flex-col gap-6">
          {/* Row 1: Logo + Legal links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border border-accent flex items-center justify-center">
                <Triangle className="w-3 h-3 text-accent fill-accent" />
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.1em] text-[hsl(0_0%_80%)]">
                Weight Permanence
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[hsl(0_0%_44%)]">
              <Link to="/privacy" className="hover:text-[hsl(0_0%_70%)] transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden sm:inline">·</span>
              <Link to="/terms" className="hover:text-[hsl(0_0%_70%)] transition-colors">
                Terms of Use
              </Link>
              <span className="hidden sm:inline">·</span>
              <Link to="/disclaimer" className="hover:text-[hsl(0_0%_70%)] transition-colors">
                Health Disclaimer
              </Link>
            </div>
          </div>

          {/* Row 2: Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[hsl(0_0%_36%)]">
              © {new Date().getFullYear()} NTL Learning Solutions Inc. All rights reserved.
            </p>
            <p className="text-xs text-[hsl(0_0%_36%)]">
              Founded by Oscar Poon
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
