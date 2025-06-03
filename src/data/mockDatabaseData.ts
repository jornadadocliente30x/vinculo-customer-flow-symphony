
import { Lead, EtapaJornada, StatusLead, OrigemLead, StatusChat } from '@/types/database';

// Dados mock para etapas da jornada
export const mockEtapasJornada: EtapaJornada[] = [
  {
    id: 1,
    nome: 'Assimilação',
    descricao: 'Primeira etapa do relacionamento',
    cor: '#6c757d',
    icone: 'user-plus',
    ordem: 1,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    nome: 'Utilização',
    descricao: 'Cliente começando a usar o produto',
    cor: '#007bff',
    icone: 'play',
    ordem: 2,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    nome: 'Adoração',
    descricao: 'Cliente satisfeito e engajado',
    cor: '#6f42c1',
    icone: 'heart',
    ordem: 3,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    nome: 'Expansão',
    descricao: 'Cliente expandindo uso do produto',
    cor: '#fd7e14',
    icone: 'trending-up',
    ordem: 4,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    nome: 'Evangelismo',
    descricao: 'Cliente promotor da marca',
    cor: '#28a745',
    icone: 'megaphone',
    ordem: 5,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// Dados mock para status de lead
export const mockStatusLead: StatusLead[] = [
  {
    id: 1,
    nome: 'Atendimento',
    descricao: 'Lead em atendimento ativo',
    cor: '#007bff',
    icone: 'message-circle',
    ordem: 1,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    nome: 'Finalizados',
    descricao: 'Atendimento finalizado',
    cor: '#28a745',
    icone: 'check-circle',
    ordem: 2,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    nome: 'Agendamentos',
    descricao: 'Lead com agendamento marcado',
    cor: '#ffc107',
    icone: 'calendar',
    ordem: 3,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    nome: 'Conversa IA',
    descricao: 'Atendimento por inteligência artificial',
    cor: '#6f42c1',
    icone: 'bot',
    ordem: 4,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// Dados mock para origem do lead
export const mockOrigensLead: OrigemLead[] = [
  {
    id: 1,
    nome: 'Instagram',
    descricao: 'Lead originado do Instagram',
    cor: '#e4405f',
    icone: 'instagram',
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    nome: 'WhatsApp',
    descricao: 'Lead originado do WhatsApp',
    cor: '#25d366',
    icone: 'message-circle',
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    nome: 'Site',
    descricao: 'Lead originado do site',
    cor: '#007bff',
    icone: 'globe',
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    nome: 'LinkedIn',
    descricao: 'Lead originado do LinkedIn',
    cor: '#0077b5',
    icone: 'linkedin',
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    nome: 'Google',
    descricao: 'Lead originado do Google',
    cor: '#4285f4',
    icone: 'search',
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 6,
    nome: 'TikTok',
    descricao: 'Lead originado do TikTok',
    cor: '#000000',
    icone: 'video',
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 7,
    nome: 'Messenger',
    descricao: 'Lead originado do Facebook Messenger',
    cor: '#0084ff',
    icone: 'facebook',
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// Dados mock para status de chat
export const mockStatusChat: StatusChat[] = [
  {
    id: 1,
    nome: 'Ativo',
    descricao: 'Chat em andamento',
    cor: '#28a745',
    icone: 'message-circle',
    ordem: 1,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    nome: 'Pausado',
    descricao: 'Chat pausado temporariamente',
    cor: '#ffc107',
    icone: 'pause',
    ordem: 2,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    nome: 'Finalizado',
    descricao: 'Chat finalizado',
    cor: '#6c757d',
    icone: 'check',
    ordem: 3,
    empresa_id: 1,
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// Dados mock para leads com a estrutura correta
export const mockLeadsDatabase: Lead[] = [
  {
    id: 1,
    nome: 'Maria Silva',
    primeiro_nome: 'Maria',
    ultimo_nome: 'Silva',
    telefone: '+55 11 99999-1234',
    email: 'maria.silva@email.com',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cpf: '123.456.789-00',
    data_nascimento: '1990-05-15',
    observacoes: 'Interessada em consultoria empresarial',
    empresa_id: 1,
    status_lead_id: 1,
    origem_lead_id: 1,
    etapa_jornada_id: 2,
    usuario_responsavel_id: null,
    ativo: true,
    deleted: false,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T15:30:00Z',
    user_updated_at: null
  },
  {
    id: 2,
    nome: 'João Santos',
    primeiro_nome: 'João',
    ultimo_nome: 'Santos',
    telefone: '+55 11 98888-5678',
    email: 'joao.santos@email.com',
    endereco: 'Av. Paulista, 1000',
    cidade: 'São Paulo',
    estado: 'SP',
    cpf: '987.654.321-00',
    data_nascimento: '1985-03-22',
    observacoes: 'Cliente ativo há 6 meses',
    empresa_id: 1,
    status_lead_id: 3,
    origem_lead_id: 4,
    etapa_jornada_id: 3,
    usuario_responsavel_id: null,
    ativo: true,
    deleted: false,
    created_at: '2024-01-14T09:15:00Z',
    updated_at: '2024-01-21T11:45:00Z',
    user_updated_at: null
  },
  {
    id: 3,
    nome: 'Ana Costa',
    primeiro_nome: 'Ana',
    ultimo_nome: 'Costa',
    telefone: '+55 11 97777-9012',
    email: 'ana.costa@email.com',
    endereco: 'Rua Augusta, 500',
    cidade: 'São Paulo',
    estado: 'SP',
    observacoes: 'Projeto finalizado com sucesso',
    empresa_id: 1,
    status_lead_id: 2,
    origem_lead_id: 6,
    etapa_jornada_id: 4,
    usuario_responsavel_id: null,
    ativo: true,
    deleted: false,
    created_at: '2024-01-13T14:20:00Z',
    updated_at: '2024-01-22T16:10:00Z',
    user_updated_at: null
  }
];

// Funções helper para buscar dados
export const getEtapaJornadaById = (id: number): EtapaJornada | undefined => {
  return mockEtapasJornada.find(etapa => etapa.id === id);
};

export const getStatusLeadById = (id: number): StatusLead | undefined => {
  return mockStatusLead.find(status => status.id === id);
};

export const getOrigemLeadById = (id: number): OrigemLead | undefined => {
  return mockOrigensLead.find(origem => origem.id === id);
};

export const getStatusChatById = (id: number): StatusChat | undefined => {
  return mockStatusChat.find(status => status.id === id);
};
