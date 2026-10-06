/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { TrustMetrics } from './components/public/TrustMetrics';
import { About } from './components/public/About';
import { LeadershipSpotlight } from './components/public/LeadershipSpotlight';
import { LeadershipCatalog } from './components/public/LeadershipCatalog';
import { ServicesSection } from './components/public/ServicesSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { ProjectsCatalog } from './components/public/ProjectsCatalog';
import { WhyVeltora } from './components/public/WhyVeltora';
import { PartnersSection } from './components/public/PartnersSection';
import { PartnersCatalog } from './components/public/PartnersCatalog';
import { GallerySection } from './components/public/GallerySection';
import { GalleryCatalog } from './components/public/GalleryCatalog';
import { ProgramsSection } from './components/public/ProgramsSection';
import { TeamSection } from './components/public/TeamSection';
import { TeamCatalog } from './components/public/TeamCatalog';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { TestimonialsCatalog } from './components/public/TestimonialsCatalog';
import { BlogSection } from './components/public/BlogSection';
import { ContactSection } from './components/public/ContactSection';
import { ContactPage } from './components/public/ContactPage';
import { CareersPage } from './components/public/CareersPage';
import { FaqPage } from './components/public/FaqPage';
import { LegalPages } from './components/public/LegalPages';
import { CustomPageView } from './components/public/CustomPageView';
import { CampaignBannerAndModal } from './components/public/CampaignBannerAndModal';
import { CookieConsentBanner } from './components/public/CookieConsentBanner';
import { LoadingScreen } from './components/public/LoadingScreen';
import { Footer } from './components/public/Footer';
import { NotFound } from './components/public/NotFound';
import { AdminPortal } from './components/admin/AdminPortal';
import { AdminTab } from './components/admin/AdminSidebar';

