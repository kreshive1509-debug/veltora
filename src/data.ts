import { ServiceInfo, DemoProject, TeamMember } from './types';

export const SERVICES: ServiceInfo[] = [
  { id: 'web-dev', name: 'Web Development', emoji: '🌐', tagline: 'Next-gen responsive web applications' },
  { id: 'portfolio', name: 'Portfolio Websites', emoji: '💼', tagline: 'Personal brands that land opportunities' },
  { id: 'landing-pages', name: 'Landing Pages', emoji: '🚀', tagline: 'High-conversion pixel-perfect interfaces' },
  { id: 'ui-ux', name: 'UI/UX Design', emoji: '🎨', tagline: 'Immersive conceptual visual architectures' },
  { id: 'freelance', name: 'Freelance Projects', emoji: '🤝', tagline: 'Custom tech builds for clients globally' },
  { id: 'consulting', name: 'Technical Consultation', emoji: '💡', tagline: 'Expert structural architecture planning' },
  { id: 'mobile-apps', name: 'Mobile App Development', emoji: '📱', tagline: 'Smooth cross-platform cellular systems' },
  { id: 'ecommerce', name: 'E-commerce Solutions', emoji: '🛒', tagline: 'Digital stores designed to scale sales' },
  { id: 'data-analysis', name: 'Data Analysis', emoji: '📊', tagline: 'Clean interactive statistical insights' },
  { id: 'video-editing', name: 'Video Editing', emoji: '🎬', tagline: 'Cinematic attention-grabbing visual assets' },
  { id: 'content-writing', name: 'Content Writing', emoji: '✍️', tagline: 'SEO-optimized authoritative copy' },
  { id: 'sql-db', name: 'SQL Database Management', emoji: '🗄️', tagline: 'Normalized query-efficient structures' },
  { id: 'oracle-entry', name: 'Oracle Database Entry', emoji: '🔷', tagline: 'High-speed secure industrial warehousing' },
  { id: 'oracle-app', name: 'Oracle Application Development', emoji: '⚙️', tagline: 'Enterprise-grade secure ERP processes' },
  { id: 'whatsapp-auto', name: 'WhatsApp Automation & Chatbot Creation', emoji: '🤖', tagline: 'Smart self-service customer pipelines' },
];

export const BACK_THEMES = [
  {
    gradientClass: 'from-[#FF2D78] to-[#FF6B6B]', // Hot pink
    themeName: 'Passionate',
  },
  {
    gradientClass: 'from-[#FFD700] to-[#FF8C00]', // Gold
    themeName: 'Premium',
  },
  {
    gradientClass: 'from-[#00F5FF] to-[#00D4A8]', // Teal
    themeName: 'Fresh',
  },
  {
    gradientClass: 'from-[#39FF14] to-[#00D4A8]', // Electric green
    themeName: 'Digital',
  },
  {
    gradientClass: 'from-[#FF6B9D] to-[#C9184A]', // Rose gold
    themeName: 'Creative',
  }
];

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 1,
    title: 'ShopEasy',
    category: 'E-commerce UI',
    description: 'A fully responsive online store with cart, product filters, and Firebase auth.',
    bannerGradient: 'from-purple-600 to-violet-900',
    tags: ['React', 'Tailwind', 'Firebase']
  },
  {
    id: 2,
    title: 'PortfolioKit',
    category: 'Portfolio Builder',
    description: 'Drag and drop portfolio generator for students and freelancers.',
    bannerGradient: 'from-cyan-500 to-blue-700',
    tags: ['HTML', 'CSS', 'JS']
  },
  {
    id: 3,
    title: 'TaskFlow',
    category: 'Project Management',
    description: 'Kanban-style task manager with team collaboration and deadline tracking.',
    bannerGradient: 'from-green-500 to-teal-800',
    tags: ['React', 'Node.js']
  },
  {
    id: 4,
    title: 'DataViz Dashboard',
    category: 'Analytics',
    description: 'Interactive data visualization dashboard with real-time chart updates.',
    bannerGradient: 'from-orange-500 to-red-800',
    tags: ['Chart.js', 'Bootstrap']
  },
  {
    id: 5,
    title: 'LandPro',
    category: 'Landing Pages',
    description: 'Premium animated landing pages for startups and digital products.',
    bannerGradient: 'from-pink-500 to-purple-900',
    tags: ['HTML', 'CSS', 'GSAP']
  },
  {
    id: 6,
    title: 'QuickBlog',
    category: 'Blog Platform',
    description: 'Full-featured blog with markdown editor, tags, and SEO optimization.',
    bannerGradient: 'from-yellow-500 to-orange-700',
    tags: ['React', 'MongoDB']
  },
  {
    id: 7,
    title: 'BrewHaven Cafe',
    category: 'Cafe Website',
    description: 'A premium cafe website with animated menu, reservation system, and elegant food gallery.',
    bannerGradient: 'from-[#8B4513] to-[#D2691E]',
    tags: ['HTML', 'CSS', 'JS', 'GSAP']
  },
  {
    id: 8,
    title: 'MediQuick',
    category: 'Medical Shop',
    description: 'A professional medical store website with product catalog, emergency contact section, and prescription upload feature.',
    bannerGradient: 'from-[#0EA5E9] to-[#06B6D4]',
    tags: ['HTML', 'CSS', 'JS', 'Bootstrap']
  },
  {
    id: 9,
    title: 'WA-Dashboard',
    category: 'Automation Control',
    description: 'A powerful WhatsApp business automation dashboard featuring chatbot flow builder, broadcast lists, and auto-reply managers.',
    bannerGradient: 'from-[#25D366] to-[#128C7E]',
    tags: ['React', 'Node.js', 'WA API', 'Chart.js']
  },
  {
    id: 10,
    title: 'SpendSniper',
    category: 'Personal Finance',
    description: 'A smart personal expense tracker that features categorization, monthly budget alerts, visual spending charts, and AI-powered suggestions.',
    bannerGradient: 'from-[#7B2FFF] to-[#00F5FF]',
    tags: ['React Native', 'Firebase', 'Chart.js', 'AI']
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Kreshive Srivastava',
    role: 'Developer • Director',
    initials: 'KS',
    color: 'from-purple-600 via-indigo-600 to-violet-700',
    quote: 'Dream. Build. Innovate. Repeat.',
    description: 'Leading technical direction and client relations at Veltora. Passionate about software architecture, scalable API structures, and creating seamless full-stack web solutions.'
  },
  {
    name: 'Harsh Patel',
    role: 'Co-Creator • Managing Director',
    initials: 'HP',
    color: 'from-cyan-500 via-blue-600 to-indigo-700',
    quote: 'Dream. Build. Innovate. Repeat.',
    description: 'Coordinating development efforts and managing client operational workflows to deliver pristine digital experiences, optimized landing configurations, and on-time solutions.'
  },
  {
    name: 'Akash Yadav',
    role: 'Creator • Marketing Head',
    initials: 'AY',
    color: 'from-pink-600 via-rose-600 to-red-700',
    quote: 'Dream. Build. Innovate. Repeat.',
    description: 'Specializing in business growth strategies, branding, and establishing impactful strategic partnerships with other organizations to drive collaboration and visibility.'
  },
  {
    name: 'Mariyam Siddiqui',
    role: 'Designer • Designer Head',
    initials: 'MS',
    color: 'from-fuchsia-500 via-purple-600 to-pink-700',
    quote: 'Dream. Build. Innovate. Repeat.',
    description: 'Crafting beautiful, accessible layout systems, user experiences, and visual guidelines that define Veltora\'s elegant, high-contrast, and modern slate visual aesthetics.'
  }
];
