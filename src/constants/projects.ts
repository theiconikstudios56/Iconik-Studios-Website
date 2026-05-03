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
}

export const PROJECT_DATA: Record<string, Project> = {
  'kinetic-solutions-group': {
    id: 'kinetic-solutions-group',
    shortName: 'KSG',
    title: 'KINETIC SOLUTIONS GROUP',
    category: 'REBRAND / WEB SUITE',
    client: 'KINETIC SOLUTIONS',
    services: ['BRANDING', 'WEB', 'WORDPRESS'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600'
    ],
    nextId: 'luxe-estate',
    prevId: 'zenith-flow'
  },
  'luxe-estate': {
    id: 'luxe-estate',
    shortName: 'LXE',
    title: 'LUXE ESTATE',
    category: 'REAL ESTATE / AI SEARCH',
    client: 'LUXE GLOBAL',
    services: ['WEB DESIGN', 'AI', 'UX/UI'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1600'
    ],
    nextId: 'nova-audio',
    prevId: 'kinetic-solutions-group'
  },
  'nova-audio': {
    id: 'nova-audio',
    shortName: 'NVA',
    title: 'NOVA AUDIO',
    category: 'MUSIC / GENERATIVE AI',
    client: 'NOVA SOUND',
    services: ['PRODUCT', 'AI', 'MOTION'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1600'
    ],
    nextId: 'zenith-flow',
    prevId: 'luxe-estate'
  },
  'zenith-flow': {
    id: 'zenith-flow',
    shortName: 'ZNF',
    title: 'ZENITH FLOW',
    category: 'SAAS / AUTOMATION',
    client: 'ZENITH CORP',
    services: ['UI/UX', 'AUTOMATION', 'DASHBOARD'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1600'
    ],
    nextId: 'kinetic-solutions-group',
    prevId: 'nova-audio'
  }
};
