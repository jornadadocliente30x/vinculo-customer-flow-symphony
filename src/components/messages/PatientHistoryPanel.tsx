
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Calendar, FileText, Heart, Star } from 'lucide-react';

interface PatientHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
}

interface MedicalRecord {
  id: string;
  date: Date;
  doctor: string;
  diagnosis: string;
  prescription?: string;
  notes?: string;
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

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    date: new Date('2024-01-15'),
    doctor: 'Dr. João Silva',
    diagnosis: 'Consulta de rotina - Hipertensão controlada',
    prescription: 'Losartana 50mg - 1x ao dia',
    notes: 'Paciente apresenta boa evolução no controle da pressão arterial.'
  },
  {
    id: '2',
    date: new Date('2023-12-10'),
    doctor: 'Dr. João Silva',
    diagnosis: 'Exame preventivo',
    notes: 'Exames laboratoriais dentro da normalidade.'
  }
];

const mockTreatments: Treatment[] = [
  {
    id: '1',
    date: new Date('2024-01-20'),
    service: 'Fisioterapia',
    professional: 'Dra. Ana Costa',
    status: 'ongoing',
    notes: 'Tratamento para dor lombar',
    evolution: 'Paciente com melhora significativa na mobilidade.'
  },
  {
    id: '2',
    date: new Date('2024-01-10'),
    service: 'Consulta Cardiológica',
    professional: 'Dr. Pedro Santos',
    status: 'completed',
    notes: 'Avaliação cardiovascular de rotina'
  }
];

const mockPayments: Payment[] = [
  {
    id: '1',
    date: new Date('2024-01-15'),
    amount: 150.00,
    service: 'Consulta Médica',
    status: 'paid',
    rating: 5,
    feedback: 'Excelente atendimento, médico muito atencioso.'
  },
  {
    id: '2',
    date: new Date('2024-01-10'),
    amount: 80.00,
    service: 'Exames Laboratoriais',
    status: 'paid',
    rating: 4
  }
];

export function PatientHistoryPanel({ 
  isOpen, 
  onClose, 
  patientName 
}: PatientHistoryPanelProps) {
  if (!isOpen) return null;

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-100 text-green-800',
      ongoing: 'bg-blue-100 text-blue-800',
      scheduled: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800'
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
      <Badge className={`${variants[status as keyof typeof variants]} border-none`}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-gray-200 shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Histórico do Paciente</h2>
          <p className="text-sm text-gray-600">{patientName}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="prontuario" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="prontuario" className="text-xs">Prontuário</TabsTrigger>
            <TabsTrigger value="tratamentos" className="text-xs">Tratamentos</TabsTrigger>
            <TabsTrigger value="pagamentos" className="text-xs">Pagamentos</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="prontuario" className="h-full mt-4">
              <ScrollArea className="h-full px-4">
                <div className="space-y-4">
                  {mockMedicalRecords.map((record) => (
                    <Card key={record.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-sm font-medium">
                              {record.diagnosis}
                            </CardTitle>
                            <p className="text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {record.date.toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <FileText className="w-4 h-4 text-gray-400" />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-gray-600 mb-2">
                          <strong>Médico:</strong> {record.doctor}
                        </p>
                        {record.prescription && (
                          <p className="text-xs text-gray-600 mb-2">
                            <strong>Prescrição:</strong> {record.prescription}
                          </p>
                        )}
                        {record.notes && (
                          <p className="text-xs text-gray-600">
                            <strong>Observações:</strong> {record.notes}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="tratamentos" className="h-full mt-4">
              <ScrollArea className="h-full px-4">
                <div className="space-y-4">
                  {mockTreatments.map((treatment) => (
                    <Card key={treatment.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-sm font-medium">
                              {treatment.service}
                            </CardTitle>
                            <p className="text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {treatment.date.toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          {getStatusBadge(treatment.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-gray-600 mb-2">
                          <strong>Profissional:</strong> {treatment.professional}
                        </p>
                        {treatment.notes && (
                          <p className="text-xs text-gray-600 mb-2">
                            <strong>Notas:</strong> {treatment.notes}
                          </p>
                        )}
                        {treatment.evolution && (
                          <p className="text-xs text-gray-600">
                            <strong>Evolução:</strong> {treatment.evolution}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="pagamentos" className="h-full mt-4">
              <ScrollArea className="h-full px-4">
                <div className="space-y-4">
                  {mockPayments.map((payment) => (
                    <Card key={payment.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-sm font-medium">
                              {payment.service}
                            </CardTitle>
                            <p className="text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {payment.date.toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          {getStatusBadge(payment.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          R$ {payment.amount.toFixed(2)}
                        </p>
                        {payment.rating && (
                          <div className="mb-2">
                            <p className="text-xs text-gray-600 mb-1">Avaliação:</p>
                            {renderStars(payment.rating)}
                          </div>
                        )}
                        {payment.feedback && (
                          <p className="text-xs text-gray-600">
                            <strong>Feedback:</strong> {payment.feedback}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
