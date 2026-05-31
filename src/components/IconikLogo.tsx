import React from 'react';
import iconikLogoWhite from '../assets/images/Brand/iconik-white-logo.png';

interface IconikLogoProps {
  className?: string;
  color?: string;
}

export default function IconikLogo({ className = "w-full h-full", color = "currentColor" }: IconikLogoProps) {
  return (
    <img
      src={iconikLogoWhite}
      alt="Iconik Logo"
      className={className + " object-contain"}
    />
  );
}
