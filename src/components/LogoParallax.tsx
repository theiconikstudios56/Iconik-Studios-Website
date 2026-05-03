import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import IconikLogo from './IconikLogo';

const LogoParallax = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-ink"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-x-0 -top-[20%] -bottom-[20%] z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2000" 
          alt="Parallax background" 
          className="w-full h-full object-cover opacity-20 grayscale brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          style={{ y, scale }}
          className="w-48 h-48 md:w-80 md:h-80"
        >
          <IconikLogo color="#EA580C" className="w-full h-full drop-shadow-[0_0_30px_rgba(234,88,12,0.3)]" />
        </motion.div>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-burnt-orange/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-burnt-orange/30 to-transparent" />
    </section>
  );
};

export default LogoParallax;
