import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SiteSettings,
  BrandAppearanceSettings,
  ThemePresetKey,
  HeroSettings,
  HomepageSection,
  PromotionalCampaign,
  Leadership,
  TeamMember,
  Service,
  Project,
  ProjectImage,
  Partner,
  GalleryAlbum,
  GalleryImage,
  Program,
  Testimonial,
  BlogPost,
  Enquiry,
  SocialLink,
  NavigationItem,
  SeoSettings,
  MediaItem,
  AuditLog,
  FaqItem,
  CareerSettings,
  CustomPage,
  LegalPage,
  CookieConsentSettings,
  LoadingScreenSettings,
  ErrorPageSettings,
  HeaderSettings,
  FooterSettings,
} from '../types';
import {
  initialSiteSettings,
  initialBrandAppearance,
  initialHeroSettings,
  initialHomepageSections,
  initialCampaigns,
  initialLeadership,
  initialTeamMembers,
  initialServices,
  initialProjects,
  initialProjectImages,
  initialPartners,
  initialGalleryAlbums,
  initialGalleryImages,
  initialPrograms,
  initialTestimonials,
  initialBlogPosts,
  initialSocialLinks,
  initialNavigationItems,
  initialSeoSettings,
  initialMedia,
  initialFaqs,
  initialCareerSettings,
  initialCustomPages,
  initialLegalPages,
  initialCookieSettings,
  initialLoadingScreenSettings,
  initialErrorPageSettings,
  initialHeaderSettings,
  initialFooterSettings,
} from '../data/initialData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { applyBrandThemeToDom, THEME_PRESETS } from '../lib/brandTheme';
import {
  siteSettingsService,
  heroService,
  sectionsService,
  campaignsService,
  leadershipService,
  teamService,
  servicesService,
  partnersService,
  projectsService,
  galleryService,
  programsService,
  testimonialsService,
  blogService,
  enquiriesService,
  navigationService,
  seoService,
  mediaService,
  faqsService,
  careersService,
  pagesService,
  systemSettingsService,
  auditLogsService,
  authService,
} from '../services';

