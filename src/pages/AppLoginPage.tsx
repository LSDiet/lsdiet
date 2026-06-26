import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

type Phase = 'email' | 'code' | 'done';

async function redirectToCheckout() {
  const res = await fetch('/api/stripe-checkout', { method: 'POST' });
  const data = await res.json();
  if (data.url) window.location.href = data.url;
}

export default function AppLoginPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const normalized = email.trim().toLowerCase();

    // Check whitelist
    const checkRes = await fetch('/api/check-member', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalized }),
    });
    const checkData = await checkRes.json();

    if (!checkData.allowed) {
      setError('This email does not have access.');
      setLoading(false);
      return;
    }

    // Send OTP
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: normalized,
      options: { shouldCreateUser: true },
    });

    if (otpError) {
      setError(otpError.message);
    } else {
      setPhase('code');
    }
    setLoading(false);
  }

  async function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code.trim(),
      type: 'email',
    });

    if (verifyError) {
      setError('Incorrect code. Please try again.');
    } else {
      navigate('/app/chat');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Motivation Navigator</h1>
          <p className="text-zinc-500 text-xs">For paid members only.</p>
        </div>

        {phase === 'email' && (
          <form onSubmit={handleEmailSubmit} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm leading-relaxed">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-zinc-950 font-semibold rounded-lg py-3 hover:bg-zinc-100 transition disabled:opacity-50"
            >
              {loading ? 'Checking…' : 'Continue'}
            </button>

            <div className="pt-4 border-t border-zinc-800 text-center">
              <p className="text-zinc-600 text-xs mb-2">Not a member yet?</p>
              <button
                type="button"
                onClick={redirectToCheckout}
                className="text-sm text-white underline underline-offset-4 hover:text-zinc-300 transition"
              >
                Activate your Motivation Navigator subscription
              </button>
            </div>
          </form>
        )}

        {phase === 'code' && (
          <form onSubmit={handleCodeSubmit} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-4">
            <div className="text-center mb-2">
              <p className="text-zinc-300 text-sm">We sent a 6-digit code to</p>
              <p className="text-white font-semibold text-sm mt-1">{email}</p>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Enter your code</label>
              <input
                type="text"
                inputMode="numeric"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-center text-xl tracking-[0.3em] placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="w-full bg-white text-zinc-950 font-semibold rounded-lg py-3 hover:bg-zinc-100 transition disabled:opacity-50"
            >
              {loading ? 'Verifying…' : 'Sign in'}
            </button>
            <p className="text-center">
              <button
                type="button"
                onClick={() => { setPhase('email'); setCode(''); setError(''); }}
                className="text-zinc-500 text-xs hover:text-zinc-300 transition"
              >
                Use a different email
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
