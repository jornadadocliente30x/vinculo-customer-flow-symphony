
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: 'admin' | 'manager' | 'agent' | 'viewer';
  avatar?: string;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  setHydrated: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  company?: string;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@vinculo.com.br',
    name: 'João Silva',
    company: 'Vinculo Admin',
    role: 'admin',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'demo@empresa.com.br',
    name: 'Maria Santos',
    company: 'Empresa Demo',
    role: 'manager',
    createdAt: new Date('2024-01-15')
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
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
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email);
        
        if (user && password === '123456') {
          console.log('Login successful for user:', user.name);
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        }
        
        console.log('Login failed');
        set({ isLoading: false });
        return false;
      },

      register: async (data: RegisterData) => {
        console.log('Register attempt for:', data.email);
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: Math.random().toString(),
          email: data.email,
          name: data.name,
          company: data.company,
          role: 'agent',
          createdAt: new Date()
        };
        
        mockUsers.push(newUser);
        console.log('Registration successful for user:', newUser.name);
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          isLoading: false 
        });
        return true;
      },

      logout: () => {
        console.log('User logged out');
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set({ isLoading: false });
        return true;
      },

      resetPassword: async (token: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set({ isLoading: false });
        return true;
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
      onRehydrateStorage: () => (state) => {
        console.log('Rehydrating auth store:', state);
        state?.setHydrated();
      },
    }
  )
);
