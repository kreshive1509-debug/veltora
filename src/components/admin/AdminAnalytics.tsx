import React from 'react';
import { useCms } from '../../context/CmsContext';
import { BarChart3, TrendingUp, Eye, Inbox, FolderGit2, Code2, Users, ShieldCheck } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { enquiries, projects, services, blogPosts, galleryAlbums } = useCms();

  const totalEnquiries = enquiries.length;
  const inDiscussion = enquiries.filter((e) => e.status === 'In Discussion').length;
  const converted = enquiries.filter((e) => e.status === 'Converted').length;

  const popularPages = [
    { path: '/', title: 'Homepage / Showcase', views: 4280, change: '+18%' },
    { path: '/projects', title: 'Our Work & Case Studies', views: 2410, change: '+24%' },
    { path: '/services', title: 'Services & Capabilities', views: 1890, change: '+12%' },
    { path: '/leadership', title: 'Executive Leadership', views: 1420, change: '+8%' },
    { path: '/gallery', title: 'Inside Veltora Gallery', views: 980, change: '+15%' },
    { path: '/careers', title: 'Careers & Google Form', views: 820, change: '+32%' },
  ];

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A3E] block mb-1">
            Privacy-First Insights
          </span>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#191C1E]">
            Aggregate Performance & Analytics
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Real-time aggregate engagement metrics, top case studies, and conversion pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#E6DECE] px-3 py-1.5 rounded-xl text-xs text-[#5F6368]">
          <ShieldCheck className="w-4 h-4 text-[#B58A3E]" />
          <span>Zero PII / Privacy Compliant</span>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E6DECE] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5F6368]">Total Enquiries</span>
            <Inbox className="w-4 h-4 text-[#B58A3E]" />
          </div>
          <p className="font-display text-2xl font-bold text-[#191C1E] font-mono tabular-nums">
            {totalEnquiries}
          </p>
          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
            {converted} converted / {inDiscussion} in active talks
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6DECE] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5F6368]">Live Projects</span>
            <FolderGit2 className="w-4 h-4 text-[#B58A3E]" />
          </div>
          <p className="font-display text-2xl font-bold text-[#191C1E] font-mono tabular-nums">
            {projects.length}
          </p>
          <span className="text-[10px] text-[#5F6368] font-mono">
            {projects.filter((p) => p.isFeatured).length} featured on home
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6DECE] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5F6368]">Active Services</span>
            <Code2 className="w-4 h-4 text-[#B58A3E]" />
          </div>
          <p className="font-display text-2xl font-bold text-[#191C1E] font-mono tabular-nums">
            {services.length}
          </p>
          <span className="text-[10px] text-[#5F6368] font-mono">
            Full-stack disciplines
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6DECE] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5F6368]">Gallery & Albums</span>
            <Eye className="w-4 h-4 text-[#B58A3E]" />
          </div>
          <p className="font-display text-2xl font-bold text-[#191C1E] font-mono tabular-nums">
            {galleryAlbums.length}
          </p>
          <span className="text-[10px] text-[#5F6368] font-mono">
            Inside Veltora moments
          </span>
        </div>
      </div>

      {/* Popular Pages Table */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-4">
        <h2 className="font-display text-base font-bold text-[#191C1E]">
          Most Visited Public Routes
        </h2>

        <div className="divide-y divide-[#F0E8D9]">
          {popularPages.map((page, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[#8C9199] w-4">{idx + 1}.</span>
                <div>
                  <span className="font-semibold text-[#191C1E] block">{page.title}</span>
                  <span className="font-mono text-[11px] text-[#B58A3E]">{page.path}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="font-mono font-bold text-[#191C1E] tabular-nums">
                  {page.views.toLocaleString()} views
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-mono">
                  {page.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