interface CmsContextType {
  siteSettings: SiteSettings;
  brandAppearance: BrandAppearanceSettings;
  heroSettings: HeroSettings;
  homepageSections: HomepageSection[];
  campaigns: PromotionalCampaign[];
  leadership: Leadership[];
  teamMembers: TeamMember[];
  services: Service[];
  projects: Project[];
  projectImages: ProjectImage[];
  partners: Partner[];
  galleryAlbums: GalleryAlbum[];
  galleryImages: GalleryImage[];
  programs: Program[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  faqs: FaqItem[];
  careerSettings: CareerSettings;
  customPages: CustomPage[];
  legalPages: Record<string, LegalPage>;
  cookieSettings: CookieConsentSettings;
  loadingScreenSettings: LoadingScreenSettings;
  errorPageSettings: ErrorPageSettings;
  headerSettings: HeaderSettings;
  footerSettings: FooterSettings;
  enquiries: Enquiry[];
  socialLinks: SocialLink[];
  navigationItems: NavigationItem[];
  seoSettings: SeoSettings;
  media: MediaItem[];
  auditLogs: AuditLog[];

  // Database Connection Status
  isDbConnected: boolean;
  isLoading: boolean;
  dbError: string | null;
  refreshData: () => Promise<void>;

  // Auth state
  isAdminAuthenticated: boolean;
  adminEmail: string | null;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;

  // Site & Branding
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  updateBrandAppearance: (brand: Partial<BrandAppearanceSettings>) => Promise<void>;
  applyBrandPreset: (presetKey: ThemePresetKey) => Promise<void>;
  updateHeroSettings: (settings: Partial<HeroSettings>) => Promise<void>;
  updateHomepageSections: (sections: HomepageSection[]) => Promise<void>;
  toggleHomepageSection: (id: string) => Promise<void>;

  // Header & Footer
  updateHeaderSettings: (settings: Partial<HeaderSettings>) => Promise<void>;
  updateFooterSettings: (settings: Partial<FooterSettings>) => Promise<void>;

  // Campaigns
  addCampaign: (campaign: Omit<PromotionalCampaign, 'id'>) => Promise<void>;
  updateCampaign: (id: string, campaign: Partial<PromotionalCampaign>) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;

  // Leadership
  updateLeadership: (id: string, leader: Partial<Leadership>) => Promise<void>;
  addLeadership: (leader: Omit<Leadership, 'id'>) => Promise<void>;
  deleteLeadership: (id: string) => Promise<void>;

  // Team
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  // Services
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // Projects & Images
  addProject: (project: Omit<Project, 'id'>) => Promise<string>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addProjectImage: (img: Omit<ProjectImage, 'id'>) => Promise<void>;
  updateProjectImage: (id: string, img: Partial<ProjectImage>) => Promise<void>;
  deleteProjectImage: (id: string) => Promise<void>;
  getProjectImages: (projectId: string) => ProjectImage[];

  // Partners
  addPartner: (partner: Omit<Partner, 'id'>) => Promise<void>;
  updatePartner: (id: string, partner: Partial<Partner>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;

  // Gallery
  addGalleryAlbum: (album: Omit<GalleryAlbum, 'id' | 'createdAt'>) => Promise<string>;
  updateGalleryAlbum: (id: string, album: Partial<GalleryAlbum>) => Promise<void>;
  deleteGalleryAlbum: (id: string) => Promise<void>;
  addGalleryImage: (img: Omit<GalleryImage, 'id' | 'createdAt'>) => Promise<void>;
  updateGalleryImage: (id: string, img: Partial<GalleryImage>) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;
  getAlbumImages: (albumId: string) => GalleryImage[];

  // Programs
  addProgram: (program: Omit<Program, 'id'>) => Promise<void>;
  updateProgram: (id: string, program: Partial<Program>) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;

  // Testimonials
  addTestimonial: (test: Omit<Testimonial, 'id'>) => Promise<void>;
  updateTestimonial: (id: string, test: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  // Blog
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;

  // FAQs
  addFaq: (faq: Omit<FaqItem, 'id'>) => Promise<void>;
  updateFaq: (id: string, faq: Partial<FaqItem>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;

  // Careers
  updateCareerSettings: (careers: Partial<CareerSettings>) => Promise<void>;

  // Custom Pages & Legal
  addCustomPage: (page: Omit<CustomPage, 'id' | 'updatedAt'>) => Promise<void>;
  updateCustomPage: (id: string, page: Partial<CustomPage>) => Promise<void>;
  deleteCustomPage: (id: string) => Promise<void>;
  updateLegalPage: (slug: string, page: Partial<LegalPage>) => Promise<void>;

  // Cookie, Loading & Error Pages
  updateCookieSettings: (cookie: Partial<CookieConsentSettings>) => Promise<void>;
  updateLoadingScreenSettings: (loading: Partial<LoadingScreenSettings>) => Promise<void>;
  updateErrorPageSettings: (errorPage: Partial<ErrorPageSettings>) => Promise<void>;

  // Enquiries & CRM
  submitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'referenceNo' | 'createdAt' | 'status'>) => Promise<{ referenceNo: string }>;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => Promise<void>;
  updateEnquiryDetails: (id: string, updates: Partial<Enquiry>) => Promise<void>;
  addEnquiryNote: (enquiryId: string, note: string) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;

  // Nav & Social & SEO
  updateSocialLink: (id: string, link: Partial<SocialLink>) => Promise<void>;
  updateNavigationItems: (items: NavigationItem[]) => Promise<void>;
  updateSeoSettings: (settings: Partial<SeoSettings>) => Promise<void>;

  // Media
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => Promise<void>;
  deleteMediaItem: (id: string) => Promise<void>;

  // System Tools
  resetToDefaults: () => Promise<void>;
  exportDataJson: () => string;
  importDataJson: (json: string) => Promise<boolean>;
}

const CmsContext = createContext<CmsContextType | null>(null);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [brandAppearance, setBrandAppearance] = useState<BrandAppearanceSettings>(initialBrandAppearance);
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings>(initialHeaderSettings);
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(initialFooterSettings);
  const [heroSettings, setHeroSettings] = useState<HeroSettings>(initialHeroSettings);
  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>(initialHomepageSections);
  const [campaigns, setCampaigns] = useState<PromotionalCampaign[]>(initialCampaigns);
  const [leadership, setLeadership] = useState<Leadership[]>(initialLeadership);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [projectImages, setProjectImages] = useState<ProjectImage[]>(initialProjectImages);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [galleryAlbums, setGalleryAlbums] = useState<GalleryAlbum[]>(initialGalleryAlbums);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [careerSettings, setCareerSettings] = useState<CareerSettings>(initialCareerSettings);
  const [customPages, setCustomPages] = useState<CustomPage[]>(initialCustomPages);
  const [legalPages, setLegalPages] = useState<Record<string, LegalPage>>(initialLegalPages);
  const [cookieSettings, setCookieSettings] = useState<CookieConsentSettings>(initialCookieSettings);
  const [loadingScreenSettings, setLoadingScreenSettings] = useState<LoadingScreenSettings>(initialLoadingScreenSettings);
  const [errorPageSettings, setErrorPageSettings] = useState<ErrorPageSettings>(initialErrorPageSettings);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(initialNavigationItems);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(initialSeoSettings);
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(isSupabaseConfigured);
  const [dbError, setDbError] = useState<string | null>(null);

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  // Apply Theme to DOM whenever brandAppearance changes
  useEffect(() => {
    applyBrandThemeToDom(brandAppearance);
  }, [brandAppearance]);

  // Check auth session and fetch all records from Supabase on mount
  const loadDatabaseData = async () => {
    setIsLoading(true);
    setDbError(null);

    try {
      // Check auth session
      const session = await authService.getCurrentSession();
      if (session?.user) {
        setIsAdminAuthenticated(true);
        setAdminEmail(session.user.email || 'Admin');
      }

      if (isSupabaseConfigured) {
        const [
          fetchedSite,
          fetchedBrand,
          fetchedHeader,
          fetchedFooter,
          fetchedHero,
          fetchedSections,
          fetchedCampaigns,
          fetchedLeadership,
          fetchedTeam,
          fetchedServices,
          fetchedProjects,
          fetchedProjectImages,
          fetchedPartners,
          fetchedAlbums,
          fetchedGalleryImages,
          fetchedPrograms,
          fetchedTestimonials,
          fetchedBlog,
          fetchedFaqs,
          fetchedCareers,
          fetchedCustomPages,
          fetchedLegalPages,
          fetchedCookie,
          fetchedLoading,
          fetchedErrorPage,
          fetchedEnquiries,
          fetchedNav,
          fetchedSocial,
          fetchedSeo,
          fetchedMedia,
          fetchedAuditLogs,
        ] = await Promise.allSettled([
          siteSettingsService.getSiteSettings(),
          siteSettingsService.getBrandAppearance(),
          siteSettingsService.getHeaderSettings(),
          siteSettingsService.getFooterSettings(),
          heroService.getHeroSettings(),
          sectionsService.getHomepageSections(),
          campaignsService.getCampaigns(),
          leadershipService.getLeadership(),
          teamService.getTeamMembers(),
          servicesService.getServices(),
          projectsService.getProjects(),
          projectsService.getProjectImages(),
          partnersService.getPartners(),
          galleryService.getAlbums(),
          galleryService.getGalleryImages(),
          programsService.getPrograms(),
          testimonialsService.getTestimonials(),
          blogService.getBlogPosts(),
          faqsService.getFaqs(),
          careersService.getCareers(),
          pagesService.getCustomPages(),
          pagesService.getLegalPages(),
          systemSettingsService.getCookieSettings(),
          systemSettingsService.getLoadingScreenSettings(),
          systemSettingsService.getErrorPageSettings(),
          enquiriesService.getEnquiries(),
          navigationService.getNavigationItems(),
          navigationService.getSocialLinks(),
          seoService.getSeoSettings(),
          mediaService.getMedia(),
          auditLogsService.getAuditLogs(),
        ]);

        if (fetchedSite.status === 'fulfilled' && fetchedSite.value) setSiteSettings(fetchedSite.value);
        if (fetchedBrand.status === 'fulfilled' && fetchedBrand.value) setBrandAppearance(fetchedBrand.value);
        if (fetchedHeader.status === 'fulfilled' && fetchedHeader.value) setHeaderSettings(fetchedHeader.value);
        if (fetchedFooter.status === 'fulfilled' && fetchedFooter.value) setFooterSettings(fetchedFooter.value);
        if (fetchedHero.status === 'fulfilled' && fetchedHero.value) setHeroSettings(fetchedHero.value);
        if (fetchedSections.status === 'fulfilled' && fetchedSections.value.length > 0) setHomepageSections(fetchedSections.value);
        if (fetchedCampaigns.status === 'fulfilled') setCampaigns(fetchedCampaigns.value);
        if (fetchedLeadership.status === 'fulfilled' && fetchedLeadership.value.length > 0) setLeadership(fetchedLeadership.value);
        if (fetchedTeam.status === 'fulfilled' && fetchedTeam.value.length > 0) setTeamMembers(fetchedTeam.value);
        if (fetchedServices.status === 'fulfilled' && fetchedServices.value.length > 0) setServices(fetchedServices.value);
        if (fetchedProjects.status === 'fulfilled' && fetchedProjects.value.length > 0) setProjects(fetchedProjects.value);
        if (fetchedProjectImages.status === 'fulfilled') setProjectImages(fetchedProjectImages.value);
        if (fetchedPartners.status === 'fulfilled' && fetchedPartners.value.length > 0) setPartners(fetchedPartners.value);
        if (fetchedAlbums.status === 'fulfilled' && fetchedAlbums.value.length > 0) setGalleryAlbums(fetchedAlbums.value);
        if (fetchedGalleryImages.status === 'fulfilled') setGalleryImages(fetchedGalleryImages.value);
        if (fetchedPrograms.status === 'fulfilled' && fetchedPrograms.value.length > 0) setPrograms(fetchedPrograms.value);
        if (fetchedTestimonials.status === 'fulfilled' && fetchedTestimonials.value.length > 0) setTestimonials(fetchedTestimonials.value);
        if (fetchedBlog.status === 'fulfilled' && fetchedBlog.value.length > 0) setBlogPosts(fetchedBlog.value);
        if (fetchedFaqs.status === 'fulfilled' && fetchedFaqs.value.length > 0) setFaqs(fetchedFaqs.value);
        if (fetchedCareers.status === 'fulfilled' && fetchedCareers.value) setCareerSettings(fetchedCareers.value);
        if (fetchedCustomPages.status === 'fulfilled') setCustomPages(fetchedCustomPages.value);
        if (fetchedLegalPages.status === 'fulfilled' && Object.keys(fetchedLegalPages.value).length > 0) setLegalPages(fetchedLegalPages.value);
        if (fetchedCookie.status === 'fulfilled' && fetchedCookie.value) setCookieSettings(fetchedCookie.value);
        if (fetchedLoading.status === 'fulfilled' && fetchedLoading.value) setLoadingScreenSettings(fetchedLoading.value);
        if (fetchedErrorPage.status === 'fulfilled' && fetchedErrorPage.value) setErrorPageSettings(fetchedErrorPage.value);
        if (fetchedEnquiries.status === 'fulfilled') setEnquiries(fetchedEnquiries.value);
        if (fetchedNav.status === 'fulfilled' && fetchedNav.value.length > 0) setNavigationItems(fetchedNav.value);
        if (fetchedSocial.status === 'fulfilled' && fetchedSocial.value.length > 0) setSocialLinks(fetchedSocial.value);
        if (fetchedSeo.status === 'fulfilled' && fetchedSeo.value) setSeoSettings(fetchedSeo.value);
        if (fetchedMedia.status === 'fulfilled') setMedia(fetchedMedia.value);
        if (fetchedAuditLogs.status === 'fulfilled') setAuditLogs(fetchedAuditLogs.value);

        setIsDbConnected(true);
      }
    } catch (err: any) {
      console.warn('Database initialization warning:', err);
      setDbError(err.message || 'Database sync issue');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDatabaseData();
  }, []);

  const logAction = async (action: string, entity: string, details?: string, entityId?: string) => {
    const newLog: AuditLog = {
      id: String(Date.now()),
      action,
      entity,
      entityId,
      timestamp: new Date().toISOString(),
      userEmail: adminEmail || 'veltoraitsolution2026@gmail.com',
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    await auditLogsService.logAction(action, entity, details, adminEmail || undefined, entityId);
  };

  // Auth Operations
  const loginAdmin = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const result = await authService.login(email, pass);
    if (result.success) {
      setIsAdminAuthenticated(true);
      setAdminEmail(email);
      logAction('LOGIN', 'Authentication', 'Admin logged in successfully');
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const logoutAdmin = async () => {
    await authService.logout();
    setIsAdminAuthenticated(false);
    setAdminEmail(null);
    logAction('LOGOUT', 'Authentication', 'Admin signed out');
  };

  // Site & Branding
  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
    await siteSettingsService.updateSiteSettings(settings);
    logAction('UPDATE', 'Site Settings', 'Updated company profile and branding assets');
  };

  const updateBrandAppearance = async (brand: Partial<BrandAppearanceSettings>) => {
    setBrandAppearance((prev) => ({
      ...prev,
      ...brand,
      colors: brand.colors ? { ...prev.colors, ...brand.colors } : prev.colors,
      typography: brand.typography ? { ...prev.typography, ...brand.typography } : prev.typography,
      visuals: brand.visuals ? { ...prev.visuals, ...brand.visuals } : prev.visuals,
    }));
    await siteSettingsService.updateBrandAppearance(brand);
    logAction('UPDATE', 'Brand & Appearance', 'Updated theme palette and typography');
  };

  const applyBrandPreset = async (presetKey: ThemePresetKey) => {
    const preset = THEME_PRESETS.find((p) => p.key === presetKey);
    if (!preset) return;
    const updated: BrandAppearanceSettings = {
      ...brandAppearance,
      preset: presetKey,
      colors: { ...preset.colors },
    };
    setBrandAppearance(updated);
    await siteSettingsService.updateBrandAppearance(updated);
    logAction('UPDATE', 'Brand Theme Preset', `Applied preset "${preset.label}"`);
  };

  const updateHeroSettings = async (settings: Partial<HeroSettings>) => {
    setHeroSettings((prev) => ({ ...prev, ...settings }));
    await heroService.updateHeroSettings(settings);
    logAction('UPDATE', 'Hero Settings', 'Modified hero content');
  };

  const updateHomepageSections = async (sections: HomepageSection[]) => {
    setHomepageSections(sections);
    await sectionsService.updateHomepageSections(sections);
    logAction('REORDER', 'Homepage Sections', 'Updated section order and visibility');
  };

  const toggleHomepageSection = async (id: string) => {
    const target = homepageSections.find((s) => s.id === id || s.key === id);
    if (!target) return;
    const newStatus = !target.isEnabled;
    setHomepageSections((prev) =>
      prev.map((s) => (s.id === id || s.key === id ? { ...s, isEnabled: newStatus } : s))
    );
    await sectionsService.toggleSection(target.key, newStatus);
    logAction('TOGGLE', 'Homepage Section', `${newStatus ? 'Enabled' : 'Disabled'} ${target.label}`);
  };

  // Header & Footer
  const updateHeaderSettings = async (settings: Partial<HeaderSettings>) => {
    setHeaderSettings((prev) => ({ ...prev, ...settings }));
    await siteSettingsService.updateHeaderSettings(settings);
    logAction('UPDATE', 'Header Settings', 'Modified header layout');
  };

  const updateFooterSettings = async (settings: Partial<FooterSettings>) => {
    setFooterSettings((prev) => ({ ...prev, ...settings }));
    await siteSettingsService.updateFooterSettings(settings);
    logAction('UPDATE', 'Footer Settings', 'Modified footer links');
  };

  // Promotional Campaigns
  const addCampaign = async (campaign: Omit<PromotionalCampaign, 'id'>) => {
    const created = await campaignsService.addCampaign(campaign);
    setCampaigns((prev) => [created, ...prev]);
    logAction('CREATE', 'Promotional Campaign', `Added "${campaign.title}"`, created.id);
  };

  const updateCampaign = async (id: string, updates: Partial<PromotionalCampaign>) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    await campaignsService.updateCampaign(id, updates);
    logAction('UPDATE', 'Promotional Campaign', `Updated campaign`, id);
  };

  const deleteCampaign = async (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    await campaignsService.deleteCampaign(id);
    logAction('DELETE', 'Promotional Campaign', `Deleted campaign`, id);
  };

  // Leadership
  const addLeadership = async (leader: Omit<Leadership, 'id'>) => {
    const created = await leadershipService.addLeadership(leader);
    setLeadership((prev) => [...prev, created]);
    logAction('CREATE', 'Leadership', `Added leader "${leader.name}"`, created.id);
  };

  const updateLeadership = async (id: string, updates: Partial<Leadership>) => {
    setLeadership((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
    await leadershipService.updateLeadership(id, updates);
    logAction('UPDATE', 'Leadership', `Updated leadership profile`, id);
  };

  const deleteLeadership = async (id: string) => {
    setLeadership((prev) => prev.filter((l) => l.id !== id));
    await leadershipService.deleteLeadership(id);
    logAction('DELETE', 'Leadership', `Removed leadership profile`, id);
  };

  // Team
  const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    const created = await teamService.addTeamMember(member);
    setTeamMembers((prev) => [...prev, created]);
    logAction('CREATE', 'Team Member', `Added team member "${member.name}"`, created.id);
  };

  const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
    setTeamMembers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    await teamService.updateTeamMember(id, updates);
    logAction('UPDATE', 'Team Member', `Updated member profile`, id);
  };

  const deleteTeamMember = async (id: string) => {
    setTeamMembers((prev) => prev.filter((t) => t.id !== id));
    await teamService.deleteTeamMember(id);
    logAction('DELETE', 'Team Member', `Removed team member`, id);
  };

  // Services
  const addService = async (service: Omit<Service, 'id'>) => {
    const created = await servicesService.addService(service);
    setServices((prev) => [...prev, created]);
    logAction('CREATE', 'Service', `Added service "${service.name}"`, created.id);
  };

  const updateService = async (id: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    await servicesService.updateService(id, updates);
    logAction('UPDATE', 'Service', `Updated service`, id);
  };

  const deleteService = async (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    await servicesService.deleteService(id);
    logAction('DELETE', 'Service', `Deleted service`, id);
  };

  // Projects & Images
  const addProject = async (project: Omit<Project, 'id'>): Promise<string> => {
    const created = await projectsService.addProject(project);
    setProjects((prev) => [created, ...prev]);
    logAction('CREATE', 'Project', `Added project "${project.name}"`, created.id);
    return created.id;
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    await projectsService.updateProject(id, updates);
    logAction('UPDATE', 'Project', `Updated project`, id);
  };

  const deleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setProjectImages((prev) => prev.filter((img) => img.projectId !== id));
    await projectsService.deleteProject(id);
    logAction('DELETE', 'Project', `Deleted project`, id);
  };

  const addProjectImage = async (img: Omit<ProjectImage, 'id'>) => {
    const created = await projectsService.addProjectImage(img);
    setProjectImages((prev) => [...prev, created]);
    logAction('CREATE', 'Project Image', `Added showcase photo to project`, created.id);
  };

  const updateProjectImage = async (id: string, updates: Partial<ProjectImage>) => {
    setProjectImages((prev) => prev.map((img) => (img.id === id ? { ...img, ...updates } : img)));
    await projectsService.updateProjectImage(id, updates);
    logAction('UPDATE', 'Project Image', `Updated photo metadata`, id);
  };

  const deleteProjectImage = async (id: string) => {
    setProjectImages((prev) => prev.filter((img) => img.id !== id));
    await projectsService.deleteProjectImage(id);
    logAction('DELETE', 'Project Image', `Removed image from project`, id);
  };

  const getProjectImages = (projectId: string) => {
    return projectImages.filter((img) => img.projectId === projectId);
  };

  // Partners
  const addPartner = async (partner: Omit<Partner, 'id'>) => {
    const created = await partnersService.addPartner(partner);
    setPartners((prev) => [...prev, created]);
    logAction('CREATE', 'Partner', `Added partner "${partner.name}"`, created.id);
  };

  const updatePartner = async (id: string, updates: Partial<Partner>) => {
    setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    await partnersService.updatePartner(id, updates);
    logAction('UPDATE', 'Partner', `Updated partner details`, id);
  };

  const deletePartner = async (id: string) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
    await partnersService.deletePartner(id);
    logAction('DELETE', 'Partner', `Removed partner`, id);
  };

