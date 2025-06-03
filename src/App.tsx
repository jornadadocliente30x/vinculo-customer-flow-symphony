
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthGuard } from '@/components/auth/AuthGuard';

// Pages
import Index from '@/pages/Index';
import AuthPage from '@/pages/auth/AuthPage';
import Dashboard from '@/pages/dashboard/Dashboard';
import LeadsPage from '@/pages/dashboard/leads/LeadsPage';
import LeadsFunnel from '@/pages/dashboard/leads/LeadsFunnel';
import WhatsAppChat from '@/pages/dashboard/messages/WhatsAppChat';
import ConnectPage from '@/pages/dashboard/connect/ConnectPage';
import AgentsPage from '@/pages/dashboard/agents/AgentsPage';
import Profile from '@/pages/dashboard/profile/Profile';
import Admin from '@/pages/admin/Admin';
import UsuariosCadastros from '@/pages/admin/UsuariosCadastros';
import UsuariosTipos from '@/pages/admin/UsuariosTipos';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />
          <Route path="/dashboard/leads" element={
            <AuthGuard>
              <LeadsPage />
            </AuthGuard>
          } />
          <Route path="/dashboard/leads/funnel" element={
            <AuthGuard>
              <LeadsFunnel />
            </AuthGuard>
          } />
          <Route path="/dashboard/messages" element={
            <AuthGuard>
              <WhatsAppChat />
            </AuthGuard>
          } />
          <Route path="/dashboard/connect" element={
            <AuthGuard>
              <ConnectPage />
            </AuthGuard>
          } />
          <Route path="/dashboard/agents" element={
            <AuthGuard>
              <AgentsPage />
            </AuthGuard>
          } />
          <Route path="/dashboard/profile" element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          } />
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <AuthGuard>
              <Admin />
            </AuthGuard>
          } />
          <Route path="/admin/usuarios" element={
            <AuthGuard>
              <UsuariosCadastros />
            </AuthGuard>
          } />
          <Route path="/admin/usuarios-tipos" element={
            <AuthGuard>
              <UsuariosTipos />
            </AuthGuard>
          } />
          
          {/* 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
