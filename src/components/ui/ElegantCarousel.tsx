import React from 'react';
import strategySeshImg from '../../assets/images/strategy-sesh.png';
import aiGameplanImg from '../../assets/images/ai-gameplan.png';

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
}

const slide1 = {
  title: 'ELITE CRAFTSMEN.',
  subtitle: '04 / THE COLLECTIVE',
  description:
    'Our mascot fuzzies work for you. They are elite craftsmen and AI architects who design high-converting, immersive websites with pixel-perfect UI layouts and lightning-fast load speeds, crafting digital storefronts built exclusively for results.',
  accent: '#cd7f32',
  imageUrl: strategySeshImg,
  cta: 'VIEW THE TEAM'
};

const slide2 = {
  title: 'DETAILED PLANNERS',
  subtitle: '05 / THE COLLECTIVE',
  description:
    'Our fuzzies are detailed planners for your AI automation workflows, constructing bulletproof system backends so that you never miss a lead, convert more phone calls, and grow booked appointments on autopilot.',
  accent: '#cd7f32',
  imageUrl: aiGameplanImg,
  cta: 'VIEW THE TEAM'
};

export default function ElegantCarousel({ reversed = false }: { reversed?: boolean }) {
  const currentSlide = reversed ? slide2 : slide1;

  return (
    <div className="carousel-wrapper">
      <div className="carousel-inner">
        {/* Text Content */}
        <div className={`carousel-content ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="carousel-content-inner">
            {/* Collection number */}
            <div className="carousel-collection-num visible">
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                04 / 04
              </span>
            </div>

            {/* Title */}
            <h2 className="carousel-title visible text-center">
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className="carousel-subtitle visible text-center"
              style={{ color: currentSlide.accent }}
            >
              {currentSlide.subtitle}
            </p>

            {/* Description */}
            <p className="carousel-description visible text-center">
              {currentSlide.description}
            </p>

            {/* CTA Button */}
            <div className="mt-8 visible flex justify-center">
              <button className="bg-ink text-tan px-10 py-5 rounded-none font-display text-sm tracking-[0.2em] hover:bg-burnt-orange hover:text-ink transition-all duration-500 uppercase font-bold cursor-pointer">
                {currentSlide.cta}
              </button>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className={`carousel-image-container ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="carousel-image-frame visible">
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="carousel-image"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
