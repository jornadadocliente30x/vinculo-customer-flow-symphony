
import { useState } from 'react';
import { KanbanLead, FunnelStage } from '@/types';
import { KanbanColumn } from './KanbanColumn';
import { LeadDetailsSheet } from './LeadDetailsSheet';
import { mockLeads, funnelStages } from '@/data/mockLeads';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { LeadCard } from './LeadCard';
import { useToast } from '@/hooks/use-toast';

export function KanbanBoard() {
  const [leads, setLeads] = useState<KanbanLead[]>(mockLeads);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<KanbanLead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const getLeadsByStage = (stageId: string) => {
    return leads.filter(lead => lead.stage.id === stageId);
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
    
    if (!newStage) {
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
      
      const lead = prevLeads.find(l => l.id === leadId);
      if (lead) {
        toast({
          title: "Lead movido com sucesso!",
          description: `${lead.name} foi movido para ${newStage.name}`,
        });
      }
      
      return updatedLeads;
    });

    setActiveId(null);
  };

  const handleOpenDetails = (lead: KanbanLead) => {
    setSelectedLead(lead);
    setIsDetailsOpen(true);
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
        title: "Lead marcado como ganho!",
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
        <div className="flex space-x-6 overflow-x-auto pb-6 min-h-[700px]">
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
    </>
  );
}
