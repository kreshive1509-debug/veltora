import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { X, ArrowRight } from 'lucide-react';
import { PromotionalCampaign } from '../../types';

interface CampaignBannerAndModalProps {
  onNavigate: (sectionId: string) => void;
}

export const CampaignBannerAndModal: React.FC<CampaignBannerAndModalProps> = ({ onNavigate }) => {
  const { campaigns } = useCms();
  const [activePopup, setActivePopup] = useState<PromotionalCampaign | null>(null);
  const [popupDismissed, setPopupDismissed] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    // Find enabled modal campaigns within the valid date range
    const eligiblePopups = campaigns.filter(
      (c) =>
        c.isEnabled &&
        c.startDate <= today &&
        c.endDate >= today &&
        (c.displayMode === 'popup' || c.displayMode === 'both')
    );

    if (eligiblePopups.length === 0) {
      setActivePopup(null);
      return;
    }

    const currentCampaign = eligiblePopups[0];
    const popupKey = `veltora_popup_dismiss_${currentCampaign.id}`;
    const lastDismissed = localStorage.getItem(popupKey);
    const hoursLimit = currentCampaign.frequencyLimitHours || 24;

    const shouldShow =
      !lastDismissed ||
      Date.now() - parseInt(lastDismissed, 10) > hoursLimit * 60 * 60 * 1000;

    if (shouldShow) {
      const timer = setTimeout(() => {
        setActivePopup(currentCampaign);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [campaigns]);

  const handleDismissPopup = () => {
    if (activePopup) {
      localStorage.setItem(`veltora_popup_dismiss_${activePopup.id}`, Date.now().toString());
      setPopupDismissed(true);
      setActivePopup(null);
    }
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
    handleDismissPopup();
  };

  if (!activePopup || popupDismissed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="bg-[#FAF8F5] rounded-3xl border border-[#E6DECE] max-w-lg w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={handleDismissPopup}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {activePopup.imageUrl && (
          <div className="aspect-[16/9] w-full overflow-hidden bg-[#F4EBD9]">
            <img
              src={activePopup.imageUrl}
              alt={activePopup.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <span className="text-[11px] font-semibold text-[#926E28] uppercase tracking-wider block mb-1">
            Special Announcement
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#191C1E] mb-3">
            {activePopup.title}
          </h3>

          {activePopup.description && (
            <p className="text-xs sm:text-sm text-[#4A4E54] leading-relaxed mb-6 font-normal">
              {activePopup.description}
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleActionClick(activePopup.buttonUrl)}
              className="flex-1 py-3 px-4 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{activePopup.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59A4E]" />
            </button>
            <button
              type="button"
              onClick={handleDismissPopup}
              className="py-3 px-4 text-xs font-semibold text-[#52575E] hover:text-[#191C1E] transition-colors cursor-pointer"
            >
              Remind Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
