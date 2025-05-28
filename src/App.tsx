
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Public pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard pages
import Dashboard from "./pages/dashboard/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          
          {/* Auth routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          
          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* Placeholder routes for future development */}
          <Route path="/dashboard/leads" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Leads - Em Desenvolvimento</h1>
                <p className="text-gray-600 mt-2">Esta página será implementada em breve</p>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/chat" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Chat - Em Desenvolvimento</h1>
                <p className="text-gray-600 mt-2">Esta página será implementada em breve</p>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/contacts" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Contatos - Em Desenvolvimento</h1>
                <p className="text-gray-600 mt-2">Esta página será implementada em breve</p>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/automation" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Automação - Em Desenvolvimento</h1>
                <p className="text-gray-600 mt-2">Esta página será implementada em breve</p>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/templates" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Templates - Em Desenvolvimento</h1>
                <p className="text-gray-600 mt-2">Esta página será implementada em breve</p>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/campaigns" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Campanhas - Em Desenvolvimento</h1>
                <p className="text-gray-600 mt-2">Esta página será implementada em breve</p>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/analytics" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Analytics - Em Desenvolvimento</h1>
                <p className="text-gray-600 mt-2">Esta página será implementada em breve</p>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/reports" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Relatórios - Em Desenvolvimento</h1>
                <p className="text-gray-600 mt-2">Esta página será implementada em breve</p>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/settings" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Configurações - Em Desenvolvimento</h1>
                <p className="text-gray-600 mt-2">Esta página será implementada em breve</p>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/settings/account" element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Conta - Em Desenvolvimento</h1>
                <p className="text-gray-600 mt-2">Esta página será implementada em breve</p>
              </div>
            </ProtectedRoute>
          } />

          {/* Redirect /dashboard/* to /dashboard */}
          <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
