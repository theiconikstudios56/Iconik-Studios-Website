import { pictureOf, shop } from '../lib/shop';
import digitalWaveHero from '../assets/images/web/portfolio/digital-wave-hero.webp';

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

// The portfolio's starting list: real client work first, then the shop's
// template demos, each a whole website the studio designed and wrote, linked
// to its live demo. No invented clients (website audit item 1). More is added
// in RMD's editor.
const templates = shop?.templates ?? [];

/** Real client builds (Ricky, 2026-10-30). */
const CLIENTS: Omit<Project, 'nextId' | 'prevId'>[] = [
  {
    id: 'digital-wave-media-solutions',
    shortName: 'DWMS',
    title: 'DIGITAL WAVE MEDIA',
    category: 'MARKETING AGENCY / WEBSITE',
    client: 'DIGITAL WAVE MEDIA SOLUTIONS',
    services: ['WEB DESIGN'],
    year: '2025',
    description: 'A website for a digital marketing agency: social media, SEO and AI-powered automation for local businesses. Built to read clearly, load fast and send every enquiry somewhere it gets answered.',
    image: digitalWaveHero,
    gallery: [],
    url: 'https://digitalwavemediasolutions.com/',
  },
];

const all = [
  ...CLIENTS,
  ...templates.map((t) => ({
    id: `${t.slug}-template`,
    shortName: t.name.toUpperCase().slice(0, 12),
    title: t.name.toUpperCase(),
    category: `${t.industry.toUpperCase()} / TEMPLATE`,
    client: 'ICONIK STUDIOS TEMPLATE',
    services: ['WEB DESIGN', 'COPYWRITING', 'HOSTING'],
    year: '2026',
    description: `${t.summary} Designed and written by our studio, with ${t.pages.length} pages ready to edit. Open the live demo to click around, or find it in our template shop.`,
    image: pictureOf(t.slug, 'hero') ?? '',
    gallery: [] as string[],
    url: t.demo,
  })),
];

export const PROJECT_DATA: Record<string, Project> = Object.fromEntries(
  all.map((p, i) => {
    const at = (n: number) => all[(n + all.length) % all.length].id;
    return [p.id, { ...p, nextId: at(i + 1), prevId: at(i - 1) }];
  }),
);
