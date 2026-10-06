import { supabase } from '../lib/supabase';
import { GalleryAlbum, GalleryImage } from '../types';

export const galleryService = {
  async getAlbums(): Promise<GalleryAlbum[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('gallery_albums')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching gallery_albums from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((a: any) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      description: a.description,
      coverImageUrl: a.cover_image_url,
      category: a.category || 'Fellowship & Hackathons',
      eventDate: a.event_date,
      isFeatured: a.is_featured,
      isActive: a.is_active,
      displayOrder: a.display_order,
      createdAt: a.created_at,
    }));
  },

  async addAlbum(album: Omit<GalleryAlbum, 'id' | 'createdAt'>): Promise<GalleryAlbum> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('gallery_albums')
      .insert({
        title: album.title,
        slug: album.slug,
        description: album.description,
        cover_image_url: album.coverImageUrl,
        category: album.category,
        event_date: album.eventDate,
        is_featured: album.isFeatured,
        is_active: album.isActive,
        display_order: album.displayOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding gallery album:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      coverImageUrl: data.cover_image_url,
      category: data.category,
      eventDate: data.event_date,
      isFeatured: data.is_featured,
      isActive: data.is_active,
      displayOrder: data.display_order,
      createdAt: data.created_at,
    };
  },

  async updateAlbum(id: string, album: Partial<GalleryAlbum>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (album.title !== undefined) payload.title = album.title;
    if (album.slug !== undefined) payload.slug = album.slug;
    if (album.description !== undefined) payload.description = album.description;
    if (album.coverImageUrl !== undefined) payload.cover_image_url = album.coverImageUrl;
    if (album.category !== undefined) payload.category = album.category;
    if (album.eventDate !== undefined) payload.event_date = album.eventDate;
    if (album.isFeatured !== undefined) payload.is_featured = album.isFeatured;
    if (album.isActive !== undefined) payload.is_active = album.isActive;
    if (album.displayOrder !== undefined) payload.display_order = album.displayOrder;

    const { error } = await supabase
      .from('gallery_albums')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating gallery album ${id}:`, error);
      throw error;
    }
  },

  async deleteAlbum(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('gallery_albums')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting gallery album ${id}:`, error);
      throw error;
    }
  },

  // Gallery Images
  async getGalleryImages(albumId?: string): Promise<GalleryImage[]> {
    if (!supabase) return [];
    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (albumId) {
      query = query.eq('album_id', albumId);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching gallery_images:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((img: any) => ({
      id: img.id,
      albumId: img.album_id,
      imageUrl: img.image_url,
      altText: img.alt_text || undefined,
      caption: img.caption || undefined,
      displayOrder: img.display_order,
      createdAt: img.created_at,
    }));
  },

  async addGalleryImage(image: Omit<GalleryImage, 'id' | 'createdAt'>): Promise<GalleryImage> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('gallery_images')
      .insert({
        album_id: image.albumId,
        image_url: image.imageUrl,
        alt_text: image.altText,
        caption: image.caption,
        display_order: image.displayOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding gallery image:', error);
      throw error;
    }

    return {
      id: data.id,
      albumId: data.album_id,
      imageUrl: data.image_url,
      altText: data.alt_text || undefined,
      caption: data.caption || undefined,
      displayOrder: data.display_order,
      createdAt: data.created_at,
    };
  },

  async updateGalleryImage(id: string, image: Partial<GalleryImage>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {};
    if (image.imageUrl !== undefined) payload.image_url = image.imageUrl;
    if (image.altText !== undefined) payload.alt_text = image.altText;
    if (image.caption !== undefined) payload.caption = image.caption;
    if (image.displayOrder !== undefined) payload.display_order = image.displayOrder;

    const { error } = await supabase
      .from('gallery_images')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating gallery image ${id}:`, error);
      throw error;
    }
  },

  async deleteGalleryImage(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting gallery image ${id}:`, error);
      throw error;
    }
  },
};
