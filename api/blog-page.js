// /blog/<slug> (vercel.json): one blog article's page with its own head
// (SEO-D1). Articles are written and published in RMD (BUILD_PLAN A16 there)
// at any time, so their pages can't be written at build time like the
// others: this reads the article from RMD and puts its title, description,
// picture and Article markup into the site's shell (app.html, see
// scripts/page-heads.ts). An article RMD doesn't have answers 404. If RMD
// can't be reached, the plain shell goes out and the page fills itself in as
// before.

import { escapeHtml, withHead } from './_head.js';

const RMD_ARTICLES = 'https://winicrmzmcgfwrrynoxd.supabase.co/functions/v1/website-articles';

let cached = { origin: '', shell: '', at: 0 };

/** This deployment's shell (its own asset files), kept for 5 minutes. */
async function shellFrom(origin) {
  if (cached.origin === origin && Date.now() - cached.at < 300_000) return cached.shell;
  const response = await fetch(`${origin}/app.html`, { signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error(`app.html answered ${response.status}`);
  cached = { origin, shell: await response.text(), at: Date.now() };
  return cached.shell;
}

export default async function handler(req, res) {
  const origin = `https://${req.headers['x-forwarded-host'] || req.headers.host}`;
  const slug = String(req.query.slug ?? '');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  let shell;
  try {
    shell = await shellFrom(origin);
  } catch {
    // Without the shell there's no page to send; the browser tries again.
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).send('<!doctype html><title>Iconik Studios</title><p>Please refresh the page.</p>');
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    res.setHeader('Cache-Control', 's-maxage=300');
    return res.status(404).send(shell);
  }

  let article;
  try {
    const response = await fetch(`${RMD_ARTICLES}?slug=${encodeURIComponent(slug)}`, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`RMD answered ${response.status}`);
    const list = await response.json();
    article = Array.isArray(list) ? list[0] ?? null : null;
  } catch {
    res.setHeader('Cache-Control', 's-maxage=60');
    return res.status(200).send(shell);
  }
  if (!article || typeof article.title !== 'string') {
    res.setHeader('Cache-Control', 's-maxage=300');
    return res.status(404).send(shell);
  }

  const path = `/blog/${slug}`;
  const image = typeof article.image_url === 'string' && /^https:\/\//.test(article.image_url) ? article.image_url : '';
  const description = String(article.meta_description || '').slice(0, 300);
  const html = withHead(shell, {
    path,
    title: `${article.title} | Iconik Studios`,
    description,
    image,
    type: 'article',
    data: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description,
      ...(image ? { image } : {}),
      datePublished: article.published_at,
      mainEntityOfPage: `https://www.theiconikstudios.com${path}`,
      author: { '@type': 'Organization', name: 'Iconik Studios' },
      publisher: { '@type': 'Organization', name: 'Iconik Studios' },
    },
  });
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
  return res.status(200).send(html.replace('</head>', `    <meta property="article:published_time" content="${escapeHtml(article.published_at ?? '')}" />\n  </head>`));
}
