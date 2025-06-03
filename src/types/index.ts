
// Core Types for Odontomy Platform

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'manager' | 'agent' | 'viewer';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: LeadStatus;
  source: LeadSource;
  tags: string[];
  notes: string;
  score: number;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  lastContact?: Date;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
export type LeadSource = 'instagram' | 'facebook' | 'linkedin' | 'website' | 'email' | 'whatsapp' | 'referral' | 'other';

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  triggers: AutomationTrigger[];
  actions: AutomationAction[];
  createdAt: Date;
  updatedAt: Date;
}

export type CampaignType = 'welcome' | 'nurture' | 'promotional' | 'reactivation';
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed';

export interface AutomationTrigger {
  id: string;
  type: 'lead_created' | 'status_changed' | 'tag_added' | 'time_delay' | 'date_time';
  conditions: Record<string, any>;
}

export interface AutomationAction {
  id: string;
  type: 'send_whatsapp' | 'send_email' | 'add_tag' | 'change_status' | 'assign_user';
  payload: Record<string, any>;
  delay?: number;
}

export interface Message {
  id: string;
  leadId: string;
  userId?: string;
  content: string;
  type: MessageType;
  direction: 'inbound' | 'outbound';
  status: MessageStatus;
  createdAt: Date;
  readAt?: Date;
}

export type MessageType = 'text' | 'image' | 'document' | 'audio' | 'video';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  content: string;
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TemplateType = 'whatsapp' | 'email' | 'sms';

export interface Analytics {
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  metrics: {
    leadsGenerated: number;
    leadsConverted: number;
    conversionRate: number;
    revenue: number;
    averageTicket: number;
    messagesExchanged: number;
    responseRate: number;
    campaignsSent: number;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

export interface KanbanLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  value: number;
  avatar?: string;
  services: Service[];
  responsible: {
    name: string;
    avatar: string;
  };
  stage: FunnelStage;
  createdAt: Date;
  lastContact?: Date;
  notes?: string;
  source: LeadSource;
}

export interface FunnelStage {
  id: string;
  name: string;
  color: string;
  order: number;
}

export interface KanbanColumn {
  stage: FunnelStage;
  leads: KanbanLead[];
  totalValue: number;
  currentPage: number;
  hasMore: boolean;
}
