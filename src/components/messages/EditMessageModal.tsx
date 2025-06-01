import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatMessage } from '@/types/messages';

interface EditMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: ChatMessage;
  onEditMessage?: (messageId: string, newContent: string) => void;
}

export function EditMessageModal({ 
  isOpen, 
  onClose, 
  message,
  onEditMessage 
}: EditMessageModalProps) {
  const [editedContent, setEditedContent] = useState(message.content || '');

  const handleSave = () => {
    if (editedContent.trim() && onEditMessage) {
      onEditMessage(message.id, editedContent.trim());
    }
    onClose();
  };

  const handleCancel = () => {
    setEditedContent(message.content || '');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Mensagem</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Conteúdo da mensagem
            </label>
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Digite o novo conteúdo da mensagem..."
              className="min-h-[100px] resize-none"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!editedContent.trim() || editedContent === message.content}
            >
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
