
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Clock, User, FileText } from 'lucide-react';

interface VideoCallSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  callDuration: string;
  participantName: string;
  onSaveSummary: (summary: string) => void;
}

export function VideoCallSummaryModal({
  isOpen,
  onClose,
  callDuration,
  participantName,
  onSaveSummary
}: VideoCallSummaryModalProps) {
  const [summary, setSummary] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const handleSave = () => {
    const fullSummary = `
RESUMO DA VIDEOCHAMADA

Participante: ${participantName}
Duração: ${callDuration}
Data: ${new Date().toLocaleString('pt-BR')}

DIAGNÓSTICO/OBSERVAÇÕES:
${diagnosis}

RECOMENDAÇÕES:
${recommendations}

RESUMO GERAL:
${summary}
    `.trim();

    onSaveSummary(fullSummary);
    setSummary('');
    setDiagnosis('');
    setRecommendations('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Video className="w-5 h-5 text-blue-500" />
            <span>Resumo da Videochamada</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Call Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{participantName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{callDuration}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Chamada Finalizada
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Diagnosis */}
          <div>
            <Label htmlFor="diagnosis">Diagnóstico/Observações</Label>
            <Textarea
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Descreva as observações médicas e diagnóstico da consulta..."
              rows={3}
            />
          </div>

          {/* Recommendations */}
          <div>
            <Label htmlFor="recommendations">Recomendações</Label>
            <Textarea
              id="recommendations"
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              placeholder="Liste as recomendações, prescrições e orientações para o paciente..."
              rows={3}
            />
          </div>

          {/* Summary */}
          <div>
            <Label htmlFor="summary">Resumo Geral</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Adicione um resumo geral da consulta e próximos passos..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!summary.trim() && !diagnosis.trim() && !recommendations.trim()}
              className="bg-gradient-brand hover:opacity-90"
            >
              <FileText className="w-4 h-4 mr-2" />
              Salvar Resumo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
