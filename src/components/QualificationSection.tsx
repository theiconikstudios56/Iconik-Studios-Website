import { motion } from 'motion/react';

export default function QualificationSection() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 border-b border-ink/10 bg-tan text-ink">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-6">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-100 mb-8 block">Qualification to be Considered</span>
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight mb-12">
              Co-Lab isn’t for idea-stage startups, it’s for brands already on the road.
            </h2>
            
            <div className="space-y-12">
              {[
                { 
                  title: '$5M+ in annual revenue', 
                  desc: 'You have some real traction and stakes to deal with.' 
                },
                { 
                  title: 'Growth-stage or established business', 
                  desc: 'Past product–market fit, now facing evolution, scale, or positioning consideration.' 
                },
                { 
                  title: 'Clear intent to invest in brand, digital, or growth within 6–12 months', 
                  desc: 'Co-Lab is a decision accelerator, not just free consulting.' 
                },
                { 
                  title: 'Leadership access and decision-making authority', 
                  desc: 'This program only works when the people who can say “yes” are in the room.' 
                },
                { 
                  title: 'Healthy operating margins (typically 15–20%+ or a path to them)', 
                  desc: 'Indicates a sustainable business with room to invest maneuver.' 
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2 group">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-burnt-orange rounded-full" />
                    <h3 className="text-xl md:text-2xl font-display uppercase tracking-tight group-hover:text-burnt-orange transition-colors">{item.title}</h3>
                  </div>
                  <p className="text-sm md:text-base opacity-100 ml-6 max-w-md leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/5] bg-ink/5 overflow-hidden grayscale border border-ink/10"
          >
            <img src="https://picsum.photos/seed/garage_sketch/800/1000" alt="Garage Sketch" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
