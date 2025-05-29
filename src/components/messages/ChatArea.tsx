
import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { TransferContactModal } from './TransferContactModal';
import { NewContactModal } from './NewContactModal';
import { TagsModal } from './TagsModal';
import { EditContactModal } from './EditContactModal';
import { ChatMessage, Conversation, Contact } from '@/types/messages';
import { 
  MoreVertical, 
  Phone, 
  VideoIcon, 
  Search, 
  ArrowRightLeft, 
  UserPlus,
  CheckCircle,
  XCircle,
  X,
  FileText,
  History
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatAreaProps {
  conversation: Conversation | null;
  messages: ChatMessage[];
  onSendMessage: (content: string, type: 'text' | 'audio') => void;
  onAttachFile: (file: File, type: 'image' | 'video' | 'document') => void;
  onUpdateConversation: (id: string, updates: Partial<Conversation>) => void;
  activeFilter: string;
}

export function ChatArea({ 
  conversation, 
  messages, 
  onSendMessage, 
  onAttachFile,
  onUpdateConversation,
  activeFilter
}: ChatAreaProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);
  const [isContactTagsModalOpen, setIsContactTagsModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">💬</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Selecione uma conversa
          </h3>
          <p className="text-gray-500">
            Escolha uma conversa na lista para começar a conversar
          </p>
        </div>
      </div>
    );
  }

  const handleFinishConversation = () => {
    onUpdateConversation(conversation.id, { 
      category: conversation.category === 'atendimento' ? 'finalizados' : 'atendimento' 
    });
  };

  const handleTransferContact = (userId: string) => {
    console.log('Transferring contact to user:', userId);
    // Here you would implement the transfer logic
  };

  const handleNewContact = (contactData: any) => {
    console.log('Creating new contact:', contactData);
    // Here you would implement the contact creation logic
  };

  const handleEditContact = (contact: Contact) => {
    console.log('Updating contact:', contact);
    // Here you would implement the contact update logic
  };

  const isFinished = conversation.category === 'finalizados';
  const canSendMessages = activeFilter === 'atendimento';

  // Filtrar mensagens baseado na pesquisa
  const filteredMessages = searchTerm 
    ? messages.filter(msg => 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages;

  return (
    <TooltipProvider>
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
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
                <h3 className="font-medium text-gray-900">{conversation.contactName}</h3>
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
              {/* Search */}
              <div className="flex items-center">
                {isSearchExpanded ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Pesquisar na conversa..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-48"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsSearchExpanded(false);
                        setSearchTerm('');
                      }}
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
                        onClick={() => setIsSearchExpanded(true)}
                      >
                        <Search className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Pesquisar na conversa</TooltipContent>
                  </Tooltip>
                )}
              </div>

              {/* Histórico (substituindo Phone) */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm">
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
                    onClick={() => setIsTransferModalOpen(true)}
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Transferir contato</TooltipContent>
              </Tooltip>
              
              {/* Finish/Start Button com estilo consistente */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isFinished ? "default" : "default"}
                    size="sm"
                    onClick={handleFinishConversation}
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
                    onClick={() => setIsNewContactModalOpen(true)}
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
                  <DropdownMenuItem onClick={() => setIsEditContactModalOpen(true)}>
                    Editar Contato
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsContactTagsModalOpen(true)}>
                    Gerenciar Tags
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-1">
            {filteredMessages.map((message, index) => {
              const isConsecutive = index > 0 && 
                filteredMessages[index - 1].direction === message.direction &&
                (message.timestamp.getTime() - filteredMessages[index - 1].timestamp.getTime()) < 300000; // 5 minutes

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isConsecutive={isConsecutive}
                  contactName={conversation.contactName}
                  contactAvatar={conversation.avatar}
                />
              );
            })}
          </div>
        </ScrollArea>

        {/* Message Input - Condicional baseado no filtro */}
        {canSendMessages && (
          <MessageInput 
            onSendMessage={onSendMessage}
            onAttachFile={onAttachFile}
          />
        )}

        {!canSendMessages && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="text-center text-gray-500 text-sm">
              💬 Campo de mensagem disponível apenas no filtro "Atendimento"
            </div>
          </div>
        )}

        {/* Modals */}
        <TransferContactModal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          conversationId={conversation.id}
          contactName={conversation.contactName}
          onTransfer={handleTransferContact}
        />

        <NewContactModal
          isOpen={isNewContactModalOpen}
          onClose={() => setIsNewContactModalOpen(false)}
          onSaveContact={handleNewContact}
        />

        <TagsModal
          isOpen={isContactTagsModalOpen}
          onClose={() => setIsContactTagsModalOpen(false)}
          conversationId={conversation.id}
          currentTags={conversation.tags || []}
          onUpdateTags={(tags) => onUpdateConversation(conversation.id, { tags })}
        />

        <EditContactModal
          isOpen={isEditContactModalOpen}
          onClose={() => setIsEditContactModalOpen(false)}
          contact={{
            id: conversation.id,
            firstName: conversation.contactName.split(' ')[0],
            lastName: conversation.contactName.split(' ').slice(1).join(' '),
            phone: conversation.contactPhone,
            email: conversation.contactEmail || '',
            description: '',
            services: [],
            avatar: conversation.avatar
          }}
          onSaveContact={handleEditContact}
        />
      </div>
    </TooltipProvider>
  );
}
