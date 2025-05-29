
import { Conversation, ChatMessage, Tag, FunnelStage, User, ScheduledMessage } from '@/types/messages';

export const mockTags: Tag[] = [
  { id: '1', name: 'Urgente', color: 'purple' },
  { id: '2', name: 'VIP', color: 'yellow' },
  { id: '3', name: 'Novo Cliente', color: 'green' },
  { id: '4', name: 'Consulta', color: 'blue' },
];

export const mockStages: FunnelStage[] = [
  { id: '1', name: 'Lead', color: '#3B82F6' },
  { id: '2', name: 'Contato', color: '#F59E0B' },
  { id: '3', name: 'Qualificado', color: '#8B5CF6' },
  { id: '4', name: 'Proposta', color: '#EF4444' },
  { id: '5', name: 'Fechado', color: '#10B981' },
];

export const mockUsers: User[] = [
  { id: '1', name: 'João Silva', email: 'joao@empresa.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
  { id: '2', name: 'Maria Santos', email: 'maria@empresa.com', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c3c3?w=40&h=40&fit=crop&crop=face' },
  { id: '3', name: 'Pedro Costa', email: 'pedro@empresa.com' },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    contactName: 'Maria Silva',
    contactPhone: '+55 11 99999-1234',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c3c3?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Olá! Gostaria de saber mais sobre os serviços.',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    isOnline: true,
    category: 'atendimento',
    isPinned: false,
    stage: mockStages[1],
    tags: [mockTags[0], mockTags[3]],
    notificationsEnabled: true,
  },
  {
    id: '2',
    contactName: 'João Santos',
    contactPhone: '+55 11 98888-5678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Perfeito! Vamos agendar para amanhã às 14h.',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 0,
    isOnline: false,
    category: 'agendamentos',
    isPinned: true,
    stage: mockStages[3],
    tags: [mockTags[1]],
    notificationsEnabled: true,
  },
  {
    id: '3',
    contactName: 'Ana Costa',
    contactPhone: '+55 11 97777-9012',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Aguardando retorno sobre o orçamento...',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 1,
    isOnline: false,
    category: 'finalizados',
    isPinned: false,
    stage: mockStages[4],
    tags: [mockTags[2]],
    notificationsEnabled: false,
  },
  {
    id: '4',
    contactName: 'Carlos Oliveira',
    contactPhone: '+55 11 96666-3456',
    lastMessage: 'Mensagem automática: Obrigado pelo contato!',
    lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
    unreadCount: 0,
    isOnline: true,
    category: 'conversa_ia',
    isPinned: false,
    stage: mockStages[0],
    tags: [],
    notificationsEnabled: true,
  },
];

export const mockMessages: ChatMessage[] = [
  {
    id: '1',
    conversationId: '1',
    content: 'Olá! Como posso ajudá-lo hoje?',
    type: 'text',
    direction: 'outbound',
    status: 'read',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: '2',
    conversationId: '1',
    content: 'Olá! Gostaria de saber mais sobre os serviços.',
    type: 'text',
    direction: 'inbound',
    status: 'delivered',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '3',
    conversationId: '1',
    content: 'Posso te enviar nossa apresentação com todos os detalhes?',
    type: 'text',
    direction: 'outbound',
    status: 'sent',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
];

export const mockScheduledMessages: ScheduledMessage[] = [
  {
    id: '1',
    conversationId: '1',
    title: 'Follow-up Consulta',
    description: 'Lembrete sobre consulta',
    content: 'Olá! Lembro que temos nossa consulta amanhã às 14h. Confirma presença?',
    scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    status: 'pending',
  },
  {
    id: '2',
    conversationId: '2',
    title: 'Proposta Comercial',
    description: 'Envio da proposta',
    content: 'Conforme conversamos, segue a proposta comercial em anexo.',
    scheduledDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'delivered',
    deliveredAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
];
