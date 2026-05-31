// api/sitemap.js
// Add this to your /api folder — it generates a dynamic sitemap
// for Google to discover all your blog articles automatically.
// URL: https://iconik-studios-website.vercel.app/api/sitemap

export default async function handler(req, res) {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const { data: articles } = await supabase
      .from('articles')
      .select('slug, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false });

    const baseUrl = 'https://iconik-studios-website.vercel.app';

    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/services', priority: '0.8', changefreq: 'monthly' },
      { url: '/about', priority: '0.7', changefreq: 'monthly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    ];

    const articlePages = (articles || []).map(article => ({
      url: `/blog/${article.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: new Date(article.created_at).toISOString().split('T')[0],
    }));

    const allPages = [...staticPages, ...articlePages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).send(sitemap);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
