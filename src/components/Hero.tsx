import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section data-bg="dark" className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden text-tan">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" 
          alt="Dark Lounge" 
          className="w-full h-full object-cover brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="text-[15vw] lg:text-[12vw] leading-[0.8] mb-4 flex flex-col items-center">
            <motion.span 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-outline"
            >
              DIGITAL
            </motion.span>
            <motion.span 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative z-20"
            >
              LEGACIES
            </motion.span>
          </h1>

          <div className="flex flex-col items-center justify-center w-full mt-8 gap-12">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-sm md:text-base font-light max-w-2xl text-tan leading-relaxed font-mono"
            >
              [SYSTEM_STATUS: ACTIVE] <br />
              We build high-converting websites and AI automation systems for businesses that value precision, aesthetics, and results that actually move the needle. As a premier ai powered user experience design agency, we ensure your digital presence is built to scale your revenue while reducing manual labor.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <a 
                href="#work"
                className="relative group inline-block"
              >
                <div className="absolute inset-0 bg-burnt-orange blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative px-12 py-6 border border-tan/20 rounded-none hover:border-burnt-orange transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-burnt-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 text-xs uppercase tracking-[0.3em] font-bold group-hover:text-ink transition-colors">
                    ENTER THE LOUNGE
                  </span>
                </div>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Vertical Rail Text */}
      <div className="absolute right-12 bottom-12 hidden lg:block">
        <div className="writing-vertical-rl text-[10px] uppercase tracking-[0.5em] opacity-80 font-mono">
          DESIGN // AUTOMATION // STRATEGY
        </div>
      </div>
    </section>
  );
}
