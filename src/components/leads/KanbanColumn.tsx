
import { useState } from 'react';
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
}

export function KanbanColumn({ stage, leads, totalValue }: KanbanColumnProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 20;
  const startIndex = (currentPage - 1) * leadsPerPage;
  const visibleLeads = leads.slice(0, startIndex + leadsPerPage);
  const hasMore = leads.length > visibleLeads.length;

  const { setNodeRef } = useDroppable({
    id: stage.id,
  });

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="flex-shrink-0 w-80">
      <Card className="h-full bg-gray-50/50 border border-gray-200 rounded-xl">
        <CardHeader className="pb-3">
          <div className={`bg-gradient-to-r ${stage.color} p-4 rounded-lg text-white mb-2`}>
            <h3 className="font-semibold text-lg">{stage.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm opacity-90">{leads.length} contatos</span>
              <span className="font-bold">{formatBRLCurrency(totalValue)}</span>
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
                <LeadCard key={lead.id} lead={lead} />
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
                  Carregar mais ({leads.length - visibleLeads.length} restantes)
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
