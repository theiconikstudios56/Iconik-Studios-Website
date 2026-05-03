import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function Spread() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Trigger animation when 40% of the section is in view
  const isInView = useInView(containerRef, { amount: 0.4, once: false });

  return (
    <section data-bg="tan" ref={containerRef} className="relative min-h-screen pt-32 pb-64 overflow-hidden flex items-center justify-center">
      {/* Revealed Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
        transition={{ 
          delay: 0.8, 
          duration: 1, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="absolute z-10 text-center px-6 max-w-4xl"
      >
        <span className="text-[10px] font-mono text-burnt-orange tracking-[0.5em] uppercase mb-8 block">
          03 // THE VISION
        </span>
        <h2 className="text-5xl md:text-8xl font-display leading-[0.85] mb-8 text-ink uppercase">
          WE BUILD <br />
          <span className="text-outline-ink">DIGITAL EMPIRES.</span>
        </h2>
        <p className="text-lg md:text-xl font-serif italic text-ink max-w-2xl mx-auto mb-12 leading-relaxed">
          LOUNGE DIGITAL ISN'T JUST AN AGENCY. IT'S A STRATEGIC PARTNER FOR THOSE WHO REFUSE TO BE FORGOTTEN. WE BLEND RAW CREATIVITY WITH AI PRECISION TO CREATE LEGACIES.
        </p>
        
        <a 
          href="#contact"
          className="relative group inline-block"
        >
          <div className="absolute inset-0 bg-burnt-orange blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
          <div className="relative px-12 py-6 border border-ink/20 rounded-none hover:border-burnt-orange transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-burnt-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-xs uppercase tracking-[0.3em] font-bold text-ink group-hover:text-tan transition-colors">
              START YOUR PROJECT
            </span>
          </div>
        </a>
      </motion.div>

      {/* Splitting Text */}
      <div className="relative flex items-center justify-center w-full select-none pointer-events-none">
        <motion.div 
          initial={{ x: "0%" }}
          animate={isInView ? { x: "-150%" } : { x: "0%" }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="text-[25vw] font-display leading-none text-ink tracking-tighter whitespace-nowrap z-20"
        >
          ICO
        </motion.div>
        <motion.div 
          initial={{ x: "0%" }}
          animate={isInView ? { x: "150%" } : { x: "0%" }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="text-[25vw] font-display leading-none text-ink tracking-tighter whitespace-nowrap z-20"
        >
          NIK
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-x border-ink/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-ink/5" />
      </div>
    </section>
  );
}
