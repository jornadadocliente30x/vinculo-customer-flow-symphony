
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

  const handleStageSelect = (stage: FunnelStage) => {
    setSelectedStage(stage);
    onUpdateStage(stage);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Etapas do Funil</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {mockStages.map((stage) => (
            <Button
              key={stage.id}
              variant={selectedStage?.id === stage.id ? "default" : "outline"}
              onClick={() => handleStageSelect(stage)}
              className="w-full justify-start"
              style={{
                backgroundColor: selectedStage?.id === stage.id ? stage.color : 'transparent',
                borderColor: stage.color,
                color: selectedStage?.id === stage.id ? 'white' : stage.color,
              }}
            >
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: stage.color }}
              />
              {stage.name}
            </Button>
          ))}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
