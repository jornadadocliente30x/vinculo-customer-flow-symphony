
import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { QRCodeModal } from '@/components/connect/QRCodeModal';
import { UserStatusCard } from '@/components/connect/UserStatusCard';
import { Plus, Smartphone, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface WhatsAppInstance {
  id: string;
  name: string;
  number: string;
  status: 'connected' | 'disconnected' | 'connecting';
  lastConnection: string;
}

const mockInstances: WhatsAppInstance[] = [
  {
    id: '1',
    name: 'Atendimento Principal',
    number: '+55 11 99999-9999',
    status: 'connected',
    lastConnection: '2024-05-29 14:30'
  },
  {
    id: '2',
    name: 'Suporte Técnico',
    number: '+55 11 88888-8888',
    status: 'disconnected',
    lastConnection: '2024-05-28 09:15'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'connected':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Conectado</Badge>;
    case 'connecting':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><AlertCircle className="w-3 h-3 mr-1" />Conectando</Badge>;
    case 'disconnected':
      return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Desconectado</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

export default function ConnectPage() {
  const [instances, setInstances] = useState<WhatsAppInstance[]>(mockInstances);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isUserOnline, setIsUserOnline] = useState(true);

  const handleConnect = (instanceId: string) => {
    setInstances(prev => prev.map(instance => 
      instance.id === instanceId 
        ? { ...instance, status: 'connecting' as const }
        : instance
    ));
    
    // Simular conexão após 3 segundos
    setTimeout(() => {
      setInstances(prev => prev.map(instance => 
        instance.id === instanceId 
          ? { ...instance, status: 'connected' as const, lastConnection: new Date().toLocaleString('pt-BR') }
          : instance
      ));
    }, 3000);
  };

  const handleDisconnect = (instanceId: string) => {
    setInstances(prev => prev.map(instance => 
      instance.id === instanceId 
        ? { ...instance, status: 'disconnected' as const }
        : instance
    ));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Conectar WhatsApp</h1>
            <p className="text-gray-600 mt-1">Gerencie suas conexões WhatsApp</p>
          </div>
          <Button 
            onClick={() => setIsQRModalOpen(true)}
            className="bg-gradient-brand hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Instância
          </Button>
        </div>

        {/* User Status Card */}
        <UserStatusCard isOnline={isUserOnline} onToggle={setIsUserOnline} />

        {/* Instances Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              Instâncias WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Última Conexão</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instances.map((instance) => (
                  <TableRow key={instance.id}>
                    <TableCell className="font-medium">{instance.name}</TableCell>
                    <TableCell>{instance.number}</TableCell>
                    <TableCell>{getStatusBadge(instance.status)}</TableCell>
                    <TableCell>{instance.lastConnection}</TableCell>
                    <TableCell>
                      {instance.status === 'connected' ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDisconnect(instance.id)}
                        >
                          Desconectar
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleConnect(instance.id)}
                          disabled={instance.status === 'connecting'}
                        >
                          {instance.status === 'connecting' ? 'Conectando...' : 'Conectar'}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* QR Code Modal */}
        <QRCodeModal 
          isOpen={isQRModalOpen} 
          onClose={() => setIsQRModalOpen(false)} 
        />
      </div>
    </DashboardLayout>
  );
}
