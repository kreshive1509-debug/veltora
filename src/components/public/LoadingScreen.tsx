import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';

export const LoadingScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const { loadingScreenSettings, siteSettings } = useCms();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!loadingScreenSettings.isEnabled) {
      onFinish();
      return;
    }

    const duration = loadingScreenSettings.durationMs || 900;
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, duration - 200);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [loadingScreenSettings.isEnabled, loadingScreenSettings.durationMs, onFinish]);

  if (!loadingScreenSettings.isEnabled) return null;

  const logoUrl =
    loadingScreenSettings.customLogoUrl ||
    siteSettings.loadingLogoUrl ||
    siteSettings.primaryLogoUrl ||
    siteSettings.lightLogoUrl;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col items-center justify-center transition-opacity duration-300 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
        {logoUrl ? (
          <img src={logoUrl} alt={siteSettings.companyName} className="max-h-16 object-contain" />
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-[#191C1E] flex items-center justify-center shadow-md">
            <span className="font-serif-luxury font-bold text-2xl text-[#C59A4E]">
              {siteSettings.shortName ? siteSettings.shortName[0] : 'V'}
            </span>
          </div>
        )}

        <div className="flex flex-col items-center text-center space-y-1">
          <span className="font-display text-base font-bold text-[#191C1E] tracking-tight">
            {siteSettings.companyName}
          </span>
          <span className="text-xs text-[#B58A3E] font-medium font-mono animate-pulse">
            {loadingScreenSettings.loadingText}
          </span>
        </div>
      </div>
    </div>
  );
};
