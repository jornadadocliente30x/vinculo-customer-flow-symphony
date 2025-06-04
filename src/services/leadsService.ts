
import { supabase } from '@/integrations/supabase/client';
import type { CreateLeadData, Lead, UpdateLeadData } from '@/types/database';

export interface StatusChat {
  id: number;
  nome: string;
  descricao?: string;
  cor?: string;
  icone?: string;
  ordem?: number;
  ativo?: boolean;
}

export interface StatusLead {
  id: number;
  nome: string;
  descricao?: string;
  cor?: string;
  icone?: string;
  ordem?: number;
  ativo?: boolean;
}

export interface OrigemLead {
  id: number;
  nome: string;
  descricao?: string;
  cor?: string;
  icone?: string;
  ativo?: boolean;
}

export interface EtapaJornada {
  id: number;
  nome: string;
  descricao?: string;
  cor?: string;
  icone?: string;
  ordem?: number;
  ativo?: boolean;
}

export const leadsService = {
  async getLeads() {
    const { data, error } = await supabase
      .from('lead')
      .select(`
        *,
        status_lead:status_lead_id (
          id,
          nome,
          cor
        ),
        origem_lead:origem_lead_id (
          id,
          nome,
          cor
        ),
        etapa_jornada:etapa_jornada_id (
          id,
          nome,
          cor
        )
      `)
      .eq('ativo', true)
      .eq('deleted', false);

    if (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }

    return data || [];
  },

  // Alias for getLeads to maintain compatibility
  async getAllLeads() {
    return this.getLeads();
  },

  async createLead(leadData: CreateLeadData) {
    console.log('Creating lead with data:', leadData);

    // Validações básicas
    if (!leadData.nome || leadData.nome.trim() === '') {
      throw new Error('Nome é obrigatório');
    }

    if (!leadData.telefone || leadData.telefone.trim() === '') {
      throw new Error('Telefone é obrigatório');
    }

    if (!leadData.status_lead_id) {
      throw new Error('Status é obrigatório');
    }

    if (!leadData.origem_lead_id) {
      throw new Error('Origem é obrigatória');
    }

    const { data, error } = await supabase
      .from('lead')
      .insert([{
        nome: leadData.nome.trim(),
        primeiro_nome: leadData.primeiro_nome?.trim() || null,
        ultimo_nome: leadData.ultimo_nome?.trim() || null,
        telefone: leadData.telefone.trim(),
        email: leadData.email?.trim() || null,
        endereco: leadData.endereco?.trim() || null,
        cidade: leadData.cidade?.trim() || null,
        estado: leadData.estado?.trim() || null,
        cpf: leadData.cpf?.trim() || null,
        data_nascimento: leadData.data_nascimento || null,
        observacoes: leadData.observacoes?.trim() || null,
        status_lead_id: leadData.status_lead_id,
        origem_lead_id: leadData.origem_lead_id,
        etapa_jornada_id: leadData.etapa_jornada_id || null,
        usuario_responsavel_id: leadData.usuario_responsavel_id || null,
        empresa_id: 1, // Assumindo empresa padrão
        ativo: true,
        deleted: false
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating lead:', error);
      throw error;
    }

    return data;
  },

  async updateLead(leadData: UpdateLeadData) {
    console.log('Updating lead with data:', leadData);

    if (!leadData.id) {
      throw new Error('ID do lead é obrigatório para atualização');
    }

    const { data, error } = await supabase
      .from('lead')
      .update({
        nome: leadData.nome?.trim(),
        primeiro_nome: leadData.primeiro_nome?.trim() || null,
        ultimo_nome: leadData.ultimo_nome?.trim() || null,
        telefone: leadData.telefone?.trim(),
        email: leadData.email?.trim() || null,
        endereco: leadData.endereco?.trim() || null,
        cidade: leadData.cidade?.trim() || null,
        estado: leadData.estado?.trim() || null,
        cpf: leadData.cpf?.trim() || null,
        data_nascimento: leadData.data_nascimento || null,
        observacoes: leadData.observacoes?.trim() || null,
        status_lead_id: leadData.status_lead_id,
        origem_lead_id: leadData.origem_lead_id,
        etapa_jornada_id: leadData.etapa_jornada_id || null,
        usuario_responsavel_id: leadData.usuario_responsavel_id || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', leadData.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating lead:', error);
      throw error;
    }

    return data;
  },

  async deleteLead(leadId: number) {
    console.log('Deleting lead with id:', leadId);

    const { data, error } = await supabase
      .from('lead')
      .update({
        deleted: true,
        ativo: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', leadId)
      .select()
      .single();

    if (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }

    return data;
  },

  async getStatusChat(): Promise<StatusChat[]> {
    const { data, error } = await supabase
      .from('status_chat')
      .select('*')
      .eq('ativo', true)
      .order('ordem');

    if (error) {
      console.error('Error fetching status_chat:', error);
      throw error;
    }

    return data || [];
  },

  async getStatusLead(): Promise<StatusLead[]> {
    const { data, error } = await supabase
      .from('status_lead')
      .select('*')
      .eq('ativo', true)
      .order('ordem');

    if (error) {
      console.error('Error fetching status_lead:', error);
      throw error;
    }

    return data || [];
  },

  async getOrigensLead(): Promise<OrigemLead[]> {
    const { data, error } = await supabase
      .from('origem_lead')
      .select('*')
      .eq('ativo', true);

    if (error) {
      console.error('Error fetching origens_lead:', error);
      throw error;
    }

    return data || [];
  },

  async getEtapasJornada(): Promise<EtapaJornada[]> {
    const { data, error } = await supabase
      .from('etapa_jornada')
      .select('*')
      .eq('ativo', true)
      .order('ordem');

    if (error) {
      console.error('Error fetching etapas_jornada:', error);
      throw error;
    }

    return data || [];
  }
};
