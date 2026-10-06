import { supabase } from '../lib/supabase';
import { Leadership } from '../types';

export const leadershipService = {
  async getLeadership(): Promise<Leadership[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('leadership')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching leadership from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((l: any) => ({
      id: l.id,
      name: l.name,
      slug: l.slug,
      roleType: l.role_type,
      designation: l.designation,
      shortBio: l.short_bio,
      fullBio: l.full_bio,
      photoUrl: l.photo_url,
      linkedinUrl: l.linkedin_url || undefined,
      instagramUrl: l.instagram_url || undefined,
      githubUrl: l.github_url || undefined,
      email: l.email || undefined,
      whatsapp: l.whatsapp || undefined,
      portfolioUrl: l.portfolio_url || undefined,
      otherContactUrl: l.other_contact_url || undefined,
      displayOrder: l.display_order,
      isActive: l.is_active,
    }));
  },

  async addLeadership(leader: Omit<Leadership, 'id'>): Promise<Leadership> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('leadership')
      .insert({
        name: leader.name,
        slug: leader.slug,
        role_type: leader.roleType,
        designation: leader.designation,
        short_bio: leader.shortBio,
        full_bio: leader.fullBio,
        photo_url: leader.photoUrl,
        linkedin_url: leader.linkedinUrl,
        instagram_url: leader.instagramUrl,
        github_url: leader.githubUrl,
        email: leader.email,
        whatsapp: leader.whatsapp,
        portfolio_url: leader.portfolioUrl,
        other_contact_url: leader.otherContactUrl,
        display_order: leader.displayOrder,
        is_active: leader.isActive,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding leader to Supabase:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      roleType: data.role_type,
      designation: data.designation,
      shortBio: data.short_bio,
      fullBio: data.full_bio,
      photoUrl: data.photo_url,
      linkedinUrl: data.linkedin_url || undefined,
      instagramUrl: data.instagram_url || undefined,
      githubUrl: data.github_url || undefined,
      email: data.email || undefined,
      whatsapp: data.whatsapp || undefined,
      portfolioUrl: data.portfolio_url || undefined,
      otherContactUrl: data.other_contact_url || undefined,
      displayOrder: data.display_order,
      isActive: data.is_active,
    };
  },

  async updateLeadership(id: string, leader: Partial<Leadership>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (leader.name !== undefined) payload.name = leader.name;
    if (leader.slug !== undefined) payload.slug = leader.slug;
    if (leader.roleType !== undefined) payload.role_type = leader.roleType;
    if (leader.designation !== undefined) payload.designation = leader.designation;
    if (leader.shortBio !== undefined) payload.short_bio = leader.shortBio;
    if (leader.fullBio !== undefined) payload.full_bio = leader.fullBio;
    if (leader.photoUrl !== undefined) payload.photo_url = leader.photoUrl;
    if (leader.linkedinUrl !== undefined) payload.linkedin_url = leader.linkedinUrl;
    if (leader.instagramUrl !== undefined) payload.instagram_url = leader.instagramUrl;
    if (leader.githubUrl !== undefined) payload.github_url = leader.githubUrl;
    if (leader.email !== undefined) payload.email = leader.email;
    if (leader.whatsapp !== undefined) payload.whatsapp = leader.whatsapp;
    if (leader.portfolioUrl !== undefined) payload.portfolio_url = leader.portfolioUrl;
    if (leader.otherContactUrl !== undefined) payload.other_contact_url = leader.otherContactUrl;
    if (leader.displayOrder !== undefined) payload.display_order = leader.displayOrder;
    if (leader.isActive !== undefined) payload.is_active = leader.isActive;

    const { error } = await supabase
      .from('leadership')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating leader ${id}:`, error);
      throw error;
    }
  },

  async deleteLeadership(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('leadership')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting leader ${id}:`, error);
      throw error;
    }
  },
};
