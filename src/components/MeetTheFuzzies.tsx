import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import { T } from '../content';
import { FUZZY_CLIPS, type FuzzyClip } from '../constants/fuzzyClips';

// "Meet the Fuzzies": big words that are windows onto clips of the fuzzies,
// one after another in a random order. The clips sit under a black layer with
// white letters; multiply keeps the black exactly black and lets the clip
// show only through the letters, in every browser (iPhones too). Clips load
// when the section comes near and play only while it's on screen. With
// motion turned off, a still picture fills the letters instead.

const FADE_MS = 700;

/**
 * The fattest point of the drawn words (the centre of the widest letter stroke)
 * in the heading's own pixels, and how far it is to the nearest edge of the ink.
 * The zoom flies into that point, so the screen ends up inside a letter, on
 * the clip, rather than in a black gap. With `focus` (a line and a character
 * in it) only that letter is searched: Ricky wants the T of "MEET". Drawn on a
 * small canvas with the heading's own font; null when it can't be worked out
 * (the centre is used).
 */
function fattestInk(h2: HTMLElement, focus?: { line: number; index: number }): { x: number; y: number; r: number } | null {
  const rect = h2.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const cs = getComputedStyle(h2);
  const lines = h2.innerText.split('\n').map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return null;
  const W = 360;
  const k = W / rect.width;
  const H = Math.max(1, Math.round(rect.height * k));
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fff';
  ctx.font = `${cs.fontWeight} ${parseFloat(cs.fontSize) * k}px ${cs.fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if ('letterSpacing' in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${(parseFloat(cs.letterSpacing) || 0) * k}px`;
  const lineHeight = (parseFloat(cs.lineHeight) || parseFloat(cs.fontSize)) * k;
  const upper = cs.textTransform === 'uppercase';
  lines.forEach((line, i) => ctx.fillText(upper ? line.toUpperCase() : line, W / 2, (i + 0.5) * lineHeight));
  const px = ctx.getImageData(0, 0, W, H).data;
  // Distance from each ink pixel to the nearest non-ink one (chamfer 3-4, two passes); the edge counts as non-ink.
  const far = 1e9;
  const dist = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) dist[y * W + x] = px[(y * W + x) * 4] > 128 && x > 0 && y > 0 && x < W - 1 && y < H - 1 ? far : 0;
  for (let y = 1; y < H; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; if (dist[i]) dist[i] = Math.min(dist[i], dist[i - 1] + 3, dist[i - W] + 3, dist[i - W - 1] + 4, dist[i - W + 1] + 4); }
  for (let y = H - 2; y >= 0; y--) for (let x = W - 2; x >= 1; x--) { const i = y * W + x; if (dist[i]) dist[i] = Math.min(dist[i], dist[i + 1] + 3, dist[i + W] + 3, dist[i + W + 1] + 4, dist[i + W - 1] + 4); }
  // The box of the letter to zoom into, or the whole drawing.
  let box = { xa: 0, xb: W, ya: 0, yb: H };
  if (focus && lines[focus.line]) {
    const line = upper ? lines[focus.line].toUpperCase() : lines[focus.line];
    const x0 = W / 2 - ctx.measureText(line).width / 2;
    box = { xa: x0 + ctx.measureText(line.slice(0, focus.index)).width, xb: x0 + ctx.measureText(line.slice(0, focus.index + 1)).width, ya: focus.line * lineHeight, yb: (focus.line + 1) * lineHeight };
  }
  let best = 0;
  let at = -1;
  for (let y = Math.max(0, Math.floor(box.ya)); y < Math.min(H, Math.ceil(box.yb)); y++)
    for (let x = Math.max(0, Math.floor(box.xa)); x < Math.min(W, Math.ceil(box.xb)); x++) {
      const i = y * W + x;
      if (dist[i] > best && dist[i] < far) { best = dist[i]; at = i; }
    }
  if (at < 0) return null;
  return { x: (at % W) / k, y: Math.floor(at / W) / k, r: best / 3 / k };
}

function shuffled<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * `tall`: a full-screen black panel (the curtain in FuzziesReveal) rather than
 * one sized to the words. `zoom` (0 to 1): how far the view has flown into the
 * words; at 1 the black is gone and the clip fills the screen.
 */
