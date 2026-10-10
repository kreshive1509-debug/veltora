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