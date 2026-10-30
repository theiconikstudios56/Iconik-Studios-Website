import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Globe, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { T, useProjects } from '../content';

// The homepage's showcase: the portfolio's first four projects.
export default function HomesPortfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const { projects } = useProjects();
  const PROJECTS = projects.slice(0, 4);
  const [shown, setActiveProject] = useState(0);
  const activeProject = Math.min(shown, PROJECTS.length - 1);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const index = Math.floor(v * PROJECTS.length);
      if (index >= 0 && index < PROJECTS.length) {
        setActiveProject(index);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, PROJECTS.length]);

  if (!PROJECTS.length) return null;

  return (
    <section ref={sectionRef} className="relative h-[180vh] md:h-[250vh] bg-ink">
      <div className="sticky top-0 h-screen w-full flex flex-col pt-32 pb-12 overflow-hidden">
        
        {/* Title */}
        <div className="relative w-full px-6 text-center z-20 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-burnt-orange/30" />
              <span className="text-[10px] font-mono text-burnt-orange tracking-[0.5em] uppercase block"><T k="home.portfolio.03-portfolio">{"03 // PORTFOLIO"}</T></span>
              <div className="w-12 h-[1px] bg-burnt-orange/30" />
            </div>
            <h2 className="text-5xl md:text-[6vw] font-display text-white uppercase tracking-tighter leading-[0.8] transition-all duration-500"><T k="home.portfolio.portfolio-showcase" label="Heading">{"Portfolio Showcase"}</T></h2>
          </motion.div>
        </div>

        {/* Project Container */}
        <div className="relative w-full flex-grow flex items-center justify-center px-4 md:px-0 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeProject}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl"
            >
              <Link to={`/project/${PROJECTS[activeProject].id}`} className="absolute inset-0 z-30 cursor-pointer" />
              
              <img
                loading="lazy"
                decoding="async"
                src={PROJECTS[activeProject].image} 
                alt={PROJECTS[activeProject].title}
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 transition-all duration-1000 group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-ink/40" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 z-20">
                <div className="flex justify-between items-end">
                  <div className="space-y-4 text-paper">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-4"
                    >
                      <span className="font-display text-2xl text-burnt-orange">0{activeProject + 1}</span>
                      <div className="w-12 h-[1px] bg-paper/50" />
                    </motion.div>
                    <motion.h2 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-5xl md:text-8xl tracking-tighter uppercase font-display"
                    >
                      {PROJECTS[activeProject].title}
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg md:text-xl font-light tracking-wide"
                    >
                      {PROJECTS[activeProject].category}
                    </motion.p>
                  </div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/30 flex items-center justify-center bg-transparent hover:bg-paper hover:text-ink transition-colors text-paper"
                  >
                    <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10" />
                  </motion.div>
                </div>
              </div>

              {/* Progress Slider Indicator */}
              <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 flex gap-2 z-20">
                {PROJECTS.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 transition-all duration-500 ${i === activeProject ? 'w-8 bg-burnt-orange' : 'w-4 bg-white/20'}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

