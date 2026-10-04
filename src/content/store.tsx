import { useEffect, useSyncExternalStore } from 'react';
import published from 'virtual:site-content';

// Website content (BUILD_PLAN A16 in RMD). Every editable piece of text or
// image has a key, like "home.hero.title", and keeps today's wording or
// picture in the code as its starting value. What's published in RMD is baked
// in when the site is built and replaces the starting value. Inside RMD's
// editor, the draft replaces both, live.

export type Kind = 'text' | 'image' | 'projects';
export type Piece = { key: string; kind: Kind; label?: string; value: string; multiline?: boolean; max?: number };

const KEY = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/;

/** Only web addresses (or the site's own files) are used as pictures. */
export const safeImage = (src: string) => /^(https:\/\/|\/(?!\/)|data:image\/(png|jpeg|webp);)/.test(src) || (import.meta.env.DEV && /^http:\/\/(127\.0\.0\.1|localhost)[:/]/.test(src));

// ---------------------------------------------------------------------------
// The editor's state: pieces on the current page, the draft, the focus.
// Outside the editor it never changes, so pages render exactly as before.
// ---------------------------------------------------------------------------

type EditorState = { on: boolean; editable: boolean; draft: Record<string, string>; focus: string | null };
let editor: EditorState = { on: false, editable: false, draft: {}, focus: null };
const listeners = new Set<() => void>();
export const editorState = () => editor;
export function setEditor(next: Partial<EditorState>) {
  editor = { ...editor, ...next };
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
export const useEditor = () => useSyncExternalStore(subscribe, editorState, editorState);

/** The pieces shown on the page right now (counted, so a piece used twice stays until both are gone). */
const pieces = new Map<string, { piece: Piece; count: number }>();
let onPieces: (() => void) | null = null;
export const currentPieces = () => [...pieces.values()].map((p) => p.piece);
export const watchPieces = (fn: () => void) => {
  onPieces = fn;
};
function register(piece: Piece) {
  if (!KEY.test(piece.key)) {
    if (import.meta.env.DEV) console.error(`Website content: "${piece.key}" isn't a valid key.`);
    return () => {};
  }
  const entry = pieces.get(piece.key);
  if (entry) entry.count += 1;
  else pieces.set(piece.key, { piece, count: 1 });
  onPieces?.();
  return () => {
    const e = pieces.get(piece.key);
    if (!e) return;
    e.count -= 1;
    if (e.count <= 0) pieces.delete(piece.key);
    onPieces?.();
  };
}

/** The value to show: the draft (in the editor), else what's published, else the starting value. */
function resolve(key: string, kind: Kind, start: string, draft: Record<string, string>) {
  const value = draft[key] ?? published.values[key];
  if (value === undefined) return start;
  if (kind === 'image' && !safeImage(value)) return start;
  return value;
}

/** A piece of content's current value, registered so the editor can list it. */
export function useContent(key: string, kind: Kind, start: string, meta: { label?: string; multiline?: boolean; max?: number } = {}) {
  const state = useEditor();
  useEffect(() => {
    if (!state.on) return;
    return register({ key, kind, value: start, ...meta });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.on, key, kind, start, meta.label, meta.multiline, meta.max]);
  return resolve(key, kind, start, state.on ? state.draft : {});
}

/** A text value for places that need a plain string: an image's description, a page title. */
export const useText = (key: string, start: string, meta: { label?: string; max?: number } = {}) => useContent(key, 'text', start, meta);

/** An image's address (for a background or an animated picture). */
export const useImage = (key: string, start: string, meta: { label?: string } = {}) => useContent(key, 'image', start, meta);
