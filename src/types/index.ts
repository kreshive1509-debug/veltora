export interface SiteSettings {
  companyName: string;
  shortName: string;
  tagline: string;
  brandDescription: string;
  foundedYear: string;
  primaryEmail: string;
  phone: string;
  whatsapp: string;
  address: string;
  businessHours: string;
  copyright: string;
  footerDescription: string;
  developerCredit: string;
  developerUrl?: string;
  mapEmbedUrl?: string;
  // Logos
  primaryLogoUrl?: string;
  lightLogoUrl?: string;
  darkLogoUrl?: string;
  navbarLogoUrl?: string;
  navbarLogoVariant?: 'primary' | 'light' | 'dark' | 'custom';
  navbarLogoWidth?: number;
  footerLogoUrl?: string;
  footerLogoVariant?: 'primary' | 'light' | 'dark' | 'custom';
  mobileLogoUrl?: string;
  adminLogoUrl?: string;
  loginLogoUrl?: string;
  loadingLogoUrl?: string;
  emailLogoUrl?: string;
  // Favicon & Icons
  faviconUrl?: string;
  appleTouchIconUrl?: string;
  browserIconUrl?: string;
  pwaIconUrl?: string;
  ogDefaultImageUrl?: string;
}

export type ThemePresetKey =
  | 'veltora_signature'
  | 'ivory_luxury'
  | 'minimal_corporate'
  | 'warm_premium'
  | 'champagne_gold'
  | 'custom';

export interface BrandColors {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  mutedTextColor: string;
  borderColor: string;
}

export interface TypographySettings {
  headingFont: string;
  bodyFont: string;
  headingWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  headingScale: 'compact' | 'balanced' | 'dramatic';
  bodyScale: 'compact' | 'standard' | 'roomy';
}

export interface GlobalVisualSettings {
  borderRadius: 'sharp' | 'subtle' | 'modern' | 'luxury' | 'pill';
  cardStyle: 'glass' | 'solid' | 'sand' | 'bordered';
  buttonStyle: 'pill' | 'rounded' | 'sharp';
  shadowIntensity: 'none' | 'minimal' | 'soft' | 'deep';
  containerWidth: 'condensed' | 'standard' | 'wide';
  sectionSpacing: 'compact' | 'balanced' | 'generous';
  animationIntensity: 'minimal' | 'balanced' | 'expressive';
}

export interface BrandAppearanceSettings {
  preset: ThemePresetKey;
  colors: BrandColors;
  typography: TypographySettings;
  visuals: GlobalVisualSettings;
  navbarCtaText: string;
  navbarCtaUrl: string;
  showNavbarCta: boolean;
}

export interface HeaderSettings {
  isSticky: boolean;
  style: 'transparent' | 'solid' | 'glass';
  showCta: boolean;
  ctaText: string;
  ctaUrl: string;
}

export interface FooterSettings {
  description: string;
  copyright: string;
  developerCredit: string;
  developerUrl: string;
  showPrivacy: boolean;
  showTerms: boolean;
  showCookiePolicy: boolean;
}

export interface HeroSettings {
  backgroundType: 'image' | 'youtube';
  title: string;
  highlightedText: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  imageUrl: string;
  youtubeUrl: string;
  fallbackImageUrl: string;
  mobileFallbackImageUrl: string;
  overlayOpacity: number; // 0 to 100
  badgeText: string;
  active: boolean;
}

export interface HomepageSection {
  id: string;
  key: string;
  label: string;
  title: string;
  subtitle: string;
  isEnabled: boolean;
  order: number;
}

export interface PromotionalCampaign {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  buttonText: string;
  buttonUrl: string;
  startDate: string;
  endDate: string;
  isEnabled: boolean;
  displayMode: 'popup' | 'banner' | 'both';
  frequencyLimitHours: number;
  priority?: number;
}

export interface Leadership {
  id: string;
  name: string;
  slug: string;
  roleType: 'founder' | 'co_founder' | 'other';
  designation: string;
  shortBio: string;
  fullBio: string;
  photoUrl: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  githubUrl?: string;
  email?: string;
  whatsapp?: string;
  portfolioUrl?: string;
  otherContactUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  role: string;
  photoUrl: string;
  bio: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  githubUrl?: string;
  email?: string;
  whatsapp?: string;
  customUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  imageUrl?: string;
  category: string;
  keyFeatures: string[];
  deliverables: string[];
  ctaText?: string;
  ctaUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
}

export type ProjectStatus = 'Live' | 'Completed' | 'In Development' | 'Maintenance' | 'Archived';

