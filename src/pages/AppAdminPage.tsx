import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const ADMIN_EMAIL = 'oscar@lsdiet.com';

type Member = {
  id: string;
  email: string;
  skool_name: string | null;
  activated_at: string | null;
  created_at: string;
};

export default function AppAdminPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [members, setMembers] = useState<Member[]>([]);
  const [fetching, setFetching] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) navigate('/app/login');
      else if (user.email !== ADMIN_EMAIL) navigate('/app');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) loadMembers();
  }, [user]);

  async function getToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? '';
  }

  async function loadMembers() {
    setFetching(true);
    const res = await fetch('/api/admin/members', {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
    const data = await res.json();
    if (Array.isArray(data)) setMembers(data);
    setFetching(false);
  }

  async function addMember(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setAdding(true);
    setFeedback(null);

    const res = await fetch('/api/admin/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({ email: email.trim(), name: name.trim() }),
    });
    const data = await res.json();

    if (res.ok) {
      setFeedback({
        type: 'success',
        msg: data.alreadyExisted
          ? `${email} already had an account — whitelist updated.`
          : `${email} added and activation email sent.`,
      });
      setEmail('');
      setName('');
      loadMembers();
    } else {
      setFeedback({ type: 'error', msg: data.error ?? 'Something went wrong.' });
    }
    setAdding(false);
  }

  async function removeMember(memberEmail: string) {
    if (!confirm(`Remove access for ${memberEmail}?`)) return;
    await fetch('/api/admin/members', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({ email: memberEmail }),
    });
    setMembers(prev => prev.filter(m => m.email !== memberEmail));
  }

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/app')} className="text-zinc-400 hover:text-white text-sm transition">
            ← Back to Navigator
          </button>
          <span className="text-white font-semibold">Member Admin</span>
        </div>
        <button onClick={signOut} className="text-zinc-400 text-sm hover:text-white transition">
          Sign out
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* Add member form */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Add Member</h2>
          <form onSubmit={addMember} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Email address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="member@email.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Name (optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Their name"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>
            {feedback && (
              <p className={`text-sm ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {feedback.msg}
              </p>
            )}
            <button
              type="submit"
              disabled={adding}
              className="bg-white text-zinc-950 text-sm font-semibold rounded-lg px-5 py-2.5 hover:bg-zinc-100 transition disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add member + send activation email'}
            </button>
          </form>
        </section>

        {/* Member list */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
            Active Members ({members.length})
          </h2>
          {fetching ? (
            <p className="text-zinc-500 text-sm">Loading...</p>
          ) : members.length === 0 ? (
            <p className="text-zinc-500 text-sm">No members yet.</p>
          ) : (
            <div className="space-y-2">
              {members.map(m => (
                <div key={m.id} className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{m.email}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {m.skool_name && <span className="mr-3">{m.skool_name}</span>}
                      Added {new Date(m.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                      {m.activated_at
                        ? ` · Activated ${new Date(m.activated_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}`
                        : ' · Not yet activated'}
                    </p>
                  </div>
                  {m.email !== ADMIN_EMAIL && (
                    <button
                      onClick={() => removeMember(m.email)}
                      className="text-zinc-600 hover:text-red-400 text-xs transition flex-shrink-0"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
