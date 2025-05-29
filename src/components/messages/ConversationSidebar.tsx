import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Search, Calendar, Pin, ChevronDown, Tag, FileText, Bell, BellOff, Eye, EyeOff } from 'lucide-react';
import { Conversation, ConversationCategory, Tag as TagType, FunnelStage } from '@/types/messages';
import { cn } from '@/lib/utils';
import { TagsModal } from './TagsModal';
import { StepsModal } from './StepsModal';
import { ScriptsModal } from './ScriptsModal';

interface ConversationSidebarProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onScheduleMessage: (conversationId: string) => void;
  onUpdateConversation: (id: string, updates: Partial<Conversation>) => void;
  activeFilter: ConversationCategory;
  onFilterChange: (filter: ConversationCategory) => void;
}

const categoryLabels = {
  atendimento: 'Atendimento',
  finalizados: 'Finalizados',
  agendamentos: 'Agendamentos',
  conversa_ia: 'Conversa IA'
};

const categoryColors = {
  atendimento: 'bg-blue-500 text-white hover:bg-blue-600',
  finalizados: 'bg-green-500 text-white hover:bg-green-600',
  agendamentos: 'bg-yellow-500 text-white hover:bg-yellow-600',
  conversa_ia: 'bg-purple-500 text-white hover:bg-purple-600'
};

const getOriginIcon = (origin: string) => {
  const icons = {
    instagram: '📷',
    linkedin: '💼',
    tiktok: '🎵',
    site: '🌐'
  };
  return icons[origin as keyof typeof icons] || '💬';
};

