import { SALE, money, saleOn, type ShopTemplate } from '../../lib/shop';

/** The Black Friday line (lib/shop SALE): shown only while the sale is on. */
export function SaleBanner({ className = '' }: { className?: string }) {
  if (!saleOn()) return null;
  return (
    <div className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-burnt-orange/60 bg-burnt-orange/10 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white ${className}`}>
      <span className="text-burnt-orange">{SALE.name}</span>
      <span>Every template $89 · was $129 · through {SALE.endsLabel}</span>
    </div>
  );
}

/** "$129" struck through before the sale price, when a sale is on. */
export function Was({ template, className = '' }: { template: ShopTemplate; className?: string }) {
  if (!template.was) return null;
  return <s className={`mr-2 text-white/70 decoration-burnt-orange decoration-2 ${className}`} aria-label={`was ${money(template.was)}`}>{money(template.was)}</s>;
}
