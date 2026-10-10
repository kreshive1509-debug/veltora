INSERT INTO public.header_settings (
    id, is_sticky, style, show_cta, cta_text, cta_url
) VALUES (
    'default', true, 'glass', true, 'Start a Project', '#contact'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.footer_settings (
    id, description, copyright, developer_credit, developer_url,
    show_privacy, show_terms, show_cookie_policy
) VALUES (
    'default',
    'An emerging student-founded technology company focused on engineering digital products, software architectures, intelligent automations, and future-forward developer initiatives.',
    '© 2026 Veltora IT Solutions. All rights reserved.',
    'Developed by Veltora IT Solutions',
    'https://veltoraitsolutions.com',
    true, true, true
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.careers (
    id, title, subtitle, description, google_form_url, is_enabled
) VALUES (
    'default',
    'Join the Veltora Engineering Squad',
    'Innovate with Ambition',
    'We are always looking for hungry student engineers and design craftsmen to build impactful digital solutions.',
    'https://docs.google.com/forms/d/e/1FAIpQLSc-sample/viewform',
    false
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.cookie_settings (
    id, is_enabled, banner_text, accept_text, reject_text, preferences_text
) VALUES (
    'default',
    true,
    'We use cookies and equivalent telemetry to enhance your luxury browsing experience, analyze technical traffic, and serve tailored digital assets.',
    'Accept All',
    'Decline Non-Essential',
    'Cookie Preferences'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.error_page_settings (
    id, heading_404, description_404, cta_text_404, cta_url_404
) VALUES (
    'default',
    'Page Not Located',
    'The requested digital destination does not exist, has been migrated, or is temporarily restricted.',
    'Return to Safe Harbour',
    '/'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.seo_settings (
    id, global_title, global_description, keywords, robots
) VALUES (
    'default',
    'Veltora IT Solutions — Innovating Dreams',
    'Emerging student-founded technology company engineering digital products, bespoke web systems, cloud architectures, and modern digital experiences.',
    'Veltora IT Solutions, software development, web development, cloud automation, digital products, student tech company, technology internships',
    'index, follow'
)
ON CONFLICT (id) DO NOTHING;