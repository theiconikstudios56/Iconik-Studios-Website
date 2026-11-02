import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
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

type Catalog = NonNullable<ReturnType<typeof clean>>;

const SITE = 'https://www.theiconikstudios.com';
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** "Med spa", "HVAC & plumbing" → "med spa, … and HVAC & plumbing", as the shop page says it. */
function industryList(catalog: Catalog) {
  const names = [...new Set(catalog.templates.map((t) => t.industry))].map((label) => label.replace(/^[A-Z][a-z]/, (c) => c.toLowerCase()));
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0] ?? 'local businesses';
}

/**
 * The shop's pages as their own HTML files (RMD-crm SH-D6): the site is one
 * page whose title is set once its code runs, so link previews (Instagram,
 * Facebook, iMessage) and a search engine's first read saw only "Iconik
 * Studios". Each file is the built index.html with the same title and
 * description the page sets for itself (TemplatesPage, TemplatePage), its
 * address, a picture for link previews and, for a template, its price for
 * Google. Vercel serves /templates/<slug>/index.html at /templates/<slug>
 * before the catch-all rewrite to index.html.
 */
async function writeShopPages(outDir: string, catalog: Catalog) {
  const shell = await readFile(join(outDir, 'index.html'), 'utf8');
  const assets = await readdir(join(outDir, 'assets')).catch(() => [] as string[]);
  const hero = (slug: string) => {
    const file = assets.find((f) => f.startsWith(`${slug}-hero-`) && f.endsWith('.webp'));
    return file ? `${SITE}/assets/${file}` : '';
  };
  const page = (path: string, title: string, description: string, image: string, data?: object) => {
    const url = `${SITE}${path}`;
    const head = [
      `<title>${escape(title)}</title>`,
      `<meta name="description" content="${escape(description)}" />`,
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="Iconik Studios" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:title" content="${escape(title)}" />`,
      `<meta property="og:description" content="${escape(description)}" />`,
      image ? `<meta property="og:image" content="${image}" />` : '',
      `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
      data ? `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>` : '',
    ].filter(Boolean).join('\n    ');
    return shell.replace(/<title>[^<]*<\/title>/, head);
  };
  const write = async (path: string, html: string) => {
    await mkdir(join(outDir, path), { recursive: true });
    await writeFile(join(outDir, path, 'index.html'), html);
  };

  const first = catalog.templates[0];
  await write('templates', page(
    '/templates',
    'Website Templates for Local Businesses | Iconik Studios',
    `Complete, ready-to-edit websites for ${industryList(catalog)} businesses. Every page written for your industry, hosting and your own domain included.`,
    hero(first.slug),
  ));
  for (const t of catalog.templates) {
    const title = `${t.name}: ${t.industry} Website Template | Iconik Studios`;
    const description = `${t.summary} Every page written for you, hosting and your own domain included.`;
    const image = hero(t.slug);
    await write(`templates/${t.slug}`, page(`/templates/${t.slug}`, title, description, image, {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${t.name}: ${t.industry} website template`,
      description: t.summary,
      ...(image ? { image } : {}),
      brand: { '@type': 'Brand', name: 'Iconik Studios' },
      offers: {
        '@type': 'Offer',
        price: (t.price / 100).toFixed(2),
        priceCurrency: catalog.currency.toUpperCase(),
        availability: 'https://schema.org/InStock',
        url: `${SITE}/templates/${t.slug}`,
      },
    }));
  }
  return catalog.templates.length + 1;
}

export function shopCatalog(command: 'build' | 'serve', env: Record<string, string>): Plugin {
  let catalog: ReturnType<typeof clean> = null;
  let outDir = 'dist';
  return {
    name: 'shop-catalog',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      if (command !== 'build' || !catalog) return;
      const count = await writeShopPages(outDir, catalog);
      this.info(`shop pages written as HTML: ${count}`);
    },
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
