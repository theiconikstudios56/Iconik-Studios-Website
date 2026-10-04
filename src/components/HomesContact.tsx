import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import fuzzySuccessImg from '../assets/images/web/fuzzy-success.webp';
import { T, useImg } from '../content';

const REVIEWS = [
  {
    quote: "Their ability to bridge the gap between stunning, luxury web design and complex backend AI automation transformed our operations. We saw a 40% increase in booked appointments within the first month.",
    author: "Marco Domani",
    role: "Founder, Domani Home Services",
    initials: "MD"
  },
  {
    quote: "Iconik Studios built more than just a website; they built an automated client acquisition engine. The 24/7 AI receptionist captures every single lead instantly.",
    author: "Sarah Jenkins",
    role: "Director of Growth, Summit Medical",
    initials: "SJ"
  },
  {
    quote: "An absolute game-changer. The design aesthetic is premium and immersive, and the Deno Edge workflows they implemented save our team 15+ hours of manual follow-up every single week.",
    author: "Alex Rivera",
    role: "COO, Vanguard Group",
    initials: "AR"
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0
  })
};

const HomesContact = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    }, 6000);
  };

  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handleNext = () => {
    stopAutoplay();
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    startAutoplay();
  };

  const handlePrev = () => {
    stopAutoplay();
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + REVIEWS.length) % REVIEWS.length);
    startAutoplay();
  };

  const handleDotClick = (index: number) => {
    stopAutoplay();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    startAutoplay();
  };

  const backdrop = useImg('shared.contact.image', fuzzySuccessImg, 'Success Pre-Footer', 'Background picture');
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative overflow-hidden min-h-[90vh] flex flex-col justify-center bg-ink"
    >
      {/* Background Parallax Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          loading="lazy"
          decoding="async"
          style={{ y }}
          {...backdrop}
          className="w-full h-[120%] object-cover grayscale brightness-[0.25] absolute top-[-10%]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center space-y-12">
        {/* Pre-Footer Section Heading */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-accent block"><T k="shared.contact.reviews">{"REVIEWS"}</T></span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight text-paper"><T k="shared.contact.hear-from-the-lounge" label="Heading">{"HEAR FROM THE LOUNGE"}</T></h2>
        </div>

        {/* Carousel Card Container */}
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-16 shadow-2xl min-h-[380px] md:min-h-[300px] flex items-center justify-center overflow-hidden">
          {/* Decorative Quote Symbol */}
          <span className="absolute top-4 left-8 text-[12rem] font-serif text-white/5 select-none pointer-events-none">&ldquo;</span>

          <div className="w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 24 },
                  opacity: { duration: 0.25 }
                }}
                className="space-y-8"
              >
                {/* Quote Text */}
                <p className="text-lg md:text-2xl font-serif italic text-paper leading-relaxed max-w-2xl mx-auto">&ldquo;<T k={`shared.contact.review${currentIndex + 1}.quote`} label={`Review ${currentIndex + 1}: quote`}>{REVIEWS[currentIndex].quote}</T>&rdquo;</p>

                {/* Author Info */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-accent font-bold tracking-wider text-sm select-none">
                    <T k={`shared.contact.review${currentIndex + 1}.initials`} label={`Review ${currentIndex + 1}: initials`}>{REVIEWS[currentIndex].initials}</T>
                  </div>
                  <div>
                    <h4 className="font-bold text-paper font-display text-base tracking-wider">
                      <T k={`shared.contact.review${currentIndex + 1}.name`} label={`Review ${currentIndex + 1}: name`}>{REVIEWS[currentIndex].author}</T>
                    </h4>
                    <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold mt-1">
                      <T k={`shared.contact.review${currentIndex + 1}.role`} label={`Review ${currentIndex + 1}: role`}>{REVIEWS[currentIndex].role}</T>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center justify-center gap-8 pt-4">
          {/* Prev Button */}
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-paper hover:bg-burnt-orange hover:text-ink hover:border-burnt-orange transition-all duration-300"
            aria-label="Previous review"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-3">
            {REVIEWS.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-burnt-orange' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-paper hover:bg-burnt-orange hover:text-ink hover:border-burnt-orange transition-all duration-300"
            aria-label="Next review"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomesContact;
