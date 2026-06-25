import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

async function redirectToCheckout() {
  const res = await fetch('/api/stripe-checkout', { method: 'POST' });
  const data = await res.json();
  if (data.url) window.location.href = data.url;
}

export default function AppLoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check whitelist via server-side function
    const checkRes = await fetch('/api/check-member', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
    const checkData = await checkRes.json();

    if (!checkData.allowed) {
      setError('This email doesn\'t have access. Please upgrade to Premium on Skool first, then follow the activation steps.');
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/app/activation`,
      },
    });

    if (authError) {
      setError(authError.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Motivation Navigator</h1>
          <p className="text-zinc-400 text-sm">Enter your email to receive a login link</p>
        </div>

        <p className="text-zinc-500 text-xs text-center mb-6">
          This page is for paid members only.
        </p>

        {sent ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-white font-semibold text-lg mb-2">Check your email</h2>
            <p className="text-zinc-400 text-sm">
              We sent a login link to <span className="text-white">{email}</span>.
              Click it to access the Motivation Navigator.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-4">
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
              {loading ? 'Checking...' : 'Send login link'}
            </button>
          </form>
        )}
        <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
          <p className="text-zinc-500 text-xs mb-3">Not a member yet?</p>
          <button
            onClick={redirectToCheckout}
            className="text-sm text-white underline underline-offset-4 hover:text-zinc-300 transition"
          >
            Activate your Motivation Navigator subscription
          </button>
        </div>
      </div>
    </div>
  );
}
