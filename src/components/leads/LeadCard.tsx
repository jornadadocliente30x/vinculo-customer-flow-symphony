
import { KanbanLead } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';
import { formatBRLCurrency } from '@/utils/formatting';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useNavigate } from 'react-router-dom';

interface LeadCardProps {
  lead: KanbanLead;
  onOpenDetails?: (lead: KanbanLead) => void;
  onMarkAsWon?: (leadId: string) => void;
  onMarkAsLost?: (leadId: string) => void;
  onDelete?: (leadId: string) => void;
}

export function LeadCard({ 
  lead, 
  onOpenDetails, 
  onMarkAsWon, 
  onMarkAsLost, 
  onDelete 
}: LeadCardProps) {
  const navigate = useNavigate();
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

  const handleWhatsAppChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to WhatsApp chat with this contact
    navigate(`/dashboard/messages/whatsapp?contact=${lead.id}`);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 bg-white border border-gray-200 rounded-lg overflow-hidden"
    >
      <CardContent className="p-3">
        {/* Nome e Telefone */}
        <div className="mb-3">
          <h4 className="font-semibold text-gray-900 text-sm truncate">{lead.name}</h4>
          <p className="text-xs text-gray-600 truncate">{lead.phone}</p>
        </div>

        {/* Valor */}
        <div className="mb-3">
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">
              {formatBRLCurrency(lead.value)}
            </div>
          </div>
        </div>

        {/* Footer: Responsável e WhatsApp */}
        <div className="flex items-center justify-between">
          {/* Responsible Photo */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              {lead.responsible.avatar}
            </div>
            <span className="text-xs text-gray-600 truncate max-w-[60px]">
              {lead.responsible.name.split(' ')[0]}
            </span>
          </div>

          {/* WhatsApp Button */}
          <Button 
            size="sm" 
            variant="outline" 
            className="h-6 px-2 border-green-200 text-green-700 hover:bg-green-50"
            onClick={handleWhatsAppChat}
          >
            <MessageSquare className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
