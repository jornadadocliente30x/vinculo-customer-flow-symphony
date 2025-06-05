
import { BaseService } from './base.service';
import type { Chat, Mensagem, StatusChat } from '@/types/unified';
import { supabase } from '@/integrations/supabase/client';

class ChatService extends BaseService<Chat> {
  constructor() {
    super('chat');
  }

  async getChatsWithMessages() {
    const { data, error } = await supabase
      .from('chat')
      .select(`
        *,
        lead:lead_id(*),
        usuario:usuario_id(*),
        status_chat:status_chat_id(*),
        mensagens:mensagem(*)
      `)
      .eq('ativo', true)
      .eq('deleted', false);

    if (error) {
      console.error('Error fetching chats with messages:', error);
      throw new Error(error.message);
    }

    return data || [];
  }

  async getChatsByStatus(statusId: number) {
    return this.findAll({ status_chat_id: statusId, ativo: true, deleted: false });
  }

  async getChatsByLead(leadId: number) {
    return this.findAll({ lead_id: leadId, ativo: true, deleted: false });
  }
}

class MensagemService extends BaseService<Mensagem> {
  constructor() {
    super('mensagem');
  }

  async getMessagesByChat(chatId: number) {
    return this.findAll({ chat_id: chatId }, { column: 'created_at', ascending: true });
  }

  async markAsRead(messageId: number) {
    return this.update(messageId, { lida: true });
  }

  async markAsSent(messageId: number) {
    return this.update(messageId, { enviada: true });
  }
}

class StatusChatService extends BaseService<StatusChat> {
  constructor() {
    super('status_chat');
  }
}

export const chatService = new ChatService();
export const mensagemService = new MensagemService();
export const statusChatService = new StatusChatService();
