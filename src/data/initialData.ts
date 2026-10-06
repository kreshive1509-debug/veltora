import {
  SiteSettings,
  BrandAppearanceSettings,
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
  SocialLink,
  NavigationItem,
  SeoSettings,
  MediaItem,
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
import { initialBrandAppearance } from '../lib/brandTheme';

export { initialBrandAppearance };

export const initialSiteSettings: SiteSettings = {
  companyName: 'Veltora IT Solutions',
  shortName: 'Veltora',
  tagline: 'Innovating Dreams',
  brandDescription:
    'Veltora is an emerging student-founded technology company focused on building digital products, software architectures, intelligent automations, and technology-driven training initiatives.',
  foundedYear: '2024',
  primaryEmail: 'veltoraitsolution2026@gmail.com',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  address: 'Hub of Innovation, Tech Corridor, India',
  businessHours: 'Monday – Saturday: 9:00 AM – 7:00 PM IST',
  copyright: '© 2026 Veltora IT Solutions. All rights reserved.',
  footerDescription:
    'An emerging student-founded technology company focused on engineering digital products, software architectures, intelligent automations, and future-forward developer initiatives.',
  developerCredit: 'Developed by Veltora IT Solutions',
  primaryLogoUrl: '',
  lightLogoUrl: '',
  darkLogoUrl: '',
  navbarLogoUrl: '',
  navbarLogoVariant: 'primary',
  navbarLogoWidth: 140,
  footerLogoUrl: '',
  footerLogoVariant: 'primary',
  mobileLogoUrl: '',
  adminLogoUrl: '',
  loginLogoUrl: '',
  emailLogoUrl: '',
  faviconUrl: '',
  appleTouchIconUrl: '',
  browserIconUrl: '',
  pwaIconUrl: '',
  ogDefaultImageUrl: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
};

export const initialHeroSettings: HeroSettings = {
  backgroundType: 'image',
  title: 'Turning Ideas Into',
  highlightedText: 'Digital Reality.',
  subtitle:
    'Veltora is an emerging technology company delivering bespoke software engineering, modern digital products, automated workflows, and high-impact technical training.',
  primaryButtonText: 'Start a Project',
  primaryButtonUrl: '#contact',
  secondaryButtonText: 'Explore Our Work',
  secondaryButtonUrl: '#projects',
  imageUrl: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
  youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  fallbackImageUrl: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
  mobileFallbackImageUrl: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
  overlayOpacity: 45,
  badgeText: 'Student-Founded Technology Enterprise',
  active: true,
};

export const initialHomepageSections: HomepageSection[] = [
  { id: '1', key: 'hero', label: 'Hero Section', title: 'Hero', subtitle: 'Primary value proposition', isEnabled: true, order: 1 },
  { id: '2', key: 'trust', label: 'Trust & Impact', title: 'Impact Metrics', subtitle: 'Quantified engineering milestones', isEnabled: true, order: 2 },
  { id: '3', key: 'about', label: 'About Veltora', title: 'About Us', subtitle: 'Our origins and vision', isEnabled: true, order: 3 },
  { id: '4', key: 'leadership', label: 'Founder & Co-Founder', title: 'Leadership', subtitle: 'Meet the people behind Veltora', isEnabled: true, order: 4 },
  { id: '5', key: 'services', label: 'Services & Capabilities', title: 'Our Services', subtitle: 'End-to-end technical excellence', isEnabled: true, order: 5 },
  { id: '6', key: 'projects', label: 'Featured Projects (Our Work)', title: 'Our Work', subtitle: 'Selected client case studies', isEnabled: true, order: 6 },
  { id: '7', key: 'why_veltora', label: 'Why Veltora', title: 'The Veltora Edge', subtitle: 'Why forward-thinking teams partner with us', isEnabled: true, order: 7 },
  { id: '8', key: 'partners', label: 'Our Partners', title: 'Our Partners', subtitle: 'Meaningful collaborations', isEnabled: true, order: 8 },
  { id: '9', key: 'gallery', label: 'Inside Veltora (Gallery)', title: 'Inside Veltora', subtitle: 'Company moments & milestones', isEnabled: true, order: 9 },
  { id: '10', key: 'programs', label: 'Programs & Internships', title: 'Internships & Training', subtitle: 'Empowering future tech creators', isEnabled: true, order: 10 },
  { id: '11', key: 'testimonials', label: 'Testimonials', title: 'Client Voices', subtitle: 'What our collaborators say', isEnabled: true, order: 11 },
  { id: '12', key: 'blog', label: 'Blog & Insights', title: 'Engineering Journal', subtitle: 'Perspectives on tech & innovation', isEnabled: true, order: 12 },
  { id: '13', key: 'contact', label: 'Project Enquiry & Contact', title: 'Let’s Build Together', subtitle: 'Start your journey with Veltora', isEnabled: true, order: 13 },
];

export const initialCampaigns: PromotionalCampaign[] = [];

export const initialLeadership: Leadership[] = [
  {
    id: 'lead-1',
    name: 'Aakash Verma',
    slug: 'aakash-verma',
    roleType: 'founder',
    designation: 'Founder & Chief Technology Officer',
    shortBio: 'Systems architect, product builder, and student founder driving Veltora’s technical vision and engineering standards.',
    fullBio:
      'Aakash founded Veltora with a conviction that ambitious student engineers can craft enterprise-grade digital systems. Leading software architecture, cloud platforms, and engineering mentorship, he brings deep expertise in full-stack web technologies, distributed backend design, and high-performance user interfaces.',
    photoUrl: '/src/assets/images/founder_portrait_1791103497099.jpg',
    linkedinUrl: 'https://linkedin.com/in/veltora-founder',
    instagramUrl: 'https://instagram.com/veltora.tech',
    githubUrl: 'https://github.com/veltora-founder',
    email: 'founder@veltoraitsolutions.com',
    whatsapp: '919876543210',
    portfolioUrl: 'https://veltoraitsolutions.com/leadership/aakash-verma',
    otherContactUrl: 'https://cal.com/veltora-founder',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'lead-2',
    name: 'Rohan Sharma',
    slug: 'rohan-sharma',
    roleType: 'co_founder',
    designation: 'Co-Founder & Head of Product',
    shortBio: 'Product strategist and operations lead ensuring every digital solution delivers measurable business value and elegant design.',
    fullBio:
      'Rohan spearheads product lifecycle, client strategy, and growth initiatives at Veltora. With a focus on human-centered design systems and pragmatic business workflows, he aligns cutting-edge technology with real-world client objectives.',
    photoUrl: '/src/assets/images/cofounder_portrait_1791103511271.jpg',
    linkedinUrl: 'https://linkedin.com/in/veltora-cofounder',
    instagramUrl: 'https://instagram.com/veltora.tech',
    githubUrl: 'https://github.com/veltora-cofounder',
    email: 'rohan@veltoraitsolutions.com',
    whatsapp: '919876543211',
    portfolioUrl: 'https://veltoraitsolutions.com/leadership/rohan-sharma',
    otherContactUrl: 'https://cal.com/veltora-cofounder',
    displayOrder: 2,
    isActive: true,
  },
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Priya Nair',
    designation: 'Lead Frontend Engineer',
    role: 'Design Systems & React Architect',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in modern web performance, accessible interactive experiences, and micro-interactions.',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    email: 'priya@veltoraitsolutions.com',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'team-2',
    name: 'Devansh Kulkarni',
    designation: 'Cloud & DevOps Lead',
    role: 'Infrastructure & Automation',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Architecting resilient CI/CD pipelines, container orchestration, and serverless cloud clusters.',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    email: 'devansh@veltoraitsolutions.com',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'team-3',
    name: 'Ananya Mehta',
    designation: 'UI/UX Design Director',
    role: 'Product Designer',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Crafting light luxury visual identities, high-conversion typography systems, and refined user flows.',
    linkedinUrl: 'https://linkedin.com',
    instagramUrl: 'https://instagram.com',
    email: 'ananya@veltoraitsolutions.com',
    displayOrder: 3,
    isActive: true,
  },
];

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    name: 'Bespoke Software Engineering',
    slug: 'bespoke-software-engineering',
    shortDescription: 'Custom full-stack web platforms, mobile applications, and resilient cloud systems built for scale.',
    fullDescription:
      'We design and build bespoke software applications tailored to your exact operational requirements. From scalable SaaS architectures to high-concurrency database systems, we write clean, maintainable, and type-safe code using modern engineering best practices.',
    icon: 'Terminal',
    imageUrl: '/src/assets/images/project_saas_platform_1791103524205.jpg',
    category: 'Engineering',
    keyFeatures: [
      'Type-safe TypeScript & React frontend ecosystems',
      'High-performance REST & GraphQL APIs',
      'Relational & document database modeling',
      'Comprehensive automated test suites',
    ],
    deliverables: [
      'Complete production-ready codebase',
      'System architecture documentation',
      'CI/CD deployment pipelines',
      'Post-launch warranty & maintenance',
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'srv-2',
    name: 'Modern Web & Digital Experiences',
    slug: 'modern-web-development',
    shortDescription: 'Ultra-fast, light-luxury web applications with bespoke typography, smooth animations, and top-tier SEO.',
    fullDescription:
      'Your digital presence should command authority. We create modern, fast-loading web applications that blend editorial aesthetics with responsive engineering, sub-second load times, and search engine optimization.',
    icon: 'Layout',
    imageUrl: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
    category: 'Digital Experience',
    keyFeatures: [
      'Light luxury design language with zero generic templates',
      'Tailwind CSS v4 & Framer Motion micro-interactions',
      'Full CMS integration for effortless content management',
      'Lighthouse 95+ performance & accessibility ratings',
    ],
    deliverables: [
      'Responsive web portal',
      'Interactive Admin Content Management Portal',
      'Domain & DNS configuration',
      'Complete SEO & OpenGraph card suite',
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
  },
  {
    id: 'srv-3',
    name: 'Intelligent Workflow Automation',
    slug: 'workflow-automation',
    shortDescription: 'Streamline repetitive operations, connect fragmented APIs, and deploy smart data pipelines.',
    fullDescription:
      'Eliminate manual data entry and bottlenecked operations. We build custom webhook integrations, automated lead routing, CRM synchronizations, and reporting dashboards that save hundreds of operational hours.',
    icon: 'Cpu',
    imageUrl: '/src/assets/images/project_ai_automation_1791103541676.jpg',
    category: 'Automation',
    keyFeatures: [
      'Multi-platform webhook & API synchronization',
      'Automated customer communication & WhatsApp dispatch',
      'Scheduled background cron jobs & data normalization',
      'Real-time event logging & notification webhooks',
    ],
    deliverables: [
      'Configured automation workflows',
      'Failover & error-alerting monitors',
      'Staff operating guide',
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 3,
  },
  {
    id: 'srv-4',
    name: 'Cloud Infrastructure & DevOps',
    slug: 'cloud-infrastructure-devops',
    shortDescription: 'Serverless deployment architectures, automated CI/CD, SSL security, and database hardening.',
    fullDescription:
      'We configure robust, scale-to-zero serverless cloud hosting, managed PostgreSQL databases, CDN caching, and automated deployment pipelines with Row Level Security.',
    icon: 'Cloud',
    imageUrl: '/src/assets/images/project_saas_platform_1791103524205.jpg',
    category: 'Infrastructure',
    keyFeatures: [
      'Serverless hosting setup on Vercel & Supabase',
      'Automated GitHub Actions CI/CD pipelines',
      'Row Level Security (RLS) policies & auth guards',
      'Zero-downtime deployment strategies',
    ],
    deliverables: [
      'Secured cloud infrastructure',
      'Database migration scripts & backups',
      'Security audit report',
    ],
    isFeatured: false,
    isActive: true,
    displayOrder: 4,
  },
  {
    id: 'srv-5',
    name: 'Student Training & Tech Initiatives',
    slug: 'training-initiatives',
    shortDescription: 'Hands-on developer workshops, industry-oriented internships, and collegiate tech incubation.',
    fullDescription:
      'As a student-founded enterprise, Veltora bridges the gap between academic theory and production-grade engineering. We conduct hands-on bootcamps, code reviews, and structured internship cohorts.',
    icon: 'GraduationCap',
    imageUrl: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
    category: 'Education & Community',
    keyFeatures: [
      'Mentorship from practicing software engineers',
      'Live project contributions & code reviews',
      'Modern tech stack masterclasses (React, Node, Cloud)',
      'Verified performance certificates & recommendation letters',
    ],
    deliverables: [
      'Structured curriculum & project milestones',
      'Mentorship sessions',
      'Verified credential issuance',
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 5,
  },
];

export const initialPartners: Partner[] = [
  {
    id: 'part-1',
    name: 'TechVanguard Labs',
    slug: 'techvanguard-labs',
    logoUrl: '/src/assets/images/partner_innovation_lab_1791104323216.jpg',
    coverImageUrl: '/src/assets/images/partner_innovation_lab_1791104323216.jpg',
    shortDescription: 'Joint engineering collaboration on distributed cloud microservices and developer tooling architecture.',
    description:
      'TechVanguard Labs is a global technology research lab partnering with Veltora to co-engineer resilient microservice patterns, database clustering, and high-throughput workflow pipelines.',
    partnershipType: 'Technology Partner',
    partnershipDate: 'Established 2025',
    location: 'Bangalore, India',
    websiteUrl: 'https://techvanguard.example.com',
    linkedinUrl: 'https://linkedin.com/company/techvanguard-labs',
    instagramUrl: 'https://instagram.com/techvanguard',
    highlights: [
      'Joint research on serverless PostgreSQL edge routing',
      'Shared developer tooling and sandbox environments',
      'Co-authored technical benchmarks on web latency',
    ],
    isFeatured: true,
    isActive: true,
    hasDetailPage: true,
    displayOrder: 1,
  },
  {
    id: 'part-2',
    name: 'SkillForge Academic Council',
    slug: 'skillforge-academic-council',
    logoUrl: '/src/assets/images/gallery_workshop_session_1791104311781.jpg',
    coverImageUrl: '/src/assets/images/gallery_workshop_session_1791104311781.jpg',
    shortDescription: 'Collegiate academic partner co-hosting developer fellowships, hackathons, and curriculum reviews.',
    description:
      'SkillForge unites academic institutions and industry practitioners to elevate student software craftsmanship through real-world internships, open-source cohorts, and project evaluation.',
    partnershipType: 'Education Partner',
    partnershipDate: 'Established 2025',
    location: 'National Academic Network',
    websiteUrl: 'https://skillforge-council.example.com',
    linkedinUrl: 'https://linkedin.com/company/skillforge',
    highlights: [
      'Annual Collegiate Developer Fellowships',
      'Accredited verification certificates for 500+ student builders',
      'Quarterly code reviews by industry leads',
    ],
    isFeatured: true,
    isActive: true,
    hasDetailPage: true,
    displayOrder: 2,
  },
  {
    id: 'part-3',
    name: 'Vertex Cloud Alliances',
    slug: 'vertex-cloud-alliances',
    logoUrl: '/src/assets/images/gallery_product_summit_1791104300694.jpg',
    coverImageUrl: '/src/assets/images/gallery_product_summit_1791104300694.jpg',
    shortDescription: 'Strategic infrastructure alliance providing scalable backend compute and edge network provisioning.',
    description:
      'Vertex Alliances works alongside Veltora to supply high-reliability serverless infrastructure and continuous deployment pipelines across our product portfolio.',
    partnershipType: 'Strategic Partner',
    partnershipDate: 'Established 2026',
    location: 'Global',
    websiteUrl: 'https://vertexcloud.example.com',
    linkedinUrl: 'https://linkedin.com/company/vertex-cloud',
    highlights: [
      'Scale-to-zero serverless cloud hosting',
      'Automated global edge CDN caching',
      'Advanced Row Level Security protocols',
    ],
    isFeatured: true,
    isActive: true,
    hasDetailPage: true,
    displayOrder: 3,
  },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Apex Horizon Logistics Platform',
    slug: 'apex-horizon-platform',
    client: 'Apex Global Logistics',
    category: 'Enterprise Web Application',
    year: '2026',
    status: 'Live',
    shortDescription: 'Cloud-native freight orchestration portal with sub-second manifest search and instant client WhatsApp dispatch.',
    fullDescription:
      'Apex Horizon is an end-to-end logistics platform engineered by Veltora to replace legacy manual dispatch spreadsheets. Featuring sub-second search across 50,000+ active manifests, automated PDF invoice generation, and real-time WhatsApp milestone dispatch.',
    thumbnail: '/src/assets/images/project_saas_platform_1791103524205.jpg',
    heroImageUrl: '/src/assets/images/project_saas_platform_1791103524205.jpg',
    liveUrl: 'https://apex-horizon-demo.veltora.tech',
    githubUrl: 'https://github.com/veltora-it-solutions/apex-horizon',
    externalUrl: 'https://apex-horizon-demo.veltora.tech',
    caseStudyUrl: 'https://veltoraitsolutions.com/projects/apex-horizon-platform',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Serverless Edge'],
    keyFeatures: [
      'Sub-second search across 50,000+ active shipping manifests',
      'Automated PDF invoice generation and tax calculation',
      'Live customer milestone notifications via WhatsApp Gateway',
      'Role-Based Row Level Security for dispatchers and auditors',
    ],
    projectChallenges:
      'The client suffered from fragmented Google Sheets with human coordination errors causing delays of up to 48 hours in freight tracking.',
    projectSolution:
      'Veltora built a centralized TypeScript application backed by PostgreSQL with real-time subscription channels and automated webhook triggers.',
    projectOutcome:
      'Reduced dispatch coordination latency by 4.8x, eliminated 82% of administrative paperwork errors, and achieved 99.98% platform SLA.',
    partnerId: 'part-3',
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
    metrics: [
      { label: 'Dispatch Speedup', value: '4.8x' },
      { label: 'Operational Errors', value: '-82%' },
      { label: 'Uptime SLA', value: '99.98%' },
    ],
  },
  {
    id: 'proj-2',
    name: 'Nexus Automation & Telemetry Suite',
    slug: 'nexus-automation-suite',
    client: 'NextWave Marketing Hub',
    category: 'Workflow Automation',
    year: '2026',
    status: 'Live',
    shortDescription: 'Automated CRM lead routing, multi-channel customer notifications, and real-time conversion telemetry.',
    fullDescription:
      'A bespoke automation pipeline connecting inbound advertising webhooks directly to CRM pipelines and regional field executives. Reduces lead contact latency from 45 minutes down to 18 seconds.',
    thumbnail: '/src/assets/images/project_ai_automation_1791103541676.jpg',
    heroImageUrl: '/src/assets/images/project_ai_automation_1791103541676.jpg',
    liveUrl: 'https://nexus-suite-demo.veltora.tech',
    githubUrl: 'https://github.com/veltora-it-solutions/nexus-automation',
    externalUrl: 'https://nexus-suite-demo.veltora.tech',
    caseStudyUrl: 'https://veltoraitsolutions.com/projects/nexus-automation-suite',
    technologies: ['Node.js', 'PostgreSQL', 'Serverless Functions', 'WhatsApp Gateway', 'REST APIs'],
    keyFeatures: [
      'Webhook listener handling 200+ events per second',
      'Direct WhatsApp notification dispatch to sales agents',
      'Automated lead deduplication and enrichment',
      'Interactive executive telemetry dashboard',
    ],
    projectChallenges:
      'High lead drop-off rates due to delayed response times and lost spreadsheet entries during peak campaigns.',
    projectSolution:
      'Deployed serverless webhook queues that immediately normalize inbound payloads and alert sales reps with 1-click WhatsApp gateways.',
    projectOutcome:
      'Cut response latency from 45 minutes to 18 seconds, generating a +34% lift in qualified client conversions.',
    partnerId: 'part-1',
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
    metrics: [
      { label: 'Lead Response Time', value: '18 sec' },
      { label: 'Conversion Lift', value: '+34%' },
      { label: 'Weekly Hours Saved', value: '26 hrs' },
    ],
  },
  {
    id: 'proj-3',
    name: 'Aura Studio Light-Luxury Brand Space',
    slug: 'aura-studio-brand-portal',
    client: 'Aura Design Collective',
    category: 'Digital Platform',
    year: '2025',
    status: 'Completed',
    shortDescription: 'Light luxury portfolio and client collaboration space with fluid interactive transitions and headless CMS.',
    fullDescription:
      'Engineered for an architectural design consultancy, this light luxury website presents physical models and spatial projects with fluid interactive transitions and headless CMS publishing.',
    thumbnail: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
    heroImageUrl: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
    liveUrl: 'https://aura-studio-demo.veltora.tech',
    githubUrl: 'https://github.com/veltora-it-solutions/aura-portal',
    externalUrl: 'https://aura-studio-demo.veltora.tech',
    caseStudyUrl: 'https://veltoraitsolutions.com/projects/aura-studio-brand-portal',
    technologies: ['React 19', 'TypeScript', 'Motion', 'Tailwind CSS', 'ImgBB API'],
    keyFeatures: [
      'Sub-second edge loading with zero layout shift',
      'Light luxury typography system with custom serif accents',
      'Dynamic client portfolio CMS',
      'Mobile-optimized interactive photo galleries',
    ],
    projectChallenges:
      'Previous website was built on heavy WordPress templates taking over 5.4 seconds to load with broken mobile layout.',
    projectSolution:
      'Re-architected into a clean Vite + React SPA with optimized asset loading, pre-rendered components, and custom CSS.',
    projectOutcome:
      'Page Speed Index dropped to 0.8s, leading to a 3m 40s average session duration and +60% inbound portfolio requests.',
    isFeatured: true,
    isActive: true,
    displayOrder: 3,
    metrics: [
      { label: 'Page Speed Index', value: '0.8s' },
      { label: 'Engagement Time', value: '3m 40s' },
      { label: 'Inbound Inquiries', value: '+60%' },
    ],
  },
];

export const initialProjectImages: ProjectImage[] = [
  {
    id: 'pimg-1',
    projectId: 'proj-1',
    imageUrl: '/src/assets/images/project_saas_platform_1791103524205.jpg',
    altText: 'Apex Horizon Real-Time Logistics Manifest Dashboard',
    caption: 'Enterprise dispatch view showing active freight manifests and real-time delivery status.',
    displayOrder: 1,
  },
  {
    id: 'pimg-2',
    projectId: 'proj-1',
    imageUrl: '/src/assets/images/project_ai_automation_1791103541676.jpg',
    altText: 'Automated Invoice Generator Interface',
    caption: 'Automated billing engine calculating multistate tariffs and generating PDF invoices.',
    displayOrder: 2,
  },
  {
    id: 'pimg-3',
    projectId: 'proj-1',
    imageUrl: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
    altText: 'Fleet Analytics Control Panel',
    caption: 'Management telemetry tracking fleet utilization and milestone completion SLAs.',
    displayOrder: 3,
  },
  {
    id: 'pimg-4',
    projectId: 'proj-2',
    imageUrl: '/src/assets/images/project_ai_automation_1791103541676.jpg',
    altText: 'Nexus Telemetry Pipeline Visualization',
    caption: 'Real-time webhook queue processing inbound leads with sub-second routing.',
    displayOrder: 1,
  },
  {
    id: 'pimg-5',
    projectId: 'proj-2',
    imageUrl: '/src/assets/images/project_saas_platform_1791103524205.jpg',
    altText: 'Sales Executive Alert Gateway',
    caption: 'One-click WhatsApp dispatch modal for field sales personnel.',
    displayOrder: 2,
  },
  {
    id: 'pimg-6',
    projectId: 'proj-3',
    imageUrl: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
    altText: 'Aura Studio Digital Portfolio Showcase',
    caption: 'Editorial case study layout presenting spatial design models.',
    displayOrder: 1,
  },
  {
    id: 'pimg-7',
    projectId: 'proj-3',
    imageUrl: '/src/assets/images/project_saas_platform_1791103524205.jpg',
    altText: 'Interactive Project Drawer',
    caption: 'Full-bleed photography viewer with smooth gesture transitions.',
    displayOrder: 2,
  },
];

export const initialGalleryAlbums: GalleryAlbum[] = [
  {
    id: 'alb-1',
    title: 'Veltora Summer Developer Fellowship 2026',
    slug: 'fellowship-2026-cohort',
    description: 'Behind-the-scenes moments from our intensive student software fellowship, architecture whiteboard sprints, and live product demos.',
    coverImageUrl: '/src/assets/images/gallery_fellowship_team_1791104287245.jpg',
    category: 'Fellowship & Hackathons',
    eventDate: '2026-03-20',
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'alb-2',
    title: 'NextGen Product & Architecture Summit',
    slug: 'product-architecture-summit',
    description: 'Technical keynote presentations, partner discussions, and demonstrations of our serverless logistics platforms.',
    coverImageUrl: '/src/assets/images/gallery_product_summit_1791104300694.jpg',
    category: 'Events & Keynotes',
    eventDate: '2026-02-15',
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
  },
  {
    id: 'alb-3',
    title: 'Full-Stack Engineering & Code Reviews',
    slug: 'engineering-workshop-series',
    description: 'Hands-on developer workshops covering React 19, TypeScript strict typing, and Supabase Row Level Security.',
    coverImageUrl: '/src/assets/images/gallery_workshop_session_1791104311781.jpg',
    category: 'Workshops & Training',
    eventDate: '2026-01-28',
    isFeatured: true,
    isActive: true,
    displayOrder: 3,
  },
];

export const initialGalleryImages: GalleryImage[] = [
  {
    id: 'gimg-1',
    albumId: 'alb-1',
    imageUrl: '/src/assets/images/gallery_fellowship_team_1791104287245.jpg',
    altText: 'Student fellowship engineering squad collaborating on system architecture',
    caption: 'Student fellows mapping out distributed PostgreSQL schemas and API contracts.',
    displayOrder: 1,
  },
  {
    id: 'gimg-2',
    albumId: 'alb-1',
    imageUrl: '/src/assets/images/gallery_workshop_session_1791104311781.jpg',
    altText: 'Pair programming and live code review sprint',
    caption: '1-on-1 code reviews with senior technical leadership ensuring strict TypeScript standards.',
    displayOrder: 2,
  },
  {
    id: 'gimg-3',
    albumId: 'alb-1',
    imageUrl: '/src/assets/images/project_saas_platform_1791103524205.jpg',
    altText: 'Fellowship demo presentation',
    caption: 'Final fellowship cohort project demo presented to industry partners.',
    displayOrder: 3,
  },
  {
    id: 'gimg-4',
    albumId: 'alb-2',
    imageUrl: '/src/assets/images/gallery_product_summit_1791104300694.jpg',
    altText: 'Product summit keynote presentation',
    caption: 'Veltora leadership unveiling the 2026 serverless architecture blueprint.',
    displayOrder: 1,
  },
  {
    id: 'gimg-5',
    albumId: 'alb-2',
    imageUrl: '/src/assets/images/partner_innovation_lab_1791104323216.jpg',
    altText: 'Strategic partner exchange pavilion',
    caption: 'Networking with tech alliance leaders and academic partners.',
    displayOrder: 2,
  },
  {
    id: 'gimg-6',
    albumId: 'alb-3',
    imageUrl: '/src/assets/images/gallery_workshop_session_1791104311781.jpg',
    altText: 'Interactive workshop session',
    caption: 'Deep dive into React state management and real-time database subscriptions.',
    displayOrder: 1,
  },
  {
    id: 'gimg-7',
    albumId: 'alb-3',
    imageUrl: '/src/assets/images/project_ai_automation_1791103541676.jpg',
    altText: 'Workflow automation workshop demo',
    caption: 'Live demonstration of automated webhook ingestion pipelines.',
    displayOrder: 2,
  },
];

export const initialPrograms: Program[] = [
  {
    id: 'prog-1',
    name: 'Veltora Summer Engineering Fellowship 2026',
    slug: 'summer-fellowship-2026',
    description:
      'An intensive 10-week technical immersion for ambitious student software developers. Work directly on production codebases with senior peer mentorship.',
    duration: '10 Weeks (Hybrid / Remote)',
    eligibility: 'Open to enrolled college students & recent graduates with fundamentals in JS/TS and Git.',
    benefits: [
      'Direct contribution to live client and internal products',
      '1-on-1 code reviews from technical leadership',
      'Verified Certificate of Completion & Performance Recommendation',
      'Fast-track consideration for core squad engineering roles',
    ],
    fee: 'Merit-Based (100% Free for Selected Candidates)',
    applicationUrl: '#contact',
    applicationStatus: 'Open',
    startDate: '2026-06-01',
    endDate: '2026-08-15',
    certificateAvailable: true,
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'prog-2',
    name: 'Full-Stack Architecture Bootcamp',
    slug: 'full-stack-bootcamp',
    description:
      'Weekend masterclasses covering enterprise React patterns, PostgreSQL schema design, Supabase auth, and production deployment.',
    duration: '4 Weeks (Weekends)',
    eligibility: 'Basic programming knowledge in JavaScript or Python.',
    benefits: [
      'Build and deploy a full SaaS platform from scratch',
      'Architectural templates and production boilerplates included',
      'Certificate of Excellence',
    ],
    fee: 'Nominal Student Subsidized Fee',
    applicationUrl: '#contact',
    applicationStatus: 'Upcoming',
    startDate: '2026-09-01',
    endDate: '2026-09-28',
    certificateAvailable: true,
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Vikramaditya Rao',
    designation: 'Managing Director',
    organization: 'Apex Logistics Corp',
    message:
      'Veltora brought an unprecedented level of engineering rigor and design polish to our dispatch systems. The product was delivered on schedule, and our team immediately adopted it without friction.',
    rating: 5,
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'test-2',
    name: 'Sneha Chawla',
    designation: 'Operations Lead',
    organization: 'NextWave Growth Studio',
    message:
      'Their workflow automation transformed our lead response time. What took us 45 minutes manually now happens seamlessly in 18 seconds. Exceptional talent and communication.',
    rating: 5,
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
  },
  {
    id: 'test-3',
    name: 'Harshita Sen',
    designation: 'Former Engineering Fellow',
    organization: 'Class of 2025',
    message:
      'The Veltora Fellowship gave me real production experience that colleges simply don’t teach. Working on actual client architectures set me apart in engineering interviews.',
    rating: 5,
    isFeatured: true,
    isActive: true,
    displayOrder: 3,
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Architecting Resilient Serverless Web Applications in 2026',
    slug: 'resilient-serverless-architecture-2026',
    author: 'Aakash Verma, CTO',
    coverImage: '/src/assets/images/project_saas_platform_1791103524205.jpg',
    excerpt: 'How modern serverless databases, edge rendering, and Row Level Security allow lean engineering teams to operate enterprise workloads with zero server maintenance.',
    content: `
### The Paradigm Shift in Web Architecture

In recent years, web engineering has transitioned decisively from heavy monolith servers to agile, serverless edge architectures. For modern businesses, this means zero server downtime, instant scaling, and significantly reduced operational overhead.

#### 1. Decoupling Compute from Persistence
By utilizing serverless database engines with Row Level Security (RLS), security logic is enforced right at the database layer. Client applications can communicate with utmost safety while minimizing middle-tier boilerplate.

#### 2. Sub-Second Global Edge Latency
With global CDNs delivering pre-rendered assets and edge functions handling dynamic authorization, users worldwide experience consistent sub-second page loads.

#### 3. Why Lean Teams Win
Student-founded and agile technology studios can now build platforms that out-perform legacy enterprise monoliths by adopting modern TypeScript paradigms and modular component systems.
    `,
    category: 'Architecture',
    tags: ['Serverless', 'React 19', 'Supabase', 'Cloud'],
    isPublished: true,
    isFeatured: true,
    publishDate: '2026-03-28',
    readTime: '4 min read',
    seoTitle: 'Architecting Resilient Serverless Web Applications — Veltora Journal',
    seoDescription: 'Explore modern serverless edge architecture, database hardening, and TypeScript patterns for scalable web applications.',
  },
  {
    id: 'blog-2',
    title: 'The Student Founder Playbook: Building Real Value from Day One',
    slug: 'student-founder-playbook',
    author: 'Rohan Sharma, Head of Product',
    coverImage: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
    excerpt: 'Moving past theoretical college projects into delivering production software that solves tangible business challenges for real clients.',
    content: `
### Beyond the Hackathon Prototype

Every year, thousands of capable student developers build hackathon prototypes that get discarded after 48 hours. At Veltora, we chose a different path: treating every project as a durable commercial product.

#### Building for Reliability, Not Just Demos
1. **Strict Type Safety**: Ensuring edge-case prevention before code ever touches production.
2. **Human-Centered UX**: Polished light luxury interfaces that non-technical business operators love using.
3. **Accountability**: Real communication channels, milestone transparency, and relentless post-delivery support.
    `,
    category: 'Culture & Vision',
    tags: ['Founders', 'Product Strategy', 'Veltora Insights'],
    isPublished: true,
    isFeatured: true,
    publishDate: '2026-03-15',
    readTime: '3 min read',
    seoTitle: 'The Student Founder Playbook — Veltora IT Solutions',
    seoDescription: 'How student engineers are transforming into production-grade technology leaders.',
  },
];

export const initialSocialLinks: SocialLink[] = [
  { id: 'soc-1', platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/veltoraitsolutions', isEnabled: true, displayOrder: 1 },
  { id: 'soc-2', platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/company/veltora-it-solutions', isEnabled: true, displayOrder: 2 },
  { id: 'soc-3', platform: 'github', label: 'GitHub', url: 'https://github.com/veltora-it-solutions', isEnabled: true, displayOrder: 3 },
  { id: 'soc-4', platform: 'youtube', label: 'YouTube', url: 'https://youtube.com/@veltoraitsolutions', isEnabled: true, displayOrder: 4 },
  { id: 'soc-5', platform: 'x', label: 'X (Twitter)', url: 'https://x.com/veltora_tech', isEnabled: true, displayOrder: 5 },
  { id: 'soc-6', platform: 'whatsapp', label: 'WhatsApp Direct', url: 'https://wa.me/919876543210', isEnabled: true, displayOrder: 6 },
];

export const initialNavigationItems: NavigationItem[] = [
  { id: 'nav-1', label: 'About', url: '#about', isEnabled: true, displayOrder: 1 },
  { id: 'nav-2', label: 'Leadership', url: '#leadership', isEnabled: true, displayOrder: 2 },
  { id: 'nav-3', label: 'Services', url: '#services', isEnabled: true, displayOrder: 3 },
  { id: 'nav-4', label: 'Work', url: '/projects', isEnabled: true, displayOrder: 4 },
  { id: 'nav-5', label: 'Partners', url: '/partners', isEnabled: true, displayOrder: 5 },
  { id: 'nav-6', label: 'Gallery', url: '/gallery', isEnabled: true, displayOrder: 6 },
  { id: 'nav-7', label: 'Programs', url: '#programs', isEnabled: true, displayOrder: 7 },
  { id: 'nav-8', label: 'Insights', url: '#blog', isEnabled: true, displayOrder: 8 },
  { id: 'nav-9', label: 'Contact', url: '#contact', isEnabled: true, displayOrder: 9 },
];

export const initialSeoSettings: SeoSettings = {
  globalTitle: 'Veltora IT Solutions — Innovating Dreams',
  globalDescription:
    'Emerging student-founded technology company engineering digital products, bespoke software systems, workflow automation, and student training initiatives.',
  keywords: 'Veltora IT Solutions, software development, web applications, student technology company, internships, workflow automation, tech consulting',
  ogImage: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
  twitterImage: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
  googleVerification: '',
  robots: 'index, follow',
};

export const initialMedia: MediaItem[] = [
  {
    id: 'med-1',
    fileName: 'hero_veltora_luxury.jpg',
    url: '/src/assets/images/hero_veltora_luxury_1791103480932.jpg',
    type: 'image/jpeg',
    altText: 'Veltora Headquarters and Modern Architectural Studio',
    uploadedAt: '2026-03-01T10:00:00Z',
    usedIn: ['Hero Section', 'Brand Showcase'],
  },
  {
    id: 'med-2',
    fileName: 'founder_portrait.jpg',
    url: '/src/assets/images/founder_portrait_1791103497099.jpg',
    type: 'image/jpeg',
    altText: 'Aakash Verma - Founder & CTO',
    uploadedAt: '2026-03-01T10:00:00Z',
    usedIn: ['Leadership Section', 'Founder Card'],
  },
  {
    id: 'med-3',
    fileName: 'cofounder_portrait.jpg',
    url: '/src/assets/images/cofounder_portrait_1791103511271.jpg',
    type: 'image/jpeg',
    altText: 'Rohan Sharma - Co-Founder & Head of Product',
    uploadedAt: '2026-03-01T10:00:00Z',
    usedIn: ['Leadership Section', 'Co-Founder Card'],
  },
  {
    id: 'med-4',
    fileName: 'gallery_fellowship_team.jpg',
    url: '/src/assets/images/gallery_fellowship_team_1791104287245.jpg',
    type: 'image/jpeg',
    altText: 'Veltora Developer Fellowship Team Collaboration',
    uploadedAt: '2026-03-01T10:00:00Z',
    usedIn: ['Gallery Albums', 'Inside Veltora'],
  },
];

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What kind of technology solutions does Veltora engineer?',
    answer:
      'We design and build bespoke web applications, enterprise SaaS platforms, full-stack cloud backends, intelligent workflow automations, and modern digital experiences with strict type safety and high performance.',
    category: 'General & Services',
    isFeatured: true,
    isEnabled: true,
    displayOrder: 1,
  },
  {
    id: 'faq-2',
    question: 'How does Veltora collaborate with clients and organizations?',
    answer:
      'We operate on transparent sprint cycles with dedicated milestones, weekly demonstration releases, clear Slack/WhatsApp channels, and guaranteed source code handovers with comprehensive documentation.',
    category: 'Process & Delivery',
    isFeatured: true,
    isEnabled: true,
    displayOrder: 2,
  },
  {
    id: 'faq-3',
    question: 'What is the Veltora Student Developer Fellowship?',
    answer:
      'A merit-based student initiative where selected student engineers work alongside our core engineering squad on real production systems, mastering modern full-stack architectures and deployment pipelines.',
    category: 'Programs & Training',
    isFeatured: true,
    isEnabled: true,
    displayOrder: 3,
  },
  {
    id: 'faq-4',
    question: 'How can we partner or collaborate with Veltora IT Solutions?',
    answer:
      'We partner with academic institutions, technology companies, student clubs, and corporate CSR initiatives. Reach out via our Partners page or contact form to discuss mutual synergies.',
    category: 'Partnerships',
    isFeatured: false,
    isEnabled: true,
    displayOrder: 4,
  },
];

export const initialCareerSettings: CareerSettings = {
  title: 'Join the Veltora Engineering Squad',
  subtitle: 'Innovate with Ambition',
  description:
    'We are always looking for hungry student engineers, frontend artisans, cloud architects, and community leaders who want to build real products instead of synthetic prototypes.',
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc-Veltora-Career-Application-Form/viewform',
  bannerUrl: '/src/assets/images/gallery_fellowship_team_1791104287245.jpg',
  isEnabled: true,
  displayOrder: 11,
  perks: [
    'Work on live production architectures used by real clients',
    'Direct mentorship from Founder & senior student engineers',
    'Official internship certificates & verified recommendations',
    'Flexible hours accommodating university semester schedules',
  ],
  openRoles: [
    {
      id: 'role-1',
      title: 'Full-Stack React & Node Engineer',
      department: 'Engineering',
      location: 'Remote / Hybrid (India)',
      type: 'Fellowship / Internship',
      description: 'Build responsive light luxury interfaces with React, TypeScript, Tailwind, and Supabase.',
    },
    {
      id: 'role-2',
      title: 'UI/UX Design Systems Specialist',
      department: 'Product Design',
      location: 'Remote',
      type: 'Part-Time / Project-Based',
      description: 'Craft high-fidelity luxury prototypes, editorial typography systems, and interaction specs.',
    },
    {
      id: 'role-3',
      title: 'Community & University Outreach Lead',
      department: 'Growth & Partnerships',
      location: 'Campus / Remote',
      type: 'Fellowship',
      description: 'Expand Veltora technical workshops and hackathons across leading university campuses.',
    },
  ],
};

export const initialCustomPages: CustomPage[] = [
  {
    id: 'page-about-expanded',
    title: 'Company Profile & Student Founding Story',
    slug: 'company-profile',
    content: `
### Our Genesis: Student Ambition Meets Engineering Discipline

Veltora IT Solutions was founded with a singular thesis: young, passionate engineers can deliver digital software that rivals established enterprise agencies when guided by strict standards, relentless curiosity, and transparent communication.

#### Core Pillars of Veltora
- **Relentless Craft**: Every line of code is typed, audited, and optimized for latency.
- **Client Empathy**: We align technology choices with business ROI rather than fleeting hype.
- **Empowerment**: Providing student developers a legitimate launching pad into high-impact engineering careers.
    `,
    seoTitle: 'Company Profile — Veltora IT Solutions',
    seoDescription: 'Read the founding story and core engineering philosophy behind Veltora IT Solutions.',
    isPublished: true,
    showInNav: false,
    displayOrder: 1,
    updatedAt: '2026-03-25T12:00:00Z',
  },
];

export const initialLegalPages: Record<string, LegalPage> = {
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    lastUpdated: 'March 2026',
    content: `
### 1. Introduction
Veltora IT Solutions ("we", "our", or "us") respects your privacy and is committed to protecting any personal information collected through our website and services.

### 2. Information We Collect
We collect information you directly provide to us via contact and enquiry forms (such as Name, Email, Phone Number, Organization, and Project Requirements) strictly for communication, proposal preparation, and client support.

### 3. Usage of Data
- To respond to your inquiries and generate proposal estimations.
- To coordinate project deliverables and schedule consultations.
- We never sell, rent, or trade your personal data with third-party marketers.

### 4. Contact Us
For any privacy-related inquiries, contact us at: veltoraitsolution2026@gmail.com
    `,
    isPublished: true,
    seoTitle: 'Privacy Policy — Veltora IT Solutions',
    seoDescription: 'Privacy policy and data protection commitments of Veltora IT Solutions.',
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    lastUpdated: 'March 2026',
    content: `
### 1. Agreement to Terms
By accessing or using the website of Veltora IT Solutions, you agree to be bound by these terms and conditions.

### 2. Intellectual Property
All website designs, trademarks, service offerings, and branding assets are the property of Veltora IT Solutions unless otherwise credited.

### 3. Service Scope & Deliverables
All bespoke software development, student fellowships, and consulting engagements are governed by individual written agreements and Statements of Work (SOW).

### 4. Governing Law
These terms are governed by the applicable laws of India.
    `,
    isPublished: true,
    seoTitle: 'Terms & Conditions — Veltora IT Solutions',
    seoDescription: 'Terms and conditions governing the use of Veltora IT Solutions services and website.',
  },
  'cookie-policy': {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    lastUpdated: 'March 2026',
    content: `
### 1. What Are Cookies
Cookies are small text files stored on your device to enhance site navigation, remember user preferences, and provide anonymous aggregate usage insights.

### 2. How We Use Cookies
- **Essential Cookies**: Necessary for basic site security, theme persistence, and admin authentication.
- **Functional Cookies**: Used to remember theme and layout preferences.
- **Analytics Cookies**: Help us understand aggregate page engagement without profiling individual visitors.

### 3. Managing Cookies
You can customize your cookie consent preferences at any time using our Cookie Consent Banner or via your browser settings.
    `,
    isPublished: true,
    seoTitle: 'Cookie Policy — Veltora IT Solutions',
    seoDescription: 'Understand how Veltora IT Solutions utilizes cookies and how you can control your preferences.',
  },
};

