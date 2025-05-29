
import { useState, useEffect } from 'react';
import { KanbanLead, FunnelStage } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LeadCard } from './LeadCard';
import { formatBRLCurrency } from '@/utils/formatting';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

interface KanbanColumnProps {
  stage: FunnelStage;
  leads: KanbanLead[];
  totalValue: number;
  onOpenDetails?: (lead: KanbanLead) => void;
  onMarkAsWon?: (leadId: string) => void;
  onMarkAsLost?: (leadId: string) => void;
  onDelete?: (leadId: string) => void;
}

export function KanbanColumn({ 
  stage, 
  leads, 
  totalValue, 
  onOpenDetails, 
  onMarkAsWon, 
  onMarkAsLost, 
  onDelete 
}: KanbanColumnProps) {
  const [visibleCount, setVisibleCount] = useState(20);
  const visibleLeads = leads.slice(0, visibleCount);
  const hasMore = leads.length > visibleCount;

  const { setNodeRef } = useDroppable({
    id: stage.id,
  });

  // Reset visible count when leads change significantly
  useEffect(() => {
    if (leads.length < visibleCount) {
      setVisibleCount(20);
    }
  }, [leads.length]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 20, leads.length));
  };

  return (
    <div className="flex-shrink-0 w-80">
      <Card className="h-full bg-gray-50/50 border border-gray-200 rounded-xl">
        <CardHeader className="pb-3">
          <div className={`bg-gradient-to-r ${stage.color} p-4 rounded-lg text-white mb-2`}>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{stage.name}</h3>
              <div className="text-right">
                <div className="text-sm opacity-90">{leads.length} contatos</div>
                <div className="font-bold text-lg">{formatBRLCurrency(totalValue)}</div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 px-4">
          <div
            ref={setNodeRef}
            className="min-h-[500px] max-h-[600px] overflow-y-auto pr-2"
          >
            <SortableContext items={visibleLeads.map(lead => lead.id)} strategy={verticalListSortingStrategy}>
              {visibleLeads.map((lead) => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onOpenDetails={onOpenDetails}
                  onMarkAsWon={onMarkAsWon}
                  onMarkAsLost={onMarkAsLost}
                  onDelete={onDelete}
                />
              ))}
            </SortableContext>
            
            {hasMore && (
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  onClick={handleLoadMore}
                  className="w-full text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Carregar mais ({leads.length - visibleCount} restantes)
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
