
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduledPatient {
  id: string;
  name: string;
  time: string;
  service: string;
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
      { id: '1', name: 'Maria Silva', time: '09:00', service: 'Consulta' },
      { id: '2', name: 'João Santos', time: '14:30', service: 'Fisioterapia' }
    ],
    12: [
      { id: '3', name: 'Ana Costa', time: '10:15', service: 'Exame' }
    ],
    18: [
      { id: '4', name: 'Pedro Lima', time: '08:30', service: 'Consulta' },
      { id: '5', name: 'Carla Souza', time: '11:00', service: 'Retorno' },
      { id: '6', name: 'Paulo Silva', time: '16:45', service: 'Fisioterapia' }
    ],
    25: [
      { id: '7', name: 'Lucia Santos', time: '13:20', service: 'Consulta' }
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-brand-500" />
            <span>Calendário de Agendamentos</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-lg font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week headers */}
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600 bg-gray-50 rounded">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {days.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "min-h-[100px] p-2 border border-gray-200 rounded bg-white",
                  day.date === 0 && "bg-gray-50 text-gray-400"
                )}
              >
                {day.date > 0 && (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{day.date}</span>
                      {day.patients.length > 0 && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {day.patients.length}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      {day.patients.slice(0, 2).map((patient) => (
                        <div
                          key={patient.id}
                          className="text-xs p-1 bg-brand-50 border border-brand-200 rounded cursor-pointer hover:bg-brand-100 transition-colors"
                          title={`${patient.name} - ${patient.time} - ${patient.service}`}
                        >
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3 text-brand-600" />
                            <span className="truncate font-medium text-brand-700">
                              {patient.name}
                            </span>
                          </div>
                          <div className="text-brand-600">
                            {patient.time}
                          </div>
                        </div>
                      ))}
                      
                      {day.patients.length > 2 && (
                        <div className="text-xs text-gray-500 text-center py-1">
                          +{day.patients.length - 2} mais
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-brand-200 rounded"></div>
              <span>Agendamentos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">2</Badge>
              <span>Número de pacientes</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