export const initialCookieSettings: CookieConsentSettings = {
  isEnabled: true,
  bannerText: 'We use essential and functional cookies to ensure a seamless light luxury browsing experience and analyze aggregate site engagement.',
  acceptText: 'Accept All',
  rejectText: 'Essential Only',
  preferencesText: 'Cookie Settings',
  necessaryDescription: 'Required for core website security, theme loading, and navigation.',
  analyticsDescription: 'Anonymous aggregated telemetry to improve our digital products.',
};

export const initialLoadingScreenSettings: LoadingScreenSettings = {
  isEnabled: false,
  logoVariant: 'primary',
  loadingText: 'Innovating Dreams...',
  durationMs: 900,
  animationStyle: 'pulse',
};

export const initialErrorPageSettings: ErrorPageSettings = {
  heading404: 'Page Not Found',
  description404: 'The digital blueprint you are looking for has moved or took a different route.',
  ctaText404: 'Return to Homepage',
  ctaUrl404: '/',
};

export const initialHeaderSettings: HeaderSettings = {
  isSticky: true,
  style: 'glass',
  showCta: true,
  ctaText: 'Start a Project',
  ctaUrl: '#contact',
};

export const initialFooterSettings: FooterSettings = {
  description:
    'An emerging student-founded technology company focused on engineering digital products, software architectures, intelligent automations, and future-forward developer initiatives.',
  copyright: '© 2026 Veltora IT Solutions. All rights reserved.',
  developerCredit: 'Developed by Veltora IT Solutions ("Innovating Dreams")',
  developerUrl: 'https://veltoraitsolutions-bice.vercel.app/',
  showPrivacy: true,
  showTerms: true,
  showCookiePolicy: true,
};

