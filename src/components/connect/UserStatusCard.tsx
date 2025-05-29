
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { User, Wifi, WifiOff } from 'lucide-react';

interface UserStatusCardProps {
  isOnline: boolean;
  onToggle: (online: boolean) => void;
}

export function UserStatusCard({ isOnline, onToggle }: UserStatusCardProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Status do Usuário
          </div>
          <Badge 
            className={`${
              isOnline 
                ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3 mr-1" />
                Online
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 mr-1" />
                Offline
              </>
            )}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Status de Atendimento
            </p>
            <p className="text-xs text-gray-600">
              {isOnline 
                ? 'Você está disponível para receber mensagens' 
                : 'Você está indisponível no momento'
              }
            </p>
          </div>
          <Switch 
            checked={isOnline} 
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}
