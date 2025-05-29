
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MessageScript } from '@/types/messages';

interface ScriptsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveScript: (script: Omit<MessageScript, 'id'>) => void;
}

const mockScripts: MessageScript[] = [
  {
    id: '1',
    title: 'Boas-vindas',
    content: 'Olá! Seja bem-vindo(a). Como posso ajudá-lo(a) hoje?',
  },
  {
    id: '2',
    title: 'Agendamento',
    content: 'Vamos agendar sua consulta? Que dia e horário seria melhor para você?',
  },
  {
    id: '3',
    title: 'Despedida',
    content: 'Obrigado pelo contato! Até breve!',
  },
];

export function ScriptsModal({ isOpen, onClose, onSaveScript }: ScriptsModalProps) {
  const [scripts] = useState<MessageScript[]>(mockScripts);
  const [selectedScript, setSelectedScript] = useState<MessageScript | null>(null);

  const handleSelectScript = (script: MessageScript) => {
    setSelectedScript(script);
  };

  const handleUseScript = () => {
    if (selectedScript) {
      // Aqui você copiaria o script para a área de transferência ou o enviaria diretamente
      navigator.clipboard.writeText(selectedScript.content);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Scripts de Mensagem</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-3">
            {scripts.map((script) => (
              <Card 
                key={script.id} 
                className={`cursor-pointer transition-all ${
                  selectedScript?.id === script.id ? 'ring-2 ring-brand-500' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSelectScript(script)}
              >
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{script.title}</h3>
                  <p className="text-sm text-gray-600">{script.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedScript && (
            <div className="border-t pt-4">
              <Label className="text-sm font-medium">Script Selecionado:</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded">
                <h4 className="font-medium">{selectedScript.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedScript.content}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button 
              onClick={handleUseScript}
              disabled={!selectedScript}
              className="bg-gradient-brand hover:opacity-90"
            >
              Copiar Script
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
