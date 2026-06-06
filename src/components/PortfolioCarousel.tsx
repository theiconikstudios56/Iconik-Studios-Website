import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECT_DATA } from '../constants/projects';

const PORTFOLIO_ITEMS = Object.values(PROJECT_DATA);
const ITEMS = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

export default function PortfolioCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30, mass: 0.5 });
  
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth / 3;
      setContainerWidth(width);
      x.set(-width);
    }
  }, []);

  // Control distortion scale based on velocity
  const velocity = useMotionValue(0);
  const distortionScale = useSpring(useTransform(velocity, [0, 1000], [0, 15]), { stiffness: 60, damping: 20 });

  // Auto-scroll effect
  useEffect(() => {
    let animationFrame: number;
    const scrollSpeed = 0.5; // slow speed

    const step = () => {
      if (containerWidth > 0) {
        const currentX = x.get();
        x.set(currentX - scrollSpeed);
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [containerWidth, x]);

  useEffect(() => {
    const unsubscribe = x.on("change", () => {
      const v = Math.abs(x.getVelocity());
      velocity.set(v);
      
      if (containerWidth > 0) {
        const latest = x.get();
        if (latest > 0) {
          x.set(-containerWidth);
        } else if (latest < -containerWidth * 2) {
          x.set(-containerWidth);
        }
      }
    });
    return () => unsubscribe();
  }, [containerWidth, x, velocity]);

  return (
    <div className="relative w-full overflow-hidden py-4 select-none cursor-grab active:cursor-grabbing">
      {/* SVG Filter for Water Effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="water-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.015 0.015" 
              numOctaves="1" 
              result="noise" 
            />
            <motion.feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale={distortionScale}
            />
          </filter>
        </defs>
      </svg>

      <motion.div
        ref={containerRef}
        className="flex gap-4 md:gap-8 px-4 md:px-8"
        style={{ x: springX, filter: 'url(#water-filter)' }}
        drag="x"
        dragConstraints={{ left: -containerWidth * 3, right: containerWidth }}
        dragElastic={0.1}
      >
        {ITEMS.map((item, i) => (
          <div 
            key={`${item.id}-${i}`}
            className="flex-shrink-0 w-[70vw] md:w-[40vw] aspect-video relative group overflow-hidden rounded-sm bg-white/5"
          >
            <Link 
              to={`/project/${item.id}`}
              className="block w-full h-full relative"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                draggable="false"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />

              <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none">
                <h3 className="text-6xl md:text-[6vw] leading-none font-display font-black uppercase text-white/5 group-hover:text-white transition-all duration-700 tracking-[-0.05em] drop-shadow-2xl">
                  {item.shortName}
                </h3>
              </div>

              <div className="absolute bottom-6 left-6 md:left-10 text-left pointer-events-none">
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white opacity-100 mb-1">{item.category}</p>
                <p className="font-display text-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">{item.year}</p>
              </div>

              <div className="absolute top-6 right-6 md:right-10 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-2 group-hover:translate-y-0">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </motion.div>
      
      {/* Scroll indicator or instructions */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-4 text-white opacity-100 font-mono text-[9px] uppercase tracking-[0.4em]">
          <div className="w-8 md:w-16 h-[1px] bg-white/10" />
          <span>Slide to Discover</span>
          <div className="w-8 md:w-16 h-[1px] bg-white/10" />
        </div>
      </div>
    </div>
  );
}
