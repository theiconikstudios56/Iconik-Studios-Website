// Coming-soon gate (Vercel Routing Middleware, runs before the cache on every matched request).
//
// While the site is under construction, every visitor gets public/coming-soon/index.html
// with a 503 + Retry-After, so search engines keep the old pages instead of indexing this one.
// Ricky gets the real site through a private link: /?preview=<secret> sets a 30-day cookie;
// /?preview=off clears it. Only the secret's SHA-256 is stored here.
//
// To take the gate down: delete this file (and the matcher exclusions go with it).
import { next } from '@vercel/functions/middleware';

const PREVIEW_HASH = '7ccd11693b9304debea5abc549df59b76981d56826f6eb5819c97c85ebd9fae9';
const COOKIE = 'iconik_preview';

export const config = {
  // Left open: the coming-soon page's own files, the API, the RMD content check, robots.txt.
  matcher: ['/((?!api/|coming-soon/|content-version\\.json|robots\\.txt).*)'],
};

async function sha256(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

function readCookie(request: Request, name: string) {
  const header = request.headers.get('cookie') ?? '';
  const match = header.split(/;\s*/).find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function redirectWithout(url: URL, cookie: string) {
  url.searchParams.delete('preview');
  return new Response(null, {
    status: 302,
    headers: { Location: url.toString(), 'Set-Cookie': cookie, 'Cache-Control': 'no-store' },
  });
}

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const preview = url.searchParams.get('preview');

  if (preview === 'off') {
    return redirectWithout(url, `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`);
  }
  if (preview && (await sha256(preview)) === PREVIEW_HASH) {
    return redirectWithout(url, `${COOKIE}=${encodeURIComponent(preview)}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`);
  }

  const cookie = readCookie(request, COOKIE);
  if (cookie && (await sha256(cookie)) === PREVIEW_HASH) return next();

  const page = await fetch(new URL('/coming-soon/index.html', url)).catch(() => null);
  const html = page?.ok ? await page.text() : '<!doctype html><title>Iconik Studios</title><p>Something iconik is on the way.</p>';
  return new Response(html, {
    status: 503,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Retry-After': '86400', 'Cache-Control': 'no-store' },
  });
}
