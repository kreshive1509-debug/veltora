import { supabase } from '../lib/supabase';

export const authService = {
  async getCurrentSession() {
    if (!supabase) return null;
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.warn('Error fetching auth session:', error);
      return null;
    }
    return session;
  },

  async login(email: string, pass: string): Promise<{ success: boolean; user?: any; error?: string }> {
    if (!supabase) {
      // In development mode when Supabase credentials are not filled yet
      if (email === 'veltoraitsolution2026@gmail.com' && pass === 'Veltora@2026') {
        return { success: true, user: { email } };
      }
      return { success: false, error: 'Database service is in setup mode. Please enter valid administrative credentials.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        // Allow fallback dev login if credentials match Veltora Admin while initial user is created
        if (email === 'veltoraitsolution2026@gmail.com' && pass === 'Veltora@2026') {
          return { success: true, user: { email } };
        }
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user };
    } catch (err: any) {
      return { success: false, error: err.message || 'Authentication failed' };
    }
  },

  async logout(): Promise<void> {
    if (!supabase) return;
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Error signing out:', err);
    }
  },
};
