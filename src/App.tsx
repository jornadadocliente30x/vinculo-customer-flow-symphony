
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
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
import LeadsFunnel from "./pages/dashboard/leads/LeadsFunnel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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

        <Route path="/dashboard/leads/funnel" element={
          <ProtectedRoute>
            <LeadsFunnel />
          </ProtectedRoute>
        } />

        {/* Temporary redirects for new menu items - will redirect to main dashboard until pages are created */}
        <Route path="/dashboard/leads" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard/automations" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard/messages" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard/templates" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard/analytics" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard/settings" element={<Navigate to="/dashboard" replace />} />

        {/* Redirect any other /dashboard/* to /dashboard */}
        <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
