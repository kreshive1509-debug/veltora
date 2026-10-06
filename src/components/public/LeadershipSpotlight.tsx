import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Leadership } from '../../types';
import {
  Linkedin,
  Instagram,
  Github,
  Mail,
  MessageSquare,
  Globe,
  ExternalLink,
  X,
  Award,
} from 'lucide-react';

export const LeadershipSpotlight: React.FC = () => {
  const { leadership } = useCms();
  const [selectedLeader, setSelectedLeader] = useState<Leadership | null>(null);

  const activeLeaders = leadership
    .filter((l) => l.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (activeLeaders.length === 0) {
    return null;
  }

  return (
    <section id="leadership" className="py-24 bg-[#FAF7F1] border-y border-[#EAE2D0]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 text-center sm:text-left">
          <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
            Executive Leadership
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E]">
            Meet the People Behind Veltora.
          </h2>
          <p className="text-[#595E66] text-base sm:text-lg mt-4 max-w-2xl font-normal">
            Visionary student technologists steering our engineering standards, architecture, and client partnerships.
          </p>
        </div>

        {/* Large Luxury Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {activeLeaders.map((leader) => {
            const isFounder = leader.roleType === 'founder';
            return (
              <div
                key={leader.id}
                className="group relative bg-[#FFFFFF] rounded-3xl border border-[#E6DECE] hover:border-[#C59A4E]/60 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden flex flex-col"
              >
                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#FAF8F5]/90 backdrop-blur-md text-[#806429] border border-[#E8DFC9] shadow-xs inline-flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-[#B58A3E]" />
                    {isFounder ? 'Founder' : 'Co-Founder'}
                  </span>
                </div>

                {/* Portrait Frame */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#F4EBD9]/40">
                  <img
                    src={leader.photoUrl}
                    alt={leader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191C1E]/80 via-[#191C1E]/20 to-transparent" />
                  
                  {/* Name overlay on image */}
                  <div className="absolute bottom-4 left-6 right-6 text-[#FAF8F5]">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-xs">
                      {leader.name}
                    </h3>
                    <p className="text-sm font-medium text-[#E5D7BE]">
                      {leader.designation}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <p className="text-sm sm:text-base text-[#4A4E54] leading-relaxed mb-6 font-normal">
                    "{leader.shortBio}"
                  </p>

                  <div className="pt-6 border-t border-[#F0E8D9] flex flex-wrap items-center justify-between gap-4">
                    {/* Multi-channel Reach Out Gateways */}
                    <div className="flex items-center gap-2">
                      {leader.linkedinUrl && (
                        <a
                          href={leader.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-[#FAF6EE] hover:bg-[#191C1E] text-[#656A72] hover:text-[#FAF8F5] flex items-center justify-center transition-colors border border-[#E8DFC9]"
                          aria-label={`${leader.name} on LinkedIn`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {leader.githubUrl && (
                        <a
                          href={leader.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-[#FAF6EE] hover:bg-[#191C1E] text-[#656A72] hover:text-[#FAF8F5] flex items-center justify-center transition-colors border border-[#E8DFC9]"
                          aria-label={`${leader.name} on GitHub`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {leader.instagramUrl && (
                        <a
                          href={leader.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-[#FAF6EE] hover:bg-[#191C1E] text-[#656A72] hover:text-[#FAF8F5] flex items-center justify-center transition-colors border border-[#E8DFC9]"
                          aria-label={`${leader.name} on Instagram`}
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {leader.email && (
                        <a
                          href={`mailto:${leader.email}`}
                          className="w-8 h-8 rounded-lg bg-[#FAF6EE] hover:bg-[#191C1E] text-[#656A72] hover:text-[#FAF8F5] flex items-center justify-center transition-colors border border-[#E8DFC9]"
                          aria-label={`Email ${leader.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                      {leader.whatsapp && (
                        <a
                          href={`https://wa.me/${leader.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-[#FAF6EE] hover:bg-[#25D366] text-[#656A72] hover:text-white flex items-center justify-center transition-colors border border-[#E8DFC9]"
                          aria-label={`WhatsApp ${leader.name}`}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      )}
                      {leader.portfolioUrl && (
                        <a
                          href={leader.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-[#FAF6EE] hover:bg-[#191C1E] text-[#656A72] hover:text-[#FAF8F5] flex items-center justify-center transition-colors border border-[#E8DFC9]"
                          aria-label={`${leader.name} Portfolio`}
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {/* View Profile / Read Bio Button */}
                    <button
                      onClick={() => setSelectedLeader(leader)}
                      className="text-xs font-semibold text-[#191C1E] hover:text-[#926E28] transition-colors flex items-center gap-1.5 focus:outline-none"
                    >
                      <span>Read Biography</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#B58A3E]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leadership Biography Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-2xl border border-[#E6DECE] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedLeader(null)}
              className="absolute top-4 right-4 p-2 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-[#F0E8D9] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedLeader.photoUrl}
                alt={selectedLeader.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover border border-[#E6DECE]"
              />
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#191C1E]">
                  {selectedLeader.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#806429]">
                  {selectedLeader.designation}
                </p>
              </div>
            </div>

            <div className="prose prose-sm text-[#4A4E54] space-y-4 mb-6 leading-relaxed">
              <p>{selectedLeader.fullBio}</p>
            </div>

            <div className="pt-4 border-t border-[#EAE2D0] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#6B7280]">Connect with {selectedLeader.name}:</span>
              <div className="flex items-center gap-3">
                {selectedLeader.email && (
                  <a
                    href={`mailto:${selectedLeader.email}`}
                    className="px-3.5 py-2 text-xs font-semibold bg-[#191C1E] text-white rounded-lg hover:bg-[#2B2F34] transition-colors"
                  >
                    Send Email
                  </a>
                )}
                {selectedLeader.whatsapp && (
                  <a
                    href={`https://wa.me/${selectedLeader.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-xs font-semibold bg-[#25D366] text-white rounded-lg hover:bg-[#1EBE5D] transition-colors flex items-center gap-1.5"
                  >
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
