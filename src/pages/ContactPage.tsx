import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ContactPage() {
  const [index, setIndex] = useState(0);
  const words = ['create', 'work', 'live', 'love'];

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setStatus('submitting');

    setErrorMessage('');

    const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL;

    if (!webhookUrl) {
      // If webhook URL is not configured yet, let's show a helpful error
      setStatus('error');
      setErrorMessage(
        'Webhook URL is not configured. Please define VITE_CONTACT_WEBHOOK_URL in your .env.local file.'
      );
      return;
    }

    try {
      const trimmedName = name.trim();
      const spaceIndex = trimmedName.indexOf(' ');
      let firstName = trimmedName;
      let lastName = '';

      if (spaceIndex !== -1) {
        firstName = trimmedName.substring(0, spaceIndex);
        lastName = trimmedName.substring(spaceIndex + 1).trim();
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          firstName,
          lastName,
          email,
          phone,
          subject,
          message,
          submittedAt: new Date().toISOString(),
          source: 'Contact Page Form'
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        throw new Error(`Server returned status code ${response.status}`);
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(
        err.message || 'Something went wrong while submitting the form. Please try again.'
      );
    }
  };

  return (
    <Layout
      title="Contact Us | Start Your Project | Iconik Studios"
      description="Ready to elevate your digital presence? Contact Iconik Studios today to discuss custom web development and automation solutions."
    >
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
                
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="py-12 flex flex-col items-center text-center space-y-6"
                    >
                      <CheckCircle2 className="text-burnt-orange w-16 h-16" />
                      <h3 className="text-3xl font-display uppercase tracking-tight">We've Got It.</h3>
                      <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                        Thanks for taking the time to fill this out. The Iconik Studios team will be in touch within 1–2 business days.
                      </p>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="mt-4 px-6 py-3 border border-white/20 hover:border-white font-mono text-[10px] uppercase tracking-widest transition-colors"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit} 
                      className="space-y-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest opacity-80">Full Name <span className="text-burnt-orange">*</span></label>
                        <input 
                          type="text" 
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={status === 'submitting'}
                          className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-burnt-orange transition-colors font-sans text-sm placeholder:text-white/20 disabled:opacity-50"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest opacity-80">Email Address <span className="text-burnt-orange">*</span></label>
                          <input 
                            type="email" 
                            placeholder="hello@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={status === 'submitting'}
                            className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-burnt-orange transition-colors font-sans text-sm placeholder:text-white/20 disabled:opacity-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest opacity-80">Phone Number <span className="text-burnt-orange">*</span></label>
                          <input 
                            type="tel" 
                            placeholder="+1 (000) 000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            disabled={status === 'submitting'}
                            className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-burnt-orange transition-colors font-sans text-sm placeholder:text-white/20 disabled:opacity-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest opacity-80">Subject</label>
                        <select 
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          disabled={status === 'submitting'}
                          className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-burnt-orange transition-colors font-sans text-sm appearance-none cursor-pointer disabled:opacity-50"
                        >
                          <option className="bg-black" value="General Inquiry">General Inquiry</option>
                          <option className="bg-black" value="Project Proposal">Project Proposal</option>
                          <option className="bg-black" value="Partnership">Partnership</option>
                          <option className="bg-black" value="Other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest opacity-80">Message <span className="text-burnt-orange">*</span></label>
                        <textarea 
                          rows={3}
                          placeholder="Tell us about your project..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          disabled={status === 'submitting'}
                          className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-burnt-orange transition-colors resize-none font-sans text-sm placeholder:text-white/20 disabled:opacity-50"
                        />
                      </div>

                      {status === 'error' && (
                        <div className="bg-burnt-orange/10 border border-burnt-orange/30 p-4 text-xs font-sans text-burnt-orange flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <motion.button 
                        type="submit"
                        disabled={status === 'submitting'}
                        whileHover={status !== 'submitting' ? { scale: 1.02 } : undefined}
                        whileTap={status !== 'submitting' ? { scale: 0.98 } : undefined}
                        className="w-full py-5 bg-burnt-orange text-white font-mono text-xs tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed"
                      >
                        {status === 'submitting' ? (
                          <>
                            Sending... <Loader2 size={18} className="animate-spin" />
                          </>
                        ) : (
                          <>
                            Send Message <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>

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

