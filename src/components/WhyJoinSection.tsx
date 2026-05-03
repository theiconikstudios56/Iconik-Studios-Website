import { motion } from 'motion/react';

export default function WhyJoinSection() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 border-b border-ink/10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-100 mb-8 block">Why Brands Join Co-Lab</span>
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight mb-8">
              Most brand problems aren’t execution problems, they’re clarity problems.
            </h2>
            <div className="space-y-4 mb-12">
              <p className="text-sm md:text-base font-mono uppercase tracking-widest text-burnt-orange">/ Co-Lab helps brands:</p>
              {[
                'clarify story, positioning, and meaning',
                'remove friction in key customer moments',
                'strengthen narrative and value communication',
                'align leadership around what really matters',
                'test smarter ideas before making big investments'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 opacity-100">
                  <div className="w-1 h-1 bg-ink rounded-full" />
                  <p className="text-sm md:text-base">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-lg md:text-xl leading-relaxed opacity-100">
              Instead of guessing, stalling, or rebuilding blindly, we create <span className="text-burnt-orange font-medium">focused momentum in the right direction</span>.
            </p>
          </div>
        </div>
        <div className="md:col-span-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square bg-ink/5 overflow-hidden grayscale"
          >
            <img src="https://picsum.photos/seed/clarity/1000/1000" alt="Clarity" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
