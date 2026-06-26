import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

type Conversation = {
  id: string;
  title: string | null;
  created_at: string;
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
};

const GREETING =
  `Hi — I'm your Motivation Navigator.\n\nI'm here to help you build real, lasting motivation using Oscar's 5-stage awareness system. This isn't a standard chatbot. I'll ask you targeted questions to uncover what's actually been getting in your way.\n\nLet's start here: What's been the hardest part of staying consistent with your weight loss efforts?`;

export default function AppPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!loading && !user) navigate('/app/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) loadConversations();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  async function loadConversations() {
    const { data } = await supabase
      .from('conversations')
      .select('id, title, created_at')
      .order('created_at', { ascending: false });
    if (data) {
      setConversations(data);
      if (data.length === 0) {
        await startNewConversation();
      } else {
        selectConversation(data[0].id);
      }
    }
  }

  async function loadMessages(conversationId: string) {
    const { data } = await supabase
      .from('messages')
      .select('id, role, content, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    if (data) setMessages(data as Message[]);
  }

  async function startNewConversation() {
    if (!user) return;

    const { data: conv, error } = await supabase
      .from('conversations')
      .insert({ user_id: user.id, title: null })
      .select('id, title, created_at')
      .single();
    if (!conv || error) return;

    const { data: msg } = await supabase
      .from('messages')
      .insert({ conversation_id: conv.id, role: 'assistant', content: GREETING })
      .select('id, role, content, created_at')
      .single();

    setConversations(prev => [conv, ...prev]);
    setActiveId(conv.id);
    setMessages(msg ? [msg as Message] : []);
    setSidebarOpen(false);
  }

  async function selectConversation(id: string) {
    setActiveId(id);
    await loadMessages(id);
    setSidebarOpen(false);
  }

  async function sendMessage() {
    if (!input.trim() || !activeId || sending) return;
    const content = input.trim();

    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setSending(true);

    const { data: msg } = await supabase
      .from('messages')
      .insert({ conversation_id: activeId, role: 'user', content })
      .select('id, role, content, created_at')
      .single();

    if (msg) setMessages(prev => [...prev, msg as Message]);

    // Auto-title from first user message
    const conv = conversations.find(c => c.id === activeId);
    if (conv && !conv.title) {
      const title = content.slice(0, 60);
      await supabase
        .from('conversations')
        .update({ title, updated_at: new Date().toISOString() })
        .eq('id', activeId);
      setConversations(prev => prev.map(c => c.id === activeId ? { ...c, title } : c));
    }

    // Call AI
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ conversationId: activeId }),
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.content,
          created_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, assistantMsg]);
      }
    } catch (err) {
      console.error('Chat error:', err);
    }

    setSending(false);
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="h-screen bg-zinc-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-zinc-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
            className="text-zinc-400 hover:text-white transition md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="text-white font-semibold text-sm">Motivation Navigator</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-xs hidden md:block">{user.email}</span>
          {user.email === 'oscar@lsdiet.com' && (
            <Link to="/app/admin" className="text-zinc-400 text-sm hover:text-white transition hidden md:block">
              Admin
            </Link>
          )}
          <button onClick={signOut} className="text-zinc-400 text-sm hover:text-white transition">
            Sign out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={[
            'fixed md:relative z-30 md:z-auto inset-y-0 left-0',
            'w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col flex-shrink-0',
            'transition-transform duration-200',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          ].join(' ')}
        >
          <div className="p-3 border-b border-zinc-800 pt-[68px] md:pt-3">
            <button
              onClick={startNewConversation}
              className="w-full bg-white text-zinc-950 text-sm font-semibold rounded-lg py-2 px-4 hover:bg-zinc-100 transition"
            >
              + New conversation
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {conversations.length === 0 && (
              <p className="text-zinc-600 text-xs px-3 pt-3">No conversations yet</p>
            )}
            {conversations.map(c => (
              <button
                key={c.id}
                onClick={() => selectConversation(c.id)}
                className={[
                  'w-full text-left px-3 py-2 rounded-lg text-sm truncate transition',
                  c.id === activeId
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
                ].join(' ')}
              >
                {c.title ??
                  new Date(c.created_at).toLocaleDateString('en-CA', {
                    month: 'short',
                    day: 'numeric',
                  })}
              </button>
            ))}
          </div>
        </aside>

        {/* Main area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {!activeId ? (
            <div className="flex-1 flex flex-col items-center justify-center px-4 text-center gap-4">
              <p className="text-zinc-400 text-sm max-w-xs">
                Start a new conversation to begin your awareness journey.
              </p>
              <button
                onClick={startNewConversation}
                className="bg-white text-zinc-950 text-sm font-semibold rounded-lg py-2.5 px-6 hover:bg-zinc-100 transition"
              >
                Start conversation
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                {messages.map(m => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={[
                        'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap',
                        m.role === 'user'
                          ? 'bg-white text-zinc-950 rounded-br-sm'
                          : 'bg-zinc-800 text-zinc-100 rounded-bl-sm',
                      ].join(' ')}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {sending && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-zinc-500">
                      <span className="animate-pulse">···</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input bar */}
              <div className="border-t border-zinc-800 px-4 py-3 flex gap-2 items-end flex-shrink-0">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message… (Enter to send, Shift+Enter for new line)"
                  rows={1}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 resize-none leading-relaxed"
                  style={{ maxHeight: '120px' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || sending}
                  className="bg-white text-zinc-950 text-sm font-semibold rounded-xl px-4 py-3 hover:bg-zinc-100 transition disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
