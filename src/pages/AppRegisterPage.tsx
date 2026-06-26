import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

type State = 'verifying' | 'ready' | 'activating' | 'otp' | 'error';

export default function AppRegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id') ?? '';
  const isPreview = searchParams.get('preview') === 'true';

  const [state, setState] = useState<State>('verifying');
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (isPreview) {
      setState('ready');
      return;
    }
    if (!sessionId) {
      setErrorMsg('No payment session found.');
      setState('error');
      return;
    }
    verifySession();
  }, []);

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
    setEmailError('');

    const normalized = email.trim().toLowerCase();
    const normalizedConfirm = confirmEmail.trim().toLowerCase();

    if (normalized !== normalizedConfirm) {
      setEmailError('Email addresses do not match.');
      return;
    }
    if (!confirmed) {
      setEmailError('Please confirm you want to use this email address.');
      return;
    }

    setState('activating');

    if (!isPreview) {
      try {
        const res = await fetch('/api/stripe-activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, email: normalized }),
        });
        const data = await res.json();
        if (!data.success) {
          setErrorMsg(data.error || 'Activation failed. Please contact oscar@lsdiet.com.');
          setState('error');
          return;
        }
      } catch {
        setErrorMsg('Something went wrong. Please contact oscar@lsdiet.com.');
        setState('error');
        return;
      }
    }

    await sendOtp(normalized);
  }

  async function sendOtp(target: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email: target,
      options: { shouldCreateUser: true },
    });
    if (error) {
      setErrorMsg(error.message);
      setState('error');
    } else {
      setState('otp');
    }
  }

  async function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCodeError('');
    setVerifying(true);

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code.trim(),
      type: 'email',
    });

    if (error) {
      setCodeError('Invalid or expired code. Please try again.');
      setVerifying(false);
    } else {
      navigate('/app/chat');
    }
  }

  async function handleResend() {
    setSending(true);
    setCodeError('');
    await sendOtp(email.trim().toLowerCase());
    setSending(false);
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Motivation Navigator</h1>
          {isPreview && (
            <span className="inline-block bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded">Preview mode</span>
          )}
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
                Choose the email address you'll use to sign in to Motivation Navigator. You'll receive a login code at this email each time you sign in.
              </p>
            </div>

            <div className="bg-red-950 border border-red-800 rounded-lg p-3">
              <p className="text-red-400 text-xs leading-relaxed">
                <strong>Important:</strong> Only one email address can be whitelisted per subscription. If you need to use a different email later, you will need a separate subscription.
              </p>
            </div>

            <div className="space-y-3">
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
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Confirm email address</label>
                <input
                  type="email"
                  required
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5 accent-white flex-shrink-0"
              />
              <span className="text-zinc-300 text-sm leading-relaxed">
                I confirm this is the email I want to use for Motivation Navigator
              </span>
            </label>

            {emailError && <p className="text-red-400 text-sm">{emailError}</p>}

            <button
              type="submit"
              className="w-full bg-white text-zinc-950 font-semibold rounded-lg py-3 hover:bg-zinc-100 transition"
            >
              Activate my account
            </button>
          </form>
        )}

        {state === 'activating' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-zinc-400 text-sm">Setting up your account…</p>
          </div>
        )}

        {state === 'otp' && (
          <form onSubmit={handleCodeSubmit} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-4">
            <div className="text-center mb-2">
              <p className="text-zinc-300 text-sm">We sent an 8-digit code to</p>
              <p className="text-white font-semibold text-sm mt-1">{email}</p>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Enter your code</label>
              <input
                type="text"
                inputMode="numeric"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
                placeholder="12345678"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-center text-xl tracking-[0.3em] placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
            {codeError && <p className="text-red-400 text-sm text-center">{codeError}</p>}
            <button
              type="submit"
              disabled={verifying || code.length < 6}
              className="w-full bg-white text-zinc-950 font-semibold rounded-lg py-3 hover:bg-zinc-100 transition disabled:opacity-50"
            >
              {verifying ? 'Verifying…' : 'Sign in'}
            </button>
            <p className="text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={sending}
                className="text-zinc-500 text-xs hover:text-zinc-300 transition disabled:opacity-50"
              >
                {sending ? 'Sending…' : 'Resend code'}
              </button>
            </p>
          </form>
        )}

        {state === 'error' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center space-y-4">
            <p className="text-red-400 text-sm leading-relaxed">{errorMsg}</p>
            <a href="/app" className="text-zinc-400 text-sm underline hover:text-white transition">
              ← Back to Motivation Navigator
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
