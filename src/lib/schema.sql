-- ==============================================================================
-- VELTORA IT SOLUTIONS - V2.0 COMPREHENSIVE PRODUCTION SCHEMA & RLS MIGRATION
-- Database: PostgreSQL / Supabase
-- Zero JSON Fallbacks Architecture
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. SITE SETTINGS & BRAND IDENTITY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    company_name TEXT NOT NULL DEFAULT 'Veltora IT Solutions',
    short_name TEXT NOT NULL DEFAULT 'Veltora',
    tagline TEXT NOT NULL DEFAULT 'Innovating Dreams',
    brand_description TEXT NOT NULL DEFAULT 'Veltora is an emerging student-founded technology company focused on building digital products, software architectures, intelligent automations, and technology-driven training initiatives.',
    founded_year TEXT NOT NULL DEFAULT '2024',
    primary_email TEXT NOT NULL DEFAULT 'veltoraitsolution2026@gmail.com',
    phone TEXT NOT NULL DEFAULT '+91 98765 43210',
    whatsapp TEXT NOT NULL DEFAULT '919876543210',
    address TEXT NOT NULL DEFAULT 'Hub of Innovation, Tech Corridor, India',
    business_hours TEXT NOT NULL DEFAULT 'Monday – Saturday: 9:00 AM – 7:00 PM IST',
    copyright TEXT NOT NULL DEFAULT '© 2026 Veltora IT Solutions. All rights reserved.',
    footer_description TEXT NOT NULL DEFAULT 'An emerging student-founded technology company focused on engineering digital products, software architectures, intelligent automations, and future-forward developer initiatives.',
    developer_credit TEXT NOT NULL DEFAULT 'Developed by Veltora IT Solutions',
    developer_url TEXT,
    map_embed_url TEXT,
    primary_logo_url TEXT,
    light_logo_url TEXT,
    dark_logo_url TEXT,
    navbar_logo_url TEXT,
    navbar_logo_variant TEXT DEFAULT 'primary',
    navbar_logo_width INTEGER DEFAULT 140,
    footer_logo_url TEXT,
    footer_logo_variant TEXT DEFAULT 'primary',
    mobile_logo_url TEXT,
    admin_logo_url TEXT,
    login_logo_url TEXT,
    loading_logo_url TEXT,
    email_logo_url TEXT,
    favicon_url TEXT,
    apple_touch_icon_url TEXT,
    browser_icon_url TEXT,
    pwa_icon_url TEXT,
    og_default_image_url TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 2. BRAND & THEME APPEARANCE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.brand_appearance (
    id TEXT PRIMARY KEY DEFAULT 'default',
    preset TEXT NOT NULL DEFAULT 'veltora_signature',
    primary_color TEXT NOT NULL DEFAULT '#B58A3E',
    secondary_color TEXT NOT NULL DEFAULT '#191C1E',
    accent_color TEXT NOT NULL DEFAULT '#C5A059',
    background_color TEXT NOT NULL DEFAULT '#FAF8F5',
    surface_color TEXT NOT NULL DEFAULT '#FFFFFF',
    text_color TEXT NOT NULL DEFAULT '#191C1E',
    muted_text_color TEXT NOT NULL DEFAULT '#5F6368',
    border_color TEXT NOT NULL DEFAULT '#E6DECE',
    heading_font TEXT NOT NULL DEFAULT '''Syne'', sans-serif',
    body_font TEXT NOT NULL DEFAULT '''Plus Jakarta Sans'', sans-serif',
    heading_weight TEXT NOT NULL DEFAULT 'bold',
    heading_scale TEXT NOT NULL DEFAULT 'balanced',
    body_scale TEXT NOT NULL DEFAULT 'standard',
    border_radius TEXT NOT NULL DEFAULT 'luxury',
    card_style TEXT NOT NULL DEFAULT 'glass',
    button_style TEXT NOT NULL DEFAULT 'rounded',
    shadow_intensity TEXT NOT NULL DEFAULT 'soft',
    container_width TEXT NOT NULL DEFAULT 'standard',
    section_spacing TEXT NOT NULL DEFAULT 'balanced',
    animation_intensity TEXT NOT NULL DEFAULT 'balanced',
    navbar_cta_text TEXT NOT NULL DEFAULT 'Start a Project',
    navbar_cta_url TEXT NOT NULL DEFAULT '#contact',
    show_navbar_cta BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 3. HEADER & FOOTER SETTINGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.header_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    is_sticky BOOLEAN NOT NULL DEFAULT true,
    style TEXT NOT NULL DEFAULT 'glass',
    show_cta BOOLEAN NOT NULL DEFAULT true,
    cta_text TEXT NOT NULL DEFAULT 'Start a Project',
    cta_url TEXT NOT NULL DEFAULT '#contact',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.footer_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    description TEXT NOT NULL DEFAULT 'An emerging student-founded technology company focused on engineering digital products, software architectures, intelligent automations, and future-forward developer initiatives.',
    copyright TEXT NOT NULL DEFAULT '© 2026 Veltora IT Solutions. All rights reserved.',
    developer_credit TEXT NOT NULL DEFAULT 'Developed by Veltora IT Solutions',
    developer_url TEXT NOT NULL DEFAULT 'https://veltoraitsolutions.com',
    show_privacy BOOLEAN NOT NULL DEFAULT true,
    show_terms BOOLEAN NOT NULL DEFAULT true,
    show_cookie_policy BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. HERO SECTION SETTINGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.hero_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    background_type TEXT NOT NULL DEFAULT 'image',
    title TEXT NOT NULL DEFAULT 'Turning Ideas Into',
    highlighted_text TEXT NOT NULL DEFAULT 'Digital Reality.',
    subtitle TEXT NOT NULL DEFAULT 'We build cutting-edge digital products, high-performance software systems, intelligent workflow automations, and technology-driven experiences with relentless precision.',
    primary_button_text TEXT NOT NULL DEFAULT 'Start a Project',
    primary_button_url TEXT NOT NULL DEFAULT '#contact',
    secondary_button_text TEXT NOT NULL DEFAULT 'Explore Our Work',
    secondary_button_url TEXT NOT NULL DEFAULT '#projects',
    image_url TEXT,
    youtube_url TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    fallback_image_url TEXT,
    mobile_fallback_image_url TEXT,
    overlay_opacity INTEGER NOT NULL DEFAULT 45,
    badge_text TEXT NOT NULL DEFAULT 'Emerging Tech Enterprise',
    active BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 5. HOMEPAGE SECTIONS ORDER & VISIBILITY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 6. PROMOTIONAL CAMPAIGNS & BANNERS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.promotional_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    button_text TEXT NOT NULL DEFAULT 'Learn More',
    button_url TEXT NOT NULL DEFAULT '#',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT false,
    display_mode TEXT NOT NULL DEFAULT 'both',
    frequency_limit_hours INTEGER NOT NULL DEFAULT 24,
    priority INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 7. LEADERSHIP (FOUNDER, CO-FOUNDER, EXECUTIVES)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.leadership (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    role_type TEXT NOT NULL,
    designation TEXT NOT NULL,
    short_bio TEXT NOT NULL,
    full_bio TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    linkedin_url TEXT,
    instagram_url TEXT,
    github_url TEXT,
    email TEXT,
    whatsapp TEXT,
    portfolio_url TEXT,
    other_contact_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 8. TEAM MEMBERS & ROLES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    role TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    bio TEXT NOT NULL,
    linkedin_url TEXT,
    instagram_url TEXT,
    github_url TEXT,
    email TEXT,
    whatsapp TEXT,
    custom_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 9. SERVICES & CAPABILITIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Code2',
    image_url TEXT,
    category TEXT NOT NULL DEFAULT 'Software Engineering',
    key_features JSONB DEFAULT '[]'::jsonb,
    deliverables JSONB DEFAULT '[]'::jsonb,
    cta_text TEXT DEFAULT 'Inquire About This Service',
    cta_url TEXT DEFAULT '#contact',
    is_featured BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 10. PARTNERS & ALLIANCES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT NOT NULL,
    cover_image_url TEXT,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    partnership_type TEXT NOT NULL DEFAULT 'Strategic Partner',
    partnership_date TEXT,
    location TEXT,
    website_url TEXT,
    linkedin_url TEXT,
    instagram_url TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    has_detail_page BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 11. PROJECTS & CASE STUDIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    client TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Web Development',
    year TEXT NOT NULL DEFAULT '2026',
    status TEXT NOT NULL DEFAULT 'Live',
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    hero_image_url TEXT,
    live_url TEXT,
    github_url TEXT,
    external_url TEXT,
    case_study_url TEXT,
    technologies JSONB DEFAULT '[]'::jsonb,
    key_features JSONB DEFAULT '[]'::jsonb,
    project_challenges TEXT,
    project_solution TEXT,
    project_outcome TEXT,
    partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
    metrics JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 12. PROJECT IMAGES (GALLERY PER PROJECT)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 13. GALLERY ALBUMS (COMPANY LEVEL)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Fellowship & Hackathons',
    event_date TEXT NOT NULL DEFAULT CURRENT_DATE::text,
    is_featured BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 14. GALLERY IMAGES (PER ALBUM)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    album_id UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 15. PROGRAMS & INTERNSHIPS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    duration TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    benefits JSONB DEFAULT '[]'::jsonb,
    fee TEXT NOT NULL DEFAULT 'Complimentary / Merit-Based',
    application_url TEXT NOT NULL DEFAULT '#contact',
    application_status TEXT NOT NULL DEFAULT 'Open',
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    certificate_available BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 16. TESTIMONIALS & CLIENT ENDORSEMENTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    organization TEXT NOT NULL,
    photo_url TEXT,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    is_featured BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 17. BLOG POSTS & INSIGHTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    author TEXT NOT NULL DEFAULT 'Veltora Editorial',
    cover_image TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Technology',
    tags JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT true,
    publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
    read_time TEXT NOT NULL DEFAULT '4 min read',
    seo_title TEXT,
    seo_description TEXT,
    og_image TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 18. ENQUIRIES & LEAD CRM
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_no TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT,
    company TEXT,
    service TEXT NOT NULL,
    project_type TEXT NOT NULL,
    budget_range TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New',
    priority TEXT DEFAULT 'Normal',
    assigned_to TEXT,
    follow_up_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 19. ENQUIRY NOTES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.enquiry_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enquiry_id UUID NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 20. NAVIGATION ITEMS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.navigation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 21. SOCIAL LINKS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.social_links (
    id TEXT PRIMARY KEY,
    platform TEXT NOT NULL,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0
);

-- ==============================================================================
-- 22. SEO SETTINGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.seo_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    global_title TEXT NOT NULL DEFAULT 'Veltora IT Solutions — Innovating Dreams',
    global_description TEXT NOT NULL DEFAULT 'Emerging student-founded technology company engineering digital products, bespoke web systems, cloud architectures, and modern digital experiences.',
    keywords TEXT NOT NULL DEFAULT 'Veltora IT Solutions, software development, web development, cloud automation, digital products, student tech company, technology internships',
    canonical_url TEXT,
    og_image TEXT,
    twitter_image TEXT,
    google_verification TEXT,
    robots TEXT NOT NULL DEFAULT 'index, follow',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 23. MEDIA VAULT & ASSETS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name TEXT NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    type TEXT NOT NULL DEFAULT 'image',
    alt_text TEXT,
    caption TEXT,
    category TEXT DEFAULT 'general',
    size TEXT,
    used_in JSONB DEFAULT '[]'::jsonb,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 24. FAQS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    is_featured BOOLEAN NOT NULL DEFAULT true,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 25. CAREERS (GOOGLE FORM EMBED)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.careers (
    id TEXT PRIMARY KEY DEFAULT 'default',
    title TEXT NOT NULL DEFAULT 'Join the Veltora Engineering Squad',
    subtitle TEXT NOT NULL DEFAULT 'Innovate with Ambition',
    description TEXT NOT NULL DEFAULT 'We are always looking for hungry student engineers and design craftsmen to build impactful digital solutions.',
    google_form_url TEXT NOT NULL DEFAULT 'https://docs.google.com/forms/d/e/1FAIpQLSc-sample/viewform',
    banner_url TEXT,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    perks JSONB DEFAULT '[]'::jsonb,
    open_roles JSONB DEFAULT '[]'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 26. CUSTOM CMS PAGES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.custom_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    seo_title TEXT,
    seo_description TEXT,
    og_image TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    show_in_nav BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 27. LEGAL POLICIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.legal_pages (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    last_updated TEXT NOT NULL,
    content TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    seo_title TEXT,
    seo_description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 28. SYSTEM SETTINGS (COOKIE, LOADING SCREEN, ERROR PAGES)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.cookie_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    banner_text TEXT NOT NULL DEFAULT 'We use cookies and equivalent telemetry to enhance your luxury browsing experience, analyze technical traffic, and serve tailored digital assets.',
    accept_text TEXT NOT NULL DEFAULT 'Accept All',
    reject_text TEXT NOT NULL DEFAULT 'Decline Non-Essential',
    preferences_text TEXT NOT NULL DEFAULT 'Cookie Preferences',
    necessary_description TEXT NOT NULL DEFAULT 'Required for fundamental website security, authentication, and core performance.',
    analytics_description TEXT NOT NULL DEFAULT 'Anonymized metrics to evaluate feature performance and navigation efficiency.',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.loading_screen_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    logo_variant TEXT NOT NULL DEFAULT 'primary',
    custom_logo_url TEXT,
    loading_text TEXT NOT NULL DEFAULT 'Initializing Veltora Experience...',
    duration_ms INTEGER NOT NULL DEFAULT 1200,
    animation_style TEXT NOT NULL DEFAULT 'pulse',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.error_page_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    heading_404 TEXT NOT NULL DEFAULT 'Page Not Located',
    description_404 TEXT NOT NULL DEFAULT 'The requested digital destination does not exist, has been migrated, or is temporarily restricted.',
    cta_text_404 TEXT NOT NULL DEFAULT 'Return to Safe Harbour',
    cta_url_404 TEXT NOT NULL DEFAULT '/',
    image_url_404 TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 29. ACTIVITY / AUDIT LOGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    user_email TEXT NOT NULL,
    details TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE & FAST RETRIEVAL
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services (slug);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services (display_order);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects (display_order);
CREATE INDEX IF NOT EXISTS idx_project_images_pid ON public.project_images (project_id, display_order);
CREATE INDEX IF NOT EXISTS idx_partners_slug ON public.partners (slug);
CREATE INDEX IF NOT EXISTS idx_partners_order ON public.partners (display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_albums_slug ON public.gallery_albums (slug);
CREATE INDEX IF NOT EXISTS idx_gallery_images_aid ON public.gallery_images (album_id, display_order);
CREATE INDEX IF NOT EXISTS idx_leadership_slug ON public.leadership (slug);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON public.team_members (display_order);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON public.programs (slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON public.testimonials (display_order);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_enquiries_ref ON public.enquiries (reference_no);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);
CREATE INDEX IF NOT EXISTS idx_custom_pages_slug ON public.custom_pages (slug);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON public.audit_logs (timestamp DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_appearance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.header_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotional_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cookie_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loading_screen_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.error_page_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Public Read Access Policies (Published & Active Content)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can read brand appearance" ON public.brand_appearance FOR SELECT USING (true);
CREATE POLICY "Public can read header settings" ON public.header_settings FOR SELECT USING (true);
CREATE POLICY "Public can read footer settings" ON public.footer_settings FOR SELECT USING (true);
CREATE POLICY "Public can read hero settings" ON public.hero_settings FOR SELECT USING (true);
CREATE POLICY "Public can read active homepage sections" ON public.homepage_sections FOR SELECT USING (true);
CREATE POLICY "Public can read active promotional campaigns" ON public.promotional_campaigns FOR SELECT USING (is_enabled = true);
CREATE POLICY "Public can read active leadership" ON public.leadership FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active team members" ON public.team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active partners" ON public.partners FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active projects" ON public.projects FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read project images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public can read active gallery albums" ON public.gallery_albums FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read gallery images" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Public can read active programs" ON public.programs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published blog posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read enabled navigation items" ON public.navigation_items FOR SELECT USING (is_enabled = true);
CREATE POLICY "Public can read enabled social links" ON public.social_links FOR SELECT USING (is_enabled = true);
CREATE POLICY "Public can read seo settings" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Public can read active faqs" ON public.faqs FOR SELECT USING (is_enabled = true);
CREATE POLICY "Public can read active careers" ON public.careers FOR SELECT USING (is_enabled = true);
CREATE POLICY "Public can read published custom pages" ON public.custom_pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published legal pages" ON public.legal_pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read cookie settings" ON public.cookie_settings FOR SELECT USING (true);
CREATE POLICY "Public can read loading screen settings" ON public.loading_screen_settings FOR SELECT USING (true);
CREATE POLICY "Public can read error page settings" ON public.error_page_settings FOR SELECT USING (true);

-- Public Enquiry Submission (Customer Leads)
CREATE POLICY "Public can submit enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- Authenticated Admin Access Policies (Full CRUD on all tables)
-- ------------------------------------------------------------------------------
CREATE POLICY "Admins full access site settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access brand appearance" ON public.brand_appearance FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access header settings" ON public.header_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access footer settings" ON public.footer_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access hero settings" ON public.hero_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access homepage sections" ON public.homepage_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access promotional campaigns" ON public.promotional_campaigns FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access leadership" ON public.leadership FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access team members" ON public.team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access partners" ON public.partners FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access project images" ON public.project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access gallery albums" ON public.gallery_albums FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access gallery images" ON public.gallery_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access programs" ON public.programs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access blog posts" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access enquiries" ON public.enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access enquiry notes" ON public.enquiry_notes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access navigation items" ON public.navigation_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access social links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access seo settings" ON public.seo_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access media" ON public.media FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access faqs" ON public.faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access careers" ON public.careers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access custom pages" ON public.custom_pages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access legal pages" ON public.legal_pages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access cookie settings" ON public.cookie_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access loading screen settings" ON public.loading_screen_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access error page settings" ON public.error_page_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access audit logs" ON public.audit_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
