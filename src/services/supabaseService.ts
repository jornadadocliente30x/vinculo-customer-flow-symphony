
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Lead = Tables<'lead'>;
export type EtapaJornada = Tables<'etapa_jornada'>;
export type OrigemLead = Tables<'origem_lead'>;
export type StatusLead = Tables<'status_lead'>;

// Leads
export const leadsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('lead')
      .select(`
        *,
        etapa_jornada:etapa_jornada_id(*),
        origem_lead:origem_lead_id(*),
        status_lead:status_lead_id(*)
      `)
      .eq('ativo', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from('lead')
      .select(`
        *,
        etapa_jornada:etapa_jornada_id(*),
        origem_lead:origem_lead_id(*),
        status_lead:status_lead_id(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(lead: Partial<Lead>) {
    const { data, error } = await supabase
      .from('lead')
      .insert(lead)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: number, updates: Partial<Lead>) {
    const { data, error } = await supabase
      .from('lead')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('lead')
      .update({ deleted: true })
      .eq('id', id);

    if (error) throw error;
  }
};

// Etapas da Jornada
export const etapasService = {
  async getAll() {
    const { data, error } = await supabase
      .from('etapa_jornada')
      .select('*')
      .eq('ativo', true)
      .order('ordem');

    if (error) throw error;
    return data;
  }
};

// Origens de Lead
export const origensService = {
  async getAll() {
    const { data, error } = await supabase
      .from('origem_lead')
      .select('*')
      .eq('ativo', true)
      .order('nome');

    if (error) throw error;
    return data;
  }
};

// Status de Lead
export const statusService = {
  async getAll() {
    const { data, error } = await supabase
      .from('status_lead')
      .select('*')
      .eq('ativo', true)
      .order('ordem');

    if (error) throw error;
    return data;
  }
};
