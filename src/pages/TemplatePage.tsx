import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import FinalCTA from '../components/FinalCTA';
import { BrowserFrame, Checks, HowItWorks, Included, MoneyBack, Questions } from '../components/shop/ShopParts';
import { buy, canBuy, money, pictureOf, shop, templateBySlug, type ShopPlan, type ShopTemplate } from '../lib/shop';
import NotFoundPage from './NotFoundPage';
import { metaViewContent } from '../lib/metaPixel';

// Where Sites' own pages (terms, refunds, help) live (RMD-crm 11.12).
const SITES_APP = 'https://app.iconik.site';

/** One template in the shop: its whole home page, its pages, the plan and Buy (11.10). */
export default function TemplatePage() {
  const { slug } = useParams();
  const template = templateBySlug(slug);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  useEffect(() => {
    if (template && shop) metaViewContent(template, shop.currency);
  }, [template, shop]);
  if (!template || !shop) return <NotFoundPage />;
  const others = shop.templates.filter((t) => t.key !== template.key);

  return (
    <Layout
      title={`${template.name}: ${template.industry} Website Template | Iconik Studios`}
      description={`${template.summary} Every page written for you, hosting and your own domain included.`}
    >
      <div className="bg-ink text-paper">
        <section className="px-6 pb-28 pt-32 lg:px-12 lg:pt-40">
          <div className="mx-auto max-w-7xl">
            <Link to="/templates" className="mb-12 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-burnt-orange">
              <ArrowLeft size={14} /> All templates
            </Link>
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <Purchase template={template} />
                </div>
              </div>
              <motion.div initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-7">
                <BrowserFrame src={pictureOf(template.slug, 'full')} alt={`The ${template.name} template’s home page, top to bottom`} address={template.demo.replace('https://', '')} scroll />
                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll the preview, or open the live demo to click around</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

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
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tighter">More templates</h2>
            <Link to="/templates" className="border-b border-white/30 py-1 font-display text-sm uppercase tracking-widest hover:border-burnt-orange hover:text-burnt-orange">See them all</Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((t) => (
              <Link key={t.key} to={`/templates/${t.slug}`} className="group block">
                <div className="aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                  <img src={pictureOf(t.slug, 'hero')} alt="" loading="lazy" decoding="async" className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-burnt-orange">{t.industry}</p>
                <p className="font-display text-2xl uppercase">{t.name}</p>
              </Link>
            ))}
          </div>
          <div className="mt-32 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-burnt-orange">Questions</span>
              <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tighter">Before you buy</h2>
            </div>
            <div className="lg:col-span-8">
              <Questions />
            </div>
          </div>
        </div>
      </section>
      <FinalCTA />
    </Layout>
  );
}

function Purchase({ template }: { template: ShopTemplate }) {
  const [plan, setPlan] = useState<ShopPlan>('yearly');
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const plans = shop!.plans;
  const planPrice = plans[plan];
  const yearlySaving = plans.monthly * 12 - plans.yearly;

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
    <motion.div initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-burnt-orange">{template.industry} website</p>
      <h1 className="mb-6 font-display text-7xl uppercase leading-none tracking-tighter md:text-8xl">{template.name}</h1>
      <p className="mb-8 text-lg leading-relaxed text-white/75">{template.summary}</p>

      <div className="mb-8">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">{template.pages.length} pages, ready to edit</p>
        <div className="flex flex-wrap gap-2">
          {template.pages.map((p) => (
            <span key={p.path} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">{p.title}</span>
          ))}
          <span className="rounded-full border border-dashed border-white/15 px-3 py-1 text-xs text-white/50">up to {template.pageLimit} in all</span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div role="radiogroup" aria-label="Sites plan" className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-white/5 p-1">
          {(['yearly', 'monthly'] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={plan === p}
              onClick={() => setPlan(p)}
              className={`rounded-full px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${plan === p ? 'bg-paper text-ink' : 'text-white/60 hover:text-white'}`}
            >
              {p === 'monthly' ? 'Monthly' : `Yearly · save ${money(yearlySaving)}`}
            </button>
          ))}
        </div>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-white/70">{template.name} template, yours to keep using</dt>
            <dd>{money(template.price)} once</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-white/70">Sites plan: hosting, editor, domain, forms</dt>
            <dd>{money(planPrice)} / {plan === 'monthly' ? 'month' : 'year'}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-white/10 pt-3 font-display text-xl uppercase">
            <dt>Today</dt>
            <dd>{money(template.price + planPrice)}</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-white/45">Plus sales tax where it applies. Then {money(planPrice)} a {plan === 'monthly' ? 'month' : 'year'}; cancel any time.</p>

        <button
          type="button"
          onClick={start}
          disabled={!canBuy || busy}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-burnt-orange px-8 py-5 font-display text-lg uppercase tracking-[0.15em] text-white transition-all hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-burnt-orange disabled:hover:text-white"
        >
          {busy ? <Loader2 size={18} className="animate-spin" /> : null}
          {!canBuy ? 'Opening soon' : busy ? 'Opening checkout…' : <>Buy {template.name} <ArrowRight size={18} /></>}
        </button>
        <div className="mt-3">
          <MoneyBack />
        </div>
        {problem && <p role="alert" className="mt-3 text-sm text-burnt-orange">{problem}</p>}
        <a href={template.demo} target="_blank" rel="noreferrer" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 font-display text-sm uppercase tracking-widest transition-colors hover:border-paper">
          Open the live demo <ArrowUpRight size={16} />
        </a>
        <div className="mt-6">
          <Checks items={['Secure checkout by Stripe', 'Set up in minutes: we email your login straight away', 'Email help from a real person, replies within 1–2 business days']} />
        </div>
        <p className="mt-5 text-xs leading-relaxed text-white/45">
          By buying you agree to the Sites{' '}
          <a href={`${SITES_APP}/terms`} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">terms</a>
          {' '}and{' '}
          <a href={`${SITES_APP}/refunds`} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">refund policy</a>.
        </p>
      </div>
    </motion.div>
  );
}
