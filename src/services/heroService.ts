import { supabase } from '../lib/supabase';
import { HeroSettings } from '../types';

export const heroService = {
  async getHeroSettings(): Promise<HeroSettings | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('hero_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('Error fetching hero_settings from Supabase:', error);
      throw error;
    }
    if (!data) return null;

    return {
      backgroundType: data.background_type || 'image',
      title: data.title,
      highlightedText: data.highlighted_text,
      subtitle: data.subtitle,
      primaryButtonText: data.primary_button_text,
      primaryButtonUrl: data.primary_button_url,
      secondaryButtonText: data.secondary_button_text,
      secondaryButtonUrl: data.secondary_button_url,
      imageUrl: data.image_url || '',
      youtubeUrl: data.youtube_url || '',
      fallbackImageUrl: data.fallback_image_url || '',
      mobileFallbackImageUrl: data.mobile_fallback_image_url || '',
      overlayOpacity: data.overlay_opacity ?? 45,
      badgeText: data.badge_text || '',
      active: data.active ?? true,
    };
  },

  async updateHeroSettings(settings: Partial<HeroSettings>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (settings.backgroundType !== undefined) payload.background_type = settings.backgroundType;
    if (settings.title !== undefined) payload.title = settings.title;
    if (settings.highlightedText !== undefined) payload.highlighted_text = settings.highlightedText;
    if (settings.subtitle !== undefined) payload.subtitle = settings.subtitle;
    if (settings.primaryButtonText !== undefined) payload.primary_button_text = settings.primaryButtonText;
    if (settings.primaryButtonUrl !== undefined) payload.primary_button_url = settings.primaryButtonUrl;
    if (settings.secondaryButtonText !== undefined) payload.secondary_button_text = settings.secondaryButtonText;
    if (settings.secondaryButtonUrl !== undefined) payload.secondary_button_url = settings.secondaryButtonUrl;
    if (settings.imageUrl !== undefined) payload.image_url = settings.imageUrl;
    if (settings.youtubeUrl !== undefined) payload.youtube_url = settings.youtubeUrl;
    if (settings.fallbackImageUrl !== undefined) payload.fallback_image_url = settings.fallbackImageUrl;
    if (settings.mobileFallbackImageUrl !== undefined) payload.mobile_fallback_image_url = settings.mobileFallbackImageUrl;
    if (settings.overlayOpacity !== undefined) payload.overlay_opacity = settings.overlayOpacity;
    if (settings.badgeText !== undefined) payload.badge_text = settings.badgeText;
    if (settings.active !== undefined) payload.active = settings.active;

    const { error } = await supabase
      .from('hero_settings')
      .upsert({ id: 'default', ...payload });

    if (error) {
      console.error('Error updating hero_settings in Supabase:', error);
      throw error;
    }
  },
};
