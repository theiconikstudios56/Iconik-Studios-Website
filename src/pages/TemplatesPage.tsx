import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, MousePointer2 } from 'lucide-react';
import Layout from '../components/Layout';
import FinalCTA from '../components/FinalCTA';
import { Included, Questions } from '../components/shop/ShopParts';
import { industries, money, pictureOf, shop, templateBySlug, type ShopTemplate } from '../lib/shop';
import { Img, T } from '../content';
import deskFuzzy from '../assets/images/web/fuzzy-automation.webp';

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
        <section className="relative overflow-hidden px-6 pb-16 pt-36 lg:px-12 lg:pb-20 lg:pt-44">
          <div className="relative mx-auto grid max-w-[88rem] grid-cols-1 items-center gap-16 lg:grid-cols-12">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-6">
              <div className="mb-8 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-burnt-orange" />
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-burnt-orange"><T k="templates.eyebrow">{"Website Templates"}</T></span>
              </div>
              <h1 className="mb-10 font-display text-6xl uppercase leading-[0.95] tracking-tighter md:text-8xl lg:text-[6.5rem]">
                <T k="templates.title" em="text-burnt-orange italic" label="Heading">{"Your next website,\n*ready today.*"}</T>
              </h1>
              <p className="mb-12 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
                <T k="templates.intro">{"Complete websites designed by our studio for local businesses. Pick the one that fits, make it yours in a simple editor, and go live on your own domain. Hosting included."}</T>
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a href="#templates" className="group inline-flex items-center gap-3 rounded-full bg-paper px-10 py-5 font-display text-lg uppercase text-ink transition-all hover:bg-burnt-orange hover:text-white">
                  Browse templates <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
                </a>
                <Link to="/contact" className="inline-flex items-center gap-2 border-b border-white/30 py-1 font-display text-sm uppercase tracking-widest transition-colors hover:border-burnt-orange hover:text-burnt-orange">
                  Or have us build it <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.div>
            {shop && <HeroFan />}
          </div>
          {shop && <Facts />}
        </section>

        {shop ? (
          <section id="templates" className="scroll-mt-28 px-6 pb-32 pt-8 lg:px-12">
            {industries.length > 1 && <IndustryFilter current={current?.slug} total={shop.templates.length} />}
            <div className="mx-auto grid max-w-[88rem] grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-y-20">
              {shown.map((template, i) => (
                <TemplateCard key={template.key} template={template} index={i} />
              ))}
              {/* An odd number of templates leaves a gap; the made-for-you option fills it. */}
              {shown.length % 2 === 1 && <BuiltForYouCard />}
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

      {/* On black, so the panel's rounded top corners show. */}
      <div className="bg-ink">
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
      </div>

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
    <nav aria-label="Templates by industry" className="mx-auto mb-16 max-w-[88rem]">
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
  const number = String(shop!.templates.indexOf(template) + 1).padStart(2, '0');
  const palette = [template.colors.background, template.colors.brand, template.colors.text];
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}
      className="group flex flex-col rounded-[28px] border border-white/10 bg-white/[0.03] p-3 transition-colors duration-500 hover:border-burnt-orange/40 md:p-4"
    >
      <Link to={`/templates/${template.slug}`} className="block" aria-label={`${template.name}: see the template`}>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
          {/* The whole home page glides past on hover, like scrolling the real site. */}
          <div className="relative h-[20rem] overflow-hidden md:h-[24rem]">
            {full && (
              <img
                src={full}
                alt={`The ${template.name} template’s home page`}
                loading="lazy"
                decoding="async"
                className="absolute inset-x-0 top-0 w-full transition-transform duration-[7000ms] ease-in-out group-hover:-translate-y-[calc(100%-20rem)] md:group-hover:-translate-y-[calc(100%-24rem)] motion-reduce:transition-none"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0" />
            <span className="pointer-events-none absolute bottom-4 right-4 hidden items-center gap-2 rounded-full border border-white/15 bg-ink/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/70 backdrop-blur transition-opacity duration-300 group-hover:opacity-0 md:inline-flex">
              <MousePointer2 size={11} /> Hover to scroll
            </span>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-7 md:px-5 md:pb-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-burnt-orange">
            <span className="text-white/40">{number}</span> <span className="mx-1.5 text-white/20">/</span> {template.industry}
          </p>
          <p className="rounded-full border border-white/15 px-4 py-1.5 font-display text-lg leading-none">{money(template.price)}</p>
        </div>
        <h2 className="font-display text-4xl uppercase tracking-tight md:text-5xl">
          <Link to={`/templates/${template.slug}`} className="transition-colors hover:text-burnt-orange">{template.name}</Link>
        </h2>
        <p className="mb-6 mt-3 max-w-md leading-relaxed text-white/65">{template.summary}</p>
        <div className="mt-auto flex items-center gap-5 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
          <span className="flex items-center gap-2.5">
            <span className="flex -space-x-1.5" aria-hidden>
              {palette.map((c) => (
                <span key={c} className="size-4 rounded-full ring-2 ring-[#0a0a0a]" style={{ background: c }} />
              ))}
            </span>
            Palette
          </span>
          <span className="h-3 w-px bg-white/15" />
          <span>{template.pages.length} pages</span>
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
      </div>
    </motion.article>
  );
}

/** The other way to get a site: Iconik builds it, with the systems behind it. */
function BuiltForYouCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="group flex flex-col overflow-hidden rounded-[28px] border border-burnt-orange/30 bg-[#080808]"
    >
      {/* The picture across the top, filling the spare height and fading into the card's own near-black
          (#080808, the template cards' shade), so there's no seam where the words begin. */}
      <div className="relative min-h-[16rem] flex-1 overflow-hidden md:min-h-[20rem]">
        <Img
          k="templates.custom.image"
          label="Background picture"
          src={deskFuzzy}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent from-35% to-[#080808]" />
      </div>
      <div className="relative -mt-14 px-6 pb-7 md:-mt-16 md:px-9 md:pb-9">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-burnt-orange"><T k="templates.custom.eyebrow">{"Made for you"}</T></p>
        <h2 className="mb-4 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-5xl">
          <T k="templates.custom.title" em="text-burnt-orange italic" label="Heading">{"Rather we\n*build it?*"}</T>
        </h2>
        <p className="mb-6 max-w-md leading-relaxed text-white/65">
          <T k="templates.custom.text">{"We design a site around your business, then add booking, follow-ups and a CRM that catches every lead."}</T>
        </p>
        <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 font-display text-sm uppercase tracking-widest text-ink transition-all hover:bg-burnt-orange hover:text-white">
          Talk to us <ArrowRight size={16} />
        </Link>
      </div>
    </motion.aside>
  );
}

