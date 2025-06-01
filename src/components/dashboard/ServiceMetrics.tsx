
import { MetricCard } from './MetricCard';
import { Clock, Bot, Calendar, Star, Users, Armchair } from 'lucide-react';

export function ServiceMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        title="Tempo Médio de Atendimento"
        value="12m 34s"
        change="8%"
        trend="up"
        icon={<Clock className="h-4 w-4" />}
        description="vs. mês anterior"
        sparklineData={[45, 38, 42, 35, 40, 38, 32, 35, 30, 28, 25, 30]}
      />
      
      <MetricCard
        title="Tempo Médio com IA"
        value="3m 12s"
        change="15%"
        trend="down"
        icon={<Bot className="h-4 w-4" />}
        description="vs. mês anterior"
        sparklineData={[12, 15, 18, 16, 20, 22, 19, 18, 20, 22, 25, 23]}
      />
      
      <MetricCard
        title="Taxa de Não Comparecimento"
        value="8,5%"
        change="5%"
        trend="down"
        icon={<Calendar className="h-4 w-4" />}
        description="vs. mês anterior"
        sparklineData={[12, 10, 11, 9, 8, 9, 8, 7, 8, 9, 8, 8.5]}
      />
      
      <MetricCard
        title="Satisfação Atendimento (CSAT)"
        value="4,8"
        change="3%"
        trend="up"
        icon={<Star className="h-4 w-4" />}
        description="NPS: 85"
        sparklineData={[4.2, 4.3, 4.5, 4.4, 4.6, 4.5, 4.7, 4.6, 4.8, 4.7, 4.8, 4.8]}
      />
      
      <MetricCard
        title="Índice de Retenção de Pacientes"
        value="87,3%"
        change="12%"
        trend="up"
        icon={<Users className="h-4 w-4" />}
        description="vs. mês anterior"
        sparklineData={[75, 78, 80, 82, 83, 84, 85, 86, 86.5, 87, 87.2, 87.3]}
      />
      
      <MetricCard
        title="Taxa de Ocupação da Cadeira"
        value="92,1%"
        change="7%"
        trend="up"
        icon={<Armchair className="h-4 w-4" />}
        description="vs. mês anterior"
        sparklineData={[85, 87, 88, 89, 90, 91, 91.5, 92, 92.2, 92.1, 92.0, 92.1]}
      />
    </div>
  );
}
