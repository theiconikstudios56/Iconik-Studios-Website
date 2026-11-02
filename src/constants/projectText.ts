// The portfolio's starting projects as words only (no pictures), so both the
// site (constants/projects.ts adds the pictures) and the build's page heads
// (scripts/page-heads.ts, SEO-D1) read the same titles and descriptions.

/** A project without its pictures. */
export type ProjectText = {
  id: string;
  shortName: string;
  title: string;
  category: string;
  client: string;
  services: string[];
  year: string;
  description: string;
  /** The live site (here, the template's demo). */
  url: string;
};

/** Real client builds (Ricky, 2026-10-30). */
export const CLIENT_PROJECTS: ProjectText[] = [
  {
    id: 'digital-wave-media-solutions',
    shortName: 'DWMS',
    title: 'DIGITAL WAVE MEDIA',
    category: 'MARKETING AGENCY / WEBSITE',
    client: 'DIGITAL WAVE MEDIA SOLUTIONS',
    services: ['WEB DESIGN'],
    year: '2025',
    description: 'A website for a digital marketing agency: social media, SEO and AI-powered automation for local businesses. Built to read clearly, load fast and send every enquiry somewhere it gets answered.',
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
    url: 'https://mintdeals.com/',
  },
];

/** A template's demo as a project ("sage-template"). */
export const templateProject = (t: { slug: string; name: string; industry: string; summary: string; pages: unknown[]; demo: string }): ProjectText => ({
  id: `${t.slug}-template`,
  shortName: t.name.toUpperCase().slice(0, 12),
  title: t.name.toUpperCase(),
  category: `${t.industry.toUpperCase()} / TEMPLATE`,
  client: 'ICONIK STUDIOS TEMPLATE',
  services: ['WEB DESIGN', 'COPYWRITING', 'HOSTING'],
  year: '2026',
  description: `${t.summary} Designed and written by our studio, with ${t.pages.length} pages ready to edit. Open the live demo to click around, or find it in our template shop.`,
  url: t.demo,
});
