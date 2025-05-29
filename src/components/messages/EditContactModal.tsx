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
  
  // States for editing
  const [editingRecord, setEditingRecord] = useState<string | null>(null);
  const [editingTreatment, setEditingTreatment] = useState<string | null>(null);
  const [editingPayment, setEditingPayment] = useState<string | null>(null);

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
    rating: 0,
    feedback: ''
  });

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
      status: 'paid',
      rating: newPayment.rating,
      feedback: newPayment.feedback
    };
    
    setPayments(prev => [payment, ...prev]);
    setNewPayment({ amount: '', service: '', rating: 0, feedback: '' });
  };

  const deletePayment = (id: string) => {
    setPayments(prev => prev.filter(p => p.id !== id));
  };

  const savePaymentEdit = (id: string, updatedPayment: Partial<Payment>) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, ...updatedPayment } : p));
    setEditingPayment(null);
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contato">Contato</TabsTrigger>
            <TabsTrigger value="prontuario">Prontuário</TabsTrigger>
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
            {/* Tooth Selector */}
            <ToothSelector 
              selectedTeeth={newRecord.selectedTeeth} 
              onTeethChange={(teeth) => setNewRecord(prev => ({ ...prev, selectedTeeth: teeth }))}
            />

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

          <TabsContent value="tratamentos" className="space-y-4">
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
