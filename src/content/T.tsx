import { useEffect, useRef, type ImgHTMLAttributes } from 'react';
import { readText, renderText, textHtml, type TextStyle } from './render';
import { editorState, setEditor, useContent, useEditor, useText } from './store';
import { sendEdit } from './editor';

type TProps = TextStyle & {
  /** The content key, e.g. "home.hero.title". */
  k: string;
  /** Today's wording: the starting value. */
  children: string;
  /** What RMD calls it, when the key alone isn't clear. */
  label?: string;
  /** The longest it may be (RMD warns well before the design breaks). */
  max?: number;
};

/** Editable website text. Outside RMD's editor it renders exactly the text, with no wrapper. */
export function T({ k, children, em, br, label, max }: TProps) {
  const multiline = children.includes('\n');
  const value = useContent(k, 'text', children, { label, multiline, max });
  const state = useEditor();
  if (!state.on) return <>{renderText(value, { em, br })}</>;
  return <EditableText k={k} value={value} style={{ em, br }} editable={state.editable} multiline={multiline} />;
}

function EditableText({ k, value, style, editable, multiline }: { k: string; value: string; style: TextStyle; editable: boolean; multiline: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  // The text is written by hand, not by React, so typing never moves the cursor.
  useEffect(() => {
    const el = ref.current;
    if (el && document.activeElement !== el) el.innerHTML = textHtml(value, style);
  }, [value, style.em, style.br]);
  return (
    <span
      ref={ref}
      data-k={k}
      contentEditable={editable ? 'plaintext-only' : undefined}
      suppressContentEditableWarning
      spellCheck={editable}
      onFocus={() => setEditor({ focus: k })}
      onBlur={(e) => {
        if (editorState().focus === k) setEditor({ focus: null });
        e.currentTarget.innerHTML = textHtml(editorState().draft[k] ?? value, style);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !multiline && !e.shiftKey) {
          e.preventDefault();
          e.currentTarget.blur();
        }
        if (e.key === 'Escape') e.currentTarget.blur();
      }}
      onInput={(e) => sendEdit(k, readText(e.currentTarget))}
    />
  );
}

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  /** The content key, e.g. "home.hero.image1". Its description is "<key>.alt". */
  k: string;
  src: string;
  alt: string;
  label?: string;
};

/** An editable website picture: the same <img>, with RMD's picture if one is published. */
export function Img({ k, src, alt, label, ...rest }: ImgProps) {
  const value = useContent(k, 'image', src, { label });
  const description = useText(`${k}.alt`, alt, { label: `${label ?? 'Picture'}: description`, max: 200 });
  const state = useEditor();
  return <img {...rest} src={value} alt={description} {...(state.on ? { 'data-img-k': k } : {})} />;
}

/** The same as <Img>, for pictures drawn by another component (an animated <motion.img>): spread the result onto it. */
export function useImg(k: string, src: string, alt: string, label?: string) {
  const value = useContent(k, 'image', src, { label });
  const description = useText(`${k}.alt`, alt, { label: `${label ?? 'Picture'}: description`, max: 200 });
  const state = useEditor();
  return { src: value, alt: description, ...(state.on ? { 'data-img-k': k } : {}) };
}
