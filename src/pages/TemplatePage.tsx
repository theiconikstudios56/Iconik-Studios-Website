import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { m } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Loader2, MessageCircle } from 'lucide-react';
import Layout from '../components/Layout';
import FinalCTA from '../components/FinalCTA';
import { Checks, Included, FOUNDING_OPEN, MoneyBack, Questions } from '../components/shop/ShopParts';
import Editorial, { BronzeLabel } from '../components/shop/Editorial';
import NameReel from '../components/shop/NameReel';
import LivePreview, { demoWithName } from '../components/shop/LivePreview';
import AskUs from '../components/shop/AskUs';
import { buy, canBuy, money, pictureOf, shop, templateBySlug, type ShopPlan, type ShopTemplate } from '../lib/shop';
import NotFoundPage from './NotFoundPage';
import { metaViewContent } from '../lib/metaPixel';
import lineup from '../assets/images/web/fuzzy-lineup-2026.webp';

// Where Sites' own pages (terms, refunds, help) live (RMD-crm 11.12).
const SITES_APP = 'https://app.iconik.site';

/** "Home, About, Services and Projects" */
const listed = (items: string[]) => (items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`);

const toPrice = () => document.getElementById('price')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const STEPS = [
  ['Pick it', 'Pay once for the template at our secure Stripe checkout.'],
  ['Name it', 'Set your password from our email, then type your business name and phone. Every page fills in.'],
  ['Launch it', 'Publish and you’re live at once. Your own domain connects whenever you’re ready.'],
];

/** One template in the shop, in the editorial look of Iconik's posts (11.10, redesigned 2026-11-05). */
export default function TemplatePage() {
  const { slug } = useParams();
  const template = templateBySlug(slug);
  const [yourName, setYourName] = useState('');
  const [asking, setAsking] = useState(false);
  const closeAsk = useCallback(() => setAsking(false), []);
  const ask = useCallback(() => setAsking(true), []);
  useEffect(() => {
    window.scrollTo(0, 0);
    setYourName('');
  }, [slug]);
  useEffect(() => {
    if (template && shop) metaViewContent(template, shop.currency);
  }, [template, shop]);
  if (!template || !shop) return <NotFoundPage />;
  const others = shop.templates.filter((t) => t.key !== template.key);
  const number = shop.templates.findIndex((t) => t.key === template.key) + 1;
  const hero = pictureOf(template.slug, 'hero');

  return (
    <Layout
      title={`${template.name}: ${template.industry} Website Template | Iconik Studios`}
      description={`${template.summary} Every page written for you, hosting and your own domain included.`}
    >
      {/* 1. The hero: the post headline, the price label, two buttons, then the live site with your name on it. */}
      <section className="relative overflow-hidden bg-ink px-6 pb-40 pt-28 text-white lg:px-12 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-wrap items-center justify-between gap-4">
            <Link to="/templates" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white transition-colors hover:text-burnt-orange">
              <ArrowLeft size={14} /> All templates
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-burnt-orange">Drop 001 · No. {String(number).padStart(2, '0')} of {shop.templates.length}</span>
          </div>

          <Editorial as="h1" size="hero" thin={template.industry} heavy="Website" script={template.name} />

          <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-10 flex flex-col items-center text-center">
            <BronzeLabel>{money(template.price)} · Yours to keep</BronzeLabel>
            <div className="mt-7 max-w-2xl text-lg leading-relaxed text-white md:text-xl">
              {template.summary} Type your business name and watch {template.name} become yours. It’s the real site: scroll it, click around.
            </div>
          </m.div>

          {/* The live site with the visitor's name on it, tipping up as it scrolls in; the buttons wait underneath. */}
          <div className="mx-auto mt-14 max-w-6xl">
            <LivePreview demo={template.demo} name={yourName} onName={setYourName} picture={hero} templateName={template.name} placeholder="See it with your name on it" />
            <div className="mt-12 flex flex-col items-center text-center">
              <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <button type="button" onClick={toPrice} className="flex w-full items-center justify-center gap-3 rounded-full bg-burnt-orange px-9 py-5 font-display text-lg uppercase tracking-[0.15em] text-white transition-all hover:bg-paper hover:text-ink sm:w-auto">
                  Make it yours <ArrowRight size={18} />
                </button>
                <button type="button" onClick={ask} className="flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-5 font-display text-base uppercase tracking-widest text-white transition-colors hover:border-white sm:w-auto">
                  <MessageCircle size={17} /> Not sure yet? Ask us
                </button>
              </div>
              <div className="mt-6">
                <MoneyBack />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What you get, on the warm paper colourway. */}
      <section className="rounded-t-[36px] bg-[#f6f3ef] px-6 py-32 text-ink lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Editorial tone="light" thin="Every page" heavy="Already written" script="for you" />
          <div className="mx-auto mb-20 mt-8 max-w-2xl text-center text-lg leading-relaxed text-ink">
            {template.name} comes with {listed(template.pages.map((p) => p.title))} pages, with words and photos made for your kind of business, and room for up to {template.pageLimit}.
          </div>
          <div className="mb-24 grid grid-cols-1 gap-10 md:grid-cols-3">
            {STEPS.map(([title, text], i) => (
              <m.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }} className="text-center">
                <div className="font-display text-7xl leading-none text-burnt-orange">{String(i + 1).padStart(2, '0')}</div>
                <div className="mt-3 font-script text-5xl leading-tight text-ink">{title}</div>
                <div className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-ink">{text}</div>
              </m.div>
            ))}
          </div>
          <Included />
        </div>
      </section>

      {/* 4. The price. */}
      <section id="price" className="scroll-mt-24 bg-ink px-6 py-32 text-white lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Editorial thin="One template" heavy={money(template.price)} script="yours to keep" />
          <div className="mx-auto mt-14 max-w-xl">
            <Purchase template={template} yourName={yourName} onAsk={ask} />
          </div>
        </div>
      </section>

      {/* 5. The name reel: a breath between the sell and the people. */}
      <NameReel name={template.name} picture={pictureOf(template.slug, 'reel') ?? hero} />

      {/* 6. Made by people, on paper. */}
      <section className="bg-[#f6f3ef] px-6 py-32 text-ink lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Editorial tone="light" align="left" thin="Made by" heavy="Real people" script="in Phoenix" />
            <div className="mt-8 text-lg leading-relaxed text-ink">
              Every Iconik template is designed and written by the same studio that builds custom websites for local businesses. Not a page builder. Not your nephew.
            </div>
            <div className="mt-4 text-lg leading-relaxed text-ink">When you email us, a real person answers. And if a template isn’t the right fit for you, we’ll say so.</div>
            {FOUNDING_OPEN && (
              <div className="mt-9 rounded-2xl border-2 border-burnt-orange p-6">
                <BronzeLabel>Founding offer</BronzeLabel>
                <div className="mt-4 text-lg leading-relaxed text-ink">Our first 10 buyers get a free 20-minute setup call with Ricky, who builds these. You’ll be live by the end of it.</div>
              </div>
            )}
            <button type="button" onClick={ask} className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-display text-sm uppercase tracking-widest text-white transition-colors hover:bg-burnt-orange">
              Talk to us first <ArrowRight size={16} />
            </button>
          </div>
          <m.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="lg:col-span-6">
            <img src={lineup} alt="The Iconik Fuzzies, crowned, lined up" loading="lazy" decoding="async" className="w-full rounded-3xl object-cover" />
          </m.div>
        </div>
      </section>

      {/* 7. More from the drop, then questions. */}
      <section className="bg-ink px-6 py-32 text-white lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Editorial thin="More from" heavy="The drop" script="Drop 001" />
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((t, i) => (
              <m.div key={t.key} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08 }}>
                <Link to={`/templates/${t.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/15">
                    <img src={pictureOf(t.slug, 'hero')} alt="" loading="lazy" decoding="async" className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]" />
                  </div>
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-burnt-orange">{t.industry}</div>
                  <div className="font-script text-4xl leading-tight text-white transition-colors group-hover:text-burnt-orange">{t.name}</div>
                </Link>
              </m.div>
            ))}
          </div>
          <div className="mt-40 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Editorial align="left" thin="Before" heavy="You buy" script="Questions" />
              <button type="button" onClick={ask} className="mt-10 inline-flex items-center gap-2 border-b border-white/50 py-1 font-display text-sm uppercase tracking-widest hover:border-burnt-orange hover:text-burnt-orange">
                Ask us yours <ArrowRight size={14} />
              </button>
            </div>
            <div className="lg:col-span-7">
              <Questions />
            </div>
          </div>
        </div>
      </section>
      <FinalCTA />
      <PriceBar template={template} />
      <AskUs open={asking} onClose={closeAsk} templateName={template.name} industry={template.industry} />
    </Layout>
  );
}

