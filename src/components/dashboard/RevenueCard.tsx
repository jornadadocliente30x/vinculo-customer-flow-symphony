import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Calendar, Target } from 'lucide-react';

const revenueData = [
  {
    title: 'Receita Potencial',
    subtitle: 'Leads',
    value: 'R$ 85.410,00',
    description: '2.847 leads × R$ 30 ticket médio',
    icon: <TrendingUp className="h-6 w-6" />,
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
    change: '+12%',
    trend: 'up' as const
  },
  {
    title: 'Receita Real',
    subtitle: 'Agendamentos',
    value: 'R$ 42.690,00',
    description: '1.423 agendamentos × R$ 30 ticket médio',
    icon: <Calendar className="h-6 w-6" />,
    gradient: 'from-emerald-500 to-emerald-600',
    bgGradient: 'from-emerald-50 to-emerald-100',
    change: '+8%',
    trend: 'up' as const
  },
  {
    title: 'Receita Possível',
    subtitle: 'Jornada',
    value: 'R$ 21.360,00',
    description: '712 em jornada × R$ 30 ticket médio',
    icon: <Target className="h-6 w-6" />,
    gradient: 'from-amber-500 to-amber-600',
    bgGradient: 'from-amber-50 to-amber-100',
    change: '+15%',
    trend: 'up' as const
  }
];

export function RevenueCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-soft p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold flex items-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          <div className="w-2 h-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mr-3" />
          Resumo de Receitas
        </h2>
        <p className="text-gray-600 mt-1">Projeção de receitas baseada no funil de vendas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {revenueData.map((item, index) => (
          <Card 
            key={index} 
            className="group hover:shadow-medium transition-all duration-300 border-gray-100 overflow-hidden"
          >
            <CardHeader className={`pb-3 bg-gradient-to-r ${item.bgGradient}`}>
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} text-white shadow-lg`}>
                  {item.icon}
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-4 h-4 mr-1`} />
                  {item.change}
                </div>
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800 mt-3">
                {item.title}
                <span className="block text-sm font-normal text-gray-600">{item.subtitle}</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                  {item.value}
                </div>
                
                <div className="text-sm text-gray-600">
                  {item.description}
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <DollarSign className="w-3 h-3 mr-1" />
                    <span>Baseado no ticket médio atual</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Total Potencial</h3>
            <p className="text-sm text-gray-600">Soma de todas as receitas possíveis</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              R$ 149.460,00
            </div>
            <div className="text-sm text-emerald-600 font-medium">
              +11,7% vs. mês anterior
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
