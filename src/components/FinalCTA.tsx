import { motion } from 'motion/react';
import React from 'react';
import { Rocket, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            >
              ICONIK STUDIOS
            </motion.span>
            
            {/* Main Heading */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-[8vw] font-display leading-[0.95] uppercase tracking-tighter"
            >
              Let's build<br />something<br />iconik
            </motion.h2>
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
            >
              Start your project
            </Link>
            <Link 
              to="/portfolio" 
              className="text-xs font-display uppercase tracking-widest border-b border-transparent hover:border-paper transition-all py-2"
            >
              View our work
            </Link>
          </motion.div>

          {/* Divider & Copyright */}
          <div className="pt-8 border-t border-white/5 text-[10px] uppercase tracking-[0.4em] font-semibold opacity-60">
            © 2026 ICONIK STUDIOS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* The Spacer that allows the reveal to happen */}
      <div className="h-screen pointer-events-none" />
    </>
  );
};

export default FinalCTA;
