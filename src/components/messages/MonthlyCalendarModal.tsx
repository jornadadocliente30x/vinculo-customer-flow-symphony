
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, User, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduledPatient {
  id: string;
  name: string;
  time: string;
  service: string;
  doctorName: string;
}

interface DaySchedule {
  date: number;
  patients: ScheduledPatient[];
}

interface MonthlyCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MonthlyCalendarModal({ isOpen, onClose }: MonthlyCalendarModalProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data para demonstração
  const scheduleData: Record<number, ScheduledPatient[]> = {
    5: [
      { id: '1', name: 'Maria Silva', time: '09:00', service: 'Consulta', doctorName: 'Dr. João Pereira' },
      { id: '2', name: 'João Santos', time: '14:30', service: 'Fisioterapia', doctorName: 'Dra. Ana Costa' }
    ],
    12: [
      { id: '3', name: 'Ana Costa', time: '10:15', service: 'Exame', doctorName: 'Dr. Carlos Silva' }
    ],
    18: [
      { id: '4', name: 'Pedro Lima', time: '08:30', service: 'Consulta', doctorName: 'Dr. João Pereira' },
      { id: '5', name: 'Carla Souza', time: '11:00', service: 'Retorno', doctorName: 'Dra. Maria Santos' },
      { id: '6', name: 'Paulo Silva', time: '16:45', service: 'Fisioterapia', doctorName: 'Dra. Ana Costa' }
    ],
    25: [
      { id: '7', name: 'Lucia Santos', time: '13:20', service: 'Consulta', doctorName: 'Dr. Carlos Silva' }
    ]
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: DaySchedule[] = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || current.getDay() !== 0) {
      const dayNum = current.getDate();
      const isCurrentMonth = current.getMonth() === month;
      
      days.push({
        date: isCurrentMonth ? dayNum : 0,
        patients: isCurrentMonth ? (scheduleData[dayNum] || []) : []
      });
      
      current.setDate(current.getDate() + 1);
      if (days.length >= 42) break; // 6 weeks max
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Calendário de Agendamentos
              </span>
              <p className="text-sm text-gray-600 mt-1">Visualize todos os agendamentos do mês</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Enhanced Navigation */}
          <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('prev')}
              className="hover:bg-white shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {days.filter(d => d.date > 0 && d.patients.length > 0).length} dias com agendamentos
              </p>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('next')}
              className="hover:bg-white shadow-sm"
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Enhanced Calendar Grid */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Week headers */}
            <div className="grid grid-cols-7 bg-gradient-to-r from-blue-600 to-purple-600">
              {weekDays.map(day => (
                <div key={day} className="p-4 text-center text-sm font-semibold text-white">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 divide-x divide-y divide-gray-200">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={cn(
                    "min-h-[120px] p-3 bg-white hover:bg-gray-50 transition-colors",
                    day.date === 0 && "bg-gray-50/50"
                  )}
                >
                  {day.date > 0 && (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <span className={cn(
                          "text-lg font-semibold",
                          day.patients.length > 0 ? "text-blue-600" : "text-gray-700"
                        )}>
                          {day.date}
                        </span>
                        {day.patients.length > 0 && (
                          <Badge 
                            variant="outline" 
                            className="text-xs px-2 py-1 bg-blue-50 border-blue-200 text-blue-700"
                          >
                            {day.patients.length}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        {day.patients.slice(0, 2).map((patient) => (
                          <div
                            key={patient.id}
                            className="text-xs p-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-lg cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-all duration-200 shadow-sm"
                            title={`${patient.name} - ${patient.time} - ${patient.service} - ${patient.doctorName}`}
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              <User className="w-3 h-3 text-blue-600 flex-shrink-0" />
                              <span className="truncate font-medium text-blue-900">
                                {patient.name}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Clock className="w-3 h-3 text-purple-600 flex-shrink-0" />
                              <span className="text-purple-700 font-medium">
                                {patient.time}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 font-medium truncate">
                              {patient.doctorName}
                            </div>
                          </div>
                        ))}
                        
                        {day.patients.length > 2 && (
                          <div className="text-xs text-center py-2 text-gray-500 bg-gray-50 rounded border border-gray-200">
                            +{day.patients.length - 2} agendamentos
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Legend */}
          <div className="flex items-center justify-center space-x-8 text-sm bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
              <span className="font-medium text-gray-700">Dias com agendamentos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">2</Badge>
              <span className="font-medium text-gray-700">Número de pacientes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-gray-700">Horário do agendamento</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
