import { supabase } from '../lib/supabase';
import { MediaItem } from '../types';

export const mediaService = {
  async getMedia(): Promise<MediaItem[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching media from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((m: any) => ({
      id: m.id,
      fileName: m.file_name,
      url: m.url,
      thumbnailUrl: m.thumbnail_url || undefined,
      type: m.type || 'image',
      altText: m.alt_text || undefined,
      caption: m.caption || undefined,
      category: m.category || 'general',
      uploadedAt: m.uploaded_at,
      size: m.size || undefined,
      usedIn: m.used_in || [],
    }));
  },

  async addMediaItem(item: Omit<MediaItem, 'id' | 'uploadedAt'>): Promise<MediaItem> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('media')
      .insert({
        file_name: item.fileName,
        url: item.url,
        thumbnail_url: item.thumbnailUrl,
        type: item.type,
        alt_text: item.altText,
        caption: item.caption,
        category: item.category,
        size: item.size,
        used_in: item.usedIn,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding media item to Supabase:', error);
      throw error;
    }

    return {
      id: data.id,
      fileName: data.file_name,
      url: data.url,
      thumbnailUrl: data.thumbnail_url || undefined,
      type: data.type,
      altText: data.alt_text || undefined,
      caption: data.caption || undefined,
      category: data.category || 'general',
      uploadedAt: data.uploaded_at,
      size: data.size || undefined,
      usedIn: data.used_in || [],
    };
  },

  async deleteMediaItem(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting media item ${id}:`, error);
      throw error;
    }
  },
};
