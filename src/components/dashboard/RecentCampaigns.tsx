import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Eye, MousePointer } from 'lucide-react';

const emailStages = [
  'Assimilação',
  'Utilização',
  'Adoção',
  'Expansão',
  'Evangelismo',
];
const emailCampaigns = [
  { stage: 'Assimilação', subject: 'Bem-vindo à Jornada', date: '15/01/2024', opens: '67%', clicks: '12%', status: 'Enviado' },
  { stage: 'Utilização', subject: 'Como usar a plataforma', date: '16/01/2024', opens: '72%', clicks: '8%', status: 'Enviado' },
  { stage: 'Adoção', subject: 'Dicas para Adotar', date: '17/01/2024', opens: '45%', clicks: '15%', status: 'Enviado' },
  { stage: 'Expansão', subject: 'Expanda seus resultados', date: '18/01/2024', opens: '58%', clicks: '22%', status: 'Pendente' },
  { stage: 'Evangelismo', subject: 'Compartilhe sua experiência', date: '19/01/2024', opens: '60%', clicks: '10%', status: 'Enviado' },
];
const whatsappCampaigns = [
  { stage: 'Assimilação', subject: 'Mensagem de boas-vindas', date: '15/01/2024', delivered: '98%', viewed: '85%', status: 'Enviado' },
  { stage: 'Utilização', subject: 'Tutorial rápido', date: '16/01/2024', delivered: '99%', viewed: '78%', status: 'Enviado' },
  { stage: 'Adoção', subject: 'Aproveite todos os recursos', date: '17/01/2024', delivered: '97%', viewed: '82%', status: 'Pendente' },
  { stage: 'Expansão', subject: 'Convide amigos', date: '18/01/2024', delivered: '100%', viewed: '91%', status: 'Enviado' },
  { stage: 'Evangelismo', subject: 'Conte sua história', date: '19/01/2024', delivered: '95%', viewed: '80%', status: 'Enviado' },
];

export function RecentCampaigns() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Campanhas Email</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {emailStages.map((stage) => (
            <div key={stage} className="mb-6">
              <div className="font-semibold text-sm text-gray-700 mb-2">Etapa {stage}</div>
              <div className="space-y-2">
                {emailCampaigns.filter(c => c.stage === stage).map((campaign, idx) => (
                  <div key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{campaign.subject}</h4>
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
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">Campanhas WhatsApp</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {emailStages.map((stage) => (
            <div key={stage} className="mb-6">
              <div className="font-semibold text-sm text-gray-700 mb-2">Etapa {stage}</div>
              <div className="space-y-2">
                {whatsappCampaigns.filter(c => c.stage === stage).map((campaign, idx) => (
                  <div key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{campaign.subject}</h4>
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
                        <span>Entregues: {campaign.delivered}</span>
                      </div>
                      <div className="flex items-center">
                        <MousePointer className="h-3 w-3 mr-1 text-gray-400" />
                        <span>Visualizados: {campaign.viewed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
