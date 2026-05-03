import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function About({ reversed = false, dark = false, staticBg = false }: { reversed?: boolean, dark?: boolean, staticBg?: boolean }) {
  const textColor = dark ? "text-tan" : "text-[var(--text-color)]";
  const mutedTextColor = dark ? "text-tan" : "text-[var(--text-color)]";
  const borderColor = dark ? "border-tan/10" : "border-ink/10";
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    // Trigger when the top of the section hits the top of the viewport
    margin: "0px 0px -100% 0px",
    once: true
  });

  return (
    <section 
      ref={sectionRef}
      id={reversed ? "about-reversed" : "about"} 
      className={`relative min-h-screen flex items-center py-20 lg:py-32 overflow-hidden bg-tan`}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <div className={`relative ${reversed ? 'order-2 lg:order-2' : 'order-2 lg:order-1'} px-6 md:px-12 lg:px-24`}>
          <div className="aspect-[4/3] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 rounded-2xl shadow-xl">
            <img 
              src={reversed 
                ? "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
                : "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000"}
              alt="Lounge Vibe" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className={`absolute -bottom-6 ${reversed ? '-left-6' : '-right-6'} bg-ink text-tan p-6 max-w-[280px] hidden md:block transition-colors duration-150 delay-100`}>
            <p className="text-[10px] font-mono leading-relaxed uppercase tracking-widest">
              {reversed 
                ? "THE BEST VIEW IS FROM THE TOP. WE BUILD THE LADDER. YOU JUST HAVE TO CLIMB."
                : "BUSINESS IS WAR. WE PROVIDE THE ARTILLERY. THE LOUNGE IS JUST WHERE WE PLAN THE ATTACK."}
            </p>
          </div>
        </div>

        <div className={`${reversed ? 'order-1 lg:order-1' : 'order-1 lg:order-2'} px-6 md:px-12 lg:px-24`}>
          <div className="relative">
            <div className="absolute -top-10 left-0 flex items-center gap-4">
              <span className="text-[10px] font-mono text-burnt-orange tracking-[0.5em]">
                {reversed ? "04 // THE COLLECTIVE" : "03 // PHILOSOPHY"}
              </span>
            </div>
            <h2 className={`text-5xl md:text-[6vw] font-display leading-[0.9] mb-6 text-ink max-w-sm tracking-tighter`}>
              {reversed ? (
                <>
                  ELITE <br />
                  <span className={`text-outline`}>CRAFTSMEN.</span>
                </>
              ) : (
                <>
                  CHILL <br />
                  <span className={`text-outline`}>VIBES.</span>
                </>
              )}
            </h2>
          </div>
          <div className={`space-y-6 text-base text-ink font-light leading-relaxed font-serif italic`}>
            {reversed ? (
              <>
                <p>
                  WE ARE A SMALL, HIGHLY SPECIALIZED TEAM OF DESIGNERS, DEVELOPERS, AND AI ARCHITECTS. WE DON'T DO RETAINERS; WE DO RESULTS.
                </p>
                <p>
                  EVERY PROJECT IS A MISSION. EVERY LINE OF CODE IS A STRATEGIC MOVE. WE OPERATE IN THE SHADOWS TO ENSURE YOUR BRAND SHINES IN THE LIGHT.
                </p>
              </>
            ) : (
              <>
                <p>
                  LOUNGE DIGITAL WAS BORN FROM A SIMPLE OBSERVATION: THE BEST WORK HAPPENS WHEN YOU'RE RELAXED, FOCUSED, AND SURROUNDED BY EXCELLENCE. 
                </p>
                <p>
                  OUR OFFICE IS FILLED WITH FLOOR-TO-CEILING WINDOWS, SUNLIGHT BEAMING THROUGH MONSTERAS, AND THE FAINT AROMA OF AGED TOBACCO. IT'S WHERE WE THINK, WHERE WE BUILD, AND WHERE WE HELP OUR CLIENTS TRANSCEND THE NOISE.
                </p>
              </>
            )}
          </div>
          
          <div className={`mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8`}>
            <div>
              <div className={`text-4xl font-display mb-1 text-ink`}>{reversed ? "24/7" : "12+"}</div>
              <div className={`text-[10px] font-mono uppercase tracking-widest opacity-100 font-bold text-ink`}>
                {reversed ? "Support" : "Years Exp"}
              </div>
            </div>
            <div>
              <div className={`text-4xl font-display mb-1 text-ink`}>{reversed ? "50+" : "150+"}</div>
              <div className={`text-[10px] font-mono uppercase tracking-widest opacity-100 font-bold text-ink`}>
                {reversed ? "Awards" : "Projects"}
              </div>
            </div>
            <div>
              <div className={`text-4xl font-display mb-1 text-ink`}>{reversed ? "100%" : "98%"}</div>
              <div className={`text-[10px] font-mono uppercase tracking-widest opacity-100 font-bold text-ink`}>
                {reversed ? "Focus" : "Retention"}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
