import { UserCog } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pencil, Plus } from 'lucide-react';
import { useState } from 'react';

interface UserType {
  id: number;
  type: string;
  description: string;
}

const initialTypes: UserType[] = [
  { id: 1, type: 'Administrador', description: 'Acesso total à plataforma, pode gerenciar usuários e configurações.' },
  { id: 2, type: 'Cliente', description: 'Acesso restrito às funcionalidades de cliente.' },
];

export default function UsuariosTipos() {
  const [types, setTypes] = useState<UserType[]>(initialTypes);
  const [open, setOpen] = useState(false);
  const [editType, setEditType] = useState<UserType | null>(null);
  const [form, setForm] = useState({ type: '', description: '' });

  function handleOpenCreate() {
    setEditType(null);
    setForm({ type: '', description: '' });
    setOpen(true);
  }

  function handleOpenEdit(userType: UserType) {
    setEditType(userType);
    setForm({ type: userType.type, description: userType.description });
    setOpen(true);
  }

  function handleSave() {
    if (form.type && form.description) {
      if (editType) {
        setTypes(types.map(t => t.id === editType.id ? { ...editType, ...form } : t));
      } else {
        setTypes([...types, { id: Date.now(), ...form }]);
      }
      setOpen(false);
    }
  }

  return (
    <Card className="p-6 mt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold flex items-center bg-gradient-brand bg-clip-text text-transparent">
          <Plus className="w-6 h-6 mr-2" /> Tipos de Usuários
        </h2>
        <Button onClick={handleOpenCreate} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Plus className="w-4 h-4 mr-2" /> Novo Tipo
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {types.map((ut) => (
          <div key={ut.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-gray-100 shadow-soft flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-blue-700">{ut.type}</div>
              <Button size="sm" variant="outline" onClick={() => handleOpenEdit(ut)}>
                <Pencil className="w-4 h-4 mr-1" /> Editar
              </Button>
            </div>
            <div className="text-gray-700">{ut.description}</div>
          </div>
        ))}
        {types.length === 0 && (
          <div className="col-span-2 text-center text-gray-400 py-8">Nenhum tipo de usuário cadastrado.</div>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editType ? 'Editar Tipo de Usuário' : 'Novo Tipo de Usuário'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Tipo (ex: Administrador)"
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            />
            <Input
              placeholder="Descrição"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
