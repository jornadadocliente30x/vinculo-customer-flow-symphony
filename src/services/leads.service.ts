
import { BaseService } from './base.service';
import type { Lead, EtapaJornada, StatusLead, OrigemLead } from '@/types/unified';
import type { CreateLeadData, UpdateLeadData } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';

class LeadsService extends BaseService<Lead, CreateLeadData, UpdateLeadData> {
  constructor() {
    super('lead');
  }

  async getLeadsWithRelations() {
    const { data, error } = await supabase
      .from('lead')
      .select(`
        *,
        etapa_jornada:etapa_jornada_id(*),
        status_lead:status_lead_id(*),
        origem_lead:origem_lead_id(*),
        usuario:usuario_responsavel_id(*)
      `)
      .eq('ativo', true)
      .eq('deleted', false);

    if (error) {
      console.error('Error fetching leads with relations:', error);
      throw new Error(error.message);
    }

    return data || [];
  }

  async getLeadsByEtapa(etapaId: number) {
    return this.findAll({ etapa_jornada_id: etapaId, ativo: true, deleted: false });
  }

  async getLeadsByResponsible(usuarioId: number) {
    return this.findAll({ usuario_responsavel_id: usuarioId, ativo: true, deleted: false });
  }

  async updateEtapa(leadId: number, etapaId: number) {
    return this.update(leadId, { etapa_jornada_id: etapaId });
  }
}

class EtapasService extends BaseService<EtapaJornada> {
  constructor() {
    super('etapa_jornada');
  }

  async getEtapasOrdenadas() {
    return this.findAll({ ativo: true }, { column: 'ordem', ascending: true });
  }
}

class StatusLeadService extends BaseService<StatusLead> {
  constructor() {
    super('status_lead');
  }
}

class OrigensService extends BaseService<OrigemLead> {
  constructor() {
    super('origem_lead');
  }
}

export const leadsService = new LeadsService();
export const etapasService = new EtapasService();
export const statusLeadService = new StatusLeadService();
export const origensService = new OrigensService();
