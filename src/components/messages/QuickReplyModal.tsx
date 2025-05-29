
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Reply, Send } from 'lucide-react';

interface QuickReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalMessage: string;
  contactName: string;
  onSendReply: (reply: string) => void;
}

export function QuickReplyModal({
  isOpen,
  onClose,
  originalMessage,
  contactName,
  onSendReply
}: QuickReplyModalProps) {
  const [replyText, setReplyText] = useState('');

  const handleSend = () => {
    if (replyText.trim()) {
      onSendReply(replyText);
      setReplyText('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Reply className="w-5 h-5 text-brand-500" />
            <span>Responder Mensagem</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Respondendo para {contactName}:
            </Label>
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border-l-4 border-brand-200">
              <p className="text-sm text-gray-600 italic">"{originalMessage}"</p>
            </div>
          </div>

          <div>
            <Label htmlFor="reply">Sua resposta</Label>
            <Textarea
              id="reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Digite sua resposta..."
              rows={3}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSend}
              disabled={!replyText.trim()}
              className="bg-gradient-brand hover:opacity-90"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Resposta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
