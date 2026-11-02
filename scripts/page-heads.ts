import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { Plugin } from 'vite';
import { SITE, withHead } from '../api/_head.js';
import { PAGE_SEO, projectSeo } from '../src/seo';
import { CLIENT_PROJECTS, templateProject, type ProjectText } from '../src/constants/projectText';
import { industryList, type Catalog } from './shop-catalog';

// Every page of the site as its own HTML file (SEO-D1, after the shop's
// SH-D6): the built index.html with that page's title, description, address
// and picture, so Google and link previews read them without running the
// site's code. Written after the build from what it baked in: RMD's website
// content (a title or description changed in RMD's editor wins, as it does on
// the page) and the shop's catalogue. Vercel serves a file before the
// rewrites, so /about is dist/about/index.html. The home page becomes
// index.html; the untouched shell is kept as app.html for every other address
// (vercel.json), and /api/blog-page fills it in for each article.

type Content = { values: Record<string, string> };

export function pageHeads(command: 'build' | 'serve'): Plugin {
  let outDir = 'dist';
  let content: () => Content | null = () => null;
  let catalog: () => Catalog | null = () => null;
  return {
    name: 'page-heads',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
      content = config.plugins.find((p) => p.name === 'site-content')?.api?.content ?? content;
      catalog = config.plugins.find((p) => p.name === 'shop-catalog')?.api?.catalog ?? catalog;
    },
    async closeBundle() {
      if (command !== 'build') return;
      const shell = await readFile(join(outDir, 'index.html'), 'utf8');
      const assets = await readdir(join(outDir, 'assets')).catch(() => [] as string[]);
      /** A built picture by its name ("sage-hero", "fuzzy-squad"), as a full address. */
      const picture = (name: string) => {
        // Vite adds an 8-character hash: "fuzzy-web" mustn't find "fuzzy-web-design-…".
        const file = assets.find((f) => f.startsWith(`${name}-`) && /^[\w-]{8}\.webp$/.test(f.slice(name.length + 1)));
        return file ? `${SITE}/assets/${file}` : '';
      };
      const fallback = picture(PAGE_SEO.home.picture);
      const values = content()?.values ?? {};
      const pages: { path: string; html: string }[] = [];
      const add = (page: Parameters<typeof withHead>[1]) => pages.push({ path: page.path, html: withHead(shell, page) });

      for (const [key, page] of Object.entries(PAGE_SEO)) {
        add({
          path: page.path,
          title: values[`${key}.seo.title`] || page.title,
          description: values[`${key}.seo.description`] || page.description,
          image: picture(page.picture) || fallback,
          ...(key === 'home'
            ? { data: { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Iconik Studios', url: SITE, image: fallback || undefined, address: { '@type': 'PostalAddress', addressLocality: 'Phoenix', addressRegion: 'AZ', addressCountry: 'US' } } }
            : {}),
        });
      }

      // The template shop (SH-D6): its own titles, as TemplatesPage and TemplatePage set them.
      const shop = catalog();
      if (shop) {
        add({
          path: '/templates',
          title: values['templates.seo.title'] || 'Website Templates for Local Businesses | Iconik Studios',
          description:
            values['templates.seo.description'] ||
            `Complete, ready-to-edit websites for ${industryList(shop)} businesses. Every page written for your industry, hosting and your own domain included.`,
          image: picture(`${shop.templates[0].slug}-hero`),
        });
        for (const t of shop.templates) {
          const image = picture(`${t.slug}-hero`);
          add({
            path: `/templates/${t.slug}`,
            title: `${t.name}: ${t.industry} Website Template | Iconik Studios`,
            description: `${t.summary} Every page written for you, hosting and your own domain included.`,
            image,
            data: {
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: `${t.name}: ${t.industry} website template`,
              description: t.summary,
              ...(image ? { image } : {}),
              brand: { '@type': 'Brand', name: 'Iconik Studios' },
              offers: {
                '@type': 'Offer',
                price: (t.price / 100).toFixed(2),
                priceCurrency: shop.currency.toUpperCase(),
                availability: 'https://schema.org/InStock',
                url: `${SITE}/templates/${t.slug}`,
              },
            },
          });
        }
      }

      // The portfolio's projects: RMD's list when it has one, otherwise the site's own.
      let projects: (ProjectText & { image?: string; hidden?: boolean })[] = [...CLIENT_PROJECTS, ...(shop?.templates ?? []).map(templateProject)];
      try {
        const edited = values['portfolio.projects'] ? JSON.parse(values['portfolio.projects']) : null;
        if (Array.isArray(edited)) projects = edited;
      } catch {
        // Keep the site's own list.
      }
      for (const p of projects) {
        if (!p || p.hidden || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(String(p.id)) || typeof p.title !== 'string') continue;
        const { title, description } = projectSeo({ title: p.title, category: String(p.category ?? ''), description: String(p.description ?? '') });
        const own = typeof p.image === 'string' && /^https:\/\//.test(p.image) ? p.image : '';
        const image = own || picture(p.id === 'digital-wave-media-solutions' ? 'digital-wave-hero' : p.id === 'mint-cannabis' ? 'mint-cannabis-hero' : `${p.id.replace(/-template$/, '')}-hero`);
        add({ path: `/project/${p.id}`, title, description, image });
      }

      // The shell for every other address (blog articles, a page not found), untouched.
      await writeFile(join(outDir, 'app.html'), shell);
      for (const { path, html } of pages) {
        const dir = join(outDir, path);
        await mkdir(dir, { recursive: true });
        await writeFile(join(dir, 'index.html'), html);
      }
      this.info(`pages written as HTML with their own heads: ${pages.length}`);
    },
  };
}
