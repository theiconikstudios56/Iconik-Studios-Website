import { motion } from 'motion/react';

const steps = [
  { 
    step: "Phase 01", 
    title: "Discovery", 
    desc: "Before we touch a single pixel, we get deep into your world. We audit your business, study your competition, and map out your technical requirements from the ground up. This phase is where we ask the hard questions — who are you, who are you speaking to, and what does success actually look like for your business? The clearer the picture, the sharper the build." 
  },
  { 
    step: "Phase 02", 
    title: "Strategy", 
    desc: "With a full understanding of your business in hand, we get to work on the blueprint. We map out the exact sequence of events, user flows, and conversion pathways needed to reach your objectives. Every section, every call to action, every automation touchpoint is planned with intention before a single line of code is written. No guesswork. No wasted effort." 
  },
  { 
    step: "Phase 03", 
    title: "Execution", 
    desc: "This is where it all comes to life. We move in intense, focused sprints — designing and developing with high-precision output across every layer of your project. From the visual interface to the backend automation, everything is built to spec, tested in real time, and refined through rapid iterative feedback until it's exactly right." 
  },
  { 
    step: "Phase 04", 
    title: "Optimization", 
    desc: "Launch is just the beginning. Once your site is live, we don't walk away. We monitor, test, and refine every interaction until the experience is flawless. From conversion rate improvements to automation fine-tuning, we continuously optimize to make sure your digital system keeps performing at its highest level long after go-live." 
  }
];

export default function WebDesignProcess() {
  return (
    <section className="py-32 bg-ink text-tan">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-4 sticky top-32 h-fit">
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-100 block mb-6">Our Process</span>
          <h2 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tighter mb-8">
            How we <br /> Build.
          </h2>
          <p className="text-lg opacity-100 leading-relaxed max-w-sm">
            We don't follow generic templates. We follow a rigorous method of discovery and rapid iterative feedback to engineer a website that's as beautiful as it is built to perform.
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
