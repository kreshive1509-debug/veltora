import React from 'react';
import { TEAM_MEMBERS } from '../data';
import { Users, Quote } from 'lucide-react';

export const Team: React.FC = () => {
  return (
    <section
      id="team"
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#05071A] to-[#0A0D2E]"
    >
      {/* Background radial shapes */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#A855F7] mb-3 block">
            MINDS BEHIND VELTORA
          </span>
          <h2 className="text-4xl md:text-[52px] font-black font-space tracking-tight text-white mb-6">
            Meet The Student Force
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto">
            Veltora is entirely a student-led technology initiative, formerly known as <span className="text-[#FF2D78] font-bold">Jugaad Developer</span>. We came together to combine raw ingenuity with professional technical standards.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7B2FFF] to-[#00F5FF] mx-auto mt-6 rounded-full" />
        </div>

        {/* 2x2 Grid of Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <div
              id={`team-card-${member.name.toLowerCase().replace(' ', '-')}`}
              key={member.name}
              className="group relative flex flex-col p-8 rounded-2xl glass card-shadow hover:border-[#7B2FFF]/50 transition-all duration-300 transform hover:-translate-y-1.5"
            >
              {/* Text detail */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <h3 className="text-xl font-bold font-space text-white group-hover:text-[#00F5FF] transition-colors">
                    {member.name}
                  </h3>
                  <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#7B2FFF]/10 border border-[#7B2FFF]/30 text-[#A855F7] w-fit">
                    {member.role}
                  </span>
                </div>

                {/* Member Description */}
                <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                  {member.description}
                </p>

                {/* Constant Quote */}
                <div className="flex items-center gap-1.5 text-white/45 text-[11px] italic pt-1">
                  <Quote className="w-2.5 h-2.5 text-[#00F5FF] shrink-0" />
                  <p>“{member.quote}”</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
