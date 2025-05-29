
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FileSpreadsheet, Download } from 'lucide-react';
import { ExportConfig } from '@/types/leads';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (config: ExportConfig) => void;
}

const availableFields = [
  { id: 'firstName', label: 'Nome' },
  { id: 'lastName', label: 'Sobrenome' },
  { id: 'phone', label: 'Telefone' },
  { id: 'email', label: 'Email' },
  { id: 'stage', label: 'Etapa' },
  { id: 'status', label: 'Status' },
  { id: 'origin', label: 'Origem' },
  { id: 'conversionDate', label: 'Data de Conversão' },
  { id: 'tag', label: 'Tag' },
  { id: 'notes', label: 'Observações' },
  { id: 'createdAt', label: 'Data de Criação' },
  { id: 'updatedAt', label: 'Última Atualização' },
];

export function ExportReportModal({ isOpen, onClose, onExport }: ExportReportModalProps) {
  const [selectedFields, setSelectedFields] = useState<string[]>([
    'firstName', 'lastName', 'phone', 'email', 'stage', 'status'
  ]);

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleSelectAll = () => {
    setSelectedFields(availableFields.map(field => field.id));
  };

  const handleSelectNone = () => {
    setSelectedFields([]);
  };

  const handleExport = () => {
    const config: ExportConfig = {
      fields: selectedFields,
      format: 'excel',
    };

    onExport(config);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileSpreadsheet className="w-5 h-5 mr-2" />
            Exportar Relatório
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-3">
              <Label>Campos para Exportar</Label>
              <div className="space-x-2">
                <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                  Todos
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSelectNone}>
                  Nenhum
                </Button>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    checked={selectedFields.includes(field.id)}
                    onCheckedChange={() => handleFieldToggle(field.id)}
                  />
                  <Label htmlFor={field.id} className="text-sm font-normal">
                    {field.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleExport}
              disabled={selectedFields.length === 0}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
