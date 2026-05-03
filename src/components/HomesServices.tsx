import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const ServiceCard = ({ 
  item, 
  index 
}: { 
  item: any, 
  index: number,
  key?: React.Key
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ 
        scale,
        zIndex: index + 10 
      }}
      className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-16 border-b border-white/5 items-start sticky top-[15vh] bg-ink"
    >
      {/* ID Box */}
      <div className="md:col-span-1">
        <div className="w-10 h-7 bg-white text-ink flex items-center justify-center font-display text-[10px] rounded-sm font-bold">
          {item.id}
        </div>
      </div>

      {/* Large Image */}
      <div className="md:col-span-4">
        <div className="aspect-[16/9] w-full overflow-hidden border border-white/10 group-hover:border-accent/30 transition-all duration-700">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover grayscale-0 transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="md:col-span-4 space-y-4 pt-2">
        <h3 className="text-4xl font-display text-paper leading-none">{item.title}</h3>
        <p className="max-w-xs text-lg font-light text-paper opacity-100 leading-relaxed">{item.desc}</p>
      </div>

      {/* Categories */}
      <div className="md:col-span-3 space-y-6 pt-2">
        <span className="text-[10px] uppercase tracking-widest font-bold text-white opacity-100 block">CATEGORIES</span>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-semibold text-white group-hover:border-white/20 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesGrid = () => {
  const items = [
    { 
      id: '001', 
      title: 'Web Design', 
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
      desc: 'Modern, responsive, and user-friendly websites designed to engage visitors and drive conversions.', 
      tags: ['Wireframe', 'Website', 'Web Design', 'Dashboard', 'Product'] 
    },
    { 
      id: '002', 
      title: 'Social Media', 
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c20a?auto=format&fit=crop&q=80&w=1200',
      desc: 'We create scroll-stopping social content designed to build brand presence and drive engagement.', 
      tags: ['Content', 'Social', 'Motion', 'Campaign', 'Brand'] 
    },
    { 
      id: '003', 
      title: 'AI Automation', 
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
      desc: 'Custom intelligent agents built to scale your business workflows and automate repetitive tasks.', 
      tags: ['LLM', 'Python', 'Agentic', 'Automation', 'Scalability'] 
    },
  ];

  return (
    <section id="services" className="pt-32 pb-32 px-6 lg:px-12 bg-ink">
      <div className="max-w-[1500px] mx-auto">
        <div className="space-y-32">
          {items.map((item, i) => (
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
