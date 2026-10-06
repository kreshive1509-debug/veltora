import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Star, Quote, Sparkles, MessageSquare } from 'lucide-react';

interface TestimonialsCatalogProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

export const TestimonialsCatalog: React.FC<TestimonialsCatalogProps> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  const { testimonials, siteSettings } = useCms();

  const activeTestimonials = testimonials
    .filter((t) => t.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-[#E6DECE] text-[#B58A3E] shadow-2xs">
          <Quote className="w-3.5 h-3.5" />
          Client Voices & Endorsements
        </span>

        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#191C1E]">
          What Our Partners Say
        </h1>

        <p className="text-xs sm:text-base text-[#5F6368] leading-relaxed">
          Read direct feedback from clients, industry collaborators, and academic partners who have built technology systems with Veltora.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {activeTestimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-[#E6DECE] p-7 shadow-xs hover:border-[#B58A3E] transition-all flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C59A4E] text-[#C59A4E]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#E6DECE] group-hover:text-[#B58A3E] transition-colors" />
              </div>

              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed italic">
                "{item.message}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0E8D9] flex items-center gap-3.5">
              {item.photoUrl ? (
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E6DECE]"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#191C1E] text-[#FAF8F5] flex items-center justify-center font-bold text-xs">
                  {item.name[0]}
                </div>
              )}
              <div>
                <h4 className="font-display text-xs font-bold text-[#191C1E]">
                  {item.name}
                </h4>
                <p className="text-[11px] text-[#5F6368]">
                  {item.designation}, {item.organization}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Start Project CTA */}
      <div className="rounded-3xl bg-white border border-[#E6DECE] p-8 sm:p-12 text-center space-y-4 shadow-xs max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-[#191C1E]">
          Ready to experience the Veltora standard?
        </h2>
        <p className="text-xs text-[#5F6368] max-w-xl mx-auto leading-relaxed">
          Let’s discuss your next digital product, software architecture, or workflow automation requirement.
        </p>
        <div className="pt-2">
          <button
            onClick={onNavigateContact}
            className="px-6 py-3 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Initiate Project Consultation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
