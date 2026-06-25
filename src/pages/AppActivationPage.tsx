import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function AppActivationPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [timedOut, setTimedOut] = useState(false);

  // Navigate to chat once session is established
  useEffect(() => {
    if (!loading && user) navigate('/app/chat', { replace: true });
  }, [user, loading, navigate]);

  // Fallback if magic link doesn't resolve within 6 seconds
  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        {timedOut && !user ? (
          <>
            <p className="text-zinc-300 text-sm">Something went wrong with your login link.</p>
            <Link to="/app/login" className="text-white underline underline-offset-4 text-sm hover:text-zinc-300 transition">
              Request a new link
            </Link>
          </>
        ) : (
          <>
            <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin mx-auto" />
            <p className="text-zinc-400 text-sm">Signing you in…</p>
          </>
        )}
      </div>
    </div>
  );
}
