import { motion } from 'motion/react';
import React from 'react';
import { Rocket, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { T } from '../content';

const FinalCTA = () => {
  return (
    <>
      {/* The "Under" Section that gets revealed */}
      <footer className="fixed bottom-0 left-0 w-full h-screen bg-ink text-paper text-center flex flex-col justify-center -z-10 pt-40 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full space-y-8 md:space-y-12">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.6em] font-bold text-accent block"
            ><T k="shared.final.iconik-studios">{"ICONIK STUDIOS"}</T></motion.span>
            
            {/* Main Heading */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-[8vw] font-display leading-[0.95] uppercase tracking-tighter"
            ><T k="shared.final.lets-build-something-iconik">{"Let's build\nsomething\niconik"}</T></motion.h2>
          </div>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
          >
            <Link 
              to="/contact" 
              className="px-10 py-5 bg-paper text-ink rounded-full font-display text-lg uppercase hover:bg-accent transition-all duration-300 transform hover:-translate-y-1"
            ><T k="shared.final.start-your-project" label="Link or button">{"Start your project"}</T></Link>
            <Link 
              to="/portfolio" 
              className="text-xs font-display uppercase tracking-widest border-b border-transparent hover:border-paper transition-all py-2"
            ><T k="shared.final.view-our-work" label="Link or button">{"View our work"}</T></Link>
          </motion.div>

          {/* Divider & Copyright */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-[10px] uppercase tracking-[0.4em] font-semibold">
            <span className="opacity-60"><T k="shared.final.2026-iconik-studios-all">{"© 2026 ICONIK STUDIOS. ALL RIGHTS RESERVED."}</T></span>
            <a
              href="https://rmd.theiconikstudios.com/privacy"
              target="_blank"
              rel="noopener"
              className="opacity-80 border-b border-transparent hover:border-paper hover:opacity-100 transition-all py-1"
            ><T k="shared.final.privacy-policy" label="Link or button">{"Privacy Policy"}</T></a>
          </div>
        </div>
      </footer>

      {/* The Spacer that allows the reveal to happen */}
      <div className="h-screen pointer-events-none" />
    </>
  );
};

export default FinalCTA;
