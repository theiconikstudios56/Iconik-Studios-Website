import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { m } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Crown, Loader2, MessageCircle } from 'lucide-react';
import Layout from '../components/Layout';
import FinalCTA from '../components/FinalCTA';
import { Checks, HowItWorks, Included, FOUNDING_OPEN, MoneyBack, Questions } from '../components/shop/ShopParts';
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

/** One template in the shop: its name in motion, the live site with your name on it, the plan and Buy (11.10). */
export default function TemplatePage() {
  const { slug } = useParams();
  const template = templateBySlug(slug);
  const [yourName, setYourName] = useState('');
  const [asking, setAsking] = useState(false);
  const closeAsk = useCallback(() => setAsking(false), []);
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
      <div className="bg-ink text-paper">
        <div className="px-6 pt-28 lg:px-12 lg:pt-36">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 pb-8">
            <Link to="/templates" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white transition-colors hover:text-burnt-orange">
              <ArrowLeft size={14} /> All templates
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-burnt-orange">
              Drop 001 · No. {String(number).padStart(2, '0')} of {shop.templates.length}
            </p>
          </div>
        </div>

        <NameReel name={template.name} picture={hero} />

        <section className="px-6 pb-28 pt-16 lg:px-12 lg:pt-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Purchase template={template} yourName={yourName} onAsk={() => setAsking(true)} />
              </div>
            </div>
            <m.div initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-7">
              <LivePreview demo={template.demo} name={yourName} onName={setYourName} picture={hero} templateName={template.name} />
            </m.div>
          </div>
        </section>
      </div>

      <MadeByPeople onAsk={() => setAsking(true)} />

      <section className="rounded-t-[32px] bg-paper px-6 py-32 text-ink lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-6 block font-mono text-xs uppercase tracking-widest">With {template.name} you get</span>
              <h2 className="max-w-4xl font-display text-5xl uppercase leading-[0.9] tracking-tighter md:text-7xl">A whole website, not a starting point.</h2>
            </div>
            <div className="lg:col-span-5">
              <span className="mb-6 block font-mono text-xs uppercase tracking-widest">How it works</span>
              <HowItWorks />
            </div>
          </div>
          <Included />
        </div>
      </section>

      <section className="bg-ink px-6 py-32 text-paper lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tighter">More from the drop</h2>
            <Link to="/templates" className="border-b border-white/40 py-1 font-display text-sm uppercase tracking-widest hover:border-burnt-orange hover:text-burnt-orange">See them all</Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((t) => (
              <Link key={t.key} to={`/templates/${t.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/15">
                  <img src={pictureOf(t.slug, 'hero')} alt="" loading="lazy" decoding="async" className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white">See {t.name} <ArrowRight size={12} /></span>
                  </div>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-burnt-orange">{t.industry}</p>
                <p className="font-display text-2xl uppercase transition-colors group-hover:text-burnt-orange">{t.name}</p>
              </Link>
            ))}
          </div>
          <div className="mt-32 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-burnt-orange">Questions</span>
              <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tighter">Before you buy</h2>
              <button type="button" onClick={() => setAsking(true)} className="mt-8 inline-flex items-center gap-2 border-b border-white/40 py-1 font-display text-sm uppercase tracking-widest hover:border-burnt-orange hover:text-burnt-orange">
                Ask us yours <ArrowRight size={14} />
              </button>
            </div>
            <div className="lg:col-span-8">
              <Questions />
            </div>
          </div>
        </div>
      </section>
      <FinalCTA />
      <AskUs open={asking} onClose={closeAsk} templateName={template.name} industry={template.industry} />
    </Layout>
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
    // Slides in but is never invisible: the template's name is the first thing a visitor from a post should see.
    <m.div initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-burnt-orange">{template.industry} website</p>
      <h1 className="mb-6 font-display text-7xl uppercase leading-none tracking-tighter md:text-8xl">{template.name}</h1>
      <p className="mb-4 text-lg leading-relaxed text-white">{template.summary}</p>
      <p className="mb-8 text-base leading-relaxed text-white">
        Comes with {listed(template.pages.map((p) => p.title))} pages, already written, with room for up to {template.pageLimit}.
      </p>

      <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="font-display text-6xl leading-none">{money(template.price)}</div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white">The template, yours to keep</p>
          </div>
          <p className="max-w-[11rem] text-right text-sm leading-snug text-white">
            + {money(planPrice)} a {per} for hosting, the editor, your domain and forms
          </p>
        </div>
        <div role="radiogroup" aria-label="Sites plan" className="mb-5 grid grid-cols-2 gap-2 rounded-full bg-white/[0.06] p-1">
          {(['monthly', 'yearly'] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={plan === p}
              onClick={() => setPlan(p)}
              className={`rounded-full px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${plan === p ? 'bg-paper text-ink' : 'text-white hover:bg-white/10'}`}
            >
              {p === 'monthly' ? 'Monthly' : `Yearly · save ${money(yearlySaving)}`}
            </button>
          ))}
        </div>
        <div className="flex justify-between gap-4 border-t border-white/15 pt-4 font-display text-xl uppercase">
          <span>Today</span>
          <span>{money(template.price + planPrice)}</span>
        </div>
        <p className="mt-2 text-xs text-white">Plus sales tax where it applies. Then {money(planPrice)} a {per}; cancel any time.</p>

        <button
          type="button"
          onClick={start}
          disabled={!canBuy || busy}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-burnt-orange px-8 py-5 font-display text-lg uppercase tracking-[0.15em] text-white transition-all hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-burnt-orange disabled:hover:text-white"
        >
          {busy ? <Loader2 size={18} className="animate-spin" /> : null}
          {!canBuy ? 'Opening soon' : busy ? 'Opening checkout…' : <>Buy {template.name} <ArrowRight size={18} /></>}
        </button>
        <button
          type="button"
          onClick={onAsk}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 font-display text-sm uppercase tracking-widest text-white transition-colors hover:border-paper"
        >
          <MessageCircle size={16} /> Not sure yet? Ask us
        </button>
        <div className="mt-4">
          <MoneyBack />
        </div>
        {problem && <p role="alert" className="mt-3 text-sm text-burnt-orange">{problem}</p>}
        <a href={demoWithName(template.demo, yourName)} target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white underline-offset-4 hover:text-burnt-orange hover:underline">
          Open the live demo{yourName.trim() ? ' with your name' : ''} <ArrowUpRight size={14} />
        </a>
        <div className="mt-5">
          <Checks items={['Secure checkout by Stripe', 'Set up in minutes: we email your login straight away', 'Email help from a real person, replies within 1–2 business days']} />
        </div>
        <p className="mt-5 text-xs leading-relaxed text-white">
          By buying you agree to the Sites{' '}
          <a href={`${SITES_APP}/terms`} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-burnt-orange">terms</a>
          {' '}and{' '}
          <a href={`${SITES_APP}/refunds`} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-burnt-orange">refund policy</a>.
        </p>
      </div>
    </m.div>
  );
}

/** The brand layer: real people behind every template, and the founding-buyer call. */
function MadeByPeople({ onAsk }: { onAsk: () => void }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pb-28 text-paper lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 rounded-[32px] border border-white/15 bg-white/[0.03] p-8 md:p-14 lg:grid-cols-12">
        <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-6">
          <div className="mb-5 font-serif text-3xl italic text-burnt-orange">Put the crown on it.</div>
          <h2 className="mb-6 font-display text-5xl uppercase leading-[0.9] tracking-tighter md:text-6xl">Made by people. Real ones.</h2>
          <p className="mb-4 text-lg leading-relaxed text-white">
            Every Iconik template is designed and written in Phoenix by the same studio that builds custom websites for local businesses. Not a page builder. Not your nephew.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-white">When you email us, a real person answers. And if a template isn’t the right fit, we’ll tell you.</p>
          {FOUNDING_OPEN && (
            <div className="mb-8 flex gap-4 rounded-2xl border border-burnt-orange/50 bg-burnt-orange/10 p-5">
              <Crown size={22} className="mt-0.5 shrink-0 text-burnt-orange" />
              <p className="leading-relaxed text-white">
                <strong className="font-semibold">Founding offer:</strong> our first 10 buyers get a free 20-minute setup call with Ricky, who builds these. We’ll get your site live together.
              </p>
            </div>
          )}
          <button type="button" onClick={onAsk} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 font-display text-sm uppercase tracking-widest hover:border-paper">
            Talk to us first <ArrowRight size={16} />
          </button>
        </m.div>
        <m.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="lg:col-span-6">
          <img src={lineup} alt="The Iconik Fuzzies, crowned, lined up" loading="lazy" decoding="async" className="w-full rounded-2xl object-cover" />
        </m.div>
      </div>
    </section>
  );
}
