import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, ArrowUp, MessageCircle, X } from 'lucide-react';
import { trackLead } from '../../lib/rmdTracking';
import {
  askAssistant,
  ChatError,
  getConfig,
  loadChat,
  loadTurnstile,
  poll,
  saveChat,
  sendMessage,
  startChat,
  TURNSTILE_SITE_KEY,
  type ChatConfig,
  type ChatMessage,
  type SavedChat,
} from '../../lib/rmdChat';
import { chatWidgetStyle, resolveChatWidget, turnstileTheme, type ChatWidgetSettings } from '../../lib/chatWidget';
import fuzzyAvatar from '../../assets/images/web/chat-fuzzy.webp';

// Replies show up within seconds while the chat is open; quieter after a
// couple of minutes, and not at all while the tab is hidden. With the panel
// closed, a recent chat is still checked now and then for the unread dot.
const FAST_MS = 4000;
const SLOW_MS = 15000;
const QUIET_AFTER_MS = 120000;
const RECENT_MS = 3600000;
// Below Tailwind's sm: the chat opens full screen.
const PHONE = '(max-width: 639px)';

/**
 * The website chat (RMD Step 5.4d), replacing GoHighLevel's widget. Visitors
 * give name, email and business name, pass Turnstile, and the chat lands in
 * RMD's Conversations. The team answers there. When RMD's AI assistant is
 * switched on, it answers first (the widget asks for its reply after each
 * message and shows "typing…"), and the team can take over at any time.
 * Its wording, colours, corners, side, logo and business-name field come from
 * RMD's Settings → Chat widget (lib/chatWidget.ts); unchanged ones keep the
 * look below, the site's own: black, a hairline border, Anton for the title,
 * Inter to read, small spaced mono labels, underlined fields, bronze pills.
 * The picture at the top (and beside Iconik's messages) is the logo uploaded
 * in RMD, or the green Fuzzy.
 */