  // Gallery
  const addGalleryAlbum = async (album: Omit<GalleryAlbum, 'id' | 'createdAt'>): Promise<string> => {
    const created = await galleryService.addAlbum(album);
    setGalleryAlbums((prev) => [created, ...prev]);
    logAction('CREATE', 'Gallery Album', `Created album "${album.title}"`, created.id);
    return created.id;
  };

  const updateGalleryAlbum = async (id: string, updates: Partial<GalleryAlbum>) => {
    setGalleryAlbums((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
    await galleryService.updateAlbum(id, updates);
    logAction('UPDATE', 'Gallery Album', `Updated album`, id);
  };

  const deleteGalleryAlbum = async (id: string) => {
    setGalleryAlbums((prev) => prev.filter((a) => a.id !== id));
    setGalleryImages((prev) => prev.filter((img) => img.albumId !== id));
    await galleryService.deleteAlbum(id);
    logAction('DELETE', 'Gallery Album', `Deleted album`, id);
  };

  const addGalleryImage = async (img: Omit<GalleryImage, 'id' | 'createdAt'>) => {
    const created = await galleryService.addGalleryImage(img);
    setGalleryImages((prev) => [...prev, created]);
    logAction('CREATE', 'Gallery Image', `Added photo to album`, created.id);
  };

  const updateGalleryImage = async (id: string, updates: Partial<GalleryImage>) => {
    setGalleryImages((prev) => prev.map((img) => (img.id === id ? { ...img, ...updates } : img)));
    await galleryService.updateGalleryImage(id, updates);
    logAction('UPDATE', 'Gallery Image', `Updated photo metadata`, id);
  };

  const deleteGalleryImage = async (id: string) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
    await galleryService.deleteGalleryImage(id);
    logAction('DELETE', 'Gallery Image', `Removed photo`, id);
  };

  const getAlbumImages = (albumId: string) => {
    return galleryImages.filter((img) => img.albumId === albumId);
  };

  // Programs
  const addProgram = async (program: Omit<Program, 'id'>) => {
    const created = await programsService.addProgram(program);
    setPrograms((prev) => [...prev, created]);
    logAction('CREATE', 'Program', `Added program "${program.name}"`, created.id);
  };

  const updateProgram = async (id: string, updates: Partial<Program>) => {
    setPrograms((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    await programsService.updateProgram(id, updates);
    logAction('UPDATE', 'Program', `Updated program details`, id);
  };

  const deleteProgram = async (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    await programsService.deleteProgram(id);
    logAction('DELETE', 'Program', `Deleted program`, id);
  };

  // Testimonials
  const addTestimonial = async (test: Omit<Testimonial, 'id'>) => {
    const created = await testimonialsService.addTestimonial(test);
    setTestimonials((prev) => [...prev, created]);
    logAction('CREATE', 'Testimonial', `Added testimonial from ${test.name}`, created.id);
  };

  const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    await testimonialsService.updateTestimonial(id, updates);
    logAction('UPDATE', 'Testimonial', `Updated testimonial`, id);
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    await testimonialsService.deleteTestimonial(id);
    logAction('DELETE', 'Testimonial', `Deleted testimonial`, id);
  };

  // Blog
  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    const created = await blogService.addBlogPost(post);
    setBlogPosts((prev) => [created, ...prev]);
    logAction('CREATE', 'Blog Post', `Published article "${post.title}"`, created.id);
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    await blogService.updateBlogPost(id, updates);
    logAction('UPDATE', 'Blog Post', `Updated article`, id);
  };

  const deleteBlogPost = async (id: string) => {
    setBlogPosts((prev) => prev.filter((b) => b.id !== id));
    await blogService.deleteBlogPost(id);
    logAction('DELETE', 'Blog Post', `Deleted article`, id);
  };

  // FAQs
  const addFaq = async (faq: Omit<FaqItem, 'id'>) => {
    const created = await faqsService.addFaq(faq);
    setFaqs((prev) => [...prev, created]);
    logAction('CREATE', 'FAQ', `Added FAQ`, created.id);
  };

  const updateFaq = async (id: string, updates: Partial<FaqItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
    await faqsService.updateFaq(id, updates);
    logAction('UPDATE', 'FAQ', `Updated FAQ`, id);
  };

  const deleteFaq = async (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    await faqsService.deleteFaq(id);
    logAction('DELETE', 'FAQ', `Deleted FAQ`, id);
  };

  // Careers
  const updateCareerSettings = async (careers: Partial<CareerSettings>) => {
    setCareerSettings((prev) => ({ ...prev, ...careers }));
    await careersService.updateCareers(careers);
    logAction('UPDATE', 'Careers Settings', 'Updated career banner and Google Form link');
  };

  // Custom Pages & Legal
  const addCustomPage = async (page: Omit<CustomPage, 'id' | 'updatedAt'>) => {
    const created = await pagesService.addCustomPage(page);
    setCustomPages((prev) => [...prev, created]);
    logAction('CREATE', 'Custom Page', `Created page "/${page.slug}"`, created.id);
  };

  const updateCustomPage = async (id: string, updates: Partial<CustomPage>) => {
    setCustomPages((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    await pagesService.updateCustomPage(id, updates);
    logAction('UPDATE', 'Custom Page', `Updated page content`, id);
  };

  const deleteCustomPage = async (id: string) => {
    setCustomPages((prev) => prev.filter((p) => p.id !== id));
    await pagesService.deleteCustomPage(id);
    logAction('DELETE', 'Custom Page', `Deleted page`, id);
  };

  const updateLegalPage = async (slug: string, updates: Partial<LegalPage>) => {
    setLegalPages((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], ...updates },
    }));
    await pagesService.updateLegalPage(slug, updates);
    logAction('UPDATE', 'Legal Policy', `Updated policy "/${slug}"`);
  };

