// The template shop's catalogue from Sites, read when the site is built (scripts/shop-catalog.ts).
declare module 'virtual:shop-catalog' {
  export type ShopTemplate = {
    key: string;
    name: string;
    slug: string;
    industry: string;
    summary: string;
    /** In cents. */
    price: number;
    demo: string;
    pages: { path: string; title: string }[];
    pageLimit: number;
    colors: { background: string; text: string; brand: string };
  };
  const catalog: { currency: string; plans: { monthly: number; yearly: number }; templates: ShopTemplate[] } | null;
  export default catalog;
}
