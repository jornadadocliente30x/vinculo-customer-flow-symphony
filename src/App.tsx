
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute';

// Pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/dashboard/Dashboard';
import LeadsPage from '@/pages/dashboard/leads/LeadsPage';
import LeadsFunnel from '@/pages/dashboard/leads/LeadsFunnel';
import LeadsImportPage from '@/pages/dashboard/leads/LeadsImportPage';
import WhatsAppChat from '@/pages/dashboard/messages/WhatsAppChat';
import ConnectPage from '@/pages/dashboard/connect/ConnectPage';
import AgentsPage from '@/pages/dashboard/agents/AgentsPage';
import Profile from '@/pages/dashboard/profile/Profile';

// Auth Pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';

// Admin Pages
import Admin from '@/pages/admin/Admin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminTemp from '@/pages/admin/AdminTemp';
import UsuariosCadastros from '@/pages/admin/UsuariosCadastros';
import UsuariosCadastrosPage from '@/pages/admin/UsuariosCadastrosPage';
import UsuariosTipos from '@/pages/admin/UsuariosTipos';

import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/leads" element={
            <ProtectedRoute>
              <LeadsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/leads/funnel" element={
            <ProtectedRoute>
              <LeadsFunnel />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/leads/import" element={
            <ProtectedRoute>
              <LeadsImportPage />
            </ProtectedRoute>
          } />
          
          {/* Corrigindo rota para automação/agentes */}
          <Route path="/dashboard/automations/agents" element={
            <ProtectedRoute>
              <AgentsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/agents" element={
            <ProtectedRoute>
              <AgentsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/connect" element={
            <ProtectedRoute>
              <ConnectPage />
            </ProtectedRoute>
          } />
          
          {/* Corrigindo rotas para mensagens/conversas */}
          <Route path="/dashboard/messages" element={
            <ProtectedRoute>
              <WhatsAppChat />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/messages/whatsapp" element={
            <ProtectedRoute>
              <WhatsAppChat />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes - Protected by both auth and admin role */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/temp" element={
            <ProtectedRoute>
              <AdminProtectedRoute>
                <AdminTemp />
              </AdminProtectedRoute>
            </ProtectedRoute>
          } />
          
          {/* Corrigindo rotas para usuários */}
          <Route path="/admin/usuarios" element={
            <ProtectedRoute>
              <AdminProtectedRoute>
                <UsuariosCadastros />
              </AdminProtectedRoute>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/usuarios/cadastros" element={
            <ProtectedRoute>
              <AdminProtectedRoute>
                <UsuariosCadastros />
              </AdminProtectedRoute>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/usuarios/tipos" element={
            <ProtectedRoute>
              <AdminProtectedRoute>
                <UsuariosTipos />
              </AdminProtectedRoute>
            </ProtectedRoute>
          } />
          
          {/* Manter rotas antigas para compatibilidade */}
          <Route path="/admin/usuarios-cadastros" element={
            <ProtectedRoute>
              <AdminProtectedRoute>
                <UsuariosCadastros />
              </AdminProtectedRoute>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/usuarios-cadastros-page" element={
            <ProtectedRoute>
              <AdminProtectedRoute>
                <UsuariosCadastrosPage />
              </AdminProtectedRoute>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/usuarios-tipos" element={
            <ProtectedRoute>
              <AdminProtectedRoute>
                <UsuariosTipos />
              </AdminProtectedRoute>
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
