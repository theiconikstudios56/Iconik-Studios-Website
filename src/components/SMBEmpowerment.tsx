import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Cpu, Workflow } from 'lucide-react';

export default function SMBEmpowerment() {
  const points = [
    {
      icon: Cpu,
      title: "Intelligent Systems",
      desc: "We replace manual, fragmented steps with custom, automated business logic that works while you sleep."
    },
    {
      icon: Workflow,
      title: "Seamless Processes",
      desc: "From instant lead capture to database sync, we engineer zero-friction workflows for your team and clients."
    },
    {
      icon: TrendingUp,
      title: "Empowered Growth",
      desc: "Stop fighting software and start scaling. We build the backend leverage that helps local leaders win."
    }
  ];

  return (
    <section 
      data-bg="dark" 
      className="relative bg-ink text-tan py-32 px-6 lg:px-12 overflow-hidden border-t border-white/5"
    >
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-burnt-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Grid: Header & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-burnt-orange font-mono text-xs tracking-[0.4em] uppercase">
                  OUR MISSION // SYSTEMS OVER CHAOS
                </span>
                <div className="w-12 h-[1px] bg-burnt-orange/30" />
              </div>
              <h2 className="text-5xl md:text-7xl font-display leading-[0.95] uppercase tracking-tighter text-paper">
                ENGINEERING<br />
                LEVERAGE FOR THE<br />
                <span className="text-burnt-orange italic">UNDERDOG.</span>
              </h2>
            </motion.div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-5 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl font-light text-paper opacity-80 leading-relaxed font-sans normal-case">
                We believe that small and medium-sized businesses deserve the same elite infrastructure as multi-billion dollar enterprises. Subpar websites and chaotic manual workflows shouldn't limit your potential.
              </p>
              <p className="text-base text-paper opacity-60 leading-relaxed font-mono">
                Iconik Studios designs jaw-dropping frontends backed by rock-solid automation systems. We don't just hand you a website—we build the custom operational processes that capture bookings, sync client databases, and fuel your legacy 24/7.
              </p>
            </motion.div>
          </div>

        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative bg-[#0a0a0a] border border-white/5 p-10 hover:border-burnt-orange/30 hover:bg-white/[0.01] transition-all duration-500 rounded-none flex flex-col justify-between"
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-burnt-orange group-hover:w-full transition-all duration-500" />
                
                <div>
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-burnt-orange/30 group-hover:bg-burnt-orange/10 transition-colors">
                    <Icon className="text-burnt-orange group-hover:scale-110 transition-transform duration-300" size={22} />
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-tight text-paper mb-4">
                    {point.title}
                  </h3>
                  <p className="text-sm font-light text-paper opacity-60 leading-relaxed font-sans normal-case">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
