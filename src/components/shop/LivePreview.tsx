import { useEffect, useRef, useState, type ReactNode } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { Loader2, Monitor, Smartphone } from 'lucide-react';

/** The live demo with ?yourname= and ?embed=1 (Sites shows the visitor's name and drops its shop bar). */
export function demoWithName(demo: string, name: string, embed = false) {
  const url = new URL(demo);
  if (name.trim()) url.searchParams.set('yourname', name.trim());
  if (embed) url.searchParams.set('embed', '1');
  return url.toString();
}

const DESKTOP = 1280;
const PHONE = 390;

/** The window tips up flat as it scrolls into view (the template page's hero effect). */
function TipUp({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  return (
    <div ref={ref} className="[perspective:1400px]">
      <m.div style={{ rotateX, scale }} className="origin-bottom">
        {children}
      </m.div>
    </div>
  );
}

/**
 * "See it with your name on it": the template's live demo, framed as a laptop
 * screen or a phone, re-drawn with the visitor's business name as they type.
 */
export default function LivePreview({ demo, name, onName, picture, templateName, placeholder = 'Your business name' }: { demo: string; name: string; onName: (name: string) => void; picture?: string; templateName: string; placeholder?: string }) {
  const [device, setDevice] = useState<'desktop' | 'phone'>('desktop');
  const [shown, setShown] = useState(name); // the name the frame is showing, a moment behind the typing
  const [loading, setLoading] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Phones start on the phone view (a laptop screen that small is hard to read).
  useEffect(() => {
    if (window.matchMedia('(max-width: 640px)').matches) setDevice('phone');
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setShown(name), 550);
    return () => window.clearTimeout(t);
  }, [name]);

  const src = demoWithName(demo, shown, true);
  useEffect(() => setLoading(true), [src, device]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const read = () => setWidth(el.clientWidth);
    read();
    const watch = new ResizeObserver(read);
    watch.observe(el);
    return () => watch.disconnect();
  }, [device]);

  const frameWidth = device === 'desktop' ? DESKTOP : PHONE;
  const scale = width ? width / frameWidth : 0;
  const viewHeight = device === 'desktop' ? Math.min(640, Math.max(300, width * 0.62)) : Math.min(640, width * 2.05);

  return (
    <div>
      <label htmlFor="your-name" className="sr-only">Your business name</label>
      <div className="mx-auto mb-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
        <input
          id="your-name"
          type="text"
          value={name}
          maxLength={40}
          autoComplete="organization"
          placeholder={placeholder}
          onChange={(e) => onName(e.target.value)}
          className="min-w-0 flex-1 rounded-full border border-white/25 bg-white/[0.06] px-6 py-4 text-lg text-white placeholder:text-white/60 focus:border-burnt-orange focus:outline-none"
        />
        <div role="radiogroup" aria-label="Show it on" className="grid shrink-0 grid-cols-2 gap-1 rounded-full bg-white/[0.06] p-1">
          {([
            ['desktop', Monitor, 'Laptop'],
            ['phone', Smartphone, 'Phone'],
          ] as const).map(([key, Icon, label]) => (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={device === key}
              onClick={() => setDevice(key)}
              className={`flex items-center justify-center gap-2 rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${device === key ? 'bg-paper text-ink' : 'text-white hover:bg-white/10'}`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>
      </div>

      <TipUp>
      <div className={device === 'phone' ? 'mx-auto w-full max-w-[310px]' : ''}>
        <div className={device === 'phone' ? 'rounded-[44px] border border-white/20 bg-[#0d0d0d] p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]' : 'overflow-hidden rounded-2xl border border-white/15 bg-[#111] shadow-[0_40px_110px_-40px_rgba(205,127,50,0.35)]'}>
          {device === 'desktop' && (
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="ml-3 truncate rounded-full bg-white/[0.07] px-3 py-1 font-mono text-[10px] tracking-wider text-white">{demo.replace('https://', '')}</span>
            </div>
          )}
          <div ref={box} className={`relative overflow-hidden bg-white ${device === 'phone' ? 'rounded-[32px]' : ''}`} style={{ height: viewHeight || undefined }}>
            {picture && <img src={picture} alt="" className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0'}`} />}
            {scale > 0 && (
              <iframe
                key={device}
                src={src}
                title={`The ${templateName} template, live${shown ? ` with ${shown}` : ''}`}
                loading="lazy"
                sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                onLoad={() => setLoading(false)}
                className="absolute left-0 top-0 origin-top-left border-0"
                style={{ width: frameWidth, height: viewHeight / scale, transform: `scale(${scale})` }}
              />
            )}
            {loading && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink/85 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                <Loader2 size={13} className="animate-spin" /> {shown ? 'Putting your name on it' : 'Loading the live site'}
              </div>
            )}
          </div>
        </div>
      </div>
      </TipUp>
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white">Scroll and click around: it’s the real site</p>
    </div>
  );
}
