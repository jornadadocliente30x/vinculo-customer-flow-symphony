import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Upload, 
  X, 
  Plus,
  FileText,
  Image,
  Video,
  Music
} from 'lucide-react';
import { Agent, AgentType, PatientJourneyStep, PatientJourneyMessage } from '@/types/agents';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agent: Partial<Agent>) => void;
  agent?: Agent;
}

const daysOfWeek = [
  'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'
];

const defaultJourneySteps: PatientJourneyStep[] = [
  { 
    id: 'step1', 
    title: 'Assimilação', 
    subject: 'Seja bem-vindo a empresa_id [nome]', 
    description: 'Oi [NOME], aqui é o Dr. Tiago!\nÉ uma alegria enorme ter você com a gente.\nLembre-se: estamos aqui para cuidar de você de forma integral. Qualquer coisa, nos chame.', 
    files: [], 
    delayValue: '1', 
    delayUnit: 'minutos' 
  },
  { 
    id: 'step2', 
    title: 'Utilização', 
    subject: 'Dica de cuidado após procedimento [nome]', 
    description: 'Oi [NOME], tudo certo?\nPassando aqui só pra reforçar uma dica rápida:\nApós o seu procedimento, evite alimentos muito duros nas primeiras 48h e mantenha uma\nboa escovação após cada refeição.', 
    files: [], 
    delayValue: '1', 
    delayUnit: 'dias' 
  },
  { 
    id: 'step3', 
    title: 'Adoção', 
    subject: 'Dica valiosa de cuidados diários [nome]', 
    description: 'Olá, [NOME]!\nEscovar os dentes após cada refeição é mais do que rotina — é um presente diário para você\nmesmo.', 
    files: [], 
    delayValue: '15', 
    delayUnit: 'dias' 
  },
  { 
    id: 'step4', 
    title: 'Expansão', 
    subject: 'Pesquisa de cuidados do paciente [nome]', 
    description: 'Oi [NOME], tudo certo?\nVocê pode nos ajudar a continuar evoluindo e aprimorando nossos serviços? Responda essa pesquisa, leva só 45 segundos: 😊 [link para formulário]', 
    files: [], 
    delayValue: '30', 
    delayUnit: 'dias',
    messages: [
      {
        subject: 'Pesquisa de cuidados do paciente [nome]',
        description: 'Oi [NOME], tudo certo?\nVocê pode nos ajudar a continuar evoluindo e aprimorando nossos serviços? Responda essa pesquisa, leva só 45 segundos: 😊 [link para formulário]',
        delayValue: '30',
        delayUnit: 'dias',
        files: []
      },
      {
        subject: 'Está na hora do seu retorno [nome]',
        description: 'Olá [NOME]! 😊\nVocê fez sua limpeza há quase 90 dias. Que tal aproveitar para fazer outra e ainda ganhar\num bônus especial?\nFazendo 4 limpezas, você ganha uma escova premium ou desconto exclusivo em clareamento. Topa?',
        delayValue: '90',
        delayUnit: 'dias',
        files: []
      }
    ]
  },
  { 
    id: 'step5', 
    title: 'Evangelismo', 
    subject: 'Indique e ganhe [nome]', 
    description: 'Oi [NOME]! Aqui é o Dr. Tiago.\nSe você ficou satisfeito com nosso atendimento, que tal compartilhar essa experiência com\nalguém especial?\nIndique nossa clínica com este link: [link para cadastro de indicação]', 
    files: [], 
    delayValue: '5', 
    delayUnit: 'dias' 
  },
];

