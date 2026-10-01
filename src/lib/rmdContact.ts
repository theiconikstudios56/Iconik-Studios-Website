// The contact page sends to RMD (Iconik's CRM): its "Contact form" (slug
// `contact`), through the same `form` function as RMD's hosted forms. RMD
// creates or updates the contact, records where the visit came from, and
// starts Workflow 1 (deal, tag, notification, confirmation email).
//
// Where the visit came from is read once, when the site first loads (this
// module is imported by App), because by the time someone reaches /contact
// the page address no longer has the ad's utm_* parameters. Kept in memory
// only: no cookies, no storage.

const ENDPOINT: string | undefined =
  import.meta.env.VITE_RMD_FORM_URL || (import.meta.env.PROD ? 'https://winicrmzmcgfwrrynoxd.supabase.co/functions/v1/form' : undefined)

const FORM = 'contact'

type Attribution = { source?: string; medium?: string; campaign?: string; source_detail?: string; referrer?: string; landing_page?: string }

function arrivalOf(): Attribution {
  if (typeof window === 'undefined') return {}
  const page = new URL(window.location.href)
  const p = page.searchParams
  let referrer: string | undefined
  try {
    const ref = new URL(document.referrer)
    if ((ref.protocol === 'https:' || ref.protocol === 'http:') && ref.hostname.replace(/^www\./, '') !== page.hostname.replace(/^www\./, '')) referrer = ref.toString()
  } catch {
    // No referrer, or not a web address.
  }
  page.hash = ''
  return {
    source: p.get('utm_source') ?? undefined,
    medium: p.get('utm_medium') ?? undefined,
    campaign: p.get('utm_campaign') ?? undefined,
    source_detail: p.get('utm_content') ?? undefined,
    referrer,
    landing_page: page.toString(),
  }
}

const arrival = arrivalOf()

export type ContactAnswers = { name: string; email: string; phone: string; company: string; message: string }

export class ContactError extends Error {
  constructor(
    message: string,
    public fields: Partial<Record<keyof ContactAnswers, string>> = {},
  ) {
    super(message)
  }
}

const FALLBACK = 'We couldn’t send your message just now. Please try again, or email remedy@theiconikstudios.com or call 623.261.8824.'

/** Sends the message to RMD. */
export async function sendContact(answers: ContactAnswers, turnstile: string, website: string): Promise<void> {
  if (!ENDPOINT) throw new ContactError('The contact form isn’t connected in development (set VITE_RMD_FORM_URL).')
  let response: Response
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'submit', slug: FORM, answers, attribution: arrival, turnstile, website }),
      credentials: 'omit',
    })
  } catch {
    throw new ContactError(FALLBACK)
  }
  const data = await response.json().catch(() => ({}))
  if (response.ok) return
  if (response.status === 422 || response.status === 403 || response.status === 429) {
    throw new ContactError(data.message ?? FALLBACK, data.fields ?? {})
  }
  throw new ContactError(FALLBACK)
}
