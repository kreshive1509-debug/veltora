import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Linkedin, Github, Instagram, Mail, Users, Sparkles, ArrowRight } from 'lucide-react';

interface TeamCatalogProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onNavigateCareers: () => void;
}

export const TeamCatalog: React.FC<TeamCatalogProps> = ({
  onNavigateHome,
  onNavigateContact,
  onNavigateCareers,
}) => {
  const { teamMembers, siteSettings } = useCms();

  const activeMembers = teamMembers
    .filter((m) => m.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-[#E6DECE] text-[#B58A3E] shadow-2xs">
          <Users className="w-3.5 h-3.5" />
          Engineering Squad & Innovators
        </span>

        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#191C1E]">
          Core Engineering Team
        </h1>

        <p className="text-xs sm:text-base text-[#5F6368] leading-relaxed">
          The talented student developers, system architects, and design specialists building world-class technology solutions at Veltora.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {activeMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl border border-[#E6DECE] overflow-hidden shadow-xs hover:border-[#B58A3E] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="aspect-square bg-[#FAF8F5] overflow-hidden relative">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#E6DECE] text-[#B58A3E]">
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-display text-base font-bold text-[#191C1E]">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-[#B58A3E]">
                  {member.designation}
                </p>
                <p className="text-xs text-[#5F6368] leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center gap-2 border-t border-[#F0E8D9] mt-3">
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#5F6368] hover:text-[#0A66C2] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {member.githubUrl && (
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#5F6368] hover:text-[#191C1E] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#5F6368] hover:text-[#B58A3E] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Join Squad Callout */}
      <div className="rounded-3xl bg-white border border-[#E6DECE] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="font-display text-2xl font-bold text-[#191C1E]">
            Want to build real products with us?
          </h2>
          <p className="text-xs text-[#5F6368] max-w-xl leading-relaxed">
            We are always looking for ambitious student engineers and design craftsmen to join our core fellowship tracks.
          </p>
        </div>
        <button
          onClick={onNavigateCareers}
          className="px-6 py-3 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Explore Open Positions</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C59A4E]" />
        </button>
      </div>
    </div>
  );
};
