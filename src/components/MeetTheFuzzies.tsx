import { useEffect, useRef, useState } from 'react';
import { m, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
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
 * Where the zoom flies to: the right part of the middle bar of the second E of
 * "MEET" (Ricky, 2026-11-02), in the black panel's own pixels, with half the
 * bar's thickness (how far it is to the edge of the ink). The letter is found
 * where it sits on the page (the words wrap differently on phones), then drawn
 * alone on a small canvas in the heading's font to find its middle bar. Null
 * when the words no longer say "MEET" or it can't be worked out (the centre is
 * used).
 */
function middleOfE(h2: HTMLElement, mask: HTMLElement): { x: number; y: number; r: number } | null {
  const walker = document.createTreeWalker(h2, NodeFilter.SHOW_TEXT);
  let node: Text | null = null;
  let at = -1;
  while (walker.nextNode()) {
    const text = walker.currentNode as Text;
    const i = text.data.toUpperCase().indexOf('MEET');
    if (i >= 0) {
      node = text;
      at = i + 2;
      break;
    }
  }
  if (!node) return null;
  const range = document.createRange();
  range.setStart(node, at);
  range.setEnd(node, at + 1);
  const char = range.getBoundingClientRect();
  const panel = mask.getBoundingClientRect();
  if (!char.width || !char.height || !panel.width) return null;
  // The panel may already be zoomed in: back to its own pixels.
  const unzoom = mask.offsetWidth / panel.width;
  const left = (char.left - panel.left) * unzoom;
  const top = (char.top - panel.top) * unzoom;

  // The letter alone, 240 pixels tall, from the top of its line box (where the page puts it).
  const cs = getComputedStyle(h2);
  const H = 240;
  const k = H / (char.height * unzoom);
  const W = Math.ceil(char.width * unzoom * k);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.font = `${cs.fontWeight} ${parseFloat(cs.fontSize) * k}px ${cs.fontFamily}`;
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#fff';
  ctx.fillText('E', 0, ctx.measureText('E').fontBoundingBoxAscent);
  const px = ctx.getImageData(0, 0, W, H).data;

  // The right edge of the ink in each row: the stem alone where it's shortest, the three bars beyond it.
  const right: number[] = [];
  for (let y = 0; y < H; y++) {
    let r = -1;
    for (let x = W - 1; x >= 0; x--) if (px[(y * W + x) * 4 + 3] > 128) { r = x; break; }
    right.push(r);
  }
  const inked = right.filter((r) => r >= 0);
  if (!inked.length) return null;
  const stem = Math.min(...inked);
  const bars: { ya: number; yb: number; end: number }[] = [];
  for (let y = 0; y < H; y++) {
    if (right[y] <= stem + 2) continue;
    const last = bars[bars.length - 1];
    if (last && last.yb === y - 1) {
      last.yb = y;
      last.end = Math.max(last.end, right[y]);
    } else bars.push({ ya: y, yb: y, end: right[y] });
  }
  if (bars.length !== 3) return null;
  const bar = bars[1];
  // In the middle of its thickness, as far right as it can be with that much ink on every side
  // (the bar's end is as close as its top and bottom edges): the most clip around it as it zooms.
  const r = (bar.yb - bar.ya + 1) / 2;
  const x = Math.max(stem + (bar.end - stem) / 2, bar.end - r);
  const y = (bar.ya + bar.yb) / 2;
  return { x: left + x / k, y: top + y / k, r: r / k };
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
      const ink = middleOfE(h2, mask);
      if (!ink) return setTarget({ x: mask.offsetWidth / 2, y: mask.offsetHeight / 2, scale: 35 });
      // Big enough that the bar covers the whole screen at the end.
      const needed = (Math.hypot(window.innerWidth, window.innerHeight) / 2 / ink.r) * 1.25;
      setTarget({ x: ink.x, y: ink.y, scale: Math.min(120, Math.max(8, needed)) });
    };
    // Phones resize the screen as the address bar shows and hides while scrolling: only a new width re-aims.
    let width = window.innerWidth;
    const resized = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      measure();
    };
    document.fonts.ready.then(measure);
    window.addEventListener('resize', resized);
    return () => {
      stop = true;
      window.removeEventListener('resize', resized);
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
  // Shuffled once the site runs: the page arrives drawn with the clips in their own order, and a
  // shuffle while drawing would pick different clips in the build and in the browser.
  const [order, setOrder] = useState(FUZZY_CLIPS);
  useEffect(() => setOrder(shuffled(FUZZY_CLIPS)), []);
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
      <m.div
        ref={maskRef}
        style={zoom ? { scale, opacity: maskOpacity, transformOrigin: target ? `${target.x}px ${target.y}px` : '50% 50%' } : undefined}
        className={`relative flex items-center justify-center bg-ink px-4 mix-blend-multiply ${tall ? 'min-h-[100svh] py-16' : 'py-16 md:py-40'}`}
      >
        <h2 ref={headingRef} className="text-center font-display uppercase text-white leading-[0.9] tracking-[0.01em] text-[24vw] md:text-[17vw] xl:text-[15vw]">
          <T k="home.fuzzies.title" label="Heading">{"Meet the\nFuzzies"}</T>
        </h2>
      </m.div>
    </section>
  );
}
