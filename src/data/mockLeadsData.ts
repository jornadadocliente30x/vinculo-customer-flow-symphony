
import { LeadContact } from '@/types/leads';

export const mockLeadsData: LeadContact[] = [
  {
    id: '1',
    firstName: 'Maria',
    lastName: 'Silva',
    phone: '+55 11 99999-1234',
    email: 'maria.silva@email.com',
    stage: 'utilizacao',
    status: 'atendimento',
    origin: 'instagram',
    conversionDate: new Date('2024-01-15'),
    tag: 'lead',
    notes: 'Interessada em consultoria empresarial',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    firstName: 'João',
    lastName: 'Santos',
    phone: '+55 11 98888-5678',
    email: 'joao.santos@email.com',
    stage: 'adoracao',
    status: 'agendamentos',
    origin: 'linkedin',
    conversionDate: new Date('2024-01-14'),
    tag: 'cliente',
    notes: 'Cliente ativo há 6 meses',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: '3',
    firstName: 'Ana',
    lastName: 'Costa',
    phone: '+55 11 97777-9012',
    email: 'ana.costa@email.com',
    stage: 'expansao',
    status: 'finalizados',
    origin: 'tiktok',
    conversionDate: new Date('2024-01-13'),
    tag: 'cliente',
    notes: 'Projeto finalizado com sucesso',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '4',
    firstName: 'Carlos',
    lastName: 'Oliveira',
    phone: '+55 11 96666-3456',
    email: 'carlos.oliveira@email.com',
    stage: 'assimilacao',
    status: 'conversa_ia',
    origin: 'site',
    conversionDate: new Date('2024-01-12'),
    tag: 'lead',
    notes: 'Primeiro contato via chatbot',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-23'),
  },
  {
    id: '5',
    firstName: 'Fernanda',
    lastName: 'Lima',
    phone: '+55 11 95555-2345',
    email: 'fernanda.lima@email.com',
    stage: 'evangelismo',
    status: 'finalizados',
    origin: 'whatsapp',
    conversionDate: new Date('2024-01-11'),
    tag: 'cliente',
    notes: 'Cliente fidelizado, indicou 3 novos clientes',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-24'),
  },
];

export const stageLabels = {
  assimilacao: 'Assimilação',
  utilizacao: 'Utilização',
  adoracao: 'Adoração',
  expansao: 'Expansão',
  evangelismo: 'Evangelismo',
};

export const statusLabels = {
  atendimento: 'Atendimento',
  finalizados: 'Finalizados',
  agendamentos: 'Agendamentos',
  conversa_ia: 'Conversa IA',
};

export const originLabels = {
  instagram: 'Instagram',
  messenger: 'Messenger',
  google: 'Google',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
  site: 'Site',
  whatsapp: 'WhatsApp',
};

export const tagLabels = {
  cliente: 'Cliente',
  lead: 'Lead',
};
