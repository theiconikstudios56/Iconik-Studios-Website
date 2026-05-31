import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import fuzziesTeamImg from '../../assets/images/fuzzy-collab.png';

export default function AboutFuzzies() {
  return (
    <section className="py-32 bg-tan text-ink border-b border-ink/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Content Block */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-burnt-orange" />
              <span className="font-mono text-xs text-burnt-orange uppercase tracking-[0.3em]">The Mascots</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display uppercase leading-none tracking-tighter">
              Meet the <span className="text-burnt-orange italic">Fuzzies</span>
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-90 font-mono">
              <p>
                At the heart of Iconik Studios are the Fuzzies — our brand mascots and the living face of every AI agent and automated workflow system we build and deploy for our clients. When you partner with us, the Fuzzies go to work for you — running in the background, capturing leads, automating processes, and scaling your business while you focus on what matters most.
              </p>
              <p>
                They also carry something deeper. Named with love in memory of someone who meant everything to our founder, the Fuzzies represent more than technology — they represent heart, purpose, and the belief that what we build should leave a lasting difference in the world.
              </p>
              <p className="border-t border-ink/10 pt-6 mt-6">
                We operate as an elite collective, not a factory. Quality over quantity isn't a tagline — it's the filter for everything we take on. We build with purpose. We design with intention. And we show up for every partner with one simple goal: to leave a lasting mark, one business at a time.
              </p>
            </div>
            
            {/* CTA Button Link */}
            <div className="pt-4">
              <Link to="/services/ai-automation" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-burnt-orange text-black font-display font-bold text-sm tracking-[0.2em] px-10 py-5 rounded-full hover:bg-ink hover:text-white transition-all duration-300 uppercase shadow-lg cursor-pointer"
                >
                  Explore AI & Automation
                </motion.button>
              </Link>
            </div>
          </div>
          
          {/* Image Block */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5 border border-ink/10 relative group"
            >
              <img 
                src={fuzziesTeamImg} 
                alt="Iconik Fuzzies AI Team" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-burnt-orange/5 mix-blend-multiply pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
