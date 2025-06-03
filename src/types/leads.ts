
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
export interface LeadContact {
  id: number; // Mudou de string para number
  nome: string;
  primeiro_nome?: string;
  ultimo_nome?: string;
  telefone: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cpf?: string;
  data_nascimento?: string;
  observacoes?: string;
  empresa_id: number;
  status_lead_id: number;
  origem_lead_id: number;
  etapa_jornada_id?: number;
  usuario_responsavel_id?: number;
  ativo: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
  user_updated_at?: number;
  // Campos de compatibilidade
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
