# VELTORA IT SOLUTIONS — ARCHITECTURE & DATABASE SCHEMA AUDIT

**Version:** 2.0.0 (Production)  
**Date:** October 2026  
**Auditor:** Senior Software Engineer (AI Studio)  
**Architecture Policy:** Zero JSON Fallback • Direct PostgreSQL / Supabase Persistence • Single Source of Truth

---

## 1. Feature & Module Matrix

| Feature | Public Route | Detail Route | Admin Route | Primary Frontend Component | Database Table | Service Module | RLS Status | Admin Controls | Audit Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Site Profile & Contacts** | `/` | — | `/admin/branding`, `/admin/contact` | `Navbar.tsx`, `Footer.tsx`, `ContactSection.tsx` | `public.site_settings` | `siteSettingsService.ts` | **PASS** (Public Read, Admin Full) | Full Identity, Phone, Email, Map, Address | **PASS** |
| **Brand Theme & Logos** | `/` | — | `/admin/branding` | `AdminBrandAppearance.tsx`, `Navbar.tsx`, `Footer.tsx` | `public.brand_appearance`, `public.site_settings` | `siteSettingsService.ts` | **PASS** (Public Read, Admin Full) | 9 Logo Variants, 5 Theme Presets, Fonts, Radius | **PASS** |
| **Hero Section** | `/` | — | `/admin/homepage` | `Hero.tsx` | `public.hero_settings` | `heroService.ts` | **PASS** (Public Read, Admin Full) | Background (Image/YouTube), Badges, Dual CTA | **PASS** |
| **Homepage Layout** | `/` | — | `/admin/homepage` | `App.tsx` (Dynamic Switch) | `public.homepage_sections` | `sectionsService.ts` | **PASS** (Public Read, Admin Full) | Drag-and-drop order, Toggle on/off | **PASS** |
| **Services** | `/services` | `/services/:slug` | `/admin/services` | `ServicesSection.tsx` | `public.services` | `servicesService.ts` | **PASS** (Active Read, Admin Full) | Full CRUD, Icon, Deliverables, Tech, CTA | **PASS** |
| **Projects & Case Studies**| `/projects` | `/projects/:slug` | `/admin/projects` | `ProjectsSection.tsx`, `ProjectsCatalog.tsx` | `public.projects`, `public.project_images` | `projectsService.ts` | **PASS** (Active Read, Admin Full) | Multi-image gallery, Metrics, Tech, Live URL | **PASS** |
| **Partners & Alliances** | `/partners` | `/partners/:slug` | `/admin/partners` | `PartnersSection.tsx`, `PartnersCatalog.tsx` | `public.partners` | `partnersService.ts` | **PASS** (Active Read, Admin Full) | Tiers, Dates, Locations, Detail Pages | **PASS** |
| **Inside Veltora Gallery** | `/gallery` | `/gallery/:slug` | `/admin/gallery` | `GallerySection.tsx`, `GalleryCatalog.tsx` | `public.gallery_albums`, `public.gallery_images`| `galleryService.ts` | **PASS** (Active Read, Admin Full) | Albums, Photos, Events, Fullscreen Lightbox | **PASS** |
| **Leadership** | `/leadership` | — | `/admin/leadership` | `LeadershipSpotlight.tsx`, `LeadershipCatalog.tsx` | `public.leadership` | `leadershipService.ts` | **PASS** (Active Read, Admin Full) | Founder & Co-Founder, Biographies, Socials | **PASS** |
| **Team Members** | `/team` | — | `/admin/team` | `TeamSection.tsx`, `TeamCatalog.tsx` | `public.team_members` | `teamService.ts` | **PASS** (Active Read, Admin Full) | Departmental roles, Biographies, Contacts | **PASS** |
| **Programs & Internships** | `/` (or `/programs`) | — | `/admin/programs` | `ProgramsSection.tsx` | `public.programs` | `programsService.ts` | **PASS** (Active Read, Admin Full) | Duration, Eligibility, Benefits, Status | **PASS** |
| **Client Testimonials** | `/testimonials` | — | `/admin/testimonials` | `TestimonialsSection.tsx`, `TestimonialsCatalog.tsx` | `public.testimonials` | `testimonialsService.ts` | **PASS** (Active Read, Admin Full) | Client info, 5-Star ratings, Featured toggle | **PASS** |
| **Blog & Insights** | `/` (or `/blog`) | `/blog/:slug` | `/admin/blog` | `BlogSection.tsx` | `public.blog_posts` | `blogService.ts` | **PASS** (Published Read, Admin Full) | Rich markdown, SEO meta, tags, author | **PASS** |
| **Enquiries & CRM** | `/contact`, `#contact` | — | `/admin/enquiries` | `ContactSection.tsx`, `ContactPage.tsx`, `AdminEnquiries.tsx` | `public.enquiries`, `public.enquiry_notes` | `enquiriesService.ts` | **PASS** (Public Insert, Admin Full) | Unique `ENQ-YYYY-XXXXXX`, Notes, Statuses | **PASS** |
| **Careers Module** | `/careers` | — | `/admin/careers` | `CareersPage.tsx`, `AdminCareers.tsx` | `public.careers` | `careersService.ts` | **PASS** (Active Read, Admin Full) | Google Form link, Banner, Perks, Open roles | **PASS** |
| **FAQs** | `/faq` | — | `/admin/faqs` | `FaqPage.tsx`, `AdminFaqs.tsx` | `public.faqs` | `faqsService.ts` | **PASS** (Active Read, Admin Full) | Categorized Q&As, Featured status | **PASS** |
| **Announcements** | Modal/Banner | — | `/admin/announcements` | `CampaignBannerAndModal.tsx` | `public.promotional_campaigns` | `campaignsService.ts` | **PASS** (Active Read, Admin Full) | Priority, Time windows, Banner/Popup modes | **PASS** |
| **Navigation & Links** | Navbar & Footer | — | `/admin/navigation` | `Navbar.tsx`, `Footer.tsx` | `public.navigation_items`, `public.social_links` | `navigationService.ts` | **PASS** (Active Read, Admin Full) | Navbar items, Social platforms, Footer links | **PASS** |
| **SEO Settings** | Global Meta | — | `/admin/seo` | `index.html`, Dynamic Head | `public.seo_settings` | `seoService.ts` | **PASS** (Public Read, Admin Full) | Canonical URL, OG/Twitter tags, Robots | **PASS** |
| **Custom CMS Pages** | `/:slug` | — | `/admin/pages` | `CustomPageView.tsx` | `public.custom_pages` | `pagesService.ts` | **PASS** (Published Read, Admin Full) | Dynamic slug routing, Navigation inclusion | **PASS** |
| **Legal Pages** | `/privacy-policy`, etc. | — | `/admin/legal` | `LegalPages.tsx` | `public.legal_pages` | `pagesService.ts` | **PASS** (Published Read, Admin Full) | Privacy, Terms, Cookie policies | **PASS** |
| **System Settings** | Loading, Cookie, 404 | — | `/admin/loading-screen`, `/admin/error-pages` | `LoadingScreen.tsx`, `NotFound.tsx`, `CookieConsentBanner.tsx` | `public.cookie_settings`, `public.loading_screen_settings`, `public.error_page_settings` | `systemSettingsService.ts` | **PASS** (Public Read, Admin Full) | Splash screen duration, Custom 404, Cookies | **PASS** |
| **Media Library** | — | — | `/admin/media` | `AdminMedia.tsx` | `public.media` | `mediaService.ts` | **PASS** (Admin Full) | ImgBB CDN hosting, Copy URL, Metadata | **PASS** |
| **Audit Logs** | — | — | `/admin/activity` | `AdminAuditLogs.tsx` | `public.audit_logs` | `auditLogsService.ts` | **PASS** (Admin Full) | System operations, Timestamp, User email | **PASS** |

