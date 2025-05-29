
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FunnelStage } from '@/types/messages';

interface StepsModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  currentStage?: FunnelStage;
  onUpdateStage: (stage: FunnelStage) => void;
}

// Etapas atualizadas da jornada do paciente
const journeyStages: FunnelStage[] = [
  {
    id: 'assimilacao',
    name: 'Assimilação',
    color: '#3B82F6', // blue-500
    order: 1,
  },
  {
    id: 'utilizacao',
    name: 'Utilização',
    color: '#10B981', // green-500
    order: 2,
  },
  {
    id: 'adocao',
    name: 'Adoção',
    color: '#F59E0B', // yellow-500
    order: 3,
  },
  {
    id: 'expansao',
    name: 'Expansão',
    color: '#8B5CF6', // purple-500
    order: 4,
  },
  {
    id: 'evangelismo',
    name: 'Evangelismo',
    color: '#EF4444', // red-500
    order: 5,
  },
];

export function StepsModal({ isOpen, onClose, conversationId, currentStage, onUpdateStage }: StepsModalProps) {
  const [selectedStage, setSelectedStage] = useState<FunnelStage | undefined>(currentStage);

  const handleStageSelect = (stage: FunnelStage) => {
    setSelectedStage(stage);
    onUpdateStage(stage);
    onClose();
  };

  const getStageDescription = (stageId: string) => {
    const descriptions = {
      assimilacao: 'Paciente conhece a clínica e serviços oferecidos',
      utilizacao: 'Paciente utiliza os serviços pela primeira vez',
      adocao: 'Paciente adota os serviços de forma regular',
      expansao: 'Paciente contrata serviços adicionais ou premium',
      evangelismo: 'Paciente recomenda a clínica para outros'
    };
    return descriptions[stageId as keyof typeof descriptions] || '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Etapas da Jornada do Paciente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {journeyStages.map((stage) => (
            <Button
              key={stage.id}
              variant={selectedStage?.id === stage.id ? "default" : "outline"}
              onClick={() => handleStageSelect(stage)}
              className="w-full justify-start p-4 h-auto text-left"
              style={{
                backgroundColor: selectedStage?.id === stage.id ? stage.color : 'transparent',
                borderColor: stage.color,
                color: selectedStage?.id === stage.id ? 'white' : stage.color,
              }}
            >
              <div className="flex items-start space-x-3 w-full">
                <div 
                  className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
                  style={{ backgroundColor: stage.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{stage.name}</span>
                    <Badge variant="outline" className="text-xs">
                      Etapa {stage.order}
                    </Badge>
                  </div>
                  <p className="text-xs opacity-80">
                    {getStageDescription(stage.id)}
                  </p>
                </div>
              </div>
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
