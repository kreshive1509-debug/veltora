import { supabase } from '../lib/supabase';
import { Enquiry, EnquiryNote } from '../types';

export const enquiriesService = {
  generateReferenceNumber(): string {
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `ENQ-${year}-${randomDigits}`;
  },

  async getEnquiries(): Promise<Enquiry[]> {
    if (!supabase) return [];
    const { data: enquiriesData, error: enqError } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (enqError) {
      console.error('Error fetching enquiries from Supabase:', enqError);
      throw enqError;
    }
    if (!enquiriesData) return [];

    const { data: notesData, error: notesError } = await supabase
      .from('enquiry_notes')
      .select('*')
      .order('created_at', { ascending: true });

    if (notesError) {
      console.warn('Error fetching enquiry notes:', notesError);
    }

    const notesByEnquiryId: Record<string, EnquiryNote[]> = {};
    if (notesData) {
      for (const n of notesData) {
        if (!notesByEnquiryId[n.enquiry_id]) {
          notesByEnquiryId[n.enquiry_id] = [];
        }
        notesByEnquiryId[n.enquiry_id].push({
          id: n.id,
          enquiryId: n.enquiry_id,
          note: n.note,
          author: n.author,
          createdAt: n.created_at,
        });
      }
    }

    return enquiriesData.map((e: any) => ({
      id: e.id,
      referenceNo: e.reference_no,
      name: e.name,
      email: e.email,
      phone: e.phone,
      whatsapp: e.whatsapp || undefined,
      company: e.company || undefined,
      service: e.service,
      projectType: e.project_type,
      budgetRange: e.budget_range || undefined,
      message: e.message,
      status: e.status || 'New',
      priority: e.priority || 'Normal',
      assignedTo: e.assigned_to || undefined,
      followUpDate: e.follow_up_date || undefined,
      notes: notesByEnquiryId[e.id] || [],
      createdAt: e.created_at,
    }));
  },

  async submitEnquiry(
    enquiry: Omit<Enquiry, 'id' | 'referenceNo' | 'createdAt' | 'status'>
  ): Promise<{ id: string; referenceNo: string }> {
    if (!supabase) throw new Error('Supabase client not initialized');
    
    // Generate unique reference number with retry on rare collision
    let referenceNo = this.generateReferenceNumber();
    let attempts = 0;
    let createdRecord: any = null;

    while (attempts < 5) {
      const { data, error } = await supabase
        .from('enquiries')
        .insert({
          reference_no: referenceNo,
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.phone,
          whatsapp: enquiry.whatsapp,
          company: enquiry.company,
          service: enquiry.service,
          project_type: enquiry.projectType,
          budget_range: enquiry.budgetRange,
          message: enquiry.message,
          status: 'New',
          priority: enquiry.priority || 'Normal',
        })
        .select()
        .single();

      if (!error && data) {
        createdRecord = data;
        break;
      }

      if (error && error.code === '23505') {
        // Unique constraint violation on reference_no, try a fresh one
        referenceNo = this.generateReferenceNumber();
        attempts++;
      } else {
        console.error('Error creating enquiry in Supabase:', error);
        throw error;
      }
    }

    if (!createdRecord) {
      throw new Error('Failed to generate unique enquiry reference number');
    }

    return {
      id: createdRecord.id,
      referenceNo: createdRecord.reference_no,
    };
  },

  async updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('enquiries')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error(`Error updating enquiry ${id} status:`, error);
      throw error;
    }
  },

  async updateEnquiryDetails(id: string, updates: Partial<Enquiry>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (updates.status !== undefined) payload.status = updates.status;
    if (updates.priority !== undefined) payload.priority = updates.priority;
    if (updates.assignedTo !== undefined) payload.assigned_to = updates.assignedTo;
    if (updates.followUpDate !== undefined) payload.follow_up_date = updates.followUpDate;
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.email !== undefined) payload.email = updates.email;
    if (updates.phone !== undefined) payload.phone = updates.phone;
    if (updates.whatsapp !== undefined) payload.whatsapp = updates.whatsapp;
    if (updates.company !== undefined) payload.company = updates.company;
    if (updates.service !== undefined) payload.service = updates.service;
    if (updates.projectType !== undefined) payload.project_type = updates.projectType;
    if (updates.budgetRange !== undefined) payload.budget_range = updates.budgetRange;
    if (updates.message !== undefined) payload.message = updates.message;

    const { error } = await supabase
      .from('enquiries')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating enquiry ${id}:`, error);
      throw error;
    }
  },

  async addEnquiryNote(enquiryId: string, note: string, author = 'Admin'): Promise<EnquiryNote> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('enquiry_notes')
      .insert({
        enquiry_id: enquiryId,
        note,
        author,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding enquiry note:', error);
      throw error;
    }

    return {
      id: data.id,
      enquiryId: data.enquiry_id,
      note: data.note,
      author: data.author,
      createdAt: data.created_at,
    };
  },

  async deleteEnquiry(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting enquiry ${id}:`, error);
      throw error;
    }
  },
};
