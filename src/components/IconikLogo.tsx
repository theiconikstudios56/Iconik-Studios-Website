import React from 'react';

interface IconikLogoProps {
  className?: string;
  color?: string;
}

export default function IconikLogo({ className = "w-full h-full", color = "currentColor" }: IconikLogoProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Profile - Stylized and Edgy */}
      <path 
        d="M42 22 L32 26 L28 38 L31 52 L27 68 L36 82 L52 78" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Right Profile - Stylized and Edgy */}
      <path 
        d="M58 22 L68 26 L72 38 L69 52 L73 68 L64 82 L48 78" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Center Geometric Shape (Octagon/Basketball hybrid) */}
      <path 
        d="M50 32 L62 42 L62 58 L50 68 L38 58 L38 42 Z" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Internal Geometric Lines */}
      <path d="M38 50 L62 50" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M50 32 L50 68" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 38 L58 62" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M58 38 L42 62" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Accent Sparks (Sound/Energy lines) */}
      <path d="M18 48 L8 42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 58 L8 64" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      
      <path d="M82 48 L92 42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M82 58 L92 64" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
