import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '../components/Layout';
import { Shield, Clock, HardDrive, RefreshCw, CheckCircle2, Lock, Monitor, Zap, HeartPulse, ChevronRight } from 'lucide-react';
import MaintenanceProcess from '../components/MaintenanceProcess';
import ParallaxLogoSection from '../components/ParallaxLogoSection';
import HomesContact from '../components/HomesContact';
import LatestInsights from '../components/LatestInsights';
import FinalCTA from '../components/FinalCTA';
import fuzzyMaintenanceImage from '../assets/images/funny-maintain.png';
import fuzzyClosingImage from '../assets/images/fuzzy-closing.png';

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
      "lowPrice": "500",
      "highPrice": "2000",
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
        <section className="relative px-6 lg:px-12 pt-24 pb-12 overflow-hidden min-h-[100svh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src={fuzzyMaintenanceImage}
              alt="Iconik Website Guardianship"
              className="w-full h-full object-cover brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-ink/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-burnt-orange" />
                <span className="text-burnt-orange font-mono text-xs uppercase tracking-[0.4em]">Vigilance / 03</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-[7rem] font-display text-tan uppercase leading-none mb-8 tracking-tighter opacity-85">
                Peace <br /> Of Mind <br /> <span className="text-burnt-orange italic">Guaranteed.</span>
              </h1>
              <p className="max-w-xl text-paper text-base sm:text-xl leading-relaxed mb-8">
                Your website and automation systems are living assets that power your business every single day. We provide comprehensive maintenance for both your website and AI workflows — including 24/7 monitoring, security patching, performance tuning, and ongoing optimization of your Fuzzy agents — so everything stays protected, sharp, and running at full capacity while you focus on growing your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-burnt-orange text-white px-12 py-6 rounded-full font-display text-lg tracking-[0.2em] font-bold hover:scale-105 transition-all duration-500 uppercase shadow-[0_20px_50px_rgba(234,88,12,0.3)]">
                  Secure My Website
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="px-6 lg:px-12 py-32 bg-tan text-ink rounded-t-[32px]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase mb-16 sm:mb-24 max-w-4xl tracking-tighter leading-none text-center mx-auto">
              Proactive Protection <br /> For High-Value Assets.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Iron-Clad Security",
                  desc: "We run weekly security audits and deploy critical patches the moment a vulnerability is identified. Your website and Fuzzy agents are continuously monitored to keep your customer data, automation workflows, and business operations locked down behind a solid layer of protection — 24/7, no exceptions.",
                  icon: Shield
                },
                {
                  title: "Performance Tuning",
                  desc: "Web standards evolve and so do your automation systems. We continuously tune your server environment, database queries, and AI workflow sequences to make sure everything is running at maximum velocity. We keep the engine clean and the performance sharp.",
                  icon: Zap
                },
                {
                  title: "Daily Snapshots",
                  desc: "Redundancy is everything. We perform daily off-site cloud backups of your website and automation configurations so that if anything ever goes wrong, your entire digital ecosystem — site, workflows, and Fuzzy agents — can be fully restored in seconds, not hours.",
                  icon: HardDrive
                }
              ].map((benefit, i) => (
                <div key={i} className="p-6 border border-ink/10 rounded-3xl space-y-6 hover:bg-ink hover:text-tan transition-all duration-700 h-full">
                  <div className="w-16 h-16 bg-ink text-tan rounded-2xl flex items-center justify-center">
                    <benefit.icon size={32} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-display uppercase leading-tight">{benefit.title}</h3>
                    <p className="opacity-100 leading-relaxed italic">{benefit.desc}</p>
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
                 {
                   tier: "Foundation",
                   price: "$500",
                   features: [
                     "Up to 2 website update requests per month (text changes, image swaps, minor layout adjustments)",
                     "Monthly chatbot performance check and minor configuration tweaks",
                     "24/7 uptime monitoring with instant alerts",
                     "Monthly security audit and critical patch deployment",
                     "Daily off-site cloud backups with rapid restore capability",
                     "1 monthly check-in call (30 minutes) to review performance and address any concerns",
                     "48-hour response time on all support requests"
                   ]
                 },
                 {
                   tier: "Performance",
                   price: "$1000",
                   features: [
                     "Everything in the Maintenance Plan",
                     "Up to 3 website update requests per month (text, images, new sections, or page edits)",
                     "Chatbot monitoring and optimization — responses refined monthly based on real conversation data",
                     "2 email marketing campaigns per month (written, designed, and deployed)",
                     "12 social media posts per month (graphics and captions created and scheduled)",
                     "Monthly lead performance report showing traffic, leads captured, and conversion data",
                     "Automation workflow monitoring — all active Fuzzy agents reviewed and fine-tuned monthly",
                     "24-hour response time on all support requests"
                   ],
                   highlighted: true
                 },
                 {
                   tier: "Enterprise",
                   price: "$2000",
                   features: [
                     "Everything in the Growth Plan",
                     "Up to 3 website update requests per month plus 1 larger structural update (new landing page, new service section, or funnel adjustment)",
                     "Advanced automation management — all Fuzzy agents monitored, tested, and optimized continuously",
                     "Full sales pipeline automation review and refinement each month",
                     "A/B testing on key website pages and email campaigns to continuously improve conversion rates",
                     "Monthly strategy session (60 minutes) with your Iconik Studios team to review results and plan next steps",
                     "Comprehensive monthly performance dashboard covering website traffic, lead flow, automation performance, and email campaign results",
                     "Priority response time — all support requests handled within 12 hours",
                     "Quarterly automation audit to identify new opportunities to save time and scale faster"
                   ]
                 }
               ].map((plan, i) => (
                 <div key={i} className={`p-16 rounded-3xl flex flex-col justify-between border-2 ${plan.highlighted ? 'bg-ink text-tan border-ink scale-105 z-10 shadow-2xl' : 'bg-tan/30 border-ink/5'} transition-all hover:scale-[1.02] duration-500`}>
                   <div className="space-y-12">
                     <div>
                       <span className={`text-xs font-mono uppercase tracking-[0.3em] mb-4 block ${plan.highlighted ? 'text-burnt-orange' : 'text-ink'}`}>{plan.tier}</span>
                       <h3 className="text-4xl sm:text-7xl font-display">{plan.price}</h3>
                       <span className="text-xs uppercase tracking-[0.2em] opacity-100 block mt-2">Per Calendar Month</span>
                     </div>
                     <div className={`h-[1px] ${plan.highlighted ? 'bg-burnt-orange/30' : 'bg-ink/10'} w-full`} />
                     <ul className="space-y-6">
                       {plan.features.map((f, j) => (
                         <li key={j} className="flex items-start gap-4 text-sm font-sans font-normal normal-case tracking-normal leading-relaxed text-left">
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
        <ParallaxLogoSection bgImage={fuzzyClosingImage} />

        {/* Process Section */}
        <MaintenanceProcess />

        {/* Final CTA */}
        <section className="py-48 text-center px-6 relative overflow-hidden bg-burnt-orange text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-7xl md:text-[10vw] font-display uppercase tracking-tighter leading-[0.95] mb-16">
              We Got <br /> <span className="italic">Your Back.</span>
            </h2>
            <div className="flex flex-col items-center gap-8">
              <button className="bg-white text-burnt-orange px-16 py-8 rounded-full font-display text-2xl tracking-[0.2em] font-bold hover:bg-ink hover:text-tan transition-all duration-500 uppercase shadow-2xl">
                Start Your Protection
              </button>
              <div className="flex items-center justify-center gap-4 text-white opacity-80">
                <Lock size={20} />
                <span className="font-mono text-xs uppercase tracking-widest">Secured by Iconik Studios.</span>
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

