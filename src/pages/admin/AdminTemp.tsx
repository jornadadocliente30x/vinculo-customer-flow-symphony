// filepath: /Users/paulobarreto/Documents/GitHub/vinculo-customer-flow-symphony/src/pages/admin/Admin.tsx
import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import UsuariosCadastros from './UsuariosCadastros';
import UsuariosTipos from './UsuariosTipos';
import AdminDashboard from './AdminDashboard';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'usuarios':
        return <UsuariosCadastros />;
      case 'tipos':
        return <UsuariosTipos />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header com navegação */}
        <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-100 shadow-soft">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Administração
          </h1>
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'outline'}
              onClick={() => setActiveTab('dashboard')}
              className={activeTab === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''}
            >
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'usuarios' ? 'default' : 'outline'}
              onClick={() => setActiveTab('usuarios')}
              className={activeTab === 'usuarios' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''}
            >
              Usuários
            </Button>
            <Button
              variant={activeTab === 'tipos' ? 'default' : 'outline'}
              onClick={() => setActiveTab('tipos')}
              className={activeTab === 'tipos' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''}
            >
              Tipos de Usuário
            </Button>
          </div>
        </div>

        {/* Conteúdo da aba ativa */}
        <div className="min-h-screen">
          {renderContent()}
        </div>
      </div>
    </DashboardLayout>
  );
}
