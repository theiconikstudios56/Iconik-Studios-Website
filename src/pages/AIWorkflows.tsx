import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '../components/Layout';
import { Brain, Activity, Layers, ArrowRight, Shield, Zap, Database, Search, Bot, CircuitBoard, Cpu } from 'lucide-react';
import AboutProcess from '../components/about/AboutProcess';
import ParallaxLogoSection from '../components/ParallaxLogoSection';
import HomesContact from '../components/HomesContact';
import LatestInsights from '../components/LatestInsights';
import FinalCTA from '../components/FinalCTA';

const AIWorkflows = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
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
                <span className="text-burnt-orange font-mono text-xs uppercase tracking-[0.4em]">Automation / 02</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-tan uppercase leading-[0.8] mb-12 tracking-tighter">
                Scale <br /> Without <br /> <span className="text-burnt-orange italic">Friction.</span>
              </h1>
              <p className="max-w-xl text-paper text-xl leading-relaxed mb-12">
                We bridge the gap between static operations and intelligent systems. Our custom AI agents handle the repetitive, so your experts can focus on the visionary.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-burnt-orange text-white px-12 py-6 rounded-full font-display text-lg tracking-[0.2em] font-bold hover:scale-105 transition-all duration-500 uppercase shadow-[0_20px_50px_rgba(234,88,12,0.3)]">
                  Automate Your Success
                </button>
                <div className="flex flex-col justify-center">
                  <p className="text-paper font-mono text-[10px] uppercase tracking-widest italic">
                    *Limited availability: 2 integration slots for Q3
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
              <div className="aspect-[4/5] bg-white/5 rounded-3xl overflow-hidden grayscale brightness-50 group hover:grayscale-0 transition-all duration-1000">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
                  alt="AI and Intelligent Systems"
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits - Value Prop */}
        <section className="px-6 lg:px-12 py-32 bg-paper text-ink rounded-t-[32px] relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-end">
              <div className="lg:col-span-8">
                <span className="font-mono text-xs uppercase tracking-widest text-ink/80 block mb-6">Business Intelligence</span>
                <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-[0.9]">
                  Efficiency <br /> By Pure Design.
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-xl opacity-100 leading-relaxed italic">
                  "Most agencies automate tasks. We automate decision-making sequences to reduce the mental load on your leadership."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
              {[
                {
                  title: "Real-Time Processing",
                  desc: "Data-driven decisions made in milliseconds. Our workflows process information and trigger actions at lightning speeds.",
                  icon: Activity
                },
                {
                  title: "Predictive Insights",
                  desc: "Go beyond simple triggers. We implement LLM-driven agents that can understand context, sentiment, and intent.",
                  icon: Brain
                },
                {
                  title: "Structured Growth",
                  desc: "Automate lead qualification, onboarding, and content mapping. Build a business that scales as you sleep.",
                  icon: Layers
                },
                {
                  title: "Autonomous Agents",
                  desc: "Deploy independent systems that handle complex workflows. From research to execution, our agents operate with absolute autonomy.",
                  icon: CircuitBoard
                }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-8 p-12 bg-tan/30 border border-ink/5 rounded-3xl hover:bg-ink hover:text-tan transition-all duration-700 group h-full"
                >
                  <div className="w-16 h-16 bg-ink text-tan rounded-2xl flex items-center justify-center group-hover:bg-burnt-orange group-hover:text-white transition-colors duration-500">
                    <benefit.icon size={32} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-display uppercase leading-tight">{benefit.title}</h3>
                    <p className="opacity-100 leading-relaxed text-lg italic">"{benefit.desc}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Interactive "Squint Test" Section */}
        <section className="px-6 lg:px-12 py-40 border-t border-ink/5 bg-paper">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row-reverse gap-24 items-center">
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

        {/* Workflow Ecosystem Section */}
        <section className="px-6 lg:px-12 py-40 bg-ink text-paper relative overflow-hidden z-20">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32">
              <div className="max-w-3xl">
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-burnt-orange block mb-8">Automation Ecosystem</span>
                <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter leading-[0.8]">
                  Orchestrate <br /> Your <span className="text-burnt-orange italic">Future.</span>
                </h2>
              </div>
              <p className="max-w-sm text-paper font-mono text-[10px] uppercase tracking-widest leading-loose text-right hidden lg:block">
                Beyond traditional scripts. We build self-correcting, context-aware systems that evolve with your business complexity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-[20px]">
              {[
                {
                  title: "Semantic Knowledge Engines",
                  desc: "We bridge the gap between fragmented data and instant clarity. Our RAG-powered systems transform internal silos into a unified conversational intelligence.",
                  icon: Database,
                  tags: ["Vector Indexing", "Semantic Search", "Auto-Tagging"]
                },
                {
                  title: "High-Fidelity Support Agents",
                  desc: "Scale your customer success without increasing headcount. Our agents handle technical nuance and brand sentiment with high-precision accuracy.",
                  icon: Bot,
                  tags: ["Voice Synthesis", "Sentiment Guardrails", "Multi-API"]
                },
                {
                  title: "Content Orchestration Systems",
                  desc: "A headless production floor that handles research, ideation, and distribution. We automate the volume so you can focus on its strategic direction.",
                  icon: Cpu,
                  tags: ["Agentic Chains", "Media Transformation", "Auto-QA"]
                },
                {
                  title: "Predictive Strategic Dashboards",
                  desc: "Real-time visibility into the invisible. We build dashboards that don't just show historical data but predict upcoming operational bottlenecks.",
                  icon: Zap,
                  tags: ["Anomaly Detection", "Trend Mapping", "Executive Briefing"]
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="bg-ink p-12 lg:p-16 hover:bg-white/[0.02] transition-all duration-700 group border-b border-white/5 md:border-b-0"
                >
                  <div className="flex items-center justify-between mb-16">
                    <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-burnt-orange group-hover:bg-burnt-orange group-hover:text-white group-hover:scale-110 transition-all duration-500">
                      <item.icon size={32} />
                    </div>
                    <span className="font-mono text-[10px] opacity-20 uppercase tracking-widest">Workflow 0{i + 1}</span>
                  </div>
                  
                  <div className="space-y-8">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight leading-none group-hover:text-burnt-orange transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-paper text-lg md:text-xl leading-relaxed italic max-w-md">
                      "{item.desc}"
                    </p>
                    <div className="flex flex-wrap gap-2 pt-8">
                      {item.tags.map((tag, j) => (
                        <span key={j} className="px-4 py-1.5 bg-white/10 rounded-full text-[9px] font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
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
            <span className="font-mono text-xs uppercase tracking-[0.5em] opacity-100 block mb-12">System Hardening</span>
            <h2 className="text-7xl md:text-[10vw] font-display uppercase tracking-tighter leading-[0.8] mb-16">
              Future-Proof <br /> Your <span className="italic uppercase">Legacy.</span>
            </h2>
            <div className="flex flex-col items-center gap-8">
              <button className="bg-white text-burnt-orange px-16 py-8 rounded-full font-display text-2xl tracking-[0.2em] font-bold hover:bg-ink hover:text-tan transition-all duration-500 uppercase shadow-2xl">
                Begin The Audit
              </button>
              <div className="flex items-center justify-center gap-4 text-white opacity-100">
                <Cpu size={20} />
                <span className="font-mono text-xs uppercase tracking-widest">Enterprise grade reliability.</span>
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

export default AIWorkflows;
