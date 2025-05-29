
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Conversation } from '@/types/messages';
import { 
  Search, 
  X, 
  History, 
  VideoIcon, 
  ArrowRightLeft, 
  CheckCircle, 
  XCircle, 
  UserPlus, 
  MoreVertical,
  Bell,
  FileText
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
  const isFinished = conversation.category === 'finalizados';
  const isTransferred = conversation.tags?.some(tag => tag.name === 'Transferido');

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={conversation.avatar} />
              <AvatarFallback>
                {conversation.contactName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {conversation.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-gray-900">{conversation.contactName}</h3>
              {isTransferred && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                  Transferido
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-500">
                {conversation.isOnline ? 'Online' : 'Visto por último hoje'}
              </p>
              <span className="text-xs text-gray-400">•</span>
              <div className="flex items-center space-x-1">
                <FileText className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">#{conversation.protocolNumber}</span>
              </div>
              {conversation.assignedUser && (
                <>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    <span className="font-medium">Dono:</span> {conversation.assignedUser}
                  </span>
                </>
              )}
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
                className="relative"
                onClick={onTransferNotifications}
              >
                <Bell className="h-5 w-5" />
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
                  className="w-48"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSearchToggle}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onSearchToggle}
                  >
                    <Search className="h-5 w-5" />
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
              >
                <History className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ver histórico do paciente</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <VideoIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Videochamada</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onTransferContact}
              >
                <ArrowRightLeft className="h-5 w-5" />
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
                  "px-3",
                  isFinished 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "bg-red-500 hover:bg-red-600 text-white"
                )}
              >
                {isFinished ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Iniciar
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-1" />
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
                className="px-3 border-gray-200 hover:bg-brand-50"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Novo
              </Button>
            </TooltipTrigger>
            <TooltipContent>Criar novo contato</TooltipContent>
          </Tooltip>

          {/* More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
              <DropdownMenuItem onClick={onEditContact}>
                Editar Contato
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onManageTags}>
                Gerenciar Tags
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
