import React from 'react';
import { useCms } from '../../context/CmsContext';
import { ShieldCheck, Calendar, ArrowLeft } from 'lucide-react';

interface LegalPagesProps {
  slug: 'privacy-policy' | 'terms-and-conditions' | 'cookie-policy';
  onNavigateHome: () => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ slug, onNavigateHome }) => {
  const { legalPages, siteSettings } = useCms();
  const page = legalPages[slug];

  if (!page || !page.isPublished) {
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold text-[#191C1E] mb-4">Policy Unavailable</h1>
        <p className="text-xs text-[#5F6368] mb-6">
          This legal document is currently undergoing revision or has not been published yet.
        </p>
        <button
          onClick={onNavigateHome}
          className="px-5 py-2.5 text-xs font-semibold bg-[#191C1E] text-white rounded-xl"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb / Back button */}
      <button
        onClick={onNavigateHome}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F6368] hover:text-[#191C1E] transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Homepage</span>
      </button>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 sm:p-12 shadow-xs space-y-8">
        <div className="border-b border-[#F0E8D9] pb-6 space-y-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F5] border border-[#E6DECE] text-[#B58A3E]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Legal Policy
          </span>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#191C1E]">
            {page.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-[#5F6368]">
            <Calendar className="w-3.5 h-3.5 text-[#B58A3E]" />
            <span>Last Updated: {page.lastUpdated}</span>
            <span>•</span>
            <span>{siteSettings.companyName}</span>
          </div>
        </div>

        {/* Content body with clean line-by-line formatting */}
        <div className="prose prose-sm max-w-none text-xs sm:text-sm text-[#374151] leading-relaxed space-y-4">
          {page.content.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (trimmed.startsWith('### ')) {
              return (
                <h2 key={idx} className="font-display text-lg font-bold text-[#191C1E] pt-4 first:pt-0">
                  {trimmed.replace('### ', '')}
                </h2>
              );
            }
            if (trimmed.startsWith('#### ')) {
              return (
                <h3 key={idx} className="font-display text-sm font-bold text-[#191C1E] pt-2">
                  {trimmed.replace('#### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('- ')) {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1">
                  {trimmed.split('\n').map((li, lidx) => (
                    <li key={lidx}>{li.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{trimmed}</p>;
          })}
        </div>
      </div>
    </div>
  );
};
