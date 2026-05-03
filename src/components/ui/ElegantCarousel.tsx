import React from 'react';

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
    'WE ARE A SMALL, HIGHLY SPECIALIZED TEAM OF DESIGNERS, DEVELOPERS, AND AI ARCHITECTS. WE DON\'T DO RETAINERS; WE DO RESULTS.',
  accent: '#cd7f32',
  imageUrl:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
  cta: 'VIEW THE TEAM'
};

const slide2 = { ...slide1 };

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
              <button className="bg-ink text-tan px-10 py-5 rounded-full font-display text-sm tracking-[0.2em] hover:bg-burnt-orange hover:text-ink transition-all duration-500 uppercase font-bold cursor-pointer">
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
