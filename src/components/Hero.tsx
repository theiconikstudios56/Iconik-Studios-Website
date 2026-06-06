import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import finalFuzzyHero from '../assets/images/chill-office.png';
import rooftopFuzzies from '../assets/images/rooftop-fuzzy-hd.png';
import fuzzyCollab from '../assets/images/fuzzy-collab.png';

const HERO_IMAGES = [
  finalFuzzyHero,
  fuzzyCollab,
  rooftopFuzzies
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section data-bg="dark" className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden text-tan">
      {/* Background Atmosphere Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-ink">
        <AnimatePresence>
          <motion.img
            key={currentImageIndex}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            src={HERO_IMAGES[currentImageIndex]}
            alt="Iconik Lounge"
            className="absolute inset-0 w-full h-full object-cover brightness-[.60]"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-start text-left"
        >
          <h1 className="text-5xl md:text-6xl lg:text-[4.5vw] xl:text-[5vw] font-display uppercase tracking-tighter leading-[1.05] mb-2 max-w-[90%] lg:max-w-[60%]">
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 0.85 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="block text-white"
            >
              Turn your ad spend into <br className="hidden lg:block" />
              a fully booked calendar <br className="hidden lg:block" />
              automatically.
            </motion.span>
          </h1>

          <div className="flex flex-col items-start w-full mt-4 gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-sm md:text-base font-light max-w-2xl text-tan leading-relaxed font-mono"
            >
              We help home service businesses capture, engage and retain every patient lead that standard websites miss. Through a powerful combination of conversion optimized design and 24/7 AI automation, we eliminate delayed follow-ups so your marketing dollars actually yield appointments, not missed opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                id="hero-cta-primary"
                aria-label="Automate My Bookings - Get started with Iconik Studios"
                title="Automate My Bookings"
                className="relative group inline-block"
              >
                <div className="absolute inset-0 bg-burnt-orange blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative px-10 py-5 border border-ink bg-burnt-orange text-ink hover:border-burnt-orange hover:bg-black/40 backdrop-blur-md hover:text-burnt-orange transition-all duration-500 rounded-none">
                  <span className="relative z-10 text-xs uppercase tracking-[0.25em] font-bold">
                    Automate My Bookings
                  </span>
                </div>
              </Link>

              <Link
                to="/portfolio"
                id="hero-cta-secondary"
                aria-label="Explore Our Portfolio - View our case studies and web design projects"
                title="Explore Our Portfolio"
                className="relative group inline-block"
              >
                <div className="absolute inset-0 bg-burnt-orange blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative px-10 py-5 border border-white/20 bg-black/40 backdrop-blur-md text-white hover:border-burnt-orange hover:bg-transparent hover:text-burnt-orange transition-all duration-500 rounded-none">
                  <span className="relative z-10 text-xs uppercase tracking-[0.25em] font-bold">
                    Explore Our Portfolio
                  </span>
                </div>
              </Link>
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
