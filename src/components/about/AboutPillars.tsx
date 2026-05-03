import { motion } from 'motion/react';
import { Shield, Zap, Target, Palette } from 'lucide-react';

const pillars = [
  {
    title: "Precision Engineering",
    description: "Code that doesn't just work—it inspires. We build technical foundations that scale as fast as your ambition.",
    icon: Shield,
    color: "bg-[#000000]",
    textColor: "text-tan"
  },
  {
    title: "Aesthetic Strategy",
    description: "Design is not just how it looks; it's the bridge between your brand and your customer's emotion.",
    icon: Palette,
    color: "bg-burnt-orange",
    textColor: "text-white"
  },
  {
     title: "Agile Momentum",
     description: "Move fast, break nothing. Our sprints are designed to deliver high-quality results in record time.",
     icon: Zap,
     color: "bg-tan",
     textColor: "text-ink"
  },
  {
     title: "Direct Access",
     description: "No account managers. No bloat. You work directly with the craftsmen building your vision.",
     icon: Target,
     color: "bg-[#000000]",
     textColor: "text-tan"
  }
];

export default function AboutPillars() {
  return (
    <section className="py-32 bg-ink text-tan">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-100 block mb-6">Core Strength</span>
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
              className={`${pillar.color} ${pillar.textColor} p-10 flex flex-col gap-12 border border-white/5 transition-all duration-500 min-h-[400px]`}
            >
              <pillar.icon size={48} className={pillar.textColor === 'text-white' ? 'text-white' : 'text-burnt-orange'} />
              <div className="mt-auto">
                <h3 className="text-2xl font-display uppercase mb-4">{pillar.title}</h3>
                <p className="opacity-100 leading-relaxed font-light italic">"{pillar.description}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
