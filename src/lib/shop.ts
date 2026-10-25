// The template shop (RMD-crm BUILD_PLAN 11.10): what's for sale comes from
// Sites when the site is built; Buy asks Sites' shop-checkout for a Stripe
// Checkout page and goes there. Prices are Stripe's own: the browser only
// says which template and which plan, and where the visit came from (11.14).

import catalog, { type ShopTemplate } from 'virtual:shop-catalog';
import { arrival } from './arrival';

export type { ShopTemplate };
export type ShopPlan = 'monthly' | 'yearly';

export const shop = catalog;

/** Set once the Sites project is online (Vercel: VITE_SHOP_CHECKOUT_URL); until then Buy says it's opening soon. */
const CHECKOUT: string | undefined = import.meta.env.VITE_SHOP_CHECKOUT_URL || undefined;
export const canBuy = Boolean(shop && CHECKOUT);

// Each template's pictures, taken from its live demo (in src/assets/images/web/templates).
const pictures = import.meta.glob<string>('../assets/images/web/templates/*.webp', { eager: true, import: 'default' });
export const pictureOf = (slug: string, kind: 'hero' | 'full') => pictures[`../assets/images/web/templates/${slug}-${kind}.webp`];

export const money = (cents: number) => `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: cents % 100 ? 2 : 0 })}`;

/** Each industry the shop sells for, in catalogue order, with its address slug ("HVAC & plumbing" → hvac-plumbing). */
export const industries = (shop?.templates ?? []).reduce<{ label: string; slug: string; count: number }[]>((list, t) => {
  const found = list.find((i) => i.label === t.industry);
  if (found) found.count++;
  else list.push({ label: t.industry, slug: t.industry.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), count: 1 });
  return list;
}, []);

export const templateBySlug = (slug: string | undefined) => shop?.templates.find((t) => t.slug === slug);

/** Opens Stripe Checkout for the template and plan, or throws with a message to show. */
export async function buy(template: ShopTemplate, plan: ShopPlan): Promise<void> {
  if (!CHECKOUT) throw new Error('The shop opens soon. Please check back shortly.');
  let response: Response;
  try {
    response = await fetch(CHECKOUT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template_key: template.key, plan, attribution: arrival }),
    });
  } catch {
    throw new Error('We couldn’t reach checkout. Check your connection and try again.');
  }
  const body = (await response.json().catch(() => ({}))) as { url?: string; message?: string };
  if (!response.ok || !body.url?.startsWith('https://')) throw new Error(body.message ?? 'Checkout didn’t open. Please try again in a moment.');
  window.location.assign(body.url);
}
