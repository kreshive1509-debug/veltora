import { supabase } from '../lib/supabase';
import { FaqItem } from '../types';

export const faqsService = {
  async getFaqs(): Promise<FaqItem[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching faqs from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((f: any) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category || 'General',
      isFeatured: f.is_featured,
      isEnabled: f.is_enabled,
      displayOrder: f.display_order,
    }));
  },

  async addFaq(faq: Omit<FaqItem, 'id'>): Promise<FaqItem> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('faqs')
      .insert({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        is_featured: faq.isFeatured,
        is_enabled: faq.isEnabled,
        display_order: faq.displayOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding FAQ:', error);
      throw error;
    }

    return {
      id: data.id,
      question: data.question,
      answer: data.answer,
      category: data.category,
      isFeatured: data.is_featured,
      isEnabled: data.is_enabled,
      displayOrder: data.display_order,
    };
  },

  async updateFaq(id: string, faq: Partial<FaqItem>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (faq.question !== undefined) payload.question = faq.question;
    if (faq.answer !== undefined) payload.answer = faq.answer;
    if (faq.category !== undefined) payload.category = faq.category;
    if (faq.isFeatured !== undefined) payload.is_featured = faq.isFeatured;
    if (faq.isEnabled !== undefined) payload.is_enabled = faq.isEnabled;
    if (faq.displayOrder !== undefined) payload.display_order = faq.displayOrder;

    const { error } = await supabase
      .from('faqs')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating FAQ ${id}:`, error);
      throw error;
    }
  },

  async deleteFaq(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting FAQ ${id}:`, error);
      throw error;
    }
  },
};
