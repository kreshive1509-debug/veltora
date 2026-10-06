import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ArrowUpRight, Sparkles, ChevronDown } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { heroSettings } = useCms();
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Helper to extract YouTube Video ID
  const getYouTubeId = (url: string) => {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : '';
  };

  const youtubeId = getYouTubeId(heroSettings.youtubeUrl);
  const overlayAlpha = (heroSettings.overlayOpacity ?? 45) / 100;

  const handleButtonClick = (url: string) => {
    if (url.startsWith('#')) {
      const targetId = url.replace('#', '');
      onNavigate(targetId);
    } else {
      window.location.href = url;
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#FAF8F5]">
      {/* Background System: Image or YouTube Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {heroSettings.backgroundType === 'youtube' && youtubeId ? (
          <div className="absolute inset-0 w-full h-full">
            {/* Fallback image behind iframe */}
            <img
              src={heroSettings.fallbackImageUrl || heroSettings.imageUrl}
              alt="Veltora Tech Backdrop"
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <div className="w-full h-full scale-[1.35] pointer-events-none">
              <iframe
                title="Veltora Ambient Reel"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                className="w-full h-full object-cover border-0"
                allow="autoplay; encrypted-media"
                onLoad={() => setVideoLoaded(true)}
              />
            </div>
          </div>
        ) : (
          <img
            src={heroSettings.imageUrl}
            alt="Veltora IT Solutions Atmosphere"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
        )}

        {/* Measured Light Luxury Scrim & Tint Overlays */}
        <div
          className="absolute inset-0 bg-[#FAF8F5]"
          style={{ opacity: overlayAlpha }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-transparent to-[#FAF8F5]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FAF6EE]/50 via-transparent to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Luxury Pre-Header Badge */}
        {heroSettings.badgeText && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/85 backdrop-blur-md border border-[#E6DECE] shadow-xs text-xs font-medium text-[#735A25] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B58A3E] animate-pulse" />
            <span>{heroSettings.badgeText}</span>
          </div>
        )}

        {/* Dominant Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#191C1E] max-w-4xl mx-auto leading-[1.12] mb-6 text-balance">
          {heroSettings.title}{' '}
          <span className="luxury-gradient-text block sm:inline">
            {heroSettings.highlightedText}
          </span>
        </h1>

        {/* Value Proposition Body */}
        <p className="text-base sm:text-lg md:text-xl text-[#4A4E54] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          {heroSettings.subtitle}
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => handleButtonClick(heroSettings.primaryButtonUrl)}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#FAF8F5] bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <span>{heroSettings.primaryButtonText}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#C59A4E]" />
          </button>

          <button
            onClick={() => handleButtonClick(heroSettings.secondaryButtonUrl)}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#191C1E] bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#E6DECE] rounded-xl transition-all duration-200 shadow-xs hover:border-[#C59A4E]/50 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>{heroSettings.secondaryButtonText}</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => onNavigate('trust')}
            className="p-2 text-[#807765] hover:text-[#191C1E] transition-colors focus:outline-none"
            aria-label="Scroll to content"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
