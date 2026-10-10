import { supabase } from '../lib/supabase';
import { CareerSettings } from '../types';

export const isValidCareersFormUrl = (value: string | null | undefined): boolean => {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      url.hostname === 'docs.google.com' &&
      /^\/forms\/(?:u\/\d+\/)?d\/(?:e\/)?[^/]+\/viewform\/?$/.test(url.pathname) &&
      !/(?:sample|placeholder|Veltora-Career-Application-Form)/i.test(url.pathname);
  } catch {
    return false;
  }
};

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

    const formUrl = isValidCareersFormUrl(data.google_form_url) ? data.google_form_url : '';

    return {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      googleFormUrl: formUrl,
      bannerUrl: data.banner_url || undefined,
      isEnabled: Boolean(data.is_enabled) && Boolean(formUrl),
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
    if (careers.isEnabled !== undefined || careers.googleFormUrl !== undefined) {
      payload.is_enabled = careers.isEnabled === true && isValidCareersFormUrl(careers.googleFormUrl);
    }
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
