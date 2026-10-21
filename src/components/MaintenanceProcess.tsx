import React from 'react';
import { motion } from 'motion/react';
import { T } from '../content';

const pillars = [
  {
    num: "01",
    label: "DYNAMIC CONTENT",
    title: "Evolving Content & Updates",
    desc: "Your website is a living asset. New prices, new photos, a new treatment, a change of hours: send the request and we make the change, so your site stays current without you lifting a finger."
  },
  {
    num: "02",
    label: "BUG MITIGATION",
    title: "Proactive Bug Fixes",
    desc: "Browsers and devices keep changing. We keep an eye on your site and fix anything that breaks, ideally before your clients ever notice."
  },
  {
    num: "03",
    label: "LEAD FLOW",
    title: "Leads That Arrive",
    desc: "A contact form that quietly stops sending is a lost client every week. We check your forms and lead delivery every month, so every enquiry reaches you."
  },
  {
    num: "04",
    label: "VISIBILITY",
    title: "Found On Google",
    desc: "On Performance and Iconik, we keep your Google Business Profile current with hours, photos and fresh posts, keep your review link working, and send a plain monthly report on visits, leads and top pages."
  }
];

export default function MaintenanceProcess() {
  return (
    <section className="py-20 md:py-32 bg-ink text-tan">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-4 sticky top-32 h-fit">
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-100 block mb-6"><T k="maintenance.process.guardianship">{"Care Plans"}</T></span>
          <h2 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tighter mb-8"><T k="maintenance.process.why-your-maintenance-plan" label="Heading">{"Why Your\nMaintenance\nPlan Matters."}</T></h2>
          <p className="text-lg opacity-100 leading-relaxed max-w-sm"><T k="maintenance.process.websites-and-automated-systems">{"A website is never finished. Your services, prices and photos change, and so does the web around it. A care plan keeps your site working, current and easy to find."}</T></p>
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
              
              <span className="font-mono text-xs text-burnt-orange mb-4 block uppercase tracking-widest"><T k={`maintenance.process.${i + 1}.num`} label={`Pillar ${i + 1}: number`}>{item.num}</T> / <T k={`maintenance.process.${i + 1}.label`} label={`Pillar ${i + 1}: label`}>{item.label}</T></span>
              <h3 className="text-4xl md:text-6xl font-display uppercase mb-6"><T k={`maintenance.process.${i + 1}.title`} label={`Pillar ${i + 1}: heading`}>{item.title}</T></h3>
              <p className="text-lg md:text-xl opacity-100 leading-relaxed max-w-2xl">
                <T k={`maintenance.process.${i + 1}.desc`} label={`Pillar ${i + 1}: text`}>{item.desc}</T>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
