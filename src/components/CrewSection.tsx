import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function CrewSection() {
  const crewRef = useRef<HTMLElement>(null);
  const { scrollYProgress: crewScroll } = useScroll({
    target: crewRef,
    offset: ["start end", "end start"]
  });

  const crewTitleY = useTransform(crewScroll, [0, 1], [100, -100]);
  const crewTitleScale = useTransform(crewScroll, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section 
      id="crew" 
      ref={crewRef}
      className="py-32 md:py-64 px-6 md:px-12 border-b border-ink/10 relative overflow-hidden bg-ink text-tan"
    >
      {/* Parallax Background Images for Crew */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
        {[
          { src: 'https://picsum.photos/seed/crew1/400/600', speed: 0.15, top: '5%', left: '10%', width: '12%' },
          { src: 'https://picsum.photos/seed/crew2/400/600', speed: 0.25, top: '25%', left: '30%', width: '15%' },
          { src: 'https://picsum.photos/seed/crew3/400/600', speed: 0.1, top: '15%', left: '50%', width: '10%' },
          { src: 'https://picsum.photos/seed/crew4/400/600', speed: 0.3, top: '35%', left: '70%', width: '18%' },
          { src: 'https://picsum.photos/seed/crew5/400/600', speed: 0.2, top: '10%', left: '85%', width: '12%' },
        ].map((img, i) => (
          <ParallaxImage key={i} img={img} scrollYProgress={crewScroll} />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          style={{ y: crewTitleY, scale: crewTitleScale }}
          className="w-full text-center mb-24"
        >
          <h2 className="text-[18vw] font-display leading-[0.75] text-burnt-orange tracking-tighter uppercase select-none drop-shadow-2xl">
            THE CREW
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
          <div className="md:col-span-3">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-100">The Talent</span>
          </div>
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { name: 'Alex Iconik', role: 'Founder / Creative Director' },
                { name: 'Sarah Chen', role: 'Lead AI Architect' },
                { name: 'Marcus Thorne', role: 'Senior Web Artisan' },
              ].map((member, i) => (
                <motion.div 
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-4 group"
                >
                  <div className="aspect-[3/4] bg-tan/5 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                    <img 
                      src={`https://picsum.photos/seed/${member.name}/600/800`} 
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-burnt-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-display uppercase tracking-tight group-hover:text-burnt-orange transition-colors">{member.name}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-80">{member.role}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxImage(props: any) {
  const { img, scrollYProgress } = props;
  const y = useTransform(scrollYProgress, [0, 1], [0, -img.speed * 2000]);
  
  return (
    <motion.div
      style={{ 
        y,
        top: img.top,
        left: img.left,
        width: img.width,
      }}
      className="absolute aspect-[3/4] overflow-hidden grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 pointer-events-none border-x border-tan/5"
    >
      <img 
        src={img.src} 
        alt="Studio" 
        className="w-full h-full object-cover scale-110"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}
