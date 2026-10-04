import { Fragment, type ReactNode } from 'react';

// How a piece of website text is written (in RMD and in the code):
//   a new line         → a line break (the section decides whether it shows on every screen size)
//   *a few words*      → the section's highlight style (the orange italic word, say)
// Everything else is plain text: nothing typed in RMD can become HTML.

export type TextStyle = {
  /** Classes for *highlighted* words. Without it, the asterisks are left as typed. */
  em?: string;
  /** Classes for line breaks, e.g. "hidden lg:block" when the break is only for large screens. */
  br?: string;
};

/** A line's text with *highlights* turned into spans. */
function line(text: string, em: string | undefined, key: string): ReactNode[] {
  if (em === undefined) return [text];
  const out: ReactNode[] = [];
  const parts = text.split(/\*([^*\n]+)\*/);
  parts.forEach((part, i) => {
    if (part === '') return;
    out.push(i % 2 === 1 ? <span key={`${key}-${i}`} className={em}>{part}</span> : part);
  });
  return out;
}

/** Website text as React nodes: plain text, line breaks and highlights, nothing else. */
export function renderText(value: string, style: TextStyle = {}): ReactNode {
  const lines = value.split('\n');
  return lines.map((text, i) => (
    <Fragment key={i}>
      {/* A space before each break: a break that only shows on large screens still leaves the words apart. */}
      {i > 0 && <>{' '}<br className={style.br} /></>}
      {line(text, style.em, String(i))}
    </Fragment>
  ));
}

/** The same text as HTML for the editor (escaped), so the page looks the same while it's edited. */
export function textHtml(value: string, style: TextStyle = {}): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return value
    .split('\n')
    .map((text) => {
      if (style.em === undefined) return esc(text);
      return text
        .split(/\*([^*\n]+)\*/)
        .map((part, i) => (i % 2 === 1 ? `<span data-em class="${esc(style.em!)}">${esc(part)}</span>` : esc(part)))
        .join('');
    })
    .join(` <br${style.br ? ` class="${esc(style.br)}"` : ''}>`);
}

/** Reads edited text back from the page: highlights become *words* again, breaks become new lines. */
export function readText(el: Node): string {
  let out = '';
  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) out += node.textContent ?? '';
    else if (node instanceof HTMLBRElement) out += '\n';
    else if (node instanceof HTMLElement && node.hasAttribute('data-em')) out += `*${node.textContent ?? ''}*`;
    else if (node instanceof HTMLElement && (node.tagName === 'DIV' || node.tagName === 'P')) out += (out && !out.endsWith('\n') ? '\n' : '') + readText(node);
    else out += readText(node);
  });
  return out.replace(/\u00a0/g, ' ').replace(/ +\n/g, '\n');
}
