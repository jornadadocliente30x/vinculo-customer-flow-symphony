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

  // Verificar se o usuário é da empresa Vinculo
  const isVinculoUser = user.company?.toLowerCase().includes('vinculo') || 
                       user.email.includes('@vinculo.com.br') ||
                       user.role === 'admin';

  if (!isVinculoUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-md mx-auto text-center">
          <ShieldAlert className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">
            Esta área é exclusiva para usuários da empresa Vinculo.
          </p>
          <div className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
            <p><strong>Usuário:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Empresa:</strong> {user.company || 'Não informada'}</p>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
