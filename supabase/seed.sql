-- ==============================================================================
-- VELTORA IT SOLUTIONS - DATABASE SEED SCRIPT (PostgreSQL / Supabase)
-- Idempotent insertions for initial setup
-- ==============================================================================

-- 1. Site Settings
INSERT INTO public.site_settings (
    id, company_name, short_name, tagline, brand_description, founded_year,
    primary_email, phone, whatsapp, address, business_hours, copyright, footer_description,
    developer_credit, navbar_logo_variant, navbar_logo_width, footer_logo_variant
) VALUES (
    'default',
    'Veltora IT Solutions',
    'Veltora',
    'Innovating Dreams',
    'Veltora is an emerging student-founded technology company focused on building digital products, software architectures, intelligent automations, and technology-driven training initiatives.',
    '2024',
    'veltoraitsolution2026@gmail.com',
    '+91 98765 43210',
    '919876543210',
    'Hub of Innovation, Tech Corridor, India',
    'Monday – Saturday: 9:00 AM – 7:00 PM IST',
    '© 2026 Veltora IT Solutions. All rights reserved.',
    'An emerging student-founded technology company focused on engineering digital products, software architectures, intelligent automations, and future-forward developer initiatives.',
    'Developed by Veltora IT Solutions',
    'primary',
    140,
    'primary'
) ON CONFLICT (id) DO NOTHING;

-- 2. Brand Appearance
INSERT INTO public.brand_appearance (
    id, preset, primary_color, secondary_color, accent_color, background_color,
    surface_color, text_color, muted_text_color, border_color, heading_font,
    body_font, heading_weight, heading_scale, body_scale, border_radius,
    card_style, button_style, shadow_intensity, container_width, section_spacing,
    animation_intensity, navbar_cta_text, navbar_cta_url, show_navbar_cta
) VALUES (
    'default',
    'veltora_signature',
    '#B58A3E',
    '#191C1E',
    '#C5A059',
    '#FAF8F5',
    '#FFFFFF',
    '#191C1E',
    '#5F6368',
    '#E6DECE',
    '''Syne'', sans-serif',
    '''Plus Jakarta Sans'', sans-serif',
    'bold',
    'balanced',
    'standard',
    'luxury',
    'glass',
    'rounded',
    'soft',
    'standard',
    'balanced',
    'balanced',
    'Start a Project',
    '#contact',
    true
) ON CONFLICT (id) DO NOTHING;

-- 3. Header & Footer Settings
INSERT INTO public.header_settings (id, is_sticky, style, show_cta, cta_text, cta_url)
VALUES ('default', true, 'glass', true, 'Start a Project', '#contact')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.footer_settings (id, description, copyright, developer_credit, developer_url, show_privacy, show_terms, show_cookie_policy)
VALUES ('default', 'An emerging student-founded technology company focused on engineering digital products, software architectures, intelligent automations, and future-forward developer initiatives.', '© 2026 Veltora IT Solutions. All rights reserved.', 'Developed by Veltora IT Solutions', 'https://veltoraitsolutions.com', true, true, true)
ON CONFLICT (id) DO NOTHING;

-- 4. Hero Settings
INSERT INTO public.hero_settings (
    id, background_type, title, highlighted_text, subtitle,
    primary_button_text, primary_button_url, secondary_button_text, secondary_button_url,
    overlay_opacity, badge_text, active
) VALUES (
    'default',
    'image',
    'Turning Ideas Into',
    'Digital Reality.',
    'We build cutting-edge digital products, high-performance software systems, intelligent workflow automations, and technology-driven experiences with relentless precision.',
    'Start a Project',
    '#contact',
    'Explore Our Work',
    '#projects',
    45,
    'Student-Founded Technology Enterprise',
    true
) ON CONFLICT (id) DO NOTHING;

-- 5. Homepage Sections
INSERT INTO public.homepage_sections (key, label, title, subtitle, is_enabled, display_order) VALUES
('hero', 'Hero Section', 'Hero', 'Primary value proposition', true, 1),
('trust', 'Trust & Impact', 'Impact Metrics', 'Quantified engineering milestones', true, 2),
('about', 'About Veltora', 'About Us', 'Our origins and vision', true, 3),
('leadership', 'Founder & Co-Founder', 'Leadership', 'Meet the people behind Veltora', true, 4),
('services', 'Services & Capabilities', 'Our Services', 'End-to-end technical excellence', true, 5),
('projects', 'Featured Projects (Our Work)', 'Our Work', 'Selected client case studies', true, 6),
('why_veltora', 'Why Veltora', 'The Veltora Edge', 'Why forward-thinking teams partner with us', true, 7),
('partners', 'Our Partners', 'Our Partners', 'Meaningful collaborations', true, 8),
('gallery', 'Inside Veltora (Gallery)', 'Inside Veltora', 'Company moments & milestones', true, 9),
('programs', 'Programs & Internships', 'Internships & Training', 'Empowering future tech creators', true, 10),
('team', 'Core Team', 'Engineering & Design Team', 'Minds behind the code', true, 11),
('testimonials', 'Client Testimonials', 'Testimonials', 'What leaders say about Veltora', true, 12),
('faq', 'Frequently Asked Questions', 'FAQ', 'Answers to common questions', true, 13),
('blog', 'Insights & Engineering', 'Insights', 'Perspectives on tech & innovation', true, 14),
('contact', 'Contact & Consultation', 'Get in Touch', 'Initiate your technical blueprint', true, 15)
ON CONFLICT (key) DO NOTHING;

-- 6. SEO Settings
INSERT INTO public.seo_settings (
    id, global_title, global_description, keywords, robots
) VALUES (
    'default',
    'Veltora IT Solutions — Innovating Dreams',
    'Emerging student-founded technology company engineering digital products, bespoke web systems, cloud architectures, and modern digital experiences.',
    'Veltora IT Solutions, software development, web development, cloud automation, digital products, student tech company, technology internships',
    'index, follow'
) ON CONFLICT (id) DO NOTHING;

-- 7. System Settings
INSERT INTO public.cookie_settings (id, is_enabled, banner_text, accept_text, reject_text, preferences_text)
VALUES ('default', true, 'We use cookies and equivalent telemetry to enhance your luxury browsing experience, analyze technical traffic, and serve tailored digital assets.', 'Accept All', 'Decline Non-Essential', 'Cookie Preferences')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.loading_screen_settings (id, is_enabled, logo_variant, loading_text, duration_ms, animation_style)
VALUES ('default', true, 'primary', 'Initializing Veltora Experience...', 1200, 'pulse')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.error_page_settings (id, heading_404, description_404, cta_text_404, cta_url_404)
VALUES ('default', 'Page Not Located', 'The requested digital destination does not exist, has been migrated, or is temporarily restricted.', 'Return to Safe Harbour', '/')
ON CONFLICT (id) DO NOTHING;

-- 8. Careers
INSERT INTO public.careers (id, title, subtitle, description, google_form_url, is_enabled)
VALUES ('default', 'Join the Veltora Engineering Squad', 'Innovate with Ambition', 'We are always looking for hungry student engineers and design craftsmen to build impactful digital solutions.', '', false)
ON CONFLICT (id) DO NOTHING;
