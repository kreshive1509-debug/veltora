import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Project, ProjectStatus } from '../../types';
import { ImageLightbox, LightboxImage } from './ImageLightbox';
import {
  ExternalLink,
  Github,
  ArrowLeft,
  ArrowRight,
  Globe,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Maximize2,
  Handshake,
} from 'lucide-react';

interface ProjectsCatalogProps {
  projectSlug?: string | null;
  onNavigateHome: () => void;
  onSelectProject: (slug: string) => void;
  onSelectPartner?: (slug: string) => void;
  onNavigateContact: () => void;
}

export const ProjectsCatalog: React.FC<ProjectsCatalogProps> = ({
  projectSlug,
  onNavigateHome,
  onSelectProject,
  onSelectPartner,
  onNavigateContact,
}) => {
  const { projects, projectImages, partners } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const activeProjects = projects.filter((p) => p.isActive);

  // Single Project Case Study View (/projects/:slug)
  if (projectSlug) {
    const project = projects.find((p) => p.slug === projectSlug) || projects[0];

    if (!project) {
      return (
        <div className="min-h-screen pt-32 pb-20 px-4 text-center max-w-xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-[#191C1E] mb-3">Project Not Found</h2>
          <p className="text-xs text-[#6B7280] mb-6">The requested deployment record does not exist.</p>
          <button
            onClick={() => onSelectProject('')}
            className="px-4 py-2 text-xs font-semibold bg-[#191C1E] text-white rounded-xl"
          >
            Back to All Projects
          </button>
        </div>
      );
    }

    const currentProjectImages = projectImages
      .filter((img) => img.projectId === project.id)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    // Prepare Lightbox Images
    const allGalleryImages: LightboxImage[] = [
      { url: project.heroImageUrl || project.thumbnail, alt: project.name, caption: `${project.name} Hero View` },
      ...currentProjectImages.map((img) => ({
        url: img.imageUrl,
        alt: img.altText || project.name,
        caption: img.caption || img.altText,
      })),
    ];

    const relatedProjects = projects.filter(
      (p) => p.id !== project.id && p.isActive && (p.category === project.category || p.year === project.year)
    );

    const linkedPartner = project.partnerId
      ? partners.find((pt) => pt.id === project.partnerId)
      : null;

    const openLightboxAt = (idx: number) => {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    };

    return (
      <div className="min-h-screen pt-28 pb-24 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-8">
            <button
              onClick={() => onSelectProject('')}
              className="hover:text-[#191C1E] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Work</span>
            </button>
            <span>/</span>
            <span className="text-[#191C1E] font-medium">{project.name}</span>
          </div>

          {/* Project Hero Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-[#806429] uppercase tracking-wider">
                {project.client}
              </span>
              <span aria-hidden="true" className="text-[#D1D5DB]">·</span>
              <span className="text-xs text-[#6B7280]">{project.category}</span>
              <span aria-hidden="true" className="text-[#D1D5DB]">·</span>
              <span className="text-xs text-[#6B7280]">Released {project.year}</span>
              {project.status === 'Live' && (
                <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-800 bg-emerald-100 rounded-full">
                  Live in Production
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#191C1E] leading-tight mb-4">
              {project.name}
            </h1>

            <p className="text-base sm:text-lg text-[#4A4E54] leading-relaxed font-normal max-w-3xl">
              {project.shortDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-sm flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-[#C59A4E]" />
                  <span>Visit Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C59A4E]" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs font-semibold text-[#191C1E] bg-white border border-[#E6DECE] hover:border-[#C59A4E] rounded-xl transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Hero Media Banner */}
          <div
            className="group relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#F4EBD9]/40 border border-[#E6DECE] shadow-sm mb-12 cursor-pointer"
            onClick={() => openLightboxAt(0)}
          >
            <img
              src={project.heroImageUrl || project.thumbnail}
              alt={project.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 bg-black/70 text-white rounded-full text-xs font-medium backdrop-blur-sm flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#C59A4E]" />
                <span>Open Fullscreen Gallery</span>
              </span>
            </div>
          </div>

          {/* Impact Statistics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-2xl border border-[#E6DECE] shadow-xs mb-12">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#191C1E] tabular-nums block">
                    {m.value}
                  </span>
                  <span className="text-xs text-[#6B7280]">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Narrative Section */}
          <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 sm:p-10 shadow-xs space-y-10 mb-12">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#926E28] mb-3">
                Project Overview & Execution
              </h2>
              <p className="text-sm sm:text-base text-[#4A4E54] leading-relaxed font-normal whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>

            {/* Challenges, Solution, Outcome Grid */}
            {(project.projectChallenges || project.projectSolution || project.projectOutcome) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#F0E8D9]">
                {project.projectChallenges && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#191C1E] mb-2">
                      The Operational Challenge
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C6169] leading-relaxed">
                      {project.projectChallenges}
                    </p>
                  </div>
                )}
                {project.projectSolution && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#191C1E] mb-2">
                      Our Architectural Solution
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C6169] leading-relaxed">
                      {project.projectSolution}
                    </p>
                  </div>
                )}
                {project.projectOutcome && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#191C1E] mb-2">
                      Verified Business Outcome
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C6169] leading-relaxed">
                      {project.projectOutcome}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="pt-8 border-t border-[#F0E8D9]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#191C1E] mb-4">
                  Key Technical Capabilities Delivered
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3.5 bg-[#FAF8F5] border border-[#E6DECE] rounded-xl text-xs text-[#52575E]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#B58A3E] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="pt-8 border-t border-[#F0E8D9]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#191C1E] mb-3">
                Core Technology Ecosystem
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-semibold bg-[#FAF6EE] text-[#806429] border border-[#E8DFC9] rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Associated Partner Banner if linked */}
          {linkedPartner && (
            <div className="p-6 bg-[#FAF7F1] border border-[#E8DFC9] rounded-2xl flex items-center justify-between gap-4 mb-12">
              <div className="flex items-center gap-3">
                <Handshake className="w-6 h-6 text-[#926E28]" />
                <div>
                  <span className="text-[11px] font-semibold text-[#806429] uppercase block">
                    Strategic Collaboration
                  </span>
                  <span className="text-sm font-bold text-[#191C1E]">
                    Co-engineered in alliance with {linkedPartner.name}
                  </span>
                </div>
              </div>
              {onSelectPartner && (
                <button
                  onClick={() => onSelectPartner(linkedPartner.slug)}
                  className="text-xs font-semibold text-[#191C1E] hover:underline"
                >
                  Partner Details →
                </button>
              )}
            </div>
          )}

          {/* Project Multi-Image Responsive Gallery */}
          {currentProjectImages.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
                    Visual Walkthrough
                  </span>
                  <h2 className="font-display text-2xl font-bold text-[#191C1E]">
                    Interface & Implementation Gallery
                  </h2>
                </div>
                <span className="text-xs text-[#6B7280]">
                  Click any screenshot to expand in Lightbox
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentProjectImages.map((img, idx) => (
                  <div
                    key={img.id}
                    onClick={() => openLightboxAt(idx + 1)}
                    className="group bg-white rounded-2xl border border-[#E6DECE] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="aspect-[16/10] bg-gray-50 overflow-hidden relative">
                      <img
                        src={img.imageUrl}
                        alt={img.altText || project.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    {img.caption && (
                      <div className="p-3.5 border-t border-[#F0E8D9] bg-[#FAF8F5]">
                        <p className="text-xs text-[#52575E]">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lightbox Component */}
          <ImageLightbox
            images={allGalleryImages}
            currentIndex={lightboxIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            onNavigate={setLightboxIndex}
          />

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="pt-10 border-t border-[#EAE2D0]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl font-bold text-[#191C1E]">
                  More From Our Work
                </h2>
                <button
                  onClick={() => onSelectProject('')}
                  className="text-xs font-semibold text-[#806429] hover:underline"
                >
                  View All Deployments →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedProjects.slice(0, 2).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProject(rel.slug)}
                    className="group bg-white rounded-2xl border border-[#E6DECE] hover:border-[#C59A4E]/60 p-6 shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-gray-100">
                        <img
                          src={rel.thumbnail}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-[#806429] uppercase block mb-1">
                        {rel.category}
                      </span>
                      <h3 className="font-display text-lg font-bold text-[#191C1E] mb-2">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-[#52575E] line-clamp-2">{rel.shortDescription}</p>
                    </div>

                    <div className="pt-4 border-t border-[#F0E8D9] flex items-center justify-between mt-4">
                      <span className="text-xs font-semibold text-[#191C1E] group-hover:text-[#926E28] transition-colors flex items-center gap-1">
                        <span>Read Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C59A4E]" />
                      </span>
                      {rel.liveUrl && (
                        <span className="text-[11px] text-[#6B7280]">Live Site Available</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Conversion CTA */}
          <div className="mt-16 bg-[#191C1E] text-white rounded-3xl p-8 sm:p-10 text-center shadow-xl">
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              Ready to Engineer Your Next Digital Platform?
            </h3>
            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-lg mx-auto mb-6">
              Our engineering leadership is ready to design a custom solution with strict type safety, sub-second latency, and light luxury aesthetics.
            </p>
            <button
              onClick={onNavigateContact}
              className="px-6 py-3 text-xs font-semibold text-[#191C1E] bg-[#FAF8F5] hover:bg-white rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>Initiate Project Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#926E28]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Full Directory / Catalog View (/projects)
  const categories = [
    'All',
    'Enterprise Web Application',
    'Workflow Automation',
    'Digital Platform',
    'Mobile Applications',
    'UI/UX Design',
  ];

  const statuses = ['All', 'Live', 'Completed', 'In Development'];

  const filteredProjects = activeProjects.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Catalog Header */}
        <div className="max-w-3xl mb-12">
          <button
            onClick={onNavigateHome}
            className="text-xs text-[#6B7280] hover:text-[#191C1E] flex items-center gap-1 mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Homepage</span>
          </button>
          <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-2 block">
            Our Portfolio & Work
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E]">
            Selected Systems & Digital Deployments
          </h1>
          <p className="text-sm sm:text-base text-[#595E66] mt-3">
            Browse our catalog of bespoke software platforms, high-throughput workflow engines, and light luxury web systems.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E6DECE]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF6EE] border border-[#E8DFC9] rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-[#191C1E] shadow-xs'
                    : 'text-[#6B7280] hover:text-[#191C1E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search and Status */}
          <div className="flex items-center gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-xl text-[#191C1E]"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  Status: {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#6B7280]">
            No projects found matching the selected criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-[#FFFFFF] rounded-3xl border border-[#E6DECE] hover:border-[#C59A4E]/60 overflow-hidden transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div
                    className="relative aspect-[16/10] overflow-hidden bg-[#F4EBD9]/40 border-b border-[#F0E8D9] cursor-pointer"
                    onClick={() => onSelectProject(project.slug)}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] font-medium text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                      <span>{project.category}</span>
                    </div>
                    {project.status === 'Live' && (
                      <div className="absolute top-4 right-4 text-[10px] font-semibold text-emerald-800 bg-emerald-50/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-200">
                        Live
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-7">
                    <span className="text-[11px] font-semibold text-[#806429] uppercase tracking-wider block mb-1">
                      {project.client} · {project.year}
                    </span>
                    <h3
                      onClick={() => onSelectProject(project.slug)}
                      className="font-display text-xl font-bold text-[#191C1E] mb-2.5 group-hover:text-[#926E28] transition-colors cursor-pointer"
                    >
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A4E54] leading-relaxed mb-4 line-clamp-2">
                      {project.shortDescription}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#6B7280]">
                      {project.technologies.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#EAE2D0]">
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] text-[#9CA3AF]">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#F0E8D9] flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(project.slug)}
                    className="text-xs font-semibold text-[#191C1E] hover:text-[#926E28] transition-colors flex items-center gap-1"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B58A3E]" />
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#656A72] hover:text-[#191C1E] flex items-center gap-1"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3 text-[#B58A3E]" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
