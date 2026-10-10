import React from 'react';
import { useCms } from '../../context/CmsContext';
import {
  LayoutDashboard,
  Palette,
  Layers,
  Menu as MenuIcon,
  Code2,
  FolderGit2,
  Handshake,
  Users2,
  Users,
  Quote,
  Camera,
  Image as ImageIcon,
  Inbox,
  Briefcase,
  Phone,
  HelpCircle,
  Megaphone,
  Search,
  BarChart3,
  FileText,
  ShieldCheck,
  Play,
  AlertTriangle,
  History,
  LogOut,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'maintenance'
  | 'branding'
  | 'hero'
  | 'homepage'
  | 'navigation'
  | 'services'
  | 'projects'
  | 'partners'
  | 'leadership'
  | 'team'
  | 'testimonials'
  | 'gallery'
  | 'media'
  | 'enquiries'
  | 'careers'
  | 'contact'
  | 'faqs'
  | 'announcements'
  | 'seo'
  | 'analytics'
  | 'pages'
  | 'legal'
  | 'loading_screen'
  | 'error_pages'
  | 'activity';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onLogout: () => void;
  onViewSite: () => void;
  enquiriesCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onLogout,
  onViewSite,
  enquiriesCount,
}) => {
  const { siteSettings } = useCms();

  const navItems: { id: AdminTab; label: string; icon: any; count?: number; group?: string }[] = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'maintenance', label: 'Maintenance Mode', icon: ShieldCheck },
    { id: 'enquiries', label: 'Client Enquiries', icon: Inbox, count: enquiriesCount },
    { id: 'branding', label: 'Brand & Appearance', icon: Palette },
    { id: 'hero', label: 'Hero & Background', icon: Sparkles },
    { id: 'homepage', label: 'Homepage Builder', icon: Layers },
    { id: 'navigation', label: 'Navigation & Header', icon: MenuIcon },
    { id: 'services', label: 'Services & Specs', icon: Code2 },
    { id: 'projects', label: 'Projects & Work', icon: FolderGit2 },
    { id: 'partners', label: 'Partners & Alliances', icon: Handshake },
    { id: 'leadership', label: 'Founder & Co-Founder', icon: Users2 },
    { id: 'team', label: 'Core Engineering Squad', icon: Users },
    { id: 'testimonials', label: 'Client Endorsements', icon: Quote },
    { id: 'gallery', label: 'Inside Veltora Gallery', icon: Camera },
    { id: 'media', label: 'Media Library & ImgBB', icon: ImageIcon },
    { id: 'careers', label: 'Careers (Google Form)', icon: Briefcase },
    { id: 'contact', label: 'Contact & Socials', icon: Phone },
    { id: 'faqs', label: 'FAQ Management', icon: HelpCircle },
    { id: 'announcements', label: 'Announcements & Popups', icon: Megaphone },
    { id: 'seo', label: 'SEO & Structured Meta', icon: Search },
    { id: 'analytics', label: 'Aggregate Analytics', icon: BarChart3 },
    { id: 'pages', label: 'Custom Pages Builder', icon: FileText },
    { id: 'legal', label: 'Legal Policies', icon: ShieldCheck },
    { id: 'loading_screen', label: 'Loading Screen CMS', icon: Play },
    { id: 'error_pages', label: '404 & Error Pages', icon: AlertTriangle },
    { id: 'activity', label: 'Activity & Audit Logs', icon: History },
  ];

  const adminLogo =
    siteSettings.adminLogoUrl ||
    siteSettings.lightLogoUrl ||
    siteSettings.primaryLogoUrl;

  return (
    <aside className="w-64 bg-[#191C1E] text-[#FAF8F5] flex flex-col h-screen border-r border-[#2C3035] select-none shrink-0">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#2C3035] flex items-center justify-between">
        <div className="flex items-center gap-2.5 truncate">
          {adminLogo ? (
            <img
              src={adminLogo}
              alt={siteSettings.companyName}
              className="h-7 max-w-[120px] object-contain rounded"
            />
          ) : (
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] text-[#191C1E] flex items-center justify-center font-serif-luxury font-bold text-xs text-[#B58A3E] shrink-0">
              {siteSettings.shortName ? siteSettings.shortName[0] : 'V'}
            </div>
          )}
          <div className="truncate">
            <h2 className="font-display text-xs font-bold tracking-tight text-white leading-tight truncate">
              {siteSettings.shortName || siteSettings.companyName || 'Veltora'} CMS
            </h2>
            <span className="text-[10px] font-mono text-[#C59A4E] block truncate">
              v2.0 Production
            </span>
          </div>
        </div>

        <button
          onClick={onViewSite}
          className="p-1.5 text-[#9CA3AF] hover:text-white hover:bg-[#272B30] rounded-lg transition-colors shrink-0 cursor-pointer"
          title="View Live Public Site"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-2.5 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#C59A4E] text-[#191C1E] font-semibold shadow-xs'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-[#272B30]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-[#191C1E]' : 'text-[#6B7280]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {typeof item.count === 'number' && item.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono tabular-nums ${
                    isActive
                      ? 'bg-[#191C1E] text-white'
                      : 'bg-[#C59A4E] text-[#191C1E] font-bold'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-[#2C3035]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Console</span>
        </button>
      </div>
    </aside>
  );
};
