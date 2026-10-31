import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { T } from '../content';

const DISCOVERY_CALL = 'https://rmd.theiconikstudios.com/book/discovery-call';

/**
 * The homepage's ladder (brand guide, "a path up"; strategy brief §3, upsell
 * ladder): template → care plan → custom build, so a visitor sees the $129
 * template leads somewhere. Automations join once texting is live and the
 * brief says "promote".
 */
const rungs = [
  {
    key: 'template',
    step: '01',
    name: 'Template',
    price: '$129 to own',
    text: 'A finished website for your trade, every page already written, live on your own domain this week. Hosting is $15 a month or $150 a year.',
    cta: 'See the templates',
    to: '/templates',
  },
  {
    key: 'care',
    step: '02',
    name: 'Care plan',
    price: '$69 to $349 a month',
    text: 'We host it, watch it, back it up every day and make the edits you send us. Month to month.',
    cta: 'Compare care plans',
    to: '/services/maintenance',
  },
  {
    key: 'custom',
    step: '03',
    name: 'Custom build',
    price: '$2,000 to $5,000',
    text: 'A website designed from scratch around your business, by the studio that designs the templates.',
    cta: 'Book a discovery call',
    href: DISCOVERY_CALL,
  },
] as const;

export default function GrowthLadder() {
  return (
    <section aria-labelledby="home-ladder-title" className="relative bg-ink px-6 py-20 text-paper md:py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 grid grid-cols-1 items-end gap-10 md:mb-20 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-7">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-mono text-sm tracking-[0.3em] text-accent"><T k="home.ladder.eyebrow">{"START ANYWHERE / GROW WITH US"}</T></span>
              <div className="h-[1px] w-12 bg-accent/30" />
            </div>
            <h2 id="home-ladder-title" className="font-display text-[3.25rem] uppercase leading-[1.05] tracking-tighter text-tan sm:text-6xl md:text-[6vw] lg:text-[5.5vw]">
              <T k="home.ladder.title" em="text-accent italic" label="Heading">{"One Studio.\n*Every Stage.*"}</T>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-paper md:text-lg lg:col-span-5">
            <T k="home.ladder.text">{"Start with a template this week. Add a care plan when you'd rather we look after it. Move to a custom build when you outgrow it. Same studio, same standards, no starting over."}</T>
          </p>
        </motion.div>

        <ol className="grid grid-cols-1 border-t border-white/10 md:grid-cols-3">
          {rungs.map((r, i) => {
            const cta = (
              <>
                <T k={`home.ladder.${r.key}-cta`}>{r.cta}</T>
                {'href' in r ? <ArrowUpRight className="h-4 w-4" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}
              </>
            );
            const ctaClass = 'mt-auto inline-flex items-center gap-2 pt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-tan';
            return (
              <motion.li
                key={r.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * i }}
                className="flex flex-col border-b border-white/10 py-10 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 lg:px-10"
              >
                <span className="mb-6 font-mono text-xs tracking-[0.3em] text-white/50">{r.step}</span>
                <h3 className="mb-2 font-display text-3xl uppercase tracking-tight text-tan md:text-4xl">
                  <T k={`home.ladder.${r.key}-name`}>{r.name}</T>
                </h3>
                <p className="mb-6 font-mono text-sm uppercase tracking-[0.15em] text-accent">
                  <T k={`home.ladder.${r.key}-price`}>{r.price}</T>
                </p>
                <p className="max-w-sm text-sm leading-relaxed text-paper md:text-base">
                  <T k={`home.ladder.${r.key}-text`}>{r.text}</T>
                </p>
                {'href' in r ? (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>{cta}</a>
                ) : (
                  <Link to={r.to} className={ctaClass}>{cta}</Link>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
