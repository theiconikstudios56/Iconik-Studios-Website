import { motion } from "motion/react";
import { Instagram, Twitter, Mail, MessageCircle, Globe, Circle, Target, Zap, Crosshair } from "lucide-react";
import IconikLogo from "./IconikLogo";

interface FeaturedProjectProps {
  dark?: boolean;
}

export default function FeaturedProject({ dark = false }: FeaturedProjectProps) {
  const bgColor = dark ? "bg-ink" : "bg-[#cd7f32]";
  const textColor = dark ? "text-tan" : "text-ink";
  const accentColor = dark ? "#cd7f32" : "#000000";
  const borderColor = dark ? "border-tan/20" : "border-ink";
  const iconColor = dark ? "text-tan" : "text-ink";
  const barColor = dark ? "bg-tan/20" : "bg-ink/30";

  return (
    <section data-bg={dark ? "dark" : "tan"} className={`relative h-screen ${bgColor} ${textColor} flex flex-col items-center justify-center overflow-hidden px-6 py-12 transition-colors duration-150 delay-100`}>
      {/* Corner Decorations */}
      <div className={`absolute top-6 left-8 ${iconColor}`}><Circle size={20} /></div>
      <div className={`absolute top-6 right-8 ${iconColor}`}><Target size={20} /></div>
      <div className={`absolute bottom-6 left-8 ${iconColor}`}><Zap size={20} /></div>
      <div className={`absolute bottom-6 right-8 ${iconColor}`}><Crosshair size={20} /></div>

      {/* Side Bars */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`w-1 h-2 ${barColor}`} />
        ))}
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`w-1 h-2 ${barColor}`} />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-5xl w-full flex flex-col items-center text-center z-10">
        {/* Top Icon/Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 w-16 h-16 md:w-20 md:h-20"
        >
          <IconikLogo color={dark ? "#cd7f32" : "#000000"} />
        </motion.div>

        {/* Massive Title */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[12vw] md:text-[10vw] font-display leading-[0.85] uppercase mb-8 tracking-tighter flex flex-col gap-1"
        >
          <span>ICONIK</span>
          <span className={dark ? "text-burnt-orange" : ""}>REJECTION</span>
        </motion.h2>

        {/* Description */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl mb-10"
        >
          <p className={`text-base md:text-lg font-medium leading-tight ${dark ? 'opacity-100' : ''}`}>
            A unique collection of 10,000 digital artifacts brought to life.
            Created by Iconik Studios, The Rejects live in a universe
            crafted by their own community.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <a 
            href="https://opensea.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative group inline-block"
          >
            <div className="absolute inset-0 bg-burnt-orange blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className={`relative px-10 py-5 border ${dark ? 'border-tan/20' : 'border-ink/20'} rounded-none hover:border-burnt-orange transition-all duration-500 overflow-hidden`}>
              <div className="absolute inset-0 bg-burnt-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className={`relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold ${dark ? 'group-hover:text-ink' : 'group-hover:text-tan'} transition-colors`}>
                VIEW ON OPENSEA
              </span>
            </div>
          </a>
        </motion.div>

        {/* Social Icons */}
        <div className="flex gap-4">
          {[Mail, Instagram, Globe, Twitter, MessageCircle].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: dark ? "#cd7f32" : "#000000", 
                color: dark ? "#000000" : "#cd7f32",
                borderColor: dark ? "#cd7f32" : "#000000"
              }}
              className={`w-10 h-10 rounded-full border ${borderColor} flex items-center justify-center transition-all duration-300 ${i === 2 ? (dark ? 'bg-burnt-orange text-ink border-burnt-orange' : 'bg-ink text-[#cd7f32]') : ''}`}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
