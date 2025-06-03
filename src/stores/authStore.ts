
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  company?: string;
  phone?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: any }>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string; company?: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  setHydrated: () => void;
  updateUser: (userData: Partial<UserProfile>) => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      userProfile: null,
      isAuthenticated: false,
      isLoading: true,
      isHydrated: false,

      setHydrated: () => set({ isHydrated: true }),

      signIn: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (data.session && data.user) {
          set({
            user: data.user,
            session: data.session,
            isAuthenticated: true,
          });
          
          // Load user profile
          const profileData = await get().loadUserProfile(data.user.id);
          set({ userProfile: profileData });
        }

        return { error };
      },

      login: async (email: string, password: string) => {
        const result = await get().signIn(email, password);
        return !result.error;
      },

      signUp: async (email: string, password: string, name?: string) => {
        const redirectUrl = `${window.location.origin}/`;
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              name: name || email.split('@')[0],
            },
          },
        });

        if (data.session && data.user) {
          set({
            user: data.user,
            session: data.session,
            isAuthenticated: true,
          });
          
          // Create user profile
          const profileData = {
            id: data.user.id,
            email: data.user.email!,
            name: name || email.split('@')[0],
          };
          set({ userProfile: profileData });
        }

        return { error };
      },

      register: async (userData: { name: string; email: string; password: string; company?: string }) => {
        const result = await get().signUp(userData.email, userData.password, userData.name);
        return !result.error;
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({
          user: null,
          session: null,
          userProfile: null,
          isAuthenticated: false,
        });
      },

      logout: async () => {
        await get().signOut();
      },

      updateUser: (userData: Partial<UserProfile>) => {
        const currentProfile = get().userProfile;
        if (currentProfile) {
          set({
            userProfile: { ...currentProfile, ...userData }
          });
        }
      },

      forgotPassword: async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        return !error;
      },

      resetPassword: async (token: string, password: string) => {
        const { error } = await supabase.auth.updateUser({ password });
        return !error;
      },

      loadUserProfile: async (userId: string) => {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
          
          return data ? {
            id: data.id,
            email: data.email || '',
            name: data.nome || '',
          } : null;
        } catch (error) {
          return null;
        }
      },

      initialize: async () => {
        set({ isLoading: true });

        // Set up auth state listener
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            const profileData = await get().loadUserProfile(session.user.id);
            set({
              session,
              user: session.user,
              userProfile: profileData,
              isAuthenticated: true,
              isLoading: false,
              isHydrated: true,
            });
          } else {
            set({
              session: null,
              user: null,
              userProfile: null,
              isAuthenticated: false,
              isLoading: false,
              isHydrated: true,
            });
          }
        });

        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const profileData = await get().loadUserProfile(session.user.id);
          set({
            session,
            user: session.user,
            userProfile: profileData,
            isAuthenticated: true,
            isLoading: false,
            isHydrated: true,
          });
        } else {
          set({
            isLoading: false,
            isHydrated: true,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        userProfile: state.userProfile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
