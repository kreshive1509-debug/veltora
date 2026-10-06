import { supabase } from '../lib/supabase';
import { NavigationItem, SocialLink } from '../types';

export const navigationService = {
  async getNavigationItems(): Promise<NavigationItem[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('navigation_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching navigation_items from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((n: any) => ({
      id: n.id,
      label: n.label,
      url: n.url,
      isEnabled: n.is_enabled,
      displayOrder: n.display_order,
    }));
  },

  async updateNavigationItems(items: NavigationItem[]): Promise<void> {
    if (!supabase) return;
    for (const item of items) {
      const { error } = await supabase
        .from('navigation_items')
        .upsert({
          id: item.id.length > 10 ? item.id : undefined,
          label: item.label,
          url: item.url,
          is_enabled: item.isEnabled,
          display_order: item.displayOrder,
        });

      if (error) {
        console.error(`Error updating navigation item ${item.label}:`, error);
        throw error;
      }
    }
  },

  async getSocialLinks(): Promise<SocialLink[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching social_links from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((s: any) => ({
      id: s.id,
      platform: s.platform,
      label: s.label,
      url: s.url,
      isEnabled: s.is_enabled,
      displayOrder: s.display_order,
    }));
  },

  async updateSocialLink(id: string, link: Partial<SocialLink>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {};
    if (link.platform !== undefined) payload.platform = link.platform;
    if (link.label !== undefined) payload.label = link.label;
    if (link.url !== undefined) payload.url = link.url;
    if (link.isEnabled !== undefined) payload.is_enabled = link.isEnabled;
    if (link.displayOrder !== undefined) payload.display_order = link.displayOrder;

    const { error } = await supabase
      .from('social_links')
      .upsert({ id, ...payload });

    if (error) {
      console.error(`Error updating social link ${id}:`, error);
      throw error;
    }
  },
};
