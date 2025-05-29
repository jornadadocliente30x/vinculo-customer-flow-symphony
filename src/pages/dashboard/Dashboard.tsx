
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ControlsSection } from '@/components/dashboard/ControlsSection';
import { OriginCard } from '@/components/dashboard/OriginCard';
import { SalesFunnel } from '@/components/dashboard/SalesFunnel';
import { CustomerJourney } from '@/components/dashboard/CustomerJourney';
import { ServiceMetrics } from '@/components/dashboard/ServiceMetrics';
import { RecentCampaigns } from '@/components/dashboard/RecentCampaigns';
import { formatCounter, formatPercentage } from '@/utils/formatting';
import { 
  Users, 
  MessageSquare, 
  Target, 
  TrendingUp
} from 'lucide-react';

const stats = [
  {
    title: 'Total de Leads',
    value: formatCounter(2847),
    change: formatPercentage(12),
    trend: 'up',
    icon: <Users className="h-5 w-5" />,
    description: 'vs. mês anterior',
    sparklineData: [2100, 2200, 2350, 2400, 2500, 2650, 2700, 2750, 2800, 2820, 2840, 2847],
    gradient: 'brand'
  },
  {
    title: 'Conversões',
    value: formatCounter(543),
    change: formatPercentage(8),
    trend: 'up',
    icon: <Target className="h-5 w-5" />,
    description: 'vs. mês anterior',
    sparklineData: [450, 465, 480, 495, 510, 520, 525, 530, 535, 540, 542, 543],
    gradient: 'success'
  },
  {
    title: 'Mensagens Enviadas',
    value: formatCounter(12459),
    change: formatPercentage(23),
    trend: 'up',
    icon: <MessageSquare className="h-5 w-5" />,
    description: 'vs. mês anterior',
    sparklineData: [8500, 9200, 9800, 10200, 10800, 11200, 11500, 11800, 12000, 12200, 12350, 12459],
    gradient: 'info'
  },
  {
    title: 'Taxa de Conversão',
    value: '19,1%',
    change: formatPercentage(2),
    trend: 'down',
    icon: <TrendingUp className="h-5 w-5" />,
    description: 'vs. mês anterior',
    sparklineData: [21, 20.5, 20.2, 19.8, 19.5, 19.3, 19.2, 19.0, 18.9, 19.1, 19.0, 19.1],
    gradient: 'warning'
  }
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-100 shadow-soft">
          <h1 className="text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Visão geral das suas vendas e automações
          </p>
        </div>

        {/* Controls Section */}
        <ControlsSection />

        {/* Main KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <MetricCard
                title={stat.title}
                value={stat.value}
                change={stat.change}
                trend={stat.trend as 'up' | 'down'}
                icon={stat.icon}
                description={stat.description}
                sparklineData={stat.sparklineData}
                gradient={stat.gradient as any}
              />
            </div>
          ))}
        </div>

        {/* Origin of Contacts */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-soft p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center bg-gradient-brand bg-clip-text text-transparent">
            <div className="w-2 h-6 bg-gradient-brand rounded-full mr-3" />
            Origem dos Contatos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <OriginCard
              platform="Instagram"
              icon={<div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">IG</div>}
              value={formatCounter(1234)}
              percentage="43"
              color="bg-gradient-to-br from-pink-50 to-purple-50"
            />
            <OriginCard
              platform="LinkedIn"
              icon={<div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">IN</div>}
              value={formatCounter(856)}
              percentage="30"
              color="bg-gradient-to-br from-blue-50 to-cyan-50"
            />
            <OriginCard
              platform="TikTok"
              icon={<div className="w-6 h-6 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs font-bold">TT</div>}
              value={formatCounter(423)}
              percentage="15"
              color="bg-gradient-to-br from-gray-50 to-slate-50"
            />
            <OriginCard
              platform="Site"
              icon={<div className="w-6 h-6 bg-gradient-brand rounded-lg flex items-center justify-center text-white text-xs font-bold">WB</div>}
              value={formatCounter(334)}
              percentage="12"
              color="bg-gradient-to-br from-brand-50 to-purple-50"
            />
          </div>
        </div>

        {/* Sales Funnel */}
        <SalesFunnel />

        {/* Customer Journey Timeline */}
        <CustomerJourney />

        {/* Service Metrics */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-soft p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            <div className="w-2 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-3" />
            Métricas de Atendimento
          </h2>
          <ServiceMetrics />
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-soft p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            <div className="w-2 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mr-3" />
            Campanhas Recentes
          </h2>
          <RecentCampaigns />
        </div>
      </div>
    </DashboardLayout>
  );
}
