
import { lazy } from 'react';

// Dashboard pages
export const Dashboard = lazy(() => import('./dashboard/Dashboard'));
export const LeadsPage = lazy(() => import('./dashboard/leads/LeadsPage'));
export const LeadsFunnel = lazy(() => import('./dashboard/leads/LeadsFunnel'));
export const LeadsImportPage = lazy(() => import('./dashboard/leads/LeadsImportPage'));
export const WhatsAppChat = lazy(() => import('./dashboard/messages/WhatsAppChat'));
export const AgentsPage = lazy(() => import('./dashboard/agents/AgentsPage'));
export const ConnectPage = lazy(() => import('./dashboard/connect/ConnectPage'));
export const Profile = lazy(() => import('./dashboard/profile/Profile'));

// Auth pages
export const Login = lazy(() => import('./auth/Login'));
export const Register = lazy(() => import('./auth/Register'));
export const ForgotPassword = lazy(() => import('./auth/ForgotPassword'));
export const ResetPassword = lazy(() => import('./auth/ResetPassword'));

// Admin pages
export const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
export const UsuariosCadastros = lazy(() => import('./admin/UsuariosCadastros'));
export const UsuariosTipos = lazy(() => import('./admin/UsuariosTipos'));
