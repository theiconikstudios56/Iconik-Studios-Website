import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const SERVICES = [
  {
    id: "001",
    title: "Web Design",
    description: "We design modern, responsive websites engineered to engage your audience and turn visitors into customers. Every layout decision is intentional—built to convert, not just impress.",
    categories: ["Wireframe", "Website", "Web Design", "Dashboard", "Product"],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "002",
    title: "AI Automation",
    description: "We build autonomous agents and intelligent workflows that handle lead qualification, booking, and CRM updates in real time. Scale your operations without scaling your headcount.",
    categories: ["AI", "Automation", "Make.com", "Lead Capture", "CRM"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "003",
    title: "Marketing",
    description: "We develop strategic marketing assets that amplify your brand's reach and directly support growth. From digital ads to automated review generation—everything we create has a purpose.",
    categories: ["Campaign", "Digital Ads", "Reputation Management", "Performance"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "004",
    title: "Brand Identity",
    description: "We craft cohesive brand identities that communicate purpose, personality, and credibility from the first impression. Your brand isn't just a logo—it's a complete, elite language.",
    categories: ["Brand", "Visual", "Logo Design", "Typography", "Brand Guidelines"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "005",
    title: "Content",
    description: "We produce content that communicates clearly, connects emotionally, and performs strategically. We leverage the same AI systems internally that we build for you to deliver lightning-fast results.",
    categories: ["Copywriting", "Visual", "Motion", "Editorial", "Storytelling"],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200",
  }
];

interface CardProps {
  i: number;
  title: string;
  description: string;
  categories: string[];
  image: string;
  id: string;
  progress: any;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({ i, title, description, categories, image, id, progress, range, targetScale }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div 
      ref={container} 
      className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-6"
    >
      <motion.div 
        style={{ 
          scale, 
          top: `${i * 30}px` 
        }}
        className="relative bg-black border border-white/10 w-full max-w-7xl h-auto md:h-[600px] rounded-[16px] md:rounded-[24px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-20 overflow-hidden shadow-[0_100px_80px_rgba(0,0,0,0.8)]"
      >
        {/* Left ID */}
        <div className="absolute top-10 left-10 z-20">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-1.5 rounded-md">
              <span className="font-mono text-[10px] font-bold text-white tracking-widest">{id}</span>
            </div>
        </div>

        {/* Categories Section (Small Tablets on right in video) */}
        <div className="hidden lg:block absolute top-10 right-10 z-20 text-right">
            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white opacity-100 block mb-4">Categories</span>
            <div className="flex flex-wrap gap-2 justify-end max-w-[240px]">
                {categories.map((cat, idx) => (
                    <span key={idx} className="text-[10px] uppercase font-bold px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-white">
                      {cat}
                    </span>
                ))}
            </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/5 flex flex-col gap-8 md:gap-14 order-2 md:order-1">
            <div className="space-y-6">
              <h3 className="text-5xl md:text-7xl lg:text-9xl font-display text-white uppercase tracking-tighter leading-[0.75]">
                {title}
              </h3>
              <p className="text-lg md:text-2xl text-white opacity-100 max-w-lg font-light leading-relaxed">
                {description}
              </p>
            </div>
            
            {/* Mobile Categories */}
            <div className="flex flex-col gap-4 lg:hidden">
                <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white opacity-100">Categories</span>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat, idx) => (
                        <span key={idx} className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white">
                          {cat}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="hidden md:block">
              <button className="group flex items-center gap-4 text-burnt-orange font-display tracking-[0.3em] uppercase text-sm">
                Explore Service
                <div className="w-12 h-[1px] bg-burnt-orange transform group-hover:scale-x-150 transition-transform origin-left duration-500" />
              </button>
            </div>
        </div>

        {/* Image Container */}
        <div className="w-full md:w-2/5 aspect-[4/3] md:aspect-square relative group overflow-hidden rounded-[12px] md:rounded-[16px] flex-shrink-0 order-1 md:order-2">
           <img 
             src={image} 
             alt={title} 
             className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
             referrerPolicy="no-referrer"
           />
           <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/5" />
           <div className="absolute inset-0 border-[2px] border-white/10 rounded-[12px] md:rounded-[16px] pointer-events-none" />
           
           {/* Scanlines overlay like the CREW page */}
           <div className="absolute inset-0 pointer-events-none opacity-20" 
                style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 100% 3px' }} />
        </div>
        
        {/* Ambient Glow */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 blur-[120px] rounded-full opacity-30" />
      </motion.div>
    </div>
  )
}

export default function StackedServices() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  // We want the cards to stack as we scroll
  return (
    <section 
      ref={container} 
      data-bg="dark" 
      className="relative bg-black"
    >
       <div className="relative">
         {SERVICES.map((service, i) => {
           const targetScale = 1 - ( (SERVICES.length - i) * 0.04);
           // Calculate range based on index to distribute cards along the scroll
           return (
             <Card 
               key={service.id} 
               i={i} 
               id={service.id}
               title={service.title}
               description={service.description}
               categories={service.categories}
               image={service.image}
               progress={scrollYProgress} 
               range={[i * 0.15, 1]} 
               targetScale={targetScale} 
             />
           )
         })}
       </div>
       {/* Spacer at the end to make sure the last card stays for a bit */}
       <div className="h-[20vh]" />
    </section>
  )
}
