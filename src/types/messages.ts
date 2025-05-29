
export interface Conversation {
  id: string;
  contactName: string;
  contactPhone: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  category: ConversationCategory;
  isPinned: boolean;
}

export type ConversationCategory = 'atendimento' | 'agendamentos' | 'esperando' | 'chatbot';

export interface ChatMessage {
  id: string;
  conversationId: string;
  content: string;
  type: MessageType;
  direction: 'inbound' | 'outbound';
  status: MessageStatus;
  timestamp: Date;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  filename: string;
  size: number;
}

export interface ScheduledMessage {
  id: string;
  conversationId: string;
  title: string;
  description: string;
  content: string;
  scheduledDate: Date;
  attachments?: MessageAttachment[];
  status: 'pending' | 'sent' | 'cancelled';
}

export type MessageType = 'text' | 'image' | 'document' | 'audio' | 'video' | 'emoji';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
