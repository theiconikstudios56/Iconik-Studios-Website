import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { m } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, MousePointer2 } from 'lucide-react';
import Layout from '../components/Layout';
import FinalCTA from '../components/FinalCTA';
import { HowItWorks, Included, Questions } from '../components/shop/ShopParts';
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
  const shown = byTrade(shop?.templates.filter((t) => !current || t.industry === current.label) ?? []);
  // From an ad or post for one trade: that trade's templates first, then the rest of the drop below,
  // so nobody hits a dead end if theirs isn't quite right.
  const rest = current ? byTrade(shop?.templates.filter((t) => t.industry !== current.label) ?? []) : [];

  return (
    <Layout
      page="templates"
      title="Website Templates for Local Businesses | Iconik Studios"
      description={`Complete, ready-to-edit websites for ${industryList} businesses. Every page written for your industry, hosting and your own domain included.`}
    >
      <div className="bg-ink text-paper">
        <section className="relative overflow-hidden px-6 pb-6 pt-28 lg:px-12 lg:pb-20 lg:pt-44">
          <div className="relative mx-auto grid max-w-[88rem] grid-cols-1 items-center gap-16 lg:grid-cols-12">
            {/* Slides in but is never invisible, so the page counts as loaded as soon as it shows. */}
            <m.div initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-6">
              <div className="mb-8 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-burnt-orange" />
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-burnt-orange"><T k="templates.eyebrow">{"Website Templates"}</T></span>
              </div>
              <h1 className="mb-6 font-display text-5xl uppercase leading-[0.95] tracking-tighter md:mb-10 md:text-8xl lg:text-[6.5rem]">
                {current ? (
                  <>
                    {current.label} websites,
                    <br />
                    <span className="italic text-burnt-orange">ready today.</span>
                  </>
                ) : (
                  <T k="templates.title" em="text-burnt-orange italic" label="Heading">{"Your next website,\n*ready today.*"}</T>
                )}
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-white/80 md:mb-12 md:text-xl">
                {current ? `Complete ${current.label.replace(/^[A-Z][a-z]/, (c) => c.toLowerCase())} websites designed by our studio, every page already written. Make it yours in a simple editor and go live on your own domain. Your first month of hosting is free.` : <T k="templates.intro">{"Complete websites designed by our studio for local businesses. Pick the one that fits, make it yours in a simple editor, and go live on your own domain. Your first month of hosting is free."}</T>}
              </p>
              <div className={`${current ? 'hidden lg:flex' : 'flex'} flex-wrap items-center gap-6`}>
                <a href="#templates" className="group inline-flex items-center gap-3 rounded-full bg-paper px-10 py-5 font-display text-lg uppercase text-ink transition-all hover:bg-burnt-orange hover:text-white">
                  Browse templates <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
                </a>
                <Link to="/contact" className="inline-flex items-center gap-2 border-b border-white/30 py-1 font-display text-sm uppercase tracking-widest transition-colors hover:border-burnt-orange hover:text-burnt-orange">
                  Or have us build it <ArrowUpRight size={16} />
                </Link>
              </div>
            </m.div>
            {shop && <HeroFan />}
          </div>
          {shop && !current && <Facts className="hidden lg:grid" />}
        </section>

        {shop ? (
          <section id="templates" className="scroll-mt-28 px-6 pb-32 pt-4 lg:px-12 lg:pt-8">
            {industries.length > 1 && <IndustryFilter current={current?.slug} total={shop.templates.length} />}
            <MissingTrade />
            <div className="mx-auto grid max-w-[88rem] grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-y-20">
              {shown.map((template, i) => (
                <TemplateCard key={template.key} template={template} index={i} />
              ))}
              {/* An odd number of templates leaves a gap; the made-for-you option fills it. */}
              {shown.length % 2 === 1 && rest.length === 0 && <BuiltForYouCard />}
            </div>
            {rest.length > 0 && (
              <>
                <div className="mx-auto mb-12 mt-24 max-w-[88rem] border-t border-white/10 pt-12">
                  <span className="font-mono text-xs uppercase tracking-[0.4em] text-burnt-orange">More from Drop 001</span>
                </div>
                <div className="mx-auto grid max-w-[88rem] grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-y-20">
                  {rest.map((template, i) => (
                    <TemplateCard key={template.key} template={template} index={i} />
                  ))}
                  {rest.length % 2 === 1 && <BuiltForYouCard />}
                </div>
              </>
            )}
            <Facts className="lg:hidden" />
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
              <span className="mb-6 block font-mono text-xs uppercase tracking-widest">How it works</span>
              <HowItWorks />
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

// The gallery leads with the trades our ads speak to; med spas, the first ones built, come last (Ricky, 2026-11-13).
// Each card keeps its drop number (No. 04 stays No. 04); only the order on this page changes.
// An industry not listed here (a new drop's) sits after the listed trades, before agency and med spa.
const TRADE_ORDER = ['HVAC & plumbing', 'Roofing', 'Auto detailing', 'Real estate', 'Dental', 'Bakery'];
const LAST = ['Agency', 'Med spa'];
const rank = (industry: string) => {
  const i = TRADE_ORDER.indexOf(industry);
  if (i >= 0) return i;
  const j = LAST.indexOf(industry);
  return j >= 0 ? 100 + j : 50;
};
const byTrade = <T extends { industry: string }>(list: T[]) => [...list].sort((a, b) => rank(a.industry) - rank(b.industry));

// "med spa, real estate, HVAC & plumbing and bakery" (… businesses) for the page's search description.
const industryList = (() => {
  const names = industries.map((i) => i.label.replace(/^[A-Z][a-z]/, (c) => c.toLowerCase()));
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0] ?? 'local businesses';
})();

/** "All" and a button per industry, with counts; one row that scrolls sideways on phones. */
function IndustryFilter({ current, total }: { current: string | undefined; total: number }) {
  const pill = (active: boolean) =>
    `inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors md:gap-2.5 md:px-5 md:tracking-[0.25em] ${
      active ? 'border-paper bg-paper text-ink' : 'border-white/25 text-white/85 hover:border-burnt-orange hover:text-paper'
    }`;
  const count = (n: number, active: boolean) => <span className={active ? 'text-ink/50' : 'text-burnt-orange'}>{n}</span>;
  return (
    <nav aria-label="Templates by industry" className="mx-auto mb-6 max-w-[88rem]">
      <p className="mb-4 font-display text-2xl uppercase tracking-tight md:text-3xl">What’s your business?</p>
      {/* Every trade in view at once, wrapping on phones, so nobody has to find the sideways scroll. */}
      <ul className="flex flex-wrap gap-2.5 md:gap-3">
        <li className="shrink-0">
          <Link to="/templates" aria-current={!current ? 'page' : undefined} className={pill(!current)}>
            All {count(total, !current)}
          </Link>
        </li>
        {byTrade(industries.map((i) => ({ ...i, industry: i.label }))).map((i) => (
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

/** For a visitor whose trade isn't in the shop yet: name it, and the contact form opens with the question written. */
function MissingTrade() {
  const [trade, setTrade] = useState('');
  const navigate = useNavigate();
  const ask = (e: FormEvent) => {
    e.preventDefault();
    const what = trade.trim();
    const message = what
      ? `I run a ${what} business. Do you have (or are you making) a website template for it?`
      : 'I don’t see a template for my kind of business. Do you have one coming?';
    navigate(`/contact?message=${encodeURIComponent(message)}`);
  };
  return (
    <form onSubmit={ask} className="mx-auto mb-12 flex max-w-[88rem] flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:mb-16">
      <label htmlFor="missing-trade" className="text-base text-white/85">Don’t see yours? Tell us what you do:</label>
      <div className="flex flex-1 gap-2 sm:max-w-md">
        <input
          id="missing-trade"
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          maxLength={60}
          placeholder="e.g. landscaping"
          className="min-w-0 flex-1 rounded-full border border-white/25 bg-transparent px-5 py-3 text-base text-paper placeholder:text-white/50 focus:border-burnt-orange focus:outline-none"
        />
        <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-burnt-orange px-5 py-3 font-display text-sm uppercase tracking-widest text-paper transition-colors hover:bg-burnt-orange">
          Ask us <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}

// The hover scroll moves at one speed for every template, so a long page takes longer instead of racing
// past (7 s for the short ones, as before; Corbel's 15 screens about 25 s). Leaving goes back up in 1 s.
const SCROLL_PX_PER_SECOND = 340;
const SCROLL_MIN_MS = 7000;

function TemplateCard({ template, index }: { template: ShopTemplate; index: number }) {
  const full = pictureOf(template.slug, 'full');
  const phone = pictureOf(template.slug, 'phone');
  const shot = useRef<HTMLImageElement>(null);
  // Measured when the picture loads and again on hover: the picture's travel at the card's size right now
  const timeTheScroll = () => {
    const img = shot.current;
    const frame = img?.parentElement;
    if (!img || !frame) return;
    const travel = Math.max(0, img.offsetHeight - frame.offsetHeight);
    const ms = Math.max(SCROLL_MIN_MS, Math.round((travel / SCROLL_PX_PER_SECOND) * 1000));
    img.style.setProperty('--scroll-ms', `${ms}ms`);
  };
  // The pre-drawn page can finish the picture before React is listening for its load.
  useEffect(() => {
    if (shot.current?.complete) timeTheScroll();
  });
  const number = String(shop!.templates.indexOf(template) + 1).padStart(2, '0');
  const palette = [template.colors.background, template.colors.brand, template.colors.text];
  return (
    <m.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}
      className="group flex flex-col rounded-[28px] border border-white/10 bg-white/[0.03] p-3 transition-colors duration-500 hover:border-burnt-orange/40 md:p-4"
      onPointerEnter={timeTheScroll}
    >
      <Link to={`/templates/${template.slug}`} className="block" aria-label={`${template.name}: see the template`}>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
          {/* The whole home page glides past on hover, like scrolling the real site. */}
          {/* Phones see the template as it looks on a phone: a handset rising from the bottom of the panel. */}
          {phone && (
            <div className="relative h-[24rem] overflow-hidden bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,0.08),transparent_70%)] md:hidden">
              <div className="absolute left-1/2 top-7 w-[15.5rem] -translate-x-1/2 rounded-t-[2.4rem] border-x-[7px] border-t-[7px] border-[#2a2a2a] bg-[#2a2a2a] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
                <img src={phone} alt={`The ${template.name} template on a phone`} loading="lazy" fetchPriority="low" decoding="async" className="block w-full rounded-t-[1.9rem]" />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/80 to-transparent" />
            </div>
          )}
          <div className={`relative h-[20rem] overflow-hidden md:h-[24rem] ${phone ? 'hidden md:block' : ''}`}>
            {full && (
              <img
                ref={shot}
                src={full}
                alt={`The ${template.name} template’s home page`}
                loading="lazy"
                // Tall full-page screenshots: never ahead of the page's own text, fonts and code.
                fetchPriority="low"
                decoding="async"
                // Timed as soon as the picture is in, so the very first hover glides instead of jumping to the footer.
                onLoad={timeTheScroll}
                className="absolute inset-x-0 top-0 w-full transition-transform duration-1000 ease-[cubic-bezier(0.3,0.05,0.7,0.95)] group-hover:duration-[var(--scroll-ms,7000ms)] group-hover:-translate-y-[calc(100%-20rem)] md:group-hover:-translate-y-[calc(100%-24rem)] motion-reduce:transition-none"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0" />
            <span className="pointer-events-none absolute bottom-4 right-4 hidden items-center gap-2 rounded-full border border-white/15 bg-ink/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/70 backdrop-blur transition-opacity duration-300 group-hover:opacity-0 [@media(hover:hover)_and_(pointer:fine)]:inline-flex">
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
    </m.article>
  );
}

/** The other way to get a site: Iconik builds it, with the systems behind it. */
function BuiltForYouCard() {
  return (
    <m.aside
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
    </m.aside>
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
        <m.div
          key={t.key}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute transition-transform duration-700 ease-out ${spots[i]}`}
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]">
            <img src={pictureOf(t.slug, 'hero')} alt="" decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
          </div>
        </m.div>
      ))}
    </div>
  );
}

/** The shop in four numbers, all from Sites' own catalogue. */
function Facts({ className = '' }: { className?: string }) {
  const lowest = Math.min(...shop!.templates.map((t) => t.price));
  const facts = [
    [String(shop!.templates.length), 'Templates'],
    [String(industries.length), 'Industries'],
    [money(lowest), 'Once, per template'],
    ['Free', `First month of hosting, then ${money(shop!.plans.monthly)} a month`],
  ];
  return (
    <m.dl
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`relative mx-auto mt-20 max-w-[88rem] grid-cols-2 border-y border-white/10 lg:mt-24 lg:grid-cols-4 ${className.includes('hidden') ? '' : 'grid'} ${className}`}
    >
      {facts.map(([value, label], i) => (
        <div key={label} className={`px-2 py-8 md:px-8 ${i % 2 ? 'border-l border-white/10' : ''} ${i === 2 ? 'border-t border-white/10 lg:border-l lg:border-t-0' : ''} ${i === 3 ? 'border-t border-white/10 lg:border-t-0' : ''}`}>
          <dt className="sr-only">{label}</dt>
          <dd className="font-display text-5xl leading-none md:text-6xl">{value}</dd>
          <dd className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</dd>
        </div>
      ))}
    </m.dl>
  );
}
