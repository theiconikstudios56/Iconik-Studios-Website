import React from 'react';
import { motion } from 'motion/react';
import { Globe, Cpu, Zap, Target, Circle, Radio, Hexagon, Component } from 'lucide-react';

const CLIENTS = [
  { name: 'RADIUS', icon: Radio },
  { name: 'ACME', icon: Hexagon },
  { name: 'FR', icon: Component },
  { name: 'ZENITH', icon: Target },
  { name: 'NOVA', icon: Zap },
  { name: 'ORBIT', icon: Globe },
  { name: 'NUCLEUS', icon: Cpu },
  { name: 'SPHERE', icon: Circle },
];

export default function ClientLogos() {
  return (
    <section className="bg-ink border-y border-white/5 overflow-hidden pb-0 pt-0">
      <div className="relative flex overflow-hidden group">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1920] }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...Array(4)].map((_, outerIndex) => (
            <div key={outerIndex} className="flex items-center">
              {CLIENTS.map((client, i) => (
                <div 
                  key={`${outerIndex}-${i}`} 
                  className="flex items-center justify-center gap-6 px-16 md:px-28 py-12 border-r border-white/10 opacity-30 hover:opacity-100 transition-all duration-1000 cursor-pointer group/logo"
                >
                  <client.icon size={36} strokeWidth={1.5} className="text-paper shrink-0" />
                  <span className="text-3xl md:text-4xl font-display text-paper tracking-tighter uppercase">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
        
        {/* Aesthetic Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-ink via-ink/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-ink via-ink/80 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
