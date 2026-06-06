import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Mail, Database, Sparkles, ArrowRight, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';

const pipelineSteps = [
  {
    id: 0,
    title: "Webhook Ingest",
    short: "Instant Capture",
    desc: "A prospect submits a form. Our system immediately captures the data payload, cleans it, and initiates the pipeline in less than 200ms.",
    icon: Activity,
    tech: "Vite / Deno Edge",
    stat: "+391% Reach",
    metric: "Latency: < 0.2s"
  },
  {
    id: 1,
    title: "Instant Response",
    short: "Speed-to-Lead SMS & Mail",
    desc: "Within 45 seconds, the prospect receives a highly personalized SMS and email greeting. This instant touch-point captures lead attention while they are hot.",
    icon: Mail,
    tech: "Twilio / SendGrid / LLM",
    stat: "9x Booking Rate",
    metric: "Response Time: 45s"
  },
  {
    id: 2,
    title: "CRM Synchronization",
    short: "Zero-Touch Data Flow",
    desc: "Client details are instantly synced into GoHighLevel or HubSpot. Custom tags are applied, a deal is created in the pipeline, and the sales team is alerted via Slack.",
    icon: Database,
    tech: "Make / Zapier / REST",
    stat: "100% Accurate",
    metric: "Manual Input: 0%"
  },
  {
    id: 3,
    title: "Autopilot Onboarding",
    short: "Instant Brief & Portal",
    desc: "Once booked, a Stripe invoice is sent, a Google Drive folder structure is generated, and a custom client portal link is emailed automatically.",
    icon: Sparkles,
    tech: "Node.js / Drive API",
    stat: "-15 Hrs Admin/Wk",
    metric: "Admin Friction: None"
  }
];

const SuccessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Auto-rotate steps in the simulator
  useEffect(() => {
    const timer = setInterval(() => {
      if (isHovered === null) {
        setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="py-32 px-6 lg:px-12 bg-white text-ink rounded-3xl mx-4 my-12 border border-ink/5 relative overflow-hidden">
      {/* Subtle decorative background gradient grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#cd7f32_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative z-10">
        
        {/* Copy Section */}
        <div className="space-y-12 lg:col-span-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-burnt-orange font-mono text-xs uppercase tracking-[0.4em] font-semibold">Scale System / 05</span>
              <div className="w-12 h-[1px] bg-burnt-orange/30" />
            </div>
            <h2 className="text-6xl md:text-8xl leading-[0.9] font-display uppercase tracking-tighter">
              Built for<br/><span className="text-burnt-orange">Success.</span>
            </h2>
          </div>

          <div className="space-y-8">
            <p className="text-xl font-light leading-relaxed text-ink/90 font-sans normal-case">
              Most small and medium-sized businesses lose up to 50% of their revenue to simple operational drag: delayed lead follow-ups, manual data entry, and slow onboarding. We build custom, automated pipeline architectures that eliminate administrative friction so your business can run on autopilot.
            </p>

            <div className="space-y-6 pt-4 border-t border-ink/10">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-steel flex items-center justify-center text-burnt-orange shrink-0 mt-1">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-sm uppercase tracking-wider font-bold text-ink">
                    Instant Engagement (Speed to Lead)
                  </h4>
                  <p className="text-sm text-ink/70 leading-relaxed font-mono">
                    A lead left waiting for 5 minutes is 10 times less likely to convert. Our automated flows trigger personalized text and email responses within seconds of form submission.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-steel flex items-center justify-center text-burnt-orange shrink-0 mt-1">
                  <Database size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-sm uppercase tracking-wider font-bold text-ink">
                    Seamless Data Flow & Sync
                  </h4>
                  <p className="text-sm text-ink/70 leading-relaxed font-mono">
                    No more manual copy-pasting. Customer records are instantly synchronized across your custom web hooks, CRM databases (GHL, HubSpot), and team channels like Slack.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-steel flex items-center justify-center text-burnt-orange shrink-0 mt-1">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-sm uppercase tracking-wider font-bold text-ink">
                    Hands-Free Client Onboarding
                  </h4>
                  <p className="text-sm text-ink/70 leading-relaxed font-mono">
                    The moment a client signs, pipelines generate standard invoices, spin up secure file storage, create Slack rooms, and dispatch project briefs automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-ink text-white px-8 py-5 rounded-none font-display text-sm tracking-[0.2em] font-bold hover:bg-burnt-orange hover:text-white transition-all duration-500 uppercase shadow-lg hover:translate-x-1"
              >
                Scale Your Pipeline <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Live Simulator Section */}
        <div className="lg:col-span-6 w-full relative">
          <div className="bg-ink p-6 md:p-10 rounded-[32px] shadow-2xl text-paper relative overflow-hidden border border-white/5">
            {/* Visual Header */}
            <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
              </div>
              <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest uppercase text-burnt-orange animate-pulse flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-burnt-orange rounded-full animate-ping" />
                Pipeline Active
              </div>
            </div>

            {/* Pipeline Steps Tracker */}
            <div className="space-y-6 relative z-10">
              {pipelineSteps.map((step, idx) => {
                const StepIcon = step.icon;
                const isActive = activeStep === idx;
                
                return (
                  <div
                    key={step.id}
                    onMouseEnter={() => {
                      setIsHovered(idx);
                      setActiveStep(idx);
                    }}
                    onMouseLeave={() => setIsHovered(null)}
                    className={`relative p-5 rounded-2xl border transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? 'bg-white/10 border-burnt-orange/50 shadow-[0_0_20px_rgba(205,127,50,0.15)] translate-x-2' 
                        : 'bg-white/[0.02] border-white/5 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex gap-5 items-start">
                      {/* Animated step circle */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                        isActive 
                          ? 'bg-burnt-orange text-white scale-110 shadow-lg' 
                          : 'bg-white/5 text-paper'
                      }`}>
                        <StepIcon size={22} className={isActive ? 'animate-pulse' : ''} />
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className={`font-mono text-xs uppercase tracking-widest font-bold transition-colors ${
                            isActive ? 'text-burnt-orange' : 'text-paper'
                          }`}>
                            0{idx + 1} // {step.title}
                          </h3>
                          <span className="text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded text-white/50">
                            {step.tech}
                          </span>
                        </div>
                        <p className="text-xs text-white/80 font-mono font-medium tracking-wide">
                          {step.short}
                        </p>
                        
                        {/* Animated description expansion */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-3 pt-3 border-t border-white/5 space-y-3"
                            >
                              <p className="text-[11px] text-white/60 leading-relaxed font-mono">
                                {step.desc}
                              </p>
                              <div className="flex justify-between items-center text-[10px] font-mono pt-1">
                                <span className="text-burnt-orange font-bold uppercase tracking-wider bg-burnt-orange/10 px-2 py-1 rounded">
                                  {step.stat}
                                </span>
                                <span className="text-white/40 italic">
                                  {step.metric}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom aggregate metrics for WOW element */}
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Time Reclaimed</p>
                <p className="font-display text-2xl text-burnt-orange">~15h/wk</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Speed to Lead</p>
                <p className="font-display text-2xl text-burnt-orange">&lt; 45s</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Accuracy Rate</p>
                <p className="font-display text-2xl text-burnt-orange">100%</p>
              </div>
            </div>

            {/* Glowing gradient background sphere */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-burnt-orange/10 rounded-full blur-[100px] pointer-events-none" />
          </div>

          {/* Floater Success Badge */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-8 -right-8 bg-burnt-orange p-6 rounded-full flex flex-col items-center justify-center text-white w-28 h-28 shadow-2xl border-4 border-white z-20"
          >
            <span className="font-display text-2xl">99%</span>
            <span className="text-[9px] font-bold uppercase tracking-tight font-sans">Conversion</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SuccessSection;
