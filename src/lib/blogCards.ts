// Shared by the blog list, the home page's latest articles and an article
// page: the picture an article shows when it has none of its own (fuzzies,
// not stock photos), and its date as Americans write it.
import focusedFuzzy from '../assets/images/web/focused-fuzzy.webp';
import strategySesh from '../assets/images/web/strategy-sesh.webp';
import fuzzyWork from '../assets/images/web/fuzzy-work.webp';
import convoFuzzy from '../assets/images/web/convo-fuzzy.webp';
import fuzzyCollab from '../assets/images/web/fuzzy-collab.webp';
import homeOfficeFuzzy from '../assets/images/web/home-office-fuzzy.webp';
import fuzzySetup from '../assets/images/web/fuzzy-setup.webp';
import rooftopFuzzy from '../assets/images/web/rooftop-fuzzy-hd.webp';

export const BLOG_PLACEHOLDERS = [focusedFuzzy, strategySesh, fuzzyWork, convoFuzzy, fuzzyCollab, homeOfficeFuzzy, fuzzySetup, rooftopFuzzy];

/** The stand-in picture for the nth card or article. */
export function blogPlaceholder(n: number): string {
  const i = ((n % BLOG_PLACEHOLDERS.length) + BLOG_PLACEHOLDERS.length) % BLOG_PLACEHOLDERS.length;
  return BLOG_PLACEHOLDERS[i];
}

/** "Oct 6, 2026"; with month "long", "October 6, 2026". */
export function blogDate(dateString: string, month: 'short' | 'long' = 'short'): string {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month, day: 'numeric', timeZone: 'America/Phoenix' });
}
