import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { X, ArrowRight } from 'lucide-react';
import { PromotionalCampaign } from '../../types';

interface TopAnnouncementBarProps {
  onNavigate: (sectionId: string) => void;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({ onNavigate }) => {
  const { campaigns } = useCms();
  const [activeBanner, setActiveBanner] = useState<PromotionalCampaign | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Find enabled banner campaigns within the valid date range
    const eligibleBanners = campaigns.filter(
      (c) =>
        c.isEnabled &&
        c.startDate <= today &&
        c.endDate >= today &&
        (c.displayMode === 'banner' || c.displayMode === 'both')
    );

    if (eligibleBanners.length === 0) {
      setActiveBanner(null);
      return;
    }

    // Sort by priority (higher first)
    const sorted = [...eligibleBanners].sort((a, b) => (b.priority || 1) - (a.priority || 1));
    const currentBanner = sorted[0];

    // Check session dismissal state
    const dismissalKey = `veltora_banner_dismiss_${currentBanner.id}`;
    const isDismissed = sessionStorage.getItem(dismissalKey) === 'true';

    if (isDismissed) {
      setActiveBanner(null);
      setDismissed(true);
    } else {
      setActiveBanner(currentBanner);
      setDismissed(false);
    }
  }, [campaigns]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (activeBanner) {
      sessionStorage.setItem(`veltora_banner_dismiss_${activeBanner.id}`, 'true');
    }
    setDismissed(true);
    setActiveBanner(null);
  };

  const handleActionClick = (url: string) => {
    if (url.startsWith('#')) {
      const targetId = url.replace('#', '');
      onNavigate(targetId);
    } else if (url.startsWith('/')) {
      window.history.pushState({}, '', url);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = url;
    }
  };

  // If no banner is active or it has been dismissed, render NOTHING (zero DOM nodes)
  if (dismissed || !activeBanner) {
    return null;
  }

  return (
    <aside
      aria-label="Promotional Announcement"
      className="w-full bg-[#191C1E] text-[#FAF8F5] py-2 px-4 border-b border-[#373A40] text-xs font-medium relative z-50 flex items-center justify-between"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center flex-1 min-w-0 px-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C59A4E] shrink-0 animate-ping" />
        <span className="text-[#E5D7BE] truncate">{activeBanner.title}</span>
        <button
          type="button"
          onClick={() => handleActionClick(activeBanner.buttonUrl)}
          className="underline hover:text-[#C59A4E] text-xs font-semibold ml-1 inline-flex items-center gap-0.5 shrink-0 transition-colors cursor-pointer"
        >
          <span>{activeBanner.buttonText}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        className="text-[#9CA3AF] hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors shrink-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/40"
        aria-label="Close announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
