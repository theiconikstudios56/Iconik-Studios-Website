import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Target, MousePointer2, Layout as LayoutIcon, Shield, ArrowRight } from 'lucide-react';
import WebDesignProcess from '../components/about/WebDesignProcess';
import ParallaxLogoSection from '../components/ParallaxLogoSection';
import PortfolioCarousel from '../components/PortfolioCarousel';
import HomesContact from '../components/HomesContact';
import LatestInsights from '../components/LatestInsights';
import FinalCTA from '../components/FinalCTA';
import fuzzyWebDesignImage from '../assets/images/web/fuzzy-web-design.webp';
import homeOfficeFuzzyImage from '../assets/images/web/home-office-fuzzy.webp';
import { Img, T } from '../content';

const WebDesign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout
      page="web-design"
      title="Website Development for Workflow Automation | Iconik Studios"
      description="Turn your website into an automated lead generation machine with Iconik Studios. We specialize in custom web design with zapier automation."
    >
      <div className="bg-ink min-h-screen">
        {/* Hero Section - The Hook */}
        <section className="relative px-6 lg:px-12 pt-24 pb-12 overflow-hidden min-h-[100svh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Img k="web-design.image-iconik-web-design" label="Picture"
              src={fuzzyWebDesignImage}
              alt="Iconik Web Design Workspace"
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
                <span className="text-burnt-orange font-mono text-xs uppercase tracking-[0.4em]"><T k="web-design.web-architecture-01">{"Web Architecture / 01"}</T></span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-display text-tan uppercase leading-none mb-8 tracking-tighter opacity-85"><T k="web-design.stop-losing-leads-to" em="text-burnt-orange italic" label="Heading">{"Stop Losing\nLeads To\n*Bad Design.*"}</T></h1>
              <p className="max-w-xl text-paper text-xl leading-relaxed mb-8"><T k="web-design.most-websites-are-built">{"Most websites are built to look good in a portfolio. Ours are built to convert. We specialize in website development for workflow automation, bridging the gap between stunning web design and backend AI efficiency. Every layout decision is engineered to systematically move your visitors toward a single, business-driven objective."}</T></p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-burnt-orange text-white px-12 py-6 rounded-full font-display text-lg tracking-[0.2em] font-bold hover:scale-105 transition-all duration-500 uppercase shadow-[0_20px_50px_rgba(234,88,12,0.3)]"><T k="web-design.schedule-your-audit" label="Button">{"Schedule Your Audit"}</T></button>

              </div>
            </motion.div>
          </div>
        </section>

        {/* The Methodology - Bento Style */}
        <section className="px-6 lg:px-12 py-32 bg-tan text-ink rounded-t-[32px]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-end">
              <div className="lg:col-span-8">
                <span className="font-mono text-xs uppercase tracking-widest text-ink block mb-6"><T k="web-design.core-methodology">{"Core Methodology"}</T></span>
                <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-[0.9]"><T k="web-design.design-for-focus-not" label="Heading">{"Design for Focus,\nNot Just Discovery."}</T></h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-xl opacity-100 leading-relaxed italic"><T k="web-design.while-traditional-ux-facilitates">{"\"While traditional UX facilitates exploration, CCD utilizes cognitive triggers to nudge visitors through a specific funnel.\""}</T></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
              {[
                {
                  title: "Cognitive Load Reduction",
                  desc: "We break complex information into scannable, digestible sections—making it effortless for visitors to understand your value and take the next step.",
                  icon: MousePointer2
                },
                {
                  title: "Automated Lead Capture",
                  desc: "Our designs feature deep integration with Zapier and Make.com. Get custom web design with zapier automation that instantly routes prospects to your CRM the moment they click submit.",
                  icon: Target
                },
                {
                  title: "1:1 Goal Alignment",
                  desc: "Every element on the page is aligned with one campaign objective. No distractions. No competing messages. Just a clear path from visitor to customer.",
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
                    <h3 className="text-2xl font-display uppercase leading-tight"><T k={`web-design.benefits.${i + 1}.title`} label={`Benefit ${i + 1}: heading`}>{benefit.title}</T></h3>
                    <p className="opacity-100 leading-relaxed text-lg"><T k={`web-design.benefits.${i + 1}.desc`} label={`Benefit ${i + 1}: text`}>{benefit.desc}</T></p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Web Design Service Section */}
        <section className="px-6 lg:px-12 py-40 border-t border-ink/5 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-24 items-start">
              <div className="lg:w-1/2 space-y-12">
                <h2 className="text-6xl md:text-8xl font-display text-ink uppercase leading-[0.95] tracking-tighter"><T k="web-design.beautiful-built-to-work" em="text-burnt-orange italic" label="Heading">{"Beautiful.\nBuilt To\n*Work.*"}</T></h2>
                <div className="space-y-8 text-xl text-ink leading-relaxed max-w-xl">
                  <p className="text-xl text-ink leading-relaxed"><T k="web-design.every-site-we-design">{"Every site we design and develop is custom-crafted to do two things at once — look exceptional and convert relentlessly. Rooted in our proven template systems and engineered from the ground up, each interface balances stunning aesthetics with zero friction, holding attention while guiding every visitor toward your primary business objective with clarity and intention."}</T></p>
                  
                  <div className="pt-6">
                    <h3 className="font-display text-2xl text-ink uppercase mb-3"><T k="web-design.your-digital-storefront-should" label="Subheading">{"Your digital storefront should be a reflection of your brand's excellence. It should also be a lead-generating machine."}</T></h3>
                    <p className="text-base text-ink opacity-80 leading-relaxed font-mono"><T k="web-design.every-form-submission-every">{"Every form submission, every inquiry, every point of contact is automatically integrated, routed, and synced directly into your CRM the moment it happens — no manual entry, no lost leads, no gaps in your pipeline. Your data flows exactly where it needs to go, in real time, every time."}</T></p>
                  </div>

                  <div className="pt-6">
                    <h3 className="font-display text-2xl text-ink uppercase mb-3"><T k="web-design.and-because-your-business" label="Subheading">{"And because your business doesn't clock out at 5pm, neither do we."}</T></h3>
                    <p className="text-base text-ink opacity-80 leading-relaxed font-mono"><T k="web-design.each-site-is-equipped">{"Each site is equipped with an intelligent AI chatbot — powered by the same automation-first philosophy we apply to everything we build. Light enough to feel natural, smart enough to engage, qualify, and capture prospects around the clock. Whether it's 2pm or 2am, your business is always on, always present, and always converting."}</T></p>
                  </div>
                </div>

                <div className="pt-8 grid grid-cols-2 gap-12">
                  <div className="">
                    <h4 className="text-4xl font-display text-burnt-orange"><T k="web-design.24-7" label="Subheading">{"24/7"}</T></h4>
                    <p className="text-xs uppercase tracking-widest font-mono text-ink"><T k="web-design.ai-lead-nurturing">{"AI Lead Nurturing"}</T></p>
                  </div>
                  <div className="">
                    <h4 className="text-4xl font-display text-burnt-orange">0</h4>
                    <p className="text-xs uppercase tracking-widest font-mono text-ink"><T k="web-design.missed-opportunities">{"Missed Opportunities"}</T></p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 relative group lg:sticky lg:top-32">
                <div className="aspect-square bg-tan rounded-3xl overflow-hidden transition-all duration-1000">
                  <Img k="web-design.image-web-design-showcase" label="Picture"
                    loading="lazy"
                    decoding="async"
                    src={homeOfficeFuzzyImage}
                    alt="Web Design Showcase"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Interstitial */}
        <ParallaxLogoSection imageKey="web-design.closing.image" />

        {/* Customized Web Design Process */}
        <WebDesignProcess />

        {/* Final CTA - The Conversion Point */}
        <section className="py-24 md:py-32 flex flex-col items-center text-center px-6 relative overflow-hidden bg-burnt-orange text-white gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <span className="font-mono text-xs uppercase tracking-[0.5em] opacity-100 block mb-6"><T k="web-design.the-momentum-loop">{"The Momentum Loop"}</T></span>
            <h2 className="text-5xl md:text-[7vw] font-display uppercase tracking-tighter leading-[0.95] mb-2"><T k="web-design.start-your-ascent" em="italic" label="Heading">{"Start Your\n*Ascent.*"}</T></h2>
          </motion.div>

          <div className="w-full">
            <PortfolioCarousel />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto w-full"
          >
            <div className="flex flex-col items-center">
              <Link
                to="/portfolio"
                className="bg-white text-burnt-orange px-12 py-5 rounded-full font-display text-xl tracking-[0.2em] font-bold hover:bg-ink hover:text-tan transition-all duration-500 uppercase shadow-2xl inline-block"
              ><T k="web-design.view-full-portfolio" label="Link or button">{"View Full Portfolio"}</T></Link>
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

