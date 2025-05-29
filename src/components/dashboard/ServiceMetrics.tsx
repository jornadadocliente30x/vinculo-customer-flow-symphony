
import { MetricCard } from './MetricCard';
import { Clock, Bot, Calendar, Star } from 'lucide-react';

export function ServiceMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        title="Intervalo Entre Atendimentos"
        value="24m 8s"
        change="5%"
        trend="down"
        icon={<Calendar className="h-4 w-4" />}
        description="vs. mês anterior"
        sparklineData={[30, 32, 28, 35, 30, 28, 32, 30, 28, 25, 27, 24]}
      />
      
      <MetricCard
        title="Satisfação do Cliente"
        value="4,8"
        change="3%"
        trend="up"
        icon={<Star className="h-4 w-4" />}
        description="NPS: 85"
        sparklineData={[4.2, 4.3, 4.5, 4.4, 4.6, 4.5, 4.7, 4.6, 4.8, 4.7, 4.8, 4.8]}
      />
    </div>
  );
}
