import { supabase } from '../lib/supabase';
import { Partner } from '../types';

export const partnersService = {
  async getPartners(): Promise<Partner[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching partners from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      logoUrl: p.logo_url,
      coverImageUrl: p.cover_image_url || undefined,
      shortDescription: p.short_description,
      description: p.description,
      partnershipType: p.partnership_type || 'Strategic Partner',
      partnershipDate: p.partnership_date || undefined,
      location: p.location || undefined,
      websiteUrl: p.website_url || undefined,
      linkedinUrl: p.linkedin_url || undefined,
      instagramUrl: p.instagram_url || undefined,
      highlights: p.highlights || [],
      isFeatured: p.is_featured,
      isActive: p.is_active,
      hasDetailPage: p.has_detail_page ?? true,
      displayOrder: p.display_order,
    }));
  },

  async addPartner(partner: Omit<Partner, 'id'>): Promise<Partner> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('partners')
      .insert({
        name: partner.name,
        slug: partner.slug,
        logo_url: partner.logoUrl,
        cover_image_url: partner.coverImageUrl,
        short_description: partner.shortDescription,
        description: partner.description,
        partnership_type: partner.partnershipType,
        partnership_date: partner.partnershipDate,
        location: partner.location,
        website_url: partner.websiteUrl,
        linkedin_url: partner.linkedinUrl,
        instagram_url: partner.instagramUrl,
        highlights: partner.highlights,
        is_featured: partner.isFeatured,
        is_active: partner.isActive,
        has_detail_page: partner.hasDetailPage ?? true,
        display_order: partner.displayOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding partner to Supabase:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      logoUrl: data.logo_url,
      coverImageUrl: data.cover_image_url || undefined,
      shortDescription: data.short_description,
      description: data.description,
      partnershipType: data.partnership_type,
      partnershipDate: data.partnership_date || undefined,
      location: data.location || undefined,
      websiteUrl: data.website_url || undefined,
      linkedinUrl: data.linkedin_url || undefined,
      instagramUrl: data.instagram_url || undefined,
      highlights: data.highlights || [],
      isFeatured: data.is_featured,
      isActive: data.is_active,
      hasDetailPage: data.has_detail_page ?? true,
      displayOrder: data.display_order,
    };
  },

  async updatePartner(id: string, partner: Partial<Partner>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (partner.name !== undefined) payload.name = partner.name;
    if (partner.slug !== undefined) payload.slug = partner.slug;
    if (partner.logoUrl !== undefined) payload.logo_url = partner.logoUrl;
    if (partner.coverImageUrl !== undefined) payload.cover_image_url = partner.coverImageUrl;
    if (partner.shortDescription !== undefined) payload.short_description = partner.shortDescription;
    if (partner.description !== undefined) payload.description = partner.description;
    if (partner.partnershipType !== undefined) payload.partnership_type = partner.partnershipType;
    if (partner.partnershipDate !== undefined) payload.partnership_date = partner.partnershipDate;
    if (partner.location !== undefined) payload.location = partner.location;
    if (partner.websiteUrl !== undefined) payload.website_url = partner.websiteUrl;
    if (partner.linkedinUrl !== undefined) payload.linkedin_url = partner.linkedinUrl;
    if (partner.instagramUrl !== undefined) payload.instagram_url = partner.instagramUrl;
    if (partner.highlights !== undefined) payload.highlights = partner.highlights;
    if (partner.isFeatured !== undefined) payload.is_featured = partner.isFeatured;
    if (partner.isActive !== undefined) payload.is_active = partner.isActive;
    if (partner.hasDetailPage !== undefined) payload.has_detail_page = partner.hasDetailPage;
    if (partner.displayOrder !== undefined) payload.display_order = partner.displayOrder;

    const { error } = await supabase
      .from('partners')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating partner ${id}:`, error);
      throw error;
    }
  },

  async deletePartner(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting partner ${id}:`, error);
      throw error;
    }
  },
};
