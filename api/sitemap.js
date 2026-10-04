// /sitemap.xml (and /api/sitemap): every page of theiconikstudios.com for
// Google, including each published blog article and portfolio project. The
// articles and projects come from RMD (BUILD_PLAN A16 there), so a new one
// is listed as soon as it's published.

const SITE = 'https://www.theiconikstudios.com';
const RMD = 'https://winicrmzmcgfwrrynoxd.supabase.co/functions/v1';

const PAGES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/services/web-design', priority: '0.9', changefreq: 'monthly' },
  { url: '/services/ai-automation', priority: '0.9', changefreq: 'monthly' },
  { url: '/services/maintenance', priority: '0.8', changefreq: 'monthly' },
  { url: '/portfolio', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/homes', priority: '0.6', changefreq: 'monthly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
];

// The site's own projects, until the portfolio is changed in RMD (src/constants/projects.ts).
const START_PROJECTS = ['kinetic-solutions-group', 'luxe-estate', 'nova-audio', 'zenith-flow'];

const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function json(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`RMD answered ${response.status}`);
  return response.json();
}

export default async function handler(req, res) {
  const [articles, content] = await Promise.all([json(`${RMD}/website-articles`).catch(() => []), json(`${RMD}/website-content`).catch(() => null)]);

  let projects = START_PROJECTS;
  try {
    const list = content?.values?.['portfolio.projects'];
    if (list) projects = JSON.parse(list).filter((p) => p && !p.hidden && p.image && /^[a-z0-9-]+$/.test(p.id)).map((p) => p.id);
  } catch {
    // Keep the site's own list.
  }

  const entries = [
    ...PAGES,
    ...projects.map((id) => ({ url: `/project/${id}`, priority: '0.6', changefreq: 'monthly' })),
    ...(Array.isArray(articles) ? articles : [])
      .filter((a) => a && /^[a-z0-9-]+$/.test(a.slug))
      .map((a) => ({ url: `/blog/${a.slug}`, priority: '0.7', changefreq: 'monthly', lastmod: String(a.published_at).slice(0, 10) })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((e) => `  <url>\n    <loc>${escape(SITE + e.url)}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>${e.lastmod ? `\n    <lastmod>${escape(e.lastmod)}</lastmod>` : ''}\n  </url>`)
  .join('\n')}
</urlset>
`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  return res.status(200).send(xml);
}
