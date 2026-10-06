import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const { teamMembers } = useCms();

  const activeMembers = teamMembers
    .filter((m) => m.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (activeMembers.length === 0) {
    return null;
  }

  return (
    <section id="team" className="py-24 bg-[#FAF7F1] border-y border-[#EAE2D0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
            Core Engineering Squad
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E]">
            Specialists Behind Every System.
          </h2>
          <p className="text-sm sm:text-base text-[#595E66] mt-3">
            Frontend architects, infrastructure engineers, and UX designers crafting resilient software.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#FFFFFF] rounded-2xl border border-[#E6DECE] p-6 hover:border-[#C59A4E]/50 transition-all duration-300 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full object-cover border border-[#E6DECE]"
                  />
                  <div>
                    <h3 className="font-display text-base font-bold text-[#191C1E]">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#806429]">
                      {member.designation}
                    </p>
                    <p className="text-[11px] text-[#6B7280]">
                      {member.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#52575E] leading-relaxed mb-6 font-normal">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0E8D9] flex items-center gap-2">
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[#656A72] hover:text-[#191C1E] transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[#656A72] hover:text-[#191C1E] transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-1.5 text-[#656A72] hover:text-[#191C1E] transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
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
