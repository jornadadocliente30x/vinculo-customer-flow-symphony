
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Check, CheckCheck, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { ScheduledMessage } from '@/types/messages';
import { mockScheduledMessages } from '@/data/mockConversations';

interface ScheduleMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  onSchedule: (message: Omit<ScheduledMessage, 'id'>) => void;
}

export function ScheduleMessageModal({ 
  isOpen, 
  onClose, 
  conversationId, 
  onSchedule 
}: ScheduleMessageModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = () => {
    if (!title || !content || !date || !time) return;

    const [hours, minutes] = time.split(':').map(Number);
    const scheduledDate = new Date(date);
    scheduledDate.setHours(hours, minutes);

    onSchedule({
      conversationId,
      title,
      description,
      content,
      scheduledDate,
      attachments: attachments.map(file => ({
        id: Math.random().toString(),
        type: file.type.startsWith('image') ? 'image' : 
              file.type.startsWith('video') ? 'video' : 'document',
        url: URL.createObjectURL(file),
        filename: file.name,
        size: file.size,
      })),
      status: 'pending',
    });

    // Reset form
    setTitle('');
    setDescription('');
    setContent('');
    setDate(undefined);
    setTime('');
    setAttachments([]);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getStatusIcon = (status: ScheduledMessage['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-brand-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: ScheduledMessage['status']) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      sent: 'bg-gray-100 text-gray-800',
      delivered: 'bg-blue-100 text-blue-800',
      read: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    const labels = {
      pending: 'Pendente',
      sent: 'Enviada',
      delivered: 'Entregue',
      read: 'Lida',
      cancelled: 'Cancelada',
    };

    return (
      <Badge className={`${variants[status]} border-none`}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agendamento de Mensagens</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="schedule">Nova Mensagem</TabsTrigger>
            <TabsTrigger value="list">Mensagens Agendadas</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título do agendamento"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do agendamento (opcional)"
                rows={3}
              />
            </div>

            {/* Message Content */}
            <div>
              <Label htmlFor="content">Mensagem</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Digite a mensagem que será enviada"
                rows={4}
              />
            </div>

            {/* File Attachments */}
            <div>
              <Label>Anexos</Label>
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Clique para enviar arquivos
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">
                          PNG, JPG, PDF, DOC até 10MB
                        </span>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleFileUpload}
                          accept="image/*,video/*,.pdf,.doc,.docx"
                        />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attachment List */}
              {attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!title || !content || !date || !time}
                className="bg-gradient-brand hover:opacity-90"
              >
                Agendar Mensagem
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Mensagens Agendadas</h3>
              
              {mockScheduledMessages.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma mensagem agendada</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mockScheduledMessages.map((scheduledMessage) => (
                    <Card key={scheduledMessage.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-900">{scheduledMessage.title}</h4>
                              {getStatusIcon(scheduledMessage.status)}
                              {getStatusBadge(scheduledMessage.status)}
                            </div>
                            
                            {scheduledMessage.description && (
                              <p className="text-sm text-gray-600 mb-2">{scheduledMessage.description}</p>
                            )}
                            
                            <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded">
                              {scheduledMessage.content}
                            </p>
                            
                            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                              <span>
                                Agendado para: {scheduledMessage.scheduledDate.toLocaleString('pt-BR')}
                              </span>
                              {scheduledMessage.deliveredAt && (
                                <span>
                                  Entregue em: {scheduledMessage.deliveredAt.toLocaleString('pt-BR')}
                                </span>
                              )}
                              {scheduledMessage.readAt && (
                                <span>
                                  Lida em: {scheduledMessage.readAt.toLocaleString('pt-BR')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