export function AgentModal({ isOpen, onClose, onSave, agent }: AgentModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Atendimento' as AgentType,
    selectedDays: [] as string[],
    startTime: '08:00',
    endTime: '18:00',
    patientJourney: defaultJourneySteps,
    files: [] as File[],
  });

  useEffect(() => {
    if (agent) {
      setFormData({
        title: agent.title,
        description: agent.description,
        type: agent.type,
        selectedDays: agent.schedule.days,
        startTime: agent.schedule.startTime,
        endTime: agent.schedule.endTime,
        patientJourney: agent.patientJourney,
        files: agent.files || [],
      });
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'Atendimento',
        selectedDays: [],
        startTime: '08:00',
        endTime: '18:00',
        patientJourney: defaultJourneySteps,
        files: [],
      });
    }
  }, [agent, isOpen]);

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day]
    }));
  };

  const handleJourneyStepChange = (stepId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      patientJourney: prev.patientJourney.map(step =>
        step.id === stepId ? { ...step, [field]: value } : step
      )
    }));
  };

  const handleExpansaoMessageChange = (stepId: string, messageIndex: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      patientJourney: prev.patientJourney.map(step =>
        step.id === stepId && step.messages 
          ? { 
              ...step, 
              messages: step.messages.map((msg, idx) =>
                idx === messageIndex ? { ...msg, [field]: value } : msg
              )
            }
          : step
      )
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...Array.from(files)]
      }));
    }
  };

  const handleStepFileUpload = (stepId: string, files: FileList | null) => {
    if (files) {
      setFormData(prev => ({
        ...prev,
        patientJourney: prev.patientJourney.map(step =>
          step.id === stepId 
            ? { ...step, files: [...(step.files || []), ...Array.from(files)] }
            : step
        )
      }));
    }
  };

  const handleExpansaoMessageFileUpload = (stepId: string, messageIndex: number, files: FileList | null) => {
    if (files) {
      setFormData(prev => ({
        ...prev,
        patientJourney: prev.patientJourney.map(step =>
          step.id === stepId && step.messages 
            ? { 
                ...step, 
                messages: step.messages.map((msg, idx) =>
                  idx === messageIndex 
                    ? { ...msg, files: [...(msg.files || []), ...Array.from(files)] }
                    : msg
                )
              }
            : step
        )
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const removeStepFile = (stepId: string, fileIndex: number) => {
    setFormData(prev => ({
      ...prev,
      patientJourney: prev.patientJourney.map(step =>
        step.id === stepId 
          ? { ...step, files: (step.files || []).filter((_, i) => i !== fileIndex) }
          : step
      )
    }));
  };

  const removeExpansaoMessageFile = (stepId: string, messageIndex: number, fileIndex: number) => {
    setFormData(prev => ({
      ...prev,
      patientJourney: prev.patientJourney.map(step =>
        step.id === stepId && step.messages 
          ? { 
              ...step, 
              messages: step.messages.map((msg, idx) =>
                idx === messageIndex 
                  ? { ...msg, files: (msg.files || []).filter((_, i) => i !== fileIndex) }
                  : msg
              )
            }
          : step
      )
    }));
  };

  const handleSave = () => {
    const agentData: Partial<Agent> = {
      ...(agent && { id: agent.id }),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      status: agent?.status || 'Ativo',
      schedule: {
        days: formData.selectedDays,
        startTime: formData.startTime,
        endTime: formData.endTime,
      },
      patientJourney: formData.patientJourney,
      files: formData.files,
      ...(agent && { 
        createdAt: agent.createdAt,
        updatedAt: new Date()
      }),
      ...(!agent && { 
        createdAt: new Date(),
        updatedAt: new Date()
      }),
    };

    onSave(agentData);
    onClose();
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (file.type.startsWith('video/')) return <Video className="w-4 h-4" />;
    if (file.type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {agent ? 'Editar Agente' : 'Criar Novo Agente'}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="agent-data" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agent-data">Dados do Agente</TabsTrigger>
            <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
            <TabsTrigger value="journey">Jornada do Paciente</TabsTrigger>
          </TabsList>

          <TabsContent value="agent-data" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Agente</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Agente de Boas-vindas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo do Agente</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: AgentType) => 
                    setFormData(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Atendimento">Atendimento</SelectItem>
                    <SelectItem value="Agendamento">Agendamento</SelectItem>
                    <SelectItem value="Suporte">Suporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição/Objetivo do Agente</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva o que este agente deve fazer..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Upload de Arquivos</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    Clique para fazer upload de imagens, vídeos, áudios ou PDFs
                  </span>
                </label>
              </div>

              {formData.files.length > 0 && (
                <div className="space-y-2">
                  <Label>Arquivos Anexados:</Label>
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(file)}
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="availability" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Dias da Semana</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={formData.selectedDays.includes(day)}
                        onCheckedChange={() => handleDayToggle(day)}
                      />
                      <Label htmlFor={day} className="text-sm">{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Horário de Início</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    min="07:00"
                    max="19:00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">Horário de Fim</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    min="07:00"
                    max="19:00"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="journey" className="space-y-4">
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                Configure as mensagens que serão enviadas em cada etapa da jornada do paciente:
              </div>

              {formData.patientJourney.map((step, index) => (
                <Card key={step.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <span className="bg-brand-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                        {index + 1}
                      </span>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {step.title === 'Expansão' && step.messages ? (
                      // Special handling for Expansão with multiple messages
                      <div className="space-y-6">
                        {step.messages.map((message, msgIndex) => (
                          <div key={msgIndex} className="border rounded-lg p-4 bg-gray-50">
                            <h4 className="font-medium mb-3">Mensagem {msgIndex + 1}</h4>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor={`subject-${step.id}-${msgIndex}`}>Assunto</Label>
                                <Input
                                  id={`subject-${step.id}-${msgIndex}`}
                                  value={message.subject}
                                  onChange={e => handleExpansaoMessageChange(step.id, msgIndex, 'subject', e.target.value)}
                                  placeholder="Digite o assunto desta mensagem"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`description-${step.id}-${msgIndex}`}>Mensagem</Label>
                                <Textarea
                                  id={`description-${step.id}-${msgIndex}`}
                                  value={message.description}
                                  onChange={(e) => handleExpansaoMessageChange(step.id, msgIndex, 'description', e.target.value)}
                                  placeholder={`Descreva a mensagem ${msgIndex + 1}...`}
                                  rows={3}
                                />
                              </div>
                              <div className="flex gap-2 items-end">
                                <div className="w-32">
                                  <Label htmlFor={`delayValue-${step.id}-${msgIndex}`}>Tempo de espera</Label>
                                  <Input
                                    id={`delayValue-${step.id}-${msgIndex}`}
                                    type="number"
                                    min={0}
                                    value={message.delayValue}
                                    onChange={e => handleExpansaoMessageChange(step.id, msgIndex, 'delayValue', e.target.value)}
                                    placeholder="0"
                                  />
                                </div>
                                <div className="w-32">
                                  <Label htmlFor={`delayUnit-${step.id}-${msgIndex}`}>Unidade</Label>
                                  <Select
                                    value={message.delayUnit}
                                    onValueChange={value => handleExpansaoMessageChange(step.id, msgIndex, 'delayUnit', value)}
                                  >
                                    <SelectTrigger id={`delayUnit-${step.id}-${msgIndex}`}>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="minutos">Minutos</SelectItem>
                                      <SelectItem value="horas">Horas</SelectItem>
                                      <SelectItem value="dias">Dias</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Upload de Arquivos para esta Mensagem</Label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                  <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                                    onChange={(e) => handleExpansaoMessageFileUpload(step.id, msgIndex, e.target.files)}
                                    className="hidden"
                                    id={`message-file-upload-${step.id}-${msgIndex}`}
                                  />
                                  <label
                                    htmlFor={`message-file-upload-${step.id}-${msgIndex}`}
                                    className="flex flex-col items-center justify-center cursor-pointer"
                                  >
                                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-600">
                                      Clique para adicionar arquivos nesta mensagem
                                    </span>
                                  </label>
                                </div>

                                {message.files && message.files.length > 0 && (
                                  <div className="space-y-2">
                                    <Label>Arquivos Anexados nesta Mensagem:</Label>
                                    {message.files.map((file, fileIndex) => (
                                      <div key={fileIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <div className="flex items-center space-x-2">
                                          {getFileIcon(file)}
                                          <span className="text-sm">{file.name}</span>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removeExpansaoMessageFile(step.id, msgIndex, fileIndex)}
                                          className="h-6 w-6 p-0"
                                        >
                                          <X className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Regular handling for other steps
                      <>
                        <div className="space-y-2">
                          <Label htmlFor={`subject-${step.id}`}>Assunto</Label>
                          <Input
                            id={`subject-${step.id}`}
                            value={step.subject || ''}
                            onChange={e => handleJourneyStepChange(step.id, 'subject', e.target.value)}
                            placeholder="Digite o assunto desta etapa"
                          />
                        </div>
                        <Textarea
                          value={step.description}
                          onChange={(e) => handleJourneyStepChange(step.id, 'description', e.target.value)}
                          placeholder={`Descreva a mensagem para a etapa ${step.title}...`}
                          rows={3}
                        />
                        <div className="flex gap-2 items-end">
                          <div className="w-32">
                            <Label htmlFor={`delayValue-${step.id}`}>Tempo de espera</Label>
                            <Input
                              id={`delayValue-${step.id}`}
                              type="number"
                              min={0}
                              value={step.delayValue || ''}
                              onChange={e => handleJourneyStepChange(step.id, 'delayValue', e.target.value)}
                              placeholder="0"
                            />
                          </div>
                          <div className="w-32">
                            <Label htmlFor={`delayUnit-${step.id}`}>Unidade</Label>
                            <Select
                              value={step.delayUnit || 'minutos'}
                              onValueChange={value => handleJourneyStepChange(step.id, 'delayUnit', value)}
                            >
                              <SelectTrigger id={`delayUnit-${step.id}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="minutos">Minutos</SelectItem>
                                <SelectItem value="horas">Horas</SelectItem>
                                <SelectItem value="dias">Dias</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Upload de Arquivos para esta Etapa</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <input
                              type="file"
                              multiple
                              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                              onChange={(e) => handleStepFileUpload(step.id, e.target.files)}
                              className="hidden"
                              id={`step-file-upload-${step.id}`}
                            />
                            <label
                              htmlFor={`step-file-upload-${step.id}`}
                              className="flex flex-col items-center justify-center cursor-pointer"
                            >
                              <Upload className="w-6 h-6 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-600">
                                Clique para adicionar arquivos nesta etapa
                              </span>
                            </label>
                          </div>

                          {step.files && step.files.length > 0 && (
                            <div className="space-y-2">
                              <Label>Arquivos Anexados nesta Etapa:</Label>
                              {step.files.map((file, fileIndex) => (
                                <div key={fileIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <div className="flex items-center space-x-2">
                                    {getFileIcon(file)}
                                    <span className="text-sm">{file.name}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeStepFile(step.id, fileIndex)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            {agent ? 'Salvar Alterações' : 'Criar Agente'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
