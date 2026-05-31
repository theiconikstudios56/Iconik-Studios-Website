import { motion } from 'motion/react';
import { Shield, Zap, Target, Palette } from 'lucide-react';

const pillars = [
  {
    title: "Intentional Engineering",
    description: "We reject generic code and template shortcuts. Every web framework and automation pipeline is custom-engineered to convert traffic into real growth.",
    icon: Shield,
    color: "bg-white/50",
    textColor: "text-[#2D2D2D]"
  },
  {
    title: "High-End Web Design",
    description: "Bespoke digital experiences crafted to command attention. We blend striking aesthetics with conversion science so your brand stands alone.",
    icon: Palette,
    color: "bg-white/50",
    textColor: "text-[#2D2D2D]"
  },
  {
    title: "AI & Automation",
    description: "Intelligent backend workflows and autonomous AI agents designed to capture, nurture, and convert opportunities while you sleep.",
    icon: Zap,
    color: "bg-white/50",
    textColor: "text-[#2D2D2D]"
  },
  {
    title: "Elite Partnership",
    description: "No bloated corporate layers or account managers. You collaborate directly with the engineers and designers building your legacy.",
    icon: Target,
    color: "bg-white/50",
    textColor: "text-[#2D2D2D]"
  }
];

export default function AboutPillars() {
  return (
    <section className="py-32 bg-[#CFCFCF] text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-70 block mb-6">Core Strength</span>
          <h2 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tighter max-w-2xl">
            The Pillars of <br /> Our Collective.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`${pillar.color} ${pillar.textColor} p-10 flex flex-col gap-12 border border-ink/10 hover:shadow-[0_10px_30px_rgba(255,85,0,0.25)] rounded-xl transition-all duration-500 min-h-[400px]`}
            >
              <pillar.icon size={48} className="text-burnt-orange" />
              <div className="mt-auto">
                <h3 className="text-2xl font-display uppercase mb-4">{pillar.title}</h3>
                <p className="opacity-80 leading-relaxed font-light italic">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
