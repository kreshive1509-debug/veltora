import React, { useState, useEffect } from 'react';
import { Menu, X, Lightbulb } from 'lucide-react';

interface NavbarProps {
  onOpenIdeaModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenIdeaModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Partners', href: '#partners' },
    { name: 'Internship', href: '#internship' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-no-round py-4 shadow-lg shadow-black/20 navbar-glass'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            id="navbar-logo"
            href="#"
            className="flex flex-col select-none group"
          >
            <span className="text-2xl font-black font-space tracking-tight neon-text group-hover:opacity-85 transition-opacity">
              VELTORA
            </span>
            <span className="text-[9px] tracking-[0.2em] text-white/50 -mt-1 font-bold">
              IT SOLUTIONS
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                id={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/75 hover:text-[#00F5FF] transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00F5FF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Premium CTA or actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="nav-idea-btn"
              onClick={onOpenIdeaModal}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-[#00F5FF] text-xs font-semibold tracking-wider uppercase transition-all duration-300 pointer-events-auto"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              Share Idea
            </button>
            <a
              id="nav-contact-btn"
              href="#contact"
              className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-[#7B2FFF] to-[#A855F7] text-white hover:opacity-90 active:scale-95 transition-all duration-300 shadow-md shadow-[#7B2FFF]/20"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <button
            id="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white rounded-lg focus:outline-none transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-30 flex flex-col justify-center items-center md:hidden transition-all duration-300"
        >
          <div className="flex flex-col gap-8 text-center">
            {navLinks.map((link) => (
              <a
                id={`mobile-nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-bold font-space text-white/95 hover:text-[#00F5FF] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              id="mobile-nav-idea-btn"
              onClick={() => {
                setIsOpen(false);
                onOpenIdeaModal();
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 text-[#00F5FF] text-sm font-semibold tracking-wider uppercase transition-all duration-300"
            >
              <Lightbulb className="w-4 h-4 text-[#00F5FF]" />
              Share Your Idea
            </button>
            <a
              id="mobile-nav-contact-btn"
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#7B2FFF] to-[#A855F7] text-white transition-opacity"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </>
  );
};
