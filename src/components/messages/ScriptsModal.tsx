
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MessageScript } from '@/types/messages';
import { Edit, Trash2, Plus, FileText, Image, Mic, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScriptsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUseScript: (content: string) => void;
}

const mockScripts: MessageScript[] = [
  {
    id: '1',
    title: 'Boas-vindas',
    content: 'Olá! Seja bem-vindo(a) à nossa clínica. Como posso ajudá-lo(a) hoje?',
  },
  {
    id: '2',
    title: 'Agendamento de Consulta',
    content: 'Vamos agendar sua consulta? Que dia e horário seria melhor para você? Temos disponibilidade de segunda a sexta das 8h às 18h.',
  },
  {
    id: '3',
    title: 'Confirmação de Agendamento',
    content: 'Sua consulta foi agendada com sucesso! Lembramos que é importante chegar 15 minutos antes do horário marcado.',
  },
  {
    id: '4',
    title: 'Despedida',
    content: 'Obrigado pelo contato! Qualquer dúvida, estamos sempre à disposição. Até breve!',
  },
];

export function ScriptsModal({ isOpen, onClose, onUseScript }: ScriptsModalProps) {
  const [scripts, setScripts] = useState<MessageScript[]>(mockScripts);
  const [selectedScript, setSelectedScript] = useState<MessageScript | null>(null);
  const [editingScript, setEditingScript] = useState<MessageScript | null>(null);
  
  // Criar novo script
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  
  // Editar script
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  
  const { toast } = useToast();

  const handleCreateScript = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast({
        title: "Erro",
        description: "Título e conteúdo são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const newScript: MessageScript = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
    };

    setScripts(prev => [...prev, newScript]);
    setNewTitle('');
    setNewContent('');
    
    toast({
      title: "Script criado",
      description: "Script criado com sucesso!",
    });
  };

  const handleEditScript = (script: MessageScript) => {
    setEditingScript(script);
    setEditTitle(script.title);
    setEditContent(script.content);
  };

  const handleSaveEdit = () => {
    if (!editingScript || !editTitle.trim() || !editContent.trim()) return;

    setScripts(prev => 
      prev.map(script => 
        script.id === editingScript.id 
          ? { ...script, title: editTitle, content: editContent }
          : script
      )
    );

    setEditingScript(null);
    setEditTitle('');
    setEditContent('');
    
    toast({
      title: "Script atualizado",
      description: "Script editado com sucesso!",
    });
  };

  const handleDeleteScript = (scriptId: string) => {
    if (confirm('Tem certeza que deseja excluir este script?')) {
      setScripts(prev => prev.filter(script => script.id !== scriptId));
      toast({
        title: "Script excluído",
        description: "Script removido com sucesso!",
      });
    }
  };

  const handleUseSelectedScript = (script: MessageScript) => {
    onUseScript(script.content);
    toast({
      title: "Script aplicado",
      description: "Script foi copiado para o campo de mensagem!",
    });
    onClose();
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Scripts de Mensagem
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="scripts-prontos" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scripts-prontos">Scripts Prontos</TabsTrigger>
              <TabsTrigger value="criar-script">Criar Script</TabsTrigger>
            </TabsList>

            {/* Aba Scripts Prontos */}
            <TabsContent value="scripts-prontos" className="space-y-4">
              <div className="max-h-[50vh] overflow-y-auto space-y-3">
                {scripts.map((script) => (
                  <Card 
                    key={script.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedScript?.id === script.id ? 'ring-2 ring-brand-500 bg-brand-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1" onClick={() => setSelectedScript(script)}>
                          <h3 className="font-semibold text-gray-900 mb-2">{script.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{script.content}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditScript(script)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit size={14} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Editar script</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteScript(script.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Excluir script</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedScript && (
                <div className="border-t pt-4">
                  <Label className="text-sm font-medium text-gray-900">Script Selecionado:</Label>
                  <div className="mt-2 p-4 bg-brand-50 rounded-lg border border-brand-200">
                    <h4 className="font-semibold text-brand-900">{selectedScript.title}</h4>
                    <p className="text-sm text-brand-800 mt-2">{selectedScript.content}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Fechar
                </Button>
                <Button 
                  onClick={() => selectedScript && handleUseSelectedScript(selectedScript)}
                  disabled={!selectedScript}
                  className="bg-gradient-brand hover:opacity-90"
                >
                  Usar Script
                </Button>
              </div>
            </TabsContent>

            {/* Aba Criar Script */}
            <TabsContent value="criar-script" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="script-title" className="text-sm font-medium">Título do Script</Label>
                  <Input
                    id="script-title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: Saudação inicial"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="script-content" className="text-sm font-medium">Conteúdo da Mensagem</Label>
                  <Textarea
                    id="script-content"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Digite o conteúdo do script aqui..."
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Anexos (em desenvolvimento)</Label>
                  <div className="flex space-x-2 mt-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" disabled>
                          <Image size={16} className="mr-2" />
                          Imagem
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Upload de imagem</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" disabled>
                          <Video size={16} className="mr-2" />
                          Vídeo
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Upload de vídeo</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" disabled>
                          <Mic size={16} className="mr-2" />
                          Áudio
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Upload de áudio</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" disabled>
                          <FileText size={16} className="mr-2" />
                          Arquivo
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Upload de arquivo</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Fechar
                </Button>
                <Button 
                  onClick={handleCreateScript}
                  disabled={!newTitle.trim() || !newContent.trim()}
                  className="bg-gradient-brand hover:opacity-90"
                >
                  <Plus size={16} className="mr-2" />
                  Criar Script
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Modal de Edição */}
          {editingScript && (
            <Dialog open={!!editingScript} onOpenChange={() => setEditingScript(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">Editar Script</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-title">Título</Label>
                    <Input
                      id="edit-title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-content">Conteúdo</Label>
                    <Textarea
                      id="edit-content"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={5}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setEditingScript(null)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveEdit} className="bg-gradient-brand hover:opacity-90">
                    Salvar Alterações
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
