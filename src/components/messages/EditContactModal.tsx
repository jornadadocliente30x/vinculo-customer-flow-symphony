import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ToothSelector } from './ToothSelector';
import { Upload, Plus, Edit, Trash2, Calendar, Star, FileText, Save, X } from 'lucide-react';
import { Contact } from '@/types/messages';
import { formatBRLCurrency, formatCurrencyInput, parseCurrencyToNumber } from '@/utils/formatting';

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
  onSaveContact: (contact: Contact) => void;
}

interface MedicalRecord {
  id: string;
  date: Date;
  doctor: string;
  diagnosis: string;
  prescription?: string;
  notes?: string;
  selectedTeeth?: number[];
}

interface Treatment {
  id: string;
  date: Date;
  service: string;
  professional: string;
  status: 'completed' | 'ongoing' | 'scheduled';
  notes?: string;
  evolution?: string;
}

interface Payment {
  id: string;
  date: Date;
  amount: number;
  service: string;
  status: 'paid' | 'pending' | 'overdue';
  rating?: number;
  feedback?: string;
}

export function EditContactModal({ isOpen, onClose, contact, onSaveContact }: EditContactModalProps) {
  const [firstName, setFirstName] = useState(contact?.firstName || '');
  const [lastName, setLastName] = useState(contact?.lastName || '');
  const [phone, setPhone] = useState(contact?.phone || '');
  const [email, setEmail] = useState(contact?.email || '');
  const [description, setDescription] = useState(contact?.description || '');
  const [avatar, setAvatar] = useState(contact?.avatar || '');
  const [birthDate, setBirthDate] = useState(contact?.birthDate || '');
  const [address, setAddress] = useState(contact?.address || '');
  const [city, setCity] = useState(contact?.city || '');
  const [state, setState] = useState(contact?.state || '');
  const [cpf, setCpf] = useState(contact?.cpf || '');
  
  // States for editing
  const [editingRecord, setEditingRecord] = useState<string | null>(null);
  const [editingTreatment, setEditingTreatment] = useState<string | null>(null);
  const [editingPayment, setEditingPayment] = useState<string | null>(null);

  // Odontograma state - armazena o estado de cada dente
  const [toothStates, setToothStates] = useState<Record<number, 'normal' | 'carie' | 'restauracao' | 'ausente'>>({});
  const [selectedToothColor, setSelectedToothColor] = useState<'normal' | 'carie' | 'restauracao' | 'ausente'>('normal');

  // Mock data with editable states
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      date: new Date('2024-01-15'),
      doctor: 'Dr. João Silva',
      diagnosis: 'Consulta de rotina - Hipertensão controlada',
      prescription: 'Losartana 50mg - 1x ao dia',
      notes: 'Paciente apresenta boa evolução no controle da pressão arterial.',
      selectedTeeth: [11, 12, 21, 22]
    }
  ]);

  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: '1',
      date: new Date('2024-01-20'),
      service: 'Fisioterapia',
      professional: 'Dra. Ana Costa',
      status: 'ongoing',
      notes: 'Tratamento para dor lombar',
      evolution: 'Paciente com melhora significativa na mobilidade.'
    }
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      date: new Date('2024-01-15'),
      amount: 150.00,
      service: 'Consulta Médica',
      status: 'paid',
      rating: 5,
      feedback: 'Excelente atendimento, médico muito atencioso.'
    }
  ]);

  const [newRecord, setNewRecord] = useState({
    doctor: '',
    diagnosis: '',
    prescription: '',
    notes: '',
    selectedTeeth: [] as number[]
  });

  const [newTreatment, setNewTreatment] = useState({
    service: '',
    professional: '',
    notes: '',
    evolution: ''
  });

  const [newPayment, setNewPayment] = useState({
    amount: '',
    service: '',
    status: 'pending' as Payment['status'],
    rating: 0,
    feedback: ''
  });

  // Mock data for medical services (doctors with their services)
  const mockDoctors = [
    { id: '1', name: 'Dr. João Pereira', specialty: 'Clínico Geral', service: 'Consulta Geral', duration: 30, price: 150 },
    { id: '2', name: 'Dra. Ana Costa', specialty: 'Ortodontista', service: 'Limpeza Dental', duration: 45, price: 120 },
    { id: '3', name: 'Dr. Carlos Silva', specialty: 'Cirurgião', service: 'Extração', duration: 60, price: 200 },
    { id: '4', name: 'Dra. Maria Santos', specialty: 'Endodontista', service: 'Canal', duration: 90, price: 400 },
    { id: '5', name: 'Dra. Ana Furtado', specialty: 'Ortodontista', service: 'Ortodontia', duration: 60, price: 300 }
  ];

  // State for medical service selection
  const [selectedMedicalService, setSelectedMedicalService] = useState('');

  // Generate medical service options
  const getMedicalServiceOptions = () => {
    return mockDoctors.map(doctor => ({
      id: `${doctor.service}-${doctor.id}`,
      label: `${doctor.service} ${doctor.duration}min R$${doctor.price.toFixed(2).replace('.', ',')} - ${doctor.name}`,
      service: doctor.service,
      price: doctor.price,
      doctorName: doctor.name
    }));
  };

  // Handle medical service selection
  const handleMedicalServiceChange = (value: string) => {
    setSelectedMedicalService(value);
    const option = getMedicalServiceOptions().find(opt => opt.id === value);
    if (option) {
      setNewPayment(prev => ({
        ...prev,
        service: option.service,
        amount: `R$ ${option.price.toFixed(2).replace('.', ',')}`
      }));
    }
  };

  const handleSubmit = () => {
    if (!contact || !firstName || !phone) return;

    const updatedContact: Contact = {
      ...contact,
      firstName,
      lastName,
      phone,
      email,
      description,
      avatar,
      birthDate,
      address,
      city,
      state,
      cpf,
    };

    onSaveContact(updatedContact);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  // Medical Records functions
  const addMedicalRecord = () => {
    if (!newRecord.doctor || !newRecord.diagnosis) return;
    
    const record: MedicalRecord = {
      id: Date.now().toString(),
      date: new Date(),
      doctor: newRecord.doctor,
      diagnosis: newRecord.diagnosis,
      prescription: newRecord.prescription,
      notes: newRecord.notes,
      selectedTeeth: newRecord.selectedTeeth
    };
    
    setMedicalRecords(prev => [record, ...prev]);
    setNewRecord({ doctor: '', diagnosis: '', prescription: '', notes: '', selectedTeeth: [] });
  };

  const deleteRecord = (id: string) => {
    setMedicalRecords(prev => prev.filter(r => r.id !== id));
  };

  const saveRecordEdit = (id: string, updatedRecord: Partial<MedicalRecord>) => {
    setMedicalRecords(prev => prev.map(r => r.id === id ? { ...r, ...updatedRecord } : r));
    setEditingRecord(null);
  };

  // Treatment functions
  const addTreatment = () => {
    if (!newTreatment.service || !newTreatment.professional) return;
    
    const treatment: Treatment = {
      id: Date.now().toString(),
      date: new Date(),
      service: newTreatment.service,
      professional: newTreatment.professional,
      status: 'ongoing',
      notes: newTreatment.notes,
      evolution: newTreatment.evolution
    };
    
    setTreatments(prev => [treatment, ...prev]);
    setNewTreatment({ service: '', professional: '', notes: '', evolution: '' });
  };

  const deleteTreatment = (id: string) => {
    setTreatments(prev => prev.filter(t => t.id !== id));
  };

  const saveTreatmentEdit = (id: string, updatedTreatment: Partial<Treatment>) => {
    setTreatments(prev => prev.map(t => t.id === id ? { ...t, ...updatedTreatment } : t));
    setEditingTreatment(null);
  };

  // Payment functions
  const addPayment = () => {
    if (!newPayment.service || !newPayment.amount) return;
    
    const payment: Payment = {
      id: Date.now().toString(),
      date: new Date(),
      amount: parseCurrencyToNumber(newPayment.amount),
      service: newPayment.service,
      status: newPayment.status,
      rating: newPayment.rating,
      feedback: newPayment.feedback
    };
    
    setPayments(prev => [payment, ...prev]);
    setNewPayment({ amount: '', service: '', status: 'pending', rating: 0, feedback: '' });
    setSelectedMedicalService('');
  };

  const deletePayment = (id: string) => {
    setPayments(prev => prev.filter(p => p.id !== id));
  };

  const savePaymentEdit = (id: string, updatedPayment: Partial<Payment>) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, ...updatedPayment } : p));
    setEditingPayment(null);
  };

  // Odontograma functions
  const handleToothClick = (toothNumber: number) => {
    setToothStates(prev => ({
      ...prev,
      [toothNumber]: selectedToothColor
    }));
  };

  const getToothColorClass = (toothNumber: number) => {
    const state = toothStates[toothNumber] || 'normal';
    switch (state) {
      case 'normal':
        return 'bg-white border-gray-400';
      case 'carie':
        return 'bg-red-200 border-red-400';
      case 'restauracao':
        return 'bg-blue-200 border-blue-400';
      case 'ausente':
        return 'bg-gray-400 border-gray-600';
      default:
        return 'bg-white border-gray-400';
    }
  };

  const resetOdontogram = () => {
    setToothStates({});
  };

  const handlePaymentAmountChange = (value: string) => {
    const formatted = formatCurrencyInput(value);
    setNewPayment(prev => ({ ...prev, amount: formatted }));
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-100 text-green-800 hover:bg-green-200',
      ongoing: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      scheduled: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      paid: 'bg-green-100 text-green-800 hover:bg-green-200',
      pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      overdue: 'bg-red-100 text-red-800 hover:bg-red-200'
    };

    const labels = {
      completed: 'Concluído',
      ongoing: 'Em andamento',
      scheduled: 'Agendado',
      paid: 'Pago',
      pending: 'Pendente',
      overdue: 'Vencido'
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border-none transition-colors cursor-pointer`}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''}`}
            onClick={() => interactive && onChange && onChange(star)}
          />
        ))}
      </div>
    );
  };

  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Contato</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="contato" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="contato">Contato</TabsTrigger>
            <TabsTrigger value="prontuario">Prontuário</TabsTrigger>
            <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
            <TabsTrigger value="tratamentos">Tratamentos</TabsTrigger>
            <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
          </TabsList>

          <TabsContent value="contato" className="space-y-4">
            {/* Avatar Upload */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatar} />
                <AvatarFallback className="text-lg">
                  {firstName[0]?.toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              <div>
                <Label>Foto do Contato</Label>
                <div className="mt-1">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Alterar Foto
                      </span>
                    </Button>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Nome *</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Nome"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Sobrenome"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+55 11 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>

            {/* Additional Personal Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, número, complemento"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Nome da cidade"
                />
              </div>
              <div>
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="UF"
                  maxLength={2}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Informações adicionais sobre o contato"
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="prontuario" className="space-y-4">
            {/* Add new record */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Novo Registro Médico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Médico</Label>
                    <Input
                      value={newRecord.doctor}
                      onChange={(e) => setNewRecord(prev => ({ ...prev, doctor: e.target.value }))}
                      placeholder="Nome do médico"
                    />
                  </div>
                  <div>
                    <Label>Diagnóstico</Label>
                    <Input
                      value={newRecord.diagnosis}
                      onChange={(e) => setNewRecord(prev => ({ ...prev, diagnosis: e.target.value }))}
                      placeholder="Diagnóstico ou tipo de consulta"
                    />
                  </div>
                </div>
                <div>
                  <Label>Prescrição</Label>
                  <Input
                    value={newRecord.prescription}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, prescription: e.target.value }))}
                    placeholder="Medicamentos prescritos (opcional)"
                  />
                </div>
                <div>
                  <Label>Observações</Label>
                  <Textarea
                    value={newRecord.notes}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Observações médicas"
                    rows={3}
                  />
                </div>
                <Button onClick={addMedicalRecord} disabled={!newRecord.doctor || !newRecord.diagnosis}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Registro
                </Button>
              </CardContent>
            </Card>

            {/* Medical records list */}
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {medicalRecords.map((record) => (
                  <Card key={record.id}>
                    <CardContent className="p-4">
                      {editingRecord === record.id ? (
                        <EditRecordForm
                          record={record}
                          onSave={(updatedRecord) => saveRecordEdit(record.id, updatedRecord)}
                          onCancel={() => setEditingRecord(null)}
                        />
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{record.diagnosis}</h4>
                              <p className="text-sm text-gray-500">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {record.date.toLocaleDateString('pt-BR')} - {record.doctor}
                              </p>
                            </div>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setEditingRecord(record.id)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteRecord(record.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          {record.prescription && (
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Prescrição:</strong> {record.prescription}
                            </p>
                          )}
                          {record.notes && (
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Observações:</strong> {record.notes}
                            </p>
                          )}
                          {record.selectedTeeth && record.selectedTeeth.length > 0 && (
                            <p className="text-sm text-gray-600">
                              <strong>Dentes:</strong> {record.selectedTeeth.join(', ')}
                            </p>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="anamnese" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Anamnese Odontológica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informações Gerais */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 border-b pb-2">Informações Gerais</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Motivo da consulta</Label>
                      <Textarea
                        placeholder="Descreva o motivo principal da consulta"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Última consulta odontológica</Label>
                      <Input
                        type="date"
                        placeholder="Data da última consulta"
                      />
                    </div>
                  </div>
                </div>

                {/* Histórico Médico */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 border-b pb-2">Histórico Médico</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label>Problemas de saúde atuais</Label>
                      <Textarea
                        placeholder="Diabetes, hipertensão, doenças cardíacas, etc."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Medicamentos em uso</Label>
                      <Textarea
                        placeholder="Liste todos os medicamentos e dosagens"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Alergias conhecidas</Label>
                      <Textarea
                        placeholder="Medicamentos, materiais odontológicos, alimentos, etc."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Histórico Odontológico */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 border-b pb-2">Histórico Odontológico</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Frequência de escovação</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1x">1x ao dia</SelectItem>
                          <SelectItem value="2x">2x ao dia</SelectItem>
                          <SelectItem value="3x">3x ao dia</SelectItem>
                          <SelectItem value="irregular">Irregular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Uso de fio dental</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Frequência do fio dental" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diario">Diário</SelectItem>
                          <SelectItem value="ocasional">Ocasional</SelectItem>
                          <SelectItem value="nunca">Nunca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label>Problemas dentários anteriores</Label>
                      <Textarea
                        placeholder="Cáries, extrações, tratamentos de canal, etc."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Sintomas e Queixas */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 border-b pb-2">Sintomas e Queixas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label>Sintomas atuais (marque os que se aplicam)</Label>
                      <div className="space-y-2">
                        {[
                          'Dor de dente',
                          'Sensibilidade',
                          'Sangramento gengival',
                          'Mau hálito',
                          'Dificuldade para mastigar',
                          'Bruxismo/Ranger de dentes'
                        ].map((symptom) => (
                          <div key={symptom} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={symptom}
                              className="rounded border-gray-300"
                            />
                            <label htmlFor={symptom} className="text-sm text-gray-700">
                              {symptom}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Outras observações</Label>
                      <Textarea
                        placeholder="Descreva outros sintomas ou observações relevantes"
                        rows={6}
                      />
                    </div>
                  </div>
                </div>

                {/* Hábitos */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 border-b pb-2">Hábitos</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Tabagismo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Situação do tabagismo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nunca">Nunca fumou</SelectItem>
                          <SelectItem value="atual">Fumante atual</SelectItem>
                          <SelectItem value="ex">Ex-fumante</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Consumo de álcool</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Frequência de consumo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nunca">Nunca</SelectItem>
                          <SelectItem value="ocasional">Ocasional</SelectItem>
                          <SelectItem value="regular">Regular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Consumo de açúcar</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Frequência de consumo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baixo">Baixo</SelectItem>
                          <SelectItem value="moderado">Moderado</SelectItem>
                          <SelectItem value="alto">Alto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Botão de salvar */}
                <div className="flex justify-end pt-4">
                  <Button className="bg-brand-500 hover:bg-brand-600">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Anamnese
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tratamentos" className="space-y-4">
            {/* Dental Odontogram */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Odontograma Interativo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Color Selector */}
                <div className="flex items-center justify-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Selecione a cor:</span>
                  <div className="flex space-x-2">
                    {[
                      { id: 'normal', label: 'Normal', color: 'bg-white border-gray-400' },
                      { id: 'carie', label: 'Cárie', color: 'bg-red-200 border-red-400' },
                      { id: 'restauracao', label: 'Restauração', color: 'bg-blue-200 border-blue-400' },
                      { id: 'ausente', label: 'Ausente', color: 'bg-gray-400 border-gray-600' },
                    ].map((colorOption) => (
                      <button
                        key={colorOption.id}
                        onClick={() => setSelectedToothColor(colorOption.id as typeof selectedToothColor)}
                        className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all ${
                          selectedToothColor === colorOption.id
                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 ${colorOption.color} inline-block mr-2`}></div>
                        {colorOption.label}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetOdontogram}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Limpar
                  </Button>
                </div>

                {/* Dental Chart Visualization */}
                <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center space-y-4">
                    {/* Upper Teeth */}
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Arcada Superior</p>
                      <div className="flex justify-center space-x-1">
                        {[18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28].map((tooth) => (
                          <div
                            key={tooth}
                            onClick={() => handleToothClick(tooth)}
                            className={`w-8 h-8 border-2 rounded flex items-center justify-center text-xs font-medium cursor-pointer hover:shadow-lg transition-all duration-200 ${getToothColorClass(tooth)} hover:scale-110`}
                            title={`Dente ${tooth} - Clique para alterar`}
                          >
                            {tooth}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Lower Teeth */}
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Arcada Inferior</p>
                      <div className="flex justify-center space-x-1">
                        {[48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38].map((tooth) => (
                          <div
                            key={tooth}
                            onClick={() => handleToothClick(tooth)}
                            className={`w-8 h-8 border-2 rounded flex items-center justify-center text-xs font-medium cursor-pointer hover:shadow-lg transition-all duration-200 ${getToothColorClass(tooth)} hover:scale-110`}
                            title={`Dente ${tooth} - Clique para alterar`}
                          >
                            {tooth}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex justify-center space-x-6 mt-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-white border-2 border-gray-400 rounded"></div>
                        <span>Normal</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-red-200 border-2 border-red-400 rounded"></div>
                        <span>Cárie</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-blue-200 border-2 border-blue-400 rounded"></div>
                        <span>Restauração</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-gray-400 border-2 border-gray-600 rounded"></div>
                        <span>Ausente</span>
                      </div>
                    </div>

                    {/* Summary */}
                    {Object.keys(toothStates).length > 0 && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Alterações registradas:</strong> {Object.keys(toothStates).length} dente(s)
                        </p>
                        <div className="text-xs text-blue-700 mt-1">
                          {Object.entries(toothStates).map(([tooth, state]) => (
                            <span key={tooth} className="inline-block mr-2">
                              {tooth}: {state}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add new treatment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Novo Tratamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Serviço</Label>
                    <Input
                      value={newTreatment.service}
                      onChange={(e) => setNewTreatment(prev => ({ ...prev, service: e.target.value }))}
                      placeholder="Tipo de tratamento"
                    />
                  </div>
                  <div>
                    <Label>Profissional</Label>
                    <Input
                      value={newTreatment.professional}
                      onChange={(e) => setNewTreatment(prev => ({ ...prev, professional: e.target.value }))}
                      placeholder="Nome do profissional"
                    />
                  </div>
                </div>
                <div>
                  <Label>Notas</Label>
                  <Textarea
                    value={newTreatment.notes}
                    onChange={(e) => setNewTreatment(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Observações sobre o tratamento"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Evolução</Label>
                  <Textarea
                    value={newTreatment.evolution}
                    onChange={(e) => setNewTreatment(prev => ({ ...prev, evolution: e.target.value }))}
                    placeholder="Evolução do paciente"
                    rows={2}
                  />
                </div>
                <Button onClick={addTreatment} disabled={!newTreatment.service || !newTreatment.professional}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Tratamento
                </Button>
              </CardContent>
            </Card>

            {/* Treatments list with inline editing */}
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {treatments.map((treatment) => (
                  <Card key={treatment.id}>
                    <CardContent className="p-4">
                      {editingTreatment === treatment.id ? (
                        <EditTreatmentForm
                          treatment={treatment}
                          onSave={(updatedTreatment) => saveTreatmentEdit(treatment.id, updatedTreatment)}
                          onCancel={() => setEditingTreatment(null)}
                        />
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{treatment.service}</h4>
                              <p className="text-sm text-gray-500">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {treatment.date.toLocaleDateString('pt-BR')} - {treatment.professional}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(treatment.status)}
                              <div className="flex space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingTreatment(treatment.id)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => deleteTreatment(treatment.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          {treatment.notes && (
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Notas:</strong> {treatment.notes}
                            </p>
                          )}
                          {treatment.evolution && (
                            <p className="text-sm text-gray-600">
                              <strong>Evolução:</strong> {treatment.evolution}
                            </p>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="pagamentos" className="space-y-4">
            {/* Add new payment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Novo Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Serviço Médico</Label>
                  <Select value={selectedMedicalService} onValueChange={handleMedicalServiceChange}>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Serviço</Label>
                    <Input
                      value={newPayment.service}
                      onChange={(e) => setNewPayment(prev => ({ ...prev, service: e.target.value }))}
                      placeholder="Serviço prestado"
                    />
                  </div>
                  <div>
                    <Label>Valor</Label>
                    <Input
                      value={newPayment.amount}
                      onChange={(e) => handlePaymentAmountChange(e.target.value)}
                      placeholder="R$ 0,00"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label htmlFor="payment-status" className="text-sm font-medium">
                    Status do Pagamento
                  </Label>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${newPayment.status === 'pending' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                      Não Pago
                    </span>
                    <Switch
                      id="payment-status"
                      checked={newPayment.status === 'paid'}
                      onCheckedChange={(checked) => 
                        setNewPayment(prev => ({ ...prev, status: checked ? 'paid' : 'pending' }))
                      }
                    />
                    <span className={`text-sm ${newPayment.status === 'paid' ? 'text-green-700 font-medium' : 'text-gray-500'}`}>
                      Pago
                    </span>
                  </div>
                </div>
                <div>
                  <Label>Avaliação</Label>
                  <div className="mt-1">
                    {renderStars(newPayment.rating, true, (rating) => 
                      setNewPayment(prev => ({ ...prev, rating }))
                    )}
                  </div>
                </div>
                <div>
                  <Label>Feedback</Label>
                  <Textarea
                    value={newPayment.feedback}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, feedback: e.target.value }))}
                    placeholder="Feedback do paciente (opcional)"
                    rows={2}
                  />
                </div>
                <Button onClick={addPayment} disabled={!newPayment.service || !newPayment.amount}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Pagamento
                </Button>
              </CardContent>
            </Card>

            {/* Payments list with inline editing */}
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {payments.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="p-4">
                      {editingPayment === payment.id ? (
                        <EditPaymentForm
                          payment={payment}
                          onSave={(updatedPayment) => savePaymentEdit(payment.id, updatedPayment)}
                          onCancel={() => setEditingPayment(null)}
                        />
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{payment.service}</h4>
                              <p className="text-sm text-gray-500">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {payment.date.toLocaleDateString('pt-BR')}
                              </p>
                              <p className="text-lg font-semibold text-green-600">
                                {formatBRLCurrency(payment.amount)}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(payment.status)}
                              <div className="flex space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingPayment(payment.id)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => deletePayment(payment.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          {payment.rating && (
                            <div className="mb-2">
                              <p className="text-sm text-gray-600 mb-1">Avaliação:</p>
                              {renderStars(payment.rating)}
                            </div>
                          )}
                          {payment.feedback && (
                            <p className="text-sm text-gray-600">
                              <strong>Feedback:</strong> {payment.feedback}
                            </p>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!firstName || !phone}
            className="bg-gradient-brand hover:opacity-90"
          >
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for editing records
function EditRecordForm({ 
  record, 
  onSave, 
  onCancel 
}: { 
  record: MedicalRecord; 
  onSave: (record: Partial<MedicalRecord>) => void; 
  onCancel: () => void; 
}) {
  const [doctor, setDoctor] = useState(record.doctor);
  const [diagnosis, setDiagnosis] = useState(record.diagnosis);
  const [prescription, setPrescription] = useState(record.prescription || '');
  const [notes, setNotes] = useState(record.notes || '');

  const handleSave = () => {
    onSave({ doctor, diagnosis, prescription, notes });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          placeholder="Médico"
        />
        <Input
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Diagnóstico"
        />
      </div>
      <Input
        value={prescription}
        onChange={(e) => setPrescription(e.target.value)}
        placeholder="Prescrição"
      />
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Observações"
        rows={2}
      />
      <div className="flex space-x-2">
        <Button size="sm" onClick={handleSave}>
          <Save className="w-3 h-3 mr-1" />
          Salvar
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel}>
          <X className="w-3 h-3 mr-1" />
          Cancelar
        </Button>
      </div>
    </div>
  );
}

// Helper component for editing treatments
function EditTreatmentForm({ 
  treatment, 
  onSave, 
  onCancel 
}: { 
  treatment: Treatment; 
  onSave: (treatment: Partial<Treatment>) => void; 
  onCancel: () => void; 
}) {
  const [service, setService] = useState(treatment.service);
  const [professional, setProfessional] = useState(treatment.professional);
  const [status, setStatus] = useState(treatment.status);
  const [notes, setNotes] = useState(treatment.notes || '');
  const [evolution, setEvolution] = useState(treatment.evolution || '');

  const handleSave = () => {
    onSave({ service, professional, status, notes, evolution });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Serviço"
        />
        <Input
          value={professional}
          onChange={(e) => setProfessional(e.target.value)}
          placeholder="Profissional"
        />
      </div>
      <Select value={status} onValueChange={(value) => setStatus(value as Treatment['status'])}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="scheduled">Agendado</SelectItem>
          <SelectItem value="ongoing">Em andamento</SelectItem>
          <SelectItem value="completed">Concluído</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notas"
        rows={2}
      />
      <Textarea
        value={evolution}
        onChange={(e) => setEvolution(e.target.value)}
        placeholder="Evolução"
        rows={2}
      />
      <div className="flex space-x-2">
        <Button size="sm" onClick={handleSave}>
          <Save className="w-3 h-3 mr-1" />
          Salvar
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel}>
          <X className="w-3 h-3 mr-1" />
          Cancelar
        </Button>
      </div>
    </div>
  );
}

// Helper component for editing payments
function EditPaymentForm({ 
  payment, 
  onSave, 
  onCancel 
}: { 
  payment: Payment; 
  onSave: (payment: Partial<Payment>) => void; 
  onCancel: () => void; 
}) {
  const [service, setService] = useState(payment.service);
  const [amount, setAmount] = useState(formatBRLCurrency(payment.amount));
  const [status, setStatus] = useState(payment.status);
  const [rating, setRating] = useState(payment.rating || 0);
  const [feedback, setFeedback] = useState(payment.feedback || '');

  const handleSave = () => {
    onSave({ 
      service, 
      amount: parseCurrencyToNumber(amount), 
      status, 
      rating: rating || undefined,
      feedback: feedback || undefined
    });
  };

  const handleAmountChange = (value: string) => {
    const formatted = formatCurrencyInput(value);
    setAmount(formatted);
  };

  const renderStars = (currentRating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= currentRating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''}`}
            onClick={() => interactive && onChange && onChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Serviço"
        />
        <Input
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder="R$ 0,00"
        />
      </div>
      <Select value={status} onValueChange={(value) => setStatus(value as Payment['status'])}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="paid">Pago</SelectItem>
          <SelectItem value="overdue">Vencido</SelectItem>
        </SelectContent>
      </Select>
      <div>
        <Label className="text-sm">Avaliação</Label>
        <div className="mt-1">
          {renderStars(rating, true, setRating)}
        </div>
      </div>
      <Textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Feedback"
        rows={2}
      />
      <div className="flex space-x-2">
        <Button size="sm" onClick={handleSave}>
          <Save className="w-3 h-3 mr-1" />
          Salvar
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel}>
          <X className="w-3 h-3 mr-1" />
          Cancelar
        </Button>
      </div>
    </div>
  );
}
