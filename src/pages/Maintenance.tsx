import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '../components/Layout';
import { Shield, Clock, HardDrive, RefreshCw, CheckCircle2, Lock, Monitor, Zap, HeartPulse, ChevronRight } from 'lucide-react';
import AboutProcess from '../components/about/AboutProcess';
import ParallaxLogoSection from '../components/ParallaxLogoSection';
import HomesContact from '../components/HomesContact';
import LatestInsights from '../components/LatestInsights';
import FinalCTA from '../components/FinalCTA';

const Maintenance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Iconik Studios Website Guardianship",
    "description": "Comprehensive website management, 24/7 monitoring, security patching, and performance tuning.",
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": "3",
      "lowPrice": "499",
      "highPrice": "1999",
      "priceCurrency": "USD"
    }
  };

  return (
    <Layout
      title="Website Management Services & Guardianship | Iconik Studios"
      description="Secure your digital assets with Iconik Studios. We offer comprehensive website management services, 24/7 monitoring, and performance tuning."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="bg-ink min-h-screen">
        {/* Hero Section */}
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
                <span className="text-burnt-orange font-mono text-xs uppercase tracking-[0.4em]">Vigilance / 03</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-tan uppercase leading-[0.8] mb-12 tracking-tighter">
                Peace <br /> Of Mind <br /> <span className="text-burnt-orange italic">Guaranteed.</span>
              </h1>
              <p className="max-w-xl text-paper text-xl leading-relaxed mb-12">
                Your digital asset is too valuable to leave to chance. We offer comprehensive website management services, including 24/7 monitoring, critical security patching, and proactive performance tuning. Never worry about uptime or outdated plugins again.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-burnt-orange text-white px-12 py-6 rounded-full font-display text-lg tracking-[0.2em] font-bold hover:scale-105 transition-all duration-500 uppercase shadow-[0_20px_50px_rgba(234,88,12,0.3)]">
                  Secure My Website
                </button>
                <div className="flex flex-col justify-center text-paper font-mono text-[10px] uppercase tracking-widest italic">
                  *24/7 Monitoring included in all tiers
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-square bg-tan rounded-3xl overflow-hidden flex items-center justify-center p-12">
                 <div className="w-full h-full border-2 border-burnt-orange/20 rounded-2xl flex flex-col items-center justify-center gap-8 relative overflow-hidden group">
                    <HeartPulse size={120} className="text-burnt-orange animate-pulse" />
                    <div className="text-center">
                      <p className="font-display text-2xl uppercase text-ink">System Status</p>
                      <p className="font-mono text-xs uppercase tracking-widest opacity-100">All Nodes Nominal</p>
                    </div>
                    {/* Decorative Rings */}
                    <div className="absolute inset-0 border border-burnt-orange/10 rounded-full scale-150 animate-[spin_20s_linear_infinite]" />
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="px-6 lg:px-12 py-32 bg-tan text-ink rounded-t-[32px]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-display uppercase mb-24 max-w-4xl tracking-tighter leading-none text-center mx-auto">
              Proactive Protection <br /> For High-Value Assets.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Iron-Clad Security",
                  desc: "Weekly security audits and immediate critical patching. We keep your customer data behind a impenetrable digital fortress.",
                  icon: Shield
                },
                {
                  title: "Performance Tuning",
                  desc: "Web standards evolve. We constantly tune your server environment and database queries for maximum velocity.",
                  icon: Zap
                },
                {
                  title: "Daily Snapshots",
                  desc: "Redundancy is king. We perform daily off-site cloud backups ensuring your site can be restored in seconds, not hours.",
                  icon: HardDrive
                }
              ].map((benefit, i) => (
                <div key={i} className="p-12 border border-ink/10 rounded-3xl space-y-8 hover:bg-ink hover:text-tan transition-all duration-700 h-full">
                  <div className="w-16 h-16 bg-ink text-tan rounded-2xl flex items-center justify-center">
                    <benefit.icon size={32} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-display uppercase leading-tight">{benefit.title}</h3>
                    <p className="opacity-100 leading-relaxed italic">"{benefit.desc}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="px-6 lg:px-12 py-32 bg-paper text-ink">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-24">
                <span className="font-mono text-xs uppercase tracking-[0.5em] opacity-100 block mb-6">Service Tiers</span>
                <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter">The Guardianship.</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { tier: "Foundation", price: "$499", features: ["24/7 Uptime Monitoring", "Weekly Security Patching", "Daily Cloud Backups", "1hr Technical Support"] },
                 { tier: "Performance", price: "$999", features: ["Everything in Foundation", "Core Vitals Optimization", "Priority Support Desk", "4hr Technical Support"], highlighted: true },
                 { tier: "Enterprise", price: "$1999+", features: ["Everything in Performance", "Real-time Malware Defense", "Dedicated Account Mgr", "12hr Technical Support"] }
               ].map((plan, i) => (
                 <div key={i} className={`p-16 rounded-3xl flex flex-col justify-between border-2 ${plan.highlighted ? 'bg-ink text-tan border-ink scale-105 z-10 shadow-2xl' : 'bg-tan/30 border-ink/5'} transition-all hover:scale-[1.02] duration-500`}>
                   <div className="space-y-12">
                     <div>
                       <span className={`text-xs font-mono uppercase tracking-[0.3em] mb-4 block ${plan.highlighted ? 'text-burnt-orange' : 'text-ink'}`}>{plan.tier}</span>
                       <h3 className="text-7xl font-display">{plan.price}</h3>
                       <span className="text-xs uppercase tracking-[0.2em] opacity-100 block mt-2">Per Calendar Month</span>
                     </div>
                     <div className={`h-[1px] ${plan.highlighted ? 'bg-burnt-orange/30' : 'bg-ink/10'} w-full`} />
                     <ul className="space-y-6">
                       {plan.features.map((f, j) => (
                         <li key={j} className="flex items-start gap-4 text-sm font-bold uppercase tracking-tight leading-tight">
                           <CheckCircle2 size={18} className={plan.highlighted ? 'text-burnt-orange shrink-0 mt-0.5' : 'text-ink shrink-0 mt-0.5'} />
                           {f}
                         </li>
                       ))}
                     </ul>
                   </div>
                   <button className={`w-full py-8 rounded-full font-display uppercase tracking-[0.2em] text-lg mt-16 transition-all shadow-lg ${plan.highlighted ? 'bg-burnt-orange text-white hover:bg-tan hover:text-ink' : 'bg-ink text-tan hover:bg-burnt-orange hover:text-white'}`}>Select Tier</button>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Parallax Interstitial */}
        <ParallaxLogoSection />

        {/* Process Section */}
        <AboutProcess />

        {/* Final CTA */}
        <section className="py-48 text-center px-6 relative overflow-hidden bg-burnt-orange text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-7xl md:text-[10vw] font-display uppercase tracking-tighter leading-[0.8] mb-16">
              Total <br /> <span className="italic">Vigilance.</span>
            </h2>
            <div className="flex flex-col items-center gap-8">
              <button className="bg-white text-burnt-orange px-16 py-8 rounded-full font-display text-2xl tracking-[0.2em] font-bold hover:bg-ink hover:text-tan transition-all duration-500 uppercase shadow-2xl">
                Start My Health Check
              </button>
              <div className="flex items-center justify-center gap-4 text-white opacity-80">
                <Lock size={20} />
                <span className="font-mono text-xs uppercase tracking-widest">Secure by protocol.</span>
              </div>
            </div>
          </motion.div>
        </section>

        <LatestInsights />

        <HomesContact />
      </div>
      <FinalCTA />
    </Layout>
  );
};

export default Maintenance;

