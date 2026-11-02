import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import react from '@vitejs/plugin-react';
import { build, type Plugin, type ResolvedConfig } from 'vite';
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
//
// Each page's content is drawn into it too (src/entry-server.tsx): its
// headings, words and links are in the file, for Google, AI search, link
// previews and site audits, and the site takes the page over as it is
// (main.tsx). The drawing uses the same RMD content and catalogue as the build.

type Content = { values: Record<string, string> };

/** Draws each page with the site's own code, built once more for the server. */
async function pageRenderer(config: ResolvedConfig, baked: Record<string, unknown>) {
  const outDir = join(config.root, 'node_modules', '.page-heads');
  await build({
    configFile: false,
    root: config.root,
    mode: config.mode,
    logLevel: 'warn',
    define: config.define,
    resolve: { alias: config.resolve.alias },
    plugins: [
      react(),
      {
        name: 'baked-content',
        resolveId: (id) => (id in baked ? `\0${id}` : undefined),
        load: (id) => (id.startsWith('\0') && id.slice(1) in baked ? `export default ${JSON.stringify(baked[id.slice(1)])};` : undefined),
      },
    ],
    build: { ssr: 'src/entry-server.tsx', outDir, emptyOutDir: true, rollupOptions: { output: { entryFileNames: 'entry-server.js' } } },
  });
  const { render } = (await import(pathToFileURL(join(outDir, 'entry-server.js')).href)) as { render: (path: string) => Promise<string> };
  return { render, done: () => rm(outDir, { recursive: true, force: true }) };
}

export function pageHeads(command: 'build' | 'serve'): Plugin {
  let outDir = 'dist';
  let resolved: ResolvedConfig;
  let content: () => Content | null = () => null;
  let catalog: () => Catalog | null = () => null;
  return {
    name: 'page-heads',
    apply: 'build',
    configResolved(config) {
      resolved = config;
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

      // Each page's content. A page that can't be drawn keeps the empty shell (the site draws it in the browser, as before).
      const renderer = await pageRenderer(resolved, { 'virtual:site-content': content() ?? { version: null, values: {} }, 'virtual:shop-catalog': shop });
      const ROOT = '<div id="root"></div>';
      const undrawn: string[] = [];
      for (const page of pages) {
        try {
          const body = await renderer.render(page.path);
          page.html = page.html.replace(ROOT, () => `<div id="root">${body}</div>`);
        } catch (error) {
          undrawn.push(`${page.path} (${error instanceof Error ? error.message : error})`);
        }
      }
      await renderer.done();
      if (undrawn.length) this.warn(`pages left for the browser to draw: ${undrawn.join(', ')}`);

      // The stylesheet (one file, about 16 KB compressed) goes inside each drawn page, so the
      // browser can paint it without first waiting for another download.
      const STYLESHEET = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/;
      const sheet = shell.match(STYLESHEET);
      if (sheet) {
        const css = (await readFile(join(outDir, sheet[1]), 'utf8')).replace(/<\/style/gi, '<\\/style');
        for (const page of pages) page.html = page.html.replace(STYLESHEET, () => `<style>${css}</style>`);
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
