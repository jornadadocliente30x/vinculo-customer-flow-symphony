
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute';
import { MemberAccessDenied } from '@/components/auth/MemberAccessDenied';
import { useAuthStore } from '@/stores/authStore';

function UsuariosTiposContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 text-left">Tipos de Usuários</h1>
        <p className="mt-2 text-gray-600 text-left">
          Gerencie os tipos e níveis de usuários do sistema
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-500 text-left">
            Funcionalidade de gerenciamento de tipos de usuários em desenvolvimento.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UsuariosTipos() {
  const { user } = useAuthStore();

  // Verificar se o usuário tem acesso admin
  const hasAdminAccess = user && (
    user.role === 'admin' || 
    user.role === 'manager' || 
    user.nivelUsuarioId === 1
  );

  if (!hasAdminAccess) {
    return <MemberAccessDenied />;
  }

  return (
    <AdminProtectedRoute>
      <DashboardLayout>
        <UsuariosTiposContent />
      </DashboardLayout>
    </AdminProtectedRoute>
  );
}
