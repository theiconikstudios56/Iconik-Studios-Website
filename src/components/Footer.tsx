import React from 'react';

const Footer = () => {
  return (
    <footer className="pt-32 pb-12 px-6 lg:px-12 bg-ink border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-8">
             <div className="flex items-center gap-1">
                <span className="text-4xl font-display tracking-tighter text-paper">ICONIK</span>
                <span className="text-4xl font-display tracking-tighter text-paper text-outline opacity-100">STUDIOS</span>
             </div>
             <p className="max-w-xs font-light text-paper opacity-100">We architect digital futures through design and intelligence.</p>
          </div>
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-100 text-paper">Quick Links</p>
            <div className="flex flex-col gap-4 text-sm text-paper">
              <a href="#" className="hover:text-accent font-semibold transition-colors">Instagram</a>
              <a href="#" className="hover:text-accent font-semibold transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-accent font-semibold transition-colors">Twitter</a>
            </div>
          </div>
          <div className="space-y-6 text-paper">
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-100">Contact</p>
            <div className="text-sm font-semibold space-y-2">
              <p>Iconik Studios HQ</p>
              <p>401 Digital Street</p>
              <p>hello@iconik.studios</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <p className="text-[10px] uppercase tracking-[0.4em] font-semibold opacity-80 text-paper">© 2026 Iconik Studios / All Rights Reserved</p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold opacity-100 text-paper">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms of service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