export default function ChatWidget() {
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [typing, setTyping] = useState(false);
  const asking = useRef(false);
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState<SavedChat | null>(() => loadChat());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [unread, setUnread] = useState(0);
  const [problem, setProblem] = useState<string | null>(null);
  const lastAt = useRef<string | null>(null);
  const lastNew = useRef(Date.now());
  const panel = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLButtonElement>(null);
  const [phone, setPhone] = useState(() => window.matchMedia(PHONE).matches);

  // Turning a phone sideways can cross the breakpoint while the chat is open.
  useEffect(() => {
    const query = window.matchMedia(PHONE);
    const change = () => setPhone(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);

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
          if (!asking.current) setTyping(Boolean(result.typing));
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

  // Escape closes; focus goes back to the bubble. The first field takes focus
  // only with a mouse: on a phone that would open the keyboard at once.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        bubble.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    if (window.matchMedia('(pointer: fine)').matches) panel.current?.querySelector<HTMLElement>('input, textarea')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, chat]);

  // On a phone the open chat fills the screen: the page behind it is held
  // still (iOS ignores overflow alone, so the body is pinned where it was), and
  // the panel follows the visible area so the keyboard never covers the reply box.
  useEffect(() => {
    if (!open || !phone) return;
    const y = window.scrollY;
    const body = document.body.style;
    const before = { position: body.position, top: body.top, left: body.left, right: body.right, overflow: body.overflow };
    Object.assign(body, { position: 'fixed', top: `-${y}px`, left: '0', right: '0', overflow: 'hidden' });
    const view = window.visualViewport;
    const fit = () => {
      const el = panel.current;
      if (!el || !view) return;
      el.style.height = `${view.height}px`;
      el.style.transform = `translateY(${view.offsetTop}px)`;
    };
    fit();
    view?.addEventListener('resize', fit);
    view?.addEventListener('scroll', fit);
    return () => {
      view?.removeEventListener('resize', fit);
      view?.removeEventListener('scroll', fit);
      panel.current?.style.removeProperty('height');
      panel.current?.style.removeProperty('transform');
      Object.assign(body, before);
      window.scrollTo(0, y);
    };
  }, [open, phone]);

  if (!config?.enabled && !chat) return null;
  const look = resolveChatWidget(config?.widget);

  const remember = (next: SavedChat) => {
    saveChat(next);
    setChat(next);
  };

  // The assistant's reply to what the visitor just wrote (when it's on).
  const ask = async (target: SavedChat) => {
    if (!config?.assistant) return;
    asking.current = true;
    setTyping(true);
    try {
      const { message } = await askAssistant(target);
      if (message) addMessages([message], false);
    } catch {
      // The team is told as usual, and the automatic reply covers the wait.
    } finally {
      asking.current = false;
      setTyping(false);
    }
  };

  return (
    <div
      className={`iconik-chat-widget fixed bottom-4 z-[90] flex flex-col gap-3 sm:bottom-6 ${look.position === 'left' ? 'left-4 items-start sm:left-6' : 'right-4 items-end sm:right-6'}`}
      style={chatWidgetStyle(look)}
    >
      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-label={look.title}
          className="flex h-[min(46rem,calc(100svh-7rem))] w-[calc(100vw-2rem)] max-w-[25rem] flex-col overflow-hidden overscroll-contain rounded-[var(--cw-r-panel)] border border-[var(--cw-line)] bg-[var(--cw-bg)] font-sans text-[var(--cw-text)] shadow-2xl shadow-black/70 max-sm:fixed max-sm:inset-x-0 max-sm:top-0 max-sm:h-dvh max-sm:w-full max-sm:max-w-none max-sm:rounded-none max-sm:border-0 max-sm:shadow-none"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--cw-line-soft)] px-5 py-4">
            <div className="flex min-w-0 items-center gap-3.5">
              <Avatar look={look} size="size-12" />
              <div className="min-w-0">
                <h2 className="font-display text-[1.65rem] uppercase leading-none tracking-tight break-words">{look.title}</h2>
                <div className="mt-1.5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--cw-mark)]">
                  <span className="size-1.5 shrink-0 rounded-full bg-[var(--cw-accent)]" aria-hidden />
                  {config?.assistant ? look.tagline_ai : look.tagline_people}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                bubble.current?.focus();
              }}
              aria-label="Close the chat"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--cw-line)] transition-colors hover:border-[var(--cw-accent)] hover:text-[var(--cw-mark)]"
            >
              <X size={16} />
            </button>
          </header>

          {chat ? (
            <Conversation look={look} chat={chat} messages={messages} problem={problem} typing={typing} onSent={(m) => {
              addMessages([m], false);
              lastNew.current = Date.now(); // back to quick checks
              remember({ ...chat, lastActivity: Date.now() });
              void ask(chat);
            }} onNewChat={forget} />
          ) : (
            <StartForm
              look={look}
              greeting={config?.greeting ?? ''}
              assistant={Boolean(config?.assistant)}
              onStarted={(started, firstName) => {
                addMessages(started.messages, false);
                const next = { id: started.id, secret: started.secret, firstName, lastActivity: Date.now() };
                remember(next);
                trackLead('chat');
                void ask(next);
              }}
            />
          )}
        </div>
      )}

      <button
        ref={bubble}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close the chat' : unread ? `Open the chat, ${unread} new ${unread === 1 ? 'reply' : 'replies'}` : look.launcher_text || 'Chat with us'}
        aria-expanded={open}
        className={`relative flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--cw-accent)] text-[var(--cw-on-accent)] shadow-xl shadow-black/50 ring-1 ring-white/15 transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cw-accent)] ${look.launcher_text && !open ? 'px-5' : 'w-14'} ${open ? 'max-sm:hidden' : ''}`}
      >
        {open ? (
          <X size={24} />
        ) : look.launcher_icon === 'logo' && look.logo_url ? (
          <img src={look.logo_url} alt="" className={`object-contain ${look.launcher_text ? 'size-7' : 'size-9'}`} />
        ) : (
          <MessageCircle size={26} />
        )}
        {!open && look.launcher_text && <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">{look.launcher_text}</span>}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-paper font-mono text-[11px] font-bold text-ink" aria-hidden>
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}

