import { pictureOf, shop } from '../lib/shop';
import digitalWaveHero from '../assets/images/web/portfolio/digital-wave-hero.webp';
import digitalWaveFull from '../assets/images/web/portfolio/digital-wave-full.webp';
import mintHero from '../assets/images/web/portfolio/mint-cannabis-hero.webp';
import mintFull from '../assets/images/web/portfolio/mint-cannabis-full.webp';
import { CLIENT_PROJECTS, templateProject } from './projectText';

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

/** Real client builds (Ricky, 2026-10-30), with their pictures. */
const CLIENT_PICTURES: Record<string, string> = { 'digital-wave-media-solutions': digitalWaveHero, 'mint-cannabis': mintHero };
const CLIENTS: Omit<Project, 'nextId' | 'prevId'>[] = CLIENT_PROJECTS.map((p) => ({ ...p, image: CLIENT_PICTURES[p.id] ?? '', gallery: [] }));

const all = [
  ...CLIENTS,
  ...templates.map((t) => ({ ...templateProject(t), image: pictureOf(t.slug, 'hero') ?? '', gallery: [] as string[] })),
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
