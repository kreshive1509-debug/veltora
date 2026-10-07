import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { AdminLogin } from './AdminLogin';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminDashboard } from './AdminDashboard';
import { AdminBrandAppearance } from './AdminBrandAppearance';
import { AdminHeroSettings } from './AdminHeroSettings';
import { AdminSections } from './AdminSections';
import { AdminNavigation } from './AdminNavigation';
import { AdminServices } from './AdminServices';
import { AdminProjects } from './AdminProjects';
import { AdminPartners } from './AdminPartners';
import { AdminGallery } from './AdminGallery';
import { AdminLeadership } from './AdminLeadership';
import { AdminTeam } from './AdminTeam';
import { AdminPrograms } from './AdminPrograms';
import { AdminTestimonials } from './AdminTestimonials';
import { AdminBlog } from './AdminBlog';
import { AdminEnquiries } from './AdminEnquiries';
import { AdminCampaigns } from './AdminCampaigns';
import { AdminMedia } from './AdminMedia';
import { AdminCareers } from './AdminCareers';
import { AdminContact } from './AdminContact';
import { AdminFaqs } from './AdminFaqs';
import { AdminSeo } from './AdminSeo';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminPages } from './AdminPages';
import { AdminLegal } from './AdminLegal';
import { AdminLoadingScreen } from './AdminLoadingScreen';
import { AdminErrorPages } from './AdminErrorPages';
import { AdminAuditLogs } from './AdminAuditLogs';

interface AdminPortalProps {
  onBackToSite: () => void;
  initialTab?: AdminTab;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onBackToSite,
  initialTab = 'dashboard',
}) => {
  const { isAdminAuthenticated, logoutAdmin, enquiries } = useCms();
  const [currentTab, setCurrentTab] = useState<AdminTab>(initialTab);

  if (!isAdminAuthenticated) {
    return <AdminLogin onBackToSite={onBackToSite} />;
  }

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="flex h-screen bg-[#FAF8F5] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onLogout={logoutAdmin}
        onViewSite={onBackToSite}
        enquiriesCount={newEnquiriesCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-10">
        <div className="max-w-6xl mx-auto">
          {currentTab === 'dashboard' && <AdminDashboard onNavigateTab={setCurrentTab} />}
          {currentTab === 'branding' && <AdminBrandAppearance />}
          {currentTab === 'hero' && <AdminHeroSettings />}
          {currentTab === 'homepage' && <AdminSections />}
          {currentTab === 'navigation' && <AdminNavigation />}
          {currentTab === 'services' && <AdminServices />}
          {currentTab === 'projects' && <AdminProjects />}
          {currentTab === 'partners' && <AdminPartners />}
          {currentTab === 'leadership' && <AdminLeadership />}
          {currentTab === 'team' && <AdminTeam />}
          {currentTab === 'testimonials' && <AdminTestimonials />}
          {currentTab === 'gallery' && <AdminGallery />}
          {currentTab === 'media' && <AdminMedia />}
          {currentTab === 'enquiries' && <AdminEnquiries />}
          {currentTab === 'careers' && <AdminCareers />}
          {currentTab === 'contact' && <AdminContact />}
          {currentTab === 'faqs' && <AdminFaqs />}
          {currentTab === 'announcements' && <AdminCampaigns />}
          {currentTab === 'seo' && <AdminSeo />}
          {currentTab === 'analytics' && <AdminAnalytics />}
          {currentTab === 'pages' && <AdminPages />}
          {currentTab === 'legal' && <AdminLegal />}
          {currentTab === 'loading_screen' && <AdminLoadingScreen />}
          {currentTab === 'error_pages' && <AdminErrorPages />}
          {currentTab === 'activity' && <AdminAuditLogs />}
        </div>
      </main>
    </div>
  );
};
