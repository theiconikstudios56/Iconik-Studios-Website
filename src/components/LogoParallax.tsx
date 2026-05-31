import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import fuzzyLineupImg from '../assets/images/ping-pong-fuzzy.png';

const LogoParallax = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[80vh] md:h-[100vh] overflow-hidden bg-ink"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-x-0 -top-[20%] -bottom-[20%] z-0"
      >
        <img 
          src={fuzzyLineupImg} 
          alt="Parallax background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Aesthetic Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-burnt-orange/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-burnt-orange/30 to-transparent" />
    </section>
  );
};

export default LogoParallax;
