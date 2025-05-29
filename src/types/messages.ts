
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
  stage?: FunnelStage;
  tags?: Tag[];
  notificationsEnabled: boolean;
}

export type ConversationCategory = 'atendimento' | 'finalizados' | 'agendamentos' | 'conversa_ia';

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
  status: 'pending' | 'sent' | 'cancelled' | 'delivered' | 'read';
  deliveredAt?: Date;
  readAt?: Date;
}

export interface Tag {
  id: string;
  name: string;
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

export interface FunnelStage {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface MessageScript {
  id: string;
  title: string;
  content: string;
  attachments?: MessageAttachment[];
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  description?: string;
  services: string[];
  avatar?: string;
}

export type MessageType = 'text' | 'image' | 'document' | 'audio' | 'video' | 'emoji';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
