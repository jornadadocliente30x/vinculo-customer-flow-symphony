
export type AgentType = 'Atendimento' | 'Agendamento' | 'Suporte';

export type AgentStatus = 'Ativo' | 'Inativo';

export interface Schedule {
  days: string[];
  startTime: string;
  endTime: string;
}

export interface PatientJourneyStep {
  id: string;
  title: string;
  description: string;
  files?: File[];
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
