// The Meta Pixel (Facebook and Instagram ads), so an ad is judged on the
// template sales it brings (Marketing brief §3, paid ads). Ricky approved it
// on 2026-10-30, with the privacy policy saying so (rmd.theiconikstudios.com/privacy).
//
// Only these events, sent by this file: PageView on each page, ViewContent on
// a template's page, InitiateCheckout on Buy. The purchase itself is sent by
// Sites' shop-webhook once Stripe says it's paid (Conversions API), with the
// _fbp and _fbc cookies this Pixel sets, which Buy passes to checkout.
//
// Meta's automatic extras are off: no automatic advanced matching (form
// details never go to Meta), no automatic button or page scanning
// (autoConfig), and no page views of its own on route changes
// (disablePushState), so nothing is counted twice. Not inside RMD's website
// editor, and not on the private pages rmdTracking skips.

import { inEditor } from '../content/editor';
import type { ShopPlan, ShopTemplate } from './shop';

const PIXEL_ID: string | undefined = import.meta.env.VITE_META_PIXEL_ID || (import.meta.env.PROD ? '1499012927487265' : undefined);

const PRIVATE = /^\/(admin|proposals|contract|intake)(\/|$)/;

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[]; push: Fbq; loaded: boolean; version: string; disablePushState?: boolean };

let started = false;

/** Meta's base code, written out: queues calls until fbevents.js arrives. */
function start(): boolean {
  if (!PIXEL_ID || typeof window === 'undefined' || inEditor) return false;
  if (started) return true;
  const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
  if (!w.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    fbq.disablePushState = true;
    w.fbq = fbq;
    w._fbq = fbq;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }
  w.fbq!('set', 'autoConfig', false, PIXEL_ID);
  w.fbq!('init', PIXEL_ID);
  started = true;
  return true;
}

function track(event: string, data?: Record<string, unknown>) {
  if (!start()) return;
  (window as unknown as { fbq: Fbq }).fbq('track', event, data);
}

/** One page view, from App's tracker on each new page. */
export function metaPageView(pathname: string) {
  if (PRIVATE.test(pathname)) return;
  track('PageView');
}

const dollars = (cents: number) => Math.round(cents) / 100;

/** A template's page in the shop. */
export function metaViewContent(template: ShopTemplate, currency: string) {
  track('ViewContent', { content_ids: [template.key], content_name: template.name, content_type: 'product', value: dollars(template.price), currency: currency.toUpperCase() });
}

/** Buy pressed: on the way to Stripe's checkout. */
export function metaInitiateCheckout(template: ShopTemplate, plan: ShopPlan, currency: string) {
  track('InitiateCheckout', { content_ids: [template.key], content_name: template.name, content_type: 'product', value: dollars(template.price), currency: currency.toUpperCase(), plan });
}

/** The Pixel's browser and click IDs, for the purchase the server sends (Conversions API). */
export function metaIds(): { fbp?: string; fbc?: string } {
  if (!started || typeof document === 'undefined') return {};
  const cookie = (name: string) => document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))?.slice(name.length + 1);
  const fbp = cookie('_fbp');
  const fbc = cookie('_fbc');
  return { ...(fbp ? { fbp } : {}), ...(fbc ? { fbc } : {}) };
}
