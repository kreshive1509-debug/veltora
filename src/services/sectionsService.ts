import { supabase } from '../lib/supabase';
import { HomepageSection } from '../types';

export const sectionsService = {
  async getHomepageSections(): Promise<HomepageSection[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('homepage_sections')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching homepage_sections from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((item: any) => ({
      id: item.id,
      key: item.key,
      label: item.label,
      title: item.title,
      subtitle: item.subtitle || '',
      isEnabled: item.is_enabled,
      order: item.display_order,
    }));
  },

  async updateHomepageSections(sections: HomepageSection[]): Promise<void> {
    if (!supabase) return;
    for (const sec of sections) {
      const { error } = await supabase
        .from('homepage_sections')
        .upsert(
          {
            key: sec.key,
            label: sec.label,
            title: sec.title,
            subtitle: sec.subtitle,
            is_enabled: sec.isEnabled,
            display_order: sec.order,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'key' }
        );

      if (error) {
        console.error(`Error updating section ${sec.key}:`, error);
        throw error;
      }
    }
  },

  async toggleSection(key: string, isEnabled: boolean): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('homepage_sections')
      .update({ is_enabled: isEnabled, updated_at: new Date().toISOString() })
      .eq('key', key);

    if (error) {
      console.error(`Error toggling section ${key}:`, error);
      throw error;
    }
  },
};