const getOriginColor = (origin: string) => {
  const colors = {
    instagram: 'bg-pink-100 text-pink-800',
    linkedin: 'bg-blue-100 text-blue-800',
    tiktok: 'bg-gray-100 text-gray-800',
    site: 'bg-green-100 text-green-800'
  };
  return colors[origin as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export function ConversationSidebar({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onScheduleMessage,
  onUpdateConversation,
  activeFilter,
  onFilterChange,
}: ConversationSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const [isStepsModalOpen, setIsStepsModalOpen] = useState(false);
  const [isScriptsModalOpen, setIsScriptsModalOpen] = useState(false);
  const [selectedConversationForModal, setSelectedConversationForModal] = useState<string>('');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = conv.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Pesquisa inteligente - se encontrar em outro filtro, sugerir
  const searchInAllFilters = () => {
    if (searchTerm && filteredConversations.length === 0) {
      const foundInOtherFilter = conversations.find(conv => 
        conv.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (foundInOtherFilter && foundInOtherFilter.category !== activeFilter) {
        return foundInOtherFilter.category;
      }
    }
    return null;
  };

  const suggestedFilter = searchInAllFilters();

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const formatScheduledDateTime = (date: Date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTagColorClasses = (color: TagType['color']) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'green': return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'purple': return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const handleTagsUpdate = (conversationId: string, tags: TagType[]) => {
    onUpdateConversation(conversationId, { tags });
  };

  const handleStageUpdate = (conversationId: string, stage: FunnelStage) => {
    onUpdateConversation(conversationId, { stage });
  };

  const handleReadToggle = (conversationId: string, isRead: boolean) => {
    onUpdateConversation(conversationId, { isRead });
  };

  const openTagsModal = (conversationId: string) => {
    setSelectedConversationForModal(conversationId);
    setIsTagsModalOpen(true);
  };

  const openStepsModal = (conversationId: string) => {
    setSelectedConversationForModal(conversationId);
    setIsStepsModalOpen(true);
  };

  const selectedConversationForTags = conversations.find(c => c.id === selectedConversationForModal);

  return (
    <TooltipProvider>
      <div className="w-[35%] border-r border-gray-200 bg-white flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-brand-50 to-purple-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar conversas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Sugestão de filtro inteligente */}
          {suggestedFilter && (
            <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
              <span className="text-blue-700">
                Contato encontrado em "{categoryLabels[suggestedFilter]}"
              </span>
              <Button
                variant="link"
                size="sm"
                onClick={() => onFilterChange(suggestedFilter)}
                className="ml-2 h-auto p-0 text-blue-600"
              >
                Ir para {categoryLabels[suggestedFilter]}
              </Button>
            </div>
          )}
        </div>

        {/* Filters com cores melhoradas */}
        <div className="p-4 border-b border-gray-100">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <Button
                key={key}
                variant={activeFilter === key ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange(key as ConversationCategory)}
                className={cn(
                  "text-xs py-2 px-3 transition-all duration-200",
                  activeFilter === key 
                    ? categoryColors[key as ConversationCategory]
                    : "hover:bg-gray-50 border-gray-200"
                )}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="divide-y divide-gray-100">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "p-4 cursor-pointer hover:bg-gray-50 transition-colors relative",
                  selectedConversationId === conversation.id && "bg-brand-50 border-r-2 border-brand-500",
                  !conversation.isRead && "bg-blue-50/30"
                )}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="space-y-3">
                  {/* Main conversation info */}
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>
                          {conversation.contactName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                      {/* Ícone de origem melhorado */}
                      <div className={cn(
                        "absolute -top-1 -right-1 text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-sm border border-white",
                        getOriginColor(conversation.origin)
                      )}>
                        {getOriginIcon(conversation.origin)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h4 className={cn(
                            "font-medium truncate",
                            conversation.isRead ? "text-gray-900" : "text-gray-900 font-semibold"
                          )}>
                            {conversation.contactName}
                          </h4>
                          {conversation.isPinned && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Pin className="w-3 h-3 text-brand-500" />
                              </TooltipTrigger>
                              <TooltipContent>Conversa Fixada</TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onScheduleMessage(conversation.id);
                                }}
                                className="h-6 w-6 p-0 hover:bg-brand-100"
                              >
                                <Calendar className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Agendar Mensagem</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className={cn(
                          "text-sm truncate flex-1",
                          conversation.isRead ? "text-gray-600" : "text-gray-900 font-medium"
                        )}>
                          {conversation.lastMessage}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-brand-500 text-white text-xs ml-2">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>

                      {/* Preview para agendamentos */}
                      {activeFilter === 'agendamentos' && conversation.scheduledDateTime && (
                        <div className="mt-2 p-2 bg-yellow-50 rounded text-xs border border-yellow-200">
                          <div className="flex items-center justify-between">
                            <span className="text-yellow-800">
                              📅 {formatScheduledDateTime(conversation.scheduledDateTime)}
                            </span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onScheduleMessage(conversation.id);
                                  }}
                                  className="h-6 w-6 p-0 text-yellow-600 hover:bg-yellow-100"
                                >
                                  <Calendar className="w-3 h-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Reagendar</TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      )}

                      {/* Tags melhoradas */}
                      {conversation.tags && conversation.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {conversation.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className={`text-xs px-2 py-1 rounded-full transition-colors ${getTagColorClasses(tag.color)}`}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Campo "Dono" */}
                      {conversation.assignedUser && (
                        <div className="mt-2 text-xs text-gray-500">
                          <span className="font-medium">Dono:</span> {conversation.assignedUser}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action buttons melhorados */}
                  <div className="flex items-center justify-between space-x-2 ml-15">
                    {/* Steps button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openStepsModal(conversation.id);
                          }}
                          className="flex-1 h-8 text-xs border-gray-200 hover:bg-brand-50"
                        >
                          <span>{conversation.stage?.name || 'Assimilação'}</span>
                          <ChevronDown className="w-3 h-3 ml-1" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Gerenciar Etapas do Funil</TooltipContent>
                    </Tooltip>

                    {/* Tags button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openTagsModal(conversation.id);
                          }}
                          className="flex-1 h-8 text-xs border-gray-200 hover:bg-brand-50"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          <span>{conversation.tags?.length ? `${conversation.tags.length}` : '0'}</span>
                          <ChevronDown className="w-3 h-3 ml-1" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Gerenciar Tags</TooltipContent>
                    </Tooltip>

                    {/* Read/Unread toggle */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1">
                          {conversation.isRead ? (
                            <Eye className="w-3 h-3 text-brand-500" />
                          ) : (
                            <EyeOff className="w-3 h-3 text-gray-400" />
                          )}
                          <Switch
                            checked={conversation.isRead}
                            onCheckedChange={(checked) => {
                              handleReadToggle(conversation.id, checked);
                            }}
                            className="data-[state=checked]:bg-brand-500"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Marcar como {conversation.isRead ? 'Não Lida' : 'Lida'}</TooltipContent>
                    </Tooltip>

                    {/* Scripts button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsScriptsModalOpen(true);
                          }}
                          className="h-8 px-2 border-gray-200 hover:bg-brand-50"
                        >
                          <FileText className="w-3 h-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Scripts de Mensagem</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Modals */}
        {selectedConversationForTags && (
          <TagsModal
            isOpen={isTagsModalOpen}
            onClose={() => setIsTagsModalOpen(false)}
            conversationId={selectedConversationForModal}
            currentTags={selectedConversationForTags.tags || []}
            onUpdateTags={(tags) => handleTagsUpdate(selectedConversationForModal, tags)}
          />
        )}

        {selectedConversationForTags && (
          <StepsModal
            isOpen={isStepsModalOpen}
            onClose={() => setIsStepsModalOpen(false)}
            conversationId={selectedConversationForModal}
            currentStage={selectedConversationForTags.stage}
            onUpdateStage={(stage) => handleStageUpdate(selectedConversationForModal, stage)}
          />
        )}

        <ScriptsModal
          isOpen={isScriptsModalOpen}
          onClose={() => setIsScriptsModalOpen(false)}
          onUseScript={(content) => {
            console.log('Script content to use:', content);
            // Esta função será conectada ao MessageInput através do ChatArea
          }}
        />
      </div>
    </TooltipProvider>
  );
}
