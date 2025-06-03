
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, AlertTriangle } from 'lucide-react';
import { Lead } from '@/types/database';

interface DeleteLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onDelete: (leadId: number) => void;
}

export function DeleteLeadModal({ isOpen, onClose, lead, onDelete }: DeleteLeadModalProps) {
  const handleDelete = () => {
    if (lead) {
      onDelete(lead.id);
      onClose();
    }
  };

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <Trash2 className="w-5 h-5 mr-2" />
            Excluir Lead
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">
                Atenção! Esta ação não pode ser desfeita.
              </p>
              <p className="text-sm text-red-700">
                Você está prestes a excluir o lead:
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">
              {lead.nome}
            </p>
            <p className="text-sm text-gray-600">{lead.email || 'Sem email'}</p>
            <p className="text-sm text-gray-600">{lead.telefone}</p>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete} 
              className="flex-1"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
