import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, Globe, Instagram, Linkedin, Twitter, Menu, X, ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import SuccessSection from '../components/SuccessSection';
import ClientLogos from '../components/ClientLogos';
import Layout from '../components/Layout';
import HomesContact from '../components/HomesContact';
import LatestInsights from '../components/LatestInsights';

import FinalCTA from '../components/FinalCTA';
import { Img, T, useEditor, useImage } from '../content';

// Missing icons in provided snippet's import line relative to usage (Code, Cpu, Sparkles were mentioned but not strictly used in core loops, but I'll keeping them if they are in the list)

const Hero = () => {
  return (
    <section className="relative min-h-[110vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <Img k="homes.image-modern-architecture" label="Picture" 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Architecture" 
          className="w-full h-full object-cover grayscale opacity-20 brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink" />
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-5xl">
        <motion.div
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-12 h-[1px] bg-paper" />
            <span className="text-[10px] uppercase tracking-[0.6em] font-medium opacity-100 italic"><T k="homes.established-mmxxvi">{"Established MMXXVI"}</T></span>
            <div className="w-12 h-[1px] bg-paper" />
          </div>

          <h1 className="mb-12 text-paper"><T k="homes.iconik-studios" em="text-outline" label="Heading">{"Iconik\n*Studios*"}</T></h1>

          <div className="max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-sans normal-case opacity-100 leading-relaxed font-light text-paper"><T k="homes.we-design-and-build" label="Heading">{"We design and build digital experiences through strategy, branding, and intelligent technology."}</T></h2>
          </div>
        </motion.div>
      </div>

      {/* Floating Meta Details */}
      <div className="absolute bottom-12 w-full px-12 flex flex-col md:flex-row justify-between items-end gap-8 opacity-80 text-paper">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest font-semibold"><T k="homes.our-expertise">{"Our Expertise"}</T></p>
          <p className="text-sm"><T k="homes.web-ai-automation">{"Web / AI / Automation"}</T></p>
        </div>
        <div className="flex items-center gap-2 animate-bounce cursor-pointer">
          <p className="text-[10px] uppercase tracking-widest font-semibold opacity-100"><T k="homes.scroll-to-explore">{"Scroll to explore"}</T></p>
          <ChevronDown size={14} />
        </div>
        <div className="text-right space-y-1">
          <p className="text-[10px] uppercase tracking-widest font-semibold"><T k="homes.status">{"Status"}</T></p>
          <p className="text-sm flex items-center gap-2 justify-end">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /><T k="homes.active-26">{"Active ©26"}</T></p>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ 
  project, 
  index 
}: { 
  project: any, 
  index: number,
  key?: React.Key
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const image = useImage(`homes.work.${index + 1}.image`, project.image, { label: `Project ${index + 1}: picture` });
  const editing = useEditor().on;

  return (
    <motion.div 
      ref={containerRef}
      style={{ scale }}
      className="relative group h-[80vh] w-full mt-[10vh] overflow-hidden rounded-[40px] sticky top-[10vh]"
    >
      <motion.img 
        style={{ y }}
        src={image} 
        alt={project.title}
        {...(editing ? { 'data-img-k': `homes.work.${index + 1}.image` } : {})}
        className="absolute inset-0 w-full h-[120%] object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Floating project logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
        <div className="w-32 h-32 bg-paper/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
          <Globe className="text-paper" size={48} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-12 mask-fade-up">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-paper">
              <span className="font-display text-2xl text-accent">0{index + 1}</span>
              <div className="w-12 h-[1px] bg-paper/50" />
            </div>
            <h2 className="text-6xl md:text-8xl tracking-tighter text-paper"><T k={`homes.work.${index + 1}.title`} label={`Project ${index + 1}: name`}>{project.title}</T></h2>
            <p className="text-xl font-light tracking-wide text-paper"><T k={`homes.work.${index + 1}.category`} label={`Project ${index + 1}: category`}>{project.category}</T></p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 45 }}
            className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors text-paper"
          >
            <ArrowUpRight size={40} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Showcase = () => {
  const projects = [
    { title: "Forma Digital", category: "AI Search Architecture", image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80&w=2000" },
    { title: "Nero Vision", category: "Neural Design System", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=2000" },
    { title: "One Step", category: "E-Commerce Automation", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" },
    { title: "Bold Moves", category: "Brand Intelligence", image: "https://images.unsplash.com/photo-1614850523296-d8c1c99f2a21?auto=format&fit=crop&q=80&w=2000" },
  ];

  return (
    <section id="work" className="px-6 lg:px-12 pb-[20vh]">
      <div className="max-w-7xl mx-auto space-y-[10vh]">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

const ServiceMarquee = () => {
  const services = ["Web Design", "AI Automation", "Social Media", "Marketing", "Branding", "UI/UX Strategy"];
  
  return (
    <section className="py-32 bg-paper text-ink overflow-hidden border-y border-ink/10">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-24 mx-12">
            {services.map((service, j) => (
              <div key={service} className="flex items-center gap-12">
                <span className="text-8xl md:text-[10vw] font-display uppercase leading-none tracking-tighter hover:text-accent transition-colors cursor-pointer"><T k={`homes.marquee.${j + 1}`} label={`Moving banner word ${j + 1}`}>{service}</T></span>
                <div className="w-8 h-8 rounded-full bg-accent animate-pulse" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

const ServicesGrid = () => {
  const items = [
    { id: '001', title: 'Web Design', desc: 'Modern, responsive, and user-friendly websites designed to drive growth.', tags: ['UX', 'React', 'Motion'] },
    { id: '002', title: 'AI Automation', desc: 'Custom intelligent agents built to scale your business workflows.', tags: ['LLM', 'Python', 'Agentic'] },
    { id: '003', title: 'Brand Identity', desc: 'Cohesive visual systems that communicate credibility and luxury.', tags: ['Logo', 'Type', 'Aesthetic'] },
    { id: '004', title: 'Marketing', desc: 'Strategic asset deployment across high-impact digital channels.', tags: ['Ads', 'Growth', 'SEO'] },
  ];

  return (
    <section id="services" className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {items.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group grid grid-cols-1 md:grid-cols-4 gap-12 py-16 border-b border-white/10 hover:bg-white/5 px-6 transition-all duration-500 rounded-3xl"
            >
              <span className="font-display text-xl text-accent">{item.id}</span>
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-5xl font-display text-paper"><T k={`homes.services.${i + 1}.title`} label={`Service ${i + 1}: name`}>{item.title}</T></h3>
                <p className="max-w-md text-lg font-light text-paper opacity-100"><T k={`homes.services.${i + 1}.text`} label={`Service ${i + 1}: text`}>{item.desc}</T></p>
              </div>
              <div className="flex flex-wrap gap-3 content-start">
                {item.tags.map((tag, j) => (
                  <span key={tag} className="px-4 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-semibold group-hover:border-accent transition-colors text-paper">
                    <T k={`homes.services.${i + 1}.tag${j + 1}`} label={`Service ${i + 1}: tag ${j + 1}`}>{tag}</T>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    { name: 'Starter', price: '$2,000', items: ['Tailored layouts', 'Core SEO', 'Mobile-first', 'UI Framework'] },
    { name: 'Growth', price: '$4,000', items: ['Neural interactions', 'Complete SEO', 'Adaptive design', 'CMS Setup', 'Optimsation'], featured: true },
  ];

  return (
    <section id="pricing" className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-7xl md:text-9xl text-paper"><T k="homes.pricing" label="Heading">{"Pricing"}</T></h2>
          <p className="max-w-xl mx-auto text-xl font-light text-paper opacity-100"><T k="homes.basics-to-high-performance">{"Basics to high-performance ecosystems."}</T></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <motion.div 
              key={plan.name}
              whileHover={{ y: -10 }}
              className={`p-12 h-fit rounded-[40px] border border-white/10 space-y-12 ${plan.featured ? 'bg-white text-ink' : 'bg-white/5'}`}
            >
              <div className="space-y-4">
                <h3 className={`text-4xl font-display ${!plan.featured ? 'text-paper' : ''}`}><T k={`homes.plans.${i + 1}.name`} label={`Plan ${i + 1}: name`}>{plan.name}</T></h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-7xl font-display ${!plan.featured ? 'text-paper' : ''}`}><T k={`homes.plans.${i + 1}.price`} label={`Plan ${i + 1}: price`}>{plan.price}</T></span>
                  <span className={`text-sm opacity-100 ${!plan.featured ? 'text-paper' : ''}`}><T k="homes.project">{"/project"}</T></span>
                </div>
              </div>
              <div className="w-full h-px bg-current opacity-10" />
              <ul className="space-y-6">
                {plan.items.map((item, j) => (
                  <li key={item} className={`flex items-center gap-4 text-sm font-semibold tracking-wide ${!plan.featured ? 'text-paper' : ''}`}>
                    <Check size={18} className="text-accent" />
                    <T k={`homes.plans.${i + 1}.item${j + 1}`} label={`Plan ${i + 1}: item ${j + 1}`}>{item}</T>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-6 rounded-full font-display text-xl uppercase transition-all ${plan.featured ? 'bg-ink text-paper hover:bg-accent' : 'bg-paper text-ink hover:bg-accent'}`}><T k="homes.get-started" label="Button">{"Get Started"}</T></button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [active, setActive] = useState<number | null>(0);
  const questions = [
    { q: "What services do you offer?", a: "We specialize in branding, website design, and AI-powered workflow automation." },
    { q: "How long is a project timeline?", a: "Standard builds take 4-8 weeks depending on integration complexity." },
    { q: "Do you work with any industry?", a: "Yes, our strategy is sector-agnostic, focusing on growth fundamentals." },
  ];

  return (
    <section className="py-32 px-6 lg:px-12 bg-ink">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-8 sticky top-32 h-fit">
          <h2 className="text-7xl md:text-9xl text-paper"><T k="homes.faq" label="Heading">{"FAQ"}</T></h2>
          <p className="max-w-sm text-xl font-light text-paper opacity-100"><T k="homes.everything-you-need-to">{"Everything you need to know before we launch."}</T></p>
        </div>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="bg-white/5 rounded-3xl overflow-hidden">
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full p-8 flex justify-between items-center text-left"
              >
                <div className="flex items-center gap-8 text-paper">
                  <span className="font-display opacity-30">0{i + 1}</span>
                  <span className="text-base md:text-lg font-mono uppercase"><T k={`homes.faq.${i + 1}.q`} label={`Question ${i + 1}`}>{item.q}</T></span>
                </div>
                <motion.div animate={{ rotate: active === i ? 45 : 0 }} className="text-paper">
                  <X size={24} />
                </motion.div>
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="px-8 pb-8"
                  >
                    <p className="text-lg opacity-100 font-light leading-relaxed text-paper"><T k={`homes.faq.${i + 1}.a`} label={`Question ${i + 1}: answer`}>{item.a}</T></p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function HomesPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <Layout
      page="homes"
      title="Real Estate Web Design | Iconik Homes | Iconik Studios"
      description="Premium web design and AI property search solutions tailored for luxury real estate professionals."
    >
      <div className="relative z-10 bg-ink text-paper selection:bg-accent selection:text-ink overflow-x-hidden min-h-screen">
        <Hero />
        <Showcase />
        <ServiceMarquee />
        <ServicesGrid />
        <SuccessSection />
        <ClientLogos />
        <LatestInsights />
        <Pricing />
        <FAQ />
      </div>
    </Layout>
  );
}
