import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { trackPage } from './lib/rmdTracking';
import { chatAvailable } from './lib/rmdChat';
import './lib/rmdContact'; // notes where the visit came from, for the contact form
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import PropertyShowcase from './components/PropertyShowcase';
import ScrollReveal from './components/ScrollReveal';
import FeaturedProject from './components/FeaturedProject';
import ElegantCarousel from './components/ui/ElegantCarousel';
import ZoomParallaxSection from './components/ZoomParallaxSection';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import React, { lazy, Suspense, useRef, useState, useEffect } from 'react';

import BackgroundTransition from './components/BackgroundTransition';
import FinalCTA from './components/FinalCTA';

import focusedFuzzyImage from './assets/images/web/focused-fuzzy.webp';

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
import SMBEmpowerment from './components/SMBEmpowerment';
import FuzzyLineupSection from './components/FuzzyLineupSection';
import HomesContact from './components/HomesContact';
import LatestInsights from './components/LatestInsights';

// Every page but the homepage loads its own code when it's opened, so the
// first visit downloads only what the homepage needs.
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WebDesign = lazy(() => import('./pages/WebDesign'));
const AIWorkflows = lazy(() => import('./pages/AIWorkflows'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const HomesPage = lazy(() => import('./pages/HomesPage'));
const ProjectPage = lazy(() => import('./components/ProjectPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const IntakePage = lazy(() => import('./pages/IntakePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ChatWidget = lazy(() => import('./components/chat/ChatWidget'));

// Pages where the chat bubble doesn't belong.
const NO_CHAT = /^\/intake(\/|$)/;

/** The chat bubble, loaded once the page has finished loading, so it never slows the first view. */
function ChatLauncher() {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!chatAvailable) return;
    const start = () => setReady(true);
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 2500);
    return () => window.clearTimeout(id);
  }, []);
  if (!ready || NO_CHAT.test(pathname)) return null;
  return (
    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>
  );
}

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


  return (
    <Layout
      title="AI Powered User Experience Design Agency | Iconik Studios"
      description="Iconik Studios is a boutique design and automation agency. We engineer digital legacies with high-end aesthetic strategy and robust backend automation."
    >
      <div className="relative z-10 bg-ink">
        <Hero />
        <PropertyShowcase />
        <section className="px-6 lg:px-12 py-32 overflow-hidden">
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
                <h2 className="text-6xl md:text-[6.5vw] font-display text-tan uppercase tracking-tighter leading-[1.05] mb-12">
                  Turn Visions <br /> Into <span className="text-accent italic">Visuals.</span>
                </h2>
                <p className="max-w-2xl text-paper text-base leading-relaxed mb-12">
                  We design jaw-dropping, high-converting digital storefronts, but we don't stop at aesthetics. Iconik Studios engineers the underlying automation workflows that capture every incoming inquiry, follow up instantly, and sync lead data directly to your CRM—saving you hours of manual labor, reducing marketing costs, and guaranteeing that zero opportunities slip through the cracks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mt-8">
                  <div className="bg-accent text-ink py-5 px-6 rounded-none border border-accent/20 flex flex-col justify-between hover:scale-[1.02] hover:bg-tan transition-all duration-300">
                    <div>
                      <h3 className="font-display text-lg tracking-[0.1em] font-bold uppercase mb-2">
                        Elite Web Design
                      </h3>
                      <p className="text-ink text-xs leading-relaxed font-mono">
                        We design visually stunning user experiences tailored to convert visitors into clients.
                      </p>
                    </div>
                  </div>
                  <div className="bg-accent text-ink py-5 px-6 rounded-none border border-accent/20 flex flex-col justify-between hover:scale-[1.02] hover:bg-tan transition-all duration-300">
                    <div>
                      <h3 className="font-display text-lg tracking-[0.1em] font-bold uppercase mb-2">
                        Intelligent Automation
                      </h3>
                      <p className="text-ink text-xs leading-relaxed font-mono">
                        We build custom backend workflows to follow up 24/7 and automate your operations.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-auto lg:h-[600px] rounded-[40px] overflow-hidden group">
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={focusedFuzzyImage}
                    alt="Web Design Service"
                    className="w-full h-full object-cover transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 border-[20px] border-ink/40 pointer-events-none" />
                <div className="absolute top-12 left-12 w-12 h-12 border-t-2 border-l-2 border-accent" />
                <div className="absolute bottom-12 right-12 w-12 h-12 border-b-2 border-r-2 border-accent" />


              </div>
            </div>
          </div>
        </section>
        <ServicesShowcase />
        <StackedServices />
        <ZoomParallaxSection />
        <SuccessSection />
        <SMBEmpowerment />
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
        <FuzzyLineupSection />
        <LatestInsights />
        <HomesContact />
      </div>
      <FinalCTA />
    </Layout>
  );
}

/** Sends each page view to RMD's visitor statistics (see lib/rmdTracking). */
function RmdTracking() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    trackPage(pathname, search);
    // A new page is a new view; a changed query string on the same page isn't.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <RmdTracking />
      <ScrollToTop />
      <GlobalCursor />
      {/* While a page's code loads: the site's dark background, no flash of white. */}
      <Suspense fallback={<div className="min-h-screen bg-ink" />}>
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
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        {/* The old proposal, contract and admin pages were retired: proposals and
            contracts now live in RMD. Old links land on the contact page. */}
        <Route path="/proposals/*" element={<Navigate to="/contact" replace />} />
        <Route path="/contract" element={<Navigate to="/contact" replace />} />
        <Route path="/admin/*" element={<Navigate to="/contact" replace />} />
        <Route path="/intake" element={<IntakePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
      <ChatLauncher />
    </Router>
  );
}
