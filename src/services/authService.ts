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
      return { success: false, error: 'Supabase authentication is unavailable. Check the Supabase configuration and try again.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
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
