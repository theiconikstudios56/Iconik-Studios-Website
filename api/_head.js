// Each page's own <head> (RMD-crm BUILD_PLAN SH-D6, SEO-D1): the site is one
// page whose title is set once its code runs, so link previews (Instagram,
// Facebook, iMessage) and a search engine's first read saw only "Iconik
// Studios". This puts the page's title, description, address, picture and
// structured data into the built index.html in place of that title. Used by
// the build (scripts/page-heads.ts) and by /api/blog-page. Files starting
// with "_" in api/ aren't functions of their own.

export const SITE = 'https://www.theiconikstudios.com';

export const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/**
 * The shell with this page's head.
 * @param {string} shell the built index.html, still titled "Iconik Studios"
 * @param {{ path: string, title: string, description: string, image?: string, type?: string, data?: object }} page
 */
export function withHead(shell, { path, title, description, image = '', type = 'website', data }) {
  const url = `${SITE}${path}`;
  const head = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="Iconik Studios" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    image ? `<meta property="og:image" content="${escapeHtml(image)}" />` : '',
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    data ? `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ');
  return shell.replace(/<title>[^<]*<\/title>/, head);
}
