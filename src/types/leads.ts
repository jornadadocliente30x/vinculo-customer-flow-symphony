
// Usando as interfaces do banco de dados
export { 
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
