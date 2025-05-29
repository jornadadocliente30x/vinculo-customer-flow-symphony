
import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { ConversationSidebar } from '@/components/messages/ConversationSidebar';
import { ChatArea } from '@/components/messages/ChatArea';
import { ScheduleMessageModal } from '@/components/messages/ScheduleMessageModal';
import { mockConversations, mockMessages } from '@/data/mockConversations';
import { ChatMessage, ScheduledMessage, Conversation } from '@/types/messages';
import { useToast } from '@/hooks/use-toast';

export default function WhatsAppChat() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleConversationId, setScheduleConversationId] = useState<string>('');
  const { toast } = useToast();

  const selectedConversation = conversations.find(
    conv => conv.id === selectedConversationId
  );

  const conversationMessages = messages.filter(
    msg => msg.conversationId === selectedConversationId
  );

  const handleSendMessage = (content: string, type: 'text' | 'audio') => {
    if (!selectedConversationId) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      conversationId: selectedConversationId,
      content,
      type,
      direction: 'outbound',
      status: 'sent',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    toast({
      title: "Mensagem enviada",
      description: type === 'audio' ? "Áudio enviado com sucesso" : "Mensagem enviada com sucesso",
    });
  };

  const handleAttachFile = (file: File, type: 'image' | 'video' | 'document') => {
    if (!selectedConversationId) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      conversationId: selectedConversationId,
      content: `${type === 'image' ? '📷' : type === 'video' ? '🎥' : '📄'} ${file.name}`,
      type,
      direction: 'outbound',
      status: 'sent',
      timestamp: new Date(),
      attachments: [{
        id: Date.now().toString(),
        type,
        url: URL.createObjectURL(file),
        filename: file.name,
        size: file.size,
      }],
    };

    setMessages(prev => [...prev, newMessage]);

    toast({
      title: "Arquivo enviado",
      description: `${file.name} foi enviado com sucesso`,
    });
  };

  const handleScheduleMessage = (conversationId: string) => {
    setScheduleConversationId(conversationId);
    setIsScheduleModalOpen(true);
  };

  const handleScheduleSubmit = (scheduledMessage: Omit<ScheduledMessage, 'id'>) => {
    toast({
      title: "Mensagem agendada",
      description: `Mensagem "${scheduledMessage.title}" agendada para ${scheduledMessage.scheduledDate.toLocaleString('pt-BR')}`,
    });
  };

  const handleUpdateConversation = (id: string, updates: Partial<Conversation>) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, ...updates } : conv
      )
    );

    toast({
      title: "Conversa atualizada",
      description: "As alterações foram salvas com sucesso",
    });
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-120px)] flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <ConversationSidebar
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={setSelectedConversationId}
          onScheduleMessage={handleScheduleMessage}
          onUpdateConversation={handleUpdateConversation}
        />

        <ChatArea
          conversation={selectedConversation || null}
          messages={conversationMessages}
          onSendMessage={handleSendMessage}
          onAttachFile={handleAttachFile}
          onUpdateConversation={handleUpdateConversation}
        />
      </div>

      <ScheduleMessageModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        conversationId={scheduleConversationId}
        onSchedule={handleScheduleSubmit}
      />
    </DashboardLayout>
  );
}
