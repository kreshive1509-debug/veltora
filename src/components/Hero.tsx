import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ParticleCanvas } from './ParticleCanvas';

interface HeroProps {
  onOpenInternship: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInternship }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#05071A] px-6 py-20"
    >
      {/* Aurora floating gradient blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-purple-600/10 blur-[130px] pointer-events-none aurora-blob-1" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none aurora-blob-2" />
      <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-fuchsia-500/5 blur-[120px] pointer-events-none aurora-blob-3" />

      {/* Particle background */}
      <ParticleCanvas />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Animated tag */}
        <div
          id="hero-tag"
          className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-bold uppercase tracking-widest text-[#00F5FF] mb-8 animate-pulse shadow-md shadow-purple-500/5"
        >
          Student-Led Tech Innovators
        </div>

        {/* Huge Gradient 3D Title */}
        <h1
          id="hero-title"
          className="text-7xl md:text-9xl lg:text-[110px] leading-none font-extrabold tracking-[-3px] neon-text italic select-none cursor-default drop-shadow-[0_12px_24px_rgba(123,47,255,0.15)] mb-2"
        >
          VELTORA
        </h1>

        {/* Spaced Subtitle */}
        <div
          id="hero-subtitle"
          className="text-[18px] md:text-[22px] font-normal tracking-[10px] text-[#A0AEC0] uppercase -mt-1 md:-mt-3 mb-6"
        >
          IT Solutions
        </div>

        {/* Tagline Italic */}
        <p
          id="hero-tagline"
          className="text-sm text-purple-300 italic mb-8"
        >
          Innovating Dreams &bull; <span className="text-gray-500 not-italic">Formerly Jugaad Developer</span>
        </p>

        {/* Description Paragraph */}
        <p
          id="hero-description"
          className="text-sm md:text-base text-white/70 max-w-xl mb-12 leading-relaxed"
        >
          We are a student-initiated freelancing and technology powerhouse building ultra-reliable websites, modern applications, and automated customer ecosystems for visionary projects.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <a
            id="hero-contact-cta"
            href="#contact"
            className="w-full sm:w-48 py-4 px-8 rounded-full text-sm font-bold bg-gradient-to-r from-[#7B2FFF] via-[#A855F7] to-[#00F5FF] text-white hover:opacity-90 active:scale-95 transition-all duration-300 shadow-xl shadow-[#7B2FFF]/30 purple-glow-btn text-center"
          >
            Contact Us
          </a>
          <button
            id="hero-internship-cta"
            onClick={onOpenInternship}
            className="w-full sm:w-48 py-4 px-8 rounded-full text-sm font-bold border border-white/10 hover:border-[#00F5FF] bg-white/4 hover:bg-[#00F5FF]/10 text-white hover:text-[#00F5FF] transition-all duration-300 cursor-pointer text-center"
          >
            Join Internship
          </button>
        </div>
      </div>

      {/* Bouncing Scroll Down Arrow */}
      <a
        id="hero-scroll-btn"
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-[#00F5FF] transition-colors group cursor-pointer z-10"
      >
        <span className="text-[10px] tracking-widest uppercase font-bold group-hover:tracking-[0.15em] transition-all duration-300">EXPLORE</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
};
