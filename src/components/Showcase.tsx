import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SHOWCASE_PROJECTS = [
  {
    id: 'kinetic-solutions-group',
    number: '01',
    title: 'KINETIC SOLUTIONS',
    category: 'REBRAND / WEB SUITE',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'luxe-estate',
    number: '02',
    title: 'LUXE ESTATE',
    category: 'REAL ESTATE / AI SEARCH',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'nova-audio',
    number: '03',
    title: 'NOVA AUDIO',
    category: 'MUSIC / GENERATIVE AI',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'zenith-flow',
    number: '04',
    title: 'ZENITH FLOW',
    category: 'SAAS / AUTOMATION',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  }
];

export default function Showcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section data-bg="tan" className="py-32 text-ink overflow-hidden relative">
      <div className="w-full">
        <div className="px-6 md:px-12 mb-20 text-center">
          <span className="text-lg font-serif italic text-burnt-orange mb-2 block">Selected Work</span>
          <h2 className="text-7xl md:text-[12vw] font-display leading-[0.8] uppercase">
            SHOWCASE
          </h2>
        </div>

        <div className="relative border-t border-ink/10">
          {SHOWCASE_PROJECTS.map((project, idx) => (
            <Link 
              key={project.id}
              to={`/project/${project.id}`}
              className="block"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div 
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between py-12 px-4 border-b border-ink/10 transition-colors duration-500 ${hoveredIndex === idx ? '' : ''}`}
              >
                <div className="flex items-center gap-8 md:gap-16">
                  <span className="text-xs font-mono opacity-100">{project.number}</span>
                  <h3 className="text-4xl md:text-7xl font-display tracking-tight uppercase">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-8 mt-4 md:mt-0">
                  <span className="text-[10px] font-mono uppercase tracking-widest opacity-100">
                    {project.category}
                  </span>
                  <div className={`w-12 h-12 rounded-full border border-ink/20 flex items-center justify-center transition-all duration-500 ${hoveredIndex === idx ? 'bg-burnt-orange border-burnt-orange text-ink' : ''}`}>
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}

          {/* Floating Image Container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 w-[300px] md:w-[400px] aspect-[3/4] hidden lg:block">
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full overflow-hidden shadow-2xl"
                >
                  <img 
                    src={SHOWCASE_PROJECTS[hoveredIndex].image} 
                    alt={SHOWCASE_PROJECTS[hoveredIndex].title}
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
