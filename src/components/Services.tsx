import { motion } from 'motion/react';
import { Cpu, Layout as LayoutIcon, Zap, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    id: 'web-design',
    title: "BESPOKE WEB DESIGN",
    description: "WEBSITES THAT FEEL LIKE A PRIVATE LOUNGE. ELEGANT, FUNCTIONAL, AND BUILT TO CONVERT HIGH-TICKET CLIENTS.",
    icon: LayoutIcon
  },
  {
    id: 'ai-automation',
    title: "AI AUTOMATION",
    description: "STREAMLINE YOUR BUSINESS WHILE YOU SIP YOUR DRINK. WE BUILD CUSTOM AI WORKFLOWS THAT HANDLE THE HEAVY LIFTING.",
    icon: Cpu
  },
  {
    id: 'brand-strategy',
    title: "BRAND STRATEGY",
    description: "DEFINING YOUR DIGITAL IDENTITY WITH A MASCULINE EDGE. WE POSITION YOUR BRAND FOR AUTHORITY AND GROWTH.",
    icon: Zap
  },
  {
    id: 'performance-ops',
    title: "PERFORMANCE OPS",
    description: "DATA-DRIVEN OPTIMIZATION THAT ENSURES YOUR DIGITAL ASSETS ARE PERFORMING AT PEAK EFFICIENCY.",
    icon: BarChart
  }
];

export default function Services() {
  const textColor = "text-ink";
  const mutedTextColor = "text-ink";
  const borderColor = "border-ink/10";
  const transitionClass = "transition-colors duration-[600ms] delay-[200ms]";

  return (
    <section data-bg="tan" id="services" className={`pt-12 pb-32 ${transitionClass}`}>
      <div className="w-full">
        <div className="flex flex-col items-center text-center mb-24 px-6 md:px-12">
          <div className="max-w-4xl">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-[10px] font-mono text-burnt-orange tracking-[0.5em]">02 // SERVICES</span>
            </div>
            <h2 className={`text-7xl md:text-[10vw] font-display leading-[0.65] mb-2 ${textColor} ${transitionClass}`}>
              DIGITAL <br />
              <span className="text-outline">WARFARE.</span>
            </h2>
            <p className={`text-xl md:text-2xl ${mutedTextColor} leading-relaxed font-light font-serif italic mx-auto max-w-2xl ${transitionClass}`}>
              "WE DON'T JUST BUILD WEBSITES; WE BUILD BUSINESS ENGINES. BY COMBINING HIGH-END DESIGN WITH CUTTING-EDGE AI AUTOMATION, WE CREATE A SEAMLESS EXPERIENCE FOR BOTH YOU AND YOUR CUSTOMERS."
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t ${borderColor} ${transitionClass}`}>
          {SERVICES.map((service, idx) => (
            <Link key={service.id} to={`/services/${service.id}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-12 md:p-16 border-r border-b h-full ${borderColor} hover:bg-ink hover:text-tan transition-all duration-500 group ${transitionClass}`}
              >
                <service.icon className="w-8 h-8 mb-12 text-burnt-orange group-hover:text-tan transition-colors" />
                <h3 className={`text-2xl font-display mb-6 tracking-tight ${textColor} ${transitionClass}`}>{service.title}</h3>
                <p className={`text-[10px] font-mono leading-relaxed opacity-100 group-hover:opacity-100 ${textColor} ${transitionClass}`}>
                  {service.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
