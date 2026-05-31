import { motion } from 'motion/react';

const steps = [
  {
    step: "Phase 01",
    title: "Initial Discovery Call",
    desc: "Every great automation starts with a real conversation. We sit down with you to get a clear picture of your business — how it operates, where the bottlenecks are, and what's taking up the most time. This isn't a generic intake form. It's a focused session designed to understand your specific pain points so we can build something that actually solves them."
  },
  {
    step: "Phase 02",
    title: "Automation Audit",
    desc: "Once we understand your business, we dig deeper. We map out your entire workflow and identify the highest-impact areas where automation can save you time, reduce errors, and create more consistent results. You'll walk away from this phase knowing exactly where your Fuzzies are going to work hardest for you."
  },
  {
    step: "Phase 03",
    title: "Build & Testing",
    desc: "This is where your Fuzzies come to life. We develop your custom AI agents and automated workflows, built specifically around your business operations. Everything gets tested thoroughly before it ever touches your live business — so when we flip the switch, it runs smoothly from day one."
  },
  {
    step: "Phase 04",
    title: "Training & Handoff",
    desc: "We don't just hand you a system and disappear. Once your automation is built and ready, we walk you and your team through everything you need to know. You'll understand how your Fuzzies work, how to monitor them, and how to get the most out of your new system from day one."
  },
  {
    step: "Phase 05",
    title: "Maintenance & Optimization",
    desc: "Your Fuzzies don't stop improving after launch. We continuously monitor, refine, and optimize your automation systems to make sure they're always performing at their best. As your business grows and evolves, your systems grow with you — so you're never left behind."
  }
];

export default function AutomationProcess() {
  return (
    <section className="py-32 bg-ink text-tan">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-4 sticky top-32 h-fit">
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-100 block mb-6">Our Process</span>
          <h2 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tighter mb-8">
            How we build <br /> your automation <br /> <span className="text-burnt-orange italic">system.</span>
          </h2>
          <p className="text-lg opacity-100 leading-relaxed max-w-sm">
            We don't follow generic templates. We follow a rigorous method of discovery and rapid iterative feedback to engineer an automation engine that scales with your growth.
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
              <p className="text-lg md:text-xl opacity-100 leading-relaxed max-w-2xl font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
