import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './Navbar';
import BackgroundTransition from './BackgroundTransition';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative selection:bg-burnt-orange selection:text-white min-h-screen bg-white">
      {/* Background Transition Manager */}
      <BackgroundTransition />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-burnt-orange z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <div className="relative z-10">
        {children}
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-burnt-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-deep-green/5 rounded-full blur-[120px]" />
      </div>
    </main>
  );
}
