import React from 'react';
import { motion } from 'motion/react';

const SuccessSection = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-tan text-ink rounded-xl mx-4 my-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <h2 className="text-7xl md:text-9xl leading-[0.9] font-display uppercase">Built for<br/>Success.</h2>
          <div className="max-w-md">
            <h3 className="text-2xl font-serif italic normal-case leading-relaxed font-light mb-8 italic">
              "From idea to launch, we move fast and stay personal — every detail, every step."
            </h3>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-burnt-orange flex items-center justify-center text-paper font-display text-2xl">JD</div>
              <div>
                <p className="text-xl font-bold">John Doe</p>
                <p className="text-sm opacity-100">Valtero Founder</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Chat Mockup */}
          <div className="bg-ink p-8 rounded-[16px] shadow-2xl space-y-6">
            <div className="text-center text-[10px] uppercase tracking-widest opacity-80 pb-4 border-b border-white/10 text-paper">Today 17:01</div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent" />
              <div className="bg-white/10 p-5 rounded-xl rounded-tl-none max-w-[80%]">
                <p className="text-sm text-paper">Hey Iconik! Love the new automation pipeline 💚</p>
              </div>
            </div>
            <div className="flex gap-4 justify-end">
              <div className="bg-burnt-orange p-5 rounded-xl rounded-tr-none max-w-[80%]">
                <p className="text-sm text-paper">Glad to hear! Scale looks promising for next week.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-burnt-orange" />
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent" />
              <div className="bg-white/10 p-5 rounded-xl rounded-tl-none max-w-[80%]">
                <p className="text-sm text-paper">Perfect! Let's ship.</p>
              </div>
            </div>
          </div>
          {/* Stats Badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-12 -right-12 bg-accent p-8 rounded-full flex flex-col items-center justify-center text-ink w-32 h-32 shadow-xl border-4 border-tan"
          >
            <span className="font-display text-2xl">99%</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">Growth</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SuccessSection;
