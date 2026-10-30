import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { T } from '../content';
import { FUZZY_CLIPS, type FuzzyClip } from '../constants/fuzzyClips';

// "Meet the Fuzzies": big words that are windows onto clips of the fuzzies,
// one after another in a random order. The clips sit under a black layer with
// white letters; multiply keeps the black exactly black and lets the clip
// show only through the letters, in every browser (iPhones too). Clips load
// when the section comes near and play only while it's on screen. With
// motion turned off, a still picture fills the letters instead.

const FADE_MS = 700;

function shuffled<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function MeetTheFuzzies() {
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
      <div className="relative flex items-center justify-center bg-ink px-4 py-16 md:py-40 mix-blend-multiply">
        <h2 className="text-center font-display uppercase text-white leading-[0.9] tracking-[0.01em] text-[24vw] md:text-[17vw] xl:text-[15vw]">
          <T k="home.fuzzies.title" label="Heading">{"Meet the\nFuzzies"}</T>
        </h2>
      </div>
    </section>
  );
}
