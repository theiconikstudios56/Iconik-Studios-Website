import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { trackLead } from '../../lib/rmdTracking';
import {
  ChatError,
  getConfig,
  loadChat,
  loadTurnstile,
  poll,
  saveChat,
  sendMessage,
  startChat,
  TURNSTILE_SITE_KEY,
  type ChatMessage,
  type SavedChat,
} from '../../lib/rmdChat';

// Replies show up within seconds while the chat is open; quieter after a
// couple of minutes, and not at all while the tab is hidden. With the panel
// closed, a recent chat is still checked now and then for the unread dot.
const FAST_MS = 4000;
const SLOW_MS = 15000;
const QUIET_AFTER_MS = 120000;
const RECENT_MS = 3600000;

/**
 * The website chat (RMD Step 5.4d), replacing GoHighLevel's widget. Visitors
 * give name, email and business name, pass Turnstile, and the chat lands in
 * RMD's Conversations. The team answers there.
 */
export default function ChatWidget() {
  const [config, setConfig] = useState<{ enabled: boolean; greeting: string } | null>(null);
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState<SavedChat | null>(() => loadChat());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [unread, setUnread] = useState(0);
  const [problem, setProblem] = useState<string | null>(null);
  const lastAt = useRef<string | null>(null);
  const lastNew = useRef(Date.now());
  const panel = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getConfig().then(setConfig).catch(() => setConfig(null));
  }, []);

  const addMessages = useCallback((incoming: ChatMessage[], fromPoll: boolean) => {
    if (!incoming.length) return;
    setMessages((current) => {
      const seen = new Set(current.map((m) => m.id));
      const fresh = incoming.filter((m) => !seen.has(m.id));
      if (fresh.length && fromPoll) {
        lastNew.current = Date.now();
        const fromUs = fresh.filter((m) => m.kind !== 'visitor').length;
        if (fromUs) setUnread((n) => n + fromUs);
      }
      return [...current, ...fresh].sort((a, b) => a.at.localeCompare(b.at));
    });
    lastAt.current = incoming.reduce((max, m) => (max && max > m.at ? max : m.at), lastAt.current);
  }, []);

  const forget = useCallback(() => {
    saveChat(null);
    setChat(null);
    setMessages([]);
    setUnread(0);
    lastAt.current = null;
  }, []);

  // Checking for replies.
  useEffect(() => {
    if (!chat) return;
    const recent = Date.now() - chat.lastActivity < RECENT_MS;
    if (!open && !recent) return;
    let stopped = false;
    let timer: number | undefined;
    const tick = async () => {
      if (stopped) return;
      if (document.visibilityState === 'visible') {
        try {
          const result = await poll(chat, lastAt.current);
          setProblem(null);
          // The first check after a reload brings the whole chat back; it isn't "new".
          addMessages(result.messages, lastAt.current !== null);
        } catch (e) {
          if (e instanceof ChatError && e.code === 'not_found') return forget();
          if (e instanceof ChatError && e.code === 'offline') setProblem(e.message);
        }
      }
      const quiet = Date.now() - lastNew.current > QUIET_AFTER_MS;
      timer = window.setTimeout(tick, open && !quiet ? FAST_MS : SLOW_MS);
    };
    void tick();
    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, [chat, open, addMessages, forget]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open, messages.length]);

  // Escape closes; focus goes back to the bubble.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        bubble.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    panel.current?.querySelector<HTMLElement>('input, textarea')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, chat]);

  if (!config?.enabled && !chat) return null;

  const remember = (next: SavedChat) => {
    saveChat(next);
    setChat(next);
  };

  return (
    <div className="iconik-chat-widget fixed right-4 bottom-4 z-[90] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-label="Chat with Iconik Studios"
          className="flex h-[min(36rem,calc(100svh-6.5rem))] w-[calc(100vw-2rem)] max-w-[24rem] flex-col overflow-hidden border border-white/15 bg-ink text-paper shadow-2xl shadow-black/60"
        >
          <header className="flex items-start justify-between gap-3 border-b border-white/10 bg-burnt-orange px-5 py-4 text-ink">
            <div>
              <h2 className="font-display text-3xl uppercase leading-none tracking-tight">Talk to Iconik</h2>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em]">Real people · usually quick</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                bubble.current?.focus();
              }}
              aria-label="Close the chat"
              className="-mr-1 rounded-full p-1.5 transition-colors hover:bg-ink/15"
            >
              <X size={20} />
            </button>
          </header>

          {chat ? (
            <Conversation chat={chat} messages={messages} problem={problem} onSent={(m) => {
              addMessages([m], false);
              lastNew.current = Date.now(); // back to quick checks
              remember({ ...chat, lastActivity: Date.now() });
            }} onNewChat={forget} />
          ) : (
            <StartForm
              greeting={config?.greeting ?? ''}
              onStarted={(started, firstName) => {
                addMessages(started.messages, false);
                remember({ id: started.id, secret: started.secret, firstName, lastActivity: Date.now() });
                trackLead('chat');
              }}
            />
          )}
        </div>
      )}

      <button
        ref={bubble}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close the chat' : unread ? `Open the chat, ${unread} new ${unread === 1 ? 'reply' : 'replies'}` : 'Chat with us'}
        aria-expanded={open}
        className="relative flex size-14 items-center justify-center rounded-full bg-burnt-orange text-ink shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burnt-orange"
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-paper font-mono text-[11px] font-bold text-ink" aria-hidden>
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}

