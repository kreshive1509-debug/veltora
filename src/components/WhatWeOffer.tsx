import React, { useState } from 'react';
import { SERVICES, BACK_THEMES } from '../data';
import { ServiceInfo } from '../types';

interface WhatWeOfferProps {
  onEnquire: (serviceName: string) => void;
}

export const WhatWeOffer: React.FC<WhatWeOfferProps> = ({ onEnquire }) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleToggleFlip = (id: string, e: React.MouseEvent) => {
    // If user clicks "Enquire Now" button, do not flip back immediately
    const target = e.target as HTMLElement;
    if (target.closest('.enquire-btn')) {
      return;
    }
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Group services for desktop (5 per row) and mobile (2 per row)
  const chunkArray = (array: ServiceInfo[], size: number) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  const desktopRows = chunkArray(SERVICES, 5);
  const mobileRows = chunkArray(SERVICES, 2);

  // Helper to render a service card
  const renderCard = (service: ServiceInfo, overallIndex: number) => {
    const isFlipped = !!flippedCards[service.id];
    const theme = BACK_THEMES[overallIndex % BACK_THEMES.length];
    
    // Vary the pendulum animation parameters for realism
    const duration = 2.4 + (overallIndex % 5) * 0.4; // 2.4s to 4.0s
    const delay = -(overallIndex % 3) * 0.7; // negative delay so they start waving mid-cycle

    return (
      <div
        id={`service-wrapper-${service.id}`}
        key={service.id}
        className="flex flex-col items-center select-none"
      >
        {/* Hanging wire */}
        <div 
          id={`wire-${service.id}`}
          className="w-[2px] h-[40px] bg-gradient-to-b from-[#A855F7] to-transparent shrink-0" 
        />

        {/* 3D Card box container */}
        <div
          id={`service-card-${service.id}`}
          onClick={(e) => handleToggleFlip(service.id, e)}
          className={`relative w-[140px] h-[180px] cursor-pointer perspective-1000 transform-style-3d transition-transform duration-700 pointer-events-auto select-none rounded-[16px] hanging-swing`}
          style={{
            animation: isFlipped ? 'none' : `pendulumSwing ${duration}s ease-in-out ${delay}s infinite alternate`,
            transform: isFlipped ? 'rotateY(180deg)' : undefined,
          }}
        >
          {/* FRONT FACE */}
          <div
            id={`service-card-front-${service.id}`}
            className="absolute inset-0 backface-hidden w-full h-full rounded-[16px] flex flex-col items-center justify-center p-4 text-center transition-all duration-300 glass card-shadow border border-white/20 hover:border-[#00F5FF]/60"
          >
            <span className="text-5xl mb-4 select-none filter drop-shadow-[0_4px_10px_rgba(168,85,247,0.5)]">
              {service.emoji}
            </span>
            <span className="text-xs font-bold leading-tight uppercase font-space text-white/95">
              {service.name}
            </span>
          </div>

          {/* BACK FACE */}
          <div
            id={`service-card-back-${service.id}`}
            className={`absolute inset-0 backface-hidden w-full h-full rounded-[16px] bg-gradient-to-br ${theme.gradientClass} rotate-y-180 flex flex-col items-center justify-between p-4 text-center shadow-[0_8px_32px_rgba(255,45,120,0.3)] border border-white/20`}
          >
            {/* Tag or category */}
            <span className="text-[9px] font-black tracking-widest uppercase text-white/60">
              {theme.themeName}
            </span>

            {/* Service Title */}
            <div className="my-auto flex flex-col justify-center">
              <h4 className="text-[11px] font-black uppercase text-white leading-tight font-space mb-1">
                {service.name}
              </h4>
              <p className="text-[9px] text-white/80 italic leading-snug px-1">
                {service.tagline}
              </p>
            </div>

            {/* Action Call */}
            <button
              id={`service-enquire-${service.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onEnquire(service.name);
              }}
              className="enquire-btn w-full py-1.5 rounded-lg bg-black/40 border border-white/20 text-white hover:bg-white text-[10px] font-bold uppercase tracking-wider text-center hover:text-black transition-all active:scale-95 shimmer-effect"
            >
              Enquire Now →
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="services"
      className="relative py-24 px-6 overflow-hidden bg-[#05071A]"
    >
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00F5FF] mb-3 block">
            WHAT WE OFFER
          </span>
          <h2 className="text-4xl md:text-[52px] font-black font-space tracking-tight text-white mb-4">
            Our Elite Digital Services
          </h2>
          <p className="text-sm md:text-base text-white/60 tracking-wider font-medium font-space">
            Click a service card to explore & enquire
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7B2FFF] to-[#00F5FF] mx-auto mt-6 rounded-full" />
        </div>

        {/* DESKTOP VIEW (5 cards per row) */}
        <div className="hidden md:flex flex-col gap-12">
          {desktopRows.map((row, rowIndex) => (
            <div
              id={`desktop-row-container-${rowIndex}`}
              key={`desktop-row-${rowIndex}`}
              className="flex flex-col"
            >
              {/* Thick Glowing Rod */}
              <div
                id={`desktop-rod-${rowIndex}`}
                className="w-full h-[12px] bg-gradient-to-r from-[#7B2FFF] via-[#00F5FF] to-[#7B2FFF] rounded-full shadow-[0_0_30px_rgba(123,47,255,0.7),0_0_60px_rgba(0,245,255,0.3)]"
              />

              {/* Hanging Row items */}
              <div className="flex justify-around px-8">
                {row.map((service, cardIndex) => {
                  const overallIndex = rowIndex * 5 + cardIndex;
                  return renderCard(service, overallIndex);
                })}
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE VIEW (2 cards per row) */}
        <div className="md:hidden flex flex-col gap-10">
          {mobileRows.map((row, rowIndex) => (
            <div
              id={`mobile-row-container-${rowIndex}`}
              key={`mobile-row-${rowIndex}`}
              className="flex flex-col"
            >
              {/* Glowing Rod */}
              <div
                id={`mobile-rod-${rowIndex}`}
                className="w-full h-[10px] bg-gradient-to-r from-[#7B2FFF] via-[#00F5FF] to-[#7B2FFF] rounded-full shadow-[0_0_20px_rgba(123,47,255,0.6),0_0_40px_rgba(0,245,255,0.2)]"
              />

              {/* Hanging Row items (2 items) */}
              <div className="grid grid-cols-2 justify-items-center gap-2 px-1">
                {row.map((service, cardIndex) => {
                  const overallIndex = rowIndex * 2 + cardIndex;
                  return renderCard(service, overallIndex);
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
