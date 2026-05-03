import { motion } from 'motion/react';
import { useRef } from 'react';

export default function AboutStory() {
  const container = useRef(null);
  
  return (
    <section ref={container} className="py-40 bg-ink text-paper overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
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
              <h3 className="text-5xl md:text-7xl font-display uppercase leading-none tracking-tighter">
                The <span className="text-burnt-orange italic">Philosophy</span>
              </h3>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-100 italic">
                <p>
                  "We believe that the internet has become too loud and too similar. Our mission is to strip away the noise and return to intentional, purposeful design that moves the needle. Every pixel we place and every line of code we write is driven by a commitment to longevity and impact."
                </p>
                <p>
                  "At Iconik, we don't just build websites; we engineer digital legacy. We understand that in a world of fleeting attention, depth is the ultimate differentiator. Our approach combines old-school craftsmanship with forward-thinking technical precision to ensure your brand doesn't just exist online—it dominates."
                </p>
                <p>
                  "We are a small, elite collective focused on quality over quantity. This allows us to provide undivided attention to every partner, ensuring that the results we ship are nothing short of extraordinary."
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
               <div className="w-full aspect-[4/5] bg-white/5 relative grayscale group overflow-hidden rounded-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200" 
                    alt="Abstract Architecture" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-burnt-orange/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Decorative corner */}
                  <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-burnt-orange/50" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-burnt-orange/50" />
               </div>
            </motion.div>
          </div>

          {/* Bottom scrolling text removed or kept? User only said top. I'll remove it to keep it clean on black background */}
        </div>
      </div>
    </section>
  );
}
