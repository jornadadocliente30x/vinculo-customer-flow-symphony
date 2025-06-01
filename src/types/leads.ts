
export interface LeadContact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  stage: ChatStage;
  status: ChatStatus;
  origin: ContactOrigin;
  conversionDate: Date;
  tag: ContactTag;
  notes?: string;
  birthDate?: string;
  address?: string;
  city?: string;
  state?: string;
  cpf?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ChatStage = 'assimilacao' | 'utilizacao' | 'adoracao' | 'expansao' | 'evangelismo';
export type ChatStatus = 'atendimento' | 'finalizados' | 'agendamentos' | 'conversa_ia';
export type ContactOrigin = 'instagram' | 'messenger' | 'google' | 'linkedin' | 'tiktok' | 'site' | 'whatsapp';
export type ContactTag = 'cliente' | 'lead';

export interface ImportConfig {
  fileName: string;
  importName: string;
  selectedTag: ContactTag;
  automationAgent?: string;
  defaultStage: ChatStage;
}

export interface ExportConfig {
  fields: string[];
  format: 'excel' | 'csv';
  dateRange?: {
    start: Date;
    end: Date;
  };
}
