import { motion } from 'motion/react';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const insights = [
  {
    id: 1,
    title: "AIR JORDAN 5 \"WOLF GREY\"",
    date: "26.02.26",
    category: "DESIGN",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200",
    link: "/blog"
  },
  {
    id: 2,
    title: "AIR JORDAN 6 \"SALESMAN\"",
    date: "18.02.26",
    category: "AI",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200",
    link: "/blog"
  },
  {
    id: 3,
    title: "BASS CLUB FOR AJ4 FLIGHT CLUB",
    date: "21.01.26",
    category: "STRATEGY",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1200",
    link: "/blog"
  },
  {
    id: 4,
    title: "NEW BALANCE GATOR RUN",
    date: "19.01.26",
    category: "BRANDING",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1200",
    link: "/blog"
  }
];

const LatestInsights = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-black text-white">
      <div className="max-w-[1800px] mx-auto space-y-24">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-display uppercase tracking-tighter"
          >
            Latest Insights
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-md mx-auto text-lg opacity-100 font-light uppercase tracking-widest text-white italic"
          >
            "Deep dives into the intersection of design and technology."
          </motion.p>
        </div>

        {/* Grid Section - Matching Blog Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {insights.map((item, index) => (
            <motion.article 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="group cursor-pointer"
            >
              {/* Image Container with Badge */}
              <div className="relative aspect-[3/4] overflow-hidden bg-white/5 mb-8">
                {/* Release Badge */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-white text-black px-6 py-2 rounded-full font-mono text-[10px] font-bold tracking-widest whitespace-nowrap">
                    RELEASES — {item.date}
                  </div>
                </div>

                <motion.img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:brightness-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Title Content */}
              <div className="px-1">
                <h3 className="text-2xl md:text-3xl font-display font-black leading-[1.1] uppercase tracking-tight group-hover:text-burnt-orange transition-colors duration-300">
                  {item.title}
                </h3>
                
                {/* Decorative underline appearing on hover */}
                <motion.div 
                  className="h-[1.5px] bg-burnt-orange mt-6 w-0 group-hover:w-full transition-all duration-500 origin-left"
                />
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* Footer Link */}
        <div className="pt-12 text-center">
            <motion.a 
                href="/blog"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-4 text-xs font-mono uppercase tracking-[0.4em] text-white hover:text-burnt-orange transition-colors duration-300"
            >
                View all articles <ArrowUpRight size={14} />
            </motion.a>
        </div>
      </div>
    </section>
  );
};

export default LatestInsights;