function MainApp() {
  const { homepageSections, customPages, legalPages } = useCms();
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    if (currentPath !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Route: Admin Console (/admin, /admin/dashboard, /admin/branding, etc.)
  if (currentPath.startsWith('/admin')) {
    const subRoute = currentPath.replace('/admin', '').replace(/^\//, '');
    const tabMap: Record<string, AdminTab> = {
      dashboard: 'dashboard',
      branding: 'branding',
      homepage: 'homepage',
      navigation: 'navigation',
      services: 'services',
      projects: 'projects',
      partners: 'partners',
      leadership: 'leadership',
      team: 'team',
      testimonials: 'testimonials',
      gallery: 'gallery',
      media: 'media',
      enquiries: 'enquiries',
      careers: 'careers',
      contact: 'contact',
      faqs: 'faqs',
      announcements: 'announcements',
      seo: 'seo',
      analytics: 'analytics',
      pages: 'pages',
      legal: 'legal',
      'loading-screen': 'loading_screen',
      'error-pages': 'error_pages',
      activity: 'activity',
    };
    const targetTab = tabMap[subRoute] || 'dashboard';
    return <AdminPortal onBackToSite={() => navigateTo('/')} initialTab={targetTab} />;
  }

  // Route Layout Wrapper Helper
  const renderPublicPage = (content: React.ReactNode) => (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#191C1E]">
      <LoadingScreen onFinish={() => setLoadingComplete(true)} />
      <CampaignBannerAndModal onNavigate={handleScrollToSection} />
      <Navbar onNavigate={handleScrollToSection} onOpenAdmin={() => navigateTo('/admin')} />
      <main className="flex-1">{content}</main>
      <Footer onNavigate={handleScrollToSection} onOpenAdmin={() => navigateTo('/admin')} />
      <CookieConsentBanner />
    </div>
  );

  // Route: Projects Full Directory or Single Project Case Study
  if (currentPath.startsWith('/projects')) {
    const slug = currentPath.startsWith('/projects/') ? currentPath.replace('/projects/', '') : null;
    return renderPublicPage(
      <ProjectsCatalog
        projectSlug={slug}
        onNavigateHome={() => navigateTo('/')}
        onSelectProject={(s) => navigateTo(s ? `/projects/${s}` : '/projects')}
        onSelectPartner={(pslug) => navigateTo(`/partners/${pslug}`)}
        onNavigateContact={() => handleScrollToSection('contact')}
      />
    );
  }

  // Route: Partners Full Directory or Single Partner Page
  if (currentPath.startsWith('/partners')) {
    const slug = currentPath.startsWith('/partners/') ? currentPath.replace('/partners/', '') : null;
    return renderPublicPage(
      <PartnersCatalog
        partnerSlug={slug}
        onNavigateHome={() => navigateTo('/')}
        onSelectPartner={(s) => navigateTo(s ? `/partners/${s}` : '/partners')}
        onSelectProject={(pslug) => navigateTo(`/projects/${pslug}`)}
      />
    );
  }

  // Route: Gallery Full Directory or Single Album Page
  if (currentPath.startsWith('/gallery')) {
    const slug = currentPath.startsWith('/gallery/') ? currentPath.replace('/gallery/', '') : null;
    return renderPublicPage(
      <GalleryCatalog
        albumSlug={slug}
        onNavigateHome={() => navigateTo('/')}
        onSelectAlbum={(s) => navigateTo(s ? `/gallery/${s}` : '/gallery')}
      />
    );
  }

  // Route: /careers (Join Veltora via Google Form)
  if (currentPath === '/careers') {
    return renderPublicPage(
      <CareersPage
        onNavigateHome={() => navigateTo('/')}
        onNavigateContact={() => navigateTo('/contact')}
      />
    );
  }

  // Route: /faq
  if (currentPath === '/faq') {
    return renderPublicPage(
      <FaqPage onNavigateContact={() => navigateTo('/contact')} />
    );
  }

  // Route: /leadership
  if (currentPath === '/leadership') {
    return renderPublicPage(
      <LeadershipCatalog
        onNavigateHome={() => navigateTo('/')}
        onNavigateContact={() => navigateTo('/contact')}
      />
    );
  }

  // Route: /team
  if (currentPath === '/team') {
    return renderPublicPage(
      <TeamCatalog
        onNavigateHome={() => navigateTo('/')}
        onNavigateContact={() => navigateTo('/contact')}
        onNavigateCareers={() => navigateTo('/careers')}
      />
    );
  }

  // Route: /testimonials
  if (currentPath === '/testimonials') {
    return renderPublicPage(
      <TestimonialsCatalog
        onNavigateHome={() => navigateTo('/')}
        onNavigateContact={() => navigateTo('/contact')}
      />
    );
  }

  // Route: /contact
  if (currentPath === '/contact') {
    return renderPublicPage(<ContactPage onNavigateHome={() => navigateTo('/')} />);
  }

  // Route: /privacy-policy, /terms-and-conditions, /cookie-policy
  if (
    currentPath === '/privacy-policy' ||
    currentPath === '/terms-and-conditions' ||
    currentPath === '/cookie-policy'
  ) {
    const slug = currentPath.replace('/', '') as
      | 'privacy-policy'
      | 'terms-and-conditions'
      | 'cookie-policy';
    return renderPublicPage(
      <LegalPages slug={slug} onNavigateHome={() => navigateTo('/')} />
    );
  }

  // Route: Custom CMS Pages (/:slug)
  const cleanSlug = currentPath.replace('/', '');
  const matchedCustomPage = customPages.find((p) => p.slug === cleanSlug && p.isPublished);
  if (matchedCustomPage) {
    return renderPublicPage(
      <CustomPageView slug={cleanSlug} onNavigateHome={() => navigateTo('/')} />
    );
  }

  // Route: Services sub-routes or detail
  if (currentPath.startsWith('/services')) {
    const slug = currentPath.startsWith('/services/') ? currentPath.replace('/services/', '') : null;
    return renderPublicPage(
      <div className="pt-20">
        <ServicesSection
          onNavigateContact={() => handleScrollToSection('contact')}
          selectedSlug={slug}
          onSelectService={(s) => {
            if (s) navigateTo(`/services/${s}`);
            else navigateTo('/services');
          }}
        />
      </div>
    );
  }

  // Route: 404 check for unhandled non-root paths
  if (
    currentPath !== '/' &&
    !currentPath.startsWith('/programs') &&
    !currentPath.startsWith('/blog')
  ) {
    return (
      <NotFound
        onBackHome={() => navigateTo('/')}
        onExploreServices={() => {
          navigateTo('/');
          setTimeout(() => handleScrollToSection('services'), 150);
        }}
      />
    );
  }

  // Public Homepage with Dynamic Ordered Sections
  const sortedSections = [...homepageSections]
    .filter((s) => s.isEnabled)
    .sort((a, b) => a.order - b.order);

  const renderSectionByKey = (key: string) => {
    switch (key) {
      case 'hero':
        return <Hero key="hero" onNavigate={handleScrollToSection} />;
      case 'trust':
        return <TrustMetrics key="trust" />;
      case 'about':
        return <About key="about" />;
      case 'leadership':
        return <LeadershipSpotlight key="leadership" />;
      case 'services':
        return (
          <ServicesSection
            key="services"
            onNavigateContact={() => handleScrollToSection('contact')}
            selectedSlug={currentPath.startsWith('/services/') ? currentPath.replace('/services/', '') : null}
            onSelectService={(slug) => {
              if (slug) window.history.pushState({}, '', `/services/${slug}`);
              else window.history.pushState({}, '', '/');
            }}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            key="projects"
            onViewAllProjects={() => navigateTo('/projects')}
            onSelectProject={(slug) => navigateTo(`/projects/${slug}`)}
          />
        );
      case 'why_veltora':
        return <WhyVeltora key="why_veltora" />;
      case 'partners':
        return (
          <PartnersSection
            key="partners"
            onViewAllPartners={() => navigateTo('/partners')}
            onSelectPartner={(slug) => navigateTo(`/partners/${slug}`)}
          />
        );
      case 'gallery':
        return (
          <GallerySection
            key="gallery"
            onViewGallery={() => navigateTo('/gallery')}
            onSelectAlbum={(slug) => navigateTo(`/gallery/${slug}`)}
          />
        );
      case 'programs':
        return (
          <ProgramsSection
            key="programs"
            onNavigateContact={() => handleScrollToSection('contact')}
            selectedSlug={currentPath.startsWith('/programs/') ? currentPath.replace('/programs/', '') : null}
            onSelectProgram={(slug) => {
              if (slug) window.history.pushState({}, '', `/programs/${slug}`);
              else window.history.pushState({}, '', '/');
            }}
          />
        );
      case 'team':
        return <TeamSection key="team" />;
      case 'testimonials':
        return <TestimonialsSection key="testimonials" />;
      case 'faq':
        return <FaqPage key="faq" onNavigateContact={() => handleScrollToSection('contact')} isHomepageSection={true} />;
      case 'blog':
        return (
          <BlogSection
            key="blog"
            selectedSlug={currentPath.startsWith('/blog/') ? currentPath.replace('/blog/', '') : null}
            onSelectBlog={(slug) => {
              if (slug) window.history.pushState({}, '', `/blog/${slug}`);
              else window.history.pushState({}, '', '/');
            }}
          />
        );
      case 'contact':
        return <ContactSection key="contact" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#191C1E]">
      <LoadingScreen onFinish={() => setLoadingComplete(true)} />
      <CampaignBannerAndModal onNavigate={handleScrollToSection} />
      <Navbar onNavigate={handleScrollToSection} onOpenAdmin={() => navigateTo('/admin')} />
      <main className="flex-1">
        {sortedSections.map((sec) => renderSectionByKey(sec.key))}
      </main>
      <Footer onNavigate={handleScrollToSection} onOpenAdmin={() => navigateTo('/admin')} />
      <CookieConsentBanner />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <MainApp />
    </CmsProvider>
  );
}
