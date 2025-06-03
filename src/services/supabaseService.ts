
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['lead']['Row'];
type LeadInsert = Database['public']['Tables']['lead']['Insert'];
type LeadUpdate = Database['public']['Tables']['lead']['Update'];

// Default empresa_id - in a real app, this would come from the authenticated user
const DEFAULT_EMPRESA_ID = 1;

export class SupabaseService {
  // Leads
  async getLeads() {
    const { data, error } = await supabase
      .from('lead')
      .select(`
        *,
        origem_lead(nome, cor),
        status_lead(nome, cor),
        etapa_jornada(nome, cor)
      `)
      .eq('ativo', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getLeadById(id: number) {
    const { data, error } = await supabase
      .from('lead')
      .select(`
        *,
        origem_lead(nome, cor),
        status_lead(nome, cor),
        etapa_jornada(nome, cor)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createLead(leadData: Partial<LeadInsert>) {
    // Ensure empresa_id is set
    const dataWithEmpresa = {
      ...leadData,
      empresa_id: leadData.empresa_id || DEFAULT_EMPRESA_ID,
      origem_lead_id: leadData.origem_lead_id || 1,
      status_lead_id: leadData.status_lead_id || 1,
    } as LeadInsert;

    const { data, error } = await supabase
      .from('lead')
      .insert(dataWithEmpresa)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateLead(id: number, leadData: Partial<LeadUpdate>) {
    const { data, error } = await supabase
      .from('lead')
      .update(leadData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteLead(id: number) {
    const { error } = await supabase
      .from('lead')
      .update({ deleted: true, ativo: false })
      .eq('id', id);

    if (error) throw error;
  }

  // Journey stages
  async getEtapasJornada() {
    const { data, error } = await supabase
      .from('etapa_jornada')
      .select('*')
      .eq('ativo', true)
      .order('ordem');

    if (error) throw error;
    return data;
  }

  // Lead origins
  async getOrigensLead() {
    const { data, error } = await supabase
      .from('origem_lead')
      .select('*')
      .eq('ativo', true);

    if (error) throw error;
    return data;
  }

  // Lead status
  async getStatusLead() {
    const { data, error } = await supabase
      .from('status_lead')
      .select('*')
      .eq('ativo', true)
      .order('ordem');

    if (error) throw error;
    return data;
  }

  // Chat
  async getChats() {
    const { data, error } = await supabase
      .from('chat')
      .select(`
        *,
        lead(nome, telefone),
        status_chat(nome, cor)
      `)
      .eq('ativo', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Messages
  async getMessagesByChat(chatId: number) {
    const { data, error } = await supabase
      .from('mensagem')
      .select(`
        *,
        tipo_mensagem(nome),
        status_mensagem(nome)
      `)
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }
}

export const supabaseService = new SupabaseService();
