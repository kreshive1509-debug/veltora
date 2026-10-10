import { supabase } from '../lib/supabase';
import { MaintenanceSettings } from '../types';

export type MaintenanceStatus = 'disabled' | 'scheduled' | 'active' | 'expired';

export const getMaintenanceState = (settings?: MaintenanceSettings | null): MaintenanceStatus => {
  if (!settings || !settings.enabled) return 'disabled';

  const now = Date.now();
  const startAt = settings.startAt ? new Date(settings.startAt).getTime() : null;
  const endAt = settings.endAt ? new Date(settings.endAt).getTime() : null;

  if (endAt && now > endAt) return 'expired';
  if (startAt && now < startAt) return 'scheduled';
  return 'active';
};

export const maintenanceService = {
  async getMaintenanceSettings(): Promise<MaintenanceSettings | null> {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('maintenance_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('Error fetching maintenance_settings from Supabase:', error);
      throw error;
    }

    if (!data) {
      return {
        id: 'default',
        enabled: false,
        title: 'Scheduled maintenance',
        message: 'We are making improvements to Veltora.',
        description: 'We should be back shortly.',
        startAt: undefined,
        endAt: undefined,
        allowAdminAccess: true,
        showCountdown: false,
        updatedAt: new Date().toISOString(),
        updatedBy: undefined,
      };
    }

    return {
      id: data.id || 'default',
      enabled: Boolean(data.enabled),
      title: data.title || 'Scheduled maintenance',
      message: data.message || 'We are making improvements to Veltora.',
      description: data.description || undefined,
      startAt: data.start_at || undefined,
      endAt: data.end_at || undefined,
      allowAdminAccess: data.allow_admin_access ?? true,
      showCountdown: data.show_countdown ?? false,
      updatedAt: data.updated_at || undefined,
      updatedBy: data.updated_by || undefined,
    };
  },

  async updateMaintenanceSettings(settings: Partial<MaintenanceSettings>): Promise<void> {
    if (!supabase) return;

    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (settings.enabled !== undefined) payload.enabled = settings.enabled;
    if (settings.title !== undefined) payload.title = settings.title;
    if (settings.message !== undefined) payload.message = settings.message;
    if (settings.description !== undefined) payload.description = settings.description ?? null;
    if (settings.startAt !== undefined) payload.start_at = settings.startAt || null;
    if (settings.endAt !== undefined) payload.end_at = settings.endAt || null;
    if (settings.allowAdminAccess !== undefined) payload.allow_admin_access = settings.allowAdminAccess;
    if (settings.showCountdown !== undefined) payload.show_countdown = settings.showCountdown;
    if (settings.updatedBy !== undefined) payload.updated_by = settings.updatedBy || null;

    const { error } = await supabase
      .from('maintenance_settings')
      .upsert({ id: 'default', ...payload });

    if (error) {
      console.error('Error updating maintenance_settings in Supabase:', error);
      throw error;
    }
  },
};
