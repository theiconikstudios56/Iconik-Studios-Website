import { motion } from 'motion/react';
import { ArrowRight, Mail, MapPin, Phone, Instagram, Twitter, Linkedin } from 'lucide-react';
import IconikLogo from './IconikLogo';

export default function Contact() {
  return (
    <section data-bg="dark" id="contact" className="relative bg-ink text-tan overflow-hidden flex flex-col py-16">
      {/* Massive Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] z-0">
        <h2 className="text-[40vw] font-display leading-none tracking-tighter uppercase whitespace-nowrap">
          ICONIK
        </h2>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row z-10">
        {/* Left Side: Info & Branding */}
        <div className="lg:w-1/2 p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-tan/10">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="w-24 h-24 mb-8">
                <IconikLogo color="#F5F2ED" />
              </div>
              <span className="text-[10px] font-mono text-burnt-orange tracking-[0.5em] uppercase">04 // CONTACT</span>
            </motion.div>

            <h2 className="text-5xl sm:text-7xl md:text-[8vw] font-display leading-[0.85] mb-12 tracking-tighter uppercase">
              LET'S START <br />
              <span className="text-burnt-orange">SOMETHING.</span>
            </h2>

            <div className="space-y-8 max-w-md">
              <p className="text-lg opacity-100 leading-tight">
                We're always looking for bold partners and visionary projects. 
                Drop us a line and let's build the future of digital artifacts together.
              </p>
              
              <div className="pt-8 space-y-4">
                <a href="mailto:hello@theiconikstudios.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-tan/20 flex items-center justify-center group-hover:bg-burnt-orange group-hover:border-burnt-orange transition-all">
                    <Mail size={16} />
                  </div>
                  <span className="font-mono text-sm tracking-widest uppercase group-hover:text-burnt-orange transition-colors">hello@theiconikstudios.com</span>
                </a>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-tan/20 flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <span className="font-mono text-sm tracking-widest uppercase">Austin, Texas // Worldwide</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 flex gap-8">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -4, color: "#cd7f32" }}
                className="opacity-80 hover:opacity-100 transition-all"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-1/2 p-8 sm:p-10 md:p-12 lg:p-16 bg-tan/5 backdrop-blur-sm">
          <div className="max-w-xl mx-auto">
            <div className="mb-16 flex justify-between items-end">
              <h3 className="text-4xl font-display tracking-tight uppercase">Send Inquiry</h3>
              <span className="font-mono text-[10px] opacity-100">[ FORM_ID: 0x4492 ]</span>
            </div>

            <form className="space-y-12">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-100">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-tan/10 py-4 focus:outline-none focus:border-burnt-orange transition-colors font-mono text-sm placeholder:opacity-10"
                  placeholder="ENTER YOUR NAME"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-100">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-tan/10 py-4 focus:outline-none focus:border-burnt-orange transition-colors font-mono text-sm placeholder:opacity-10"
                  placeholder="YOUR@EMAIL.COM"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-100">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-transparent border-b border-tan/10 py-4 focus:outline-none focus:border-burnt-orange transition-colors resize-none font-mono text-sm placeholder:opacity-10"
                  placeholder="TELL US ABOUT YOUR VISION..."
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-8 bg-burnt-orange text-ink font-display text-2xl tracking-widest flex items-center justify-center gap-4 hover:bg-white transition-all group"
              >
                SEND MESSAGE <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Rail */}
      <div className="h-20 border-t border-tan/10 px-8 flex items-center justify-between z-10">
        <div className="text-xl font-display tracking-tighter">ICONIK_STUDIOS</div>
        <div className="hidden md:block text-[10px] font-mono uppercase tracking-[0.4em] opacity-80">
          © 2026 ICONIK STUDIOS. ALL RIGHTS RESERVED.
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-100">
          EST. 2024 // ATX
        </div>
      </div>

    </section>
  );
}
