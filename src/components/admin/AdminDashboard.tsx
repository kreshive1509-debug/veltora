import React from 'react';
import { useCms } from '../../context/CmsContext';
import { AdminTab } from './AdminSidebar';
import {
  Inbox,
  FolderGit2,
  Handshake,
  Image as ImageIcon,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const {
    enquiries,
    projects,
    projectImages,
    partners,
    galleryAlbums,
    galleryImages,
    blogPosts,
    auditLogs,
    siteSettings,
  } = useCms();

  const newEnquiries = enquiries.filter((e) => e.status === 'New');

  const counters = [
    {
      title: 'Projects & Work',
      count: projects.length,
      detail: `${projectImages.length} gallery screenshots`,
      icon: FolderGit2,
      tab: 'projects' as AdminTab,
    },
    {
      title: 'Partners & Alliances',
      count: partners.length,
      detail: `${partners.filter((p) => p.isFeatured).length} featured on homepage`,
      icon: Handshake,
      tab: 'partners' as AdminTab,
    },
    {
      title: 'Gallery Albums',
      count: galleryAlbums.length,
      detail: `${galleryImages.length} official photos`,
      icon: ImageIcon,
      tab: 'gallery' as AdminTab,
    },
    {
      title: 'Client Inquiries',
      count: enquiries.length,
      detail: `${newEnquiries.length} pending new submissions`,
      icon: Inbox,
      tab: 'enquiries' as AdminTab,
      highlight: newEnquiries.length > 0,
    },
    {
      title: 'Journal Articles',
      count: blogPosts.length,
      detail: `${blogPosts.filter((b) => b.isPublished).length} published`,
      icon: BookOpen,
      tab: 'blog' as AdminTab,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Overview & Command Center
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#191C1E]">
            {siteSettings.companyName} Management Console
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Manage live public portfolio, multi-image galleries, partnership alliances, and incoming leads in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('enquiries')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-colors flex items-center gap-2"
          >
            <Inbox className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Review Inquiries ({newEnquiries.length})</span>
          </button>
        </div>
      </div>

      {/* Real Statistics Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {counters.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(c.tab)}
              className={`bg-white rounded-2xl border p-5 transition-all duration-200 shadow-xs cursor-pointer group ${
                c.highlight
                  ? 'border-[#C59A4E] ring-1 ring-[#C59A4E]/30 bg-[#FAF7F1]'
                  : 'border-[#E6DECE] hover:border-[#C59A4E]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#52575E] truncate">{c.title}</span>
                <Icon className="w-4 h-4 text-[#926E28] shrink-0 group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#191C1E] block mb-1 tabular-nums">
                {c.count}
              </span>
              <span className="text-[10px] text-[#6B7280] flex items-center justify-between">
                <span className="truncate">{c.detail}</span>
                <ArrowRight className="w-3 h-3 text-[#C59A4E] shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          );
        })}
      </div>

      {/* Two-Column Activity and Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Client Inquiries */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6DECE] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-bold text-[#191C1E]">
              Recent Client Enquiries
            </h2>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs font-semibold text-[#926E28] hover:underline"
            >
              View All Enquiries ({enquiries.length})
            </button>
          </div>

          {enquiries.length === 0 ? (
            <p className="text-xs text-[#6B7280]">No inquiries submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(0, 4).map((enq) => (
                <div
                  key={enq.id}
                  className="p-3.5 bg-[#FAF8F5] border border-[#E6DECE] rounded-xl flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[11px] font-bold text-[#806429]">
                        {enq.referenceNo}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          enq.status === 'New'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#191C1E] truncate">{enq.name}</p>
                    <p className="text-[11px] text-[#6B7280] truncate">{enq.service} · {enq.email}</p>
                  </div>
                  <button
                    onClick={() => onNavigateTab('enquiries')}
                    className="px-3 py-1.5 text-xs font-medium bg-white border border-[#E6DECE] rounded-lg hover:bg-[#FAF6EE] transition-colors shrink-0"
                  >
                    Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Audit Log Activity Feed */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E6DECE] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-bold text-[#191C1E]">
              Recent Audit Log
            </h2>
            <button
              onClick={() => onNavigateTab('activity')}
              className="text-xs font-semibold text-[#B58A3E] hover:underline cursor-pointer"
            >
              Full Log
            </button>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="text-xs pb-3 border-b border-[#F0E8D9] last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-[#191C1E]">
                    {log.action} · {log.entity}
                  </span>
                  <span className="text-[10px] text-[#8C929C] font-mono">
                    {new Date(log.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B7280] leading-normal">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
