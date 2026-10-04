// The blog's articles, from RMD (BUILD_PLAN A16 Part 3 in RMD). Written and
// published in RMD; read here as the blog pages open, so a new article shows
// within a minute of publishing.

const ENDPOINT: string | undefined =
  import.meta.env.VITE_RMD_ARTICLES_URL || (import.meta.env.PROD ? 'https://winicrmzmcgfwrrynoxd.supabase.co/functions/v1/website-articles' : undefined);

export interface Article {
  id: string;
  /** The order of publication (1 = the first): picks a placeholder picture when there's none. */
  number: number;
  title: string;
  body: string;
  slug: string;
  tags: string[];
  meta_description: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
}

type FromRmd = { id: string; number: number; slug: string; title: string; body: string; tags: string[] | null; meta_description: string | null; image_url: string | null; published_at: string };

const toArticle = (a: FromRmd): Article => ({
  id: a.id,
  number: a.number,
  title: a.title,
  body: a.body,
  slug: a.slug,
  tags: a.tags ?? [],
  meta_description: a.meta_description ?? '',
  image_url: a.image_url && (/^https:\/\//.test(a.image_url) || (import.meta.env.DEV && /^http:\/\/(127\.0\.0\.1|localhost)[:/]/.test(a.image_url))) ? a.image_url : null,
  published: true,
  created_at: a.published_at,
});

async function get(query: string): Promise<Article[]> {
  if (!ENDPOINT) return [];
  const response = await fetch(`${ENDPOINT}?${query}`);
  if (!response.ok) throw new Error(`RMD answered ${response.status}`);
  const data = (await response.json()) as FromRmd[];
  return Array.isArray(data) ? data.map(toArticle) : [];
}

/** The newest published articles (all of them, up to 100, unless a limit is given). */
export const fetchArticles = (limit?: number) => get(limit ? `limit=${limit}` : '');

/** One published article by its address, or null. */
export const fetchArticle = async (slug: string) => (await get(`slug=${encodeURIComponent(slug)}`))[0] ?? null;
