import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Linkedin,
  Instagram,
  Github,
  Youtube,
  Twitter,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const { siteSettings, services, socialLinks } = useCms();
  const [imgError, setImgError] = useState(false);

  const enabledSocials = socialLinks.filter((s) => s.isEnabled);

  const navigateClientRoute = (url: string) => {
    if (url.startsWith('#')) {
      onNavigate(url.replace('#', ''));
    } else {
      window.history.pushState({}, '', url);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'x':
        return <Twitter className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  const getFooterLogo = () => {
    const variant = siteSettings.footerLogoVariant || 'light';
    if (variant === 'custom' && siteSettings.footerLogoUrl) return siteSettings.footerLogoUrl;
    if (variant === 'light' && siteSettings.lightLogoUrl) return siteSettings.lightLogoUrl;
    if (variant === 'dark' && siteSettings.darkLogoUrl) return siteSettings.darkLogoUrl;
    if (variant === 'primary' && siteSettings.primaryLogoUrl) return siteSettings.primaryLogoUrl;
    return siteSettings.lightLogoUrl || siteSettings.primaryLogoUrl || siteSettings.footerLogoUrl || '';
  };

  const footerLogo = getFooterLogo();

  return (
    <footer className="bg-[#191C1E] text-[#FAF8F5] pt-20 pb-12 border-t border-[#373A40]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2C3035]">
          {/* Brand & Slogan Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {footerLogo && !imgError ? (
                <img
                  src={footerLogo}
                  alt={siteSettings.companyName}
                  onError={() => setImgError(true)}
                  className="max-h-10 object-contain"
                />
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#191C1E]">
                    <span className="font-serif-luxury font-bold text-sm text-[#B58A3E]">
                      {siteSettings.shortName ? siteSettings.shortName[0] : 'V'}
                    </span>
                  </div>
                  <span className="font-display text-xl font-bold tracking-tight text-white">
                    {siteSettings.companyName || 'Veltora IT Solutions'}
                  </span>
                </div>
              )}
            </div>

            {siteSettings.tagline && (
              <p className="text-xs font-semibold tracking-wider text-[#C59A4E] uppercase font-display">
                "{siteSettings.tagline}"
              </p>
            )}

            <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed font-normal max-w-sm">
              {siteSettings.footerDescription || siteSettings.brandDescription}
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-2.5 pt-2">
              {enabledSocials.map((soc) => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#272B30] hover:bg-[#C59A4E] text-[#D1D5DB] hover:text-[#191C1E] flex items-center justify-center transition-all duration-200"
                  aria-label={soc.label}
                >
                  {getSocialIcon(soc.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-4">
              Explore
            </span>
            <ul className="space-y-2.5 text-xs text-[#9CA3AF]">
              <li>
                <button
                  onClick={() => navigateClientRoute('/projects')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our Work & Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateClientRoute('/partners')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Partners & Alliances
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateClientRoute('/gallery')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Inside Veltora (Gallery)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateClientRoute('#leadership')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Founder & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateClientRoute('#programs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fellowship Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateClientRoute('#blog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Engineering Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-4">
              Engineering Disciplines
            </span>
            <ul className="space-y-2.5 text-xs text-[#9CA3AF]">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => navigateClientRoute(`/services/${service.slug}`)}
                    className="hover:text-white transition-colors cursor-pointer text-left truncate max-w-full block"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-2">
              Get in Touch
            </span>
            <p className="text-xs text-[#9CA3AF] flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#C59A4E] shrink-0" />
              <a href={`mailto:${siteSettings.primaryEmail}`} className="hover:text-white transition-colors truncate">
                {siteSettings.primaryEmail}
              </a>
            </p>
            <p className="text-xs text-[#9CA3AF] flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#C59A4E] shrink-0" />
              <span>{siteSettings.phone}</span>
            </p>
            {siteSettings.address && (
              <p className="text-xs text-[#9CA3AF] flex items-start gap-2 pt-1 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-[#C59A4E] shrink-0 mt-0.5" />
                <span>{siteSettings.address}</span>
              </p>
            )}
            {siteSettings.businessHours && (
              <p className="text-[11px] text-[#6B7280] pt-1">
                {siteSettings.businessHours}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>{siteSettings.copyright}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#9CA3AF]">{siteSettings.developerCredit}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-[#9CA3AF] hover:text-[#C59A4E] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B58A3E]" />
              <span>Console Gateway</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
