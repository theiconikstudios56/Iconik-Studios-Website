import { motion } from 'motion/react';

const steps = [
  { step: "Phase 01", title: "Discovery", desc: "We deep dive into your business, your competition, and your technical requirements." },
  { step: "Phase 02", title: "Strategy", desc: "We map out the exact sequence of events needed to reach your objectives." },
  { step: "Phase 03", title: "Execution", desc: "Intense sprints focused on high-precision output across design and code." },
  { step: "Phase 04", title: "Optimization", desc: "Refining every interaction until the experience is flawless." }
];

export default function AboutProcess() {
  return (
    <section className="py-32 bg-ink text-tan">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-4 sticky top-32 h-fit">
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-100 block mb-6">Our Process</span>
          <h2 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tighter mb-8">
            How we <br /> Build.
          </h2>
          <p className="text-lg opacity-100 leading-relaxed max-w-sm">
            We don't follow generic templates. We follow a rigorous method of discovery and rapid iterative feedback.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-32">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-12 lg:pl-24"
            >
              <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full border border-burnt-orange flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-burnt-orange rounded-full" />
              </div>
              {i !== steps.length - 1 && (
                <div className="absolute left-4 top-10 w-[1px] h-[calc(100%+8rem)] bg-gradient-to-b from-burnt-orange to-transparent opacity-30" />
              )}
              
              <span className="font-mono text-xs text-burnt-orange mb-4 block uppercase tracking-widest">{item.step}</span>
              <h3 className="text-4xl md:text-6xl font-display uppercase mb-6">{item.title}</h3>
              <p className="text-lg md:text-xl opacity-100 leading-relaxed max-w-2xl">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