const field =
  'w-full border border-white/15 bg-white/5 px-3 py-2.5 font-mono text-sm text-paper placeholder:text-white/40 focus:border-burnt-orange focus:outline-none';

function StartForm({ greeting, onStarted }: { greeting: string; onStarted: (started: { id: string; secret: string; messages: ChatMessage[] }, firstName: string) => void }) {
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '', website: '' });
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  // Turnstile: loaded and shown only now that the chat is open.
  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !box.current || !window.turnstile || !TURNSTILE_SITE_KEY) return;
        widget.current = window.turnstile.render(box.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          size: 'flexible',
          callback: (t: string) => setToken(t),
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        });
      })
      .catch(() => setError('The spam check couldn’t load. Please refresh the page, or use the contact form.'));
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
    };
  }, []);

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return setError('One moment: the spam check is still running.');
    setSending(true);
    setError(null);
    try {
      const started = await startChat({ ...values, page: window.location.pathname, turnstile: token });
      onStarted(started, values.name.trim().split(/\s+/)[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setToken('');
      if (widget.current) window.turnstile?.reset(widget.current);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-5">
      <p className="font-mono text-sm leading-relaxed text-tan">{greeting}</p>
      <label className="sr-only" htmlFor="chat-name">Your name</label>
      <input id="chat-name" className={field} placeholder="Your name" autoComplete="name" required maxLength={120} value={values.name} onChange={set('name')} />
      <label className="sr-only" htmlFor="chat-email">Email</label>
      <input id="chat-email" className={field} type="email" placeholder="Email" autoComplete="email" required maxLength={254} value={values.email} onChange={set('email')} />
      <label className="sr-only" htmlFor="chat-company">Business name</label>
      <input id="chat-company" className={field} placeholder="Business name" autoComplete="organization" required maxLength={200} value={values.company} onChange={set('company')} />
      <label className="sr-only" htmlFor="chat-message">Your message</label>
      <textarea id="chat-message" className={`${field} min-h-24 resize-none`} placeholder="How can we help?" required maxLength={2000} value={values.message} onChange={set('message')} />
      {/* People never see this; bots fill it in. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" value={values.website} onChange={set('website')} />
      <div ref={box} className="min-h-[65px]" />
      {error && <p role="alert" className="font-mono text-xs text-burnt-orange">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="mt-auto bg-burnt-orange px-5 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-ink transition-colors hover:bg-paper disabled:opacity-60"
      >
        {sending ? 'Starting…' : 'Start chatting'}
      </button>
      <p className="font-mono text-[10px] leading-relaxed text-white/50">
        We use your details only to reply to you, here or by email.
      </p>
    </form>
  );
}

function Conversation({
  chat,
  messages,
  problem,
  onSent,
  onNewChat,
}: {
  chat: SavedChat;
  messages: ChatMessage[];
  problem: string | null;
  onSent: (m: ChatMessage) => void;
  onNewChat: () => void;
}) {
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end' });
  }, [messages.length]);

  const send = async (e?: FormEvent) => {
    e?.preventDefault();
    const text = body.trim();
    if (!text || sending) return;
    setSending(true);
    setError(null);
    try {
      const { message } = await sendMessage(chat, text);
      setBody('');
      onSent(message);
    } catch (err) {
      if (err instanceof ChatError && err.code === 'not_found') return onNewChat();
      setError(err instanceof Error ? err.message : 'Your message didn’t send. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const waiting = messages.length > 0 && messages.every((m) => m.kind === 'visitor');

  return (
    <>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
        {messages.map((m) => {
          const mine = m.kind === 'visitor';
          return (
            <div key={m.id} className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
              {!mine && <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-burnt-orange">{m.kind === 'team' ? `${m.author} · Iconik` : 'Iconik'}</span>}
              <p
                className={`max-w-[85%] whitespace-pre-wrap break-words px-3.5 py-2.5 text-sm leading-relaxed ${
                  mine ? 'bg-burnt-orange text-ink' : 'border border-white/10 bg-white/[0.06] text-paper'
                }`}
              >
                {m.body}
              </p>
            </div>
          );
        })}
        {waiting && <p className="font-mono text-[11px] text-white/50">Thanks, {chat.firstName}! Someone from the team will be with you shortly.</p>}
        <div ref={end} />
      </div>
      <form onSubmit={send} className="border-t border-white/10 p-3">
        {(error || problem) && <p role="alert" className="mb-2 font-mono text-xs text-burnt-orange">{error ?? problem}</p>}
        <div className="flex items-end gap-2">
          <label className="sr-only" htmlFor="chat-reply">Message</label>
          <textarea
            id="chat-reply"
            rows={1}
            maxLength={2000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder="Write a message…"
            className={`${field} max-h-32 min-h-11 resize-none`}
          />
          <button
            type="submit"
            disabled={!body.trim() || sending}
            aria-label="Send"
            className="flex size-11 shrink-0 items-center justify-center bg-burnt-orange text-ink transition-colors hover:bg-paper disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
        <button type="button" onClick={onNewChat} className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white/70">
          Not {chat.firstName}? Start a new chat
        </button>
      </form>
    </>
  );
}
