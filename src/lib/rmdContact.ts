// The contact page sends to RMD (Iconik's CRM): its "Contact form" (slug
// `contact`), through the same `form` function as RMD's hosted forms. RMD
// creates or updates the contact, records where the visit came from, and
// starts Workflow 1 (deal, tag, notification, confirmation email).
//
// Where the visit came from is read in arrival.ts.

import { arrival } from './arrival'

const ENDPOINT: string | undefined =
  import.meta.env.VITE_RMD_FORM_URL || (import.meta.env.PROD ? 'https://winicrmzmcgfwrrynoxd.supabase.co/functions/v1/form' : undefined)

const FORM = 'contact'

// text_consent is the form's "Text consent" box in RMD (field id `text_consent`):
// ticked, RMD records consent to texts for the phone number, with the wording.
export type ContactAnswers = { name: string; email: string; phone: string; company: string; message: string; text_consent: boolean }

export class ContactError extends Error {
  constructor(
    message: string,
    public fields: Partial<Record<keyof ContactAnswers, string>> = {},
  ) {
    super(message)
  }
}

const FALLBACK = 'We couldn’t send your message just now. Please try again, or email support@theiconikstudios.com.'

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
