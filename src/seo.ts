// Each page's starting title and description in Google (SEO-D1): what the
// page sets as it opens (Layout's `page` key lets RMD change both), and what
// the build writes into that page's own HTML (scripts/page-heads.ts), so the
// two never drift apart. The template shop's pages build theirs from the
// catalogue (TemplatesPage, TemplatePage).

export type PageSeo = { path: string; title: string; description: string; /** A picture in src/assets/images/web for link previews. */ picture: string };

export const PAGE_SEO = {
  home: {
    path: '/',
    title: 'Contractor & Home Service Websites + Automation | Iconik Studios',
    description: 'Websites and automations for contractors, home service companies and local businesses, from roofing and HVAC to med spas. Templates or custom, built in Phoenix.',
    picture: 'fuzzy-lineup-2026',
  },
  about: {
    path: '/about',
    title: 'About Iconik Studios | Web Design & Automation for Local Businesses',
    description: 'Iconik Studios is a Phoenix design and automation studio for contractors, home service companies and local businesses: websites, booking and follow-up systems.',
    picture: 'fuzzy-squad',
  },
  'web-design': {
    path: '/services/web-design',
    title: 'Website Design for Contractors & Local Businesses | Iconik Studios',
    description: 'Custom website design built to bring in calls and bookings: fast, mobile-first pages for contractors, home service companies and local businesses.',
    picture: 'fuzzy-web-design',
  },
  ai: {
    path: '/services/ai-automation',
    title: 'AI Automation for Contractors & Local Businesses | Iconik Studios',
    description: 'Automation for contractors and local businesses: instant replies to new leads, follow-ups, booking reminders and review requests, so no inquiry goes cold.',
    picture: 'fuzzy-automation',
  },
  maintenance: {
    path: '/services/maintenance',
    title: 'Website Care Plans for Local Businesses | Iconik Studios',
    description: 'Monthly website care from $69: hosting, monitoring, daily backups and edits made for you, plus reports and Google Business Profile upkeep. Month to month.',
    picture: 'fuzzy-maintenance',
  },
  portfolio: {
    path: '/portfolio',
    title: 'Our Work | Case Studies & Portfolio | Iconik Studios',
    description: 'Explore our portfolio of high-performing websites, automated workflows, and CRM integrations for local businesses.',
    picture: 'studio-fuzzy',
  },
  blog: {
    path: '/blog',
    title: 'Med Spa Marketing & Automation Blog | Iconik Studios',
    description: 'Ideas for med spa owners on websites, online booking, lead follow-up and AI automation that keep the calendar full.',
    picture: 'fuzzy-work',
  },
  contact: {
    path: '/contact',
    title: 'Contact Iconik Studios | Med Spa Website & Automation Quote',
    description: "Tell us about your med spa and get a quote for a website, online booking and automated follow-up. You'll hear from a real person within one business day.",
    picture: 'convo-fuzzy',
  },
} satisfies Record<string, PageSeo>;

const titleCase = (s: string) => s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());

/** A portfolio project's title and description ("Mint Cannabis: Dispensary Brand Website | Iconik Studios"). */
export function projectSeo(p: { title: string; category: string; description: string }) {
  const kind = titleCase(p.category.split('/').map((part) => part.trim()).filter(Boolean).join(' '));
  const description = p.description.length > 160 ? `${p.description.slice(0, 157).replace(/\s+\S*$/, '')}…` : p.description;
  return { title: `${titleCase(p.title)}${kind ? `: ${kind}` : ''} | Iconik Studios`, description };
}
