
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Eye, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const emailCampaigns = [
  { name: 'Promoção Janeiro 2024', date: '15/01/2024', opens: '67%', clicks: '12%', status: 'Enviado' },
  { name: 'Newsletter Semanal #3', date: '12/01/2024', opens: '72%', clicks: '8%', status: 'Enviado' },
  { name: 'Follow-up Leads', date: '10/01/2024', opens: '45%', clicks: '15%', status: 'Enviado' },
  { name: 'Webinar Convite', date: '08/01/2024', opens: '58%', clicks: '22%', status: 'Agendado' },
];

const whatsappCampaigns = [
  { name: 'Bom dia personalizado', date: '15/01/2024', delivered: '98%', viewed: '85%', replied: '23%', status: 'Ativo' },
  { name: 'Oferta relâmpago', date: '14/01/2024', delivered: '99%', viewed: '78%', replied: '31%', status: 'Finalizado' },
  { name: 'Nutrição semanal', date: '13/01/2024', delivered: '97%', viewed: '82%', replied: '18%', status: 'Ativo' },
  { name: 'Feedback pós-compra', date: '12/01/2024', delivered: '100%', viewed: '91%', replied: '45%', status: 'Finalizado' },
];

export function RecentCampaigns() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Campanhas Email</CardTitle>
          </div>
          <Button variant="ghost" size="sm">Ver todas</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emailCampaigns.map((campaign, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{campaign.name}</h4>
                    <p className="text-xs text-gray-500">{campaign.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    campaign.status === 'Enviado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="flex space-x-4 text-xs">
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1 text-gray-400" />
                    <span>Aberturas: {campaign.opens}</span>
                  </div>
                  <div className="flex items-center">
                    <MousePointer className="h-3 w-3 mr-1 text-gray-400" />
                    <span>Cliques: {campaign.clicks}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">Campanhas WhatsApp</CardTitle>
          </div>
          <Button variant="ghost" size="sm">Ver todas</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {whatsappCampaigns.map((campaign, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{campaign.name}</h4>
                    <p className="text-xs text-gray-500">{campaign.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    campaign.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="flex space-x-4 text-xs">
                  <span>Entregues: {campaign.delivered}</span>
                  <span>Visualizadas: {campaign.viewed}</span>
                  <span>Respondidas: {campaign.replied}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
