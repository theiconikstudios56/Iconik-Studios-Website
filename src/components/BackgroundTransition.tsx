import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const COLORS = {
  dark: "#000000",
  tan: "#ffffff",
  white: "#ffffff"
};

export default function BackgroundTransition() {
  const [activeColor, setActiveColor] = useState(COLORS.dark);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a section's top hits the top of the viewport
          if (entry.isIntersecting) {
            const bgType = entry.target.getAttribute('data-bg') as keyof typeof COLORS;
            if (bgType && COLORS[bgType]) {
              setActiveColor(COLORS[bgType]);
              // Update global text color variable based on background
              const textColor = bgType === 'dark' ? COLORS.tan : COLORS.dark;
              document.documentElement.style.setProperty('--text-color', textColor);
            }
          }
        });
      },
      {
        // Trigger exactly when the top of the element hits the top of the viewport
        rootMargin: "0px 0px -100% 0px",
        threshold: 0
      }
    );

    const sections = document.querySelectorAll('[data-bg]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-0 pointer-events-none"
      animate={{ backgroundColor: activeColor }}
      transition={{ 
        duration: 0.6, 
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1] // Quintic ease out
      }}
    />
  );
}
