import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import defaultHeroBg from '../assets/images/fuzzy-chillin.png';

interface ParallaxLogoSectionProps {
  bgImage?: string;
}

export default function ParallaxLogoSection({ bgImage = defaultHeroBg }: ParallaxLogoSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Balanced parallax: background moves slightly slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Subtle scale in/out for depth
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);

  return (
    <section
      ref={containerRef}
      className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center bg-ink"
      data-bg="dark"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/30 z-10" />
        <div className="absolute inset-0 bg-ink/10 z-10" />

        <img
          src={bgImage}
          alt="Parallax Background"
          className="w-full h-full object-cover brightness-[0.9] contrast-105"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Decorative Blurred Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-burnt-orange/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Dynamic Grid Overlay (Subtle) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </section>
  );
}
