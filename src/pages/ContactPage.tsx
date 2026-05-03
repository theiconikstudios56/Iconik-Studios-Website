import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [index, setIndex] = useState(0);
  const words = ['create', 'work', 'live', 'love'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    // No scroll lock to ensure form accessibility
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout>
      <div className="bg-black text-white selection:bg-burnt-orange selection:text-white min-h-screen flex items-center justify-center py-32 lg:pt-48 lg:pb-32">
        <section className="w-full px-6 md:px-12 max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 overflow-hidden bg-black shadow-2xl">
            
            {/* Left Half: Content */}
            <div className="p-8 md:p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between min-h-[500px] lg:min-h-0">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-100 mb-8 block">/ Get in Touch</span>
                
                {/* Animated Text CTA */}
                <div className="mb-12">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-tight leading-[1.1] flex flex-wrap items-center gap-x-4">
                    <span>let’s</span>
                    <span className="relative inline-block h-[1.3em] overflow-hidden min-w-[250px] md:min-w-[350px] lg:min-w-[450px]">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={words[index]}
                          initial={{ x: '30%', opacity: 0 }}
                          animate={{ x: '0%', opacity: 1 }}
                          exit={{ x: '-30%', opacity: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            ease: [0.23, 1, 0.32, 1]
                          }}
                          className="text-burnt-orange absolute inset-0 flex items-center whitespace-nowrap"
                        >
                          {words[index]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <br className="hidden lg:block w-full" />
                    <span>together</span>
                  </h2>
                </div>

                {/* Contact Details */}
                <div className="space-y-8 mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-3 block">/ write to us</span>
                      <div className="space-y-4">
                        <a href="tel:7049007150" className="group block">
                          <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-1 block">Phone</span>
                          <span className="text-lg font-display group-hover:text-burnt-orange transition-colors">704.900.7150</span>
                        </a>
                        <a href="mailto:hello@iconik.com" className="group block">
                          <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-1 block">General Inquiry</span>
                          <span className="text-lg font-display group-hover:text-burnt-orange transition-colors">hello@iconik.com</span>
                        </a>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-3 block">/ meet us</span>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 block">Address</span>
                        <p className="text-lg font-display uppercase tracking-tight leading-tight">
                          Iconik Studios<br />
                          704 Morris Street<br />
                          Charlotte, NC 28202
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="flex gap-6 border-t border-white/10 pt-8">
                {['IN', 'IG', 'VI', 'X', 'FB'].map(social => (
                  <a key={social} href="#" className="font-mono text-[10px] uppercase tracking-[0.4em] hover:text-burnt-orange transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Half: Form */}
            <div className="p-8 md:p-12 lg:p-16 bg-white/5 overflow-y-auto">
              <div className="max-w-xl">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-100 mb-8 block">/ Send a Message</span>
                
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest opacity-80">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Your Name"
                        className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-burnt-orange transition-colors font-sans text-sm placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest opacity-80">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="hello@example.com"
                        className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-burnt-orange transition-colors font-sans text-sm placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest opacity-80">Subject</label>
                    <select className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-burnt-orange transition-colors font-sans text-sm appearance-none cursor-pointer">
                      <option className="bg-black">General Inquiry</option>
                      <option className="bg-black">Project Proposal</option>
                      <option className="bg-black">Partnership</option>
                      <option className="bg-black">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest opacity-80">Message</label>
                    <textarea 
                      rows={3}
                      placeholder="Tell us about your project..."
                      className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-burnt-orange transition-colors resize-none font-sans text-sm placeholder:text-white/20"
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-burnt-orange text-white font-mono text-xs tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group"
                  >
                    Send Message <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.button>
                </form>

                <div className="mt-8 text-[10px] font-mono opacity-80 uppercase tracking-widest">
                  * We usually respond within 24-48 hours.
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </Layout>
  );
}