export default function MeetTheFuzzies({ tall = false, zoom }: { tall?: boolean; zoom?: MotionValue<number> } = {}) {
  const maskRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const none = useMotionValue(0);
  const progress = zoom ?? none;
  // Where to zoom into, in the black panel's own pixels, and how big the zoom must get for that stroke to fill the screen.
  const [target, setTarget] = useState<{ x: number; y: number; scale: number } | null>(null);
  useEffect(() => {
    if (!zoom) return;
    let stop = false;
    const measure = () => {
      const mask = maskRef.current;
      const h2 = headingRef.current;
      if (stop || !mask || !h2) return;
      // The T that ends "MEET", when the words still say that; otherwise the fattest stroke anywhere.
      const lines = h2.innerText.split('\n').map((l) => l.trim()).filter(Boolean);
      const line = lines.findIndex((l) => l.toUpperCase().includes('MEET'));
      const ink = fattestInk(h2, line >= 0 ? { line, index: lines[line].toUpperCase().indexOf('MEET') + 3 } : undefined);
      const m = mask.getBoundingClientRect();
      const h = h2.getBoundingClientRect();
      if (!ink) return setTarget({ x: m.width / 2, y: m.height / 2, scale: 35 });
      const needed = (Math.hypot(window.innerWidth, window.innerHeight) / 2 / ink.r) * 1.25;
      setTarget({ x: h.left - m.left + ink.x, y: h.top - m.top + ink.y, scale: Math.min(80, Math.max(8, needed)) });
    };
    document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => {
      stop = true;
      window.removeEventListener('resize', measure);
    };
  }, [zoom]);
  // A steady zoom: the same factor per scroll step all the way in (so it neither crawls at the start nor jumps at the end).
  const maxScale = target?.scale ?? 35;
  const scale = useTransform(progress, (p) => Math.pow(maxScale, Math.min(1, Math.max(0, p))));
  // The black melts away over the last stretch, leaving the clip alone on screen.
  const maskOpacity = useTransform(progress, [0.78, 0.94], [1, 0]);

  const sectionRef = useRef<HTMLElement>(null);
  const firstRef = useRef<HTMLVideoElement>(null);
  const secondRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const order = useMemo(() => shuffled(FUZZY_CLIPS), []);
  // Which of the two videos is showing; the other waits with the next clip.
  const [front, setFront] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const els = [firstRef.current, secondRef.current];
    if (reduced || !section || !els[0] || !els[1] || order.length === 0) return;
    const videos = els as HTMLVideoElement[];
    let shown = 0;
    let pos = 0;
    let onScreen = false;
    let loaded = false;
    let swap: number | undefined;

    const load = (video: HTMLVideoElement, clip: FuzzyClip) => {
      if (video.dataset.src === clip.src) return;
      video.dataset.src = clip.src;
      video.src = clip.src;
    };
    const play = (video: HTMLVideoElement) => {
      video.play().catch(() => {});
    };
    const advance = () => {
      if (order.length === 1) {
        videos[shown].currentTime = 0;
        play(videos[shown]);
        return;
      }
      const old = videos[shown];
      shown = 1 - shown;
      pos += 1;
      videos[shown].currentTime = 0;
      play(videos[shown]);
      setFront(shown);
      window.clearTimeout(swap);
      swap = window.setTimeout(() => {
        old.pause();
        load(old, order[(pos + 1) % order.length]);
      }, FADE_MS);
    };
    const onEnded = (e: Event) => {
      if (e.target === videos[shown] && onScreen) advance();
    };
    videos.forEach((v) => v.addEventListener('ended', onEnded));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          loaded = true;
          load(videos[0], order[0]);
          if (order.length > 1) load(videos[1], order[1]);
        }
        // Playing only when actually in view (the margin only loads early).
        onScreen = entry.isIntersecting && entry.intersectionRatio > 0.15;
        if (onScreen) play(videos[shown]);
        else videos.forEach((v) => v.pause());
      },
      { rootMargin: '300px 0px', threshold: [0, 0.15] },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      window.clearTimeout(swap);
      videos.forEach((v) => {
        v.removeEventListener('ended', onEnded);
        v.pause();
      });
    };
  }, [reduced, order]);

  return (
    <section
      ref={sectionRef}
      data-bg="dark"
      className="relative isolate overflow-hidden bg-ink"
    >
      {/* The clips (or, with motion off, one still picture) */}
      <div className="absolute inset-0" aria-hidden="true">
        {reduced ? (
          order[0] && <img src={order[0].poster} alt="" className="h-full w-full object-cover" />
        ) : (
          [firstRef, secondRef].map((ref, i) => (
            <video
              key={i}
              ref={ref}
              muted
              playsInline
              preload="none"
              loop={order.length === 1}
              poster={order[i % Math.max(order.length, 1)]?.poster}
              className="absolute inset-0 h-full w-full object-cover transition-opacity ease-out"
              style={{ opacity: front === i ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
            />
          ))
        )}
      </div>

      {/* Black everywhere but the letters */}
      <motion.div
        ref={maskRef}
        style={zoom ? { scale, opacity: maskOpacity, transformOrigin: target ? `${target.x}px ${target.y}px` : '50% 50%' } : undefined}
        className={`relative flex items-center justify-center bg-ink px-4 mix-blend-multiply ${tall ? 'min-h-[100svh] py-16' : 'py-16 md:py-40'}`}
      >
        <h2 ref={headingRef} className="text-center font-display uppercase text-white leading-[0.9] tracking-[0.01em] text-[24vw] md:text-[17vw] xl:text-[15vw]">
          <T k="home.fuzzies.title" label="Heading">{"Meet the\nFuzzies"}</T>
        </h2>
      </motion.div>
    </section>
  );
}
