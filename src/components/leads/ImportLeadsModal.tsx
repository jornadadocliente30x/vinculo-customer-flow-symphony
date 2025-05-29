
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { ImportConfig, ChatStage, ContactTag } from '@/types/leads';
import { stageLabels, tagLabels } from '@/data/mockLeadsData';

interface ImportLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (config: ImportConfig) => void;
}

export function ImportLeadsModal({ isOpen, onClose, onImport }: ImportLeadsModalProps) {
  const [importName, setImportName] = useState('');
  const [selectedTag, setSelectedTag] = useState<ContactTag>('lead');
  const [automationAgent, setAutomationAgent] = useState('');
  const [defaultStage, setDefaultStage] = useState<ChatStage>('assimilacao');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!importName || !file) return;

    const config: ImportConfig = {
      fileName: file.name,
      importName,
      selectedTag,
      automationAgent: automationAgent || undefined,
      defaultStage,
    };

    onImport(config);
    handleClose();
  };

  const handleClose = () => {
    setImportName('');
    setSelectedTag('lead');
    setAutomationAgent('');
    setDefaultStage('assimilacao');
    setFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Importar Leads
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="file">Arquivo Excel</Label>
            <div className="mt-1">
              <input
                id="file"
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('file')?.click()}
                className="w-full justify-start"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                {file ? file.name : 'Selecionar arquivo'}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="importName">Nome da Importação</Label>
            <Input
              id="importName"
              value={importName}
              onChange={(e) => setImportName(e.target.value)}
              placeholder="Ex: Leads Janeiro 2024"
            />
          </div>

          <div>
            <Label>Tag</Label>
            <Select value={selectedTag} onValueChange={(value: ContactTag) => setSelectedTag(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(tagLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Agente de IA</Label>
            <Select value={automationAgent} onValueChange={setAutomationAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar agente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Sem automação</SelectItem>
                <SelectItem value="vendas">Agente de Vendas</SelectItem>
                <SelectItem value="suporte">Agente de Suporte</SelectItem>
                <SelectItem value="qualificacao">Agente de Qualificação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Etapa Inicial</Label>
            <Select value={defaultStage} onValueChange={(value: ChatStage) => setDefaultStage(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(stageLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!importName || !file}
              className="flex-1"
            >
              Importar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
