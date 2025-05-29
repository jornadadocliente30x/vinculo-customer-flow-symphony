import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MessageSquare, Users, ChevronLeft, ChevronRight, Edit, Trash2, Save, X } from 'lucide-react';
import { ScheduledMessage } from '@/types/messages';

interface ScheduleMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  onSchedule: (scheduledMessage: Omit<ScheduledMessage, 'id'>) => void;
}

interface ScheduledAppointment {
  id: string;
  patientName: string;
  time: string;
  service: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export function ScheduleMessageModal({
  isOpen,
  onClose,
  conversationId,
  onSchedule
}: ScheduleMessageModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [activeTab, setActiveTab] = useState('hoje');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ScheduledAppointment>>({});

  // Mock data para os agendamentos
  const [todayAppointments, setTodayAppointments] = useState<ScheduledAppointment[]>([
    { id: '1', patientName: 'Maria Silva', time: '09:00', service: 'Consulta', status: 'confirmed' },
    { id: '2', patientName: 'João Santos', time: '10:30', service: 'Fisioterapia', status: 'pending' },
    { id: '3', patientName: 'Ana Costa', time: '14:00', service: 'Retorno', status: 'confirmed' },
    { id: '4', patientName: 'Pedro Lima', time: '16:15', service: 'Exame', status: 'confirmed' }
  ]);

  const [weeklyAppointments, setWeeklyAppointments] = useState<ScheduledAppointment[]>([
    { id: '5', patientName: 'Carla Souza', time: 'Seg 08:30', service: 'Consulta', status: 'confirmed' },
    { id: '6', patientName: 'Paulo Silva', time: 'Ter 11:00', service: 'Fisioterapia', status: 'pending' },
    { id: '7', patientName: 'Lucia Santos', time: 'Qua 13:20', service: 'Retorno', status: 'confirmed' },
    { id: '8', patientName: 'Roberto Costa', time: 'Qui 15:45', service: 'Consulta', status: 'confirmed' },
    { id: '9', patientName: 'Sandra Lima', time: 'Sex 09:15', service: 'Exame', status: 'pending' }
  ]);

  const [dailyAppointments, setDailyAppointments] = useState<ScheduledAppointment[]>([
    { id: '10', patientName: 'Carlos Pereira', time: '08:00', service: 'Consulta', status: 'confirmed' },
    { id: '11', patientName: 'Fernanda Oliveira', time: '10:00', service: 'Fisioterapia', status: 'confirmed' },
    { id: '12', patientName: 'Ricardo Santos', time: '14:30', service: 'Retorno', status: 'pending' }
  ]);

  const handleSubmit = () => {
    if (!title || !content || !scheduledDate || !scheduledTime) return;

    const dateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    
    onSchedule({
      conversationId,
      title,
      description: content,
      content,
      scheduledDate: dateTime,
      status: 'pending'
    });

    // Reset form
    setTitle('');
    setContent('');
    setScheduledDate('');
    setScheduledTime('');
    onClose();
  };

  const handleEditAppointment = (appointment: ScheduledAppointment) => {
    setEditingAppointment(appointment.id);
    setEditForm(appointment);
  };

  const handleSaveEdit = () => {
    if (!editingAppointment || !editForm.patientName || !editForm.time || !editForm.service) return;

    const updateAppointments = (appointments: ScheduledAppointment[]) =>
      appointments.map(apt => 
        apt.id === editingAppointment 
          ? { ...apt, ...editForm } as ScheduledAppointment
          : apt
      );

    // Update the appropriate list based on active tab
    switch (activeTab) {
      case 'hoje':
        setTodayAppointments(updateAppointments);
        break;
      case 'semana':
        setWeeklyAppointments(updateAppointments);
        break;
      case 'dia':
        setDailyAppointments(updateAppointments);
        break;
    }

    setEditingAppointment(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
    setEditForm({});
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    if (!confirm('Tem certeza que deseja excluir este agendamento?')) return;

    const deleteFromList = (appointments: ScheduledAppointment[]) =>
      appointments.filter(apt => apt.id !== appointmentId);

    switch (activeTab) {
      case 'hoje':
        setTodayAppointments(deleteFromList);
        break;
      case 'semana':
        setWeeklyAppointments(deleteFromList);
        break;
      case 'dia':
        setDailyAppointments(deleteFromList);
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: 'bg-green-100 text-green-800 hover:bg-green-200',
      pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      cancelled: 'bg-red-100 text-red-800 hover:bg-red-200'
    };

    const labels = {
      confirmed: 'Confirmado',
      pending: 'Pendente',
      cancelled: 'Cancelado'
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border-none text-xs transition-colors`}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const renderAppointmentsList = (appointments: ScheduledAppointment[], showDate = false) => (
    <div className="space-y-3">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            {editingAppointment === appointment.id ? (
              // Edit Mode
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-gray-600">Nome do Paciente</Label>
                    <Input
                      value={editForm.patientName || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, patientName: e.target.value }))}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Horário</Label>
                    <Input
                      value={editForm.time || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, time: e.target.value }))}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Serviço</Label>
                  <Input
                    value={editForm.service || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, service: e.target.value }))}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="h-7 px-3 text-xs"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveEdit}
                    className="h-7 px-3 text-xs bg-brand-500 hover:bg-brand-600"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Salvar
                  </Button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-brand rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{appointment.time}</span>
                      <span>•</span>
                      <span>{appointment.service}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(appointment.status)}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditAppointment(appointment)}
                    className="h-8 w-8 p-0 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    className="h-8 w-8 p-0 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const getCurrentTabData = () => {
    switch (activeTab) {
      case 'hoje':
        return { appointments: todayAppointments, count: todayAppointments.length };
      case 'semana':
        return { appointments: weeklyAppointments, count: weeklyAppointments.length };
      case 'dia':
        return { appointments: dailyAppointments, count: dailyAppointments.length };
      default:
        return { appointments: [], count: 0 };
    }
  };

  const { appointments, count } = getCurrentTabData();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-brand-500" />
            <span>Agendamento de Mensagens</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="agendar">Agendar</TabsTrigger>
            <TabsTrigger value="hoje" className="relative">
              Hoje
              {activeTab === 'hoje' && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {todayAppointments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="semana" className="relative">
              Semana
              {activeTab === 'semana' && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {weeklyAppointments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="dia" className="relative">
              Dia
              {activeTab === 'dia' && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {dailyAppointments.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agendar" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título da Mensagem</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Lembrete de consulta"
                />
              </div>
              <div>
                <Label htmlFor="scheduledDate">Data</Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="scheduledTime">Horário</Label>
              <Input
                id="scheduledTime"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="content">Conteúdo da Mensagem</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Digite a mensagem que será enviada..."
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!title || !content || !scheduledDate || !scheduledTime}
                className="bg-gradient-brand hover:opacity-90"
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Agendar Mensagem
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="hoje" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Agendamentos de Hoje</h3>
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <Badge variant="outline" className="text-brand-600 border-brand-300">
                {todayAppointments.length} agendamentos
              </Badge>
            </div>
            {renderAppointmentsList(todayAppointments)}
          </TabsContent>

          <TabsContent value="semana" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Agendamentos da Semana</h3>
                <p className="text-sm text-gray-600">Vista semanal dos próximos agendamentos</p>
              </div>
              <Badge variant="outline" className="text-brand-600 border-brand-300">
                {weeklyAppointments.length} agendamentos
              </Badge>
            </div>
            {renderAppointmentsList(weeklyAppointments, true)}
          </TabsContent>

          <TabsContent value="dia" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Agendamentos do Dia</h3>
                  <p className="text-sm text-gray-600">
                    {currentDate.toLocaleDateString('pt-BR', { 
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long' 
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(newDate.getDate() - 1);
                    setCurrentDate(newDate);
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Badge variant="outline" className="text-brand-600 border-brand-300">
                  {dailyAppointments.length} agendamentos
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(newDate.getDate() + 1);
                    setCurrentDate(newDate);
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {renderAppointmentsList(dailyAppointments)}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