---

## 2. Database Schema & Relations Matrix

| Table | Purpose | Primary Key | Foreign Keys / Relations | Public SELECT | Admin Access | Indexing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `site_settings` | Core company identity and logo variants | `id` (default: `'default'`) | None | `USING (true)` | Full CRUD | PK |
| `brand_appearance` | Theme colors, typography, and visual rules | `id` (default: `'default'`) | None | `USING (true)` | Full CRUD | PK |
| `header_settings` | Sticky nav state, layout style, CTA button | `id` (default: `'default'`) | None | `USING (true)` | Full CRUD | PK |
| `footer_settings` | Copyright, legal toggles, credits | `id` (default: `'default'`) | None | `USING (true)` | Full CRUD | PK |
| `hero_settings` | Hero section headline, CTA, and background video/image | `id` (default: `'default'`) | None | `USING (true)` | Full CRUD | PK |
| `homepage_sections`| Homepage section arrangement and display order | `id` (UUID) | `key` (UNIQUE) | `USING (true)` | Full CRUD | `display_order` |
| `promotional_campaigns`| Time-bound promotional popups and banners | `id` (UUID) | None | `USING (is_enabled = true)` | Full CRUD | `priority` |
| `leadership` | Founder and Co-Founder profiles | `id` (UUID) | `slug` (UNIQUE) | `USING (is_active = true)` | Full CRUD | `slug`, `display_order` |
| `team_members` | Core technical and product team | `id` (UUID) | None | `USING (is_active = true)` | Full CRUD | `display_order` |
| `services` | Software engineering capabilities | `id` (UUID) | `slug` (UNIQUE) | `USING (is_active = true)` | Full CRUD | `slug`, `display_order` |
| `partners` | Strategic and technology partners | `id` (UUID) | `slug` (UNIQUE) | `USING (is_active = true)` | Full CRUD | `slug`, `display_order` |
| `projects` | Portfolio deployments and case studies | `id` (UUID) | `partner_id` → `partners(id)` | `USING (is_active = true)` | Full CRUD | `slug`, `display_order` |
| `project_images` | Multi-image galleries for projects | `id` (UUID) | `project_id` → `projects(id)` | `USING (true)` | Full CRUD | `(project_id, display_order)` |
| `gallery_albums` | Corporate moments, hackathons, retreats | `id` (UUID) | `slug` (UNIQUE) | `USING (is_active = true)` | Full CRUD | `slug`, `display_order` |
| `gallery_images` | High-res photos per gallery album | `id` (UUID) | `album_id` → `gallery_albums(id)`| `USING (true)` | Full CRUD | `(album_id, display_order)` |
| `programs` | Internships and student fellowships | `id` (UUID) | `slug` (UNIQUE) | `USING (is_active = true)` | Full CRUD | `slug`, `display_order` |
| `testimonials` | Client and institutional feedback | `id` (UUID) | None | `USING (is_active = true)` | Full CRUD | `display_order` |
| `blog_posts` | Articles, insights, and release notes | `id` (UUID) | `slug` (UNIQUE) | `USING (is_published = true)` | Full CRUD | `slug`, `publish_date` |
| `enquiries` | Incoming customer leads | `id` (UUID) | `reference_no` (UNIQUE) | `INSERT WITH CHECK (true)` | Full CRUD | `reference_no`, `status` |
| `enquiry_notes` | Internal CRM discussion notes on leads | `id` (UUID) | `enquiry_id` → `enquiries(id)` | None (Admin only) | Full CRUD | `enquiry_id` |
| `navigation_items`| Header navigation items | `id` (UUID) | None | `USING (is_enabled = true)` | Full CRUD | `display_order` |
| `social_links` | Social media URLs | `id` (TEXT) | None | `USING (is_enabled = true)` | Full CRUD | PK |
| `seo_settings` | Global SEO metadata | `id` (default: `'default'`) | None | `USING (true)` | Full CRUD | PK |
| `media` | Uploaded images and CDN assets | `id` (UUID) | None | None (Admin only) | Full CRUD | `uploaded_at` |
| `faqs` | Knowledge base and client FAQs | `id` (UUID) | None | `USING (is_enabled = true)` | Full CRUD | `display_order` |
| `careers` | Google Form application configuration | `id` (default: `'default'`) | None | `USING (is_enabled = true)` | Full CRUD | PK |
| `custom_pages` | Dynamic CMS pages | `id` (UUID) | `slug` (UNIQUE) | `USING (is_published = true)` | Full CRUD | `slug` |
| `legal_pages` | Privacy Policy, Terms, Cookie Policy | `slug` (TEXT) | None | `USING (is_published = true)` | Full CRUD | PK |
| `cookie_settings` | Cookie consent banner text and toggles | `id` (default: `'default'`) | None | `USING (true)` | Full CRUD | PK |
| `loading_screen_settings`| Splash screen duration and animations | `id` (default: `'default'`) | None | `USING (true)` | Full CRUD | PK |
| `error_page_settings`| 404 destination and recovery CTA | `id` (default: `'default'`) | None | `USING (true)` | Full CRUD | PK |
| `audit_logs` | Admin activity and modification history | `id` (UUID) | None | None (Admin only) | Full CRUD | `timestamp` |

