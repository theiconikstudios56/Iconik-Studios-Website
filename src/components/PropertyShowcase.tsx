import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function PropertyShowcase() {
  return (
    <section className="bg-ink text-tan py-32 min-h-[90vh] flex flex-col justify-center items-center relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col items-center gap-16 relative z-10 text-center">
        
        {/* Narrative (Top Centered) */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-[280px] text-sm font-medium leading-relaxed opacity-100"
        >
          A trusted team committed to providing luxury service and exceptional results.
        </motion.p>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <h2 className="text-5xl md:text-7xl lg:text-[6vw] font-display font-medium leading-[1.1] uppercase tracking-tight">
            WHETHER <span className="italic font-serif normal-case text-burnt-orange">cozy</span> OR GRAND, WE'LL FIND THE <span className="opacity-100">PROPERTY</span> THAT SUITS YOU BEST.
          </h2>
        </motion.div>

        {/* Bottom Area: CTA and Listings Info */}
        <div className="flex flex-col items-center gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-24 rounded-full border border-tan/20 flex items-center justify-center hover:bg-burnt-orange hover:text-ink hover:border-burnt-orange transition-all duration-500 cursor-pointer"
          >
            <ArrowUpRight size={36} />
          </motion.div>
          
          <p className="max-w-[300px] text-sm font-medium opacity-100 uppercase tracking-[0.2em] leading-relaxed">
            listings — let us guide you to the property that fits your vision.
          </p>
        </div>
      </div>

      {/* Floating Visual Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Image 2: Middle Left Vertical */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ top: '20%', left: '10%' }}
          className="absolute hidden lg:block w-56 h-72 rounded-[40px] overflow-hidden shadow-2xl border border-white/10"
        >
          <img 
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=600" 
            alt="Interior 2" 
            className="w-full h-full object-cover grayscale brightness-50 opacity-20 lg:opacity-40"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Image 3: Mid Right Large Landscape */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={{ bottom: '15%', right: '8%' }}
          className="absolute hidden md:block w-[25vw] h-[35vh] rounded-[48px] overflow-hidden shadow-2xl border border-white/10"
        >
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200" 
            alt="Interior 3" 
            className="w-full h-full object-cover grayscale brightness-50 opacity-20 md:opacity-40"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
}
