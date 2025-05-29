
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const journeyStages = [
  { name: 'Assimilação', contacts: 2847, list: 'Novos Contatos', time: '2-3 dias', progress: 85 },
  { name: 'Utilização', contacts: 1423, list: 'Experimentação', time: '7-14 dias', progress: 65 },
  { name: 'Adoção', contacts: 856, list: 'Uso Regular', time: '21-30 dias', progress: 45 },
  { name: 'Expansão', contacts: 342, list: 'Upgrade', time: '45-60 dias', progress: 25 },
  { name: 'Evangelismo', contacts: 128, list: 'Recomendadores', time: '90+ dias', progress: 15 },
];

export function CustomerJourney() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Journey Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200"></div>
          <div 
            className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000"
            style={{ width: '65%' }}
          ></div>
          
          <div className="flex justify-between items-start">
            {journeyStages.map((stage, index) => (
              <div key={stage.name} className="flex flex-col items-center relative">
                <div className="w-8 h-8 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 mb-4 z-10">
                  {index + 1}
                </div>
                <Card className="w-40 shadow-sm">
                  <CardContent className="p-3 text-center">
                    <h4 className="font-medium text-sm mb-1">{stage.name}</h4>
                    <div className="text-lg font-bold text-blue-600">{stage.contacts}</div>
                    <div className="text-xs text-gray-500 mb-1">{stage.list}</div>
                    <div className="text-xs text-gray-400">{stage.time}</div>
                    <div className="mt-2 bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-1 rounded-full transition-all duration-1000"
                        style={{ width: `${stage.progress}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