  // Cookie, Loading & Error Pages
  const updateCookieSettings = async (cookie: Partial<CookieConsentSettings>) => {
    setCookieSettings((prev) => ({ ...prev, ...cookie }));
    await systemSettingsService.updateCookieSettings(cookie);
    logAction('UPDATE', 'Cookie Settings', 'Updated cookie consent banner preferences');
  };

  const updateLoadingScreenSettings = async (loading: Partial<LoadingScreenSettings>) => {
    setLoadingScreenSettings((prev) => ({ ...prev, ...loading }));
    await systemSettingsService.updateLoadingScreenSettings(loading);
    logAction('UPDATE', 'Loading Screen', 'Updated splash screen styling');
  };

  const updateErrorPageSettings = async (errorPage: Partial<ErrorPageSettings>) => {
    setErrorPageSettings((prev) => ({ ...prev, ...errorPage }));
    await systemSettingsService.updateErrorPageSettings(errorPage);
    logAction('UPDATE', '404 Error Page', 'Updated not-found presentation');
  };

  // Enquiries & CRM
  const submitEnquiry = async (
    enquiryData: Omit<Enquiry, 'id' | 'referenceNo' | 'createdAt' | 'status'>
  ): Promise<{ referenceNo: string }> => {
    const result = await enquiriesService.submitEnquiry(enquiryData);
    const newEnquiryRecord: Enquiry = {
      ...enquiryData,
      id: result.id,
      referenceNo: result.referenceNo,
      status: 'New',
      createdAt: new Date().toISOString(),
      notes: [],
    };
    setEnquiries((prev) => [newEnquiryRecord, ...prev]);
    return { referenceNo: result.referenceNo };
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    await enquiriesService.updateEnquiryStatus(id, status);
    logAction('UPDATE', 'Enquiry Status', `Changed lead status to "${status}"`, id);
  };

