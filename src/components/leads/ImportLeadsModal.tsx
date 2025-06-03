
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { ImportConfig, ChatStage, ContactTag } from '@/types/leads';
import { stageLabels, tagLabels } from '@/data/mockLeadsData';
import { mockAgents } from '@/data/mockAgents';
import { ImportHistoryPanel } from './ImportHistoryPanel';

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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Gerenciar Importações
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          {/* Left Side - Import Form */}
          <div className="space-y-6 overflow-y-auto pr-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Nova Importação</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">Arquivo Excel</Label>
                  <div className="mt-1">
                    <input
                      id="file"
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('file')?.click()}
                      className="w-full justify-start h-12 border-dashed border-2 border-gray-300 hover:border-gray-400"
                    >
                      <FileSpreadsheet className="w-5 h-5 mr-3 text-gray-500" />
                      <div className="text-left">
                        {file ? (
                          <div>
                            <div className="font-medium text-gray-900">{file.name}</div>
                            <div className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="font-medium text-gray-600">Selecionar arquivo</div>
                            <div className="text-xs text-gray-500">Excel, CSV até 10MB</div>
                          </div>
                        )}
                      </div>
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="importName">Nome da Importação</Label>
                  <Input
                    id="importName"
                    value={importName}
                    onChange={(e) => setImportName(e.target.value)}
                    placeholder="Ex: Leads Janeiro 2025"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Chat</Label>
                  <Select value={selectedTag} onValueChange={(value: ContactTag) => setSelectedTag(value)}>
                    <SelectTrigger className="mt-1">
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
                  <Label>Etapa</Label>
                  <Select value={defaultStage} onValueChange={(value: ChatStage) => setDefaultStage(value)}>
                    <SelectTrigger className="mt-1">
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

                <div>
                  <Label>Agente</Label>
                  <Select value={automationAgent} onValueChange={setAutomationAgent}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecionar agente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Sem automação</SelectItem>
                      {mockAgents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" onClick={handleClose} className="flex-1">
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!importName || !file}
                    className="flex-1"
                  >
                    Iniciar Importação
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Import History */}
          <div className="border-l border-gray-200 pl-6 overflow-y-auto">
            <ImportHistoryPanel />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
