import { motion } from 'motion/react';
import { useRef } from 'react';
import mascotImg from '../../assets/images/fuzzy-squad.png';

export default function AboutStory() {
  const container = useRef(null);
  
  return (
    <section ref={container} className="py-20 md:py-40 bg-ink text-paper overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-burnt-orange" />
                <span className="font-mono text-xs text-burnt-orange uppercase tracking-[0.3em]">Story</span>
              </div>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase leading-none tracking-tighter">
                The <span className="text-burnt-orange italic">Philosophy</span>
              </h3>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-90 font-mono">
                <p>
                  The internet is loud. Everyone looks the same, sounds the same, and builds the same.
                </p>
                <p>
                  Iconik Studios was founded in 2019 with one conviction: intentional engineering beats generic output, every time. For over six years, we've been quietly building something different — a studio where creative craftsmanship and technical precision aren't in tension, they're inseparable.
                </p>
                <p>
                  We're a high-end web design and AI automation agency, but that title barely covers it. We don't just build websites — we engineer growth systems. For small to medium-sized businesses ready to operate at a higher level, we blend striking visual design with intelligent backend automation so that every visitor is captured, every lead is nurtured, and every opportunity converts.
                </p>
                <p className="text-burnt-orange font-bold uppercase tracking-wider">
                  No missed leads. No wasted traffic. Just results.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center"
            >
               <div className="w-full aspect-[4/5] bg-white/5 relative group overflow-hidden rounded-2xl">
                  <img 
                    src={mascotImg} 
                    alt="Iconik Fuzzies Mascot" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90"
                  />
                  <div className="absolute inset-0 bg-burnt-orange/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Decorative corner */}
                  <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-burnt-orange/50" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-burnt-orange/50" />
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
