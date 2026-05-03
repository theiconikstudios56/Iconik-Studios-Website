import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children?: ReactNode;
}

export default function ScrollReveal({ children }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform for the image width and scale
  // We want it to start at maybe 70% and go to 100%
  const width = useTransform(scrollYProgress, [0.2, 0.5], ["70%", "100%"]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0.2, 0.5], ["24px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  // Parallax effect for the image once it's full screen
  const imageY = useTransform(scrollYProgress, [0.5, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative pt-32 pb-0 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-[10px] font-mono text-burnt-orange tracking-[0.5em] uppercase mb-6 block text-center">
            02 // THE VISION
          </span>
          <h2 className="text-4xl md:text-6xl font-display leading-tight tracking-tight uppercase mb-8 text-center">
            Like all bold pursuits, your <br />
            <span className="text-burnt-orange italic font-serif lowercase">ambitions</span> require the <br />
            proper partner, equipment <br />
            and plan. <br />
            <span className="text-outline">That's where we come in.</span>
          </h2>
          <p className="text-xl md:text-2xl font-medium opacity-100 leading-relaxed max-w-2xl mx-auto text-center">
            We bridge the gap between human creativity and artificial intelligence, crafting digital artifacts that resonate and endure.
          </p>
        </motion.div>
      </div>

      {/* The Expanding Image Section */}
      <div className="relative h-[100vh] w-full flex items-start justify-center">
        <motion.div 
          style={{ 
            width,
            scale,
            borderRadius,
            opacity
          }}
          className="sticky top-0 h-screen overflow-hidden shadow-2xl"
        >
          <motion.img 
            style={{ y: imageY, scale: 1.2 }}
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000" 
            alt="Visionary Landscape"
            className="w-full h-full object-cover origin-top"
            referrerPolicy="no-referrer"
          />
          
          {/* Overlay text that appears when full screen */}
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
            }}
            className="absolute inset-0 bg-ink/20 flex flex-col items-center justify-center text-tan p-6 text-center"
          >
            <h3 className="text-5xl md:text-8xl font-display tracking-tighter uppercase mb-4">
              Let us be your guide.
            </h3>
            <p className="text-lg md:text-xl font-mono tracking-widest uppercase opacity-100">
              Iconik Studios // ATX
            </p>
          </motion.div>
        </motion.div>
      </div>
      {children}
    </section>
  );
}