export interface ProjectImage {
  id: string;
  projectId: string;
  imageUrl: string;
  altText?: string;
  caption?: string;
  displayOrder: number;
  createdAt?: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  client: string;
  category: string;
  year: string;
  status: ProjectStatus;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  heroImageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  externalUrl?: string;
  caseStudyUrl?: string;
  technologies: string[];
  keyFeatures: string[];
  projectChallenges?: string;
  projectSolution?: string;
  projectOutcome?: string;
  partnerId?: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  metrics?: { label: string; value: string }[];
}

export type PartnershipType =
  | 'Strategic Partner'
  | 'Technology Partner'
  | 'Education Partner'
  | 'Training Partner'
  | 'CSR Partner'
  | 'Collaboration'
  | 'Community Partner';

export interface Partner {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  coverImageUrl?: string;
  shortDescription: string;
  description: string;
  partnershipType: PartnershipType;
  partnershipDate?: string;
  location?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  highlights?: string[];
  isFeatured: boolean;
  isActive: boolean;
  hasDetailPage?: boolean;
  displayOrder: number;
}

export interface GalleryImage {
  id: string;
  albumId: string;
  imageUrl: string;
  altText?: string;
  caption?: string;
  displayOrder: number;
  createdAt?: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  category: string;
  eventDate: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt?: string;
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  eligibility: string;
  benefits: string[];
  fee: string;
  applicationUrl: string;
  applicationStatus: 'Open' | 'Upcoming' | 'Closed';
  startDate: string;
  endDate: string;
  certificateAvailable: boolean;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  organization: string;
  photoUrl?: string;
  message: string;
  rating: number;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  publishDate: string;
  readTime: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isFeatured: boolean;
  isEnabled: boolean;
  displayOrder: number;
}

export interface CareerSettings {
  title: string;
  subtitle: string;
  description: string;
  googleFormUrl: string;
  bannerUrl?: string;
  isEnabled: boolean;
  displayOrder: number;
  perks: string[];
  openRoles: {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
  }[];
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  isPublished: boolean;
  showInNav: boolean;
  displayOrder: number;
  updatedAt: string;
}

export interface LegalPage {
  slug: 'privacy-policy' | 'terms-and-conditions' | 'cookie-policy';
  title: string;
  lastUpdated: string;
  content: string;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CookieConsentSettings {
  isEnabled: boolean;
  bannerText: string;
  acceptText: string;
  rejectText: string;
  preferencesText: string;
  necessaryDescription: string;
  analyticsDescription: string;
}

export interface LoadingScreenSettings {
  isEnabled: boolean;
  logoVariant: 'primary' | 'light' | 'dark' | 'custom';
  customLogoUrl?: string;
  loadingText: string;
  durationMs: number;
  animationStyle: 'pulse' | 'spin' | 'minimal';
}

export interface ErrorPageSettings {
  heading404: string;
  description404: string;
  ctaText404: string;
  ctaUrl404: string;
  imageUrl404?: string;
}

export interface EnquiryNote {
  id: string;
  enquiryId: string;
  note: string;
  author: string;
  createdAt: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'In Discussion' | 'Converted' | 'Closed';

export interface Enquiry {
  id: string;
  referenceNo: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  company?: string;
  service: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  status: EnquiryStatus;
  priority?: 'Normal' | 'High' | 'Urgent';
  assignedTo?: string;
  followUpDate?: string;
  notes?: EnquiryNote[];
  createdAt: string;
}

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'linkedin' | 'github' | 'youtube' | 'x' | 'facebook' | 'whatsapp';
  label: string;
  url: string;
  isEnabled: boolean;
  displayOrder: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  isEnabled: boolean;
  displayOrder: number;
}

export interface SeoSettings {
  globalTitle: string;
  globalDescription: string;
  keywords: string;
  canonicalUrl?: string;
  ogImage: string;
  twitterImage: string;
  googleVerification?: string;
  robots: string;
}

export interface MediaItem {
  id: string;
  fileName: string;
  url: string;
  thumbnailUrl?: string;
  type: string;
  altText?: string;
  caption?: string;
  category?: string;
  uploadedAt: string;
  size?: string;
  usedIn?: string[];
}

export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  timestamp: string;
  userEmail: string;
  details?: string;
}

export interface MaintenanceSettings {
  id: string;
  enabled: boolean;
  title: string;
  message: string;
  description?: string;
  startAt?: string;
  endAt?: string;
  allowAdminAccess: boolean;
  showCountdown: boolean;
  updatedAt?: string;
  updatedBy?: string;
}
