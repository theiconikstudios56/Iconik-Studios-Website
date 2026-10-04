import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import convoFuzzyImage from '../assets/images/web/convo-fuzzy.webp';
import fuzzySetupImage from '../assets/images/web/fuzzy-setup.webp';
import { Img, T } from '../content';

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
          <T k="home.intro.lead">{"A premium agency fusing high-end brand aesthetics with intelligent backend automation."}</T>
        </motion.p>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-none"
        >
          <h2 className="text-5xl md:text-7xl lg:text-[4.2vw] font-display font-medium leading-[1.1] uppercase tracking-tight">
            <T k="home.intro.title" em="italic font-serif normal-case text-burnt-orange" br="hidden md:block">{"SYSTEMS BUILT\nTO CAPTURE LEADS AND *convert*,\nNOT JUST LOOK GOOD."}</T>
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
            <T k="home.intro.note">{"we streamline your intake pipeline to grow your bookings automatically."}</T>
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
          <Img k="home.intro.image1" label="Intro picture, left (large screens)"
            loading="lazy"
            decoding="async"
            src={fuzzySetupImage} 
            alt="Fuzzy Setup" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Image 3: Mid Right Large Landscape */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={{ bottom: '15%', right: '8%' }}
          className="absolute hidden md:block w-[25vw] h-[35vh] rounded-[48px] overflow-hidden shadow-2xl border border-white/10"
        >
          <Img k="home.intro.image2" label="Intro picture, right"
            loading="lazy"
            decoding="async"
            src={convoFuzzyImage} 
            alt="Convo Fuzzy" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </div>
    </section>
  );
}
