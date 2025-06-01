import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Pencil, UserPlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  type: 'Administrador' | 'Cliente';
}

const initialUsers: User[] = [
  { id: 1, name: 'Paulo Barreto', email: 'paulo@dentis.com', phone: '(11) 99999-9999', type: 'Administrador' },
  { id: 2, name: 'Maria Silva', email: 'maria@dentis.com', phone: '(11) 88888-8888', type: 'Cliente' },
  { id: 3, name: 'João Souza', email: 'joao@dentis.com', phone: '(11) 77777-7777', type: 'Cliente' },
];

export default function UsuariosCadastros() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', photo: '', type: 'Cliente' });

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.toLowerCase().includes(search.toLowerCase()) ||
    u.type.toLowerCase().includes(search.toLowerCase())
  );

  function handleOpenCreate() {
    setEditUser(null);
    setForm({ name: '', email: '', phone: '', photo: '', type: 'Cliente' });
    setOpen(true);
  }

  function handleOpenEdit(user: User) {
    setEditUser(user);
    setForm({ name: user.name, email: user.email, phone: user.phone, photo: user.photo || '', type: user.type });
    setOpen(true);
  }

  function handleDelete(user: User) {
    setDeleteConfirm(user);
  }

  function confirmDelete() {
    if (deleteConfirm) {
      setUsers(users.filter(u => u.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  }

  function handleSave() {
    if (form.name && form.email && form.phone) {
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
    <div className="space-y-8 animate-fade-in">
      <Card className="p-6 mt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold flex items-center bg-gradient-brand bg-clip-text text-transparent">
            <UserPlus className="w-6 h-6 mr-2" /> Cadastros de Usuários
          </h2>
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Filtrar por nome, e-mail, telefone ou tipo..."
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
                  <th className="px-6 py-3 font-semibold text-gray-700">Foto</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Nome</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">E-mail</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Telefone</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Tipo</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.photo ? (
                        <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={user.type === 'Administrador' ? 'text-blue-600 font-bold' : 'text-purple-600 font-semibold'}>
                        {user.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleOpenEdit(user)}>
                          <Pencil className="w-4 h-4 mr-1" /> Editar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(user)} className="text-red-600 hover:text-red-700 hover:border-red-300">
                          <Trash2 className="w-4 h-4 mr-1" /> Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-400 py-8">Nenhum usuário encontrado.</td>
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
                <Input
                  placeholder="Telefone"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  type="tel"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto do Usuário
                  </label>
                  <FileUpload
                    value={form.photo}
                    onChange={(file, url) => {
                      setForm(f => ({ ...f, photo: url || '' }));
                    }}
                    placeholder="Selecionar foto..."
                  />
                </div>
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

          <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
              </DialogHeader>
              <p>Tem certeza que deseja excluir o usuário <strong>{deleteConfirm?.name}</strong>?</p>
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
        </Card>
      </div>
    );
}
