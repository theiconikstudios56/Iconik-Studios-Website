import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import IconikLogo from './IconikLogo';

const PROJECTS = [
  {
    title: "Web Design",
    category: "Digital Experience",
    description: "High-end digital experiences crafted for authority and conversion.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000",
    tags: ["UX/UI", "BRANDING"]
  },
  {
    title: "AI Automation",
    category: "Business Intelligence",
    description: "Intelligent workflows that handle the heavy lifting while you scale.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    tags: ["AI", "WORKFLOW"]
  },
  {
    title: "Maintenance",
    category: "Performance Ops",
    description: "Ongoing optimization and security to keep your digital assets at peak performance.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
    tags: ["SECURITY", "OPS"]
  }
];

export default function CaseStudies() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section data-bg="dark" id="work" ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-start overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vmax] h-[100vmax] bg-[radial-gradient(circle_at_center,rgba(205,127,50,0.05)_0%,transparent_70%)] blur-[100px]" />
        </div>

        <div className="px-6 md:px-12 pt-24 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-mono text-burnt-orange tracking-[0.5em]">01 // CAPABILITIES</span>
              </div>
              <h2 className="text-6xl md:text-9xl font-display leading-[0.85] text-tan">
                SERVICES.
              </h2>
            </div>
            <div className="md:text-right pb-4">
              <p className="text-tan text-[10px] font-mono max-w-[240px] leading-relaxed uppercase tracking-wider">
                WE DON'T DO "AVERAGE". WE BUILD DIGITAL WEAPONS FOR BUSINESSES READY TO DOMINATE THEIR SPACE.
              </p>
            </div>
          </div>
        </div>

        {/* Orbital Carousel Container */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden [perspective:2000px] z-10">
          <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
            {PROJECTS.map((project, index) => (
              <OrbitalCard 
                key={index} 
                project={project} 
                index={index} 
                total={PROJECTS.length}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitalCard({ project, index, total, progress }: any) {
  const angleStep = 38; 
  const radius = 1000; 

  const angle = useTransform(
    progress,
    [0, 1],
    [index * angleStep, (index - (total - 1)) * angleStep]
  );

  const x = useTransform(angle, (a: number) => Math.sin((a * Math.PI) / 180) * radius);
  const z = useTransform(angle, (a: number) => Math.cos((a * Math.PI) / 180) * radius - radius);
  const rotateY = useTransform(angle, (a: number) => -a);
  
  const opacity = useTransform(angle, [-60, -30, 0, 30, 60], [0, 0.4, 1, 0.4, 0]);
  const scale = useTransform(angle, [-30, 0, 30], [0.85, 1.1, 0.85]);
  const blur = useTransform(angle, [-30, 0, 30], ["blur(2px)", "blur(0px)", "blur(2px)"]);

  return (
    <motion.div
      style={{
        x,
        z,
        rotateY,
        opacity,
        scale,
        filter: blur,
        transformStyle: "preserve-3d",
        position: "absolute"
      }}
      className="w-[30vw] min-w-[300px] aspect-[4/5] group"
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl border border-tan/10 bg-tan/5 shadow-2xl shadow-black/50">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />

        {/* Logo in Upper Right */}
        <div className="absolute top-6 right-6 w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-20">
          <IconikLogo color="#F5F2ED" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-ink/20 backdrop-blur-[2px]">
          <div className="w-16 h-16 rounded-full bg-tan/20 backdrop-blur-md border border-tan/30 flex items-center justify-center text-tan scale-75 group-hover:scale-100 transition-transform duration-500">
            <Play size={24} fill="currentColor" className="ml-1" />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80" />
        
        <div className="absolute bottom-10 left-10 right-10 transform translate-z-20">
          <p className="text-[10px] font-mono text-burnt-orange uppercase tracking-[0.3em] mb-3 font-bold">{project.category}</p>
          <h3 className="text-3xl md:text-4xl font-display text-tan leading-[0.85] uppercase tracking-tighter">
            {project.title}
          </h3>
          
          <div className="mt-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <span className="text-[8px] font-mono text-tan uppercase tracking-widest">View Details</span>
            <div className="flex-1 h-[1px] bg-tan/20" />
            <ArrowUpRight size={14} className="text-tan" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
