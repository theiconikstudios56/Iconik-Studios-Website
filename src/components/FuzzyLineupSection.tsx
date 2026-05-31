import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import lineupImg from '../assets/images/fuzzy-time-2.png';

export default function FuzzyLineupSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Vertically translate the image from -12% to 12% for a smooth parallax glide
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section 
      ref={containerRef}
      data-bg="white" 
      className="relative bg-[#E9E8E6] w-full h-[65vh] md:h-[85vh] overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 -top-[15%] -bottom-[15%] w-full h-[130%]"
      >
        <img
          src={lineupImg}
          alt="Iconik Fuzzies Crown Lineup"
          className="w-full h-full object-cover object-center block selection:bg-transparent"
          draggable={false}
        />
      </motion.div>
    </section>
  );
}
