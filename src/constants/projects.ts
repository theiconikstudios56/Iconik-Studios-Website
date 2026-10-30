import { pictureOf, shop } from '../lib/shop';

export interface Project {
  id: string;
  shortName: string;
  title: string;
  category: string;
  client: string;
  services: string[];
  year: string;
  image: string;
  gallery: string[];
  nextId: string;
  prevId: string;
  description?: string;
  /** The live site (here, the template's demo). */
  url?: string;
}

// The portfolio's starting list: the shop's template demos, each a whole
// website the studio designed and wrote, linked to its live demo. No invented
// clients (website audit item 1). Real client work is added in RMD's editor.
const templates = shop?.templates ?? [];

export const PROJECT_DATA: Record<string, Project> = Object.fromEntries(
  templates.map((t, i) => {
    const id = `${t.slug}-template`;
    const at = (n: number) => `${templates[(n + templates.length) % templates.length].slug}-template`;
    return [
      id,
      {
        id,
        shortName: t.name.toUpperCase().slice(0, 12),
        title: t.name.toUpperCase(),
        category: `${t.industry.toUpperCase()} / TEMPLATE`,
        client: 'ICONIK STUDIOS TEMPLATE',
        services: ['WEB DESIGN', 'COPYWRITING', 'HOSTING'],
        year: '2026',
        description: `${t.summary} Designed and written by our studio, with ${t.pages.length} pages ready to edit. Open the live demo to click around, or find it in our template shop.`,
        image: pictureOf(t.slug, 'hero') ?? '',
        gallery: [],
        url: t.demo,
        nextId: at(i + 1),
        prevId: at(i - 1),
      },
    ];
  }),
);
