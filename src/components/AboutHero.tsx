import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Image expansion transforms
  const stripWidth = useTransform(scrollYProgress, [0, 0.6], ["20vw", "100vw"]);
  const stripHeight = useTransform(scrollYProgress, [0, 0.6], ["60vh", "100vh"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="h-[200vh] bg-black text-white relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Corners Content - Top Left */}
        <div className="absolute top-10 left-10 z-30 mix-blend-difference">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-1 h-1 bg-burnt-orange rounded-full" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter uppercase">Iconik</span>
          </div>
        </div>

        {/* Corners Content - Top Right (Simulated Nav vibe) */}
        <div className="absolute top-10 right-10 z-30 hidden md:block">
          <div className="flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-widest text-white">
            <span>The Crew</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
        </div>

        {/* Main Text Content - Positions IN FRONT of the expanding image */}
        <motion.div 
          style={{ scale: textScale }}
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
        >
          <h1 className="text-[22vw] font-display font-black leading-none tracking-tight mix-blend-difference">
            ABOUT
          </h1>
        </motion.div>

        {/* The Expanding Image Container */}
        <motion.div 
          style={{ 
            width: stripWidth,
            height: stripHeight,
          }}
          className="relative z-20 overflow-hidden shadow-2xl"
        >
          <motion.img 
            style={{ scale: imageScale }}
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920" 
            alt="Iconik Workspace" 
            className="w-full h-full object-cover grayscale brightness-75 contrast-125"
            referrerPolicy="no-referrer"
          />
          {/* Overlay to keep it moody */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </motion.div>

        {/* Corners Content - Bottom Left */}
        <div className="absolute bottom-10 left-10 z-30 max-w-[280px]">
          <p className="font-mono text-[10px] uppercase tracking-widest leading-relaxed text-white">
            A boutique creative studio dedicated to architecting digital legacies for pioneering brands.
          </p>
        </div>

        {/* Corners Content - Bottom Right */}
        <div className="absolute bottom-10 right-10 z-30">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-32 h-32 bg-burnt-orange flex flex-col items-center justify-center text-center p-4 rounded-sm"
          >
            <span className="font-mono text-[10px] font-bold text-black uppercase leading-tight">
              Colab <br /> With Us
            </span>
          </motion.button>
        </div>

        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-radial-gradient-vignette pointer-events-none z-10" />
      </div>
    </section>
  );
}
