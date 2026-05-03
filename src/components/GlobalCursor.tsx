import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function GlobalCursor() {
  const [isOverOrange, setIsOverOrange] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Adjusted spring for ultra-responsive feel
  const springX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect if hovering over orange sections or elements specifically
      const isOrange = target?.closest('.bg-burnt-orange') || 
                       target?.classList.contains('bg-burnt-orange') ||
                       target?.closest('.text-burnt-orange') ||
                       target?.classList.contains('text-burnt-orange');
      
      setIsOverOrange(!!isOrange);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div 
        animate={{
          backgroundColor: isOverOrange ? '#000000' : '#cd7f32',
          scale: isOverOrange ? 1.2 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-[10px] h-[10px] rounded-full"
        style={{
          boxShadow: isOverOrange 
            ? '0 0 8px rgba(0,0,0,0.1)' 
            : '0 0 12px rgba(205,127,50,0.6)'
        }}
      />
    </motion.div>
  );
}
