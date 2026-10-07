import { supabase } from '../lib/supabase';
import { Leadership } from '../types';

type LeadershipRow = {
  id: string;
  name: string;
  slug: string;
  role_type: Leadership['roleType'];
  designation: string;
  short_bio: string;
  full_bio: string;
  photo_url: string;
  linkedin_url?: string | null;
  instagram_url?: string | null;
  github_url?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  portfolio_url?: string | null;
  other_contact_url?: string | null;
  display_order: number;
  is_active: boolean;
};

const mapLeadershipRecord = (row: LeadershipRow): Leadership => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  roleType: row.role_type,
  designation: row.designation,
  shortBio: row.short_bio,
  fullBio: row.full_bio,
  photoUrl: row.photo_url,
  linkedinUrl: row.linkedin_url ?? undefined,
  instagramUrl: row.instagram_url ?? undefined,
  githubUrl: row.github_url ?? undefined,
  email: row.email ?? undefined,
  whatsapp: row.whatsapp ?? undefined,
  portfolioUrl: row.portfolio_url ?? undefined,
  otherContactUrl: row.other_contact_url ?? undefined,
  displayOrder: row.display_order,
  isActive: row.is_active,
});

export const leadershipService = {
  async getLeadership(): Promise<Leadership[]> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('leadership')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching leadership from Supabase:', error);
      throw error;
    }

    if (!data) return [];

    return data.map((row) => mapLeadershipRecord(row as LeadershipRow));
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

    if (!data) {
      throw new Error('Leadership insert returned no record');
    }

    return mapLeadershipRecord(data as LeadershipRow);
  },

  async updateLeadership(id: string, leader: Partial<Leadership>): Promise<Leadership> {
    if (!supabase) throw new Error('Supabase not configured');

    const payload: Record<string, string | number | boolean | null> = {
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

    const { data, error } = await supabase
      .from('leadership')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating leader ${id}:`, error);
      throw error;
    }

    if (!data) {
      throw new Error(`Leadership update for ${id} returned no record`);
    }

    return mapLeadershipRecord(data as LeadershipRow);
  },

  async deleteLeadership(id: string): Promise<void> {
    if (!supabase) throw new Error('Supabase not configured');

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
