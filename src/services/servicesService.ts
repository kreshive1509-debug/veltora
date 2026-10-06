import { supabase } from '../lib/supabase';
import { Service } from '../types';

export const servicesService = {
  async getServices(): Promise<Service[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching services from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((s: any) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      shortDescription: s.short_description,
      fullDescription: s.full_description,
      icon: s.icon || 'Code2',
      imageUrl: s.image_url || undefined,
      category: s.category || 'Software Engineering',
      keyFeatures: s.key_features || [],
      deliverables: s.deliverables || [],
      ctaText: s.cta_text || undefined,
      ctaUrl: s.cta_url || undefined,
      isFeatured: s.is_featured,
      isActive: s.is_active,
      displayOrder: s.display_order,
    }));
  },

  async addService(service: Omit<Service, 'id'>): Promise<Service> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('services')
      .insert({
        name: service.name,
        slug: service.slug,
        short_description: service.shortDescription,
        full_description: service.fullDescription,
        icon: service.icon,
        image_url: service.imageUrl,
        category: service.category,
        key_features: service.keyFeatures,
        deliverables: service.deliverables,
        cta_text: service.ctaText,
        cta_url: service.ctaUrl,
        is_featured: service.isFeatured,
        is_active: service.isActive,
        display_order: service.displayOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding service to Supabase:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      shortDescription: data.short_description,
      fullDescription: data.full_description,
      icon: data.icon,
      imageUrl: data.image_url || undefined,
      category: data.category,
      keyFeatures: data.key_features || [],
      deliverables: data.deliverables || [],
      ctaText: data.cta_text || undefined,
      ctaUrl: data.cta_url || undefined,
      isFeatured: data.is_featured,
      isActive: data.is_active,
      displayOrder: data.display_order,
    };
  },

  async updateService(id: string, service: Partial<Service>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (service.name !== undefined) payload.name = service.name;
    if (service.slug !== undefined) payload.slug = service.slug;
    if (service.shortDescription !== undefined) payload.short_description = service.shortDescription;
    if (service.fullDescription !== undefined) payload.full_description = service.fullDescription;
    if (service.icon !== undefined) payload.icon = service.icon;
    if (service.imageUrl !== undefined) payload.image_url = service.imageUrl;
    if (service.category !== undefined) payload.category = service.category;
    if (service.keyFeatures !== undefined) payload.key_features = service.keyFeatures;
    if (service.deliverables !== undefined) payload.deliverables = service.deliverables;
    if (service.ctaText !== undefined) payload.cta_text = service.ctaText;
    if (service.ctaUrl !== undefined) payload.cta_url = service.ctaUrl;
    if (service.isFeatured !== undefined) payload.is_featured = service.isFeatured;
    if (service.isActive !== undefined) payload.is_active = service.isActive;
    if (service.displayOrder !== undefined) payload.display_order = service.displayOrder;

    const { error } = await supabase
      .from('services')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating service ${id}:`, error);
      throw error;
    }
  },

  async deleteService(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting service ${id}:`, error);
      throw error;
    }
  },
};
