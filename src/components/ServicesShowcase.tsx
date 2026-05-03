import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const MARQUEE_TEXT = "ANIMATION • BRANDING • STRATEGY • DEVELOPMENT • CONTENT • UI/UX • MARKETING • ";

export default function ServicesShowcase() {
  return (
    <section className="bg-ink text-tan overflow-hidden relative z-10">
      {/* Top Large Marquee */}
      <div className="py-20 overflow-hidden select-none pointer-events-none">
        <motion.div 
          className="flex whitespace-nowrap text-[8vw] md:text-[12vw] font-display leading-none uppercase tracking-tighter opacity-100"
          animate={{ x: [0, -2000] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <span>{MARQUEE_TEXT}</span>
          <span>{MARQUEE_TEXT}</span>
          <span>{MARQUEE_TEXT}</span>
        </motion.div>
      </div>
    </section>
  );
}
