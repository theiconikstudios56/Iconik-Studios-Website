import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import IconikLogo from './IconikLogo';

export default function ParallaxLogoSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Balanced parallax: background moves slightly slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  // Subtle scale in/out for depth
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  
  // Logo rotation and scale relative to scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/20 to-ink z-10" />
        <div className="absolute inset-0 bg-ink/40 z-10" />
        
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000" 
          alt="Architectural Texture"
          className="w-full h-full object-cover grayscale brightness-[0.4] contrast-125"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Decorative Blurred Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-burnt-orange/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content Container */}
      <motion.div 
        style={{ scale: logoScale, rotate, opacity }}
        className="relative z-20 flex flex-col items-center gap-12"
      >
        {/* Logo with Glow */}
        <div className="relative group">
          <div className="absolute inset-0 bg-burnt-orange/30 blur-[100px] rounded-full group-hover:bg-burnt-orange/40 transition-colors duration-1000 animate-pulse" />
          
          <div className="relative w-48 h-48 md:w-80 md:h-80 flex items-center justify-center p-12 bg-ink/40 backdrop-blur-sm border border-white/5 rounded-[2.5rem] overflow-hidden">
             <IconikLogo color="#cd7f32" className="w-full h-full drop-shadow-[0_0_30px_rgba(205,127,50,0.5)]" />
             
             {/* Decorative UI elements inside the logo box */}
             <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/20" />
             <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-white/20" />
             <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-white/20" />
             <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/20" />
          </div>
        </div>

        {/* Minimalist Subtext */}
        <div className="flex flex-col items-center gap-3">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-burnt-orange" 
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-tan">
            Precision / Craft / Impact
          </span>
        </div>
      </motion.div>

      {/* Dynamic Grid Overlay (Subtle) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </section>
  );
}
