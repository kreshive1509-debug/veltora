import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Service } from '../../types';
import {
  Terminal,
  Layout,
  Cpu,
  Cloud,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  Code2,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Terminal,
  Layout,
  Cpu,
  Cloud,
  GraduationCap,
  Code2,
};

interface ServicesSectionProps {
  onNavigateContact?: () => void;
  selectedSlug?: string | null;
  onSelectService?: (slug: string | null) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigateContact,
  selectedSlug,
  onSelectService,
}) => {
  const { services } = useCms();
  const [internalSelected, setInternalSelected] = useState<Service | null>(null);

  const activeServices = services
    .filter((s) => s.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const activeModalService =
    internalSelected ||
    (selectedSlug ? activeServices.find((s) => s.slug === selectedSlug) : null);

  if (activeServices.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
              Core Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E]">
              Engineered for Scale, Speed, and Distinction.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5F646C] max-w-md">
            From greenfield software development to automated operational pipelines, we deliver enterprise-grade execution with zero boilerplate.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Terminal;
            return (
              <div
                key={service.id}
                className="group relative bg-[#FFFFFF] rounded-2xl border border-[#E6DECE] hover:border-[#C59A4E]/60 p-7 sm:p-8 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] border border-[#E8DFC9] flex items-center justify-center text-[#926E28] group-hover:scale-110 transition-transform duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-[#8C929C] tabular-nums">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#191C1E] mb-3 group-hover:text-[#926E28] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-sm text-[#52575E] leading-relaxed mb-6 font-normal">
                    {service.shortDescription}
                  </p>

                  {/* Highlights */}
                  {service.keyFeatures && service.keyFeatures.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {service.keyFeatures.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#6B7280]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B58A3E] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#F0E8D9]">
                  <button
                    onClick={() => {
                      if (onSelectService) {
                        onSelectService(service.slug);
                      } else {
                        setInternalSelected(service);
                      }
                    }}
                    className="text-xs font-semibold text-[#191C1E] group-hover:text-[#926E28] transition-colors flex items-center gap-1.5 focus:outline-none"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-2xl border border-[#E6DECE] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setInternalSelected(null);
                if (onSelectService) onSelectService(null);
              }}
              className="absolute top-4 right-4 p-2 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-[#F0E8D9] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold text-[#926E28] uppercase tracking-wider block mb-2">
              {activeModalService.category}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#191C1E] mb-4">
              {activeModalService.name}
            </h3>

            <p className="text-sm sm:text-base text-[#4A4E54] leading-relaxed mb-6 font-normal">
              {activeModalService.fullDescription}
            </p>

            {/* Key Capabilities */}
            {activeModalService.keyFeatures && activeModalService.keyFeatures.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-[#191C1E] uppercase tracking-wider mb-3">
                  Technical Deliverables & Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalService.keyFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-[#52575E] bg-[#FFFFFF] border border-[#E6DECE] p-2.5 rounded-lg"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#B58A3E] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables List */}
            {activeModalService.deliverables && activeModalService.deliverables.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-semibold text-[#191C1E] uppercase tracking-wider mb-3">
                  Package Inclusions
                </h4>
                <ul className="list-disc list-inside text-xs text-[#5C6169] space-y-1.5">
                  {activeModalService.deliverables.map((item, dIdx) => (
                    <li key={dIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-[#EAE2D0] flex items-center justify-between gap-4">
              <span className="text-xs text-[#6B7280]">Ready to deploy this capability?</span>
              <button
                onClick={() => {
                  setInternalSelected(null);
                  if (onSelectService) onSelectService(null);
                  if (onNavigateContact) onNavigateContact();
                }}
                className="px-5 py-2.5 text-xs font-semibold bg-[#191C1E] text-white rounded-lg hover:bg-[#2B2F34] transition-colors"
              >
                Inquire for {activeModalService.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
