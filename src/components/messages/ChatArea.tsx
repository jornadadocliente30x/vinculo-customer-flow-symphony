import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ChatHeader } from './ChatHeader';
import { TransferContactModal } from './TransferContactModal';
import { TransferNotificationModal } from './TransferNotificationModal';
import { NewContactModal } from './NewContactModal';
import { TagsModal } from './TagsModal';
import { EditContactModal } from './EditContactModal';
import { PatientHistoryPanel } from './PatientHistoryPanel';
import { VideoCallSummaryModal } from './VideoCallSummaryModal';
import { ChatMessage, Conversation, Contact, TransferRequest } from '@/types/messages';
import { mockTransferRequests } from '@/data/mockTransferRequests';

interface ChatAreaProps {
  conversation: Conversation | null;
  messages: ChatMessage[];
  onSendMessage: (content: string, type: 'text' | 'audio', replyTo?: ChatMessage) => void;
  onAttachFile: (file: File, type: 'image' | 'video' | 'document') => void;
  onUpdateConversation: (id: string, updates: Partial<Conversation>) => void;
  onEditMessage?: (messageId: string, newContent: string) => void;
  activeFilter: string;
}

export function ChatArea({ 
  conversation, 
  messages, 
  onSendMessage, 
  onAttachFile,
  onUpdateConversation,
  onEditMessage,
  activeFilter
}: ChatAreaProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isTransferNotificationModalOpen, setIsTransferNotificationModalOpen] = useState(false);
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);
  const [isContactTagsModalOpen, setIsContactTagsModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [transferRequests, setTransferRequests] = useState<TransferRequest[]>(mockTransferRequests);

  const pendingTransferCount = transferRequests.filter(req => req.status === 'pending').length;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white text-4xl">💬</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Selecione uma conversa
          </h3>
          <p className="text-gray-600 max-w-sm mx-auto">
            Escolha uma conversa na lista para começar a atender seus pacientes de forma eficiente e organizada
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
    const currentTags = conversation.tags || [];
    const transferTag = { id: 'transfer-temp', name: 'Transferido', color: 'yellow' as const };
    onUpdateConversation(conversation.id, { 
      tags: [...currentTags, transferTag] 
    });
  };

  const handleNewContact = (contactData: any) => {
    console.log('Creating new contact:', contactData);
  };

  const handleEditContact = (contact: Contact) => {
    console.log('Updating contact:', contact);
  };

  const handleAcceptTransfer = (requestId: string) => {
    setTransferRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' as const } : req
      )
    );
  };

  const handleRejectTransfer = (requestId: string) => {
    setTransferRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' as const } : req
      )
    );
  };

  const handleVideoCallSummary = (summary: string) => {
    console.log('Video call summary:', summary);
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchTerm('');
    }
  };

  const handleSendReply = (reply: string, replyToMessage?: ChatMessage) => {
    if (replyToMessage) {
      const replyTo = {
        messageId: replyToMessage.id,
        content: replyToMessage.content,
        senderName: replyToMessage.direction === 'inbound' ? conversation.contactName : 'Você'
      };
      onSendMessage(reply, 'text', replyToMessage);
    } else {
      onSendMessage(reply, 'text');
    }
  };

  const canSendMessages = activeFilter === 'atendimento';

  const filteredMessages = searchTerm 
    ? messages.filter(msg => 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages;

  return (
    <TooltipProvider>
      <div className="flex-1 flex flex-col bg-gradient-to-b from-white to-gray-50">
        <ChatHeader
          conversation={conversation}
          isSearchExpanded={isSearchExpanded}
          searchTerm={searchTerm}
          pendingTransferCount={pendingTransferCount}
          onSearchToggle={handleSearchToggle}
          onSearchChange={setSearchTerm}
          onTransferNotifications={() => setIsTransferNotificationModalOpen(true)}
          onTransferContact={() => setIsTransferModalOpen(true)}
          onFinishConversation={handleFinishConversation}
          onNewContact={() => setIsNewContactModalOpen(true)}
          onEditContact={() => setIsEditContactModalOpen(true)}
          onManageTags={() => setIsContactTagsModalOpen(true)}
          onViewHistory={() => setIsHistoryPanelOpen(true)}
          activeFilter={activeFilter}
        />

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <div className="space-y-2">
            {filteredMessages.map((message, index) => {
              const isConsecutive = index > 0 && 
                filteredMessages[index - 1].direction === message.direction &&
                (message.timestamp.getTime() - filteredMessages[index - 1].timestamp.getTime()) < 300000;

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isConsecutive={isConsecutive}
                  contactName={conversation.contactName}
                  contactAvatar={conversation.avatar}
                  onSendReply={handleSendReply}
                  onEditMessage={onEditMessage}
                />
              );
            })}
          </div>
        </ScrollArea>

        {/* Message Input */}
        {canSendMessages ? (
          <div className="border-t border-gray-200 bg-white">
            <MessageInput 
              onSendMessage={(content, type) => onSendMessage(content, type)}
              onAttachFile={onAttachFile}
            />
          </div>
        ) : (
          <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="text-center text-gray-600 text-sm flex items-center justify-center space-x-2">
              <span>💬</span>
              <span>Campo de mensagem disponível apenas no filtro "Atendimento"</span>
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

        <TransferNotificationModal
          isOpen={isTransferNotificationModalOpen}
          onClose={() => setIsTransferNotificationModalOpen(false)}
          transferRequests={transferRequests}
          onAcceptTransfer={handleAcceptTransfer}
          onRejectTransfer={handleRejectTransfer}
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

        <VideoCallSummaryModal
          isOpen={isVideoCallModalOpen}
          onClose={() => setIsVideoCallModalOpen(false)}
          callDuration="00:15:32"
          participantName={conversation.contactName}
          onSaveSummary={handleVideoCallSummary}
        />

        <PatientHistoryPanel
          isOpen={isHistoryPanelOpen}
          onClose={() => setIsHistoryPanelOpen(false)}
          patientName={conversation.contactName}
        />
      </div>
    </TooltipProvider>
  );
}
