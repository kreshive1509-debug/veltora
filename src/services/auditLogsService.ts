import { supabase } from '../lib/supabase';
import { AuditLog } from '../types';

export const auditLogsService = {
  async getAuditLogs(): Promise<AuditLog[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(200);

    if (error) {
      console.error('Error fetching audit_logs from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((l: any) => ({
      id: l.id,
      action: l.action,
      entity: l.entity,
      entityId: l.entity_id || undefined,
      userEmail: l.user_email,
      details: l.details || undefined,
      timestamp: l.timestamp,
    }));
  },

  async logAction(
    action: string,
    entity: string,
    details?: string,
    userEmail = 'veltoraitsolution2026@gmail.com',
    entityId?: string
  ): Promise<void> {
    if (!supabase) return;
    try {
      await supabase.from('audit_logs').insert({
        action,
        entity,
        details,
        user_email: userEmail,
        entity_id: entityId,
      });
    } catch (err) {
      console.warn('Failed to record audit log:', err);
    }
  },
};
