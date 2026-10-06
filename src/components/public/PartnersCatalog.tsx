import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  ExternalLink,
  Linkedin,
  Instagram,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calendar,
  Layers,
} from 'lucide-react';

interface PartnersCatalogProps {
  partnerSlug?: string | null;
  onNavigateHome: () => void;
  onSelectPartner: (slug: string) => void;
  onSelectProject: (slug: string) => void;
}

export const PartnersCatalog: React.FC<PartnersCatalogProps> = ({
  partnerSlug,
  onNavigateHome,
  onSelectPartner,
  onSelectProject,
}) => {
  const { partners, projects } = useCms();
  const [selectedType, setSelectedType] = useState<string>('All');

  const activePartners = partners.filter((p) => p.isActive);

  // Single Partner Detail View
  if (partnerSlug) {
    const partner = partners.find((p) => p.slug === partnerSlug) || partners[0];
    const relatedProjects = projects.filter((p) => p.partnerId === partner?.id && p.isActive);

    if (!partner) {
      return (
        <div className="min-h-screen pt-32 pb-20 px-4 text-center max-w-xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-[#191C1E] mb-3">Partner Not Found</h2>
          <p className="text-xs text-[#6B7280] mb-6">The requested collaboration record does not exist.</p>
          <button
            onClick={() => onSelectPartner('')}
            className="px-4 py-2 text-xs font-semibold bg-[#191C1E] text-white rounded-xl"
          >
            Back to Partners Directory
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-screen pt-28 pb-24 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-8">
            <button
              onClick={() => onSelectPartner('')}
              className="hover:text-[#191C1E] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Partners</span>
            </button>
            <span>/</span>
            <span className="text-[#191C1E] font-medium">{partner.name}</span>
          </div>

          {/* Hero Card */}
          <div className="bg-white rounded-3xl border border-[#E6DECE] overflow-hidden shadow-xs mb-10">
            {partner.coverImageUrl && (
              <div className="aspect-[21/9] w-full bg-[#F4EBD9]/40 overflow-hidden relative">
                <img
                  src={partner.coverImageUrl}
                  alt={partner.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            )}

            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#F0E8D9]">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-[#FAF8F5] border border-[#E6DECE] p-2 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#926E28] uppercase tracking-wider block mb-1">
                      {partner.partnershipType}
                    </span>
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#191C1E]">
                      {partner.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280] mt-1">
                      {partner.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#B58A3E]" />
                          {partner.location}
                        </span>
                      )}
                      {partner.partnershipDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#B58A3E]" />
                          {partner.partnershipDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 text-xs font-semibold bg-[#191C1E] text-white hover:bg-[#2B2F34] rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <span>Visit Partner Website</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C59A4E]" />
                    </a>
                  )}
                </div>
              </div>

              {/* Narrative */}
              <div className="py-8 space-y-6">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-[#191C1E] mb-2">
                    About The Collaboration
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4E54] leading-relaxed font-normal whitespace-pre-line">
                    {partner.description}
                  </p>
                </div>

                {/* Highlights */}
                {partner.highlights && partner.highlights.length > 0 && (
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#191C1E] mb-3">
                      Partnership Highlights & Shared Milestones
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {partner.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3.5 bg-[#FAF8F5] border border-[#E6DECE] rounded-xl text-xs text-[#52575E]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#B58A3E] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-[#F0E8D9] flex items-center justify-between text-xs">
                <span className="text-[#6B7280]">Connect with {partner.name}:</span>
                <div className="flex items-center gap-3">
                  {partner.linkedinUrl && (
                    <a
                      href={partner.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#656A72] hover:text-[#191C1E] rounded-lg bg-[#FAF8F5] border border-[#E6DECE]"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {partner.instagramUrl && (
                    <a
                      href={partner.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#656A72] hover:text-[#191C1E] rounded-lg bg-[#FAF8F5] border border-[#E6DECE]"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Co-Engineered Projects */}
          {relatedProjects.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold text-[#191C1E] mb-6">
                Co-Engineered Deployments with {partner.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white rounded-2xl border border-[#E6DECE] p-6 shadow-xs hover:border-[#C59A4E]/60 transition-colors cursor-pointer"
                    onClick={() => onSelectProject(proj.slug)}
                  >
                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-gray-100">
                      <img
                        src={proj.thumbnail}
                        alt={proj.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#806429] uppercase block mb-1">
                      {proj.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#191C1E] mb-2">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-[#52575E] line-clamp-2">{proj.shortDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full Directory View (/partners)
  const partnershipTypes = [
    'All',
    'Strategic Partner',
    'Technology Partner',
    'Education Partner',
    'Training Partner',
    'Collaboration',
  ];

  const filteredPartners = activePartners.filter(
    (p) => selectedType === 'All' || p.partnershipType === selectedType
  );

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Directory Header */}
        <div className="max-w-3xl mb-12">
          <button
            onClick={onNavigateHome}
            className="text-xs text-[#6B7280] hover:text-[#191C1E] flex items-center gap-1 mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Homepage</span>
          </button>
          <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-2 block">
            Partnership Ecosystem
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E]">
            Collaborations & Industry Alliances
          </h1>
          <p className="text-sm sm:text-base text-[#595E66] mt-3">
            Organizations and institutions that trust and co-build with Veltora IT Solutions.
          </p>
        </div>

        {/* Filter Bar (Interactive Buttons Allowed by Skill) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF6EE] border border-[#E8DFC9] rounded-xl w-fit mb-12 overflow-x-auto max-w-full">
          {partnershipTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedType === type
                  ? 'bg-white text-[#191C1E] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#191C1E]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="group bg-[#FFFFFF] rounded-3xl border border-[#E6DECE] hover:border-[#C59A4E]/60 p-7 sm:p-8 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#FAF6EE] text-[#806429] border border-[#E8DFC9]">
                    {partner.partnershipType}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E6DECE] p-1.5 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
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
                    {partner.location && (
                      <span className="text-[11px] text-[#6B7280]">
                        {partner.location}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4A4E54] leading-relaxed mb-6 font-normal">
                  {partner.shortDescription}
                </p>
              </div>

              <div className="pt-5 border-t border-[#F0E8D9] flex items-center justify-between">
                <button
                  onClick={() => onSelectPartner(partner.slug)}
                  className="text-xs font-semibold text-[#191C1E] hover:text-[#926E28] transition-colors flex items-center gap-1.5"
                >
                  <span>Explore Partnership</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B58A3E] group-hover:translate-x-0.5 transition-transform" />
                </button>

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
    </div>
  );
};