---

## 3. Storage & Fallback Audit

### Policy Verification:
1. **No Silent Fallbacks to JSON**: When Supabase returns zero records (`[]`), the application retains `[]` and displays the proper empty state ("No items found", "No projects published yet").
2. **No LocalStorage Persistence for CMS Data**: All CMS entities (`projects`, `services`, `settings`, `team`, `partners`, `enquiries`) are persisted exclusively in Supabase via the Service Layer. LocalStorage is solely reserved for client-side user UI preference flags (such as cookie consent dismissal).
3. **No Mock API / Fake Adapters**: All queries go directly through `@supabase/supabase-js` client connected to PostgreSQL.
4. **Guaranteed Unique Enquiry Reference Generation**: Enquiries are generated using the standard format `ENQ-YYYY-XXXXXX` and validated with database uniqueness constraints.

---

## 4. Route Status Audit

* `/` — Dynamic ordered sections (Hero, Trust, About, Leadership, Services, Projects, Partners, Gallery, Programs, Team, Testimonials, FAQ, Blog, Contact)
* `/services` & `/services/:slug` — Services Directory & Deep-Dive
* `/projects` & `/projects/:slug` — Projects Catalog & Full Case Studies
* `/partners` & `/partners/:slug` — Partners Directory & Collaboration Overviews
* `/gallery` & `/gallery/:slug` — Gallery Albums & Lightbox Photo Showcase
* `/leadership` — Leadership Spotlight & Executive Profiles
* `/team` — Team Catalog
* `/testimonials` — Testimonials Directory
* `/careers` — Google Forms Application Hub
* `/faq` — FAQ Knowledge Base
* `/contact` — Contact & Consultation Page
* `/privacy-policy` — Legal Policy View
* `/terms-and-conditions` — Legal Policy View
* `/cookie-policy` — Legal Policy View
* `/:slug` — Custom CMS Pages
* `/admin` & `/admin/*` — Complete Admin Management Hub
