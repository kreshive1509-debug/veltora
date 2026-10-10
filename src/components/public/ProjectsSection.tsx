import React from 'react';
import { useCms } from '../../context/CmsContext';
import { ExternalLink, ArrowRight, Layers, Github, Globe } from 'lucide-react';

interface ProjectsSectionProps {
  onViewAllProjects: () => void;
  onSelectProject: (slug: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onViewAllProjects,
  onSelectProject,
}) => {
  const { projects } = useCms();

  const featuredProjects = projects
    .filter((p) => p.isActive && p.isFeatured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="projects" className="py-24 bg-[#FAF7F1] border-t border-[#EAE2D0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
              Our Work & Deployments
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E] leading-tight">
              Production Software Built with Precision.
            </h2>
            <p className="text-sm sm:text-base text-[#595E66] mt-3">
              Explore real-world web applications, automated business platforms, and cloud architectures engineered by Veltora.
            </p>
          </div>

          <div>
            <button
              onClick={onViewAllProjects}
              className="px-5 py-2.5 text-xs font-semibold text-[#191C1E] bg-white border border-[#E6DECE] hover:border-[#C59A4E] rounded-xl transition-all shadow-xs flex items-center gap-2 group whitespace-nowrap"
            >
              <span>Explore All Work ({projects.filter((p) => p.isActive).length})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59A4E] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Featured Projects Stacked / Horizontal Editorial Cards */}
        <div className="space-y-8">
          {featuredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group bg-[#FFFFFF] rounded-3xl border border-[#E6DECE] hover:border-[#C59A4E]/60 overflow-hidden transition-all duration-300 shadow-xs hover:shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              {/* Media Column */}
              <div className="lg:col-span-6 relative overflow-hidden bg-[#F4EBD9]/40 border-b lg:border-b-0 lg:border-r border-[#F0E8D9] min-h-[280px]">
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] font-medium text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>
                {project.status === 'Live' && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Deployment</span>
                  </div>
                )}
              </div>

              {/* Content Column */}
              <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#806429] uppercase tracking-wider block mb-1">
                    Client: {project.client}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#191C1E] mb-3 group-hover:text-[#926E28] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[#4A4E54] leading-relaxed mb-6 font-normal">
                    {project.shortDescription}
                  </p>

                  {/* Impact metrics if available */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#FAF7F1] rounded-xl border border-[#EAE2D0] mb-6">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-center">
                          <span className="block font-display text-sm sm:text-base font-bold text-[#191C1E] tabular-nums">
                            {m.value}
                          </span>
                          <span className="block text-[10px] text-[#6B7280] truncate">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technology Tags (Clean unboxed with slashes) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7280] mb-6">
                    {project.technologies.map((tech, tIdx) => (
                      <React.Fragment key={tIdx}>
                        <span>{tech}</span>
                        {tIdx < project.technologies.length - 1 && (
                          <span className="text-[#C59A4E]" aria-hidden="true">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Triggers */}
                <div className="pt-6 border-t border-[#F0E8D9] flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => onSelectProject(project.slug)}
                    className="text-xs font-semibold text-[#191C1E] hover:text-[#926E28] transition-colors flex items-center gap-1.5 focus:outline-none"
                  >
                    <span>View Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B58A3E] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-xs font-semibold text-[#191C1E] bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E6DECE] rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Globe className="w-3.5 h-3.5 text-[#B58A3E]" />
                        <span>Visit Live Website</span>
                        <ExternalLink className="w-3 h-3 text-[#B58A3E]" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#656A72] hover:text-[#191C1E] transition-colors"
                        aria-label="View Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
