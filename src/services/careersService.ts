import { supabase } from '../lib/supabase';
import { CareerSettings } from '../types';

export const careersService = {
  async getCareers(): Promise<CareerSettings | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('Error fetching careers from Supabase:', error);
      throw error;
    }
    if (!data) return null;

    return {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      googleFormUrl: data.google_form_url,
      bannerUrl: data.banner_url || undefined,
      isEnabled: data.is_enabled ?? true,
      displayOrder: data.display_order ?? 0,
      perks: data.perks || [],
      openRoles: data.open_roles || [],
    };
  },

  async updateCareers(careers: Partial<CareerSettings>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (careers.title !== undefined) payload.title = careers.title;
    if (careers.subtitle !== undefined) payload.subtitle = careers.subtitle;
    if (careers.description !== undefined) payload.description = careers.description;
    if (careers.googleFormUrl !== undefined) payload.google_form_url = careers.googleFormUrl;
    if (careers.bannerUrl !== undefined) payload.banner_url = careers.bannerUrl;
    if (careers.isEnabled !== undefined) payload.is_enabled = careers.isEnabled;
    if (careers.displayOrder !== undefined) payload.display_order = careers.displayOrder;
    if (careers.perks !== undefined) payload.perks = careers.perks;
    if (careers.openRoles !== undefined) payload.open_roles = careers.openRoles;

    const { error } = await supabase
      .from('careers')
      .upsert({ id: 'default', ...payload });

    if (error) {
      console.error('Error updating careers in Supabase:', error);
      throw error;
    }
  },
};
