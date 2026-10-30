import { pictureOf, shop } from '../lib/shop';
import digitalWaveHero from '../assets/images/web/portfolio/digital-wave-hero.webp';
import digitalWaveFull from '../assets/images/web/portfolio/digital-wave-full.webp';
import mintHero from '../assets/images/web/portfolio/mint-cannabis-hero.webp';
import mintFull from '../assets/images/web/portfolio/mint-cannabis-full.webp';

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
  {
    id: 'mint-cannabis',
    shortName: 'MINT',
    title: 'MINT CANNABIS',
    category: 'DISPENSARY BRAND / WEBSITE',
    client: 'THE MINT CANNABIS',
    services: ['WEB DESIGN'],
    year: '2025',
    description: 'The website for a dispensary brand with locations across Arizona, Nevada, Florida, Michigan and more: deals by state, a store finder, the rewards app and a learning centre, all pointing visitors to the nearest Mint.',
    image: mintHero,
    gallery: [],
    url: 'https://mintdeals.com/',
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

/**
 * Each project's whole home page, top to bottom, for the project page's
 * scrolling frame (as on the template pages). Kept apart from the list RMD
 * edits, so an edited list never loses them.
 */
export const FULL_PICTURES: Record<string, string> = {
  'digital-wave-media-solutions': digitalWaveFull,
  'mint-cannabis': mintFull,
  ...Object.fromEntries(templates.map((t) => [`${t.slug}-template`, pictureOf(t.slug, 'full')]).filter(([, src]) => src)),
};

export const PROJECT_DATA: Record<string, Project> = Object.fromEntries(
  all.map((p, i) => {
    const at = (n: number) => all[(n + all.length) % all.length].id;
    return [p.id, { ...p, nextId: at(i + 1), prevId: at(i - 1) }];
  }),
);
