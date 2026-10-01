// Visitor statistics for RMD (Iconik's CRM): page views, time on page, where
// visits come from, real loading speed, and lead moments, sent to RMD's
// site-track function. No cookies and no storage: RMD knows a visitor only
// by a hash that changes every day. Private pages (admin, proposals,
// contracts, intake) aren't tracked.
//
// Speed is measured with the browser's own PerformanceObserver, on the first
// page of each visit: LCP (main content shown), INP (response to taps and
// clicks), CLS (layout shifting), FCP (first paint) and TTFB (server
// response).

const ENDPOINT: string | undefined =
  import.meta.env.VITE_RMD_TRACK_URL || (import.meta.env.PROD ? 'https://winicrmzmcgfwrrynoxd.supabase.co/functions/v1/site-track' : undefined)

const PRIVATE = /^\/(admin|proposals|contract|intake)(\/|$)/

type Vitals = { lcp?: number; inp?: number; cls?: number; fcp?: number; ttfb?: number }

let current: { path: string; id: Promise<string | null>; resolved: string | null; visibleSince: number | null; engaged: number; first: boolean } | null = null
let firstView = true
const vitals: Vitals = {}
let observing = false

function send(body: object): Promise<Response | null> {
  if (!ENDPOINT) return Promise.resolve(null)
  // text/plain needs no preflight; keepalive lets the request finish after the page closes.
  return fetch(ENDPOINT, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'text/plain' }, keepalive: true, credentials: 'omit' }).catch(() => null)
}

function observe() {
  if (observing || typeof PerformanceObserver === 'undefined') return
  observing = true
  const watch = (type: string, handle: (entries: PerformanceEntryList) => void, extra: Record<string, unknown> = {}) => {
    try {
      new PerformanceObserver((list) => handle(list.getEntries())).observe({ type, buffered: true, ...extra } as PerformanceObserverInit)
    } catch {
      // This browser doesn't report that measure.
    }
  }

  watch('largest-contentful-paint', (entries) => {
    const last = entries[entries.length - 1]
    if (last) vitals.lcp = last.startTime
  })
  watch('paint', (entries) => {
    const fcp = entries.find((e) => e.name === 'first-contentful-paint')
    if (fcp) vitals.fcp = fcp.startTime
  })

  // CLS: the worst burst of unexpected shifts (gaps under 1 s, at most 5 s long).
  let windowValue = 0
  let windowStart = 0
  let lastShift = 0
  watch('layout-shift', (entries) => {
    for (const e of entries as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
      if (e.hadRecentInput) continue
      if (e.startTime - lastShift > 1000 || e.startTime - windowStart > 5000) {
        windowValue = 0
        windowStart = e.startTime
      }
      windowValue += e.value
      lastShift = e.startTime
      vitals.cls = Math.max(vitals.cls ?? 0, windowValue)
    }
  })

  // INP: the slowest response to a tap, click or key press.
  watch(
    'event',
    (entries) => {
      for (const e of entries as (PerformanceEntry & { interactionId?: number })[]) {
        if (e.interactionId) vitals.inp = Math.max(vitals.inp ?? 0, e.duration)
      }
    },
    { durationThreshold: 40 },
  )

  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  if (nav && nav.responseStart > 0) vitals.ttfb = nav.responseStart
}

function engagedNow() {
  if (!current) return 0
  return current.engaged + (current.visibleSince === null ? 0 : performance.now() - current.visibleSince)
}

/**
 * Reports the page being viewed: how long it was in view, and speed on a
 * visit's first page. Sent synchronously when the id is known, because a
 * closing page may not run anything later.
 */
function finish() {
  if (!current) return
  const view = current
  const body = { t: 'leave', engaged_ms: Math.round(engagedNow()), ...(view.first ? vitals : {}) }
  if (view.resolved) void send({ ...body, id: view.resolved })
  else void view.id.then((id) => id && send({ ...body, id }))
}

/** A page view (called on every route change). */
export function trackPage(pathname: string, search: string) {
  if (!ENDPOINT || typeof window === 'undefined') return
  if (current?.path === pathname) return // the same page again (React's development double run)
  if (current) {
    finish()
    current = null
  }
  if (PRIVATE.test(pathname)) return

  const first = firstView
  firstView = false
  if (first) observe()
  const params = new URLSearchParams(search)
  const body: Record<string, unknown> = { t: 'view', path: pathname }
  if (first) {
    body.referrer = document.referrer
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) if (params.get(key)) body[key] = params.get(key)
  }
  const view = {
    path: pathname,
    resolved: null as string | null,
    id: send(body)
      .then((r) => (r && r.ok ? r.json().then((j: { id?: string }) => j.id ?? null) : null))
      .then((id) => (view.resolved = id))
      .catch(() => null),
    visibleSince: document.visibilityState === 'visible' ? performance.now() : null,
    engaged: 0,
    first,
  }
  current = view
}

/** A lead moment: the contact form sent, a chat started… ("contact-form", "chat"). */
export function trackLead(name: string) {
  if (!ENDPOINT || typeof window === 'undefined') return
  void send({ t: 'lead', name, path: window.location.pathname })
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!current) return
    if (document.visibilityState === 'hidden') {
      if (current.visibleSince !== null) current.engaged += performance.now() - current.visibleSince
      current.visibleSince = null
      finish() // the tab may never come back; send what we have
    } else if (current.visibleSince === null) {
      current.visibleSince = performance.now()
    }
  })
  window.addEventListener('pagehide', () => finish())
}