  const updateEnquiryDetails = async (id: string, updates: Partial<Enquiry>) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    await enquiriesService.updateEnquiryDetails(id, updates);
    logAction('UPDATE', 'Enquiry Details', `Updated CRM lead details`, id);
  };

  const addEnquiryNote = async (enquiryId: string, note: string) => {
    const createdNote = await enquiriesService.addEnquiryNote(enquiryId, note, adminEmail || 'Admin');
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === enquiryId
          ? { ...e, notes: [...(e.notes || []), createdNote] }
          : e
      )
    );
    logAction('CREATE', 'Enquiry Note', `Added note to lead`, enquiryId);
  };

  const deleteEnquiry = async (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    await enquiriesService.deleteEnquiry(id);
    logAction('DELETE', 'Enquiry', `Removed lead from CRM`, id);
  };

  // Nav, Social, SEO
  const updateSocialLink = async (id: string, link: Partial<SocialLink>) => {
    setSocialLinks((prev) => prev.map((s) => (s.id === id ? { ...s, ...link } : s)));
    await navigationService.updateSocialLink(id, link);
    logAction('UPDATE', 'Social Link', `Updated social link`, id);
  };

  const updateNavigationItems = async (items: NavigationItem[]) => {
    setNavigationItems(items);
    await navigationService.updateNavigationItems(items);
    logAction('UPDATE', 'Navigation Items', 'Updated navbar hierarchy');
  };

  const updateSeoSettings = async (settings: Partial<SeoSettings>) => {
    setSeoSettings((prev) => ({ ...prev, ...settings }));
    await seoService.updateSeoSettings(settings);
    logAction('UPDATE', 'SEO Settings', 'Updated meta tags and robots directives');
  };

  // Media
  const addMediaItem = async (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const created = await mediaService.addMediaItem(item);
    setMedia((prev) => [created, ...prev]);
    logAction('CREATE', 'Media Asset', `Uploaded media ${item.fileName}`, created.id);
  };

  const deleteMediaItem = async (id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
    await mediaService.deleteMediaItem(id);
    logAction('DELETE', 'Media Asset', `Deleted media`, id);
  };

  // System Tools
  const resetToDefaults = async () => {
    setSiteSettings(initialSiteSettings);
    setBrandAppearance(initialBrandAppearance);
    setHeroSettings(initialHeroSettings);
    setHomepageSections(initialHomepageSections);
    logAction('RESET', 'System', 'Reset site configuration to baseline');
  };

  const exportDataJson = () => {
    const payload = {
      siteSettings,
      brandAppearance,
      heroSettings,
      homepageSections,
      campaigns,
      leadership,
      teamMembers,
      services,
      projects,
      projectImages,
      partners,
      galleryAlbums,
      galleryImages,
      programs,
      testimonials,
      blogPosts,
      faqs,
      careerSettings,
      customPages,
      legalPages,
      cookieSettings,
      loadingScreenSettings,
      errorPageSettings,
      headerSettings,
      footerSettings,
      socialLinks,
      navigationItems,
      seoSettings,
      media,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(payload, null, 2);
  };

  const importDataJson = async (json: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(json);
      if (parsed.siteSettings) {
        setSiteSettings(parsed.siteSettings);
        await siteSettingsService.updateSiteSettings(parsed.siteSettings);
      }
      if (parsed.brandAppearance) {
        setBrandAppearance(parsed.brandAppearance);
        await siteSettingsService.updateBrandAppearance(parsed.brandAppearance);
      }
      if (parsed.heroSettings) {
        setHeroSettings(parsed.heroSettings);
        await heroService.updateHeroSettings(parsed.heroSettings);
      }
      if (parsed.homepageSections) {
        setHomepageSections(parsed.homepageSections);
        await sectionsService.updateHomepageSections(parsed.homepageSections);
      }
      logAction('IMPORT', 'System Data', 'Imported JSON data payload into Supabase');
      return true;
    } catch (err) {
      console.error('Import failed:', err);
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        siteSettings,
        brandAppearance,
        heroSettings,
        homepageSections,
        campaigns,
        leadership,
        teamMembers,
        services,
        projects,
        projectImages,
        partners,
        galleryAlbums,
        galleryImages,
        programs,
        testimonials,
        blogPosts,
        faqs,
        careerSettings,
        customPages,
        legalPages,
        cookieSettings,
        loadingScreenSettings,
        errorPageSettings,
        headerSettings,
        footerSettings,
        enquiries,
        socialLinks,
        navigationItems,
        seoSettings,
        media,
        auditLogs,
        isDbConnected,
        isLoading,
        dbError,
        refreshData: loadDatabaseData,
        isAdminAuthenticated,
        adminEmail,
        loginAdmin,
        logoutAdmin,
        updateSiteSettings,
        updateBrandAppearance,
        applyBrandPreset,
        updateHeroSettings,
        updateHomepageSections,
        toggleHomepageSection,
        updateHeaderSettings,
        updateFooterSettings,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        addLeadership,
        updateLeadership,
        deleteLeadership,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addService,
        updateService,
        deleteService,
        addProject,
        updateProject,
        deleteProject,
        addProjectImage,
        updateProjectImage,
        deleteProjectImage,
        getProjectImages,
        addPartner,
        updatePartner,
        deletePartner,
        addGalleryAlbum,
        updateGalleryAlbum,
        deleteGalleryAlbum,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        getAlbumImages,
        addProgram,
        updateProgram,
        deleteProgram,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addFaq,
        updateFaq,
        deleteFaq,
        updateCareerSettings,
        addCustomPage,
        updateCustomPage,
        deleteCustomPage,
        updateLegalPage,
        updateCookieSettings,
        updateLoadingScreenSettings,
        updateErrorPageSettings,
        submitEnquiry,
        updateEnquiryStatus,
        updateEnquiryDetails,
        addEnquiryNote,
        deleteEnquiry,
        updateSocialLink,
        updateNavigationItems,
        updateSeoSettings,
        addMediaItem,
        deleteMediaItem,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
