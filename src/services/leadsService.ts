
import { supabase } from '@/integrations/supabase/client';
import type { Lead, CreateLeadData, UpdateLeadData } from '@/types/database';

export const leadsService = {
  async getAllLeads(): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('lead')
      .select('*')
      .eq('ativo', true)
      .eq('deleted', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }

    return data || [];
  },

  async getLeadById(id: number): Promise<Lead | null> {
    const { data, error } = await supabase
      .from('lead')
      .select('*')
      .eq('id', id)
      .eq('ativo', true)
      .eq('deleted', false)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching lead:', error);
      throw error;
    }

    return data;
  },

  async createLead(leadData: CreateLeadData): Promise<Lead> {
    const { data, error } = await supabase
      .from('lead')
      .insert({
        ...leadData,
        empresa_id: 1, // Sempre empresa_id = 1
        ativo: true,
        deleted: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating lead:', error);
      throw error;
    }

    return data;
  },

  async updateLead(leadData: UpdateLeadData): Promise<Lead> {
    const { data, error } = await supabase
      .from('lead')
      .update(leadData)
      .eq('id', leadData.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating lead:', error);
      throw error;
    }

    return data;
  },

  async deleteLead(id: number): Promise<void> {
    const { error } = await supabase
      .from('lead')
      .update({ deleted: true })
      .eq('id', id);

    if (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  },

  async getEtapasJornada() {
    const { data, error } = await supabase
      .from('etapa_jornada')
      .select('*')
      .eq('ativo', true)
      .order('ordem');

    if (error) {
      console.error('Error fetching etapas:', error);
      throw error;
    }

    return data || [];
  },

  async getStatusLead() {
    const { data, error } = await supabase
      .from('status_lead')
      .select('*')
      .eq('ativo', true)
      .order('ordem');

    if (error) {
      console.error('Error fetching status:', error);
      throw error;
    }

    return data || [];
  },

  async getOrigensLead() {
    const { data, error } = await supabase
      .from('origem_lead')
      .select('*')
      .eq('ativo', true);

    if (error) {
      console.error('Error fetching origens:', error);
      throw error;
    }

    return data || [];
  }
};
