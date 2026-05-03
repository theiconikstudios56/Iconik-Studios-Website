import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Layout from '../components/Layout';
import { Target, MousePointer2, Layout as LayoutIcon, Shield, ArrowRight } from 'lucide-react';
import AboutProcess from '../components/about/AboutProcess';
import ParallaxLogoSection from '../components/ParallaxLogoSection';
import PortfolioCarousel from '../components/PortfolioCarousel';
import HomesContact from '../components/HomesContact';
import LatestInsights from '../components/LatestInsights';
import FinalCTA from '../components/FinalCTA';

const WebDesign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="bg-ink min-h-screen">
        {/* Hero Section - The Hook */}
        <section className="relative px-6 lg:px-12 pt-40 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 z-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-burnt-orange" />
                <span className="text-burnt-orange font-mono text-xs uppercase tracking-[0.4em]">Web Architecture / 01</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-tan uppercase leading-[0.8] mb-12 tracking-tighter">
                Stop Losing <br /> Leads To <br /> <span className="text-burnt-orange italic">Bad Design.</span>
              </h1>
              <p className="max-w-xl text-paper text-xl leading-relaxed mb-12">
                We replace exploratory "UX" with Conversion-Centered Architecture. Every pixel is engineered to systematically nudge your visitors toward a single, business-driven objective.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-burnt-orange text-white px-12 py-6 rounded-full font-display text-lg tracking-[0.2em] font-bold hover:scale-105 transition-all duration-500 uppercase shadow-[0_20px_50px_rgba(234,88,12,0.3)]">
                  Schedule Your Audit
                </button>
                <div className="flex flex-col justify-center">
                  <p className="text-paper font-mono text-[10px] uppercase tracking-widest italic">
                    *Limited availability: 3 cohorts left this quarter
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[4/5] bg-white/5 rounded-3xl overflow-hidden grayscale brightness-75 hover:grayscale-0 transition-all duration-1000">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                  alt="Web Development and Design Workspace"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Methodology - Bento Style */}
        <section className="px-6 lg:px-12 py-32 bg-tan text-ink rounded-t-[32px]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-end">
              <div className="lg:col-span-8">
                <span className="font-mono text-xs uppercase tracking-widest text-ink block mb-6">Core Methodology</span>
                <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-[0.9]">
                  Design for Focus, <br /> Not Just Discovery.
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-xl opacity-100 leading-relaxed italic">
                  "While traditional UX facilitates exploration, CCD utilizes cognitive triggers to nudge visitors through a specific funnel."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
              {[
                {
                  title: "Cognitive Load Reduction",
                  desc: "We break complex data into manageable chunks, facilitating rapid scanning and instant decision-making.",
                  icon: MousePointer2
                },
                {
                  title: "Leak Prevention",
                  desc: "We ruthlessly remove global navigation and sidebars that tempt users away from the conversion path.",
                  icon: Target
                },
                {
                  title: "1:1 Goal Alignment",
                  desc: "Every pixel on the page is aligned with a single campaign goal. No distractions, no '99-cent hotdogs'.",
                  icon: LayoutIcon
                }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-8 p-12 border border-ink/10 rounded-3xl hover:bg-ink hover:text-tan transition-all duration-700 group h-full"
                >
                  <div className="w-16 h-16 bg-ink text-tan rounded-2xl flex items-center justify-center group-hover:bg-burnt-orange group-hover:text-white transition-colors duration-500">
                    <benefit.icon size={32} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-display uppercase leading-tight">{benefit.title}</h3>
                    <p className="opacity-100 leading-relaxed text-lg">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Parallax Interstitial */}
        <ParallaxLogoSection />

        {/* The Interactive "Squint Test" Section */}
        <section className="px-6 lg:px-12 py-40 border-t border-ink/5 bg-paper">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-24 items-center">
              <div className="lg:w-1/2 space-y-12">
                <h2 className="text-6xl md:text-8xl font-display text-ink uppercase leading-[0.8] tracking-tighter">
                  The <br /> Squint <br /> <span className="text-accent italic">Test.</span>
                </h2>
                <div className="space-y-8 text-xl text-ink leading-relaxed max-w-xl">
                  <p>
                    Verification is survival. We design layouts where the call-to-action remains the dominant visual element even when your vision is blurred.
                  </p>
                  <p className="font-display text-ink uppercase">
                    If they can't find it in 3 seconds, you've already lost them.
                  </p>
                </div>
                
                <div className="pt-8 grid grid-cols-2 gap-12">
                  <div className="">
                    <h4 className="text-4xl font-display text-burnt-orange">1:1</h4>
                    <p className="text-xs uppercase tracking-widest font-mono opacity-100">Attention Ratio</p>
                  </div>
                  <div className="">
                    <h4 className="text-4xl font-display text-burnt-orange">8s</h4>
                    <p className="text-xs uppercase tracking-widest font-mono opacity-100">Avg Attention Span</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 relative group">
                <div className="aspect-square bg-tan rounded-3xl overflow-hidden transition-all duration-1000">
                  <img 
                    src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200" 
                    alt="Squint Test"
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Re-use AboutProcess for consistency */}
        <AboutProcess />

        {/* Final CTA - The Conversion Point */}
        <section className="py-48 text-center px-6 relative overflow-hidden bg-burnt-orange text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <span className="font-mono text-xs uppercase tracking-[0.5em] opacity-100 block mb-12">The Momentum Loop</span>
            <h2 className="text-7xl md:text-[10vw] font-display uppercase tracking-tighter leading-[0.8] mb-12">
              Start Your <br /> <span className="text-italic">Ascent.</span>
            </h2>
          </motion.div>
            
          <PortfolioCarousel />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center gap-8 mt-12">
              <button className="bg-white text-burnt-orange px-16 py-8 rounded-full font-display text-2xl tracking-[0.2em] font-bold hover:bg-ink hover:text-tan transition-all duration-500 uppercase shadow-2xl">
                Ready to be Built?
              </button>
              <div className="flex items-center justify-center gap-4 text-white opacity-100">
                <Shield size={20} />
                <span className="font-mono text-xs uppercase tracking-widest">No credit card required.</span>
              </div>
            </div>
          </motion.div>
          
          {/* Animated Background Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
          </div>
        </section>

        <LatestInsights />
        
        <HomesContact />
      </div>
      <FinalCTA />
    </Layout>
  );
};

export default WebDesign;

