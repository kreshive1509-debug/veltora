import { supabase } from '../lib/supabase';
import { SeoSettings } from '../types';

export const seoService = {
  async getSeoSettings(): Promise<SeoSettings | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('seo_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('Error fetching seo_settings from Supabase:', error);
      throw error;
    }
    if (!data) return null;

    return {
      globalTitle: data.global_title,
      globalDescription: data.global_description,
      keywords: data.keywords,
      canonicalUrl: data.canonical_url || undefined,
      ogImage: data.og_image || '',
      twitterImage: data.twitter_image || '',
      googleVerification: data.google_verification || undefined,
      robots: data.robots || 'index, follow',
    };
  },

  async updateSeoSettings(settings: Partial<SeoSettings>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (settings.globalTitle !== undefined) payload.global_title = settings.globalTitle;
    if (settings.globalDescription !== undefined) payload.global_description = settings.globalDescription;
    if (settings.keywords !== undefined) payload.keywords = settings.keywords;
    if (settings.canonicalUrl !== undefined) payload.canonical_url = settings.canonicalUrl;
    if (settings.ogImage !== undefined) payload.og_image = settings.ogImage;
    if (settings.twitterImage !== undefined) payload.twitter_image = settings.twitterImage;
    if (settings.googleVerification !== undefined) payload.google_verification = settings.googleVerification;
    if (settings.robots !== undefined) payload.robots = settings.robots;

    const { error } = await supabase
      .from('seo_settings')
      .upsert({ id: 'default', ...payload });

    if (error) {
      console.error('Error updating seo_settings in Supabase:', error);
      throw error;
    }
  },
};
