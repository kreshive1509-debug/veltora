import { supabase } from '../lib/supabase';
import { PromotionalCampaign } from '../types';

export const campaignsService = {
  async getCampaigns(): Promise<PromotionalCampaign[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('promotional_campaigns')
      .select('*')
      .order('priority', { ascending: false });

    if (error) {
      console.error('Error fetching promotional_campaigns from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((c: any) => ({
      id: c.id,
      title: c.title,
      description: c.description || undefined,
      imageUrl: c.image_url || undefined,
      buttonText: c.button_text,
      buttonUrl: c.button_url,
      startDate: c.start_date,
      endDate: c.end_date,
      isEnabled: c.is_enabled,
      displayMode: c.display_mode || 'both',
      frequencyLimitHours: c.frequency_limit_hours || 24,
      priority: c.priority || 1,
    }));
  },

  async addCampaign(campaign: Omit<PromotionalCampaign, 'id'>): Promise<PromotionalCampaign> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('promotional_campaigns')
      .insert({
        title: campaign.title,
        description: campaign.description,
        image_url: campaign.imageUrl,
        button_text: campaign.buttonText,
        button_url: campaign.buttonUrl,
        start_date: campaign.startDate,
        end_date: campaign.endDate,
        is_enabled: campaign.isEnabled,
        display_mode: campaign.displayMode,
        frequency_limit_hours: campaign.frequencyLimitHours,
        priority: campaign.priority || 1,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding campaign to Supabase:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description || undefined,
      imageUrl: data.image_url || undefined,
      buttonText: data.button_text,
      buttonUrl: data.button_url,
      startDate: data.start_date,
      endDate: data.end_date,
      isEnabled: data.is_enabled,
      displayMode: data.display_mode || 'both',
      frequencyLimitHours: data.frequency_limit_hours || 24,
      priority: data.priority || 1,
    };
  },

  async updateCampaign(id: string, campaign: Partial<PromotionalCampaign>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (campaign.title !== undefined) payload.title = campaign.title;
    if (campaign.description !== undefined) payload.description = campaign.description;
    if (campaign.imageUrl !== undefined) payload.image_url = campaign.imageUrl;
    if (campaign.buttonText !== undefined) payload.button_text = campaign.buttonText;
    if (campaign.buttonUrl !== undefined) payload.button_url = campaign.buttonUrl;
    if (campaign.startDate !== undefined) payload.start_date = campaign.startDate;
    if (campaign.endDate !== undefined) payload.end_date = campaign.endDate;
    if (campaign.isEnabled !== undefined) payload.is_enabled = campaign.isEnabled;
    if (campaign.displayMode !== undefined) payload.display_mode = campaign.displayMode;
    if (campaign.frequencyLimitHours !== undefined) payload.frequency_limit_hours = campaign.frequencyLimitHours;
    if (campaign.priority !== undefined) payload.priority = campaign.priority;

    const { error } = await supabase
      .from('promotional_campaigns')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating campaign ${id}:`, error);
      throw error;
    }
  },

  async deleteCampaign(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('promotional_campaigns')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting campaign ${id}:`, error);
      throw error;
    }
  },
};
