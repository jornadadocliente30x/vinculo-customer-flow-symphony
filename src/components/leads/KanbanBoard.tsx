import { useState } from 'react';
import { KanbanLead, FunnelStage } from '@/types';
import { KanbanColumn } from './KanbanColumn';
import { LeadDetailsSheet } from './LeadDetailsSheet';
import { EditLeadModal } from './EditLeadModal';
import { mockLeads, funnelStages } from '@/data/mockLeads';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { LeadCard } from './LeadCard';
import { useToast } from '@/hooks/use-toast';
import { Lead } from '@/types/database';

interface KanbanBoardProps {
  searchTerm: string;
  filterResponsible: string;
  filterValue: string;
}

export function KanbanBoard({ searchTerm, filterResponsible, filterValue }: KanbanBoardProps) {
  const [leads, setLeads] = useState<KanbanLead[]>(mockLeads);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<KanbanLead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();

  // Filter leads based on search and filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchTerm || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);

    const matchesResponsible = filterResponsible === 'all' || 
      lead.responsible.name.toLowerCase().includes(filterResponsible);

    const matchesValue = filterValue === 'all' || 
      (filterValue === 'low' && lead.value <= 10000) ||
      (filterValue === 'medium' && lead.value > 10000 && lead.value <= 25000) ||
      (filterValue === 'high' && lead.value > 25000);

    return matchesSearch && matchesResponsible && matchesValue;
  });

  const getLeadsByStage = (stageId: string) => {
    return filteredLeads.filter(lead => lead.stage.id === stageId);
  };

  const getTotalValueByStage = (stageId: string) => {
    return getLeadsByStage(stageId).reduce((sum, lead) => sum + lead.value, 0);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    const leadId = active.id as string;
    const newStageId = over.id as string;
    const newStage = funnelStages.find(stage => stage.id === newStageId);
    const oldLead = leads.find(lead => lead.id === leadId);
    
    if (!newStage || !oldLead) {
      setActiveId(null);
      return;
    }

    // Show confirmation for moving to lost stage
    if (newStageId === 'lost') {
      const confirmed = window.confirm('Tem certeza que deseja mover este lead para "Perdas"?');
      if (!confirmed) {
        setActiveId(null);
        return;
      }
    }

    setLeads(prevLeads => {
      const updatedLeads = prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, stage: newStage }
          : lead
      );
      
      // Enhanced notification with more details
      toast({
        title: "Lead movido com sucesso! 🎉",
        description: `${oldLead.name} foi movido de "${oldLead.stage.name}" para "${newStage.name}"`,
        duration: 4000,
      });
      
      return updatedLeads;
    });

    setActiveId(null);
  };

  const handleOpenDetails = (lead: KanbanLead) => {
    setSelectedLead(lead);
    setIsDetailsOpen(true);
  };

  const handleEditContact = (lead: KanbanLead) => {
    // Convert KanbanLead to Lead format for the edit modal
    const leadData: Lead = {
      id: parseInt(lead.id),
      nome: lead.name,
      primeiro_nome: lead.name.split(' ')[0] || '',
      ultimo_nome: lead.name.split(' ').slice(1).join(' ') || '',
      telefone: lead.phone,
      email: lead.email,
      endereco: '',
      cidade: '',
      estado: '',
      cpf: '',
      data_nascimento: '',
      observacoes: '',
      empresa_id: 1, // Default company ID
      status_lead_id: 1,
      origem_lead_id: 1,
      etapa_jornada_id: 1,
      usuario_responsavel_id: 1,
      ativo: true,
      deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setEditLead(leadData);
    setIsEditModalOpen(true);
  };

  const handleUpdateLead = (updatedLead: KanbanLead) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === updatedLead.id ? updatedLead : lead
      )
    );
    toast({
      title: "Lead atualizado!",
      description: `As informações de ${updatedLead.name} foram atualizadas.`,
    });
  };

  const handleSaveEditedLead = (updatedLead: Lead) => {
    // Convert Lead back to KanbanLead format
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === updatedLead.id.toString() 
          ? {
              ...lead,
              name: updatedLead.nome,
              phone: updatedLead.telefone,
              email: updatedLead.email || lead.email,
            }
          : lead
      )
    );
    
    toast({
      title: "Contato atualizado!",
      description: `As informações de ${updatedLead.nome} foram atualizadas.`,
    });
    
    setIsEditModalOpen(false);
    setEditLead(null);
  };

  const handleDeleteLead = (leadId: string) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este lead?');
    if (!confirmed) return;

    const lead = leads.find(l => l.id === leadId);
    setLeads(prevLeads => prevLeads.filter(l => l.id !== leadId));
    setIsDetailsOpen(false);
    setSelectedLead(null);
    
    if (lead) {
      toast({
        title: "Lead excluído!",
        description: `${lead.name} foi removido do funil.`,
        variant: "destructive",
      });
    }
  };

  const handleMarkAsWon = (leadId: string) => {
    const wonStage = funnelStages.find(stage => stage.id === 'closed');
    if (!wonStage) return;

    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, stage: wonStage }
          : lead
      )
    );

    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      toast({
        title: "Lead marcado como ganho! 🎉",
        description: `${lead.name} foi movido para Fechados.`,
      });
    }
    setIsDetailsOpen(false);
  };

  const handleMarkAsLost = (leadId: string) => {
    const lostStage = funnelStages.find(stage => stage.id === 'lost');
    if (!lostStage) return;

    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, stage: lostStage }
          : lead
      )
    );

    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      toast({
        title: "Lead marcado como perdido",
        description: `${lead.name} foi movido para Perdas.`,
      });
    }
    setIsDetailsOpen(false);
  };

  const activeLead = activeId ? leads.find(lead => lead.id === activeId) : null;

  return (
    <>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-6 min-h-[700px] px-2">
          {funnelStages.map((stage) => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              leads={getLeadsByStage(stage.id)}
              totalValue={getTotalValueByStage(stage.id)}
              onOpenDetails={handleOpenDetails}
              onMarkAsWon={handleMarkAsWon}
              onMarkAsLost={handleMarkAsLost}
              onDelete={handleDeleteLead}
              onEditContact={handleEditContact}
            />
          ))}
        </div>
        
        <DragOverlay>
          {activeLead ? <LeadCard lead={activeLead} /> : null}
        </DragOverlay>
      </DndContext>

      <LeadDetailsSheet
        lead={selectedLead}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedLead(null);
        }}
        onUpdate={handleUpdateLead}
        onDelete={handleDeleteLead}
        onMarkAsWon={handleMarkAsWon}
        onMarkAsLost={handleMarkAsLost}
      />

      <EditLeadModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditLead(null);
        }}
        lead={editLead}
        onSave={handleSaveEditedLead}
      />
    </>
  );
}
