import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './Navbar';
import BackgroundTransition from './BackgroundTransition';
import { ReactNode, useEffect } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export default function Layout({ children, title, description, canonicalUrl, ogImage }: LayoutProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
      // Set OG Title too
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);
    }
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);

      // Set OG Description
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', description);
    }
    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    }
    if (ogImage) {
      let metaOgImage = document.querySelector('meta[property="og:image"]');
      if (!metaOgImage) {
        metaOgImage = document.createElement('meta');
        metaOgImage.setAttribute('property', 'og:image');
        document.head.appendChild(metaOgImage);
      }
      metaOgImage.setAttribute('content', ogImage);
    }
  }, [title, description, canonicalUrl, ogImage]);
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
