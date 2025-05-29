
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { MonthlyCalendarModal } from './MonthlyCalendarModal';
import { Conversation } from '@/types/messages';
import { 
  Search, 
  X, 
  History, 
  ArrowRightLeft, 
  CheckCircle, 
  XCircle, 
  UserPlus, 
  MoreVertical,
  Bell,
  FileText,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatHeaderProps {
  conversation: Conversation;
  isSearchExpanded: boolean;
  searchTerm: string;
  pendingTransferCount: number;
  onSearchToggle: () => void;
  onSearchChange: (term: string) => void;
  onTransferNotifications: () => void;
  onTransferContact: () => void;
  onFinishConversation: () => void;
  onNewContact: () => void;
  onEditContact: () => void;
  onManageTags: () => void;
  onViewHistory: () => void;
  activeFilter: string;
}

export function ChatHeader({
  conversation,
  isSearchExpanded,
  searchTerm,
  pendingTransferCount,
  onSearchToggle,
  onSearchChange,
  onTransferNotifications,
  onTransferContact,
  onFinishConversation,
  onNewContact,
  onEditContact,
  onManageTags,
  onViewHistory,
  activeFilter
}: ChatHeaderProps) {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const isFinished = conversation.category === 'finalizados';
  const isTransferred = conversation.tags?.some(tag => tag.name === 'Transferido');

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
              <AvatarImage src={conversation.avatar} />
              <AvatarFallback className="bg-gradient-brand text-white font-semibold">
                {conversation.contactName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {conversation.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
            )}
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 text-lg">{conversation.contactName}</h3>
              {isTransferred && (
                <Badge variant="outline" className="text-yellow-700 border-yellow-300 bg-yellow-50 hover:bg-yellow-100">
                  Transferido
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-600 font-medium">
                {conversation.contactPhone}
              </p>
              <span className="text-xs text-gray-400">•</span>
              <div className="flex items-center space-x-1">
                <FileText className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500 font-mono">#{conversation.protocolNumber}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Transfer Notifications */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="relative hover:bg-blue-50"
                onClick={onTransferNotifications}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {pendingTransferCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {pendingTransferCount}
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notificações de transferência</TooltipContent>
          </Tooltip>

          {/* Search */}
          <div className="flex items-center">
            {isSearchExpanded ? (
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Pesquisar na conversa..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-48 border-brand-200 focus:border-brand-400"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSearchToggle}
                  className="hover:bg-red-50"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onSearchToggle}
                    className="hover:bg-blue-50"
                  >
                    <Search className="h-5 w-5 text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Pesquisar na conversa</TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Histórico do paciente */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onViewHistory}
                className="hover:bg-blue-50"
              >
                <History className="h-5 w-5 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ver histórico do paciente</TooltipContent>
          </Tooltip>

          {/* Calendar Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsCalendarModalOpen(true)}
                className="hover:bg-blue-50"
              >
                <Calendar className="h-5 w-5 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Calendário de agendamentos</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onTransferContact}
                className="hover:bg-blue-50"
              >
                <ArrowRightLeft className="h-5 w-5 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Transferir contato</TooltipContent>
          </Tooltip>
          
          {/* Finish/Start Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="sm"
                onClick={onFinishConversation}
                className={cn(
                  "px-4 shadow-sm transition-all",
                  isFinished 
                    ? "bg-green-500 hover:bg-green-600 text-white shadow-green-200" 
                    : "bg-red-500 hover:bg-red-600 text-white shadow-red-200"
                )}
              >
                {isFinished ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Iniciar
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-2" />
                    Finalizar
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isFinished ? 'Iniciar atendimento' : 'Finalizar atendimento'}
            </TooltipContent>
          </Tooltip>

          {/* New Contact Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onNewContact}
                className="px-4 border-brand-200 hover:bg-brand-50 hover:border-brand-300 text-brand-700 shadow-sm"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Novo
              </Button>
            </TooltipTrigger>
            <TooltipContent>Criar novo contato</TooltipContent>
          </Tooltip>

          {/* More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
              <DropdownMenuItem onClick={onEditContact} className="hover:bg-gray-50">
                Editar Contato
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onManageTags} className="hover:bg-gray-50">
                Gerenciar Tags
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Monthly Calendar Modal */}
      <MonthlyCalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />
    </div>
  );
}
