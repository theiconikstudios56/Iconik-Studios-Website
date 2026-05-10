import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyShowcase from './components/PropertyShowcase';
import ScrollReveal from './components/ScrollReveal';
import FeaturedProject from './components/FeaturedProject';
import ElegantCarousel from './components/ui/ElegantCarousel';
import ZoomParallaxSection from './components/ZoomParallaxSection';
import ProjectPage from './components/ProjectPage';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';

import BackgroundTransition from './components/BackgroundTransition';
import FinalCTA from './components/FinalCTA';

// New Pages
import AboutPage from './pages/AboutPage';
import WebDesign from './pages/WebDesign';
import AIWorkflows from './pages/AIWorkflows';
import Maintenance from './pages/Maintenance';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import HomesPage from './pages/HomesPage';

// Modular Sections
import AboutHero from './components/AboutHero';
import AboutStory from './components/about/AboutStory';

import Layout from './components/Layout';
import GlobalCursor from './components/GlobalCursor';

import ServicesShowcase from './components/ServicesShowcase';
import StackedServices from './components/StackedServices';
import { FAQ } from './components/PricingFAQ';
import { ServicesGrid } from './components/HomesServices';
import HomesPortfolio from './components/HomesPortfolio';
import ClientLogos from './components/ClientLogos';
import SuccessSection from './components/SuccessSection';
import HomesContact from './components/HomesContact';
import LatestInsights from './components/LatestInsights';

function StaticSection({ children, index }: { children: React.ReactNode, index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div 
      ref={containerRef}
      className="sticky top-0 w-full h-screen overflow-hidden"
    >
      {children}
    </div>
  );
}

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const carouselImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1581291518064-9eb9c4a16175?auto=format&fit=crop&q=80&w=1200"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout 
      title="AI Powered User Experience Design Agency | Iconik Studios" 
      description="Iconik Studios is a boutique design and automation agency. We engineer digital legacies with high-end aesthetic strategy and robust backend automation."
    >
      <div className="relative z-10 bg-ink">
        <Hero />
        <PropertyShowcase />
        <section className="px-6 lg:px-12 py-32 border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-accent font-mono text-sm tracking-[0.3em]">SERVICES / 01</span>
                  <div className="w-12 h-[1px] bg-accent/30" />
                </div>
                <h1 className="text-6xl md:text-[6.5vw] font-display text-tan uppercase tracking-tighter leading-[0.8] mb-12">
                  Turn Visions <br /> Into <span className="text-accent italic">Visuals.</span>
                </h1>
                <p className="max-w-2xl text-paper text-xl leading-relaxed mb-12">
                  We craft high-performance digital experiences that bridge the gap between aesthetic excellence and technical precision. Your website isn't just a placeholder; it's your most powerful sales asset.
                </p>
                <button className="bg-accent text-ink px-10 py-5 rounded-full font-display text-base tracking-[0.2em] font-bold hover:bg-tan transition-all duration-500 uppercase">
                  Unlock Your Potential
                </button>
              </motion.div>

              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-auto lg:h-[600px] rounded-[40px] overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={carouselImages[currentImage]} 
                      alt="Web Design Service"
                      className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
                  </motion.div>
                </AnimatePresence>
                
                {/* Decorative Elements */}
                <div className="absolute inset-0 border-[20px] border-ink/40 pointer-events-none" />
                <div className="absolute top-12 left-12 w-12 h-12 border-t-2 border-l-2 border-accent" />
                <div className="absolute bottom-12 right-12 w-12 h-12 border-b-2 border-r-2 border-accent" />
                
                {/* Pagination Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                  {carouselImages.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 transition-all duration-500 ${i === currentImage ? 'w-8 bg-accent' : 'w-4 bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ServicesShowcase />
        <StackedServices />
        <ZoomParallaxSection />
        <div className="relative">
          <StaticSection index={0}>
            <ElegantCarousel />
          </StaticSection>
          <StaticSection index={1}>
            <ElegantCarousel reversed />
          </StaticSection>
        </div>
        <HomesPortfolio />
        <ClientLogos />
        <FAQ />
        <SuccessSection />
        <LatestInsights />
        <HomesContact />
      </div>
      <FinalCTA />
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <GlobalCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services/web-design" element={<WebDesign />} />
        <Route path="/services/ai-automation" element={<AIWorkflows />} />
        <Route path="/services/maintenance" element={<Maintenance />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/homes" element={<HomesPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}
