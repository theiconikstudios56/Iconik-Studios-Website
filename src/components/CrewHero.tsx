import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function CrewHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax offsets for different columns - more varied speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [400, -400]);
  const y4 = useTransform(scrollYProgress, [0, 1], [-250, 250]);
  const y5 = useTransform(scrollYProgress, [0, 1], [350, -350]);

  const columns = [
    { y: y1, width: "14%", images: ['https://picsum.photos/seed/crew1/400/800', 'https://picsum.photos/seed/crew2/400/800'] },
    { y: y2, width: "11%", images: ['https://picsum.photos/seed/crew3/400/800', 'https://picsum.photos/seed/crew4/400/800'] },
    { y: y3, width: "16%", images: ['https://picsum.photos/seed/crew5/400/800', 'https://picsum.photos/seed/crew6/400/800'] },
    { y: y4, width: "13%", images: ['https://picsum.photos/seed/crew7/400/800', 'https://picsum.photos/seed/crew8/400/800'] },
    { y: y5, width: "15%", images: ['https://picsum.photos/seed/crew9/400/800', 'https://picsum.photos/seed/crew10/400/800'] },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative h-[150vh] bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Big Text Background - Now on top with blend mode */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-20">
        <h1 className="text-[26vw] font-display leading-none text-white tracking-tighter uppercase select-none whitespace-nowrap mix-blend-difference">
          THE CREW
        </h1>
      </div>

      {/* Parallax Image Columns - Now behind the text */}
      <div className="absolute inset-0 flex justify-around px-4 md:px-8 z-10">
        {columns.map((col, i) => (
          <motion.div 
            key={i}
            className="flex flex-col gap-24"
            style={{ width: col.width, y: col.y }}
          >
            {col.images.map((src, j) => (
              <div key={j} className="relative aspect-[3/5] bg-neutral-900 grayscale overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={src} 
                  alt="Crew member" 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                {/* Scanline pattern over the image */}
                <div className="absolute inset-0 pointer-events-none opacity-20" 
                     style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-soft-light grain-overlay z-20" />

      {/* Bottom Content */}
      <div className="absolute bottom-12 left-6 md:left-12 z-30">
        <div className="max-w-xl">
          <p className="text-white font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-100 leading-relaxed max-w-md">
            Relentless work ethic. Senior firepower. Diverse skills obsessed with one thing: finding the best solution.
          </p>
        </div>
      </div>
    </section>
  );
}
