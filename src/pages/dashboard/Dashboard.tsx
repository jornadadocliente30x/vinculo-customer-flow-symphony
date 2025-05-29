
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ControlsSection } from '@/components/dashboard/ControlsSection';
import { OriginCard } from '@/components/dashboard/OriginCard';
import { SalesFunnel } from '@/components/dashboard/SalesFunnel';
import { CustomerJourney } from '@/components/dashboard/CustomerJourney';
import { ServiceMetrics } from '@/components/dashboard/ServiceMetrics';
import { RecentCampaigns } from '@/components/dashboard/RecentCampaigns';
import { 
  Users, 
  MessageSquare, 
  Target, 
  TrendingUp
} from 'lucide-react';

const stats = [
  {
    title: 'Total de Leads',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    icon: <Users className="h-4 w-4" />,
    description: 'vs. mês anterior',
    sparklineData: [2100, 2200, 2350, 2400, 2500, 2650, 2700, 2750, 2800, 2820, 2840, 2847]
  },
  {
    title: 'Conversões',
    value: '543',
    change: '+8%',
    trend: 'up',
    icon: <Target className="h-4 w-4" />,
    description: 'vs. mês anterior',
    sparklineData: [450, 465, 480, 495, 510, 520, 525, 530, 535, 540, 542, 543]
  },
  {
    title: 'Mensagens Enviadas',
    value: '12,459',
    change: '+23%',
    trend: 'up',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'vs. mês anterior',
    sparklineData: [8500, 9200, 9800, 10200, 10800, 11200, 11500, 11800, 12000, 12200, 12350, 12459]
  },
  {
    title: 'Taxa de Conversão',
    value: '19.1%',
    change: '-2%',
    trend: 'down',
    icon: <TrendingUp className="h-4 w-4" />,
    description: 'vs. mês anterior',
    sparklineData: [21, 20.5, 20.2, 19.8, 19.5, 19.3, 19.2, 19.0, 18.9, 19.1, 19.0, 19.1]
  }
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Visão geral das suas vendas e automações
          </p>
        </div>

        {/* Controls Section */}
        <ControlsSection />

        {/* Main KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <MetricCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              trend={stat.trend as 'up' | 'down'}
              icon={stat.icon}
              description={stat.description}
              sparklineData={stat.sparklineData}
            />
          ))}
        </div>

        {/* Origin of Contacts */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Origem dos Contatos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <OriginCard
              platform="Instagram"
              icon={<div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded"></div>}
              value="1,234"
              percentage="43"
              color="bg-gradient-to-r from-pink-50 to-purple-50"
            />
            <OriginCard
              platform="LinkedIn"
              icon={<div className="w-6 h-6 bg-blue-600 rounded"></div>}
              value="856"
              percentage="30"
              color="bg-blue-50"
            />
            <OriginCard
              platform="TikTok"
              icon={<div className="w-6 h-6 bg-gray-900 rounded"></div>}
              value="423"
              percentage="15"
              color="bg-gray-50"
            />
            <OriginCard
              platform="Site"
              icon={<div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>}
              value="334"
              percentage="12"
              color="bg-gradient-to-r from-blue-50 to-purple-50"
            />
          </div>
        </div>

        {/* Sales Funnel */}
        <SalesFunnel />

        {/* Customer Journey Timeline */}
        <CustomerJourney />

        {/* Service Metrics */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Métricas de Atendimento</h2>
          <ServiceMetrics />
        </div>

        {/* Recent Campaigns */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Campanhas Recentes</h2>
          <RecentCampaigns />
        </div>
      </div>
    </DashboardLayout>
  );
}
