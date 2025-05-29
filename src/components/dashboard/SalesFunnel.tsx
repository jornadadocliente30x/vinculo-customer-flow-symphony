
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const funnelData = [
  { 
    stage: 'Leads', 
    count: 2847, 
    percentage: 100, 
    gradient: 'from-emerald-500 to-teal-500'
  },
  { 
    stage: 'Oportunidades', 
    count: 1423, 
    percentage: 50, 
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    stage: 'Agendamentos', 
    count: 712, 
    percentage: 25, 
    gradient: 'from-amber-500 to-orange-500'
  },
  { 
    stage: 'Fechados', 
    count: 285, 
    percentage: 10, 
    gradient: 'from-purple-500 to-pink-500'
  },
];

export function SalesFunnel() {
  return (
    <Card className="bg-white border border-gray-100 shadow-soft rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Funil de Vendas</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {funnelData.map((stage, index) => {
            const conversionRate = index < funnelData.length - 1 
              ? Math.round((funnelData[index + 1].count / stage.count) * 100)
              : null;
            
            return (
              <div key={stage.stage} className="relative">
                {/* Main funnel bar */}
                <div className="relative mb-3">
                  <div
                    className={cn(
                      "rounded-xl p-5 text-white relative overflow-hidden shadow-medium transition-all duration-300 hover:shadow-strong",
                      `bg-gradient-to-r ${stage.gradient}`
                    )}
                    style={{ 
                      width: `${Math.max(stage.percentage, 30)}%`, 
                      minWidth: '280px' 
                    }}
                  >
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                    
                    <div className="relative flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-lg">{stage.stage}</h4>
                        <p className="text-sm opacity-90">
                          {stage.percentage}% dos leads iniciais
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-2xl">{stage.count.toLocaleString()}</div>
                        <div className="text-sm opacity-90">contatos</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversion rate badge - positioned outside the bar */}
                {conversionRate && (
                  <div className="flex justify-center mb-2">
                    <div className="bg-white border border-gray-200 shadow-soft px-4 py-2 rounded-full">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full" />
                        <span className="text-sm font-medium text-gray-700">
                          {conversionRate}% conversão
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Connection line to next stage */}
                {index < funnelData.length - 1 && (
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-gradient-to-b from-gray-300 to-gray-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary stats */}
        <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round((funnelData[funnelData.length - 1].count / funnelData[0].count) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Taxa de Conversão Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {funnelData[0].count - funnelData[funnelData.length - 1].count}
              </div>
              <div className="text-sm text-gray-600">Leads Perdidos</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
