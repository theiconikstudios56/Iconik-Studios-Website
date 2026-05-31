import React from 'react';
import { motion } from 'motion/react';

const pillars = [
  {
    num: "01",
    label: "DYNAMIC CONTENT",
    title: "Evolving Content & Updates",
    desc: "Your website is a living asset. Whether it is updating text, changing images, adding new pages, or removing outdated information, a maintenance plan guarantees your digital storefront stays fresh, relevant, and aligned with your business growth without you lifting a finger."
  },
  {
    num: "02",
    label: "BUG MITIGATION",
    title: "Proactive Bug Fixes",
    desc: "Web standards, browsers, and frameworks update constantly. When dependencies shift or scripts conflict, we catch and resolve bugs immediately, maintaining absolute system integrity and a seamless user experience before your customers ever notice."
  },
  {
    num: "03",
    label: "AI STABILITY",
    title: "Workflow Resilience",
    desc: "Your automated sequences and AI agents rely on complex connections. If third-party APIs update, CRM structures change, or webhooks fail, we actively monitor and re-optimize your flows to prevent breaks, ensuring your operations remain automated and error-free."
  },
  {
    num: "04",
    label: "PERFORMANCE",
    title: "Performance Tuning",
    desc: "From hosting environments and database queries to script loading speeds and framework updates, we continuously optimize the backend engine so that your site loads faster and your Fuzzy agents run at maximum velocity."
  }
];

export default function MaintenanceProcess() {
  return (
    <section className="py-32 bg-ink text-tan">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-4 sticky top-32 h-fit">
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-100 block mb-6">Guardianship</span>
          <h2 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tighter mb-8">
            Why Your <br /> Maintenance <br /> Plan Matters.
          </h2>
          <p className="text-lg opacity-100 leading-relaxed max-w-sm">
            Websites and automated systems are never static. To keep your competitive edge, your code, databases, and AI agents require constant vigilance and expert oversight.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-32">
          {pillars.map((item, i) => (
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
              {i !== pillars.length - 1 && (
                <div className="absolute left-4 top-10 w-[1px] h-[calc(100%+8rem)] bg-gradient-to-b from-burnt-orange to-transparent opacity-30" />
              )}
              
              <span className="font-mono text-xs text-burnt-orange mb-4 block uppercase tracking-widest">{item.num} / {item.label}</span>
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
