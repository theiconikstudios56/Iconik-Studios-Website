import { currentPieces, editorState, setEditor, watchPieces } from './store';

// The bridge to RMD's website editor (BUILD_PLAN A16). The site runs in it
// only inside RMD, opened as /<page>?rmd-editor in a frame, and listens only
// to RMD's own address. Visitors never see any of this.

const RMD = ['https://rmd.theiconikstudios.com', ...(import.meta.env.DEV ? ['http://localhost:5173'] : [])];

type FromRmd =
  | { source: 'rmd'; type: 'values'; draft: Record<string, string>; editable: boolean }
  | { source: 'rmd'; type: 'focus'; key: string }
  | { source: 'rmd'; type: 'navigate'; path: string };

const send = (message: Record<string, unknown>) => {
  for (const origin of RMD) window.parent.postMessage({ source: 'iconik-site', ...message }, origin);
};

/** Whether this visit is RMD's editor (checked once, when the site starts). */
export const inEditor = (() => {
  try {
    return window.parent !== window && new URLSearchParams(window.location.search).has('rmd-editor');
  } catch {
    return false;
  }
})();

/** A change typed on the page: shown at once, and sent to RMD to save. */
export function sendEdit(key: string, value: string) {
  setEditor({ draft: { ...editorState().draft, [key]: value } });
  send({ type: 'edit', key, value });
}

/** Tells RMD which page is showing (the site calls this on every page change). */
export function reportRoute(path: string) {
  if (inEditor) send({ type: 'route', path });
}

function flash(el: Element) {
  el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  el.classList.add('rmd-flash');
  setTimeout(() => el.classList.remove('rmd-flash'), 1400);
}

const STYLE = `
[data-k]{outline:1px dashed transparent;outline-offset:3px;border-radius:2px;transition:outline-color .15s}
[data-k][contenteditable]:hover{outline-color:rgba(74,222,128,.7);cursor:text}
[data-k][contenteditable]:focus{outline:2px solid #4ade80;outline-offset:3px}
[data-img-k]{cursor:pointer;pointer-events:auto !important}
[data-img-k]:hover{outline:3px solid rgba(74,222,128,.85);outline-offset:-3px}
.rmd-flash{outline:3px solid #4ade80 !important;outline-offset:4px}
`;

export function startEditor() {
  if (!inEditor) return;
  setEditor({ on: true });

  const robots = document.createElement('meta');
  robots.name = 'robots';
  robots.content = 'noindex, nofollow';
  document.head.appendChild(robots);
  const style = document.createElement('style');
  style.textContent = STYLE;
  document.head.appendChild(style);

  let timer = 0;
  watchPieces(() => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => send({ type: 'pieces', path: window.location.pathname, pieces: currentPieces() }), 150);
  });

  window.addEventListener('message', (event: MessageEvent<FromRmd>) => {
    if (!RMD.includes(event.origin) || event.source !== window.parent || event.data?.source !== 'rmd') return;
    const m = event.data;
    if (m.type === 'values' && m.draft && typeof m.draft === 'object') {
      const draft: Record<string, string> = {};
      for (const [k, v] of Object.entries(m.draft)) if (typeof v === 'string') draft[k] = v;
      setEditor({ draft, editable: m.editable === true });
    }
    if (m.type === 'focus' && typeof m.key === 'string') {
      const el = [...document.querySelectorAll('[data-k],[data-img-k]')].find((e) => e.getAttribute('data-k') === m.key || e.getAttribute('data-img-k') === m.key);
      if (el) flash(el);
    }
    if (m.type === 'navigate' && typeof m.path === 'string' && m.path.startsWith('/') && m.path !== window.location.pathname) {
      window.history.pushState({}, '', m.path + '?rmd-editor');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  });

  // Clicking a picture asks RMD for a new one; clicking text never follows its link.
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as Element | null;
      const img = target?.closest('[data-img-k]');
      if (img) {
        event.preventDefault();
        event.stopPropagation();
        if (editorState().editable) send({ type: 'pick-image', key: img.getAttribute('data-img-k') });
        else send({ type: 'select', key: img.getAttribute('data-img-k') });
        return;
      }
      const text = target?.closest('[data-k]');
      if (text) {
        event.preventDefault();
        send({ type: 'select', key: text.getAttribute('data-k') });
      }
    },
    true,
  );

  send({ type: 'ready', path: window.location.pathname });
}
