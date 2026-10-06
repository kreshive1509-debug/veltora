import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Program } from '../../types';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  ArrowRight,
  X,
  Award,
} from 'lucide-react';

interface ProgramsSectionProps {
  onNavigateContact?: () => void;
  selectedSlug?: string | null;
  onSelectProgram?: (slug: string | null) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  onNavigateContact,
  selectedSlug,
  onSelectProgram,
}) => {
  const { programs } = useCms();
  const [internalSelected, setInternalSelected] = useState<Program | null>(null);

  const activePrograms = programs
    .filter((p) => p.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const activeModalProgram =
    internalSelected ||
    (selectedSlug ? programs.find((p) => p.slug === selectedSlug) : null);

  if (activePrograms.length === 0) {
    return null;
  }

  return (
    <section id="programs" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
              Student Initiatives & Fellowships
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E]">
              Upskilling the Next Generation of Builders.
            </h2>
          </div>
          <p className="text-sm text-[#5C6169] max-w-sm">
            Bridging academic theory and production-grade engineering through structured mentorship cohorts and live codebases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activePrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-[#FFFFFF] rounded-3xl border border-[#E6DECE] hover:border-[#C59A4E]/60 p-8 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#806429] uppercase">
                    <GraduationCap className="w-4 h-4 text-[#B58A3E]" />
                    <span>{prog.duration}</span>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      prog.applicationStatus === 'Open'
                        ? 'bg-[#EBF7EE] text-[#1E7E34]'
                        : 'bg-[#F4F5F7] text-[#5E6573]'
                    }`}
                  >
                    Applications {prog.applicationStatus}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#191C1E] mb-3">
                  {prog.name}
                </h3>

                <p className="text-sm text-[#4A4E54] leading-relaxed mb-6 font-normal">
                  {prog.description}
                </p>

                <div className="space-y-2 mb-6">
                  {prog.benefits.slice(0, 3).map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-[#595E66]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B58A3E] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#F0E8D9] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#6B7280] block">Tuition / Investment</span>
                  <span className="text-xs font-bold text-[#191C1E]">{prog.fee}</span>
                </div>

                <button
                  onClick={() => {
                    if (onSelectProgram) onSelectProgram(prog.slug);
                    else setInternalSelected(prog);
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-[#191C1E] text-white rounded-xl hover:bg-[#2B2F34] transition-colors flex items-center gap-1.5"
                >
                  <span>Program Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C59A4E]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Details Modal */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-2xl border border-[#E6DECE] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setInternalSelected(null);
                if (onSelectProgram) onSelectProgram(null);
              }}
              className="absolute top-4 right-4 p-2 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-[#F0E8D9] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold text-[#926E28] uppercase tracking-wider block mb-1">
              Program Specification · {activeModalProgram.duration}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#191C1E] mb-3">
              {activeModalProgram.name}
            </h3>

            <p className="text-sm sm:text-base text-[#4A4E54] leading-relaxed mb-6 font-normal">
              {activeModalProgram.description}
            </p>

            <div className="bg-[#FFFFFF] border border-[#E6DECE] p-4 rounded-xl mb-6">
              <h4 className="text-xs font-semibold text-[#191C1E] uppercase tracking-wider mb-2">
                Candidate Eligibility
              </h4>
              <p className="text-xs text-[#52575E]">{activeModalProgram.eligibility}</p>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-semibold text-[#191C1E] uppercase tracking-wider mb-3">
                Key Deliverables & Fellowship Benefits
              </h4>
              <div className="space-y-2">
                {activeModalProgram.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#52575E]">
                    <CheckCircle2 className="w-4 h-4 text-[#B58A3E] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE2D0] flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-[#6B7280] block">Registration Fee</span>
                <span className="text-xs font-bold text-[#191C1E]">{activeModalProgram.fee}</span>
              </div>

              <button
                onClick={() => {
                  setInternalSelected(null);
                  if (onSelectProgram) onSelectProgram(null);
                  if (onNavigateContact) onNavigateContact();
                }}
                className="px-5 py-2.5 text-xs font-semibold bg-[#191C1E] text-white rounded-lg hover:bg-[#2B2F34] transition-colors"
              >
                Apply for {activeModalProgram.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
