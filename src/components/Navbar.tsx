import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Instagram, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IconikLogo from './IconikLogo';

const MENU_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { 
    name: 'Services', 
    path: '#',
    subItems: [
      { name: 'Web Design', path: '/services/web-design' },
      { name: 'AI Workflows', path: '/services/ai-automation' },
      { name: 'Maintenance', path: '/services/maintenance' },
    ]
  },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveSubMenu(null);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        {/* Logo Square */}
        <div className="flex-1 lg:flex-none">
          <Link to="/" className="pointer-events-auto inline-block">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-ink w-24 h-24 flex items-center justify-center group"
            >
              <div className="w-14 h-14 text-accent group-hover:scale-110 transition-transform duration-500">
                 <IconikLogo color="#F5F2ED" />
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Nav Links - Center (Hidden on small) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-10 bg-ink/30 backdrop-blur-md px-10 py-5 border border-white/10 rounded-full pointer-events-auto">
          {MENU_ITEMS.map((item) => (
            <div 
              key={item.name} 
              className="relative group/item"
              onMouseEnter={() => item.subItems && setActiveSubMenu(item.name)}
              onMouseLeave={() => setActiveSubMenu(null)}
            >
              <Link 
                to={item.path} 
                className={`text-[11px] uppercase tracking-[0.25em] font-bold hover:text-accent transition-colors flex items-center gap-2 ${location.pathname === item.path || (item.subItems && item.subItems.some(sub => location.pathname === sub.path)) ? 'text-accent' : 'text-paper'}`}
              >
                {item.name}
                {item.subItems && <ChevronDown size={12} className="group-hover/item:rotate-180 transition-transform duration-300" />}
              </Link>

              {item.subItems && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-300">
                  <div className="bg-ink/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl min-w-[240px] shadow-2xl">
                    <div className="flex flex-col gap-4">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className={`text-[10px] uppercase tracking-[0.2em] font-bold py-2 px-4 rounded-xl hover:bg-accent hover:text-ink transition-all ${location.pathname === sub.path ? 'bg-accent/20 text-accent' : 'text-paper hover:text-ink'}`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Area - Right */}
        <div className="flex-1 lg:flex-none flex items-center justify-end gap-5 pointer-events-auto">
          <Link to="/contact">
            <button className="bg-paper text-ink px-10 py-5 rounded-full font-display text-base tracking-widest hover:bg-accent transition-all hover:-translate-y-1">
              LET'S TALK
            </button>
          </Link>
          <button 
            onClick={toggleMenu}
            className="w-16 h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors text-paper"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Full Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink flex"
          >
            <div className="absolute top-10 right-10 z-[110]">
              <button 
                onClick={toggleMenu}
                className="w-16 h-16 bg-paper text-ink rounded-full flex items-center justify-center"
              >
                <X size={32} />
              </button>
            </div>

            {/* Left: Background image/pattern */}
            <div className="hidden lg:block w-1/2 relative bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
              <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
            </div>

            {/* Right: Links */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-12 lg:p-24 space-y-8 overflow-y-auto">
              <span className="text-accent font-serif italic text-xl">Menu</span>
              <div className="space-y-6">
                {MENU_ITEMS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {!link.subItems ? (
                      <Link
                        to={link.path}
                        onClick={toggleMenu}
                        className="block text-5xl md:text-8xl font-display group relative"
                      >
                        <span className={`relative z-10 group-hover:text-accent transition-colors ${location.pathname === link.path ? 'text-accent' : 'text-paper'}`}>
                          {link.name}
                        </span>
                        <motion.div 
                          className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-500" 
                        />
                      </Link>
                    ) : (
                      <div className="space-y-4 py-4">
                        <span className="block text-2xl font-mono text-accent uppercase tracking-widest">{link.name}</span>
                        <div className="flex flex-col gap-4">
                          {link.subItems.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={toggleMenu}
                              className="block text-4xl md:text-7xl font-display text-paper hover:text-accent transition-colors tracking-tighter"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="pt-12 flex gap-8 text-paper">
                <Instagram className="hover:text-accent cursor-pointer transition-colors" />
                <Linkedin className="hover:text-accent cursor-pointer transition-colors" />
                <Twitter className="hover:text-accent cursor-pointer transition-colors" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
