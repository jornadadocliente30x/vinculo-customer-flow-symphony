import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Search, Calendar, Pin, ChevronDown, Tag, FileText, Bell, BellOff } from 'lucide-react';
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
}

const categoryLabels = {
  atendimento: 'Atendimento',
  finalizados: 'Finalizados',
  agendamentos: 'Agendamentos',
  conversa_ia: 'Conversa IA'
};

export function ConversationSidebar({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onScheduleMessage,
  onUpdateConversation,
}: ConversationSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<ConversationCategory>('atendimento');
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

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const getTagColorClasses = (color: TagType['color']) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTagsUpdate = (conversationId: string, tags: TagType[]) => {
    onUpdateConversation(conversationId, { tags });
  };

  const handleStageUpdate = (conversationId: string, stage: FunnelStage) => {
    onUpdateConversation(conversationId, { stage });
  };

  const handleNotificationToggle = (conversationId: string, enabled: boolean) => {
    onUpdateConversation(conversationId, { notificationsEnabled: enabled });
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
    <div className="w-[45%] border-r border-gray-200 bg-white flex flex-col h-full">
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
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-100">
        <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as ConversationCategory)}>
          <TabsList className="grid w-full grid-cols-4 h-auto">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <TabsTrigger 
                key={key} 
                value={key}
                className={cn(
                  "text-xs py-2 px-1 data-[state=active]:bg-brand-500 data-[state=active]:text-white",
                  "transition-all duration-200"
                )}
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-100">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "p-4 cursor-pointer hover:bg-gray-50 transition-colors relative",
                selectedConversationId === conversation.id && "bg-brand-50 border-r-2 border-brand-500"
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
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 truncate">
                          {conversation.contactName}
                        </h4>
                        {conversation.isPinned && (
                          <Pin className="w-3 h-3 text-brand-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessageTime)}
                        </span>
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
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-brand-500 text-white text-xs ml-2">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>

                    {/* Tags */}
                    {conversation.tags && conversation.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {conversation.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className={`text-xs px-2 py-1 rounded-full ${getTagColorClasses(tag.color)}`}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between space-x-2 ml-15">
                  {/* Steps button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openStepsModal(conversation.id);
                    }}
                    className="flex-1 h-8 text-xs"
                  >
                    <span>Etapas</span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>

                  {/* Tags button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openTagsModal(conversation.id);
                    }}
                    className="flex-1 h-8 text-xs"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    <span>Tags</span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>

                  {/* Notifications toggle */}
                  <div className="flex items-center space-x-1">
                    {conversation.notificationsEnabled ? (
                      <Bell className="w-3 h-3 text-brand-500" />
                    ) : (
                      <BellOff className="w-3 h-3 text-gray-400" />
                    )}
                    <Switch
                      checked={conversation.notificationsEnabled}
                      onCheckedChange={(checked) => {
                        handleNotificationToggle(conversation.id, checked);
                      }}
                    />
                  </div>

                  {/* Scripts button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsScriptsModalOpen(true);
                    }}
                    className="h-8 px-2"
                  >
                    <FileText className="w-3 h-3" />
                  </Button>
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
        onSaveScript={(script) => {
          console.log('Script saved:', script);
          // Here you would typically save to your backend
        }}
      />
    </div>
  );
}
