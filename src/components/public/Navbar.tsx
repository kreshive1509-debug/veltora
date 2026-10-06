import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { TopAnnouncementBar } from './TopAnnouncementBar';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenAdmin }) => {
  const { siteSettings, brandAppearance, navigationItems } = useCms();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sortedNavItems = [...navigationItems]
    .filter((item) => item.isEnabled)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const handleLinkClick = (url: string) => {
    setMobileMenuOpen(false);
    if (url.startsWith('#')) {
      const targetId = url.replace('#', '');
      onNavigate(targetId);
    } else if (url === '/admin') {
      onOpenAdmin();
    } else if (url.startsWith('/')) {
      window.history.pushState({}, '', url);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = url;
    }
  };

  // Determine logo variant based on CMS settings
  const getActiveLogoUrl = () => {
    const variant = siteSettings.navbarLogoVariant || 'primary';
    if (variant === 'custom' && siteSettings.navbarLogoUrl) return siteSettings.navbarLogoUrl;
    if (variant === 'light' && siteSettings.lightLogoUrl) return siteSettings.lightLogoUrl;
    if (variant === 'dark' && siteSettings.darkLogoUrl) return siteSettings.darkLogoUrl;
    return siteSettings.primaryLogoUrl || siteSettings.navbarLogoUrl || '';
  };

  const activeLogoUrl = getActiveLogoUrl();
  const logoWidth = siteSettings.navbarLogoWidth || 140;
  const ctaText = brandAppearance?.navbarCtaText || 'Start a Project';
  const showCta = brandAppearance?.showNavbarCta !== false;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <TopAnnouncementBar onNavigate={onNavigate} />

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E6DECE]/80 shadow-[0_4px_20px_-4px_rgba(35,30,20,0.03)] py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Zone: Clean Logo Image or Monogram Wordmark */}
          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
              onNavigate('hero');
            }}
            className="text-left group flex items-center gap-3 focus:outline-none cursor-pointer"
          >
            {activeLogoUrl && !imgError ? (
              <img
                src={activeLogoUrl}
                alt={siteSettings.companyName}
                onError={() => setImgError(true)}
                style={{ maxWidth: `${logoWidth}px` }}
                className="max-h-9 object-contain transition-transform group-hover:scale-102"
              />
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#191C1E] flex items-center justify-center text-[#FAF8F5] shadow-xs group-hover:scale-105 transition-transform duration-200">
                  <span className="font-serif-luxury font-bold text-sm text-[#C59A4E]">
                    {siteSettings.shortName ? siteSettings.shortName[0] : 'V'}
                  </span>
                </div>
                <div>
                  <span className="font-display font-bold text-base tracking-tight text-[#191C1E] block leading-none">
                    {siteSettings.shortName || siteSettings.companyName}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase font-medium text-[#8F949D] block mt-0.5">
                    Solutions
                  </span>
                </div>
              </div>
            )}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {sortedNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.url)}
                className="text-xs font-semibold uppercase tracking-wider text-[#4B5056] hover:text-[#926E28] transition-colors py-1 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Hub: CTA */}
          <div className="hidden md:flex items-center gap-4">
            {showCta && (
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2 text-xs font-semibold text-[#191C1E] bg-white border border-[#E6DECE] hover:border-[#C59A4E] hover:bg-[#FAF8F5] rounded-xl transition-all duration-200 shadow-xs flex items-center gap-2 group cursor-pointer"
              >
                <span>{ctaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C59A4E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {showCta && (
              <button
                onClick={() => onNavigate('contact')}
                className="px-3 py-1.5 text-xs font-semibold text-[#FAF8F5] bg-[#191C1E] rounded-lg cursor-pointer"
              >
                Contact
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#191C1E] hover:bg-[#F4EBD9]/60 rounded-lg transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF8F5] border-b border-[#E6DECE] px-6 py-5 shadow-lg animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3.5 text-sm font-medium text-[#4B5056]">
              {sortedNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.url)}
                  className="text-left py-2 border-b border-[#F0E8D9] text-[#191C1E] hover:text-[#B58A3E] transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              {showCta && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('contact');
                    }}
                    className="w-full py-2.5 text-xs font-semibold text-center text-[#FAF8F5] bg-[#191C1E] rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C59A4E]" />
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
