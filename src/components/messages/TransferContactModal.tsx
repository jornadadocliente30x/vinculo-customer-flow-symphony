
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from '@/types/messages';
import { mockUsers } from '@/data/mockConversations';

interface TransferContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  contactName: string;
  onTransfer: (userId: string) => void;
}

export function TransferContactModal({ 
  isOpen, 
  onClose, 
  conversationId, 
  contactName,
  onTransfer 
}: TransferContactModalProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleTransfer = () => {
    if (selectedUser) {
      onTransfer(selectedUser.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Transferir Contato</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">
              Transferindo contato: <span className="font-bold">{contactName}</span>
            </Label>
          </div>

          <div>
            <Label className="text-sm">Selecionar usuário:</Label>
            <div className="space-y-2 mt-2">
              {mockUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer border transition-all ${
                    selectedUser?.id === user.id 
                      ? 'border-brand-500 bg-brand-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleTransfer}
              disabled={!selectedUser}
              className="bg-gradient-brand hover:opacity-90"
            >
              Transferir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
