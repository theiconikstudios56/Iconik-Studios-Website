import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import MeetTheFuzzies from './MeetTheFuzzies';
import lineupImg from '../assets/images/web/fuzzy-time-2.webp';
import { Img } from '../content';

// "Meet the Fuzzies" as a curtain (Ricky, 2026-10-30): the lineup picture is
// pinned behind it, full screen, and the black panel slides up off it as the
// page scrolls, the way the footer is revealed at the end of the page. The
// picture settles from a slight zoom and brightens as it's uncovered, holds
// for one screen, then the next section scrolls up over it.
export default function FuzziesReveal() {
  const panelRef = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  // 0 while the panel still covers the picture; 1 once its bottom edge has left the top of the screen.
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ['end end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], still ? [1, 1] : [1.12, 1]);
  const shade = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0.5, 0]);

  return (
    <div className="relative">
      {/* The picture: pinned to the top of the screen while the panel moves over it. */}
      <section data-bg="white" className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-[#E9E8E6]">
        <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
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

      {/* The panel starts exactly over the picture and scrolls away to uncover it. */}
      <div ref={panelRef} className="relative z-10 -mt-[100svh]">
        <MeetTheFuzzies tall />
      </div>

      {/* Holds the uncovered picture for one screen before the next section slides over it. */}
      <div aria-hidden="true" className="h-[100svh]" />
    </div>
  );
}
