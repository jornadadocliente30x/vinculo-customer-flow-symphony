
import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute';
import { MemberAccessDenied } from '@/components/auth/MemberAccessDenied';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Pencil, Plus, Trash2, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserType {
  id: number;
  nome: string;
  descricao?: string;
  ordem: number;
  ativo: boolean;
  permissoes: Record<string, boolean>;
}

const initialUserTypes: UserType[] = [
  { 
    id: 1, 
    nome: 'Administrador', 
    descricao: 'Acesso total ao sistema', 
    ordem: 1, 
    ativo: true,
    permissoes: { 
      usuarios: true, 
      leads: true, 
      campanhas: true, 
      relatorios: true,
      configuracoes: true
    }
  },
  { 
    id: 2, 
    nome: 'Gerente', 
    descricao: 'Acesso de gerenciamento', 
    ordem: 2, 
    ativo: true,
    permissoes: { 
      usuarios: false, 
      leads: true, 
      campanhas: true, 
      relatorios: true,
      configuracoes: false
    }
  },
  { 
    id: 3, 
    nome: 'Operador', 
    descricao: 'Acesso básico', 
    ordem: 3, 
    ativo: true,
    permissoes: { 
      usuarios: false, 
      leads: true, 
      campanhas: false, 
      relatorios: false,
      configuracoes: false
    }
  },
];

const availablePermissions = [
  { key: 'usuarios', label: 'Gerenciar Usuários' },
  { key: 'leads', label: 'Gerenciar Leads' },
  { key: 'campanhas', label: 'Gerenciar Campanhas' },
  { key: 'relatorios', label: 'Visualizar Relatórios' },
  { key: 'configuracoes', label: 'Configurações do Sistema' },
];

function UsuariosTiposContent() {
  const [userTypes, setUserTypes] = useState<UserType[]>(initialUserTypes);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<UserType | null>(null);
  const [editUserType, setEditUserType] = useState<UserType | null>(null);
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    ordem: 0,
    ativo: true,
    permissoes: {} as Record<string, boolean>
  });

  const filteredUserTypes = userTypes.filter(ut =>
    ut.nome.toLowerCase().includes(search.toLowerCase()) ||
    (ut.descricao && ut.descricao.toLowerCase().includes(search.toLowerCase()))
  );

  function handleOpenCreate() {
    setEditUserType(null);
    setForm({
      nome: '',
      descricao: '',
      ordem: userTypes.length + 1,
      ativo: true,
      permissoes: availablePermissions.reduce((acc, perm) => ({
        ...acc,
        [perm.key]: false
      }), {})
    });
    setOpen(true);
  }

  function handleOpenEdit(userType: UserType) {
    setEditUserType(userType);
    setForm({
      nome: userType.nome,
      descricao: userType.descricao || '',
      ordem: userType.ordem,
      ativo: userType.ativo,
      permissoes: { ...userType.permissoes }
    });
    setOpen(true);
  }

  function handleDelete(userType: UserType) {
    setDeleteConfirm(userType);
  }

  function confirmDelete() {
    if (deleteConfirm) {
      setUserTypes(userTypes.filter(ut => ut.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  }

  function handleSave() {
    if (form.nome) {
      if (editUserType) {
        setUserTypes(userTypes.map(ut =>
          ut.id === editUserType.id ? { ...editUserType, ...form } : ut
        ));
      } else {
        setUserTypes([
          ...userTypes,
          { id: Date.now(), ...form } as UserType
        ]);
      }
      setOpen(false);
    }
  }

  function handlePermissionChange(permission: string, value: boolean) {
    setForm(f => ({
      ...f,
      permissoes: {
        ...f.permissoes,
        [permission]: value
      }
    }));
  }

  function toggleUserTypeStatus(userType: UserType) {
    setUserTypes(userTypes.map(ut =>
      ut.id === userType.id ? { ...ut, ativo: !ut.ativo } : ut
    ));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 text-left">Tipos de Usuários</h1>
        <p className="mt-2 text-gray-600 text-left">
          Gerencie os tipos e níveis de usuários do sistema
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h3 className="text-xl font-semibold text-gray-900">Gerenciar Tipos de Usuários</h3>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Filtrar por nome ou descrição..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64"
          />
          <Button onClick={handleOpenCreate} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Plus className="w-4 h-4 mr-2" /> Novo Tipo
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-soft">
        <table className="min-w-full bg-white text-left">
          <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">Nome</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Descrição</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Ordem</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Permissões</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserTypes.map((userType) => (
              <tr key={userType.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{userType.nome}</td>
                <td className="px-6 py-4">{userType.descricao || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{userType.ordem}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    className={`cursor-pointer ${userType.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    onClick={() => toggleUserTypeStatus(userType)}
                  >
                    {userType.ativo ? 'Ativo' : 'Inativo'}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(userType.permissoes || {}).filter(([_, value]) => value).map(([key]) => (
                      <Badge key={key} variant="outline" className="text-xs">
                        {availablePermissions.find(p => p.key === key)?.label || key}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleOpenEdit(userType)}>
                      <Pencil className="w-4 h-4 mr-1" /> Editar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(userType)} className="text-red-600 hover:text-red-700 hover:border-red-300">
                      <Trash2 className="w-4 h-4 mr-1" /> Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUserTypes.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-8">Nenhum tipo de usuário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editUserType ? 'Editar Tipo de Usuário' : 'Novo Tipo de Usuário'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nome do tipo"
              value={form.nome}
              onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
            />
            <Textarea
              placeholder="Descrição (opcional)"
              value={form.descricao}
              onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ordem</label>
                <Input
                  type="number"
                  value={form.ordem}
                  onChange={e => setForm(f => ({ ...f, ordem: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="ativo"
                  checked={form.ativo}
                  onChange={e => setForm(f => ({ ...f, ativo: e.target.checked }))}
                />
                <label htmlFor="ativo" className="text-sm font-medium text-gray-700">Ativo</label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissões</label>
              <div className="grid grid-cols-2 gap-2">
                {availablePermissions.map((permission) => (
                  <div key={permission.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={permission.key}
                      checked={form.permissoes[permission.key] || false}
                      onChange={e => handlePermissionChange(permission.key, e.target.checked)}
                    />
                    <label htmlFor={permission.key} className="text-sm text-gray-700">
                      {permission.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir o tipo de usuário <strong>{deleteConfirm?.nome}</strong>?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Button>
            <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
