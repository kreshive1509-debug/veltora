import { supabase } from '../lib/supabase';
import { SiteSettings, BrandAppearanceSettings, HeaderSettings, FooterSettings } from '../types';

export const siteSettingsService = {
  async getSiteSettings(): Promise<SiteSettings | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('Error fetching site_settings from Supabase:', error);
      throw error;
    }
    if (!data) return null;

    return {
      companyName: data.company_name,
      shortName: data.short_name,
      tagline: data.tagline,
      brandDescription: data.brand_description,
      foundedYear: data.founded_year,
      primaryEmail: data.primary_email,
      phone: data.phone,
      whatsapp: data.whatsapp,
      address: data.address,
      businessHours: data.business_hours,
      copyright: data.copyright,
      footerDescription: data.footer_description,
      developerCredit: data.developer_credit,
      developerUrl: data.developer_url || undefined,
      mapEmbedUrl: data.map_embed_url || undefined,
      primaryLogoUrl: data.primary_logo_url || undefined,
      lightLogoUrl: data.light_logo_url || undefined,
      darkLogoUrl: data.dark_logo_url || undefined,
      navbarLogoUrl: data.navbar_logo_url || undefined,
      navbarLogoVariant: data.navbar_logo_variant || 'primary',
      navbarLogoWidth: data.navbar_logo_width || 140,
      footerLogoUrl: data.footer_logo_url || undefined,
      footerLogoVariant: data.footer_logo_variant || 'primary',
      mobileLogoUrl: data.mobile_logo_url || undefined,
      adminLogoUrl: data.admin_logo_url || undefined,
      loginLogoUrl: data.login_logo_url || undefined,
      loadingLogoUrl: data.loading_logo_url || undefined,
      emailLogoUrl: data.email_logo_url || undefined,
      faviconUrl: data.favicon_url || undefined,
      appleTouchIconUrl: data.apple_touch_icon_url || undefined,
      browserIconUrl: data.browser_icon_url || undefined,
      pwaIconUrl: data.pwa_icon_url || undefined,
      ogDefaultImageUrl: data.og_default_image_url || undefined,
    };
  },

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
    if (!supabase) return;
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (settings.companyName !== undefined) updatePayload.company_name = settings.companyName;
    if (settings.shortName !== undefined) updatePayload.short_name = settings.shortName;
    if (settings.tagline !== undefined) updatePayload.tagline = settings.tagline;
    if (settings.brandDescription !== undefined) updatePayload.brand_description = settings.brandDescription;
    if (settings.foundedYear !== undefined) updatePayload.founded_year = settings.foundedYear;
    if (settings.primaryEmail !== undefined) updatePayload.primary_email = settings.primaryEmail;
    if (settings.phone !== undefined) updatePayload.phone = settings.phone;
    if (settings.whatsapp !== undefined) updatePayload.whatsapp = settings.whatsapp;
    if (settings.address !== undefined) updatePayload.address = settings.address;
    if (settings.businessHours !== undefined) updatePayload.business_hours = settings.businessHours;
    if (settings.copyright !== undefined) updatePayload.copyright = settings.copyright;
    if (settings.footerDescription !== undefined) updatePayload.footer_description = settings.footerDescription;
    if (settings.developerCredit !== undefined) updatePayload.developer_credit = settings.developerCredit;
    if (settings.developerUrl !== undefined) updatePayload.developer_url = settings.developerUrl;
    if (settings.mapEmbedUrl !== undefined) updatePayload.map_embed_url = settings.mapEmbedUrl;
    if (settings.primaryLogoUrl !== undefined) updatePayload.primary_logo_url = settings.primaryLogoUrl;
    if (settings.lightLogoUrl !== undefined) updatePayload.light_logo_url = settings.lightLogoUrl;
    if (settings.darkLogoUrl !== undefined) updatePayload.dark_logo_url = settings.darkLogoUrl;
    if (settings.navbarLogoUrl !== undefined) updatePayload.navbar_logo_url = settings.navbarLogoUrl;
    if (settings.navbarLogoVariant !== undefined) updatePayload.navbar_logo_variant = settings.navbarLogoVariant;
    if (settings.navbarLogoWidth !== undefined) updatePayload.navbar_logo_width = settings.navbarLogoWidth;
    if (settings.footerLogoUrl !== undefined) updatePayload.footer_logo_url = settings.footerLogoUrl;
    if (settings.footerLogoVariant !== undefined) updatePayload.footer_logo_variant = settings.footerLogoVariant;
    if (settings.mobileLogoUrl !== undefined) updatePayload.mobile_logo_url = settings.mobileLogoUrl;
    if (settings.adminLogoUrl !== undefined) updatePayload.admin_logo_url = settings.adminLogoUrl;
    if (settings.loginLogoUrl !== undefined) updatePayload.login_logo_url = settings.loginLogoUrl;
    if (settings.loadingLogoUrl !== undefined) updatePayload.loading_logo_url = settings.loadingLogoUrl;
    if (settings.emailLogoUrl !== undefined) updatePayload.email_logo_url = settings.emailLogoUrl;
    if (settings.faviconUrl !== undefined) updatePayload.favicon_url = settings.faviconUrl;
    if (settings.appleTouchIconUrl !== undefined) updatePayload.apple_touch_icon_url = settings.appleTouchIconUrl;
    if (settings.browserIconUrl !== undefined) updatePayload.browser_icon_url = settings.browserIconUrl;
    if (settings.pwaIconUrl !== undefined) updatePayload.pwa_icon_url = settings.pwaIconUrl;
    if (settings.ogDefaultImageUrl !== undefined) updatePayload.og_default_image_url = settings.ogDefaultImageUrl;

    const { error } = await supabase
      .from('site_settings')
      .upsert({ id: 'default', ...updatePayload });

    if (error) {
      console.error('Error updating site_settings in Supabase:', error);
      throw error;
    }
  },

  async getBrandAppearance(): Promise<BrandAppearanceSettings | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('brand_appearance')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('Error fetching brand_appearance from Supabase:', error);
      throw error;
    }
    if (!data) return null;

    return {
      preset: data.preset || 'veltora_signature',
      colors: {
        primaryColor: data.primary_color,
        secondaryColor: data.secondary_color,
        accentColor: data.accent_color,
        backgroundColor: data.background_color,
        surfaceColor: data.surface_color,
        textColor: data.text_color,
        mutedTextColor: data.muted_text_color,
        borderColor: data.border_color,
      },
      typography: {
        headingFont: data.heading_font,
        bodyFont: data.body_font,
        headingWeight: data.heading_weight || 'bold',
        headingScale: data.heading_scale || 'balanced',
        bodyScale: data.body_scale || 'standard',
      },
      visuals: {
        borderRadius: data.border_radius || 'luxury',
        cardStyle: data.card_style || 'glass',
        buttonStyle: data.button_style || 'rounded',
        shadowIntensity: data.shadow_intensity || 'soft',
        containerWidth: data.container_width || 'standard',
        sectionSpacing: data.section_spacing || 'balanced',
        animationIntensity: data.animation_intensity || 'balanced',
      },
      navbarCtaText: data.navbar_cta_text || 'Start a Project',
      navbarCtaUrl: data.navbar_cta_url || '#contact',
      showNavbarCta: data.show_navbar_cta ?? true,
    };
  },

  async updateBrandAppearance(brand: Partial<BrandAppearanceSettings>): Promise<void> {
    if (!supabase) return;
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (brand.preset) updatePayload.preset = brand.preset;
    if (brand.colors) {
      if (brand.colors.primaryColor) updatePayload.primary_color = brand.colors.primaryColor;
      if (brand.colors.secondaryColor) updatePayload.secondary_color = brand.colors.secondaryColor;
      if (brand.colors.accentColor) updatePayload.accent_color = brand.colors.accentColor;
      if (brand.colors.backgroundColor) updatePayload.background_color = brand.colors.backgroundColor;
      if (brand.colors.surfaceColor) updatePayload.surface_color = brand.colors.surfaceColor;
      if (brand.colors.textColor) updatePayload.text_color = brand.colors.textColor;
      if (brand.colors.mutedTextColor) updatePayload.muted_text_color = brand.colors.mutedTextColor;
      if (brand.colors.borderColor) updatePayload.border_color = brand.colors.borderColor;
    }
    if (brand.typography) {
      if (brand.typography.headingFont) updatePayload.heading_font = brand.typography.headingFont;
      if (brand.typography.bodyFont) updatePayload.body_font = brand.typography.bodyFont;
      if (brand.typography.headingWeight) updatePayload.heading_weight = brand.typography.headingWeight;
      if (brand.typography.headingScale) updatePayload.heading_scale = brand.typography.headingScale;
      if (brand.typography.bodyScale) updatePayload.body_scale = brand.typography.bodyScale;
    }
    if (brand.visuals) {
      if (brand.visuals.borderRadius) updatePayload.border_radius = brand.visuals.borderRadius;
      if (brand.visuals.cardStyle) updatePayload.card_style = brand.visuals.cardStyle;
      if (brand.visuals.buttonStyle) updatePayload.button_style = brand.visuals.buttonStyle;
      if (brand.visuals.shadowIntensity) updatePayload.shadow_intensity = brand.visuals.shadowIntensity;
      if (brand.visuals.containerWidth) updatePayload.container_width = brand.visuals.containerWidth;
      if (brand.visuals.sectionSpacing) updatePayload.section_spacing = brand.visuals.sectionSpacing;
      if (brand.visuals.animationIntensity) updatePayload.animation_intensity = brand.visuals.animationIntensity;
    }
    if (brand.navbarCtaText !== undefined) updatePayload.navbar_cta_text = brand.navbarCtaText;
    if (brand.navbarCtaUrl !== undefined) updatePayload.navbar_cta_url = brand.navbarCtaUrl;
    if (brand.showNavbarCta !== undefined) updatePayload.show_navbar_cta = brand.showNavbarCta;

    const { error } = await supabase
      .from('brand_appearance')
      .upsert({ id: 'default', ...updatePayload });

    if (error) {
      console.error('Error updating brand_appearance in Supabase:', error);
      throw error;
    }
  },

  async getHeaderSettings(): Promise<HeaderSettings | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('header_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('Error fetching header_settings from Supabase:', error);
      throw error;
    }
    if (!data) return null;

    return {
      isSticky: data.is_sticky ?? true,
      style: data.style || 'glass',
      showCta: data.show_cta ?? true,
      ctaText: data.cta_text || 'Start a Project',
      ctaUrl: data.cta_url || '#contact',
    };
  },

  async updateHeaderSettings(settings: Partial<HeaderSettings>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (settings.isSticky !== undefined) payload.is_sticky = settings.isSticky;
    if (settings.style !== undefined) payload.style = settings.style;
    if (settings.showCta !== undefined) payload.show_cta = settings.showCta;
    if (settings.ctaText !== undefined) payload.cta_text = settings.ctaText;
    if (settings.ctaUrl !== undefined) payload.cta_url = settings.ctaUrl;

    const { error } = await supabase
      .from('header_settings')
      .upsert({ id: 'default', ...payload });

    if (error) {
      console.error('Error updating header_settings in Supabase:', error);
      throw error;
    }
  },

  async getFooterSettings(): Promise<FooterSettings | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('footer_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('Error fetching footer_settings from Supabase:', error);
      throw error;
    }
    if (!data) return null;

    return {
      description: data.description,
      copyright: data.copyright,
      developerCredit: data.developer_credit,
      developerUrl: data.developer_url || 'https://veltoraitsolutions.com',
      showPrivacy: data.show_privacy ?? true,
      showTerms: data.show_terms ?? true,
      showCookiePolicy: data.show_cookie_policy ?? true,
    };
  },

  async updateFooterSettings(settings: Partial<FooterSettings>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (settings.description !== undefined) payload.description = settings.description;
    if (settings.copyright !== undefined) payload.copyright = settings.copyright;
    if (settings.developerCredit !== undefined) payload.developer_credit = settings.developerCredit;
    if (settings.developerUrl !== undefined) payload.developer_url = settings.developerUrl;
    if (settings.showPrivacy !== undefined) payload.show_privacy = settings.showPrivacy;
    if (settings.showTerms !== undefined) payload.show_terms = settings.showTerms;
    if (settings.showCookiePolicy !== undefined) payload.show_cookie_policy = settings.showCookiePolicy;

    const { error } = await supabase
      .from('footer_settings')
      .upsert({ id: 'default', ...payload });

    if (error) {
      console.error('Error updating footer_settings in Supabase:', error);
      throw error;
    }
  },
};
