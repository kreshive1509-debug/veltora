import { supabase } from '../lib/supabase';
import { CustomPage, LegalPage } from '../types';

export const pagesService = {
  async getCustomPages(): Promise<CustomPage[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('custom_pages')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching custom_pages from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      content: p.content,
      featuredImage: p.featured_image || undefined,
      seoTitle: p.seo_title || undefined,
      seoDescription: p.seo_description || undefined,
      ogImage: p.og_image || undefined,
      isPublished: p.is_published,
      showInNav: p.show_in_nav,
      displayOrder: p.display_order,
      updatedAt: p.updated_at,
    }));
  },

  async addCustomPage(page: Omit<CustomPage, 'id' | 'updatedAt'>): Promise<CustomPage> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('custom_pages')
      .insert({
        title: page.title,
        slug: page.slug,
        content: page.content,
        featured_image: page.featuredImage,
        seo_title: page.seoTitle,
        seo_description: page.seoDescription,
        og_image: page.ogImage,
        is_published: page.isPublished,
        show_in_nav: page.showInNav,
        display_order: page.displayOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding custom page:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      content: data.content,
      featuredImage: data.featured_image || undefined,
      seoTitle: data.seo_title || undefined,
      seoDescription: data.seo_description || undefined,
      ogImage: data.og_image || undefined,
      isPublished: data.is_published,
      showInNav: data.show_in_nav,
      displayOrder: data.display_order,
      updatedAt: data.updated_at,
    };
  },

  async updateCustomPage(id: string, page: Partial<CustomPage>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (page.title !== undefined) payload.title = page.title;
    if (page.slug !== undefined) payload.slug = page.slug;
    if (page.content !== undefined) payload.content = page.content;
    if (page.featuredImage !== undefined) payload.featured_image = page.featuredImage;
    if (page.seoTitle !== undefined) payload.seo_title = page.seoTitle;
    if (page.seoDescription !== undefined) payload.seo_description = page.seoDescription;
    if (page.ogImage !== undefined) payload.og_image = page.ogImage;
    if (page.isPublished !== undefined) payload.is_published = page.isPublished;
    if (page.showInNav !== undefined) payload.show_in_nav = page.showInNav;
    if (page.displayOrder !== undefined) payload.display_order = page.displayOrder;

    const { error } = await supabase
      .from('custom_pages')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating custom page ${id}:`, error);
      throw error;
    }
  },

  async deleteCustomPage(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('custom_pages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting custom page ${id}:`, error);
      throw error;
    }
  },

  // Legal Pages
  async getLegalPages(): Promise<Record<string, LegalPage>> {
    if (!supabase) return {};
    const { data, error } = await supabase
      .from('legal_pages')
      .select('*');

    if (error) {
      console.error('Error fetching legal_pages from Supabase:', error);
      throw error;
    }
    if (!data) return {};

    const map: Record<string, LegalPage> = {};
    for (const p of data) {
      map[p.slug] = {
        slug: p.slug as any,
        title: p.title,
        lastUpdated: p.last_updated,
        content: p.content,
        isPublished: p.is_published,
        seoTitle: p.seo_title || undefined,
        seoDescription: p.seo_description || undefined,
      };
    }
    return map;
  },

  async updateLegalPage(slug: string, page: Partial<LegalPage>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (page.title !== undefined) payload.title = page.title;
    if (page.lastUpdated !== undefined) payload.last_updated = page.lastUpdated;
    if (page.content !== undefined) payload.content = page.content;
    if (page.isPublished !== undefined) payload.is_published = page.isPublished;
    if (page.seoTitle !== undefined) payload.seo_title = page.seoTitle;
    if (page.seoDescription !== undefined) payload.seo_description = page.seoDescription;

    const { error } = await supabase
      .from('legal_pages')
      .upsert({ slug, ...payload });

    if (error) {
      console.error(`Error updating legal page ${slug}:`, error);
      throw error;
    }
  },
};
