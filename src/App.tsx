
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute';

// Lazy imports
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Dashboard,
  LeadsPage,
  LeadsFunnel,
  LeadsImportPage,
  WhatsAppChat,
  AgentsPage,
  ConnectPage,
  Profile,
  AdminDashboard,
  UsuariosCadastros,
  UsuariosTipos,
} from '@/pages/LazyPages';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen bg-background">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Protected routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/dashboard/leads" element={<ProtectedRoute><LeadsPage /></ProtectedRoute>} />
                <Route path="/dashboard/leads/funnel" element={<ProtectedRoute><LeadsFunnel /></ProtectedRoute>} />
                <Route path="/dashboard/leads/import" element={<ProtectedRoute><LeadsImportPage /></ProtectedRoute>} />
                <Route path="/dashboard/messages/whatsapp" element={<ProtectedRoute><WhatsAppChat /></ProtectedRoute>} />
                <Route path="/dashboard/agents" element={<ProtectedRoute><AgentsPage /></ProtectedRoute>} />
                <Route path="/dashboard/connect" element={<ProtectedRoute><ConnectPage /></ProtectedRoute>} />
                <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                {/* Admin routes */}
                <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                <Route path="/admin/usuarios" element={<AdminProtectedRoute><UsuariosCadastros /></AdminProtectedRoute>} />
                <Route path="/admin/tipos" element={<AdminProtectedRoute><UsuariosTipos /></AdminProtectedRoute>} />

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </div>
        </ErrorBoundary>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
