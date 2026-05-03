import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import { PROJECT_DATA } from '../constants/projects';

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = id ? PROJECT_DATA[id] : null;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [id]);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center bg-tan font-display text-4xl">
        PROJECT NOT FOUND
      </div>
    );
  }

  return (
    <main className="h-screen w-full overflow-hidden bg-ink flex flex-col md:flex-row relative">
      <Navbar />
      
      {/* Left Sidebar - Fixed Width */}
      <aside className="w-full md:w-[35%] lg:w-[30%] h-full flex flex-col z-20 border-r border-tan/10">
        {/* Top Block: Acronym */}
        <div className="h-[35%] bg-ink flex items-center justify-center p-8 pt-32 border-b border-tan/10 relative overflow-hidden">
          {/* Subtle Grain for this block */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <filter id="sidebarNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#sidebarNoise)" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.h1 
              key={project.id + 'short'}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15vw] md:text-[10vw] font-display text-tan leading-none select-none relative z-10"
            >
              {project.shortName}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Middle Block: Client Info */}
        <div className="flex-1 bg-burnt-orange p-8 md:p-12 flex flex-col justify-between border-b border-ink/10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-ink mb-4">Client // {project.year}</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-ink leading-[0.9] uppercase mb-8">
              {project.title}
            </h2>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-ink/20 pt-6">
              {project.services.map((service: string) => (
                <span key={service} className="text-[10px] font-mono uppercase tracking-widest text-ink">
                  {service}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="group w-full flex items-center justify-between border border-ink p-4 md:p-6 hover:bg-ink hover:text-tan transition-all duration-500">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-bold">Visit Website</span>
              <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Block: Navigation */}
        <div className="h-[15%] bg-ink flex items-center justify-between px-8 relative">
          <button 
            onClick={() => navigate(`/project/${project.prevId}`)}
            className="w-12 h-12 rounded-full border border-tan/20 flex items-center justify-center text-tan hover:bg-burnt-orange hover:border-burnt-orange hover:text-ink transition-all duration-500"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="text-center">
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-tan mb-1">Explore Project</p>
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-tan">Scroll to view gallery</p>
          </div>

          <button 
            onClick={() => navigate(`/project/${project.nextId}`)}
            className="w-12 h-12 rounded-full border border-tan/20 flex items-center justify-center text-tan hover:bg-burnt-orange hover:border-burnt-orange hover:text-ink transition-all duration-500"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </aside>

      {/* Right Content - Visual Area */}
      <div className="flex-1 h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar bg-ink">
        <section className="h-full w-full snap-start relative overflow-hidden">
          <motion.img 
            key={project.id + 'hero'}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-ink/30 pointer-events-none" />
        </section>

        {project.gallery.map((img: string, idx: number) => (
          <section key={idx} className="h-full w-full snap-start relative overflow-hidden bg-ink">
            <img 
              src={img} 
              alt={`${project.title} gallery ${idx}`} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-ink/10 pointer-events-none" />
          </section>
        ))}
      </div>

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </main>
  );
}
