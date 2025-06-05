
// Tipos unificados baseados no banco de dados
import type { BaseEntity, TimestampedEntity } from './common';

// Lead Types
export interface Lead extends TimestampedEntity {
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
}

export interface EtapaJornada extends BaseEntity {
  nome: string;
  descricao?: string;
  cor: string;
  icone?: string;
  ordem: number;
  empresa_id?: number;
}

export interface StatusLead extends BaseEntity {
  nome: string;
  descricao?: string;
  cor: string;
  icone?: string;
  ordem: number;
  empresa_id?: number;
}

export interface OrigemLead extends BaseEntity {
  nome: string;
  descricao?: string;
  cor: string;
  icone?: string;
  empresa_id?: number;
}

// Chat and Messages Types
export interface Chat extends BaseEntity {
  titulo?: string;
  lead_id: number;
  usuario_id?: number;
  status_chat_id: number;
}

export interface Mensagem extends BaseEntity {
  conteudo: string;
  telefone: string;
  anexo?: string;
  chat_id: number;
  usuario_id?: number;
  tipo_mensagem_id: number;
  status_mensagem_id: number;
  lida: boolean;
  enviada: boolean;
}

export interface StatusChat extends BaseEntity {
  nome: string;
  descricao?: string;
  cor: string;
  icone?: string;
  ordem: number;
  empresa_id?: number;
}

// User and Company Types
export interface Usuario extends TimestampedEntity {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  empresa_id: number;
  nivel_usuario_id: number;
}

export interface Empresa extends BaseEntity {
  nome: string;
  email?: string;
  telefone?: string;
  cnpj?: string;
  endereco?: string;
}

// Frontend-specific types for compatibility
export interface LeadDisplay extends Omit<Lead, 'id'> {
  id: string;
  name: string;
  value?: number;
  stage?: EtapaJornada;
  status?: StatusLead;
  origin?: OrigemLead;
  responsible?: {
    name: string;
    avatar: string;
  };
}

export interface ConversationDisplay {
  id: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  category: 'atendimento' | 'finalizados' | 'agendamentos' | 'conversa_ia';
  tags?: Array<{ id: string; name: string; color: string }>;
}