// Underlined, like the contact page; 16px on phones so iOS doesn't zoom in.
const field =
  'w-full border-0 border-b border-[var(--cw-line)] bg-transparent px-0 py-2 font-sans text-base text-[var(--cw-text)] sm:text-[15px] placeholder:text-[var(--cw-text-40)] focus:border-[var(--cw-accent)] focus:outline-none';
const label = 'block font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--cw-text)]';
// The chat's text sits in divs, not paragraphs: the site's stylesheet sets every <p> to 14–16px.
const button =
  'rounded-[var(--cw-r-control)] bg-[var(--cw-accent)] text-[var(--cw-on-accent)] transition hover:brightness-110 disabled:opacity-60';

/** The logo uploaded in RMD, or the green Fuzzy: in a circle. */
function Avatar({ look, size }: { look: ChatWidgetSettings; size: string }) {
  return (
    <img
      src={look.logo_url || fuzzyAvatar}
      alt=""
      className={`${size} shrink-0 rounded-full bg-[var(--cw-msg)] object-cover`}
    />
  );
}

/** One of Iconik's messages: the picture beside it, the name above. */
function FromUs({ look, name, children }: { look: ChatWidgetSettings; name: string; children: ReactNode }) {
  return (
    <div className="flex items-end gap-2.5">
      <Avatar look={look} size="size-7" />
      <div className="flex min-w-0 flex-col items-start">
        <span className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--cw-mark)]">{name}</span>
        <div className="max-w-[17rem] whitespace-pre-wrap break-words rounded-[var(--cw-r-bubble)] rounded-bl-md border border-[var(--cw-line-soft)] bg-[var(--cw-msg)] px-4 py-3 text-[14px] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

