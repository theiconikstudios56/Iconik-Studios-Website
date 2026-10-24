import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Globe2, History, Mail, MousePointerClick, PenLine, ShieldCheck } from 'lucide-react';

/** A screenshot in a plain browser window, the way a buyer will see their site. */
export function BrowserFrame({ src, alt, address, scroll = false, className = '' }: { src?: string; alt: string; address: string; scroll?: boolean; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="ml-3 truncate rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] tracking-wider text-white/50">{address}</span>
      </div>
      <div className={scroll ? 'max-h-[78vh] overflow-y-auto overscroll-contain [scrollbar-width:thin]' : ''}>
        {src ? <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" /> : <div className="aspect-[16/10] bg-white/5" />}
      </div>
    </div>
  );
}

const INCLUDED = [
  { icon: PenLine, title: 'Every page, already written', text: 'Home, about, services, contact and more, with words and photos made for your kind of business. Swap in your own details and you’re close to done.' },
  { icon: MousePointerClick, title: 'Edit right on the page', text: 'Click any heading, sentence or photo and change it. Pick your colours and fonts. No code, no plugins, nothing to install.' },
  { icon: Globe2, title: 'Your own domain', text: 'Live at once on a free address, then on the domain you already own, with the secure padlock set up for you. Your email stays where it is.' },
  { icon: Mail, title: 'Forms that reach you', text: 'Every enquiry is emailed to you and kept in your inbox inside Sites. Spam is filtered out before it gets to you.' },
  { icon: History, title: 'Publish when ready', text: 'Work on a draft, preview it on phone and desktop, then publish. Every version is kept, so you can go back in one click.' },
  { icon: ShieldCheck, title: 'Hosting that just works', text: 'Fast pages served worldwide, security and updates handled by us. You never think about servers.' },
];

export function Included() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
      {INCLUDED.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 3) * 0.08 }}
          className="space-y-4 bg-paper p-10"
        >
          <item.icon className="text-burnt-orange" size={28} strokeWidth={1.5} />
          <h3 className="font-display text-2xl uppercase leading-tight text-ink">{item.title}</h3>
          <p className="leading-relaxed text-ink/75">{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

const QUESTIONS = [
  ['Do I need any technical skills?', 'No. If you can edit a document, you can edit your site. You click on what you want to change and type. Each template comes with its pages already written for your industry.'],
  ['What do I pay, and when?', 'The template once, and the Sites plan monthly or yearly (two months free on yearly). The plan covers hosting, the editor, your domain connection, forms and version history. Sales tax is added where it applies.'],
  ['Can I use the domain I already have?', 'Yes. Sites shows you the two settings to copy into the company where you bought your domain, and checks them for you. Your email isn’t affected.'],
  ['What if it isn’t right for me?', 'Ask for a refund within 14 days of buying and you get the template and your first payment back.'],
  ['Can I cancel?', 'Any time, from your account. Your site stays up until the end of the period you’ve paid for.'],
  ['Can I take my site with me later?', 'After 12 months on the plan you can download your site as plain files to host anywhere.'],
  ['I’d rather someone built it for me.', 'We do that too, along with booking, follow-up emails and a CRM that captures every lead. Tell us about your business on the contact page.'],
];

export function Questions() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {QUESTIONS.map(([q, a], i) => (
        <div key={q}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-6 py-7 text-left"
          >
            <span className="font-display text-xl uppercase tracking-tight text-paper md:text-2xl">{q}</span>
            <span className={`shrink-0 font-mono text-xl text-burnt-orange transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          <div className={`grid transition-all duration-500 ${open === i ? 'grid-rows-[1fr] pb-7' : 'grid-rows-[0fr]'}`}>
            <p className="overflow-hidden max-w-3xl leading-relaxed text-white/70">{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Checks({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/75">
          <Check size={16} className="mt-0.5 shrink-0 text-burnt-orange" />
          {item}
        </li>
      ))}
    </ul>
  );
}
