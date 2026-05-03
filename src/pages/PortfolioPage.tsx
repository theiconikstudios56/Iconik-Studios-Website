import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECT_DATA, type Project } from '../constants/projects';
import Navbar from '../components/Navbar';

export default function PortfolioPage() {
  const projects = Object.values(PROJECT_DATA);
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [itemWidth, setItemWidth] = useState(0);

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the horizontal translation based on scroll
  // Tuned to 60.5vw to perfectly align the last project with the viewport end
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 60.5}vw`]);
  
  // Smooth the translation with premium spring settings
  const x = useSpring(xTranslate, {
    stiffness: 80,
    damping: 25,
    mass: 0.8,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && containerRef.current.children.length > 0) {
        const firstItem = containerRef.current.children[0] as HTMLElement;
        const style = window.getComputedStyle(containerRef.current);
        const gap = parseInt(style.gap) || 64;
        setItemWidth(firstItem.offsetWidth + gap);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [projects.length]);

  // Update active index based on scroll progress
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const index = Math.round(latest * (projects.length - 1)) + 1;
      setActiveIndex(Math.min(projects.length, Math.max(1, index)));
    });
  }, [scrollYProgress, projects.length]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Handled by global cursor
  };

  return (
    <div 
      className="bg-[#0b0b0b] selection:bg-burnt-orange selection:text-white"
    >
      <Navbar />

      {/* The Scroll Track */}
      <div ref={targetRef} className="relative" style={{ height: `${projects.length * 85}vh` }}>
        {/* The Sticky Viewport */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            ref={containerRef}
            style={{ x }}
            className="flex gap-16 items-center px-[20vw] h-full"
          >
            {projects.map((project, index) => (
              <ProjectSlide 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </motion.div>

          {/* Dynamic Progress Indicator */}
          <div className="absolute bottom-12 left-0 w-full px-[15vw] z-50 pointer-events-none">
            <div className="flex flex-col gap-6 max-w-sm ml-auto bg-black/20 backdrop-blur-sm p-6 border border-white/5">
              <div className="flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-white">
                <span className="text-burnt-orange font-bold font-mono">
                  {String(activeIndex).padStart(2, '0')}
                </span>
                <div className="flex-1 mx-8 h-[1px] bg-white/10" />
                <span>{String(projects.length).padStart(2, '0')}</span>
              </div>
              
              <div className="relative h-[2px] bg-white/5 w-full">
                <motion.div 
                  style={{
                    scaleX: scrollYProgress,
                    originX: 0
                  }}
                  className="absolute inset-0 bg-burnt-orange h-full shadow-[0_0_15px_rgba(205,127,50,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic Grain Layer */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.04] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

    </div>
  );
}

interface ProjectSlideProps {
  project: Project;
  index: number;
}

function ProjectSlide({ project, index }: any) {
  return (
    <motion.div 
      className="relative w-[70vw] md:w-[60vw] lg:w-[55vw] aspect-[16/10] flex-shrink-0 group select-none"
    >
      <Link 
        to={`/project/${project.id}`} 
        className="block w-full h-full relative overflow-hidden rounded-sm"
      >
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
          referrerPolicy="no-referrer"
          draggable={false}
        />
        
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />

        <div className="absolute inset-0 flex items-center justify-center p-12 text-center pointer-events-none">
          <h3 className="text-[12vw] leading-none font-display font-black uppercase text-white/5 group-hover:text-white transition-all duration-700 tracking-[-0.05em] drop-shadow-2xl">
            {project.shortName}
          </h3>
        </div>

        <div className="absolute bottom-10 left-10 md:left-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white opacity-100 mb-2">{project.category}</p>
          <p className="font-display text-lg text-white opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">{project.year}</p>
        </div>

        <div className="absolute top-10 right-10 md:right-16 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-4 group-hover:translate-y-0">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
