import { motion } from 'motion/react';
import { useState } from 'react';

const members = [
  { name: "Julian Voss", role: "Creative Direction", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" },
  { name: "Sarah Chen", role: "Stratey & Growth", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800" },
  { name: "Marcus Thorne", role: "Engineering", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" },
  { name: "Elena Rossi", role: "UI/UX Craft", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800" }
];

export default function AboutCollective() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="py-32 bg-tan text-ink border-b border-ink/5 relative overflow-visible">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 flex justify-between items-end">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-100 block mb-6">The Collective</span>
            <h2 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tighter">
              Crafted by <br /> Specialists.
            </h2>
          </div>
          <div className="hidden lg:block text-right opacity-100 uppercase text-xs tracking-widest font-mono">
            Based Worldwide / <br /> Powered by Quality
          </div>
        </div>

        <div className="space-y-0 border-t border-ink/10">
          {members.map((member, i) => (
            <div 
              key={i}
              onMouseEnter={() => setActiveImage(member.image)}
              onMouseLeave={() => setActiveImage(null)}
              className="group py-12 border-b border-ink/10 flex justify-between items-center cursor-none"
            >
              <div className="flex items-baseline gap-8">
                <span className="font-mono text-xs opacity-60">0{i + 1}</span>
                <h3 className="text-4xl md:text-6xl font-display uppercase transition-colors group-hover:text-burnt-orange">
                  {member.name}
                </h3>
              </div>
              <p className="text-lg md:text-xl font-light opacity-100">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Image Preview */}
      <motion.div 
        animate={{ 
          opacity: activeImage ? 1 : 0,
          scale: activeImage ? 1 : 0.8
        }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] pointer-events-none z-50 overflow-hidden mix-blend-multiply grayscale brightness-50"
      >
        {activeImage && (
          <img 
            src={activeImage} 
            alt="Collective Member" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
      </motion.div>
    </section>
  );
}
