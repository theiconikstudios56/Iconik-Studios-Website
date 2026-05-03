import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Luxury Estate",
    category: "Real Estate",
    image: "https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 2,
    title: "E-Commerce Rebirth",
    category: "Retail",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 4,
    title: "Creative Agency",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 5,
    title: "Mobile App Design",
    category: "Product",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
  }
];

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
      // Offset skip when dragging - we check velocity to see if user is interacting
      // Or we can use a state to pause it. Let's just add to x.
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
    <div className="relative w-full overflow-hidden py-12 select-none cursor-grab active:cursor-grabbing">
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
            className="flex-shrink-0 w-[70vw] md:w-[40vw] aspect-video relative group overflow-hidden rounded-lg md:rounded-2xl bg-white/5"
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              draggable="false"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-10">
              <span className="font-mono text-[10px] text-burnt-orange uppercase tracking-widest mb-2">{item.category}</span>
              <h3 className="text-xl md:text-3xl font-display text-tan uppercase tracking-tight">{item.title}</h3>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Scroll indicator or instructions */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-4 text-white opacity-100 font-mono text-[9px] uppercase tracking-[0.4em]">
          <div className="w-8 md:w-16 h-[1px] bg-white/10" />
          <span>Slide to Discover</span>
          <div className="w-8 md:w-16 h-[1px] bg-white/10" />
        </div>
      </div>
    </div>
  );
}
