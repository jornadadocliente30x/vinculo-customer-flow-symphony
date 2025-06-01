import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, MessageSquare, Users, ChevronLeft, ChevronRight, Edit, Trash2, Save, X, Plus, UserCheck } from 'lucide-react';
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
  doctorName: string;
  time: string;
  service: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  service?: string;
  duration?: string;
  price?: string;
  isActive: boolean;
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
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
  const [selectedService, setSelectedService] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [activeTab, setActiveTab] = useState('hoje');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ScheduledAppointment>>({});
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [doctorForm, setDoctorForm] = useState<Partial<Doctor>>({});
  const [editingDoctor, setEditingDoctor] = useState<string | null>(null);

  // Mock data for services
  const [services] = useState<Service[]>([
    { id: '1', name: 'Consulta Geral', duration: 30, price: 150 },
    { id: '2', name: 'Limpeza Dental', duration: 45, price: 120 },
    { id: '3', name: 'Extração', duration: 60, price: 200 },
    { id: '4', name: 'Canal', duration: 90, price: 400 },
    { id: '5', name: 'Ortodontia', duration: 60, price: 300 },
    { id: '6', name: 'Implante', duration: 120, price: 800 }
  ]);

  // Mock data for doctors
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: '1', name: 'Dr. João Pereira', specialty: 'Clínico Geral', crm: '12345-SP', isActive: true },
    { id: '2', name: 'Dra. Ana Costa', specialty: 'Ortodontista', crm: '23456-SP', isActive: true },
    { id: '3', name: 'Dr. Carlos Silva', specialty: 'Cirurgião', crm: '34567-SP', isActive: true },
    { id: '4', name: 'Dra. Maria Santos', specialty: 'Endodontista', crm: '45678-SP', isActive: true }
  ]);

  // Mock data para os agendamentos
  const [todayAppointments, setTodayAppointments] = useState<ScheduledAppointment[]>([
    { id: '1', patientName: 'Maria Silva', doctorName: 'Dr. João Pereira', time: '09:00', service: 'Consulta', status: 'confirmed' },
    { id: '2', patientName: 'João Santos', doctorName: 'Dr. Ana Costa', time: '10:30', service: 'Fisioterapia', status: 'pending' },
    { id: '3', patientName: 'Ana Costa', doctorName: 'Dr. Carlos Silva', time: '14:00', service: 'Retorno', status: 'confirmed' },
    { id: '4', patientName: 'Pedro Lima', doctorName: 'Dr. Maria Santos', time: '16:15', service: 'Exame', status: 'confirmed' }
  ]);

  const [weeklyAppointments, setWeeklyAppointments] = useState<ScheduledAppointment[]>([
    { id: '5', patientName: 'Carla Souza', doctorName: 'Dr. João Pereira', time: 'Seg 08:30', service: 'Consulta', status: 'confirmed' },
    { id: '6', patientName: 'Paulo Silva', doctorName: 'Dr. Ana Costa', time: 'Ter 11:00', service: 'Fisioterapia', status: 'pending' },
    { id: '7', patientName: 'Lucia Santos', doctorName: 'Dr. Carlos Silva', time: 'Qua 13:20', service: 'Retorno', status: 'confirmed' },
    { id: '8', patientName: 'Roberto Costa', doctorName: 'Dr. Maria Santos', time: 'Qui 15:45', service: 'Consulta', status: 'confirmed' },
    { id: '9', patientName: 'Sandra Lima', doctorName: 'Dr. João Pereira', time: 'Sex 09:15', service: 'Exame', status: 'pending' }
  ]);

  const [monthlyAppointments, setMonthlyAppointments] = useState<ScheduledAppointment[]>([
    { id: '10', patientName: 'Carlos Pereira', doctorName: 'Dr. Ana Costa', time: '08:00', service: 'Consulta', status: 'confirmed' },
    { id: '11', patientName: 'Fernanda Oliveira', doctorName: 'Dr. Carlos Silva', time: '10:00', service: 'Fisioterapia', status: 'confirmed' },
    { id: '12', patientName: 'Ricardo Santos', doctorName: 'Dr. Maria Santos', time: '14:30', service: 'Retorno', status: 'pending' }
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
    setSelectedService('');
    setSelectedDoctor('');
    onClose();
  };

  // Doctor management functions
  const handleCreateDoctor = () => {
    setEditingDoctor(null);
    setDoctorForm({});
    setShowDoctorModal(true);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor.id);
    setDoctorForm(doctor);
    setShowDoctorModal(true);
  };

  // Generate medical service options combining services and doctors
  const getMedicalServiceOptions = () => {
    const options: Array<{id: string, label: string, serviceId: string, doctorId: string}> = [];
    
    // First add services with doctors that have matching service/price info
    doctors
      .filter(doctor => doctor.isActive && doctor.service && doctor.duration && doctor.price)
      .forEach(doctor => {
        options.push({
          id: `${doctor.service}-${doctor.id}`,
          label: `${doctor.service} ${doctor.duration}min R$${doctor.price} - ${doctor.name}`,
          serviceId: doctor.service || '',
          doctorId: doctor.id
        });
      });

    // Then add general services with any available doctor
    services.forEach(service => {
      doctors
        .filter(doctor => doctor.isActive && (!doctor.service || doctor.service === service.name))
        .forEach(doctor => {
          const existingOption = options.find(opt => 
            opt.serviceId === service.name && opt.doctorId === doctor.id
          );
          
          if (!existingOption) {
            options.push({
              id: `${service.id}-${doctor.id}`,
              label: `${service.name} ${service.duration}min R$${service.price} - ${doctor.name}`,
              serviceId: service.id,
              doctorId: doctor.id
            });
          }
        });
    });

    return options;
  };

  const handleSaveDoctor = () => {
    if (!doctorForm.name || !doctorForm.specialty || !doctorForm.crm) return;

    if (editingDoctor) {
      // Edit existing doctor
      setDoctors(prev => prev.map(doc => 
        doc.id === editingDoctor 
          ? { ...doc, ...doctorForm } as Doctor
          : doc
      ));
    } else {
      // Create new doctor
      const newDoctor: Doctor = {
        id: (doctors.length + 1).toString(),
        name: doctorForm.name!,
        specialty: doctorForm.specialty!,
        crm: doctorForm.crm!,
        isActive: true
      };
      setDoctors(prev => [...prev, newDoctor]);
    }

    setShowDoctorModal(false);
    setDoctorForm({});
    setEditingDoctor(null);
  };

  const handleDeleteDoctor = (doctorId: string) => {
    if (!confirm('Tem certeza que deseja excluir este médico?')) return;
    setDoctors(prev => prev.filter(doc => doc.id !== doctorId));
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
      case 'mês':
        setMonthlyAppointments(updateAppointments);
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
      case 'mês':
        setMonthlyAppointments(deleteFromList);
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-gray-600">Serviço</Label>
                    <Input
                      value={editForm.service || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, service: e.target.value }))}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Médico</Label>
                    <Input
                      value={editForm.doctorName || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, doctorName: e.target.value }))}
                      className="h-8 text-sm"
                    />
                  </div>
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
                      <span>•</span>
                      <span className="text-brand-600 font-medium">{appointment.doctorName}</span>
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
      case 'mês':
        return { appointments: monthlyAppointments, count: monthlyAppointments.length };
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
            <TabsTrigger value="mês" className="relative">
              Mês
              {activeTab === 'mês' && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {monthlyAppointments.length}
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

            {/* Service and Doctor Selectors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service">Serviço Médico</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um serviço médico" />
                  </SelectTrigger>
                  <SelectContent>
                    {getMedicalServiceOptions().map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Gerenciar Médicos</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCreateDoctor}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Novo Médico
                </Button>
              </div>

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

          <TabsContent value="mês" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Agendamentos do Mês</h3>
                  <p className="text-sm text-gray-600">
                    {currentDate.toLocaleDateString('pt-BR', { 
                      month: 'long',
                      year: 'numeric'
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
                    newDate.setMonth(newDate.getMonth() - 1);
                    setCurrentDate(newDate);
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Badge variant="outline" className="text-brand-600 border-brand-300">
                  {monthlyAppointments.length} agendamentos
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setCurrentDate(newDate);
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {renderAppointmentsList(monthlyAppointments)}
          </TabsContent>
        </Tabs>
      </DialogContent>

      {/* Doctor Management Modal */}
      <Dialog open={showDoctorModal} onOpenChange={setShowDoctorModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-brand-500" />
              <span>{editingDoctor ? 'Editar Médico' : 'Novo Médico'}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="doctorName">Nome Completo</Label>
                <Input
                  id="doctorName"
                  value={doctorForm.name || ''}
                  onChange={(e) => setDoctorForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Dr. João Silva"
                />
              </div>
              <div>
                <Label htmlFor="doctorCrm">CRM</Label>
                <Input
                  id="doctorCrm"
                  value={doctorForm.crm || ''}
                  onChange={(e) => setDoctorForm(prev => ({ ...prev, crm: e.target.value }))}
                  placeholder="Ex: 12345-SP"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="doctorSpecialty">Especialidade</Label>
              <Input
                id="doctorSpecialty"
                value={doctorForm.specialty || ''}
                onChange={(e) => setDoctorForm(prev => ({ ...prev, specialty: e.target.value }))}
                placeholder="Ex: Clínico Geral, Ortodontista"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="doctorService">Serviço</Label>
                <Input
                  id="doctorService"
                  value={doctorForm.service || ''}
                  onChange={(e) => setDoctorForm(prev => ({ ...prev, service: e.target.value }))}
                  placeholder="Ex: Consulta, Extração"
                />
              </div>
              <div>
                <Label htmlFor="doctorTime">Tempo (min)</Label>
                <Input
                  id="doctorTime"
                  type="number"
                  value={doctorForm.duration || ''}
                  onChange={(e) => setDoctorForm(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="60"
                />
              </div>
              <div>
                <Label htmlFor="doctorPrice">Valor (R$)</Label>
                <Input
                  id="doctorPrice"
                  value={doctorForm.price || ''}
                  onChange={(e) => setDoctorForm(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="150,00"
                />
              </div>
            </div>

            {/* Existing Doctors List */}
            {!editingDoctor && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Médicos Cadastrados</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                      <div>
                        <p className="font-medium text-sm">{doctor.name}</p>
                        <p className="text-xs text-gray-600">
                          {doctor.specialty} - CRM: {doctor.crm}
                          {doctor.service && doctor.duration && doctor.price && (
                            <span className="block">{doctor.service} {doctor.duration}min R${doctor.price}</span>
                          )}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditDoctor(doctor)}
                          className="h-7 w-7 p-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDoctor(doctor.id)}
                          className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowDoctorModal(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveDoctor}
                disabled={!doctorForm.name || !doctorForm.specialty || !doctorForm.crm || !doctorForm.service || !doctorForm.duration || !doctorForm.price}
                className="bg-gradient-brand hover:opacity-90"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingDoctor ? 'Salvar Alterações' : 'Criar Médico'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
