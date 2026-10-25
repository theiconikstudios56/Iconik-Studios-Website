// Where the visit came from, read once when the site first loads (App imports
// this module), because by the time someone reaches /contact or presses Buy the
// page address no longer has the ad's utm_* parameters. Sent with the contact
// form (rmdContact.ts) and with the shop's Buy (shop.ts), so RMD credits a lead
// or a sale to its campaign and post (RMD-crm BUILD_PLAN 11.14).
//
// Kept in memory only: no cookies, no storage (CT-D1). The landing page keeps
// its path and utm_* parameters only, so ad-platform click IDs (fbclid, gclid)
// and anything else in the address never leave the browser (CT-D3).

export type Attribution = { source?: string; medium?: string; campaign?: string; source_detail?: string; referrer?: string; landing_page?: string }

const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

/** The address with only its path and utm_* parameters: no click IDs, no hash. */
export function cleanLanding(href: string): string {
  const page = new URL(href)
  const kept = new URLSearchParams()
  for (const key of UTM) {
    const value = page.searchParams.get(key)
    if (value) kept.set(key, value)
  }
  const query = kept.toString()
  return `${page.origin}${page.pathname}${query ? `?${query}` : ''}`
}

export function arrivalOf(href: string, referrerHref: string): Attribution {
  const page = new URL(href)
  const p = page.searchParams
  let referrer: string | undefined
  try {
    const ref = new URL(referrerHref)
    // Another site only, and without its query (it can carry click IDs too).
    if ((ref.protocol === 'https:' || ref.protocol === 'http:') && ref.hostname.replace(/^www\./, '') !== page.hostname.replace(/^www\./, '')) referrer = `${ref.origin}${ref.pathname}`
  } catch {
    // No referrer, or not a web address.
  }
  return {
    source: p.get('utm_source') || undefined,
    medium: p.get('utm_medium') || undefined,
    campaign: p.get('utm_campaign') || undefined,
    source_detail: p.get('utm_content') || undefined,
    referrer,
    landing_page: cleanLanding(href),
  }
}

export const arrival: Attribution = typeof window === 'undefined' ? {} : arrivalOf(window.location.href, document.referrer)
