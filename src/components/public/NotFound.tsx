import React from 'react';
import { useCms } from '../../context/CmsContext';
import { ArrowLeft, Compass, Sparkles } from 'lucide-react';

interface NotFoundProps {
  onBackHome: () => void;
  onExploreServices: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onBackHome, onExploreServices }) => {
  const { errorPageSettings, siteSettings } = useCms();

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#FFFFFF] rounded-3xl border border-[#E6DECE] p-8 sm:p-10 shadow-lg text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#FAF6EE] border border-[#E8DFC9] text-[#B58A3E] flex items-center justify-center mx-auto shadow-2xs">
          <Compass className="w-8 h-8" />
        </div>

        <div>
          <span className="font-mono text-xs font-bold text-[#B58A3E] uppercase tracking-widest block mb-1">
            404 Error
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#191C1E]">
            {errorPageSettings?.heading404 || 'Page Not Found'}
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
          {errorPageSettings?.description404 ||
            'The digital blueprint you are looking for has moved or took a different route.'}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onBackHome}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>{errorPageSettings?.ctaText404 || 'Return Home'}</span>
          </button>

          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#191C1E] bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E6DECE] rounded-xl transition-colors cursor-pointer"
          >
            <span>Explore Services</span>
          </button>
        </div>

        <div className="pt-4 border-t border-[#F0E8D9] text-[11px] text-[#8C9199]">
          <span>{siteSettings.companyName}</span>
        </div>
      </div>
    </div>
  );
};
