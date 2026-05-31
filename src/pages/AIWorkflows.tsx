import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Layout from '../components/Layout';
import { Brain, Activity, Layers, ArrowRight, Shield, Zap, Database, Search, Bot, CircuitBoard, Cpu, User, MessageSquare } from 'lucide-react';
import AutomationProcess from '../components/about/AutomationProcess';
import ParallaxLogoSection from '../components/ParallaxLogoSection';
import HomesContact from '../components/HomesContact';
import LatestInsights from '../components/LatestInsights';
import FinalCTA from '../components/FinalCTA';
import aiAutomationsImage from '../assets/images/fuzzy-automation.png';
import fuzzyWorkImage from '../assets/images/fuzzy-work.png';
import poolFuzzyImage from '../assets/images/pool-fuzzy.png';

const AnimatedWorkflowDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    "» System standby. Ready for intake..."
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 4;
        
        // Update logs based on step
        if (next === 0) {
          setLogs([
            "» Web Intake: Contact Form submission captured",
            "» Payload verified: mapping form fields..."
          ]);
        } else if (next === 1) {
          setLogs((prevLogs) => [
            ...prevLogs,
            "» CRM integration: Creating contact in GoHighLevel...",
            "» GoHighLevel contact record successfully created"
          ]);
        } else if (next === 2) {
          setLogs((prevLogs) => [
            ...prevLogs,
            "» Email Dispatch: Sending instant auto-reply response...",
            "» Pipeline Action: Adding lead to GHL opportunity board"
          ]);
        } else if (next === 3) {
          setLogs((prevLogs) => [
            ...prevLogs,
            "» Admin SMS: Sending instant alert notification to you...",
            "» Sequence start: Launching automated lead follow-up emails"
          ]);
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full aspect-square bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative select-none font-mono">
      {/* Subtle decorative background gradient grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#cd7f32_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-white/10 relative z-10">
        <div className="text-[10px] tracking-widest text-white/50 uppercase">
          [Automation 1: Lead Capture System]
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
          <span className="text-[9px] uppercase tracking-wider text-green-500">Live</span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative flex-1 my-6 flex items-center justify-center">
        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {/* Static Background Paths */}
          <line x1="50" y1="20" x2="50" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
          <path d="M 50 50 Q 35 66 20 80" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" fill="none" />
          <path d="M 50 50 Q 65 66 80 80" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" fill="none" />

          {/* Active Animated Paths */}
          {activeStep >= 1 && (
            <motion.line
              x1="50"
              y1="20"
              x2="50"
              y2="50"
              stroke="#cd7f32"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          )}
          {activeStep >= 2 && (
            <motion.path
              d="M 50 50 Q 35 66 20 80"
              stroke="#cd7f32"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          )}
          {activeStep >= 3 && (
            <motion.path
              d="M 50 50 Q 65 66 80 80"
              stroke="#cd7f32"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          )}
        </svg>

        {/* Nodes */}
        {/* Node 1: Ingest */}
        <div 
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5" 
          style={{ top: '20%', left: '50%' }}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
            activeStep === 0 
              ? 'bg-[#cd7f32] border-[#cd7f32] text-white shadow-[0_0_15px_rgba(205,127,50,0.5)] scale-110' 
              : 'bg-white/[0.02] border-white/10 text-white/50'
          }`}>
            <User size={18} />
          </div>
          <span className="text-[8px] uppercase tracking-wider text-white/60">1. Contact Form</span>
        </div>

        {/* Node 2: GHL Contact */}
        <div 
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5" 
          style={{ top: '50%', left: '50%' }}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
            activeStep === 1 
              ? 'bg-[#cd7f32] border-[#cd7f32] text-white shadow-[0_0_15px_rgba(205,127,50,0.5)] scale-110' 
              : 'bg-white/[0.02] border-white/10 text-white/50'
          }`}>
            <Cpu size={18} />
          </div>
          <span className="text-[8px] uppercase tracking-wider text-white/60">2. GHL Contact</span>
        </div>

        {/* Node 3a: Email & Pipeline */}
        <div 
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5" 
          style={{ top: '80%', left: '20%' }}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
            activeStep === 2 
              ? 'bg-[#cd7f32] border-[#cd7f32] text-white shadow-[0_0_15px_rgba(205,127,50,0.5)] scale-110' 
              : 'bg-white/[0.02] border-white/10 text-white/50'
          }`}>
            <MessageSquare size={18} />
          </div>
          <span className="text-[8px] uppercase tracking-wider text-white/60">3a. Email & Pipeline</span>
        </div>

        {/* Node 3b: SMS & Sequence */}
        <div 
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5" 
          style={{ top: '80%', left: '80%' }}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
            activeStep === 3 
              ? 'bg-[#cd7f32] border-[#cd7f32] text-white shadow-[0_0_15px_rgba(205,127,50,0.5)] scale-110' 
              : 'bg-white/[0.02] border-white/10 text-white/50'
          }`}>
            <Database size={18} />
          </div>
          <span className="text-[8px] uppercase tracking-wider text-white/60">3b. SMS & Sequence</span>
        </div>
      </div>

      {/* Terminal logs display */}
      <div className="bg-black/60 border border-white/10 rounded-xl p-4 h-24 flex flex-col justify-end text-left relative z-10">
        <div className="overflow-y-auto space-y-1 scrollbar-none text-[9px] leading-relaxed font-mono">
          {logs.slice(-3).map((log, idx) => (
            <div key={idx} className={idx === logs.slice(-3).length - 1 ? 'text-[#cd7f32]' : 'text-white/40'}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AIWorkflows = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout
      title="AI Automation Agency | Custom Zapier & Make.com Integrations | Iconik"
      description="As a premier ai automation agency, we build autonomous agents and intelligent workflows that handle lead qualification, booking, and CRM updates in real time."
    >
      <div className="bg-ink min-h-screen">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-12 pt-24 pb-12 overflow-hidden min-h-[100svh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src={aiAutomationsImage}
              alt="Iconik AI Automation"
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
                <span className="text-burnt-orange font-mono text-xs uppercase tracking-[0.4em]">Automation / 02</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-display text-tan uppercase leading-none mb-8 tracking-tighter opacity-85">
                Scale <br /> Without <br /> <span className="text-burnt-orange italic">Friction.</span>
              </h1>
              <p className="max-w-xl text-paper text-xl leading-relaxed mb-8">
                Stop drowning in manual tasks. As a premier ai automation agency, we build autonomous agents and intelligent workflows that handle lead qualification, booking, and CRM updates in real time. We bridge the gap between static operations and intelligent systems, allowing your experts to focus on visionary work.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-burnt-orange text-white px-12 py-6 rounded-full font-display text-lg tracking-[0.2em] font-bold hover:scale-105 transition-all duration-500 uppercase shadow-[0_20px_50px_rgba(234,88,12,0.3)]">
                  Automate Your Success
                </button>
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
                  "Most agencies automate tasks. We automate decision-making sequences to reduce the mental load on your leadership — and we deploy the Fuzzies to do it."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: "Predictive Insights",
                  desc: "Our Fuzzies don't just react — they think ahead. Powered by LLM-driven intelligence, each agent is trained to understand context, sentiment, and intent so your business always knows what a prospect needs before they even ask. No more guesswork. Just smart, autonomous insight working around the clock.",
                  icon: Brain
                },
                {
                  title: "Structured Growth",
                  desc: "Growth without structure is just chaos. Our Fuzzies automate your entire lead capture, lead follow-up, onboarding, and content mapping sequences — building a backend engine that runs itself. While you focus on the big picture, your automated systems are nurturing, converting, and scaling your business while you sleep.",
                  icon: Layers
                },
                {
                  title: "Autonomous Agents",
                  desc: "The Fuzzies are built to operate independently. From research to execution, each agent is deployed to handle complex, multi-step workflows with zero hand-holding required. They make decisions, take action, and deliver results — giving your leadership team the mental clarity to focus on what only humans can do.",
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
                    <p className="opacity-100 leading-relaxed text-lg italic">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Fuzzies Working Section */}
        <section className="px-6 lg:px-12 py-40 border-t border-ink/5 bg-paper">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row-reverse gap-24 items-center">
              <div className="lg:w-1/2 space-y-12">
                <h2 className="text-5xl md:text-7xl font-display text-ink uppercase leading-[0.9] tracking-tighter">
                  The Fuzzies <br /> Are Working <br /> <span className="text-accent italic">While You Aren't.</span>
                </h2>
                <div className="space-y-6 text-xl text-ink leading-relaxed max-w-xl">
                  <p>
                    Most businesses are losing valuable time on tasks that don't need a human touch. Chasing leads. Following up on emails. Onboarding new clients. Scheduling. Data entry. It adds up fast — and every hour your team spends on repetitive work is an hour they're not spending on actually growing the business.
                  </p>
                  <p className="font-display text-ink uppercase text-2xl">
                    That's where the Fuzzies come in.
                  </p>
                  <p>
                    At Iconik Studios, we build and deploy custom AI agents and automated workflow systems designed around how your business actually operates. Our Fuzzies don't just handle simple tasks — they think, decide, and run entire processes on their own so your business moves faster and smarter without adding more to your plate.
                  </p>
                </div>
              </div>

              <div className="lg:w-1/2 relative group w-full max-w-[500px] lg:max-w-none mx-auto">
                <AnimatedWorkflowDiagram />
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
                <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter leading-[0.9]">
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
                  title: "Lead Capture & Follow-Up",
                  desc: "Every inquiry, form submission, and inbound message gets captured instantly and followed up automatically. No more manually checking your inbox or hoping someone on your team remembered to respond. Your Fuzzies make sure every potential client hears from you fast — because speed is everything when it comes to converting a lead.",
                  icon: MessageSquare,
                  tags: ["Instant Ingest", "Auto-Responder", "Speed-to-Lead"]
                },
                {
                  title: "Client Onboarding",
                  desc: "First impressions matter. When a new client signs on, your Fuzzies take over — sending welcome messages, collecting information, delivering documents, and walking them through your process automatically. What used to take hours of back and forth now happens seamlessly in the background, giving your team more time and your clients a smoother experience from day one.",
                  icon: User,
                  tags: ["Portal Setup", "Auto-Collection", "Welcome Drips"]
                },
                {
                  title: "Sales Pipeline Management",
                  desc: "Deals don't close themselves, but your Fuzzies make sure nothing slips through the cracks. From automated follow-up reminders to pipeline status updates, every opportunity stays organized and moving forward. Your team always knows where things stand without having to chase anyone down or manually update a spreadsheet.",
                  icon: Activity,
                  tags: ["Deal Routing", "Status Triggers", "Follow-up Reminders"]
                },
                {
                  title: "Content, Communication & Operations",
                  desc: "From scheduled email sequences and client-facing messaging to internal reporting, data routing, and day-to-day task management — your Fuzzies keep the engine running behind the scenes. The repetitive operational work that quietly drains your team's energy gets automated, so your people can focus on the work that actually moves the needle.",
                  icon: Cpu,
                  tags: ["Email Drips", "Internal Reporting", "Task Automation"]
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
                      {item.desc}
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
        <ParallaxLogoSection bgImage={fuzzyWorkImage} />

        {/* Process Section */}
        <AutomationProcess />

        {/* Final CTA */}
        <section className="py-48 text-center px-6 relative overflow-hidden bg-burnt-orange text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <span className="font-mono text-xs uppercase tracking-[0.5em] opacity-100 block mb-12">Iconik Studios</span>
            <h2 className="text-7xl md:text-[10vw] font-display uppercase tracking-tighter leading-[0.9] mb-16">
              Future-Proof <br /> Your <span className="italic uppercase">Legacy.</span>
            </h2>
            <div className="flex flex-col items-center gap-8">
              <button className="bg-white text-burnt-orange px-16 py-8 rounded-full font-display text-2xl tracking-[0.2em] font-bold hover:bg-ink hover:text-tan transition-all duration-500 uppercase shadow-2xl">
                Schedule Your Audit
              </button>
              <div className="flex items-center justify-center gap-4 text-white opacity-100">
                <Cpu size={20} />
                <span className="font-mono text-xs uppercase tracking-widest">Iconik grade reliability.</span>
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