// The hero's three screenshots: one each from three different-looking industries where they exist.
const FAN = ['linen', 'onyx', 'crumb'];

/** Three templates fanned out like prints on a desk; they spread a little on hover. */
function HeroFan() {
  const picked = FAN.map(templateBySlug).filter((t): t is ShopTemplate => Boolean(t));
  const fan = picked.length === 3 ? picked : shop!.templates.slice(0, 3);
  const spots = [
    'left-0 top-24 w-[60%] -rotate-[8deg] group-hover:-translate-x-6 group-hover:-rotate-[10deg]',
    'right-0 top-0 w-[60%] rotate-[6deg] group-hover:translate-x-6 group-hover:rotate-[8deg]',
    'left-[20%] top-40 z-10 w-[68%] group-hover:-translate-y-3',
  ];
  return (
    <div className="group relative hidden h-[34rem] lg:col-span-6 lg:block" aria-hidden>
      {fan.map((t, i) => (
        <motion.div
          key={t.key}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute transition-transform duration-700 ease-out ${spots[i]}`}
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]">
            <img src={pictureOf(t.slug, 'hero')} alt="" decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/** The shop in four numbers, all from Sites' own catalogue. */
function Facts() {
  const lowest = Math.min(...shop!.templates.map((t) => t.price));
  const facts = [
    [String(shop!.templates.length), 'Templates'],
    [String(industries.length), 'Industries'],
    [money(lowest), 'Once, per template'],
    [money(shop!.plans.monthly), 'A month, hosting included'],
  ];
  return (
    <motion.dl
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative mx-auto mt-20 grid max-w-[88rem] grid-cols-2 border-y border-white/10 lg:mt-24 lg:grid-cols-4"
    >
      {facts.map(([value, label], i) => (
        <div key={label} className={`px-2 py-8 md:px-8 ${i % 2 ? 'border-l border-white/10' : ''} ${i === 2 ? 'border-t border-white/10 lg:border-l lg:border-t-0' : ''} ${i === 3 ? 'border-t border-white/10 lg:border-t-0' : ''}`}>
          <dt className="sr-only">{label}</dt>
          <dd className="font-display text-5xl leading-none md:text-6xl">{value}</dd>
          <dd className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</dd>
        </div>
      ))}
    </motion.dl>
  );
}
