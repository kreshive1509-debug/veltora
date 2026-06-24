import React from 'react';
import { ExternalLink, Flame, Shield, Server, Database } from 'lucide-react';

interface PartnerProps {
  onShowToast: (text: string, type: 'success' | 'info' | 'error') => void;
}

export const Partner: React.FC<PartnerProps> = ({ onShowToast }) => {

  const handleVisit = () => {
    onShowToast('Navigating to SkillsGen Hub... 🌐', 'info');
  };

  return (
    <section
      id="partners"
      className="relative py-24 px-6 overflow-hidden bg-[#05071A]"
    >
      {/* Visual neon light blobs */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Alliance giant subtitle */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00F5FF] mb-3 block">
            STRATEGIC ALLIANCE
          </span>
          <h2 className="text-4xl md:text-[52px] font-black font-space tracking-tight text-white mb-4">
            Veltora <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2FFF] to-[#00F5FF]">×</span> SkillsGen
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7B2FFF] to-[#00F5FF] mx-auto mt-6 rounded-full" />
        </div>

        {/* Detailed Partner Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Text block */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold font-space text-white">
              Smarter Solutions with <span className="text-[#00F5FF] font-black">SkillsGen</span>
            </h3>
            
            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              Veltora IT Solutions works hand-in-hand with our key strategic partner, <span className="text-[#00F5FF] font-bold">SkillsGen</span>, which is led by the visionary tech architect <span className="text-white font-bold underline decoration-[#7B2FFF] decoration-2">Shaaz Ali</span>. Together, we form an unbreakable full-stack consortium that handles both frontfront pixel design and rigorous database architecture.
            </p>
            
            {/* Tech highlights */}
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="flex items-start gap-2 text-sm text-white/80">
                <Server className="w-5 h-5 text-[#7B2FFF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider">Backend Architecture</h4>
                  <p className="text-xs text-white/55">Robust Node, Express, and Server operations</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm text-white/80">
                <Database className="w-5 h-5 text-[#00F5FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider">Database Optimization</h4>
                  <p className="text-xs text-white/55">Enterprise SQL structures, normalization, indexing</p>
                </div>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              While Veltora delivers impeccable client templates and custom interfaces, SkillsGen powers robust APIs, backend environments, database warehousing, and cloud deployments.
            </p>

            <a
              id="partner-visit-btn"
              href="https://www.skillsgen.in/programs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#7B2FFF] to-[#A855F7] text-white hover:opacity-90 transition-all pointer-events-auto cursor-pointer shadow-lg shadow-purple-500/10"
            >
              Visit SkillsGen <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Logo / visual column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative p-8 rounded-3xl glass card-shadow">
            <span className="text-xs font-black tracking-widest text-[#00F5FF]/40 uppercase mb-4">COLLABORATION SIGNATURE</span>
            <div className="text-5xl font-black font-space bg-gradient-to-r from-[#7B2FFF] to-[#00F5FF] bg-clip-text text-transparent transform hover:scale-105 duration-300 select-none cursor-default py-4">
              VELTORA × SKILLSGEN
            </div>
            <div className="text-center text-xs text-white/50 max-w-xs mt-4">
              Integrated students-driven synergy building modern web frameworks and deep backend warehouses.
            </div>
          </div>
        </div>

        {/* Dual side-by-side programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left card - Veltora */}
          <div
            id="partner-program-veli"
            className="p-8 md:p-10 rounded-2xl glass card-shadow hover:border-[#7B2FFF]/50 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-2xl rounded-full" />
            <Flame className="w-10 h-10 text-[#7B2FFF] mb-6" />
            <h4 className="text-xl font-bold font-space text-white mb-3">
              Veltora Internship Program
            </h4>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed">
              Provides practical freelancing operations, user interface design, portfolio generation, and client management. This gives candidates immediate workspace exposure and verified completion certificates while building solid project portfolios.
            </p>
          </div>

          {/* Right card - SkillsGen */}
          <div
            id="partner-program-skills"
            className="p-8 md:p-10 rounded-2xl glass card-shadow hover:border-[#00F5FF]/50 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-2xl rounded-full" />
            <Shield className="w-10 h-10 text-[#00F5FF] mb-6" />
            <h4 className="text-xl font-bold font-space text-white mb-3">
              SkillsGen Training Program
            </h4>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed">
              Focuses on hardcore professional technical upskilling, deep relational database development, secure backend routing, and scalable API logic. Speeds up candidates' technical growth with senior guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
