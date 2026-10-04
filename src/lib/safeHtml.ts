// An article's body, kept to what an article needs (BUILD_PLAN A16 Part 3 in
// RMD): paragraphs, headings, lists, quotes, bold and italic, line breaks,
// links and pictures. Anything else is dropped (scripts, styles, frames,
// event handlers) or reduced to its text. RMD's editor keeps to the same
// list; this is the website's own check before showing it.

const KEEP = new Set(['P', 'H2', 'H3', 'H4', 'UL', 'OL', 'LI', 'STRONG', 'B', 'EM', 'I', 'BLOCKQUOTE', 'BR', 'A', 'IMG']);
const DROP = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'TEMPLATE', 'NOSCRIPT', 'SVG', 'MATH', 'FORM', 'INPUT', 'BUTTON', 'TEXTAREA', 'SELECT', 'LINK', 'META', 'BASE']);

const safeLink = (href: string) => /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(href.trim());
// https only (and pictures from RMD on this computer while developing).
const safePicture = (src: string) => /^https:\/\//i.test(src.trim()) || (import.meta.env.DEV && /^http:\/\/(127\.0\.0\.1|localhost)[:/]/.test(src.trim()));

function clean(node: Node, doc: Document): Node[] {
  if (node.nodeType === Node.TEXT_NODE) return [doc.createTextNode(node.textContent ?? '')];
  if (!(node instanceof Element)) return [];
  if (DROP.has(node.tagName)) return [];
  const children = [...node.childNodes].flatMap((c) => clean(c, doc));
  if (!KEEP.has(node.tagName)) return children;
  const out = doc.createElement(node.tagName);
  if (node.tagName === 'A') {
    const href = node.getAttribute('href') ?? '';
    if (!safeLink(href)) return children;
    out.setAttribute('href', href.trim());
    if (/^https?:\/\//i.test(href.trim()) && !/^https?:\/\/(www\.)?theiconikstudios\.com/i.test(href.trim())) {
      out.setAttribute('target', '_blank');
      out.setAttribute('rel', 'noopener noreferrer');
    }
  }
  if (node.tagName === 'IMG') {
    const src = node.getAttribute('src') ?? '';
    if (!safePicture(src)) return [];
    out.setAttribute('src', src.trim());
    out.setAttribute('alt', node.getAttribute('alt') ?? '');
    out.setAttribute('loading', 'lazy');
    return [out];
  }
  children.forEach((c) => out.appendChild(c));
  return [out];
}

/** The body as safe HTML, ready for dangerouslySetInnerHTML. */
export function safeArticleHtml(html: string): string {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  const wrapper = doc.createElement('div');
  [...doc.body.childNodes].flatMap((c) => clean(c, doc)).forEach((c) => wrapper.appendChild(c));
  return wrapper.innerHTML;
}
