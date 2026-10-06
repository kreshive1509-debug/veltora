import React from 'react';
import { useCms } from '../../context/CmsContext';
import {
  ExternalLink,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface CareersPageProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigateHome, onNavigateContact }) => {
  const { careerSettings, siteSettings } = useCms();

  const handleOpenGoogleForm = () => {
    if (careerSettings.googleFormUrl) {
      window.open(careerSettings.googleFormUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header / Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-[#E6DECE] text-[#B58A3E] shadow-2xs">
          <GraduationCap className="w-3.5 h-3.5" />
          {careerSettings.subtitle || 'Join the Veltora Engineering Squad'}
        </span>

        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#191C1E] leading-tight">
          {careerSettings.title || 'Build Production Software with Us'}
        </h1>

        <p className="text-xs sm:text-base text-[#5F6368] leading-relaxed">
          {careerSettings.description}
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={handleOpenGoogleForm}
            className="px-6 py-3 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer group"
          >
            <span>Apply via Google Form</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C59A4E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={onNavigateContact}
            className="px-6 py-3 text-xs font-semibold text-[#191C1E] bg-white hover:bg-[#FAF8F5] border border-[#E6DECE] rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            Ask Questions
          </button>
        </div>
      </div>

      {/* Perks Grid */}
      <div className="mb-20 bg-white rounded-3xl border border-[#E6DECE] p-8 sm:p-12 shadow-xs">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B58A3E] block mb-1">
            Why Join Us
          </span>
          <h2 className="font-display text-2xl font-bold text-[#191C1E]">
            Real Work. Real Responsibility. Real Velocity.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careerSettings.perks.map((perk, idx) => (
            <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DECE]">
              <CheckCircle2 className="w-5 h-5 text-[#B58A3E] shrink-0 mt-0.5" />
              <span className="text-xs font-medium text-[#191C1E] leading-relaxed">
                {perk}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DECE] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B58A3E] block mb-1">
              Active Openings
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#191C1E]">
              Current Roles & Fellowships
            </h2>
          </div>
          <span className="text-xs text-[#5F6368] font-mono">
            {careerSettings.openRoles.length} Open Positions
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {careerSettings.openRoles.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-2xl border border-[#E6DECE] p-6 shadow-xs hover:border-[#B58A3E] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E6DECE] text-[#B58A3E]">
                    {role.department}
                  </span>
                  <span className="text-[10px] font-semibold text-[#5F6368] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {role.type}
                  </span>
                  <span className="text-[10px] font-semibold text-[#5F6368] flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {role.location}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#191C1E]">
                  {role.title}
                </h3>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  {role.description}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={handleOpenGoogleForm}
                  className="w-full md:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C59A4E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
