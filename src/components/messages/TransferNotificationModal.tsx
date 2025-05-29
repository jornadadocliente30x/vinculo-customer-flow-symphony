
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TransferRequest } from '@/types/messages';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';

interface TransferNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  transferRequests: TransferRequest[];
  onAcceptTransfer: (requestId: string) => void;
  onRejectTransfer: (requestId: string) => void;
}

export function TransferNotificationModal({ 
  isOpen, 
  onClose, 
  transferRequests,
  onAcceptTransfer,
  onRejectTransfer
}: TransferNotificationModalProps) {
  const pendingRequests = transferRequests.filter(req => req.status === 'pending');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Transferências Pendentes</span>
            {pendingRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingRequests.length}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-96">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhuma transferência pendente</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{request.contactName}</p>
                      <p className="text-sm text-gray-600">
                        De: <span className="font-medium">{request.fromUser}</span>
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {request.requestedAt.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      Pendente
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      onClick={() => onAcceptTransfer(request.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Aceitar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => onRejectTransfer(request.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Recusar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
