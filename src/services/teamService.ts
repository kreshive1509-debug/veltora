import { supabase } from '../lib/supabase';
import { TeamMember } from '../types';

export const teamService = {
  async getTeamMembers(): Promise<TeamMember[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching team_members from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((t: any) => ({
      id: t.id,
      name: t.name,
      designation: t.designation,
      role: t.role,
      photoUrl: t.photo_url,
      bio: t.bio,
      linkedinUrl: t.linkedin_url || undefined,
      instagramUrl: t.instagram_url || undefined,
      githubUrl: t.github_url || undefined,
      email: t.email || undefined,
      whatsapp: t.whatsapp || undefined,
      customUrl: t.custom_url || undefined,
      displayOrder: t.display_order,
      isActive: t.is_active,
    }));
  },

  async addTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('team_members')
      .insert({
        name: member.name,
        designation: member.designation,
        role: member.role,
        photo_url: member.photoUrl,
        bio: member.bio,
        linkedin_url: member.linkedinUrl,
        instagram_url: member.instagramUrl,
        github_url: member.githubUrl,
        email: member.email,
        whatsapp: member.whatsapp,
        custom_url: member.customUrl,
        display_order: member.displayOrder,
        is_active: member.isActive,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding team member to Supabase:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      designation: data.designation,
      role: data.role,
      photoUrl: data.photo_url,
      bio: data.bio,
      linkedinUrl: data.linkedin_url || undefined,
      instagramUrl: data.instagram_url || undefined,
      githubUrl: data.github_url || undefined,
      email: data.email || undefined,
      whatsapp: data.whatsapp || undefined,
      customUrl: data.custom_url || undefined,
      displayOrder: data.display_order,
      isActive: data.is_active,
    };
  },

  async updateTeamMember(id: string, member: Partial<TeamMember>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (member.name !== undefined) payload.name = member.name;
    if (member.designation !== undefined) payload.designation = member.designation;
    if (member.role !== undefined) payload.role = member.role;
    if (member.photoUrl !== undefined) payload.photo_url = member.photoUrl;
    if (member.bio !== undefined) payload.bio = member.bio;
    if (member.linkedinUrl !== undefined) payload.linkedin_url = member.linkedinUrl;
    if (member.instagramUrl !== undefined) payload.instagram_url = member.instagramUrl;
    if (member.githubUrl !== undefined) payload.github_url = member.githubUrl;
    if (member.email !== undefined) payload.email = member.email;
    if (member.whatsapp !== undefined) payload.whatsapp = member.whatsapp;
    if (member.customUrl !== undefined) payload.custom_url = member.customUrl;
    if (member.displayOrder !== undefined) payload.display_order = member.displayOrder;
    if (member.isActive !== undefined) payload.is_active = member.isActive;

    const { error } = await supabase
      .from('team_members')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating team member ${id}:`, error);
      throw error;
    }
  },

  async deleteTeamMember(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting team member ${id}:`, error);
      throw error;
    }
  },
};
