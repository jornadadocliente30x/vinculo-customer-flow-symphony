
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  Trash2, 
  Play, 
  Pause,
  Clock,
  Calendar
} from 'lucide-react';
import { Agent } from '@/types/agents';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (agentId: string) => void;
  onToggleStatus: (agentId: string) => void;
}

export function AgentCard({ agent, onEdit, onDelete, onToggleStatus }: AgentCardProps) {
  const isActive = agent.status === 'Ativo';

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Atendimento':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Agendamento':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Suporte':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {agent.title}
            </CardTitle>
            <Badge 
              variant="outline" 
              className={cn("mb-3", getTypeColor(agent.type))}
            >
              {agent.type}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isActive ? "bg-green-500" : "bg-red-500"
            )} />
            <span className={cn(
              "text-sm font-medium",
              isActive ? "text-green-700" : "text-red-700"
            )}>
              {agent.status}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {agent.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{agent.schedule.days.join(', ')}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            <span>{agent.schedule.startTime} - {agent.schedule.endTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(agent)}
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
            >
              <Edit className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleStatus(agent.id)}
              className={cn(
                "h-8 w-8 p-0",
                isActive 
                  ? "hover:bg-orange-50 hover:text-orange-600" 
                  : "hover:bg-green-50 hover:text-green-600"
              )}
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir Agente</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir o agente "{agent.title}"? 
                    Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(agent.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <span className="text-xs text-gray-400">
            {agent.patientJourney.length} etapas
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
