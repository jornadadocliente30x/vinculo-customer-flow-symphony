
import { useState } from 'react';
import { KanbanLead, FunnelStage } from '@/types';
import { KanbanColumn } from './KanbanColumn';
import { mockLeads, funnelStages } from '@/data/mockLeads';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { LeadCard } from './LeadCard';
import { useToast } from '@/hooks/use-toast';

export function KanbanBoard() {
  const [leads, setLeads] = useState<KanbanLead[]>(mockLeads);
  const [activeId, setActiveId] = useState<string | null>(null);
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

    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, stage: newStage }
          : lead
      )
    );

    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      toast({
        title: "Lead movido com sucesso!",
        description: `${lead.name} foi movido para ${newStage.name}`,
      });
    }

    setActiveId(null);
  };

  const activeLead = activeId ? leads.find(lead => lead.id === activeId) : null;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex space-x-6 overflow-x-auto pb-6 min-h-[700px]">
        {funnelStages.map((stage) => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            leads={getLeadsByStage(stage.id)}
            totalValue={getTotalValueByStage(stage.id)}
          />
        ))}
      </div>
      
      <DragOverlay>
        {activeLead ? <LeadCard lead={activeLead} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
