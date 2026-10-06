import { supabase } from '../lib/supabase';
import { CookieConsentSettings, LoadingScreenSettings, ErrorPageSettings } from '../types';

export const systemSettingsService = {
  // Cookie Settings
  async getCookieSettings(): Promise<CookieConsentSettings | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('cookie_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('Error fetching cookie_settings from Supabase:', error);
      throw error;
    }
    if (!data) return null;

    return {
      isEnabled: data.is_enabled ?? true,
      bannerText: data.banner_text,
      acceptText: data.accept_text,
      rejectText: data.reject_text,
      preferencesText: data.preferences_text,
      necessaryDescription: data.necessary_description,
      analyticsDescription: data.analytics_description,
    };
  },

  async updateCookieSettings(settings: Partial<CookieConsentSettings>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (settings.isEnabled !== undefined) payload.is_enabled = settings.isEnabled;
    if (settings.bannerText !== undefined) payload.banner_text = settings.bannerText;
    if (settings.acceptText !== undefined) payload.accept_text = settings.acceptText;
    if (settings.rejectText !== undefined) payload.reject_text = settings.rejectText;
    if (settings.preferencesText !== undefined) payload.preferences_text = settings.preferencesText;
    if (settings.necessaryDescription !== undefined) payload.necessary_description = settings.necessaryDescription;
    if (settings.analyticsDescription !== undefined) payload.analytics_description = settings.analyticsDescription;

    const { error } = await supabase
      .from('cookie_settings')
      .upsert({ id: 'default', ...payload });

    if (error) {
      console.error('Error updating cookie_settings in Supabase:', error);
      throw error;
    }
  },

  // Loading Screen Settings
  async getLoadingScreenSettings(): Promise<LoadingScreenSettings | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('loading_screen_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('Error fetching loading_screen_settings from Supabase:', error);
      throw error;
    }
    if (!data) return null;

    return {
      isEnabled: data.is_enabled ?? true,
      logoVariant: data.logo_variant || 'primary',
      customLogoUrl: data.custom_logo_url || undefined,
      loadingText: data.loading_text || 'Initializing Veltora Experience...',
      durationMs: data.duration_ms || 1200,
      animationStyle: data.animation_style || 'pulse',
    };
  },

  async updateLoadingScreenSettings(settings: Partial<LoadingScreenSettings>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (settings.isEnabled !== undefined) payload.is_enabled = settings.isEnabled;
    if (settings.logoVariant !== undefined) payload.logo_variant = settings.logoVariant;
    if (settings.customLogoUrl !== undefined) payload.custom_logo_url = settings.customLogoUrl;
    if (settings.loadingText !== undefined) payload.loading_text = settings.loadingText;
    if (settings.durationMs !== undefined) payload.duration_ms = settings.durationMs;
    if (settings.animationStyle !== undefined) payload.animation_style = settings.animationStyle;

    const { error } = await supabase
      .from('loading_screen_settings')
      .upsert({ id: 'default', ...payload });

    if (error) {
      console.error('Error updating loading_screen_settings in Supabase:', error);
      throw error;
    }
  },

  // Error Page Settings
  async getErrorPageSettings(): Promise<ErrorPageSettings | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('error_page_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('Error fetching error_page_settings from Supabase:', error);
      throw error;
    }
    if (!data) return null;

    return {
      heading404: data.heading_404 || 'Page Not Located',
      description404: data.description_404 || 'The requested destination does not exist.',
      ctaText404: data.cta_text_404 || 'Return to Safe Harbour',
      ctaUrl404: data.cta_url_404 || '/',
      imageUrl404: data.image_url_404 || undefined,
    };
  },

  async updateErrorPageSettings(settings: Partial<ErrorPageSettings>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (settings.heading404 !== undefined) payload.heading_404 = settings.heading404;
    if (settings.description404 !== undefined) payload.description_404 = settings.description404;
    if (settings.ctaText404 !== undefined) payload.cta_text_404 = settings.ctaText404;
    if (settings.ctaUrl404 !== undefined) payload.cta_url_404 = settings.ctaUrl404;
    if (settings.imageUrl404 !== undefined) payload.image_url_404 = settings.imageUrl404;

    const { error } = await supabase
      .from('error_page_settings')
      .upsert({ id: 'default', ...payload });

    if (error) {
      console.error('Error updating error_page_settings in Supabase:', error);
      throw error;
    }
  },
};
