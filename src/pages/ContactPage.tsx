import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { trackLead } from '../lib/rmdTracking';
import { loadTurnstile, TURNSTILE_SITE_KEY } from '../lib/rmdChat';
import { ContactError, sendContact } from '../lib/rmdContact';
import { T } from '../content';

export default function ContactPage() {
  const [index, setIndex] = useState(0);
  const words = ['create', 'work', 'live', 'love'];

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot: people never see it

  // Cloudflare Turnstile (the same spam check as the chat): usually invisible.
  const [token, setToken] = useState('');
  const [turnstileBox, setTurnstileBox] = useState<HTMLDivElement | null>(null); // set once the form is on screen
  const widget = useRef<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!turnstileBox) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widget.current = window.turnstile.render(turnstileBox, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          size: 'flexible',
          appearance: 'interaction-only',
          callback: (t: string) => setToken(t),
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        });
      })
      .catch(() => {
        setStatus('error');
        setErrorMessage('The spam check couldn’t load. Please refresh the page, or email remedy@theiconikstudios.com.');
      });
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
      setToken('');
    };
  }, [turnstileBox]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }
    if (!token) {
      setStatus('error');
      setErrorMessage('One moment: the spam check is still running. Please try again in a few seconds.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await sendContact(
        { name: name.trim(), email: email.trim(), phone: phone.trim(), company: company.trim(), message: message.trim() },
        token,
        website
      );
      trackLead('contact-form');
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      const fields = err instanceof ContactError ? Object.values(err.fields).filter(Boolean) : [];
      setErrorMessage(
        fields.length > 0 ? fields.join(' ') : err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
      // A Turnstile token works once: get a fresh one for the next try.
      setToken('');
      if (widget.current) window.turnstile?.reset(widget.current);
    }
  };

  return (
    <Layout
      page="contact"
      title="Contact Us | Start Your Project | Iconik Studios"
      description="Ready to elevate your digital presence? Contact Iconik Studios today to discuss custom web development and automation solutions."
    >
      <div className="bg-black text-white selection:bg-burnt-orange selection:text-white min-h-screen flex items-center justify-center py-32 lg:pt-48 lg:pb-32">
        <section className="w-full px-6 md:px-12 max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 overflow-hidden bg-black shadow-2xl">
            
            {/* Left Half: Content */}
            <div className="p-8 md:p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between min-h-[500px] lg:min-h-0">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-100 mb-8 block"><T k="contact.get-in-touch">{"/ Get in Touch"}</T></span>
                
                {/* Animated Text CTA */}
                <div className="mb-12">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-tight leading-[1.1] flex flex-wrap items-center gap-x-4">
                    <span><T k="contact.lets" label="Heading">{"let’s"}</T></span>
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
                    <span><T k="contact.together" label="Heading">{"together"}</T></span>
                  </h2>
                </div>

                {/* Contact Details */}
                <div className="space-y-8 mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-3 block"><T k="contact.write-to-us">{"/ write to us"}</T></span>
                      <div className="space-y-4">
                        <a href="tel:6232618824" className="group block">
                          <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-1 block"><T k="contact.phone" label="Link or button">{"Phone"}</T></span>
                          <span className="text-lg font-display group-hover:text-burnt-orange transition-colors"><T k="contact.623-261-8824" label="Link or button">{"623.261.8824"}</T></span>
                        </a>
                        <a href="mailto:remedy@theiconikstudios.com" className="group block">
                          <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-1 block"><T k="contact.general-inquiry" label="Link or button">{"General Inquiry"}</T></span>
                          <span className="text-lg font-display group-hover:text-burnt-orange transition-colors"><T k="contact.remedy-theiconikstudios-com" label="Link or button">{"remedy@theiconikstudios.com"}</T></span>
                        </a>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-3 block"><T k="contact.meet-us">{"/ meet us"}</T></span>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 block"><T k="contact.address">{"Address"}</T></span>
                        <p className="text-lg font-display uppercase tracking-tight leading-tight"><T k="contact.iconik-studios-metaverse">{"Iconik Studios\nMetaverse"}</T></p>
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
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-100 mb-8 block"><T k="contact.send-a-message">{"/ Send a Message"}</T></span>
                
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
                      <h3 className="text-3xl font-display uppercase tracking-tight"><T k="contact.weve-got-it" label="Subheading">{"We've Got It."}</T></h3>
                      <p className="text-white/60 text-sm leading-relaxed max-w-sm"><T k="contact.thanks-for-taking-the">{"Thanks for taking the time to fill this out. The Iconik Studios team will be in touch within 1–2 business days."}</T></p>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="mt-4 px-6 py-3 border border-white/20 hover:border-white font-mono text-[10px] uppercase tracking-widest transition-colors"
                      ><T k="contact.send-another-message" label="Button">{"Send Another Message"}</T></button>
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
                        <label className="text-[10px] font-mono uppercase tracking-widest opacity-80"><T k="contact.full-name" label="Form label">{"Full Name"}</T> <span className="text-burnt-orange">*</span></label>
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
                          <label className="text-[10px] font-mono uppercase tracking-widest opacity-80"><T k="contact.email-address" label="Form label">{"Email Address"}</T> <span className="text-burnt-orange">*</span></label>
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
                          <label className="text-[10px] font-mono uppercase tracking-widest opacity-80"><T k="contact.phone-number" label="Form label">{"Phone Number"}</T> <span className="text-burnt-orange">*</span></label>
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
                        <label className="text-[10px] font-mono uppercase tracking-widest opacity-80"><T k="contact.business-name" label="Form label">{"Business Name"}</T></label>
                        <input 
                          type="text" 
                          placeholder="Your Company / Business"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          disabled={status === 'submitting'}
                          className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-burnt-orange transition-colors font-sans text-sm placeholder:text-white/20 disabled:opacity-50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest opacity-80"><T k="contact.message" label="Form label">{"Message"}</T> <span className="text-burnt-orange">*</span></label>
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

                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                      <div ref={setTurnstileBox} />

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
                            <T k="contact.sending">Sending...</T> <Loader2 size={18} className="animate-spin" />
                          </>
                        ) : (
                          <>
                            <T k="contact.send-message" label="Button">Send Message</T> <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>

                <div className="mt-8 text-[10px] font-mono opacity-80 uppercase tracking-widest"><T k="contact.we-usually-respond-within">{"* We usually respond within 24-48 hours."}</T></div>
                <div className="mt-3 text-[10px] font-mono opacity-80 uppercase tracking-widest">
                  <a
                    href="https://rmd.theiconikstudios.com/privacy"
                    target="_blank"
                    rel="noopener"
                    className="border-b border-white/30 hover:border-white hover:opacity-100 transition-all"
                  ><T k="contact.privacy-policy" label="Link or button">{"Privacy Policy"}</T></a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </Layout>
  );
}

