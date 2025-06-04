
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface AgentAvailabilityProps {
  selectedDays: string[];
  startTime: string;
  endTime: string;
  onDayToggle: (day: string) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

const daysOfWeek = [
  'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'
];

export function AgentAvailability({
  selectedDays,
  startTime,
  endTime,
  onDayToggle,
  onStartTimeChange,
  onEndTimeChange,
}: AgentAvailabilityProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Dias da Semana</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox
                id={day}
                checked={selectedDays.includes(day)}
                onCheckedChange={() => onDayToggle(day)}
              />
              <Label htmlFor={day} className="text-sm">{day}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Horário de Início</Label>
          <Input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            min="07:00"
            max="19:00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTime">Horário de Fim</Label>
          <Input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            min="07:00"
            max="19:00"
          />
        </div>
      </div>
    </div>
  );
}
