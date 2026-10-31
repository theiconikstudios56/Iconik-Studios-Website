import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { T } from '../../content';
import { industries, money, pictureOf, shop, type ShopTemplate } from '../../lib/shop';

/**
 * The homepage's window onto the template shop (RMD-crm BUILD_PLAN 11.10): two
 * rows of real template home pages that slide past in opposite directions as
 * the visitor scrolls, then the industries and a way into /templates.
 * Nothing shows until Sites serves its catalogue.
 */
export default function TemplateShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: shop ? sectionRef : undefined, offset: ['start end', 'end start'] });
  const forward = useTransform(scrollYProgress, [0, 1], still ? ['-12%', '-12%'] : ['-2%', '-28%']);
  const back = useTransform(scrollYProgress, [0, 1], still ? ['-20%', '-20%'] : ['-34%', '-8%']);

  if (!shop) return null;
  const templates = shop.templates;
  const lowest = Math.min(...templates.map((t) => t.price));
  // Each row repeats the set so it's always wider than the screen, the second starting part-way through.
  const half = Math.ceil(templates.length / 2);
  const rowA = [...templates, ...templates];
  const rowB = [...templates.slice(half), ...templates.slice(0, half), ...templates.slice(half), ...templates.slice(0, half)];

  return (
    <section ref={sectionRef} aria-labelledby="home-templates-title" className="relative overflow-hidden bg-ink py-20 text-paper md:py-32">
      {/* A low bronze glow behind the rows, so the screenshots sit in light rather than on flat black. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-[60%] -translate-y-1/3 bg-[radial-gradient(ellipse_at_center,rgba(205,127,50,0.16),transparent_65%)]" />

      <div className="relative px-6 lg:px-12">
        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 items-end gap-10 md:mb-24 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="font-mono text-sm tracking-[0.3em] text-accent"><T k="home.templates.eyebrow">{"TEMPLATES / READY NOW"}</T></span>
              <div className="h-[1px] w-12 bg-accent/30" />
            </div>
            <h2 id="home-templates-title" className="font-display text-[3.25rem] uppercase leading-[1.05] tracking-tighter text-tan sm:text-6xl md:text-[6vw] lg:text-[5.5vw]">
              <T k="home.templates.title" em="text-accent italic" label="Heading">{"Launch Faster.\n*Start Ready‑Made.*"}</T>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <p className="mb-8 text-base leading-relaxed text-paper md:text-lg">
              <T k="home.templates.text">{"Not ready for a custom build? Start with a website our studio has already designed for your industry. Every page comes written, you change anything with a click, and it goes live on your own domain with hosting included."}</T>
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 md:tracking-[0.3em]">
              {money(lowest)} once <span className="text-accent">/</span> then {money(shop.plans.yearly)} a year
            </p>
          </motion.div>
        </div>
      </div>

      {/* The two rows, tilted slightly and faded out at the edges. */}
      <div className="relative -rotate-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ShowcaseRow templates={rowA} x={forward} />
        <ShowcaseRow templates={rowB} x={back} className="mt-5 md:mt-8" />
      </div>

      <div className="relative mt-16 px-6 md:mt-24 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <ul aria-label="Templates by industry" className="-mx-6 flex gap-2.5 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden">
            {industries.map((i) => (
              <li key={i.slug} className="shrink-0">
                <Link
                  to={`/templates?industry=${i.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-accent hover:text-paper"
                >
                  {i.label} <span className="text-accent">{i.count}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/templates"
            className="group inline-flex shrink-0 items-center justify-center gap-4 rounded-full bg-paper px-10 py-5 font-display text-lg uppercase tracking-wide text-ink transition-all hover:bg-accent hover:text-white lg:self-auto"
          >
            Browse all {templates.length} templates
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ShowcaseRow({ templates, x, className = '' }: { templates: ShopTemplate[]; x: MotionValue<string>; className?: string }) {
  return (
    <motion.ul style={{ x }} className={`flex w-max gap-5 md:gap-8 ${className}`}>
      {templates.map((t, i) => (
        // The repeated half is for looks only: one link per template for keyboards and screen readers.
        <li key={`${t.key}-${i}`} aria-hidden={i >= templates.length / 2 || undefined}>
          <ShowcaseCard template={t} hidden={i >= templates.length / 2} />
        </li>
      ))}
    </motion.ul>
  );
}

function ShowcaseCard({ template, hidden }: { template: ShopTemplate; hidden: boolean }) {
  return (
    <Link
      to={`/templates/${template.slug}`}
      tabIndex={hidden ? -1 : undefined}
      aria-label={`${template.name}, a ${template.industry.toLowerCase()} template`}
      className="group relative block w-[18rem] overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60 md:w-[28rem] md:rounded-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={pictureOf(template.slug, 'hero')}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-6">
          <div>
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.35em] text-accent md:text-[10px]">{template.industry}</p>
            <p className="font-display text-2xl uppercase leading-none md:text-4xl">{template.name}</p>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper text-ink md:size-12">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
