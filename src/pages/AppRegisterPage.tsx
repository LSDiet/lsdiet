import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type State = 'verifying' | 'ready' | 'submitting' | 'done' | 'error';

export default function AppRegisterPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id') ?? '';

  const [state, setState] = useState<State>('verifying');
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setErrorMsg('No payment session found.');
      setState('error');
      return;
    }
    verifySession();
  }, [sessionId]);

  async function verifySession() {
    try {
      const res = await fetch('/api/stripe-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const data = await res.json();
      if (data.valid) {
        setState('ready');
      } else {
        setErrorMsg(data.reason || 'Payment could not be verified.');
        setState('error');
      }
    } catch {
      setErrorMsg('Could not verify payment. Please try again.');
      setState('error');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('submitting');
    try {
      const res = await fetch('/api/stripe-activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (data.success) {
        setState('done');
      } else {
        setErrorMsg(data.error || 'Activation failed. Please contact oscar@lsdiet.com.');
        setState('error');
      }
    } catch {
      setErrorMsg('Something went wrong. Please contact oscar@lsdiet.com.');
      setState('error');
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Motivation Navigator</h1>
        </div>

        {state === 'verifying' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-zinc-400 text-sm">Confirming your payment…</p>
          </div>
        )}

        {state === 'ready' && (
          <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-5">
            <div>
              <h2 className="text-white font-semibold text-lg mb-1">Set up your account</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Enter the email you want to use to sign in. This cannot be changed later — choose carefully.
              </p>
            </div>
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
            <p className="text-zinc-600 text-xs leading-relaxed">
              You'll receive a magic link at this email every time you sign in. No password required.
            </p>
            <button
              type="submit"
              className="w-full bg-white text-zinc-950 font-semibold rounded-lg py-3 hover:bg-zinc-100 transition"
            >
              Activate my account
            </button>
          </form>
        )}

        {state === 'submitting' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-zinc-400 text-sm">Setting up your account…</p>
          </div>
        )}

        {state === 'done' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center space-y-3">
            <div className="text-4xl mb-2">📬</div>
            <h2 className="text-white font-semibold text-lg">Check your email</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We sent a login link to <span className="text-white">{email}</span>. Click it to access the Motivation Navigator.
            </p>
            <p className="text-zinc-600 text-xs pt-2">
              Didn't get it? Check your spam folder or{' '}
              <Link to="/app/login" className="text-zinc-400 underline hover:text-white transition">
                request a new link
              </Link>.
            </p>
          </div>
        )}

        {state === 'error' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center space-y-4">
            <p className="text-red-400 text-sm leading-relaxed">{errorMsg}</p>
            <Link to="/app" className="text-zinc-400 text-sm underline hover:text-white transition">
              ← Back to Motivation Navigator
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
