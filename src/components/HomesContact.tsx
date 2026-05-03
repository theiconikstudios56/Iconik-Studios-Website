import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

const HomesContact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative overflow-hidden min-h-screen flex flex-col justify-center bg-ink"
    >
      <div className="absolute inset-0 z-0">
        <motion.img 
          style={{ y }}
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
          alt="Office" 
          className="w-full h-[120%] object-cover grayscale brightness-[0.2] absolute top-[-10%]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10 w-full items-center px-6">
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-accent opacity-100">PRE-FOOTER</span>
            <h2 className="text-7xl md:text-9xl leading-[0.9] text-paper font-display uppercase tracking-tighter">Let's<br/>Talk.</h2>
          </div>
          <div className="space-y-8">
            <div className="bg-white/5 p-12 rounded-[40px] border border-white/10 max-w-md backdrop-blur-sm">
               <h3 className="text-lg normal-case font-serif italic mb-6 text-paper italic">"Their ability to listen and translate complex ideas into digital systems is unmatched."</h3>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent" />
                  <div className="text-paper">
                    <p className="font-bold">Marco Domani</p>
                    <p className="text-xs opacity-100">Webflow Founder</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="p-12 rounded-[40px] space-y-8 bg-ink/80 backdrop-blur-xl border border-white/10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-100 text-paper px-1">First Name</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-accent outline-none text-paper transition-colors" placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-100 text-paper px-1">Last Name</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-accent outline-none text-paper transition-colors" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-100 text-paper px-1">Email</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-accent outline-none text-paper transition-colors" placeholder="jane@doe.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-100 text-paper px-1">Message</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 h-32 focus:border-accent outline-none resize-none text-paper transition-colors" placeholder="How can we help?..." />
            </div>
            <button className="w-full py-6 bg-paper text-ink rounded-full font-display text-xl uppercase hover:bg-accent transition-all duration-300">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HomesContact;
