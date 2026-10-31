// Iconik's social profiles, for the Contact page and the menu. A profile
// without an address isn't shown (no more links that go nowhere).

export type SocialProfile = { short: string; name: string; url: string | null };

export const SOCIAL: SocialProfile[] = [
  { short: 'IN', name: 'LinkedIn', url: null },
  { short: 'IG', name: 'Instagram', url: 'https://www.instagram.com/iconik_studios/' },
  { short: 'YT', name: 'YouTube', url: null },
  { short: 'X', name: 'X', url: null },
  { short: 'FB', name: 'Facebook', url: 'https://www.facebook.com/iconikstudios/' },
  { short: 'G', name: 'Google reviews', url: 'https://www.google.com/search?q=iconik+studios+llc#lrd=0x872b3fc434e1a90f:0xecef97fcfe10ae9,1' },
];

export const SOCIAL_LINKS = SOCIAL.filter((s): s is SocialProfile & { url: string } => Boolean(s.url));
