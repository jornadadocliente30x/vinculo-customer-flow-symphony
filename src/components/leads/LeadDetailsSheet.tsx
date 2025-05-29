
import { KanbanLead, Service } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatBRLCurrency } from '@/utils/formatting';
import { 
  Phone, 
  Mail, 
  Building2, 
  Calendar, 
  User, 
  DollarSign,
  MessageSquare,
  FileText,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockServices } from '@/data/mockLeads';
import { useState } from 'react';

interface LeadDetailsSheetProps {
  lead: KanbanLead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (lead: KanbanLead) => void;
  onDelete: (leadId: string) => void;
  onMarkAsWon: (leadId: string) => void;
  onMarkAsLost: (leadId: string) => void;
}

export function LeadDetailsSheet({ 
  lead, 
  isOpen, 
  onClose, 
  onUpdate, 
  onDelete, 
  onMarkAsWon, 
  onMarkAsLost 
}: LeadDetailsSheetProps) {
  const [editedLead, setEditedLead] = useState<KanbanLead | null>(null);
  
  if (!lead) return null;

  const currentLead = editedLead || lead;

  const handleSave = () => {
    if (editedLead) {
      onUpdate(editedLead);
      setEditedLead(null);
    }
    onClose();
  };

  const handleServiceToggle = (service: Service) => {
    if (!editedLead) setEditedLead(lead);
    
    setEditedLead(prev => {
      if (!prev) return prev;
      
      const hasService = prev.services.some(s => s.id === service.id);
      const newServices = hasService 
        ? prev.services.filter(s => s.id !== service.id)
        : [...prev.services, service];
      
      return { ...prev, services: newServices };
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={currentLead.avatar} alt={currentLead.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                {currentLead.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-2xl">{currentLead.name}</SheetTitle>
              <SheetDescription className="text-lg font-semibold text-emerald-600">
                {formatBRLCurrency(currentLead.value)}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações de Contato</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <Input 
                    id="email"
                    value={currentLead.email}
                    onChange={(e) => setEditedLead(prev => prev ? { ...prev, email: e.target.value } : lead)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <Input 
                    id="phone"
                    value={currentLead.phone}
                    onChange={(e) => setEditedLead(prev => prev ? { ...prev, phone: e.target.value } : lead)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  <Input 
                    id="company"
                    value={currentLead.company}
                    onChange={(e) => setEditedLead(prev => prev ? { ...prev, company: e.target.value } : lead)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Valor do Negócio</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <Input 
                    id="value"
                    type="number"
                    value={currentLead.value}
                    onChange={(e) => setEditedLead(prev => prev ? { ...prev, value: Number(e.target.value) } : lead)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Serviços Associados</h3>
            
            <div className="space-y-2">
              {mockServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    <p className="text-sm font-medium text-emerald-600">{formatBRLCurrency(service.price)}</p>
                  </div>
                  <Button
                    variant={currentLead.services.some(s => s.id === service.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleServiceToggle(service)}
                  >
                    {currentLead.services.some(s => s.id === service.id) ? "Remover" : "Adicionar"}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Observações</h3>
            <Textarea 
              placeholder="Adicione observações sobre este lead..."
              value={currentLead.notes || ''}
              onChange={(e) => setEditedLead(prev => prev ? { ...prev, notes: e.target.value } : lead)}
              rows={4}
            />
          </div>

          {/* Lead Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações do Lead</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Criado: {currentLead.createdAt.toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span>Responsável: {currentLead.responsible.name}</span>
              </div>
              <div className="col-span-2">
                <Badge variant="outline">{currentLead.source}</Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 pt-6 border-t">
            <div className="flex space-x-2">
              <Button 
                onClick={() => onMarkAsWon(currentLead.id)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar como Ganho
              </Button>
              <Button 
                onClick={() => onMarkAsLost(currentLead.id)}
                variant="outline"
                className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Marcar como Perdido
              </Button>
            </div>
            
            <Button 
              onClick={() => onDelete(currentLead.id)}
              variant="destructive"
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Lead
            </Button>
          </div>

          {/* Save/Cancel */}
          <div className="flex space-x-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Salvar Alterações
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancelar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
