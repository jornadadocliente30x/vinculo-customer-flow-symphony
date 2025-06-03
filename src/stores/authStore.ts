
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: 'admin' | 'manager' | 'agent' | 'viewer';
  avatar?: string;
  phone?: string;
  createdAt: Date;
  usuarioId?: number;
  empresaId?: number;
}

interface AuthState {
  user: AppUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  updateUser: (updates: Partial<AppUser>) => void;
  setHydrated: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  company?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,

      setHydrated: () => {
        console.log('AuthStore hydrated');
        set({ isHydrated: true });
      },

      login: async (email: string, password: string) => {
        console.log('Login attempt for:', email);
        set({ isLoading: true });
        
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            console.error('Login error:', error);
            set({ isLoading: false });
            return false;
          }

          if (data.user && data.session) {
            // Buscar dados do usuário na tabela profiles
            const { data: profileData } = await supabase
              .from('profiles')
              .select(`
                usuario_id,
                nome,
                usuario:usuario_id (
                  id,
                  nome,
                  empresa_id,
                  nivel_usuario_id
                )
              `)
              .eq('id', data.user.id)
              .single();

            console.log('Profile data retrieved:', profileData);

            const usuario = profileData?.usuario;

            const appUser: AppUser = {
              id: data.user.id,
              email: data.user.email!,
              name: profileData?.nome || data.user.email!,
              role: 'agent', // Default role
              createdAt: new Date(data.user.created_at),
              usuarioId: usuario?.id,
              empresaId: usuario?.empresa_id,
            };

            console.log('Login successful for user:', appUser.name);
            set({ 
              user: appUser, 
              session: data.session,
              isAuthenticated: true, 
              isLoading: false 
            });
            return true;
          }
        } catch (err) {
          console.error('Login error:', err);
        }
        
        set({ isLoading: false });
        return false;
      },

      register: async (data: RegisterData) => {
        console.log('Register attempt for:', data.email);
        set({ isLoading: true });
        
        try {
          const redirectUrl = `${window.location.origin}/`;
          
          const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
              data: {
                name: data.name,
                company: data.company
              },
              emailRedirectTo: redirectUrl
            }
          });

          if (error) {
            console.error('Registration error:', error);
            set({ isLoading: false });
            return false;
          }

          if (authData.user) {
            console.log('Registration successful for user:', data.name);
            set({ isLoading: false });
            return true;
          }
        } catch (err) {
          console.error('Registration error:', err);
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: async () => {
        console.log('User logging out');
        await supabase.auth.signOut();
        set({ 
          user: null, 
          session: null,
          isAuthenticated: false 
        });
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true });
        
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email);
          set({ isLoading: false });
          return !error;
        } catch (err) {
          console.error('Forgot password error:', err);
          set({ isLoading: false });
          return false;
        }
      },

      resetPassword: async (token: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const { error } = await supabase.auth.updateUser({
            password: password
          });
          set({ isLoading: false });
          return !error;
        } catch (err) {
          console.error('Reset password error:', err);
          set({ isLoading: false });
          return false;
        }
      },

      updateUser: (updates: Partial<AppUser>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates };
          set({ user: updatedUser });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        session: state.session,
        isAuthenticated: state.isAuthenticated 
      }),
      onRehydrateStorage: () => (state) => {
        console.log('Rehydrating auth store:', state);
        state?.setHydrated();
      },
    }
  )
);

// Configurar listener para mudanças de autenticação
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session?.user?.email);
  
  const { user: currentUser } = useAuthStore.getState();
  
  if (event === 'SIGNED_OUT' || !session) {
    useAuthStore.setState({
      user: null,
      session: null,
      isAuthenticated: false
    });
  } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    if (session.user && (!currentUser || currentUser.id !== session.user.id)) {
      // Buscar dados atualizados do usuário
      setTimeout(async () => {
        try {
          const { data: profileData } = await supabase
            .from('profiles')
            .select(`
              usuario_id,
              nome,
              usuario:usuario_id (
                id,
                nome,
                empresa_id,
                nivel_usuario_id
              )
            `)
            .eq('id', session.user.id)
            .single();

          console.log('Auth state change - Profile data:', profileData);

          const usuario = profileData?.usuario;

          const appUser: AppUser = {
            id: session.user.id,
            email: session.user.email!,
            name: profileData?.nome || session.user.email!,
            role: 'agent',
            createdAt: new Date(session.user.created_at),
            usuarioId: usuario?.id,
            empresaId: usuario?.empresa_id,
          };

          useAuthStore.setState({
            user: appUser,
            session: session,
            isAuthenticated: true
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }, 0);
    }
  }
});
