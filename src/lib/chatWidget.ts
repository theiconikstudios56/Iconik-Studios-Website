import type { CSSProperties } from 'react';

// The chat's look and wording from RMD (Settings → Chat widget). RMD sends
// only what's been changed; everything else is the default below, which is
// the chat as it was before the configurator. RMD keeps the same defaults in
// src/features/chatWidget/config.ts: keep the two in step.

export type ChatWidgetSettings = {
  title: string;
  tagline_people: string;
  tagline_ai: string;
  launcher_text: string;
  ai_notice: string;
  name_placeholder: string;
  email_placeholder: string;
  company_placeholder: string;
  message_placeholder: string;
  start_button: string;
  privacy_note: string;
  team_name: string;
  ai_name: string;
  waiting_text: string;
  reply_placeholder: string;
  accent: string;
  background: string;
  corners: 'square' | 'rounded' | 'pill';
  position: 'right' | 'left';
  launcher_icon: 'chat' | 'logo';
  company_field: 'required' | 'optional' | 'hidden';
  logo_url: string;
};

export const DEFAULT_CHAT_WIDGET: ChatWidgetSettings = {
  title: 'Talk to Iconik',
  tagline_people: 'Real people · usually quick',
  tagline_ai: 'AI assistant · a person can take over',
  launcher_text: '',
  ai_notice: 'An AI assistant answers first. Ask for a person any time and someone from Iconik will pick it up.',
  name_placeholder: 'Your name',
  email_placeholder: 'Email',
  company_placeholder: 'Business name',
  message_placeholder: 'How can we help?',
  start_button: 'Start chatting',
  privacy_note: 'We use your details only to reply to you, here or by email.',
  team_name: 'Iconik',
  ai_name: 'Iconik · AI assistant',
  waiting_text: 'Thanks, {first_name}! Someone from the team will be with you shortly.',
  reply_placeholder: 'Write a message…',
  accent: '#cd7f32',
  background: '#000000',
  corners: 'square',
  position: 'right',
  launcher_icon: 'chat',
  company_field: 'required',
  logo_url: '',
};

const CHOICES: Partial<Record<keyof ChatWidgetSettings, readonly string[]>> = {
  corners: ['square', 'rounded', 'pill'],
  position: ['right', 'left'],
  launcher_icon: ['chat', 'logo'],
  company_field: ['required', 'optional', 'hidden'],
};
const HEX = /^#[0-9a-f]{6}$/;
const LOGO = /^https?:\/\/[^\s"'<>()]+\/storage\/v1\/object\/public\/site-assets\/[^\s"'<>()]+$/;

/** What RMD sent, with the defaults filled in. Anything unexpected is ignored. */
export function resolveChatWidget(sent: unknown): ChatWidgetSettings {
  const out = { ...DEFAULT_CHAT_WIDGET };
  if (!sent || typeof sent !== 'object') return out;
  for (const [key, value] of Object.entries(sent as Record<string, unknown>)) {
    if (!(key in out) || typeof value !== 'string' || !value.trim()) continue;
    const k = key as keyof ChatWidgetSettings;
    if (k === 'accent' || k === 'background') {
      if (HEX.test(value.toLowerCase())) out[k] = value.toLowerCase();
    } else if (CHOICES[k]) {
      if (CHOICES[k]!.includes(value)) (out as Record<string, string>)[k] = value;
    } else if (k === 'logo_url') {
      if (value.length <= 500 && LOGO.test(value)) out.logo_url = value;
    } else {
      (out as Record<string, string>)[k] = value.trim().slice(0, 240);
    }
  }
  return out;
}

// Readable text on each colour: the same sums as RMD's preview.
const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const textOn = (hex: string) => (contrast('#ffffff', hex) >= contrast('#09090b', hex) ? '#ffffff' : '#09090b');

const RADII = {
  square: { panel: 0, control: 0, bubble: 0 },
  rounded: { panel: 16, control: 8, bubble: 12 },
  pill: { panel: 24, control: 9999, bubble: 18 },
};

const mix = (colour: string, percent: number) => `color-mix(in srgb, ${colour} ${percent}%, transparent)`;

/** The CSS variables the widget draws with (see ChatWidget.tsx). */
export function chatWidgetStyle(widget: ChatWidgetSettings): CSSProperties {
  const text = textOn(widget.background);
  const r = RADII[widget.corners];
  return {
    '--cw-accent': widget.accent,
    '--cw-on-accent': textOn(widget.accent),
    '--cw-bg': widget.background,
    '--cw-text': text,
    // Names, links and errors: the accent, unless it disappears into the background.
    '--cw-mark': contrast(widget.accent, widget.background) >= 3 ? widget.accent : text,
    '--cw-line': mix(text, 15),
    '--cw-line-soft': mix(text, 10),
    '--cw-field': mix(text, 5),
    '--cw-msg': mix(text, 6),
    '--cw-text-60': mix(text, 60),
    '--cw-text-50': mix(text, 50),
    '--cw-text-40': mix(text, 40),
    '--cw-r-panel': `${r.panel}px`,
    '--cw-r-control': `${r.control}px`,
    '--cw-r-bubble': `${r.bubble}px`,
  } as CSSProperties;
}

/** Turnstile's light or dark look, to sit on the panel. */
export const turnstileTheme = (widget: ChatWidgetSettings) => (luminance(widget.background) > 0.18 ? 'light' : 'dark');
