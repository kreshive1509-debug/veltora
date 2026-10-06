import { supabase } from '../lib/supabase';
import { Program } from '../types';

export const programsService = {
  async getPrograms(): Promise<Program[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching programs from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      duration: p.duration,
      eligibility: p.eligibility,
      benefits: p.benefits || [],
      fee: p.fee || 'Complimentary / Merit-Based',
      applicationUrl: p.application_url || '#contact',
      applicationStatus: p.application_status || 'Open',
      startDate: p.start_date,
      endDate: p.end_date,
      certificateAvailable: p.certificate_available ?? true,
      isFeatured: p.is_featured,
      isActive: p.is_active,
      displayOrder: p.display_order,
    }));
  },

  async addProgram(program: Omit<Program, 'id'>): Promise<Program> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('programs')
      .insert({
        name: program.name,
        slug: program.slug,
        description: program.description,
        duration: program.duration,
        eligibility: program.eligibility,
        benefits: program.benefits,
        fee: program.fee,
        application_url: program.applicationUrl,
        application_status: program.applicationStatus,
        start_date: program.startDate,
        end_date: program.endDate,
        certificate_available: program.certificateAvailable,
        is_featured: program.isFeatured,
        is_active: program.isActive,
        display_order: program.displayOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding program:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      duration: data.duration,
      eligibility: data.eligibility,
      benefits: data.benefits || [],
      fee: data.fee,
      applicationUrl: data.application_url,
      applicationStatus: data.application_status,
      startDate: data.start_date,
      endDate: data.end_date,
      certificateAvailable: data.certificate_available,
      isFeatured: data.is_featured,
      isActive: data.is_active,
      displayOrder: data.display_order,
    };
  },

  async updateProgram(id: string, program: Partial<Program>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (program.name !== undefined) payload.name = program.name;
    if (program.slug !== undefined) payload.slug = program.slug;
    if (program.description !== undefined) payload.description = program.description;
    if (program.duration !== undefined) payload.duration = program.duration;
    if (program.eligibility !== undefined) payload.eligibility = program.eligibility;
    if (program.benefits !== undefined) payload.benefits = program.benefits;
    if (program.fee !== undefined) payload.fee = program.fee;
    if (program.applicationUrl !== undefined) payload.application_url = program.applicationUrl;
    if (program.applicationStatus !== undefined) payload.application_status = program.applicationStatus;
    if (program.startDate !== undefined) payload.start_date = program.startDate;
    if (program.endDate !== undefined) payload.end_date = program.endDate;
    if (program.certificateAvailable !== undefined) payload.certificate_available = program.certificateAvailable;
    if (program.isFeatured !== undefined) payload.is_featured = program.isFeatured;
    if (program.isActive !== undefined) payload.is_active = program.isActive;
    if (program.displayOrder !== undefined) payload.display_order = program.displayOrder;

    const { error } = await supabase
      .from('programs')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating program ${id}:`, error);
      throw error;
    }
  },

  async deleteProgram(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting program ${id}:`, error);
      throw error;
    }
  },
};
