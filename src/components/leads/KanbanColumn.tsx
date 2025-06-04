
import { KanbanLead, FunnelStage } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LeadCard } from './LeadCard';
import { formatBRLCurrency } from '@/utils/formatting';
import { useDroppable } from '@dnd-kit/core';

interface KanbanColumnProps {
  stage: FunnelStage;
  leads: KanbanLead[];
  totalValue: number;
  onOpenDetails?: (lead: KanbanLead) => void;
  onMarkAsWon?: (leadId: string) => void;
  onMarkAsLost?: (leadId: string) => void;
  onDelete?: (leadId: string) => void;
  onEditContact?: (lead: KanbanLead) => void;
}

export function KanbanColumn({ 
  stage, 
  leads, 
  totalValue, 
  onOpenDetails, 
  onMarkAsWon, 
  onMarkAsLost, 
  onDelete,
  onEditContact
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  });

  return (
    <Card className={`w-80 flex-shrink-0 bg-gray-50 ${isOver ? 'ring-2 ring-blue-500' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-gray-700">
            {stage.name}
          </CardTitle>
          <Badge 
            variant="secondary" 
            className={`${stage.color} text-white border-0`}
          >
            {leads.length}
          </Badge>
        </div>
        <div className="text-lg font-bold text-emerald-600">
          {formatBRLCurrency(totalValue)}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div 
          ref={setNodeRef}
          className="space-y-2 min-h-[500px]"
        >
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onOpenDetails={onOpenDetails}
              onMarkAsWon={onMarkAsWon}
              onMarkAsLost={onMarkAsLost}
              onDelete={onDelete}
              onEditContact={onEditContact}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
