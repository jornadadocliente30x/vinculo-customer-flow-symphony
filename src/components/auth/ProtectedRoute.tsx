
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isHydrated, setHydrated } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // Force hydration if not already hydrated
    if (!isHydrated) {
      const timer = setTimeout(() => {
        setHydrated();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, setHydrated]);

  // Show loading while hydrating
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  console.log('ProtectedRoute check - isAuthenticated:', isAuthenticated, 'isHydrated:', isHydrated);

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  console.log('User authenticated, showing protected content');
  return <>{children}</>;
}
