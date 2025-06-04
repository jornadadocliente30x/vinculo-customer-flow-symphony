
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Agent, AgentType, PatientJourneyStep } from '@/types/agents';
import { AgentFormData } from './AgentFormData';
import { AgentAvailability } from './AgentAvailability';
import { PatientJourneyForm } from './PatientJourneyForm';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agent: Partial<Agent>) => void;
  agent?: Agent;
}

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

          <TabsContent value="agent-data">
            <AgentFormData
              title={formData.title}
              description={formData.description}
              type={formData.type}
              files={formData.files}
              onTitleChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
              onDescriptionChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              onTypeChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              onFileUpload={handleFileUpload}
              onFileRemove={removeFile}
            />
          </TabsContent>

          <TabsContent value="availability">
            <AgentAvailability
              selectedDays={formData.selectedDays}
              startTime={formData.startTime}
              endTime={formData.endTime}
              onDayToggle={handleDayToggle}
              onStartTimeChange={(time) => setFormData(prev => ({ ...prev, startTime: time }))}
              onEndTimeChange={(time) => setFormData(prev => ({ ...prev, endTime: time }))}
            />
          </TabsContent>

          <TabsContent value="journey">
            <PatientJourneyForm
              patientJourney={formData.patientJourney}
              onStepChange={handleJourneyStepChange}
              onExpansaoMessageChange={handleExpansaoMessageChange}
              onStepFileUpload={handleStepFileUpload}
              onStepFileRemove={removeStepFile}
              onExpansaoMessageFileUpload={handleExpansaoMessageFileUpload}
              onExpansaoMessageFileRemove={removeExpansaoMessageFile}
            />
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
