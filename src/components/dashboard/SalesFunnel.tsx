
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const funnelData = [
  { stage: 'Leads', count: 2847, percentage: 100, color: 'bg-green-500' },
  { stage: 'Oportunidades', count: 1423, percentage: 50, color: 'bg-yellow-500' },
  { stage: 'Agendamentos', count: 712, percentage: 25, color: 'bg-orange-500' },
  { stage: 'Fechados', count: 285, percentage: 10, color: 'bg-red-500' },
];

export function SalesFunnel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funil de Vendas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelData.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div
                className={`${stage.color} rounded-lg p-4 text-white relative overflow-hidden`}
                style={{ width: `${stage.percentage}%`, minWidth: '200px' }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{stage.stage}</span>
                  <span className="font-bold">{stage.count.toLocaleString()}</span>
                </div>
                <div className="text-sm opacity-90">
                  {stage.percentage}% dos leads iniciais
                </div>
                {index < funnelData.length - 1 && (
                  <div className="absolute -bottom-2 -right-2 text-xs bg-white text-gray-600 px-2 py-1 rounded">
                    {Math.round((funnelData[index + 1].count / stage.count) * 100)}% conversão
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
