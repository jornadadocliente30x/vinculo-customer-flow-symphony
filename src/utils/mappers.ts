
// Mapeadores para converter entre tipos do banco e do frontend
import type { Lead, EtapaJornada, StatusLead, OrigemLead } from '@/types/unified';
import type { LeadDisplay, ConversationDisplay } from '@/types/unified';
import type { KanbanLead } from '@/types/index';

export const mapLeadToDisplay = (
  lead: Lead & {
    etapa_jornada?: EtapaJornada;
    status_lead?: StatusLead;
    origem_lead?: OrigemLead;
    usuario?: any;
  }
): LeadDisplay => {
  return {
    ...lead,
    id: lead.id.toString(),
    name: lead.nome,
    stage: lead.etapa_jornada,
    status: lead.status_lead,
    origin: lead.origem_lead,
    responsible: lead.usuario ? {
      name: lead.usuario.nome,
      avatar: lead.usuario.nome.charAt(0).toUpperCase(),
    } : undefined,
  };
};

export const mapLeadToKanban = (
  lead: Lead & {
    etapa_jornada?: EtapaJornada;
    status_lead?: StatusLead;
    origem_lead?: OrigemLead;
    usuario?: any;
  }
): KanbanLead => {
  return {
    id: lead.id.toString(),
    name: lead.nome,
    email: lead.email || '',
    phone: lead.telefone,
    company: '', // Campo não existe no banco, pode ser adicionado depois
    value: 0, // Campo não existe no banco, pode ser calculado a partir de tratamentos
    services: [], // Campo não existe no banco
    responsible: {
      name: lead.usuario?.nome || 'Não atribuído',
      avatar: lead.usuario?.nome?.charAt(0).toUpperCase() || 'N',
    },
    stage: lead.etapa_jornada ? {
      id: lead.etapa_jornada.id.toString(),
      name: lead.etapa_jornada.nome,
      color: lead.etapa_jornada.cor,
      order: lead.etapa_jornada.ordem,
    } : {
      id: '1',
      name: 'Indefinido',
      color: '#gray',
      order: 0,
    },
    createdAt: new Date(lead.created_at),
    lastContact: lead.updated_at ? new Date(lead.updated_at) : undefined,
    notes: lead.observacoes,
    source: 'other' as const, // Mapeamento simplificado, pode ser melhorado
  };
};

export const formatBRLCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};
