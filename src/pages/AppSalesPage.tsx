import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { FooterSimple } from '@/components/FooterSimple';

const SKOOL_PREMIUM_URL = 'https://www.skool.com/lsdiet/about';

export default function AppSalesPage() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  async function handleAppCheckout() {
    setCheckoutLoading(true);
    setCheckoutError('');
    try {
      const res = await fetch('/api/stripe-checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError('Something went wrong. Please try again.');
        setCheckoutLoading(false);
      }
    } catch {
      setCheckoutError('Something went wrong. Please try again.');
      setCheckoutLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(0_0%_6%)] text-[hsl(0_0%_96%)]">
      <Navbar />

      <main className="pt-16 md:pt-20">

        {/* Hero */}
        <section className="py-20 md:py-28 px-4">
          <div className="container max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Motivation Navigator
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Find out what's actually stopping you.
            </h1>
            <p className="text-[hsl(0_0%_64%)] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Most people know what to eat. The real problem is the patterns, triggers, and blind spots that never get examined. The Motivation Navigator guides you through a structured 30 to 45 minute conversation — then gives you a personal summary of your PUSH and PULL motivations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleAppCheckout}
                disabled={checkoutLoading}
                className="px-8 py-4 bg-accent text-accent-foreground font-bold uppercase tracking-[0.1em] text-sm rounded-md hover:opacity-90 transition disabled:opacity-50"
              >
                {checkoutLoading ? 'Loading…' : 'Get Access — $29/month'}
              </button>
              <Link
                to="/app/login"
                className="text-sm text-[hsl(0_0%_56%)] hover:text-[hsl(0_0%_90%)] transition underline-offset-4 hover:underline"
              >
                Already a member? Sign in
              </Link>
            </div>
            {checkoutError && (
              <p className="text-red-400 text-sm mt-4">{checkoutError}</p>
            )}
          </div>
        </section>

        {/* VSL */}
        <section className="py-4 px-4">
          <div className="container max-w-3xl mx-auto">
            <div className="relative w-full rounded-xl overflow-hidden bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_18%)]" style={{ paddingTop: '56.25%' }}>
              {/* Replace the div below with your YouTube or Wistia embed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[hsl(0_0%_36%)] text-sm">Video coming soon</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Answer guided questions',
                  body: 'The Navigator walks you through Oscar\'s 5-stage awareness system — one question at a time. No multiple choice. No skipping.',
                },
                {
                  step: '02',
                  title: 'Uncover your patterns',
                  body: 'You\'ll examine what\'s actually been triggering your behaviour and what keeps you stuck in the same cycle.',
                },
                {
                  step: '03',
                  title: 'Get your personal summary',
                  body: 'At the end, you receive a written summary: your PUSH motivations, your PULL motivations, and why change will stick this time.',
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex flex-col gap-3">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{step}</span>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="text-[hsl(0_0%_56%)] text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-16 px-4 bg-[hsl(0_0%_8%)] border-y border-[hsl(0_0%_14%)]">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">What you get</h2>
            <ul className="space-y-4 max-w-xl mx-auto">
              {[
                'A structured 30–45 minute awareness conversation',
                'Questions built from the WPT Toolbook — the same framework used in Oscar\'s coaching',
                'A personal summary of your PUSH and PULL motivations',
                'Saved conversation history so you can pick up where you left off',
                'Private and secure — your answers are never shared',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-0.5 flex-shrink-0">→</span>
                  <span className="text-[hsl(0_0%_75%)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4" id="pricing">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">Choose your access</h2>
            <p className="text-[hsl(0_0%_56%)] text-sm text-center mb-12">Both options include full access to the Motivation Navigator.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* App Only */}
              <div className="rounded-xl border border-[hsl(0_0%_22%)] bg-[hsl(0_0%_9%)] p-8 flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(0_0%_56%)] mb-2">App Only</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-[hsl(0_0%_50%)] text-sm mb-1">/month</span>
                  </div>
                  <p className="text-[hsl(0_0%_50%)] text-xs">Cancel any time.</p>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {[
                    'Full Motivation Navigator access',
                    'Unlimited conversations',
                    'Personal motivation summary',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[hsl(0_0%_70%)]">
                      <span className="text-accent font-bold flex-shrink-0 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleAppCheckout}
                  disabled={checkoutLoading}
                  className="w-full py-3 rounded-md bg-accent text-accent-foreground font-bold uppercase tracking-[0.1em] text-xs hover:opacity-90 transition disabled:opacity-50"
                >
                  {checkoutLoading ? 'Loading…' : 'Get started'}
                </button>
              </div>

              {/* App + Community */}
              <div className="rounded-xl border border-accent/40 bg-[hsl(0_0%_9%)] p-8 flex flex-col gap-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full">
                    Most value
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(0_0%_56%)] mb-2">App + Community</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-[hsl(0_0%_50%)] text-sm mb-1">/month</span>
                  </div>
                  <p className="text-[hsl(0_0%_50%)] text-xs">Via Skool. Cancel any time.</p>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {[
                    'Everything in App Only',
                    'LS Diet Skool community access',
                    'WPT Practice Training modules',
                    'Unlimited training content',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[hsl(0_0%_70%)]">
                      <span className="text-accent font-bold flex-shrink-0 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={SKOOL_PREMIUM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-md border border-accent text-accent font-bold uppercase tracking-[0.1em] text-xs hover:bg-accent hover:text-accent-foreground transition text-center block"
                >
                  Join on Skool
                </a>
              </div>
            </div>

            {checkoutError && (
              <p className="text-red-400 text-sm text-center mt-6">{checkoutError}</p>
            )}

            <p className="text-center mt-8">
              <Link
                to="/app/login"
                className="text-sm text-[hsl(0_0%_50%)] hover:text-[hsl(0_0%_80%)] transition underline-offset-4 hover:underline"
              >
                Already have an account? Sign in
              </Link>
            </p>
          </div>
        </section>

      </main>

      <FooterSimple />
    </div>
  );
}
