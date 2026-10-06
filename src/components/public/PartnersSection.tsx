import React from 'react';
import { useCms } from '../../context/CmsContext';
import { ExternalLink, ArrowRight, Handshake, MapPin } from 'lucide-react';

interface PartnersSectionProps {
  onViewAllPartners: () => void;
  onSelectPartner: (slug: string) => void;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({
  onViewAllPartners,
  onSelectPartner,
}) => {
  const { partners } = useCms();

  const activePartners = partners
    .filter((p) => p.isActive && p.isFeatured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (activePartners.length === 0) {
    return null;
  }

  return (
    <section id="partners" className="py-24 bg-[#FAF7F1] border-y border-[#EAE2D0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
              Our Partners
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E] leading-tight">
              Building Meaningful Collaborations.
            </h2>
            <p className="text-sm sm:text-base text-[#595E66] mt-3">
              Collaborating with forward-thinking organizations, academic institutions, and technology partners to engineer tomorrow's digital capabilities.
            </p>
          </div>

          <div>
            <button
              onClick={onViewAllPartners}
              className="px-5 py-2.5 text-xs font-semibold text-[#191C1E] bg-white border border-[#E6DECE] hover:border-[#C59A4E] rounded-xl transition-all shadow-xs flex items-center gap-2 group whitespace-nowrap"
            >
              <span>View All Partners ({partners.filter((p) => p.isActive).length})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59A4E] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Premium Partner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePartners.map((partner) => (
            <div
              key={partner.id}
              className="group bg-[#FFFFFF] rounded-3xl border border-[#E6DECE] hover:border-[#C59A4E]/60 p-7 sm:p-8 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header Badge and Logo */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#FAF6EE] text-[#806429] border border-[#E8DFC9]">
                    {partner.partnershipType}
                  </span>
                  {partner.location && (
                    <span className="text-[11px] text-[#8C929C] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {partner.location}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E6DECE] p-1.5 overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#191C1E] group-hover:text-[#926E28] transition-colors">
                      {partner.name}
                    </h3>
                    {partner.partnershipDate && (
                      <span className="text-[11px] text-[#6B7280]">
                        {partner.partnershipDate}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4A4E54] leading-relaxed mb-6 font-normal">
                  {partner.shortDescription}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-5 border-t border-[#F0E8D9] flex items-center justify-between">
                {partner.hasDetailPage ? (
                  <button
                    onClick={() => onSelectPartner(partner.slug)}
                    className="text-xs font-semibold text-[#191C1E] hover:text-[#926E28] transition-colors flex items-center gap-1.5"
                  >
                    <span>Partner Overview</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B58A3E] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <span className="text-[11px] text-[#8C929C]">Alliance Partner</span>
                )}

                {partner.websiteUrl && (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[#656A72] hover:text-[#191C1E] flex items-center gap-1 transition-colors"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3 text-[#B58A3E]" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