/** Phones: a slim bar with the price and a way to it, once the hero's buttons have scrolled away. */
function PriceBar({ template }: { template: ShopTemplate }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const price = document.getElementById('price');
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const atPrice = price ? price.getBoundingClientRect().top < window.innerHeight && price.getBoundingClientRect().bottom > 0 : false;
      setShown(pastHero && !atPrice);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`fixed inset-x-3 z-40 transition-all duration-500 md:hidden bottom-[max(0.75rem,env(safe-area-inset-bottom))] ${shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>
      <div className="flex items-center justify-between gap-3 rounded-full border border-white/15 bg-ink/95 py-2 pl-5 pr-2 text-white shadow-2xl backdrop-blur">
        <div className="min-w-0 leading-tight">
          <div className="truncate font-script text-2xl text-burnt-orange">{template.name}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white">{money(template.price)} · first month free</div>
        </div>
        <button type="button" onClick={toPrice} className="shrink-0 rounded-full bg-burnt-orange px-5 py-3 font-display text-sm uppercase tracking-widest text-white">Make it yours</button>
      </div>
    </div>
  );
}

function Purchase({ template, yourName, onAsk }: { template: ShopTemplate; yourName: string; onAsk: () => void }) {
  const [plan, setPlan] = useState<ShopPlan>('monthly');
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const plans = shop!.plans;
  const planPrice = plans[plan];
  const yearlySaving = plans.monthly * 12 - plans.yearly;
  const per = plan === 'monthly' ? 'month' : 'year';

  async function start() {
    setBusy(true);
    setProblem(null);
    try {
      await buy(template, plan);
    } catch (error) {
      setProblem(error instanceof Error ? error.message : 'Checkout didn’t open. Please try again.');
      setBusy(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-7 md:p-9">
      <div className="text-center text-lg leading-relaxed text-white">
        Your first month of hosting is on us. Then {money(planPrice)} a {per} covers hosting, the editor, your own domain and forms.
      </div>
      <div role="radiogroup" aria-label="Sites plan" className="my-7 grid grid-cols-2 gap-2 rounded-full bg-white/[0.07] p-1">
        {(['monthly', 'yearly'] as const).map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={plan === p}
            onClick={() => setPlan(p)}
            className={`rounded-full px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${plan === p ? 'bg-paper text-ink' : 'text-white hover:bg-white/10'}`}
          >
            {p === 'monthly' ? 'Monthly' : `Yearly · save ${money(yearlySaving)}`}
          </button>
        ))}
      </div>
      <div className="space-y-3 text-base">
        <div className="flex justify-between gap-4">
          <span>{template.name} template</span>
          <span>{money(template.price)} once</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Hosting, editor, domain, forms</span>
          <span className="text-right">
            Free for 30 days
            <span className="block text-xs text-white">then {money(planPrice)} / {per}</span>
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-white/15 pt-4">
          <span className="font-display text-2xl uppercase">Today</span>
          <span className="font-display text-4xl">{money(template.price)}</span>
        </div>
      </div>
      <div className="mt-2 text-xs text-white">Plus sales tax where it applies. Hosting is free for 30 days, then {money(planPrice)} a {per}; cancel any time.</div>

      <button
        type="button"
        onClick={start}
        disabled={!canBuy || busy}
        className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-burnt-orange px-8 py-5 font-display text-lg uppercase tracking-[0.15em] text-white transition-all hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-burnt-orange disabled:hover:text-white"
      >
        {busy ? <Loader2 size={18} className="animate-spin" /> : null}
        {!canBuy ? 'Opening soon' : busy ? 'Opening checkout…' : <>Buy {template.name} <ArrowRight size={18} /></>}
      </button>
      <button type="button" onClick={onAsk} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 font-display text-sm uppercase tracking-widest text-white transition-colors hover:border-white">
        <MessageCircle size={16} /> Not sure yet? Ask us
      </button>
      <div className="mt-5">
        <MoneyBack />
      </div>
      {problem && (
        <div role="alert" className="mt-3 text-sm text-burnt-orange">
          {problem}
        </div>
      )}
      <a href={demoWithName(template.demo, yourName)} target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white hover:text-burnt-orange">
        Open the live demo{yourName.trim() ? ' with your name' : ''} <ArrowUpRight size={14} />
      </a>
      <div className="mt-6">
        <Checks items={['Secure checkout by Stripe', 'Set up in minutes: we email your login straight away', 'Email help from a real person, replies within 1–2 business days']} />
      </div>
      <div className="mt-5 text-xs leading-relaxed text-white">
        By buying you agree to the Sites{' '}
        <a href={`${SITES_APP}/terms`} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-burnt-orange">terms</a>
        {' '}and{' '}
        <a href={`${SITES_APP}/refunds`} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-burnt-orange">refund policy</a>.
      </div>
    </div>
  );
}
