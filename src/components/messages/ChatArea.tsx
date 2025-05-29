
import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { TransferContactModal } from './TransferContactModal';
import { NewContactModal } from './NewContactModal';
import { TagsModal } from './TagsModal';
import { ChatMessage, Conversation } from '@/types/messages';
import { 
  MoreVertical, 
  Phone, 
  VideoIcon, 
  Search, 
  ArrowRightLeft, 
  UserPlus,
  CheckCircle,
  XCircle 
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
}

export function ChatArea({ 
  conversation, 
  messages, 
  onSendMessage, 
  onAttachFile,
  onUpdateConversation 
}: ChatAreaProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);
  const [isContactTagsModalOpen, setIsContactTagsModalOpen] = useState(false);

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

  const isFinished = conversation.category === 'finalizados';

  return (
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
              <p className="text-sm text-gray-500">
                {conversation.isOnline ? 'Online' : 'Visto por último hoje'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <VideoIcon className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsTransferModalOpen(true)}
            >
              <ArrowRightLeft className="h-5 w-5" />
            </Button>
            
            {/* Finish/Start Button */}
            <Button
              variant={isFinished ? "default" : "destructive"}
              size="sm"
              onClick={handleFinishConversation}
              className="px-3"
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

            {/* New Contact Button */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsNewContactModalOpen(true)}
              className="px-3"
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Novo
            </Button>

            {/* More Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                <DropdownMenuItem onClick={() => console.log('Edit contact')}>
                  Editar Contato
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsContactTagsModalOpen(true)}>
                  Criar Tags
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-1">
          {messages.map((message, index) => {
            const isConsecutive = index > 0 && 
              messages[index - 1].direction === message.direction &&
              (message.timestamp.getTime() - messages[index - 1].timestamp.getTime()) < 300000; // 5 minutes

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

      {/* Message Input */}
      <MessageInput 
        onSendMessage={onSendMessage}
        onAttachFile={onAttachFile}
      />

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
    </div>
  );
}
