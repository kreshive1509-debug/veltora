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
  Sparkles,
} from 'lucide-react';

interface LeadershipCatalogProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

export const LeadershipCatalog: React.FC<LeadershipCatalogProps> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  const { leadership, siteSettings } = useCms();
  const [selectedLeader, setSelectedLeader] = useState<Leadership | null>(null);

  const activeLeaders = leadership
    .filter((l) => l.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-[#E6DECE] text-[#B58A3E] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          The People Behind Veltora
        </span>

        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#191C1E]">
          Executive Leadership
        </h1>

        <p className="text-xs sm:text-base text-[#5F6368] leading-relaxed">
          Student visionaries and engineering architects steering Veltora's technical rigor, commercial product delivery, and university fellowship programs.
        </p>
      </div>

      {/* Leadership Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {activeLeaders.map((leader) => (
          <div
            key={leader.id}
            className="bg-white rounded-3xl border border-[#E6DECE] overflow-hidden shadow-xs hover:border-[#B58A3E] transition-all flex flex-col sm:flex-row group"
          >
            {/* Photo */}
            <div className="sm:w-2/5 relative overflow-hidden bg-[#FAF8F5] min-h-[260px] sm:min-h-full">
              <img
                src={leader.photoUrl}
                alt={leader.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#E6DECE] text-[#B58A3E]">
                  {leader.roleType === 'founder'
                    ? 'Founder & CTO'
                    : leader.roleType === 'co_founder'
                    ? 'Co-Founder & Product'
                    : 'Leadership'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#191C1E]">
                  {leader.name}
                </h2>
                <p className="text-xs font-semibold text-[#B58A3E]">
                  {leader.designation}
                </p>
                <p className="text-xs text-[#5F6368] leading-relaxed line-clamp-3">
                  {leader.shortBio}
                </p>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-[#F0E8D9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {leader.linkedinUrl && (
                    <a
                      href={leader.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#5F6368] hover:text-[#0A66C2] hover:bg-[#EBF3FC] transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {leader.githubUrl && (
                    <a
                      href={leader.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#5F6368] hover:text-[#191C1E] hover:bg-[#E8EAED] transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {leader.instagramUrl && (
                    <a
                      href={leader.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#5F6368] hover:text-[#E4405F] hover:bg-[#FDF2F4] transition-colors"
                      title="Instagram Profile"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {leader.email && (
                    <a
                      href={`mailto:${leader.email}`}
                      className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#5F6368] hover:text-[#B58A3E] hover:bg-[#FAF6EF] transition-colors"
                      title="Send Direct Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedLeader(leader)}
                  className="text-xs font-semibold text-[#191C1E] hover:text-[#B58A3E] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leadership Detail Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E6DECE] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedLeader.photoUrl}
                  alt={selectedLeader.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-[#E6DECE]"
                />
                <div>
                  <h3 className="font-display text-xl font-bold text-[#191C1E]">
                    {selectedLeader.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#B58A3E]">
                    {selectedLeader.designation}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLeader(null)}
                className="p-2 rounded-full hover:bg-[#FAF8F5] text-[#8C9199] hover:text-[#191C1E] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#5F6368] leading-relaxed">
              <h4 className="font-bold text-[#191C1E] text-xs uppercase tracking-wider">
                Biography & Vision
              </h4>
              <p className="whitespace-pre-line">{selectedLeader.fullBio}</p>
            </div>

            <div className="pt-4 border-t border-[#F0E8D9] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {selectedLeader.email && (
                  <a
                    href={`mailto:${selectedLeader.email}`}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#191C1E] text-white hover:bg-[#2B2F34] transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C59A4E]" />
                    <span>Email Direct</span>
                  </a>
                )}
                {selectedLeader.whatsapp && (
                  <a
                    href={`https://wa.me/${selectedLeader.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedLeader(null);
                  onNavigateContact();
                }}
                className="text-xs font-semibold text-[#B58A3E] hover:underline cursor-pointer"
              >
                Schedule Consultation →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
