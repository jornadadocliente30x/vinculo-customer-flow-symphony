import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Pencil, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

interface User {
  id: number;
  name: string;
  email: string;
  type: 'Administrador' | 'Cliente';
}

const initialUsers: User[] = [
  { id: 1, name: 'Paulo Barreto', email: 'paulo@vinculo.com', type: 'Administrador' },
  { id: 2, name: 'Maria Silva', email: 'maria@vinculo.com', type: 'Cliente' },
  { id: 3, name: 'João Souza', email: 'joao@vinculo.com', type: 'Cliente' },
];

export default function UsuariosCadastros() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: '', email: '', type: 'Cliente' });

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.type.toLowerCase().includes(search.toLowerCase())
  );

  function handleOpenCreate() {
    setEditUser(null);
    setForm({ name: '', email: '', type: 'Cliente' });
    setOpen(true);
  }

  function handleOpenEdit(user: User) {
    setEditUser(user);
    setForm({ name: user.name, email: user.email, type: user.type });
    setOpen(true);
  }

  function handleSave() {
    if (form.name && form.email) {
      if (editUser) {
        setUsers(users.map(u =>
          u.id === editUser.id ? { ...editUser, ...form, type: form.type as 'Administrador' | 'Cliente' } : u
        ));
      } else {
        setUsers([
          ...users,
          { id: Date.now(), ...form, type: form.type as 'Administrador' | 'Cliente' } as User
        ]);
      }
      setOpen(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <Card className="p-6 mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-semibold flex items-center bg-gradient-brand bg-clip-text text-transparent">
              <UserPlus className="w-6 h-6 mr-2" /> Cadastros de Usuários
            </h2>
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Filtrar por nome, e-mail ou tipo..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-64"
              />
              <Button onClick={handleOpenCreate} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <UserPlus className="w-4 h-4 mr-2" /> Novo Usuário
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-soft">
            <table className="min-w-full bg-white text-left">
              <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-700">Nome</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">E-mail</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Tipo</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={user.type === 'Administrador' ? 'text-blue-600 font-bold' : 'text-purple-600 font-semibold'}>
                        {user.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button size="sm" variant="outline" onClick={() => handleOpenEdit(user)}>
                        <Pencil className="w-4 h-4 mr-1" /> Editar
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-8">Nenhum usuário encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editUser ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Nome"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
                <Input
                  placeholder="E-mail"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  type="email"
                />
                <select
                  className="w-full border rounded px-3 py-2"
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value as User['type'] }))}
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Cliente">Cliente</option>
                </select>
              </div>
              <DialogFooter>
                <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    </DashboardLayout>
  );
}
