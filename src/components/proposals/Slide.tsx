import React from 'react';
import { motion } from 'motion/react';

interface SlideProps {
  children: React.ReactNode;
  index: number;
  id: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Slide({ children, index, id, className = '', style }: SlideProps) {
  return (
    <section
      data-slide={index}
      id={id}
      className={`snap-start w-full flex-shrink-0 overflow-hidden ${className}`}
      style={{ height: 'calc(100vh - 56px)', ...style }}
    >
      {children}
    </section>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
  key?: React.Key;
}

export function StaggerContainer({ children, className = '', delay = 0, style }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface StaggerChildProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

export function StaggerChild({ children, className = '', style }: StaggerChildProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
