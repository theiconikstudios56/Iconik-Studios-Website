import { m } from 'motion/react';

/**
 * The editorial headline from Iconik's social posts (Brand/brand-guide.md → "Post style: the editorial card"):
 * a light condensed line, a heavy Anton line, and one bronze script word laid over it.
 * The script writes itself in from left to right the first time it's seen.
 */
export default function Editorial({
  thin,
  heavy,
  script,
  as: Tag = 'h2',
  align = 'center',
  size = 'section',
  tone = 'dark',
}: {
  thin: string;
  heavy: string;
  script: string;
  as?: 'h1' | 'h2';
  align?: 'center' | 'left';
  size?: 'hero' | 'section';
  tone?: 'dark' | 'light';
}) {
  const hero = size === 'hero';
  const ink = tone === 'dark' ? 'text-white' : 'text-ink';
  return (
    <Tag className={`relative ${align === 'center' ? 'text-center' : 'text-left'} ${ink}`}>
      <span
        className={`block font-thin font-light uppercase tracking-[0.06em] leading-none ${hero ? 'text-[clamp(34px,5.4vw,72px)]' : 'text-[clamp(24px,3.6vw,48px)]'}`}
      >
        {thin}
      </span>
      <span
        className={`mt-[0.06em] block font-display uppercase leading-[0.9] tracking-[0.005em] ${hero ? 'text-[clamp(86px,14vw,190px)]' : 'text-[clamp(48px,8vw,108px)]'}`}
      >
        {heavy}
      </span>
      <m.span
        initial={{ clipPath: 'inset(-20% 100% -20% 0)' }}
        whileInView={{ clipPath: 'inset(-20% 0% -20% 0)' }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 0.25 }}
        className={`relative z-10 block font-script normal-case tracking-normal text-burnt-orange ${align === 'center' ? 'mx-auto' : ''} ${hero ? '-mt-[0.42em] text-[clamp(76px,11vw,160px)]' : '-mt-[0.4em] text-[clamp(46px,6.6vw,96px)]'} leading-[1.05] -rotate-[4deg]`}
      >
        {script}
      </m.span>
    </Tag>
  );
}

/** The bronze outlined label from the posts ("HOW DOES IT WORK?"). */
export function BronzeLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-md border border-burnt-orange px-5 py-2 font-display text-sm uppercase tracking-[0.18em] text-burnt-orange md:text-base ${className}`}>
      {children}
    </span>
  );
}
