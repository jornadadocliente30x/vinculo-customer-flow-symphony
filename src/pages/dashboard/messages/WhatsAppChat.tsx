import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { ConversationSidebar } from '@/components/messages/ConversationSidebar';
import { ChatArea } from '@/components/messages/ChatArea';
import { ScheduleMessageModal } from '@/components/messages/ScheduleMessageModal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { mockConversations, mockMessages } from '@/data/mockConversations';
import { ChatMessage, ScheduledMessage, Conversation, ConversationCategory } from '@/types/messages';
import { useToast } from '@/hooks/use-toast';
import { Bot, Send, ArrowRight } from 'lucide-react';

export default function WhatsAppChat() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleConversationId, setScheduleConversationId] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<ConversationCategory>('atendimento');
  const [isAISummaryModalOpen, setIsAISummaryModalOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const { toast } = useToast();

  const selectedConversation = conversations.find(
    conv => conv.id === selectedConversationId
  );

  const conversationMessages = messages.filter(
    msg => msg.conversationId === selectedConversationId
  );

  const handleSendMessage = (content: string, type: 'text' | 'audio', replyToMessage?: ChatMessage) => {
    if (!selectedConversationId) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      conversationId: selectedConversationId,
      content,
      type,
      direction: 'outbound',
      status: 'sent',
      timestamp: new Date(),
      replyTo: replyToMessage ? {
        messageId: replyToMessage.id,
        content: replyToMessage.content,
        senderName: replyToMessage.direction === 'inbound' ? selectedConversation?.contactName || 'Paciente' : 'Você'
      } : undefined
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

  const handleFilterChange = (filter: ConversationCategory) => {
    setActiveFilter(filter);
    setSelectedConversationId(null);
  };

  const handleAISummary = () => {
    if (!selectedConversation) return;
    
    const mockSummary = `RESUMO DA CONVERSA - ${selectedConversation.contactName}

🤖 ANÁLISE AUTOMÁTICA:

📋 CONTEXTO:
• Paciente: ${selectedConversation.contactName}
• Protocolo: #${selectedConversation.protocolNumber}
• Última interação: ${selectedConversation.lastMessageTime.toLocaleString('pt-BR')}

💬 PRINCIPAIS PONTOS:
• Paciente relatou dores lombares recorrentes
• Histórico de tratamento fisioterápico anterior
• Interesse em agendar nova consulta médica
• Demonstrou preocupação com medicação atual

🎯 RECOMENDAÇÕES:
• Agendar consulta presencial para avaliação
• Revisar prescrição médica atual
• Considerar encaminhamento para especialista
• Acompanhar evolução do quadro

📌 PRÓXIMOS PASSOS:
• Paciente deve retornar em 7 dias
• Exames complementares podem ser necessários
• Manter acompanhamento regular

✅ STATUS: Pronto para encaminhamento ao atendimento médico`;

    setAiSummary(mockSummary);
    setIsAISummaryModalOpen(true);
  };

  const handleForwardToAttendance = () => {
    if (!selectedConversation) return;

    handleUpdateConversation(selectedConversation.id, { 
      category: 'atendimento',
      tags: [
        ...(selectedConversation.tags || []),
        { id: 'ai-analyzed', name: 'Analisado pela IA', color: 'purple' as const }
      ]
    });

    setActiveFilter('atendimento');
    
    setIsAISummaryModalOpen(false);
    
    toast({
      title: "Conversa encaminhada",
      description: "Conversa foi encaminhada para Atendimento com resumo da IA",
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
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <div className="flex-1 flex flex-col">
          {activeFilter === 'conversa_ia' && selectedConversation && (
            <div className="bg-gradient-to-r from-purple-50 to-brand-50 border-b border-purple-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bot className="w-6 h-6 text-purple-600" />
                  <div>
                    <span className="text-sm font-medium text-purple-800">
                      Conversa com IA ativa
                    </span>
                    <Badge variant="outline" className="ml-2 text-purple-600 border-purple-300">
                      Análise automática
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={handleAISummary}
                  className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Gerar Resumo
                </Button>
              </div>
            </div>
          )}

          <ChatArea
            conversation={selectedConversation || null}
            messages={conversationMessages}
            onSendMessage={handleSendMessage}
            onAttachFile={handleAttachFile}
            onUpdateConversation={handleUpdateConversation}
            activeFilter={activeFilter}
          />
        </div>
      </div>

      <ScheduleMessageModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        conversationId={scheduleConversationId}
        onSchedule={handleScheduleSubmit}
      />

      <Dialog open={isAISummaryModalOpen} onOpenChange={setIsAISummaryModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-purple-600" />
              <span>Resumo da IA</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Análise automática da conversa</Label>
              <Textarea
                value={aiSummary}
                onChange={(e) => setAiSummary(e.target.value)}
                rows={15}
                className="mt-2 font-mono text-sm focus:border-brand-500 focus:ring-brand-500"
                readOnly
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsAISummaryModalOpen(false)}
              >
                Fechar
              </Button>
              <Button 
                onClick={handleForwardToAttendance}
                className="bg-gradient-brand hover:opacity-90"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Encaminhar para Atendimento
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
