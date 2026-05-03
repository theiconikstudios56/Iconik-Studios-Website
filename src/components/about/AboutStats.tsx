import { motion } from 'motion/react';

export default function AboutStats() {
  return (
    <section className="py-40 bg-burnt-orange text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h4 className="text-8xl md:text-[10vw] font-display leading-none mb-4">100+</h4>
            <p className="font-mono text-xs uppercase tracking-[0.4em] opacity-100">Projects Shipped</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h4 className="text-8xl md:text-[10vw] font-display leading-none mb-4">12</h4>
            <p className="font-mono text-xs uppercase tracking-[0.4em] opacity-100">Design Awards</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="text-8xl md:text-[10vw] font-display leading-none mb-4">04</h4>
            <p className="font-mono text-xs uppercase tracking-[0.4em] opacity-100">Global Studios</p>
          </motion.div>
        </div>

        <div className="mt-32 pt-20 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight max-w-xl">
              Ready to build the <span className="italic">extraordinary?</span>
            </h2>
            <button className="px-12 py-6 rounded-full border-2 border-white font-display text-white hover:bg-white hover:text-burnt-orange transition-all duration-500 uppercase tracking-widest text-sm">
              Start Your Inquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
