import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function AppPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/app/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <span className="text-white font-semibold">Motivation Navigator</span>
        <button
          onClick={signOut}
          className="text-zinc-400 text-sm hover:text-white transition"
        >
          Sign out
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-white text-xl font-semibold mb-2">Welcome back</h2>
          <p className="text-zinc-400 text-sm">{user.email}</p>
          <p className="text-zinc-500 text-sm mt-6">The conversation experience is coming soon.</p>
        </div>
      </main>
    </div>
  );
}
