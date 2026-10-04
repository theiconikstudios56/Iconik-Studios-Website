import { PROJECT_DATA } from '../constants/projects';
import { safeImage, useContent } from './store';

// The portfolio's projects (BUILD_PLAN A16, Part 2): one piece of website
// content, "portfolio.projects", a JSON list in the order the site shows
// them. Its starting value is the list in constants/projects.ts. RMD edits
// the list in the editor's side panel; the portfolio page, each project's
// page, the Web Design carousel and the homepage showcase all read it here.

export type SiteProject = {
  id: string;
  shortName: string;
  title: string;
  category: string;
  client: string;
  services: string[];
  year: string;
  description: string;
  url: string;
  image: string;
  gallery: string[];
  hidden: boolean;
};

export const PROJECTS_KEY = 'portfolio.projects';

/** Always the same field order, so RMD can tell a list that's back to the original. */
export const serializeProjects = (list: SiteProject[]) =>
  JSON.stringify(
    list.map((p) => ({
      id: p.id,
      shortName: p.shortName,
      title: p.title,
      category: p.category,
      client: p.client,
      services: p.services,
      year: p.year,
      description: p.description,
      url: p.url,
      image: p.image,
      gallery: p.gallery,
      hidden: p.hidden,
    })),
  );

export const START_PROJECTS = serializeProjects(
  Object.values(PROJECT_DATA).map((p) => ({ ...p, description: p.description ?? '', url: '', hidden: false })),
);

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : '');

/** A list from RMD, made safe: unknown fields dropped, pictures only web addresses. Null if it isn't a list. */
function parse(value: string): SiteProject[] | null {
  let raw: unknown;
  try {
    raw = JSON.parse(value);
  } catch {
    return null;
  }
  if (!Array.isArray(raw)) return null;
  const seen = new Set<string>();
  const out: SiteProject[] = [];
  for (const p of raw.slice(0, 50)) {
    if (!p || typeof p !== 'object') continue;
    const id = str(p.id, 60);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id) || seen.has(id)) continue;
    seen.add(id);
    const image = str(p.image, 2000);
    out.push({
      id,
      shortName: str(p.shortName, 12),
      title: str(p.title, 120),
      category: str(p.category, 80),
      client: str(p.client, 120),
      services: Array.isArray(p.services) ? p.services.filter((s: unknown) => typeof s === 'string').slice(0, 12) : [],
      year: str(p.year, 20),
      description: str(p.description, 2000),
      url: /^https:\/\//.test(str(p.url, 2000)) ? str(p.url, 2000) : '',
      image: safeImage(image) ? image : '',
      gallery: Array.isArray(p.gallery) ? p.gallery.filter((g: unknown) => typeof g === 'string' && safeImage(g)).slice(0, 20) : [],
      hidden: p.hidden === true,
    });
  }
  return out;
}

export type ShownProject = SiteProject & { prevId: string; nextId: string };

/**
 * The projects to show (hidden ones left out), each with its neighbours for
 * the project page's arrows. `changed` is whether the list differs from the
 * site's own (the homepage keeps its own showcase until it does).
 */
export function useProjects() {
  const value = useContent(PROJECTS_KEY, 'projects', START_PROJECTS, { label: 'Portfolio projects' });
  const list = parse(value) ?? (parse(START_PROJECTS) as SiteProject[]);
  const visible = list.filter((p) => !p.hidden && p.image);
  const shown: ShownProject[] = visible.map((p, i) => ({
    ...p,
    prevId: visible[(i - 1 + visible.length) % visible.length].id,
    nextId: visible[(i + 1) % visible.length].id,
  }));
  return { projects: shown, changed: value !== START_PROJECTS };
}
