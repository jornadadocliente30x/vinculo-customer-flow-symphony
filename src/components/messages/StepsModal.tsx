
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FunnelStage } from '@/types/messages';
import { mockStages } from '@/data/mockConversations';

interface StepsModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  currentStage?: FunnelStage;
  onUpdateStage: (stage: FunnelStage) => void;
}

export function StepsModal({ isOpen, onClose, conversationId, currentStage, onUpdateStage }: StepsModalProps) {
  const [selectedStage, setSelectedStage] = useState<FunnelStage | undefined>(currentStage);

  const handleSave = () => {
    if (selectedStage) {
      onUpdateStage(selectedStage);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Selecionar Etapa</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            {mockStages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage)}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                  selectedStage?.id === stage.id
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="font-medium">{stage.name}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!selectedStage}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
