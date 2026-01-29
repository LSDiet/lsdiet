import { Triangle, ChevronRight } from "lucide-react";

export function FooterSimple() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border-2 border-primary flex items-center justify-center">
                <Triangle className="w-3 h-3 text-primary fill-primary" />
              </div>
              <span className="font-semibold text-foreground">Weight Permanence</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NTL Learning Solutions Inc. All rights reserved.
            </p>
          </div>

          {/* Progressive disclosure bio for SEO - crawlable even when collapsed */}
          <details className="group text-center md:text-left">
            <summary className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer list-none transition-colors">
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-open:rotate-90" />
              <span>Founded by Oscar Poon</span>
            </summary>
            <div className="mt-3 pl-5 space-y-2 text-sm text-muted-foreground max-w-2xl">
              <p>
                <strong className="text-foreground">Oscar Poon</strong> is the founder of WhatAboutWeight (Book: Weight Permanence) and the creator of the Weight Permanence Triangle™ (WPT), a neurobehavioural training designed to make weight loss intentional, sustainable, and permanent.
              </p>
              <p>
                After losing over 60 lbs multiple times and observing why willpower-based approaches repeatedly fail, he developed WPT to address the behavioural and biological drivers of weight regain.
              </p>
            </div>
          </details>
        </div>
      </div>
    </footer>
  );
}
