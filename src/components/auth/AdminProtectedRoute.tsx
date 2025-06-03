
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { user, isAuthenticated } = useAuthStore();

  // Verificar se o usuário está logado
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-md mx-auto text-center">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
          <p className="text-gray-600">
            Você precisa estar logado para acessar esta área.
          </p>
        </Card>
      </div>
    );
  }

  // Verificar se o usuário tem permissões de admin baseado no role
  const isAdmin = user.role === 'admin' || user.role === 'manager';

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-md mx-auto text-center">
          <ShieldAlert className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">
            Esta área é exclusiva para administradores e gerentes.
          </p>
          <div className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
            <p><strong>Usuário:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Empresa:</strong> {user.company || 'Não informada'}</p>
            <p><strong>Nível:</strong> {user.role}</p>
            <p><strong>Nível ID:</strong> {user.nivelUsuarioId}</p>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
