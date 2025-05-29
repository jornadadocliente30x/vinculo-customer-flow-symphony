
import { KanbanLead } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Building2, Calendar, MessageSquare, FileText } from 'lucide-react';
import { formatBRLCurrency } from '@/utils/formatting';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface LeadCardProps {
  lead: KanbanLead;
}

export function LeadCard({ lead }: LeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3 cursor-grab active:cursor-grabbing hover:shadow-medium transition-all duration-200 bg-white border border-gray-200 rounded-xl"
    >
      <CardContent className="p-4">
        {/* Header with name and value */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">{lead.name}</h4>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Phone className="h-3 w-3 mr-1" />
              {lead.phone}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-emerald-600">
              {formatBRLCurrency(lead.value)}
            </div>
          </div>
        </div>

        {/* Company */}
        <div className="flex items-center text-xs text-gray-600 mb-3">
          <Building2 className="h-3 w-3 mr-1" />
          {lead.company}
        </div>

        {/* Responsible */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2">
              {lead.responsible.avatar}
            </div>
            <span className="text-xs text-gray-600">{lead.responsible.name}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            {lead.createdAt.toLocaleDateString('pt-BR')}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 h-8 text-xs border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Atividades
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 h-8 text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <FileText className="h-3 w-3 mr-1" />
            Detalhes
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 h-8 text-xs border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
