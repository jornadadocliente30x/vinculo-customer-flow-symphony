
export type AgentType = 'Atendimento' | 'Agendamento' | 'Suporte';

export type AgentStatus = 'Ativo' | 'Inativo';

export interface Schedule {
  days: string[];
  startTime: string;
  endTime: string;
}

export interface PatientJourneyMessage {
  subject: string;
  description: string;
  delayValue: string;
  delayUnit: 'minutos' | 'horas' | 'dias';
  files?: File[];
}

export interface PatientJourneyStep {
  id: string;
  title: string;
  subject?: string;
  description: string;
  files?: File[];
  delayValue?: string;
  delayUnit?: 'minutos' | 'horas' | 'dias';
  messages?: PatientJourneyMessage[]; // For Expansão stage with multiple messages
}

export interface Agent {
  id: string;
  title: string;
  description: string;
  type: AgentType;
  status: AgentStatus;
  schedule: Schedule;
  files?: File[];
  patientJourney: PatientJourneyStep[];
  createdAt: Date;
  updatedAt: Date;
}
