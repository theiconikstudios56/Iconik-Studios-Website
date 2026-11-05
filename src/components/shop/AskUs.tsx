import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react';
import { loadTurnstile, TURNSTILE_SITE_KEY } from '../../lib/rmdChat';
import { ContactError, sendContact } from '../../lib/rmdContact';
import { trackLead } from '../../lib/rmdTracking';

const GOALS = ['Get more calls', 'Take bookings online', 'Look legit when people search me', 'Not sure yet'];

/**
 * "Not sure yet? Ask us": a short question from a template page, sent to RMD's
 * contact form (name, business, email and phone are required there). Works for
 * people with no website yet: it asks about the business, not the site.
 */
export default function AskUs({ open, onClose, templateName, industry }: { open: boolean; onClose: () => void; templateName: string; industry: string }) {
  const [step, setStep] = useState<1 | 2 | 'sent'>(1);
  const [kind, setKind] = useState(industry);
  const [hasSite, setHasSite] = useState<'yes' | 'no' | ''>('');
  const [link, setLink] = useState('');
  const [goal, setGoal] = useState('');
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState('');

  const [token, setToken] = useState('');
  const [turnstileBox, setTurnstileBox] = useState<HTMLDivElement | null>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', close);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', close);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!turnstileBox) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widget.current = window.turnstile.render(turnstileBox, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          size: 'flexible',
          appearance: 'interaction-only',
          callback: (t: string) => setToken(t),
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        });
      })
      .catch(() => setProblem('The spam check couldn’t load. Please refresh the page, or email support@theiconikstudios.com.'));
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
      setToken('');
    };
  }, [turnstileBox]);

  if (!open || typeof document === 'undefined') return null;

  const firstDone = kind.trim() && (hasSite === 'yes' || (hasSite === 'no' && goal));

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !business.trim() || !email.trim() || !phone.trim()) return setProblem('Please fill in your name, business, email and phone.');
    if (!token) return setProblem('One moment: the spam check is still running. Please try again in a few seconds.');
    setBusy(true);
    setProblem('');
    const message = [
      `Question from the ${templateName} template page (${industry}).`,
      `Kind of business: ${kind.trim()}`,
      hasSite === 'yes' ? `Has a website: yes${link.trim() ? `, ${link.trim()}` : ' (no link given)'}` : 'Has a website: no, this would be their first',
      hasSite === 'no' ? `Most wants it to: ${goal}` : '',
      notes.trim() ? `\nAnything else: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    try {
      await sendContact({ name: name.trim(), email: email.trim(), phone: phone.trim(), company: business.trim(), message, text_consent: false }, token, honeypot);
      trackLead('template-question');
      setStep('sent');
    } catch (err) {
      const fields = err instanceof ContactError ? Object.values(err.fields).filter(Boolean) : [];
      setProblem(fields.length ? fields.join(' ') : err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setToken('');
      if (widget.current) window.turnstile?.reset(widget.current);
    } finally {
      setBusy(false);
    }
  }

  const field = 'w-full rounded-xl border border-white/20 bg-white/[0.05] px-4 py-3.5 text-base text-white placeholder:text-white/60 focus:border-burnt-orange focus:outline-none';
  const choice = (on: boolean) =>
    `rounded-xl border px-4 py-3.5 text-left text-base transition-colors ${on ? 'border-burnt-orange bg-burnt-orange/15 text-white' : 'border-white/20 text-white hover:border-white/50'}`;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-us-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-white/15 bg-[#0b0b0b] p-7 text-white shadow-2xl sm:rounded-3xl sm:p-10"
      >
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-burnt-orange">{step === 'sent' ? 'Sent' : `Step ${step} of 2`}</p>
            <h2 id="ask-us-title" className="font-display text-4xl uppercase leading-none tracking-tight">
              {step === 'sent' ? 'Got it' : step === 1 ? 'Tell us about your business' : 'Where do we reach you?'}
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full border border-white/20 p-2 text-white hover:border-white">
            <X size={18} />
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-7">
            <div>
              <label htmlFor="ask-kind" className="mb-2 block text-sm font-semibold">What kind of business?</label>
              <input id="ask-kind" value={kind} onChange={(e) => setKind(e.target.value)} className={field} />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Do you have a website now?</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button type="button" className={choice(hasSite === 'yes')} onClick={() => setHasSite('yes')}>Yes, I have one</button>
                <button type="button" className={choice(hasSite === 'no')} onClick={() => setHasSite('no')}>No, this would be my first</button>
              </div>
            </div>
            {hasSite === 'yes' && (
              <div>
                <label htmlFor="ask-link" className="mb-2 block text-sm font-semibold">Paste the link <span className="font-normal">(optional)</span></label>
                <input id="ask-link" type="url" inputMode="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="yourbusiness.com" className={field} />
              </div>
            )}
            {hasSite === 'no' && (
              <div>
                <p className="mb-2 text-sm font-semibold">What do you most want it to do?</p>
                <div className="grid grid-cols-1 gap-2">
                  {GOALS.map((g) => (
                    <button key={g} type="button" className={choice(goal === g)} onClick={() => setGoal(g)}>{g}</button>
                  ))}
                </div>
              </div>
            )}
            <button
              type="button"
              disabled={!firstDone}
              onClick={() => setStep(2)}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-burnt-orange px-8 py-4 font-display text-lg uppercase tracking-[0.15em] text-white transition-colors hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-burnt-orange disabled:hover:text-white"
            >
              Next <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={send} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input aria-label="Your name" placeholder="Your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} required />
              <input aria-label="Business name" placeholder="Business name" autoComplete="organization" value={business} onChange={(e) => setBusiness(e.target.value)} className={field} required />
              <input aria-label="Email" type="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} required />
              <input aria-label="Phone" type="tel" placeholder="Phone" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} required />
            </div>
            <textarea aria-label="Anything else?" placeholder="Anything else? (optional)" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={field} />
            <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" />
            <div ref={setTurnstileBox} />
            {problem && <p role="alert" className="text-sm text-burnt-orange">{problem}</p>}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 font-display text-sm uppercase tracking-widest text-white hover:border-white">
                <ArrowLeft size={16} /> Back
              </button>
              <button type="submit" disabled={busy} className="flex flex-1 items-center justify-center gap-3 rounded-full bg-burnt-orange px-8 py-4 font-display text-lg uppercase tracking-[0.15em] text-white transition-colors hover:bg-paper hover:text-ink disabled:opacity-60">
                {busy ? <Loader2 size={18} className="animate-spin" /> : null} {busy ? 'Sending' : 'Send'}
              </button>
            </div>
            <p className="text-xs leading-relaxed text-white">A real person replies within one working day. No spam, no pressure.</p>
          </form>
        )}

        {step === 'sent' && (
          <div className="space-y-6">
            <CheckCircle2 size={44} className="text-burnt-orange" />
            <p className="text-lg leading-relaxed">Thanks{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}. We’ll look at what you told us and reply within one working day with an honest answer: a template, or something built for you.</p>
            <button type="button" onClick={onClose} className="rounded-full border border-white/25 px-8 py-4 font-display text-sm uppercase tracking-widest hover:border-white">Back to {templateName}</button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
