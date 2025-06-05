// Interfaces alinhadas com a estrutura do banco Supabase

export interface Lead {
  id: number;
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
}

export interface EtapaJornada {
  id: number;
  nome: string;
  descricao?: string;
  cor: string;
  icone?: string;
  ordem: number;
  empresa_id?: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface StatusLead {
  id: number;
  nome: string;
  descricao?: string;
  cor: string;
  icone?: string;
  ordem: number;
  empresa_id?: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrigemLead {
  id: number;
  nome: string;
  descricao?: string;
  cor: string;
  icone?: string;
  empresa_id?: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface StatusChat {
  id: number;
  nome: string;
  descricao?: string;
  cor: string;
  icone?: string;
  ordem: number;
  empresa_id?: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Chat {
  id: number;
  titulo?: string;
  lead_id: number;
  usuario_id?: number;
  status_chat_id: number;
  ativo: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface TipoMensagem {
  id: number;
  nome: string;
  descricao?: string;
  cor: string;
  icone?: string;
  ordem: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface StatusMensagem {
  id: number;
  nome: string;
  descricao?: string;
  cor: string;
  icone?: string;
  ordem: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Mensagem {
  id: number;
  conteudo: string;
  telefone: string;
  anexo?: string;
  chat_id: number;
  usuario_id?: number;
  tipo_mensagem_id: number;
  status_mensagem_id: number;
  lida: boolean;
  enviada: boolean;
  created_at: string;
  updated_at: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  empresa_id: number;
  nivel_usuario_id: number;
  ativo: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
  user_updated_at?: number;
}

export interface Empresa {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  cnpj?: string;
  endereco?: string;
  ativo: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}

// Tipos para formulários
export interface CreateLeadData {
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
  status_lead_id: number;
  origem_lead_id: number;
  etapa_jornada_id?: number;
  usuario_responsavel_id?: number;
}

export interface UpdateLeadData extends Partial<CreateLeadData> {
  id?: number; // Making id optional since BaseService.update() receives it as first parameter
}
