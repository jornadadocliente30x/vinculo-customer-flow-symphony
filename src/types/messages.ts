
export interface Conversation {
  id: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
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
  isRead: boolean;
  origin: 'instagram' | 'linkedin' | 'tiktok' | 'site';
  protocolNumber: string;
  scheduledDateTime?: Date;
  assignedUser?: string;
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
  replyTo?: {
    messageId: string;
    content: string;
    senderName: string;
  };
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  filename: string;
  size: number;
  thumbnail?: string;
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
  order: number;
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
  services: ContactService[];
  avatar?: string;
  assignedUser?: string;
}

export interface ContactService {
  id: string;
  name: string;
  type: 'consultation' | 'exam' | 'surgery' | 'therapy' | 'nutrition' | 'psychology' | 'custom';
}

export interface TransferRequest {
  id: string;
  contactName: string;
  fromUser: string;
  toUser: string;
  requestedAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

export type MessageType = 'text' | 'image' | 'document' | 'audio' | 'video' | 'emoji';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
