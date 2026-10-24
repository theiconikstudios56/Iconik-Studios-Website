import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Shield, Clock, HardDrive, RefreshCw, CheckCircle2, Lock, Monitor, Zap, HeartPulse, ChevronRight } from 'lucide-react';
import MaintenanceProcess from '../components/MaintenanceProcess';
import ParallaxLogoSection from '../components/ParallaxLogoSection';
import HomesContact from '../components/HomesContact';
import LatestInsights from '../components/LatestInsights';
import FinalCTA from '../components/FinalCTA';
import fuzzyMaintenanceImage from '../assets/images/web/funny-maintain.webp';
import fuzzyClosingImage from '../assets/images/web/fuzzy-closing.webp';
import { Img, T } from '../content';

const Maintenance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Iconik Studios Website Care Plans",
    "description": "Monthly website care: hosting, monitoring, daily backups and content edits made by a person, with reports and Google Business Profile upkeep on the higher plans.",
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": "3",
      "lowPrice": "69",
      "highPrice": "349",
      "priceCurrency": "USD"
    }
  };

  return (
    <Layout
      page="maintenance"
      title="Med Spa Website Care Plans | Iconik Studios"
      description="Monthly website care from $69: hosting, monitoring, daily backups and edits made for you, plus reports and Google Business Profile upkeep. Month to month."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="bg-ink min-h-screen">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-12 pt-24 pb-12 overflow-hidden min-h-[100svh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Img k="maintenance.image-iconik-website-guardianship" label="Picture"
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
                <span className="text-burnt-orange font-mono text-xs uppercase tracking-[0.4em]"><T k="maintenance.vigilance-03">{"Vigilance / 03"}</T></span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-display text-tan uppercase leading-none mb-8 tracking-tighter opacity-85"><T k="maintenance.peace-of-mind-guaranteed" em="text-burnt-orange italic" label="Heading">{"Peace\nOf Mind\n*Guaranteed.*"}</T></h1>
              <p className="max-w-xl text-paper text-xl leading-relaxed mb-8"><T k="maintenance.your-website-and-automation">{"Your website and automation systems are living assets that power your business every single day. We provide comprehensive maintenance for both your website and AI workflows — including 24/7 monitoring, security patching, performance tuning, and ongoing optimization of your Fuzzy agents — so everything stays protected, sharp, and running at full capacity while you focus on growing your business. Month to month, from $69."}</T></p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/contact" className="inline-block text-center bg-burnt-orange text-white px-12 py-6 rounded-full font-display text-lg tracking-[0.2em] font-bold hover:scale-105 transition-all duration-500 uppercase shadow-[0_20px_50px_rgba(234,88,12,0.3)]"><T k="maintenance.secure-my-website" label="Button">{"Secure My Website"}</T></Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="px-6 lg:px-12 py-20 md:py-32 bg-tan text-ink rounded-t-[32px]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-display uppercase mb-24 max-w-4xl tracking-tighter leading-none text-center mx-auto"><T k="maintenance.proactive-protection-for-high" label="Heading">{"Proactive Protection\nFor High-Value Assets."}</T></h2>
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
                  desc: "Redundancy is everything. We perform daily off-site cloud backups of your website and automation configurations so that if anything ever goes wrong, your entire digital ecosystem — site, workflows, and Fuzzy agents — can be rolled back to its last good version within minutes, and fully restored from a daily backup the same day.",
                  icon: HardDrive
                }
              ].map((benefit, i) => (
                <div key={i} className="p-6 border border-ink/10 rounded-3xl space-y-6 hover:bg-ink hover:text-tan transition-all duration-700 h-full">
                  <div className="w-16 h-16 bg-ink text-tan rounded-2xl flex items-center justify-center">
                    <benefit.icon size={32} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-display uppercase leading-tight"><T k={`maintenance.benefits.${i + 1}.title`} label={`Benefit ${i + 1}: heading`}>{benefit.title}</T></h3>
                    <p className="opacity-100 leading-relaxed italic"><T k={`maintenance.benefits.${i + 1}.desc`} label={`Benefit ${i + 1}: text`}>{benefit.desc}</T></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="px-6 lg:px-12 py-20 md:py-32 bg-paper text-ink">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-24">
                <span className="font-mono text-xs uppercase tracking-[0.5em] opacity-100 block mb-6"><T k="maintenance.service-tiers">{"Service Tiers"}</T></span>
                <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter"><T k="maintenance.the-guardianship" label="Heading">{"Care Plans."}</T></h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 {
                   tier: "Foundation",
                   price: "$69",
                   features: [
                     "Hosting on our servers, with SSL",
                     "Uptime monitoring around the clock, with alerts",
                     "Daily off-site backups",
                     "Security monitoring",
                     "Your forms and lead delivery checked every month",
                     "Your Fuzzy chatbot checked and tuned",
                     "Up to 30 minutes of content edits a month (text, photos, hours, prices)",
                     "Replies within 2 business days"
                   ]
                 },
                 {
                   tier: "Performance",
                   price: "$189",
                   features: [
                     "Everything in Foundation",
                     "Up to 1 hour of content edits a month",
                     "A monthly report: visits, leads and your top pages",
                     "Google Business Profile kept up to date: hours, photos and 2 posts a month",
                     "Your review-request link set up and kept working",
                     "Replies by the next business day"
                   ],
                   highlighted: true
                 },
                 {
                   tier: "Iconik",
                   price: "$349",
                   features: [
                     "Everything in Performance",
                     "Up to 3 hours of changes a month, new pages and landing pages included",
                     "Replies the same business day"
                   ]
                 }
               ].map((plan, i) => (
                 <div key={i} className={`p-16 rounded-3xl flex flex-col justify-between border-2 ${plan.highlighted ? 'bg-ink text-tan border-ink scale-105 z-10 shadow-2xl' : 'bg-tan/30 border-ink/5'} transition-all hover:scale-[1.02] duration-500`}>
                   <div className="space-y-12">
                     <div>
                       <span className={`text-xs font-mono uppercase tracking-[0.3em] mb-4 block ${plan.highlighted ? 'text-burnt-orange' : 'text-ink'}`}><T k={`maintenance.plans.${i + 1}.tier`} label={`Plan ${i + 1}: tier`}>{plan.tier}</T></span>
                       <h3 className="text-7xl font-display"><T k={`maintenance.plans.${i + 1}.price`} label={`Plan ${i + 1}: price`}>{plan.price}</T></h3>
                       <span className="text-xs uppercase tracking-[0.2em] opacity-100 block mt-2"><T k="maintenance.per-calendar-month">{"Per Calendar Month"}</T></span>
                     </div>
                     <div className={`h-[1px] ${plan.highlighted ? 'bg-burnt-orange/30' : 'bg-ink/10'} w-full`} />
                     <ul className="space-y-6">
                       {plan.features.map((f, j) => (
                         <li key={j} className="flex items-start gap-4 text-sm font-sans font-normal normal-case tracking-normal leading-relaxed text-left">
                           <CheckCircle2 size={18} className={plan.highlighted ? 'text-burnt-orange shrink-0 mt-0.5' : 'text-ink shrink-0 mt-0.5'} />
                           <T k={`maintenance.plans.${i + 1}.feature${j + 1}`} label={`Plan ${i + 1}: feature ${j + 1}`}>{f}</T>
                         </li>
                       ))}
                     </ul>
                   </div>
                   <Link to="/contact" className={`block text-center w-full py-8 rounded-full font-display uppercase tracking-[0.2em] text-lg mt-16 transition-all shadow-lg ${plan.highlighted ? 'bg-burnt-orange text-white hover:bg-tan hover:text-ink' : 'bg-ink text-tan hover:bg-burnt-orange hover:text-white'}`}><T k="maintenance.select-tier" label="Button">{"Select Tier"}</T></Link>
                 </div>
               ))}
             </div>
             <p className="max-w-3xl mx-auto text-center text-sm leading-relaxed mt-16"><T k="maintenance.plan-terms" label="Plan terms">{"Month to month, cancel with 30 days' notice. Unused time doesn't roll over. Work beyond your plan is $85 an hour, quoted before we start. Built on Iconik Sites? Your Sites plan is included."}</T></p>
          </div>
        </section>

        {/* Parallax Interstitial */}
        <ParallaxLogoSection bgImage={fuzzyClosingImage} imageKey="maintenance.closing.image" />

        {/* Process Section */}
        <MaintenanceProcess />

        {/* Final CTA */}
        <section className="py-48 text-center px-6 relative overflow-hidden bg-burnt-orange text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-7xl md:text-[10vw] font-display uppercase tracking-tighter leading-[0.95] mb-16"><T k="maintenance.we-got-your-back" em="italic" label="Heading">{"We Got\n*Your Back.*"}</T></h2>
            <div className="flex flex-col items-center gap-8">
              <Link to="/contact" className="inline-block bg-white text-burnt-orange px-16 py-8 rounded-full font-display text-2xl tracking-[0.2em] font-bold hover:bg-ink hover:text-tan transition-all duration-500 uppercase shadow-2xl"><T k="maintenance.start-your-protection" label="Button">{"Start Your Protection"}</T></Link>
              <div className="flex items-center justify-center gap-4 text-white opacity-80">
                <Lock size={20} />
                <span className="font-mono text-xs uppercase tracking-widest"><T k="maintenance.secured-by-iconik-studios">{"Secured by Iconik Studios."}</T></span>
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

