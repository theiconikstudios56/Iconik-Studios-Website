import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Layout from '../components/Layout';
import FinalCTA from '../components/FinalCTA';
import { Included, PriceLine, Questions } from '../components/shop/ShopParts';
import { industries, money, pictureOf, shop, type ShopTemplate } from '../lib/shop';
import { T } from '../content';

/** The template shop (RMD-crm BUILD_PLAN 11.10): every template, its price and its live demo. */
export default function TemplatesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // The industry filter lives in the address (/templates?industry=roofing), so a
  // post can link to one industry and Back steps through the filters.
  const [params] = useSearchParams();
  const current = industries.find((i) => i.slug === params.get('industry'));
  const shown = shop?.templates.filter((t) => !current || t.industry === current.label) ?? [];

  return (
    <Layout
      page="templates"
      title="Website Templates for Local Businesses | Iconik Studios"
      description={`Complete, ready-to-edit websites for ${industryList} businesses. Every page written for your industry, hosting and your own domain included.`}
    >
      <div className="bg-ink text-paper">
        <section className="px-6 pb-24 pt-40 lg:px-12 lg:pt-48">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-burnt-orange" />
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-burnt-orange"><T k="templates.eyebrow">{"Website Templates"}</T></span>
              </div>
              <h1 className="mb-10 font-display text-6xl uppercase leading-[0.95] tracking-tighter md:text-8xl lg:text-[7.5rem]">
                <T k="templates.title" em="text-burnt-orange italic" label="Heading">{"Your next website,\n*ready today.*"}</T>
              </h1>
              <p className="mb-10 max-w-2xl text-xl leading-relaxed text-white/80">
                <T k="templates.intro">{"Complete websites designed by our studio for local businesses. Pick the one that fits, make it yours in a simple editor, and go live on your own domain. Hosting included."}</T>
              </p>
              {shop ? <PriceLine className="text-white/60" /> : null}
            </motion.div>
          </div>
        </section>

        {shop ? (
          <section className="px-6 pb-32 lg:px-12">
            {industries.length > 1 && <IndustryFilter current={current?.slug} total={shop.templates.length} />}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2">
              {shown.map((template, i) => (
                <TemplateCard key={template.key} template={template} index={i} />
              ))}
            </div>
          </section>
        ) : (
          <section className="px-6 pb-32 lg:px-12">
            <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 p-12 md:p-16">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-burnt-orange">Opening soon</p>
              <h2 className="mb-6 font-display text-4xl uppercase tracking-tight md:text-5xl">The shop is almost ready.</h2>
              <p className="mb-8 max-w-xl text-white/70">Want a website sooner? We can build one for you, with booking, follow-ups and a CRM that catches every lead.</p>
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-paper px-10 py-5 font-display text-lg uppercase text-ink transition-all hover:bg-burnt-orange hover:text-white">
                Talk to us <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        )}
      </div>

      <section className="rounded-t-[32px] bg-paper px-6 py-32 text-ink lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-6 block font-mono text-xs uppercase tracking-widest"><T k="templates.included.eyebrow">{"Every template includes"}</T></span>
              <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tighter md:text-7xl"><T k="templates.included.title" label="Heading">{"A whole website,\nnot a starting point."}</T></h2>
            </div>
            <div className="lg:col-span-5">
              <ol className="space-y-5">
                {[
                  ['01', 'Pick a template and pay once, with the plan monthly or yearly.'],
                  ['02', 'Give it your business’s name, address and phone. Every page fills in.'],
                  ['03', 'Change anything you like, then publish. Connect your domain when you’re ready.'],
                ].map(([n, text]) => (
                  <li key={n} className="flex gap-5">
                    <span className="font-mono text-sm text-burnt-orange">{n}</span>
                    <span className="text-lg leading-snug">{text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <Included />
        </div>
      </section>

      <section className="bg-ink px-6 py-32 text-paper lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-burnt-orange">Questions</span>
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tighter">Before you buy</h2>
          </div>
          <div className="lg:col-span-8">
            <Questions />
          </div>
        </div>
      </section>
      <FinalCTA />
    </Layout>
  );
}

// "med spa, real estate, HVAC & plumbing and bakery" (… businesses) for the page's search description.
const industryList = (() => {
  const names = industries.map((i) => i.label.replace(/^[A-Z][a-z]/, (c) => c.toLowerCase()));
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0] ?? 'local businesses';
})();

/** "All" and a button per industry, with counts; one row that scrolls sideways on phones. */
function IndustryFilter({ current, total }: { current: string | undefined; total: number }) {
  const pill = (active: boolean) =>
    `inline-flex shrink-0 items-center gap-2.5 rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors ${
      active ? 'border-paper bg-paper text-ink' : 'border-white/15 text-white/70 hover:border-burnt-orange hover:text-paper'
    }`;
  const count = (n: number, active: boolean) => <span className={active ? 'text-ink/50' : 'text-burnt-orange'}>{n}</span>;
  return (
    <nav aria-label="Templates by industry" className="mx-auto mb-16 max-w-7xl">
      <ul className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden">
        <li className="shrink-0">
          <Link to="/templates" aria-current={!current ? 'page' : undefined} className={pill(!current)}>
            All {count(total, !current)}
          </Link>
        </li>
        {industries.map((i) => (
          <li key={i.slug} className="shrink-0">
            <Link to={`/templates?industry=${i.slug}`} aria-current={current === i.slug ? 'page' : undefined} className={pill(current === i.slug)}>
              {i.label} {count(i.count, current === i.slug)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TemplateCard({ template, index }: { template: ShopTemplate; index: number }) {
  const full = pictureOf(template.slug, 'full');
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}
      className="group"
    >
      <Link to={`/templates/${template.slug}`} className="block" aria-label={`${template.name}: see the template`}>
        {/* The whole home page glides past on hover, like scrolling the real site. */}
        <div className="relative h-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-[#111] md:h-[26rem]">
          {full && (
            <img
              src={full}
              alt={`The ${template.name} template’s home page`}
              loading="lazy"
              decoding="async"
              className="absolute inset-x-0 top-0 w-full transition-transform duration-[7000ms] ease-in-out group-hover:-translate-y-[calc(100%-22rem)] md:group-hover:-translate-y-[calc(100%-26rem)] motion-reduce:transition-none"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-0" />
        </div>
      </Link>
      <div className="mt-7 flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.4em] text-burnt-orange">{template.industry}</p>
          <h2 className="font-display text-4xl uppercase tracking-tight md:text-5xl">
            <Link to={`/templates/${template.slug}`} className="transition-colors hover:text-burnt-orange">{template.name}</Link>
          </h2>
          <p className="mt-3 max-w-md leading-relaxed text-white/65">{template.summary}</p>
        </div>
        <p className="shrink-0 font-display text-3xl">{money(template.price)}</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-6">
        <Link
          to={`/templates/${template.slug}`}
          className="inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 font-display text-sm uppercase tracking-widest text-ink transition-all hover:bg-burnt-orange hover:text-white"
        >
          See {template.name} <ArrowRight size={16} />
        </Link>
        <a href={template.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-white/30 py-1 font-display text-sm uppercase tracking-widest transition-colors hover:border-burnt-orange hover:text-burnt-orange">
          Live demo <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.article>
  );
}
