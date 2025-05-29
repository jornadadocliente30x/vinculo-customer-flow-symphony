
import { TransferRequest } from '@/types/messages';

export const mockTransferRequests: TransferRequest[] = [
  {
    id: '1',
    contactName: 'Maria Santos',
    fromUser: 'Dr. João Silva',
    toUser: 'Você',
    requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    status: 'pending'
  },
  {
    id: '2',
    contactName: 'Pedro Costa',
    fromUser: 'Dra. Ana Oliveira',
    toUser: 'Você',
    requestedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutos atrás
    status: 'pending'
  },
  {
    id: '3',
    contactName: 'Carlos Mendes',
    fromUser: 'Dr. Paulo Freitas',
    toUser: 'Você',
    requestedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 dia atrás
    status: 'accepted'
  }
];
