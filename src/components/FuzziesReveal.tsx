import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import MeetTheFuzzies from './MeetTheFuzzies';
import lineupImg from '../assets/images/web/fuzzy-lineup-2026.webp';
import { Img } from '../content';

// "Meet the Fuzzies" (Ricky, 2026-10-30): the words fill the screen and pin;
// scrolling zooms into them until the clip alone fills the screen; a short
// hold; then the panel slides up like a curtain off the lineup picture pinned
// behind it (the way the footer is revealed at the end of the page). The
// picture settles from a slight zoom and brightens as it's uncovered, holds
// for one screen, then the next section scrolls up over it.

/** Scrolling spent pinned on the words: zooming in, then holding at full zoom. In screens. */
const ZOOM_SCREENS = 1.8;
const HOLD_SCREENS = 0.5;

export default function FuzziesReveal() {
  const panelRef = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  // 0 as the words reach the top of the screen; 1 at the end of the pinned stretch.
  const { scrollYProgress: pinned } = useScroll({ target: panelRef, offset: ['start start', 'end end'] });
  const zoom = useTransform(pinned, [0, ZOOM_SCREENS / (ZOOM_SCREENS + HOLD_SCREENS)], still ? [0, 0] : [0, 1]);
  // 0 while the panel still covers the picture; 1 once its bottom edge has left the top of the screen.
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ['end end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], still ? [1, 1] : [1.12, 1]);
  const shade = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0.5, 0]);

  return (
    <div className="relative">
      {/* The picture: pinned to the top of the screen while the panel moves over it; it starts below the menu bar so the Iconik mark above the fuzzies stays clear, the strip above in the picture's own background colour. */}
      <section data-bg="white" className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-[#F0EBEC]">
        <motion.div style={{ scale }} className="absolute inset-x-0 bottom-0 top-[72px] md:top-[120px] will-change-transform">
          <Img k="home.lineup.image-iconik-fuzzies-crown" label="Picture"
            loading="lazy"
            decoding="async"
            src={lineupImg}
            alt="Iconik Fuzzies Crown Lineup"
            className="h-full w-full object-cover object-center block selection:bg-transparent"
            draggable={false}
          />
        </motion.div>
        <motion.div style={{ opacity: shade }} aria-hidden="true" className="absolute inset-0 bg-ink pointer-events-none" />
      </section>

      {/* The panel starts exactly over the picture and pins while the spacer scrolls by
          (the zoom, then the hold), then scrolls away to uncover it. */}
      <div ref={panelRef} className="relative z-10 -mt-[100svh]">
        <div className="sticky top-0">
          <MeetTheFuzzies tall zoom={zoom} />
        </div>
        <div aria-hidden="true" style={{ height: `${(ZOOM_SCREENS + HOLD_SCREENS) * 100}svh` }} />
      </div>

      {/* Holds the uncovered picture for one screen before the next section slides over it. */}
      <div aria-hidden="true" className="h-[100svh]" />
    </div>
  );
}
