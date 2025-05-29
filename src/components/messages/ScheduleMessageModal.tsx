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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Upload, X, Check, CheckCheck, Clock, Calendar as CalendarIcon, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScheduledMessage, MessageAttachment } from '@/types/messages';
import { mockScheduledMessages } from '@/data/mockConversations';

interface ScheduleMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  onSchedule: (message: Omit<ScheduledMessage, 'id'>) => void;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  patientName: string;
  type: 'appointment' | 'message' | 'follow-up';
}

const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Consulta Dr. Silva',
    date: new Date(2024, 11, 15, 14, 0),
    time: '14:00',
    patientName: 'Maria Santos',
    type: 'appointment'
  },
  {
    id: '2',
    title: 'Lembrete Medicação',
    date: new Date(2024, 11, 16, 9, 0),
    time: '09:00',
    patientName: 'João Costa',
    type: 'message'
  },
  {
    id: '3',
    title: 'Retorno Fisioterapia',
    date: new Date(2024, 11, 18, 16, 30),
    time: '16:30',
    patientName: 'Ana Silva',
    type: 'follow-up'
  }
];

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
  const [scheduledMessages, setScheduledMessages] = useState(mockScheduledMessages);
  const [editingMessage, setEditingMessage] = useState<ScheduledMessage | null>(null);
  const [calendarEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<'week' | 'day'>('week');

  const handleSubmit = () => {
    if (!title || !content || !date || !time) return;

    const [hours, minutes] = time.split(':').map(Number);
    const scheduledDate = new Date(date);
    scheduledDate.setHours(hours, minutes);

    const getFileType = (file: File): MessageAttachment['type'] => {
      if (file.type.startsWith('image/')) return 'image';
      if (file.type.startsWith('video/')) return 'video';
      if (file.type.startsWith('audio/')) return 'audio';
      return 'document';
    };

    if (editingMessage) {
      const updatedMessage: ScheduledMessage = {
        ...editingMessage,
        title,
        description,
        content,
        scheduledDate,
        attachments: attachments.map(file => ({
          id: Math.random().toString(),
          type: getFileType(file),
          url: URL.createObjectURL(file),
          filename: file.name,
          size: file.size,
        })),
      };

      setScheduledMessages(prev => 
        prev.map(msg => msg.id === editingMessage.id ? updatedMessage : msg)
      );
      setEditingMessage(null);
    } else {
      onSchedule({
        conversationId,
        title,
        description,
        content,
        scheduledDate,
        attachments: attachments.map(file => ({
          id: Math.random().toString(),
          type: getFileType(file),
          url: URL.createObjectURL(file),
          filename: file.name,
          size: file.size,
        })),
        status: 'pending',
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setContent('');
    setDate(undefined);
    setTime('');
    setAttachments([]);
    setEditingMessage(null);
  };

  const handleEditMessage = (message: ScheduledMessage) => {
    setEditingMessage(message);
    setTitle(message.title);
    setDescription(message.description);
    setContent(message.content);
    setDate(message.scheduledDate);
    setTime(message.scheduledDate.toTimeString().slice(0, 5));
    setAttachments([]);
  };

  const handleCancelMessage = (messageId: string) => {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      setScheduledMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, status: 'cancelled' as const } : msg
        )
      );
    }
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
      case 'cancelled':
        return <X className="w-4 h-4 text-red-500" />;
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

  const getEventsForDate = (targetDate: Date) => {
    return calendarEvents.filter(event => 
      event.date.toDateString() === targetDate.toDateString()
    );
  };

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-500';
      case 'message':
        return 'bg-green-500';
      case 'follow-up':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedCalendarDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }

    return (
      <div className="grid grid-cols-7 gap-2 h-64">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dayName, index) => (
          <div key={dayName} className="text-center">
            <div className="font-medium text-sm text-gray-600 mb-2">{dayName}</div>
            <div className="border rounded-lg p-2 h-48 overflow-y-auto">
              <div className="text-lg font-bold text-center mb-2">
                {weekDays[index].getDate()}
              </div>
              <div className="space-y-1">
                {getEventsForDate(weekDays[index]).map((event) => (
                  <Tooltip key={event.id}>
                    <TooltipTrigger asChild>
                      <div className={`text-xs p-1 rounded text-white ${getEventTypeColor(event.type)}`}>
                        <div className="font-medium truncate">{event.time}</div>
                        <div className="truncate">{event.patientName}</div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <div className="font-medium">{event.title}</div>
                        <div>{event.patientName}</div>
                        <div>{event.time}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDayView = () => {
    const events = getEventsForDate(selectedCalendarDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="h-64 overflow-y-auto">
        <div className="space-y-2">
          {hours.map((hour) => {
            const hourEvents = events.filter(event => event.date.getHours() === hour);
            return (
              <div key={hour} className="flex items-start space-x-2 border-b border-gray-100 pb-2">
                <div className="w-16 text-sm text-gray-500 font-mono">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                <div className="flex-1">
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-2 rounded text-white text-sm mb-1 ${getEventTypeColor(event.type)}`}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs">{event.patientName} - {event.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMessage ? 'Editar Agendamento' : 'Agendamento de Mensagens'}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="schedule">
                {editingMessage ? 'Editar Mensagem' : 'Nova Mensagem'}
              </TabsTrigger>
              <TabsTrigger value="list">Mensagens Agendadas</TabsTrigger>
              <TabsTrigger value="calendar">Calendário</TabsTrigger>
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
                <Button 
                  variant="outline" 
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!title || !content || !date || !time}
                  className="bg-gradient-brand hover:opacity-90"
                >
                  {editingMessage ? 'Salvar Alterações' : 'Agendar Mensagem'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Mensagens Agendadas</h3>
                
                {scheduledMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhuma mensagem agendada</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {scheduledMessages.map((scheduledMessage) => (
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
                            
                            {/* Action buttons */}
                            <div className="flex space-x-2 ml-4">
                              {scheduledMessage.status === 'pending' && (
                                <>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEditMessage(scheduledMessage)}
                                      >
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Editar agendamento</TooltipContent>
                                  </Tooltip>
                                  
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleCancelMessage(scheduledMessage.id)}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Cancelar agendamento</TooltipContent>
                                  </Tooltip>
                                </>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold">
                    {selectedCalendarDate.toLocaleDateString('pt-BR', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newDate = new Date(selectedCalendarDate);
                        newDate.setDate(newDate.getDate() - (calendarView === 'week' ? 7 : 1));
                        setSelectedCalendarDate(newDate);
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newDate = new Date(selectedCalendarDate);
                        newDate.setDate(newDate.getDate() + (calendarView === 'week' ? 7 : 1));
                        setSelectedCalendarDate(newDate);
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={calendarView === 'week' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCalendarView('week')}
                  >
                    Semana
                  </Button>
                  <Button
                    variant={calendarView === 'day' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCalendarView('day')}
                  >
                    Dia
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCalendarDate(new Date())}
                  >
                    Hoje
                  </Button>
                </div>
              </div>

              {/* Calendar Legend */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Consultas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Mensagens</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span>Retornos</span>
                </div>
              </div>

              {/* Calendar View */}
              {calendarView === 'week' ? renderWeekView() : renderDayView()}

              {/* Statistics */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {calendarEvents.filter(e => e.type === 'appointment').length}
                      </div>
                      <div className="text-sm text-gray-600">Consultas do Mês</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {calendarEvents.filter(e => e.type === 'message').length}
                      </div>
                      <div className="text-sm text-gray-600">Mensagens Agendadas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {calendarEvents.filter(e => e.type === 'follow-up').length}
                      </div>
                      <div className="text-sm text-gray-600">Retornos Programados</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
