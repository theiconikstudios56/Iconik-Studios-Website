import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, Mail } from 'lucide-react';
import { loadTurnstile, TURNSTILE_SITE_KEY } from '../../lib/rmdChat';
import { ContactError, saveTemplate } from '../../lib/rmdContact';
import { trackLead } from '../../lib/rmdTracking';

/**
 * "Not ready yet? Email me this template" (Ricky, 2026-11-14): one email box
 * that sends the visitor this template's link through RMD, which follows up
 * twice and stops when they buy. Folded until tapped, so the spam check only
 * loads for people who use it.
 */
export default function SaveTemplate({ slug, name }: { slug: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [problem, setProblem] = useState('');
  const [box, setBox] = useState<HTMLDivElement | null>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    if (!box) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widget.current = window.turnstile.render(box, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          size: 'flexible',
          appearance: 'interaction-only',
          callback: (t: string) => setToken(t),
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        });
      })
      .catch(() => setProblem('The spam check couldn’t load. Please refresh the page and try again.'));
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
      setToken('');
    };
  }, [box]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setProblem('Please enter your email address.');
    if (!token) return setProblem('One moment: the spam check is still running. Try again in a few seconds.');
    setBusy(true);
    setProblem('');
    try {
      await saveTemplate(email.trim(), slug, token, honeypot);
      trackLead('template-saved');
      setSent(true);
    } catch (err) {
      setProblem(err instanceof ContactError || err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setToken('');
      if (widget.current) window.turnstile?.reset(widget.current);
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="mt-3 flex items-start gap-3 rounded-2xl border border-white/15 p-4 text-left text-sm leading-relaxed text-white">
        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-burnt-orange" />
        <span>Sent. {name} is in your inbox (check Promotions, just in case).</span>
      </div>
    );
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="mt-3 flex w-full items-center justify-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white hover:text-burnt-orange">
        <Mail size={14} /> Not ready? Email me {name}
      </button>
    );
  }

  return (
    <form onSubmit={send} className="mt-3 rounded-2xl border border-white/15 p-4 text-left">
      <label htmlFor="save-email" className="block text-sm font-semibold text-white">Email me {name} for later</label>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id="save-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourbusiness.com"
          className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/[0.05] px-5 py-3.5 text-base text-white placeholder:text-white/60 focus:border-burnt-orange focus:outline-none"
        />
        <button type="submit" disabled={busy} className="flex items-center justify-center gap-2 rounded-full bg-paper px-6 py-3.5 font-display text-sm uppercase tracking-widest text-ink transition-colors hover:bg-burnt-orange hover:text-white disabled:opacity-60">
          {busy ? <Loader2 size={16} className="animate-spin" /> : null} Email it to me
        </button>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" aria-hidden="true" />
      <div ref={setBox} className="mt-2" />
      <p className="mt-2 text-xs leading-relaxed text-white">We’ll send the link now and check in twice. Unsubscribe any time.</p>
      {problem && (
        <p role="alert" className="mt-2 text-sm text-burnt-orange">
          {problem}
        </p>
      )}
    </form>
  );
}