function StartForm({
  look,
  greeting,
  assistant,
  onStarted,
}: {
  look: ChatWidgetSettings;
  greeting: string;
  assistant: boolean;
  onStarted: (started: { id: string; secret: string; messages: ChatMessage[] }, firstName: string) => void;
}) {
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '', website: '' });
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  // Turnstile: loaded and shown only now that the chat is open (in the panel's light or dark).
  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !box.current || !window.turnstile || !TURNSTILE_SITE_KEY) return;
        widget.current = window.turnstile.render(box.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: turnstileTheme(look),
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
      const started = await startChat({ ...values, company: look.company_field === 'hidden' ? '' : values.company, page: window.location.pathname, turnstile: token });
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
    <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-5 pt-5 pb-4">
      {greeting && (
        <FromUs look={look} name={look.team_name}>
          <Linked text={greeting} />
        </FromUs>
      )}
      {assistant && <div className="font-mono text-[10px] leading-relaxed tracking-wide text-[var(--cw-text-60)]">{look.ai_notice}</div>}
      <div className="space-y-3.5">
        <div>
          <label className={label} htmlFor="chat-name">{look.name_placeholder}</label>
          <input id="chat-name" className={field} autoComplete="name" required maxLength={120} value={values.name} onChange={set('name')} />
        </div>
        <div>
          <label className={label} htmlFor="chat-email">{look.email_placeholder}</label>
          <input id="chat-email" className={field} type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={set('email')} />
        </div>
        {look.company_field !== 'hidden' && (
          <div>
            <label className={label} htmlFor="chat-company">
              {look.company_placeholder}
              {look.company_field === 'optional' && <span className="text-[var(--cw-text-60)]"> (optional)</span>}
            </label>
            <input
              id="chat-company"
              className={field}
              autoComplete="organization"
              required={look.company_field === 'required'}
              maxLength={200}
              value={values.company}
              onChange={set('company')}
            />
          </div>
        )}
        <div>
          <label className={label} htmlFor="chat-message">{look.message_placeholder}</label>
          <textarea id="chat-message" rows={2} className={`${field} resize-none`} required maxLength={2000} value={values.message} onChange={set('message')} />
        </div>
      </div>
      {/* People never see this; bots fill it in. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" value={values.website} onChange={set('website')} />
      <div ref={box} className="min-h-[65px]" />
      {error && <div role="alert" className="font-mono text-[11px] text-[var(--cw-mark)]">{error}</div>}
      <div className="mt-auto space-y-3">
        <button type="submit" disabled={sending} className={`${button} flex w-full items-center justify-center gap-3 px-6 py-4 font-display text-lg uppercase tracking-[0.08em]`}>
          {sending ? 'Starting…' : look.start_button}
          {!sending && <ArrowRight size={18} aria-hidden />}
        </button>
        <div className="text-center font-mono text-[9px] leading-relaxed tracking-wide text-[var(--cw-text-60)]">{look.privacy_note}</div>
      </div>
    </form>
  );
}

function Conversation({
  look,
  chat,
  messages,
  problem,
  typing,
  onSent,
  onNewChat,
}: {
  look: ChatWidgetSettings;
  chat: SavedChat;
  messages: ChatMessage[];
  problem: string | null;
  typing: boolean;
  onSent: (m: ChatMessage) => void;
  onNewChat: () => void;
}) {
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (list.current) list.current.scrollTop = list.current.scrollHeight;
  }, [messages.length, typing]);

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
      <div ref={list} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5" aria-live="polite">
        {messages.map((m) => {
          if (m.kind === 'visitor')
            return (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[80%] whitespace-pre-wrap break-words rounded-[var(--cw-r-bubble)] rounded-br-md bg-[var(--cw-accent)] px-4 py-3 text-[14px] leading-relaxed text-[var(--cw-on-accent)]">{m.body}</div>
              </div>
            );
          return (
            <FromUs key={m.id} look={look} name={m.kind === 'team' ? `${m.author} · ${look.team_name}` : m.kind === 'ai' ? look.ai_name : look.team_name}>
              <Linked text={m.body} />
            </FromUs>
          );
        })}
        {typing ? (
          <div className="flex items-center gap-2.5" role="status">
            <Avatar look={look} size="size-7" />
            <span className="flex items-center gap-1 rounded-[var(--cw-r-bubble)] rounded-bl-md border border-[var(--cw-line-soft)] bg-[var(--cw-msg)] px-4 py-3.5" aria-hidden>
              <span className="size-1.5 animate-bounce rounded-full bg-[var(--cw-accent)] [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-[var(--cw-accent)] [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-[var(--cw-accent)]" />
            </span>
            <span className="sr-only">{look.team_name} is typing…</span>
          </div>
        ) : (
          waiting && <div className="text-center font-mono text-[10px] leading-relaxed tracking-wide text-[var(--cw-text-60)]">{look.waiting_text.replaceAll('{first_name}', chat.firstName)}</div>
        )}
      </div>
      <form onSubmit={send} className="shrink-0 border-t border-[var(--cw-line-soft)] px-4 pt-3 pb-3">
        {(error || problem) && <div role="alert" className="mb-2 font-mono text-[11px] text-[var(--cw-mark)]">{error ?? problem}</div>}
        <div className="flex items-end gap-2 rounded-[var(--cw-r-control)] border border-[var(--cw-line)] bg-[var(--cw-field)] py-1.5 pr-1.5 pl-4 transition-colors focus-within:border-[var(--cw-accent)]">
          <label className="sr-only" htmlFor="chat-reply">{look.reply_placeholder}</label>
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
            placeholder={look.reply_placeholder}
            className="max-h-32 min-h-9 flex-1 resize-none border-0 bg-transparent py-2 font-sans text-base text-[var(--cw-text)] placeholder:text-[var(--cw-text-40)] focus:outline-none sm:text-[15px]"
          />
          <button
            type="submit"
            disabled={!body.trim() || sending}
            aria-label="Send"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--cw-accent)] text-[var(--cw-on-accent)] transition hover:brightness-110 disabled:opacity-40"
          >
            <ArrowUp size={18} />
          </button>
        </div>
        <button type="button" onClick={onNewChat} className="mt-2.5 w-full text-center font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--cw-text-60)] hover:text-[var(--cw-mark)]">
          Not {chat.firstName}? Start a new chat
        </button>
      </form>
    </>
  );
}

/** Web addresses in Iconik's messages become links (the booking page, for one). */
function Linked({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s<>"']+)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part;
        const url = part.replace(/[.,;:!?)]+$/, '');
        return (
          <span key={i}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--cw-mark)] underline-offset-2 hover:text-[var(--cw-mark)]">
              {url}
            </a>
            {part.slice(url.length)}
          </span>
        );
      })}
    </>
  );
}

