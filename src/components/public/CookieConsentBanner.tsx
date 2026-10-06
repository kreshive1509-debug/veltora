import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const { cookieSettings } = useCms();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    if (!cookieSettings.isEnabled) return;
    const consent = localStorage.getItem('VELTORA_COOKIE_CONSENT');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [cookieSettings.isEnabled]);

  const handleAcceptAll = () => {
    localStorage.setItem('VELTORA_COOKIE_CONSENT', 'all');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('VELTORA_COOKIE_CONSENT', 'essential');
    setIsVisible(false);
  };

  if (!isVisible || !cookieSettings.isEnabled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#E6DECE] p-5 shadow-xl text-[#191C1E] space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold">
            <div className="w-6 h-6 rounded-lg bg-[#FAF8F5] border border-[#E6DECE] flex items-center justify-center text-[#B58A3E]">
              <Cookie className="w-3.5 h-3.5" />
            </div>
            <span>Privacy & Cookie Preferences</span>
          </div>
          <button
            onClick={handleReject}
            className="text-[#8C9199] hover:text-[#191C1E] p-1 transition-colors cursor-pointer"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-[#5F6368] leading-relaxed">
          {cookieSettings.bannerText}
        </p>

        {showPreferences && (
          <div className="space-y-2 pt-2 border-t border-[#F0E8D9] text-[11px]">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold block">Essential Cookies</span>
                <span className="text-[#8C9199] text-[10px]">{cookieSettings.necessaryDescription}</span>
              </div>
              <span className="text-[10px] font-mono text-[#B58A3E] font-bold">Always Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold block">Anonymous Analytics</span>
                <span className="text-[#8C9199] text-[10px]">{cookieSettings.analyticsDescription}</span>
              </div>
              <input type="checkbox" defaultChecked className="accent-[#B58A3E]" />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="text-[10px] font-semibold text-[#8C9199] hover:text-[#191C1E] underline cursor-pointer"
          >
            {showPreferences ? 'Hide Options' : cookieSettings.preferencesText}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReject}
              className="px-3 py-1.5 text-[11px] font-semibold text-[#5F6368] hover:text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-lg transition-colors cursor-pointer"
            >
              {cookieSettings.rejectText}
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-3.5 py-1.5 text-[11px] font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-lg transition-colors shadow-2xs cursor-pointer"
            >
              {cookieSettings.acceptText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
