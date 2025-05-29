
import { KanbanLead } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Building2, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Mail,
  CheckCircle,
  XCircle,
  Trash2
} from 'lucide-react';
import { formatBRLCurrency } from '@/utils/formatting';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phoneNumber = lead.phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${phoneNumber}`, '_blank');
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-200 bg-white border border-gray-200 rounded-xl overflow-hidden"
    >
      <CardContent className="p-4">
        {/* Header with avatar and value */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={lead.avatar} alt={lead.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-gray-900 text-sm truncate">{lead.name}</h4>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <div className="font-bold text-lg text-emerald-600">
              {formatBRLCurrency(lead.value)}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center text-xs text-gray-600 mb-2">
          <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{lead.email}</span>
        </div>

        {/* Company */}
        <div className="flex items-center text-xs text-gray-600 mb-3">
          <Building2 className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{lead.company}</span>
        </div>

        {/* Services */}
        {lead.services && lead.services.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {lead.services.slice(0, 2).map((service) => (
                <Badge key={service.id} variant="secondary" className="text-xs px-2 py-0.5">
                  {service.name}
                </Badge>
              ))}
              {lead.services.length > 2 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{lead.services.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Responsible and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2 flex-shrink-0">
              {lead.responsible.avatar}
            </div>
            <span className="text-xs text-gray-600 truncate">{lead.responsible.name}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{lead.createdAt.toLocaleDateString('pt-BR')}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          {/* First row - Main actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 text-xs border-green-200 text-green-700 hover:bg-green-50"
              onClick={(e) => {
                e.stopPropagation();
                handleWhatsApp(e);
              }}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              WhatsApp
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails?.(lead);
              }}
            >
              <FileText className="h-3 w-3 mr-1" />
              Detalhes
            </Button>
          </div>

          {/* Second row - Status actions */}
          <div className="grid grid-cols-3 gap-1">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-2"
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsWon?.(lead.id);
              }}
            >
              <CheckCircle className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs border-red-200 text-red-700 hover:bg-red-50 px-2"
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsLost?.(lead.id);
              }}
            >
              <XCircle className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs border-gray-200 text-gray-700 hover:bg-gray-50 px-2"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(lead.id);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
