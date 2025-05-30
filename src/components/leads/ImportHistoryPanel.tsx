
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, CheckCircle, Clock, Pause } from 'lucide-react';

interface ImportHistory {
  id: string;
  name: string;
  date: Date;
  totalContacts: number;
  importedContacts: number;
  status: 'imported' | 'pending' | 'paused';
}

const mockImportHistory: ImportHistory[] = [
  {
    id: '1',
    name: 'Leads Janeiro 2024',
    date: new Date('2024-01-15'),
    totalContacts: 250,
    importedContacts: 250,
    status: 'imported',
  },
  {
    id: '2',
    name: 'Contatos LinkedIn',
    date: new Date('2024-01-10'),
    totalContacts: 180,
    importedContacts: 165,
    status: 'pending',
  },
  {
    id: '3',
    name: 'Leads Instagram',
    date: new Date('2024-01-05'),
    totalContacts: 320,
    importedContacts: 120,
    status: 'paused',
  },
];

export function ImportHistoryPanel() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'imported':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'imported':
        return 'Importado';
      case 'pending':
        return 'Pendente';
      case 'paused':
        return 'Pausado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'imported':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'paused':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-lg text-gray-900 mb-2">Histórico de Importações</h3>
        <p className="text-sm text-gray-600">Lista de todas as importações realizadas</p>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {mockImportHistory.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {item.date.toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(item.status)}
                    <span>{getStatusLabel(item.status)}</span>
                  </div>
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded p-3 border">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.totalContacts}
                      </div>
                      <div className="text-xs text-gray-600">Total no arquivo</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded p-3 border">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.importedContacts}
                      </div>
                      <div className="text-xs text-gray-600">Importados</div>
                    </div>
                  </div>
                </div>
              </div>

              {item.status === 'pending' && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(item.importedContacts / item.totalContacts) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {Math.round((item.importedContacts / item.totalContacts) * 100)}% concluído
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
