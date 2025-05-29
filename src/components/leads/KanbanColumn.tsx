
import { useState, useEffect } from 'react';
import { KanbanLead, FunnelStage } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LeadCard } from './LeadCard';
import { formatBRLCurrency } from '@/utils/formatting';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, DollarSign } from 'lucide-react';

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
  const [paginationSize, setPaginationSize] = useState(20);
  const visibleLeads = leads.slice(0, visibleCount);
  const hasMore = leads.length > visibleCount;

  const { setNodeRef } = useDroppable({
    id: stage.id,
  });

  // Reset visible count when leads change significantly
  useEffect(() => {
    if (leads.length < visibleCount) {
      setVisibleCount(paginationSize);
    }
  }, [leads.length, paginationSize]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + paginationSize, leads.length));
  };

  const handlePaginationChange = (size: string) => {
    const newSize = parseInt(size);
    setPaginationSize(newSize);
    setVisibleCount(newSize);
  };

  return (
    <div className="flex-shrink-0 w-80">
      <Card className="h-full bg-gray-50/50 border border-gray-200 rounded-xl">
        {/* New Header with Brand Colors */}
        <div className={`bg-gradient-to-r ${stage.color} px-4 py-6 rounded-t-xl text-white`}>
          <div className="space-y-3">
            <h3 className="font-bold text-xl">{stage.name}</h3>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 rounded-full px-3 py-1">
                  <span className="font-semibold text-sm">{leads.length}</span>
                </div>
                <span className="text-sm opacity-90">contatos</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 opacity-90" />
                <span className="font-bold text-lg">{formatBRLCurrency(totalValue)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <CardContent className="pt-4 px-3">
          <div
            ref={setNodeRef}
            className="min-h-[500px] max-h-[600px] overflow-y-auto pr-1"
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
          
          {/* Pagination Controls in Footer */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Exibir por página:</span>
              <Select value={paginationSize.toString()} onValueChange={handlePaginationChange}>
                <SelectTrigger className="w-20 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                  <SelectItem value="60">60</SelectItem>
                  <SelectItem value="80">80</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
