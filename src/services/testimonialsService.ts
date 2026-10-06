import { supabase } from '../lib/supabase';
import { Testimonial } from '../types';

export const testimonialsService = {
  async getTestimonials(): Promise<Testimonial[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching testimonials from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((t: any) => ({
      id: t.id,
      name: t.name,
      designation: t.designation,
      organization: t.organization,
      photoUrl: t.photo_url || undefined,
      message: t.message,
      rating: t.rating ?? 5,
      isFeatured: t.is_featured,
      isActive: t.is_active,
      displayOrder: t.display_order,
    }));
  },

  async addTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('testimonials')
      .insert({
        name: testimonial.name,
        designation: testimonial.designation,
        organization: testimonial.organization,
        photo_url: testimonial.photoUrl,
        message: testimonial.message,
        rating: testimonial.rating,
        is_featured: testimonial.isFeatured,
        is_active: testimonial.isActive,
        display_order: testimonial.displayOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding testimonial to Supabase:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      designation: data.designation,
      organization: data.organization,
      photoUrl: data.photo_url || undefined,
      message: data.message,
      rating: data.rating,
      isFeatured: data.is_featured,
      isActive: data.is_active,
      displayOrder: data.display_order,
    };
  },

  async updateTestimonial(id: string, testimonial: Partial<Testimonial>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (testimonial.name !== undefined) payload.name = testimonial.name;
    if (testimonial.designation !== undefined) payload.designation = testimonial.designation;
    if (testimonial.organization !== undefined) payload.organization = testimonial.organization;
    if (testimonial.photoUrl !== undefined) payload.photo_url = testimonial.photoUrl;
    if (testimonial.message !== undefined) payload.message = testimonial.message;
    if (testimonial.rating !== undefined) payload.rating = testimonial.rating;
    if (testimonial.isFeatured !== undefined) payload.is_featured = testimonial.isFeatured;
    if (testimonial.isActive !== undefined) payload.is_active = testimonial.isActive;
    if (testimonial.displayOrder !== undefined) payload.display_order = testimonial.displayOrder;

    const { error } = await supabase
      .from('testimonials')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating testimonial ${id}:`, error);
      throw error;
    }
  },

  async deleteTestimonial(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting testimonial ${id}:`, error);
      throw error;
    }
  },
};
