
// Usando as interfaces do banco de dados
export type { 
  Lead, 
  EtapaJornada, 
  StatusLead, 
  OrigemLead,
  CreateLeadData,
  UpdateLeadData 
} from './database';

// Mantendo compatibilidade com interfaces existentes
export interface ImportConfig {
  fileName: string;
  importName: string;
  selectedTag: string;
  automationAgent?: string;
  defaultStage: number; // Agora é ID da etapa
}

export interface ExportConfig {
  fields: string[];
  format: 'excel' | 'csv';
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Tipos auxiliares para o frontend
export type ContactTag = 'lead' | 'cliente';
export type ChatStage = 'assimilacao' | 'utilizacao' | 'adoracao' | 'expansao' | 'evangelismo';

// Mapeamento para compatibilidade (será removido quando migrarmos completamente)
export interface LeadContact extends Lead {
  firstName: string;
  lastName: string;
  stage: string;
  status: string;
  origin: string;
  conversionDate: Date;
  tag: string;
  notes?: string;
  birthDate?: string;
  address?: string;
  city?: string;
  state?: string;
}
