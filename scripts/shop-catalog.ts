import { readFile } from 'node:fs/promises';
import type { Plugin } from 'vite';

// The template shop's catalogue (RMD-crm BUILD_PLAN 11.10): the templates for
// sale, their prices, pages and demo addresses, from the Sites app
// (app.iconik.site/shop/catalog.json, made from the templates' own code),
// baked into the site when it's built. Unlike the RMD content, a build goes
// ahead without it: the shop then says it's opening soon.
//
//   SITES_CATALOG_URL   another address, or a file path (local development:
//                       RMD-crm's sites/dist/shop/catalog.json after `npm run sites:build`)

const LIVE = 'https://app.iconik.site/shop/catalog.json';
const ID = 'virtual:shop-catalog';

async function load(source: string): Promise<unknown> {
  if (!/^https?:\/\//.test(source)) return JSON.parse(await readFile(source, 'utf8'));
  const response = await fetch(source, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`Sites answered ${response.status}`);
  return response.json();
}

/** Only what the shop shows, checked, so a bad file can't put anything odd on the page. */
function clean(raw: unknown) {
  const body = raw as { currency?: unknown; plans?: Record<string, { amount?: unknown; interval?: unknown }>; templates?: unknown[] };
  const text = (v: unknown, max = 300) => (typeof v === 'string' ? v.slice(0, max) : '');
  const cents = (v: unknown) => (typeof v === 'number' && Number.isInteger(v) && v >= 0 ? v : null);
  const templates = (Array.isArray(body.templates) ? body.templates : []).flatMap((t) => {
    const x = t as Record<string, unknown>;
    const slug = text(x.slug, 40);
    const price = cents(x.price);
    const demo = text(x.demo, 200);
    if (!/^[a-z0-9-]+$/.test(slug) || price === null || !/^https:\/\/[a-z0-9-]+\.iconik\.site$/.test(demo)) return [];
    const colors = (x.colors ?? {}) as Record<string, unknown>;
    const hex = (v: unknown) => (typeof v === 'string' && /^#[0-9a-f]{3,8}$/i.test(v) ? v : '#000000');
    return [{
      key: text(x.key, 40),
      name: text(x.name, 40),
      slug,
      industry: text(x.industry, 40),
      summary: text(x.summary),
      price,
      demo,
      pages: (Array.isArray(x.pages) ? x.pages : []).map((p) => ({ path: text((p as { path?: unknown }).path, 60), title: text((p as { title?: unknown }).title, 60) })).slice(0, 20),
      pageLimit: cents(x.pageLimit) ?? 10,
      colors: { background: hex(colors.background), text: hex(colors.text), brand: hex(colors.brand) },
    }];
  });
  const monthly = cents(body.plans?.monthly?.amount);
  const yearly = cents(body.plans?.yearly?.amount);
  if (!templates.length || monthly === null || yearly === null) return null;
  return { currency: text(body.currency, 3) || 'usd', plans: { monthly, yearly }, templates };
}

export function shopCatalog(command: 'build' | 'serve', env: Record<string, string>): Plugin {
  let catalog: ReturnType<typeof clean> = null;
  return {
    name: 'shop-catalog',
    async buildStart() {
      const source = env.SITES_CATALOG_URL || (command === 'build' ? LIVE : '');
      if (!source) return;
      try {
        catalog = clean(await load(source));
        this.info(`shop catalogue from Sites: ${catalog?.templates.length ?? 0} templates`);
      } catch (error) {
        this.warn(`Couldn't read the shop catalogue (${source}): ${error instanceof Error ? error.message : error}. The shop will say it's opening soon.`);
      }
    },
    resolveId(id) {
      if (id === ID) return `\0${ID}`;
    },
    load(id) {
      if (id === `\0${ID}`) return `export default ${JSON.stringify(catalog)};`;
    },
  };
}
